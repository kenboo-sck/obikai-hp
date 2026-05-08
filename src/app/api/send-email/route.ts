import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// 環境変数から取得
const GMAIL_USER = process.env.GMAIL_USER;           // 送信元Gmail
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD; // アプリパスワード
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "acou2@i.softbank.jp"; // 管理者通知先
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Gmail SMTPトランスポーター
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
    },
});

export async function POST(req: NextRequest) {
    try {
        const {
            name, email, phone, message,
            subject, experience, contactMethod, gender,
            recaptchaToken
        } = await req.json();

        // 1. reCAPTCHA検証
        if (recaptchaToken && RECAPTCHA_SECRET_KEY) {
            try {
                const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
                const verifyRes = await fetch(verifyUrl, { method: 'POST' });
                const verifyJson = await verifyRes.json();

                if (!verifyJson.success || (verifyJson.score !== undefined && verifyJson.score < 0.5)) {
                    console.warn(`[Warning] reCAPTCHA check failed or low score. Score: ${verifyJson.score}, Success: ${verifyJson.success}`);
                    return NextResponse.json({ success: false, error: 'Spam detected' }, { status: 400 });
                }
            } catch (e) {
                console.warn("[Warning] reCAPTCHA verification error:", e);
            }
        } else {
            console.info("Skipping reCAPTCHA verification (token or secret missing)");
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

        // 3. 送信処理（管理者へ）
        try {
            await transporter.sendMail({
                from: `帯会 <${GMAIL_USER}>`,
                to: ADMIN_EMAIL,
                subject: adminSubject,
                html: adminHtml,
                replyTo: email,
            });
        } catch (adminError: any) {
            console.error("Admin mail failed:", adminError);
            return NextResponse.json({ success: false, error: adminError.message || JSON.stringify(adminError) }, { status: 500 });
        }

        // 4. 送信処理（ユーザーへ自動返信） - 失敗してもエラーにしない
        if (email) {
            try {
                await transporter.sendMail({
                    from: `帯会 <${GMAIL_USER}>`,
                    to: email,
                    subject: userSubject,
                    html: userHtml,
                });
            } catch (userMailError) {
                // 自動返信が失敗しても、管理者へ届いていればOKとする
                console.warn("User auto-reply failed (ignored):", userMailError);
            }
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
