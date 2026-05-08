import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

// 環境変数から取得
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "acou2@i.softbank.jp";
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Resendクライアントの初期化
const resend = new Resend(RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const {
            name, email, phone, message,
            subject, experience, contactMethod, gender,
            recaptchaToken
        } = await req.json();

        // 1. reCAPTCHA検証 (タイムアウト付き)
        if (recaptchaToken && RECAPTCHA_SECRET_KEY) {
            try {
                const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
                
                // 8秒でタイムアウトさせる
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 8000);

                const verifyRes = await fetch(verifyUrl, { 
                    method: 'POST',
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                
                const verifyJson = await verifyRes.json();

                if (!verifyJson.success || (verifyJson.score !== undefined && verifyJson.score < 0.5)) {
                    console.warn(`[Warning] reCAPTCHA check failed or low score. Score: ${verifyJson.score}, Success: ${verifyJson.success}`);
                    return NextResponse.json({ success: false, error: 'Spam detected' }, { status: 400 });
                }
            } catch (e) {
                console.warn("[Warning] reCAPTCHA verification error or timeout:", e);
                // reCAPTCHAのエラーで完全に止めるのではなく、ログを残して続行（または厳格にするならここでエラー）
            }
        }

        // 2. メール本文の作成
        const adminSubject = `【帯会】新規お問い合わせ：${name} 様`;
        const adminHtml = `
            <h2>新規お問い合わせ</h2>
            <p>以下の内容で受け付けました。</p>
            <hr>
            <p><strong>件名：</strong>${subject}</p>
            <p><strong>お名前：</strong>${name}</p>
            <p><strong>メール：</strong>${email}</p>
            <p><strong>電話番号：</strong>${phone}</p>
            <p><strong>連絡方法：</strong>${contactMethod}</p>
            <p><strong>経験：</strong>${experience}</p>
            <p><strong>性別：</strong>${gender}</p>
            <p><strong>内容：</strong><br>${(message || "").replace(/\n/g, '<br>')}</p>
        `;

        const userSubject = "【帯会】お問い合わせありがとうございます（自動返信）";
        const userHtml = `
            <p>${name} 様</p>
            <p>お問い合わせありがとうございます。<br>以下の内容で受け付けました。</p>
            <hr>
            <p><strong>内容：</strong><br>${(message || "").replace(/\n/g, '<br>')}</p>
            <hr>
            <p>担当者より通常1〜2営業日以内にご連絡いたします。</p>
        `;

        // 3. 送信処理（管理者とユーザーへ並列送信）
        // 送信元を開発者の個人アドレスではなく、システム用のアドレスに変更
        const FROM_EMAIL = "帯会 お問い合わせ <onboarding@resend.dev>";

        const adminMailPromise = resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: adminSubject,
            html: adminHtml,
            replyTo: email,
        });

        const userMailPromise = email ? resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: userSubject,
            html: userHtml,
        }) : Promise.resolve({ data: null, error: null });

        // 両方の送信を開始し、管理者の結果を優先的に確認
        const [adminResult, userResult] = await Promise.all([adminMailPromise, userMailPromise]);

        if (adminResult.error) {
            console.error("Admin mail failed:", adminResult.error);
            return NextResponse.json({ 
                success: false, 
                error: "管理者宛メールの送信に失敗しました。時間をおいて再度お試しください。" 
            }, { status: 500 });
        }

        if (userResult.error) {
            console.warn("User auto-reply failed (ignored):", userResult.error);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Email API error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

