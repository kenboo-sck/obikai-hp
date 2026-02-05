import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// 環境変数からキーを取得
const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(req: NextRequest) {
    try {
        const {
            name, email, phone, message,
            subject, experience, contactMethod, gender,
            zip, address,
            recaptchaToken
        } = await req.json();

        // 1. reCAPTCHA検証
        if (recaptchaToken && RECAPTCHA_SECRET_KEY) {
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
            const verifyRes = await fetch(verifyUrl, { method: 'POST' });
            const verifyJson = await verifyRes.json();

            if (!verifyJson.success || (verifyJson.score !== undefined && verifyJson.score < 0.5)) {
                console.warn(`Spam detected. Score: ${verifyJson.score}`);
                return NextResponse.json({ success: false, error: 'Spam detected' }, { status: 400 });
            }
        } else {
            // キー設定がない等の場合はログだけ出して通過させる（あるいはエラーにする方針も可）
            console.info("Skipping reCAPTCHA verification (token or secret missing)");
        }

        // 2. メール本文の作成
        const adminTo = "kenzo_y@sputnikworks.co.jp";
        const adminSubject = `【ALMA FIGHT GYM 大阪本町】新規お問い合わせ：${name} 様`;

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
      <p><strong>住所：</strong>〒${zip} ${address}</p>
      <p><strong>内容：</strong><br>${(message || "").replace(/\n/g, '<br>')}</p>
    `;

        const userSubject = "【ALMA GYM】お問い合わせありがとうございます（自動返信）";
        const userHtml = `
      <p>${name} 様</p>
      <p>お問い合わせありがとうございます。<br>以下の内容で受け付けました。</p>
      <hr>
      <p><strong>内容：</strong><br>${(message || "").replace(/\n/g, '<br>')}</p>
      <hr>
      <p>担当者より通常1〜2営業日以内にご連絡いたします。</p>
    `;

        // 3. 送信処理（管理者へ）
        await resend.emails.send({
            from: "ALMA GYM <onboarding@resend.dev>",
            to: adminTo,
            subject: adminSubject,
            html: adminHtml,
            replyTo: email
        });

        // 4. 送信処理（ユーザーへ自動返信）
        if (email) {
            await resend.emails.send({
                from: "ALMA GYM <onboarding@resend.dev>",
                to: email,
                subject: userSubject,
                html: userHtml
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
