<?php
/**
 * 帯会HP メール送信プロキシ (Sakura Server用) - 最終完成版（内容統一版）
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; }

$SECRET_KEY = "obikai_secure_proxy_key_2026"; 
$ADMIN_EMAIL = "acou2@i.softbank.jp";
$FROM_EMAIL = "info@obikai.jp";
$FROM_NAME = "帯会 お問い合わせフォーム";

// UTF-8設定
mb_language("uni");
mb_internal_encoding("UTF-8");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || $data['key'] !== $SECRET_KEY) {
    http_response_code(403);
    exit;
}

$name = htmlspecialchars($data['name'] ?? '', ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($data['email'] ?? '', ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($data['phone'] ?? '', ENT_QUOTES, 'UTF-8');
$message = nl2br(htmlspecialchars($data['message'] ?? '', ENT_QUOTES, 'UTF-8'));
$subject_type = htmlspecialchars($data['subject'] ?? '', ENT_QUOTES, 'UTF-8');
$experience = htmlspecialchars($data['experience'] ?? '', ENT_QUOTES, 'UTF-8');
$contactMethod = htmlspecialchars($data['contactMethod'] ?? '', ENT_QUOTES, 'UTF-8');
$gender = htmlspecialchars($data['gender'] ?? '', ENT_QUOTES, 'UTF-8');

// HTMLデザイン
$style = "
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f9f9f9; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .header { background: #10b981; color: #ffffff !important; padding: 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; color: #ffffff !important; }
        .content { padding: 30px; }
        .item { margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; }
        .label { font-weight: bold; color: #666; font-size: 12px; margin-bottom: 5px; display: block; }
        .value { font-size: 15px; color: #111; font-weight: 500; }
        .message-box { background: #f5f5f5; border-radius: 6px; padding: 15px; margin-top: 10px; color: #333; font-size: 14px; white-space: pre-wrap; border: 1px solid #eee; }
        .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 11px; color: #999; }
    </style>
";

// 共通の本文パーツ（管理者・お客様共通）
$common_content = "
    <div class='item'><span class='label'>お問い合わせ項目</span><div class='value'>{$subject_type}</div></div>
    <div class='item'><span class='label'>お名前</span><div class='value'>{$name} 様</div></div>
    <div class='item'><span class='label'>メールアドレス</span><div class='value'>{$email}</div></div>
    <div class='item'><span class='label'>電話番号</span><div class='value'>{$phone}</div></div>
    <div class='item'><span class='label'>希望連絡方法</span><div class='value'>{$contactMethod}</div></div>
    <div class='item'><span class='label'>経験</span><div class='value'>{$experience}</div></div>
    <div class='item'><span class='label'>性別</span><div class='value'>{$gender}</div></div>
    <div class='item'><span class='label'>お問い合わせ内容</span><div class='message-box'>{$message}</div></div>
";

// --- 管理者宛 ---
$admin_subject = "【帯会】新規お問い合わせ：{$name} 様";
$admin_body = "<html><head><meta charset='UTF-8'>{$style}</head><body>
    <div class='container'>
        <div class='header'><h1>新規お問い合わせが届きました</h1></div>
        <div class='content'>{$common_content}</div>
        <div class='footer'>帯会 お問い合わせ管理システム</div>
    </div></body></html>";

$admin_headers = "From: " . mb_encode_mimeheader($FROM_NAME) . " <{$FROM_EMAIL}>\n";
$admin_headers .= "Reply-To: {$email}\n";
$admin_headers .= "MIME-Version: 1.0\n";
$admin_headers .= "Content-Type: text/html; charset=UTF-8";

$admin_success = mb_send_mail($ADMIN_EMAIL, $admin_subject, $admin_body, $admin_headers, "-f" . $FROM_EMAIL);

// --- ユーザー宛自動返信 ---
if ($admin_success && !empty($email)) {
    $user_subject = "【帯会】お問い合わせありがとうございます";
    $user_body = "<html><head><meta charset='UTF-8'>{$style}</head><body>
        <div class='container'>
            <div class='header'><h1>お問い合わせありがとうございます</h1></div>
            <div class='content'>
                <p>{$name} 様</p>
                <p>この度は帯会へのお問い合わせ、誠にありがとうございます。<br>以下の内容で受け付けました。</p>
                <hr style='border:none; border-top:1px solid #eee; margin:20px 0;'>
                {$common_content}
                <p style='margin-top:20px;'>担当者より通常1〜2営業日以内にご連絡いたします。今しばらくお待ちくださいませ。</p>
            </div>
            <div class='footer'>帯会</div>
        </div></body></html>";
    
    $user_headers = "From: " . mb_encode_mimeheader("帯会") . " <{$FROM_EMAIL}>\n";
    $user_headers .= "MIME-Version: 1.0\n";
    $user_headers .= "Content-Type: text/html; charset=UTF-8";
    
    mb_send_mail($email, $user_subject, $user_body, $user_headers, "-f" . $FROM_EMAIL);
}

echo json_encode(['success' => $admin_success]);
