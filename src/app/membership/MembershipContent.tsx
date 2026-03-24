"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function MembershipContent() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800">

            {/* 料金セクション */}

            {/* 料金セクション */}
            <section className="bg-emerald-50/50 py-32 mb-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-widest font-maru">料金<span className="text-emerald-500">プラン</span></h2>
                    </div>

                    {/* 入会金 */}
                    <div className="mb-16">
                        <div className="bg-white p-10 border border-emerald-100 shadow-xl shadow-emerald-900/5">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-emerald-500 pl-4 font-maru">入会金</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-gray-900">3,000</span>
                                    <span className="text-xl font-bold text-gray-900">円</span>
                                </div>
                                <div className="bg-emerald-500 text-white font-bold px-6 py-2 text-sm shadow-md">
                                    ★親子で入会の場合、入会金無料
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 月額プラン見出し */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-emerald-500 pl-4 font-maru">月額会員プラン</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {/* 幼児 */}
                        <div className="group relative bg-white p-6 border border-gray-100 shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                            <div className="mb-4">
                                <span className="text-xs text-yellow-500 font-bold tracking-widest uppercase">年中〜年長</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">幼 児</h3>
                                <p className="text-gray-400 text-xs mt-1">年中〜年長</p>
                            </div>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-bold text-gray-900">2,500</span>
                                <span className="text-lg font-bold text-gray-900">円</span>
                                <span className="text-gray-400 text-sm font-bold">/ 月</span>
                            </div>
                            <ul className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                                <li className="flex items-center gap-2"><span className="text-yellow-500">✓</span> 礼儀作法の習得</li>
                                <li className="flex items-center gap-2"><span className="text-yellow-500">✓</span> 楽しく運動</li>
                            </ul>
                        </div>

                        {/* 小学生 */}
                        <div className="group relative bg-white p-6 border border-gray-100 shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                            <div className="mb-4">
                                <span className="text-xs text-emerald-600 font-bold tracking-widest uppercase">1年生〜6年生</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">小学生</h3>
                                <p className="text-gray-400 text-xs mt-1">1年生〜6年生</p>
                            </div>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-bold text-gray-900">3,000</span>
                                <span className="text-lg font-bold text-gray-900">円</span>
                                <span className="text-gray-400 text-sm font-bold">/ 月</span>
                            </div>
                            <ul className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 基礎体力の向上</li>
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 武道の精神を学ぶ</li>
                            </ul>
                        </div>

                        {/* 中学生〜高校生 */}
                        <div className="group relative bg-white p-6 border border-gray-100 shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-300"></div>
                            <div className="mb-4">
                                <span className="text-xs text-emerald-500 font-bold tracking-widest uppercase">中学1年〜高校3年</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">中学生〜高校生</h3>
                                <p className="text-gray-400 text-xs mt-1">中学1年〜高校3年</p>
                            </div>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-bold text-gray-900">3,500</span>
                                <span className="text-lg font-bold text-gray-900">円</span>
                                <span className="text-gray-400 text-sm font-bold">/ 月</span>
                            </div>
                            <ul className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 実戦技術の習得</li>
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 部活動との両立</li>
                            </ul>
                        </div>

                        {/* 社会人 */}
                        <div className="group relative bg-white p-6 border border-gray-100 shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
                            <div className="mb-4">
                                <span className="text-xs text-emerald-500 font-bold tracking-widest uppercase">一般・シニア</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">社会人</h3>
                                <p className="text-gray-400 text-xs mt-1">一般・シニア</p>
                            </div>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-bold text-gray-900">5,000</span>
                                <span className="text-lg font-bold text-gray-900">円</span>
                                <span className="text-gray-400 text-sm font-bold">/ 月</span>
                            </div>
                            <ul className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 健康維持・ストレス発散</li>
                                <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 本格的な格闘技</li>
                            </ul>
                        </div>
                    </div>

                    {/* 親子割引バナー */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 shadow-lg relative overflow-hidden mb-16 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-shadow">
                        <div>
                            <span className="bg-white text-teal-600 text-[10px] font-bold px-3 py-1 uppercase tracking-widest mb-2 inline-block">特別割引</span>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">親子・家族割引</h3>
                            <p className="text-teal-100 text-sm font-medium">ご家族で入会されると、毎月の会費がずっと割引になります。</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/10 p-4 backdrop-blur-sm border border-white/20">
                            <div className="text-right">
                                <p className="text-xs text-teal-100">毎月の会費から</p>
                                <p className="text-3xl font-bold leading-none">-1,000<span className="text-sm">円</span></p>
                            </div>
                        </div>
                        {/* 背景の装飾サークル */}
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -left-20 -top-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="text-center mb-16">
                        <Link href="/schedule" className="inline-block bg-emerald-500 text-white px-12 py-4 font-bold text-lg hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                            スケジュールを見る
                        </Link>
                    </div>
                </div>
            </section>

            {/* 入会手続きセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid md:grid-cols-2 gap-20">
                    <div>
                        <div className="inline-block bg-emerald-100 text-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4">Information</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-widest font-maru">ご入会<span className="text-emerald-500">について</span></h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            ご入会の手続きは体験レッスン時または稽古時に承っております。
                            月謝のお支払いは現金または銀行振込となります。
                            ご不明な点がございましたら、お気軽にお問い合わせください。
                        </p>
                        <Link href="/contact" className="text-emerald-500 font-bold border-b-2 border-emerald-500 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all">
                            お問い合わせフォームはこちら
                        </Link>
                    </div>
                    <div className="bg-white p-10 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 border-b-2 border-emerald-500 pb-2 inline-block font-maru">ご入会時に必要なもの</h3>
                        <ul className="space-y-6 text-gray-700">
                            <li className="flex items-start gap-4">
                                <span className="w-8 h-8 bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg shadow-emerald-500/20">1</span>
                                <div>
                                    <p className="font-bold text-lg font-maru">入会金 ＋ 初回月謝</p>
                                    <p className="text-sm text-gray-500">初回のみ現金でのお支払いとなります。</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="w-8 h-8 bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg shadow-emerald-500/20">2</span>
                                <div>
                                    <p className="font-bold text-lg font-maru">印鑑</p>
                                    <p className="text-sm text-gray-500">入会申込書への押印に使用します。</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="w-8 h-8 bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg shadow-emerald-500/20">3</span>
                                <div>
                                    <p className="font-bold text-lg font-maru">動きやすい服装</p>
                                    <p className="text-sm text-gray-500">体験時はTシャツ・短パン等で構いません。</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
