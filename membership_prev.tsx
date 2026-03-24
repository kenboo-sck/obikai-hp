"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function MembershipContent() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800">
            {/* ヒーローセクション */}
            <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.05] whitespace-nowrap">
                    <span className="text-[15rem] font-bold text-gray-900 tracking-widest font-maru">入会案内</span>
                </div>

                <div className="relative z-10">
                    <div className="border-l-8 border-emerald-500 pl-6 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none tracking-widest font-maru">
                            入会案内<span className="text-emerald-500"> / 料金プラン</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* キャンペーンセクション - 全面的に刷新 */}
            <section className="relative w-full mb-32 overflow-hidden px-6">
                <div className="max-w-7xl mx-auto relative rounded-[2rem] overflow-hidden shadow-2xl min-h-[500px] flex items-center">
                    {/* 背景画像とオーバーレイ */}
                    <div className="absolute inset-0 z-0">
                        <Image 
                            src="/activity-6.jpg" 
                            alt="活動風景" 
                            fill 
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-8 md:p-20 w-full md:w-2/3">
                        <div className="inline-block bg-emerald-500 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 rounded-sm shadow-lg">
                            Special Membership Offer
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-[1.1] font-maru tracking-tight">
                            道場生活を始めよう。<br />
                            <span className="text-emerald-400">入会キャンペーン実施中</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/15 transition-all">
                                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">1</div>
                                <div>
                                    <p className="text-white font-bold text-lg font-maru">空手着プレゼント</p>
                                    <p className="text-emerald-400 text-sm font-bold mt-1">12,000円相当</p>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/15 transition-all">
                                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">2</div>
                                <div>
                                    <p className="text-white font-bold text-lg font-maru">親子・家族割引</p>
                                    <p className="text-emerald-400 text-sm font-bold mt-1">毎月ずっとお得に</p>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/15 transition-all">
                                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">3</div>
                                <div>
                                    <p className="text-white font-bold text-lg font-maru">入会金無料</p>
                                    <p className="text-emerald-400 text-sm font-bold mt-1">親子で入会の場合</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <Link href="/contact" className="w-full sm:w-auto bg-emerald-500 text-white px-12 py-5 font-bold text-lg hover:bg-emerald-400 hover:scale-105 transition-all rounded-full shadow-xl shadow-emerald-500/20 font-maru tracking-widest text-center">
                                無料体験を予約する
                            </Link>
                            <p className="text-white/50 text-[10px] sm:max-w-xs leading-relaxed">
                                ※キャンペーンの適用には一定期間の継続利用が条件となります。定員に達し次第終了となりますのでお早めにお申し込みください。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 料金セクション */}
            <section className="bg-emerald-50/50 py-32 mb-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-emerald-500 font-bold tracking-widest text-xs uppercase mb-3 block">Price List</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-widest font-maru">料金<span className="text-emerald-500">プラン</span></h2>
                        <div className="w-16 h-1 bg-emerald-500 mx-auto mt-6"></div>
                    </div>

                    {/* 入会金 */}
                    <div className="mb-16">
                        <div className="bg-white p-10 border border-emerald-100 shadow-xl shadow-emerald-900/5 rounded-3xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-emerald-500 pl-4 font-maru">入会金</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-gray-900">3,000</span>
                                    <span className="text-xl font-bold text-gray-900">円</span>
                                </div>
                                <div className="bg-emerald-500 text-white font-bold px-6 py-2 rounded-full text-sm shadow-md">
                                    ★親子で入会の場合、入会金無料
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 月額プラン */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-emerald-500 pl-4 font-maru">月額会費</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {/* 各プランの統一スタイル */}
                        {[
                            { title: "幼 児", age: "年中〜年長", price: "2,500", accent: "bg-yellow-400", features: ["礼儀作法の習得", "楽しく運動"] },
                            { title: "小学生", age: "1年生〜6年生", price: "3,000", accent: "bg-emerald-500", features: ["基礎体力の向上", "武道の精神を学ぶ"] },
                            { title: "中・高校生", age: "中学1年〜高校3年", price: "3,500", accent: "bg-emerald-400", features: ["実戦技術の習得", "部活動との両立"] },
                            { title: "社会人", age: "一般・シニア", price: "5,000", accent: "bg-emerald-600", features: ["健康維持・発散", "本格的な格闘技"] },
                        ].map((plan, idx) => (
                            <div key={idx} className="group relative bg-white p-8 border border-gray-100 shadow-lg rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                <div className={`absolute top-0 left-0 w-full h-1.5 ${plan.accent}`}></div>
                                <div className="mb-6">
                                    <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">{plan.age}</span>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{plan.title}</h3>
                                </div>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-400 text-sm font-bold">円 / 月</span>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600 border-t border-gray-50 pt-6">
                                    {plan.features.map((f, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2">
                                            <span className="text-emerald-500 font-bold">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* 親子割引バナー */}
                    <div className="bg-emerald-500 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-8 group">
                        <div className="relative z-10 text-center md:text-left">
                            <span className="bg-white/20 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block backdrop-blur-sm border border-white/20">Family Discount</span>
                            <h3 className="text-3xl md:text-4xl font-bold mb-3 font-maru">親子・家族割引</h3>
                            <p className="text-emerald-50 text-base opacity-90">ご家族で入会されると、毎月の会費がずっと割引になります。</p>
                        </div>
                        <div className="relative z-10 flex flex-col items-center bg-white text-emerald-500 px-10 py-6 rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform">
                            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">毎月の会費から</p>
                            <p className="text-5xl font-bold leading-none">-1,000<span className="text-xl ml-1">円</span></p>
                        </div>
                        {/* 背景の装飾サークル */}
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -left-20 -top-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </section>

            {/* 入会手続きセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid md:grid-cols-2 gap-20">
                    <div>
                        <div className="inline-block bg-emerald-100 text-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 rounded-sm">Information</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-widest font-maru leading-tight">ご入会に<span className="text-emerald-500">ついて</span></h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            ご入会の手続きは体験レッスン時または稽古時に随時承っております。
                            月謝のお支払いは現金または銀行振込となります。
                            ご不明な点がございましたら、お気軽にお問い合わせください。
                        </p>
                        <Link href="/contact" className="text-emerald-500 font-bold border-b-2 border-emerald-500 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all">
                            お問い合わせフォームはこちら
                        </Link>
                    </div>
                    <div className="bg-white p-12 shadow-2xl shadow-emerald-900/5 border border-emerald-50 rounded-[2rem]">
                        <h3 className="text-2xl font-bold text-gray-900 mb-10 border-b-2 border-emerald-500 pb-3 inline-block font-maru">ご入会時に必要なもの</h3>
                        <ul className="space-y-8">
                            {[
                                { num: "1", title: "入会金 ＋ 初回月謝", desc: "初回のみ現金でのお支払いとなります。" },
                                { num: "2", title: "印鑑", desc: "入会申込書への押印に使用します。" },
                                { num: "3", title: "動きやすい服装", desc: "体験時はTシャツ・短パン等で構いません。" },
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-5">
                                    <span className="w-8 h-8 bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 text-lg font-bold rounded-full shadow-lg shadow-emerald-500/20">{item.num}</span>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg font-maru">{item.title}</p>
                                        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

