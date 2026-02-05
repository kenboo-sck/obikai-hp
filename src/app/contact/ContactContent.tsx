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
    zip: string;
    prefecture: string;
    city: string;
    address: string;
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
        zip: '',
        prefecture: '',
        city: '',
        address: '',
        message: ''
    });

    const [emailError, setEmailError] = useState("");
    const [isConfirm, setIsConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 郵便番号から住所を検索する関数
    const fetchAddress = async (zipCode: string) => {
        if (zipCode.length === 7) {
            try {
                const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`);
                const data = await res.json();
                if (data.status === 200 && data.results) {
                    const result = data.results[0];
                    setFormData(prev => ({
                        ...prev,
                        prefecture: result.address1,
                        city: result.address2,
                        address: result.address3
                    }));
                }
            } catch (error) {
                console.error("住所の取得に失敗しました", error);
            }
        }
    };

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

    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        setFormData(prev => ({ ...prev, zip: value }));
        if (value.length === 7) {
            fetchAddress(value);
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
                zip: formData.zip,
                address: `${formData.prefecture}${formData.city}${formData.address}`,
                message: formData.message,
                recaptchaToken: recaptchaToken,
                createdAt: serverTimestamp(),
            });

            // 3. メール送信APIを呼び出し (Vercel Serverless Function)
            const emailRes = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, recaptchaToken })
            });

            if (!emailRes.ok) {
                const errorText = await emailRes.text();
                console.error("メール送信失敗", errorText);
                alert(`メール送信エラー詳細: ${errorText}`); // 詳細を表示
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
                zip: '',
                prefecture: '',
                city: '',
                address: '',
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
        <div className="pt-40 pb-20 font-[family-name:var(--font-oswald)]">
            <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
                    <span className="text-[12rem] md:text-[22rem] font-black italic leading-none uppercase tracking-tighter">MESSAGE</span>
                </div>
                <div className="relative z-10 border-l-8 border-orange-600 pl-6 mb-12">
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
                        GET IN <span className="text-orange-600">TOUCH</span>
                    </h1>
                    <p className="text-gray-400 font-bold mt-2 tracking-[0.2em] uppercase">お問い合わせ</p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white border border-gray-100 shadow-2xl overflow-hidden">
                    <div className="bg-black text-white py-8 px-10">
                        <h2 className="text-2xl font-black italic tracking-tight uppercase">Inquiry Form</h2>
                        <p className="text-xs mt-2 text-gray-400 font-bold tracking-widest uppercase">必要事項をご記入の上、送信してください。</p>
                    </div>

                    {!isConfirm ? (
                        <form onSubmit={handleConfirm} className="p-10 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Subject / 項目 <span className="text-orange-600">＊</span></label>
                                    <div className="flex flex-wrap gap-4 text-sm font-bold italic">
                                        {["無料体験申込み", "入会希望", "その他"].map((item) => (
                                            <label key={item} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                                                <input type="radio" name="subject" value={item} checked={formData.subject === item} onChange={handleChange} className="accent-orange-600" /> {item}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Contact Method / ご希望の連絡方法 <span className="text-orange-600">＊</span></label>
                                    <div className="flex gap-6 text-sm font-bold italic">
                                        {["メール", "電話"].map((method) => (
                                            <label key={method} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                                                <input type="radio" name="contactMethod" value={method} checked={formData.contactMethod === method} onChange={handleChange} className="accent-orange-600" /> {method}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Experience / 柔術の経験</label>
                                    <div className="flex gap-6 text-sm font-bold italic">
                                        {["有り", "無し"].map((exp) => (
                                            <label key={exp} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                                                <input type="radio" name="experience" value={exp} checked={formData.experience === exp} onChange={handleChange} className="accent-orange-600" /> {exp}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Gender / 性別</label>
                                    <div className="flex gap-6 text-sm font-bold italic">
                                        {["男性", "女性", "回答しない"].map((gender) => (
                                            <label key={gender} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                                                <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleChange} className="accent-orange-600" /> {gender}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Name / お名前 <span className="text-orange-600">＊</span></label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="山田 太郎" className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Phone / 電話番号</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="09012345678" className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Email / メールアドレス <span className="text-orange-600">＊</span></label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Email Confirm / 確認用 <span className="text-orange-600">＊</span></label>
                                    <input type="email" name="emailConfirm" value={formData.emailConfirm} onChange={handleChange} placeholder="もう一度入力してください" className={`w-full border-2 p-4 outline-none ${emailError ? 'border-red-500' : 'border-gray-100 focus:border-orange-600'}`} required />
                                    {emailError && <p className="text-red-500 text-[10px] font-bold mt-1 italic">{emailError}</p>}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Zip Code / 郵便番号</label>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">〒</span>
                                            <input type="text" name="zip" value={formData.zip} onChange={handleZipChange} placeholder="1234567" maxLength={7} className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Prefecture / 都道府県</label>
                                        <input type="text" name="prefecture" value={formData.prefecture} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">City / 市区町村</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Address / 番地・建物名</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 focus:border-orange-600 outline-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 block">Message / お問い合わせ内容</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full border-2 border-gray-100 p-4 h-48 focus:border-orange-600 outline-none resize-none"></textarea>
                            </div>

                            <div className="text-center pt-6">
                                <button type="submit" className="bg-orange-600 text-white px-12 py-5 hover:bg-black transition-all font-black italic uppercase text-xl">
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
                                    { label: "柔術経験", value: formData.experience },
                                    { label: "性別", value: formData.gender },
                                    { label: "お名前", value: formData.name },
                                    { label: "電話番号", value: formData.phone || "未入力" },
                                    { label: "メールアドレス", value: formData.email },
                                    { label: "住所", value: `〒${formData.zip} ${formData.prefecture}${formData.city}${formData.address}` },
                                ].map((item) => (
                                    <div key={item.label} className="flex flex-col md:flex-row md:items-center border-b border-gray-50 py-2">
                                        <span className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 w-40">{item.label}</span>
                                        <span className="font-bold text-gray-900">{item.value}</span>
                                    </div>
                                ))}
                                <div className="flex flex-col py-2">
                                    <span className="text-[10px] font-black italic uppercase tracking-widest text-gray-400 mb-2">Message / お問い合わせ内容</span>
                                    <p className="font-bold text-gray-900 whitespace-pre-wrap leading-relaxed">{formData.message || "未入力"}</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-center gap-6 pt-6">
                                <button
                                    onClick={handleBack}
                                    disabled={isSubmitting}
                                    className="bg-gray-200 text-gray-600 px-12 py-5 font-black italic uppercase text-xl hover:bg-gray-300 transition-all disabled:opacity-50"
                                >
                                    ← 修正する
                                </button>
                                <button
                                    onClick={handleFinalSubmit}
                                    disabled={isSubmitting}
                                    className="bg-orange-600 text-white px-12 py-5 hover:bg-black transition-all border-r-4 border-orange-400 shadow-xl font-black italic uppercase text-xl disabled:opacity-50"
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
