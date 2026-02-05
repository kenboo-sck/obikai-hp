import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import { setGlobalOptions } from "firebase-functions/v2";
import { Resend } from "resend";

// V2関数のグローバル設定
setGlobalOptions({ region: "asia-northeast1" });

/**
 * Firebase Functions Secrets（RESEND_API_KEY）を使います
 */
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is missing. Set it with: firebase functions:secrets:set RESEND_API_KEY"
    );
  }
  return new Resend(key);
}

function esc(v: unknown): string {
  const s = String(v ?? "");
  return s
    .split("&").join("&amp;")
    .split("<").join("&lt;")
    .split(">").join("&gt;")
    .split('"').join("&quot;")
    .split("'").join("&#39;");
}

function formatCreatedAt(data: Record<string, any>): string {
  try {
    const createdAt = data.createdAt;
    if (createdAt?.toDate) {
      const d = createdAt.toDate() as Date;
      return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(
        d.getDate()
      ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
        2,
        "0"
      )}`;
    }
  } catch (_) { }
  return "（不明）";
}

/**
 * Gen 2 関数: v2mailFinal
 */
export const v2mailFinal = onDocumentCreated(
  {
    document: "inquiries/{inquiryId}",
    secrets: ["RESEND_API_KEY", "RECAPTCHA_SECRET_KEY"],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.error("No data associated with the event");
      return;
    }

    const data = snapshot.data() as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      createdAt?: any;
      recaptchaToken?: string;
      [key: string]: any;
    };

    // ----- reCAPTCHA 検証ロジック -----
    const recaptchaToken = data.recaptchaToken;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (recaptchaToken && secretKey) {
      try {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
        const response = await fetch(verifyUrl, { method: "POST" });
        const json = await response.json();

        if (!json.success || (json.score !== undefined && json.score < 0.5)) {
          logger.warn(`🚨 Spam detected. Score: ${json.score}, Success: ${json.success}. Email sending aborted.`);
          return;
        }
        logger.info(`✅ reCAPTCHA passed. Score: ${json.score}`);
      } catch (error) {
        logger.error("reCAPTCHA verification failed (network error), proceeding with caution:", error);
      }
    } else {
      logger.info("ℹ️ No reCAPTCHA token provided or secret missing. Proceeding without verification.");
    }
    // --------------------------------

    const name = (data.name ?? "").trim() || "（未入力）";
    const email = (data.email ?? "").trim();
    const phone = (data.phone ?? "").trim();
    const message = (data.message ?? "").trim() || "（未入力）";
    const created = formatCreatedAt(data);

    const resend = getResend();
    const adminTo = "kenzo_y@sputnikworks.co.jp";
    const adminSubject = `【ALMA FIGHT GYM 大阪本町】新規お問い合わせ：${name} 様`;

    const adminHtml = `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2 style="margin: 0 0 12px; font-size: 18px;">新規お問い合わせが届きました</h2>
        <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f9f9f9; width: 120px;">受付日時</th><td style="border: 1px solid #ddd; padding: 10px;">${esc(created)}</td></tr>
          <tr><th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f9f9f9;">お名前</th><td style="border: 1px solid #ddd; padding: 10px;">${esc(name)}</td></tr>
          <tr><th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f9f9f9;">メール</th><td style="border: 1px solid #ddd; padding: 10px;">${esc(email || "（未入力）")}</td></tr>
          <tr><th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f9f9f9;">電話番号</th><td style="border: 1px solid #ddd; padding: 10px;">${esc(phone || "（未入力）")}</td></tr>
          <tr><th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f9f9f9;">内容</th><td style="border: 1px solid #ddd; padding: 10px; white-space: pre-wrap;">${esc(message)}</td></tr>
        </table>
        <p style="margin-top: 16px; color:#666; font-size: 12px;">ID: ${event.params.inquiryId}</p>
      </div>
    `;

    const userSubject = "【ALMA GYM】お問い合わせありがとうございます（自動返信）";
    const userHtml = `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <p>${esc(name)} 様</p>
        <p>お問い合わせありがとうございます。<br>以下の内容で受け付けました。</p>
        <div style="border:1px solid #ddd; padding:15px; border-radius:8px; background:#fafafa; margin: 20px 0;">
          <p><strong>受付日時：</strong>${esc(created)}</p>
          <p><strong>お名前：</strong>${esc(name)}</p>
          <p><strong>メール：</strong>${esc(email || "（未入力）")}</p>
          <p><strong>電話番号：</strong>${esc(phone || "（未入力）")}</p>
          <p><strong>内容：</strong><br>${esc(message)}</p>
        </div>
        <p>担当者より通常1〜2営業日以内にご連絡いたします。</p>
        <p>ALMA GYM</p>
      </div>
    `;

    // 1) Admin
    try {
      await resend.emails.send({
        from: "ALMA GYM <onboarding@resend.dev>",
        to: adminTo,
        subject: adminSubject,
        html: adminHtml,
        replyTo: email ? email : undefined,
      });
      logger.info("✅ Admin mail sent");
    } catch (e) {
      logger.error("❌ Admin mail failed", e);
    }

    // 2) User
    if (email) {
      try {
        await resend.emails.send({
          from: "ALMA GYM <onboarding@resend.dev>",
          to: email,
          subject: userSubject,
          html: userHtml,
        });
        logger.info("✅ User mail sent");
      } catch (e) {
        logger.error("❌ User mail failed", e);
      }
    }
  }
);
