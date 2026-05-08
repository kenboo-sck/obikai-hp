"use client";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

// 型定義を明示的に追加
interface FormData {
    subject: string;
    experience: string;
    contactMethod: string;
    gender: string;
    name: string;
    email: string;
    emailConfirm: string;
    phone: string;
    message: string;
}

// フォームコンポーネント本体
function ContactFormContent() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    // 初期値の定義(型を明示)
    const [formData, setFormData] = useState<FormData>({
        subject: '無料体験申込み',
        experience: '無し',
        contactMethod: 'メール',
        gender: '回答しない',
        name: '',
        email: '',
        emailConfirm: '',
        phone: '',
        message: ''
    });

    const [emailError, setEmailError] = useState("");
    const [isConfirm, setIsConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'email' || name === 'emailConfirm') {
            const emailVal = name === 'email' ? value : formData.email;
            const confirmVal = name === 'emailConfirm' ? value : formData.emailConfirm;
            if (confirmVal && emailVal !== confirmVal) {
                setEmailError("メールアドレスが一致しません。");
            } else {
                setEmailError("");
            }
        }
    };

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.email !== formData.emailConfirm) {
            setEmailError("メールアドレスが一致しません。");
            return;
        }
        setIsConfirm(true);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setIsConfirm(false);
        window.scrollTo(0, 0);
    };

    const handleFinalSubmit = async () => {
        console.log('=== handleFinalSubmit 開始 ===');
        console.log('executeRecaptcha:', executeRecaptcha);

        if (!executeRecaptcha) {
            alert('reCAPTCHAの準備ができていません。もう一度お試しください。');
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. reCAPTCHAトークンを取得
            const recaptchaToken = await executeRecaptcha('contact_form');
            if (!recaptchaToken) {
                alert("reCAPTCHAの取得に失敗しました。再読み込みして再度お試しください。");
                setIsSubmitting(false);
                return;
            }

            // 2. Firebaseに保存
            await addDoc(collection(db, "inquiries"), {
                subject: formData.subject,
                experience: formData.experience,
                contactMethod: formData.contactMethod,
                gender: formData.gender,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                recaptchaToken: recaptchaToken,
                createdAt: serverTimestamp(),
            });

            // 3. メール送信APIを呼び出し (さくらサーバー PHPプロキシ)
            const proxyUrl = process.env.NEXT_PUBLIC_MAIL_PROXY_URL;
            if (!proxyUrl) {
                throw new Error("送信プロキシURLが設定されていません。");
            }

            const emailRes = await fetch(proxyUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    ...formData, 
                    recaptchaToken,
                    key: "obikai_secure_proxy_key_2026" // PHP側の $SECRET_KEY と一致させる
                })
            });

            if (!emailRes.ok) {
                const errorText = await emailRes.text();
                console.error("メール送信失敗", errorText);
                alert(`メール送信エラー: さくらサーバー側で問題が発生しました。`);
                setIsSubmitting(false);
                return;
            }

            const result = await emailRes.json();
            if (!result.success) {
                console.error("プロキシ送信エラー:", result.error);
                alert(`送信失敗: ${result.error || "サーバーエラー"}`);
                setIsSubmitting(false);
                return;
            }

            alert("お問い合わせを送信しました。ありがとうございました!");
            setIsConfirm(false);

            // 5. 入力フォームを初期値にリセット
            setFormData({
                subject: '無料体験申込み',
                experience: '無し',
                contactMethod: 'メール',
                gender: '回答しない',
                name: '',
                email: '',
                emailConfirm: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            console.error("送信エラー:", error);
            alert("送信に失敗しました。もう一度お試しください。");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-40 pb-20 font-sans">
            <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
                    <span className="text-[10rem] font-bold text-gray-900">お問い合わせ</span>
                </div>
                <div className="relative z-10 border-l-8 border-emerald-500 pl-6 mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none tracking-widest font-maru">
                        お問い合わせ<span className="text-emerald-500">フォーム</span>
                    </h1>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white border border-gray-100 shadow-xl overflow-hidden">
                    <div className="bg-stone-900 text-white py-8 px-10 border-b border-emerald-500/30">
                        <h2 className="text-2xl font-bold tracking-wide">ご入力フォーム</h2>
                        <p className="text-xs mt-2 text-stone-400 font-medium">以下の項目をご記入の上、送信してください。</p>
                    </div>

                    {!isConfirm ? (
                        <form onSubmit={handleConfirm} className="p-10 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold tracking-wider text-gray-500 block">お問い合わせ項目 <span className="text-emerald-500">＊</span></label>
                                    <div className="flex flex-wrap gap-4 text-sm font-medium">
                                        {["無料体験申込み", "入会希望", "その他"].map((item) => (
                                            <label key={item} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600">
                                                <input type="radio" name="subject" value={item} checked={formData.subject === item} onChange={handleChange} className="accent-emerald-500" /> {item}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold tracking-wider text-gray-500 block">ご希望の連絡方法 <span className="text-emerald-500">＊</span></label>
                                    <div className="flex gap-6 text-sm font-medium">
                                        {["メール", "電話"].map((method) => (
                                            <label key={method} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600">
                                                <input type="radio" name="contactMethod" value={method} checked={formData.contactMethod === method} onChange={handleChange} className="accent-emerald-500" /> {method}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold tracking-wider text-gray-500 block">格闘技の経験</label>
                                    <div className="flex gap-6 text-sm font-medium">
                                        {["有り", "無し"].map((exp) => (
                                            <label key={exp} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600">
                                                <input type="radio" name="experience" value={exp} checked={formData.experience === exp} onChange={handleChange} className="accent-emerald-500" /> {exp}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold tracking-wider text-gray-500 block">性別</label>
                                    <div className="flex gap-6 text-sm font-medium">
                                        {["男性", "女性", "回答しない"].map((gender) => (
                                            <label key={gender} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600">
                                                <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleChange} className="accent-emerald-500" /> {gender}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-wider text-gray-500 block">お名前 <span className="text-emerald-500">＊</span></label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="山田 太郎" className="w-full border border-gray-300 p-3 focus:border-emerald-500 outline-none transition-colors" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-wider text-gray-500 block">電話番号</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="09012345678" className="w-full border border-gray-300 p-3 focus:border-emerald-500 outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-wider text-gray-500 block">メールアドレス <span className="text-emerald-500">＊</span></label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" className="w-full border border-gray-300 p-3 focus:border-emerald-500 outline-none transition-colors" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-wider text-gray-500 block">メールアドレス（確認用） <span className="text-emerald-500">＊</span></label>
                                    <input type="email" name="emailConfirm" value={formData.emailConfirm} onChange={handleChange} placeholder="もう一度入力してください" className={`w-full border p-3 outline-none transition-colors ${emailError ? 'border-red-500' : 'border-gray-300 focus:border-emerald-500'}`} required />
                                    {emailError && <p className="text-red-500 text-xs font-bold mt-1">{emailError}</p>}
                                </div>
                            </div>



                            <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider text-gray-500 block">お問い合わせ内容</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full border border-gray-300 p-3 h-48 focus:border-emerald-500 outline-none resize-none transition-colors"></textarea>
                            </div>

                            <div className="text-center pt-6">
                                <button type="submit" className="bg-emerald-500 text-white px-12 py-4 hover:bg-emerald-600 transition-all font-bold text-lg shadow-lg">
                                    内容を確認して送信する →
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="p-10 space-y-8">
                            <div className="grid grid-cols-1 gap-6 border-b border-gray-100 pb-8">
                                {[
                                    { label: "項目", value: formData.subject },
                                    { label: "連絡方法", value: formData.contactMethod },
                                    { label: "格闘技経験", value: formData.experience },
                                    { label: "性別", value: formData.gender },
                                    { label: "お名前", value: formData.name },
                                    { label: "電話番号", value: formData.phone || "未入力" },
                                    { label: "メールアドレス", value: formData.email },
                                ].map((item) => (
                                    <div key={item.label} className="flex flex-col md:flex-row md:items-center border-b border-gray-50 py-2">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest w-40">{item.label}</span>
                                        <span className="font-bold text-gray-900">{item.value}</span>
                                    </div>
                                ))}
                                <div className="flex flex-col py-2">
                                    <span className="text-xs font-bold text-gray-500 tracking-widest mb-2">お問い合わせ内容</span>
                                    <p className="font-medium text-gray-900 whitespace-pre-wrap leading-relaxed">{formData.message || "未入力"}</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-center gap-6 pt-6">
                                <button
                                    onClick={handleBack}
                                    disabled={isSubmitting}
                                    className="bg-gray-100 text-gray-600 px-10 py-4 font-bold text-lg hover:bg-gray-200 transition-all disabled:opacity-50"
                                >
                                    ← 修正する
                                </button>
                                <button
                                    onClick={handleFinalSubmit}
                                    disabled={isSubmitting}
                                    className="bg-emerald-500 text-white px-12 py-4 hover:bg-emerald-600 transition-all shadow-xl font-bold text-lg disabled:opacity-50"
                                >
                                    {isSubmitting ? '送信中...' : 'この内容で送信する →'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* reCAPTCHAバッジ（右下に表示） */}
            <div className="fixed bottom-4 right-4 text-xs text-gray-400">
                This site is protected by reCAPTCHA
            </div>
        </div>
    );
}

// reCAPTCHAプロバイダーでラップ
export default function ContactContent() {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">reCAPTCHAの設定が見つかりません。</p>
            </div>
        );
    }

    return (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
            <ContactFormContent />
        </GoogleReCaptchaProvider>
    );
}
