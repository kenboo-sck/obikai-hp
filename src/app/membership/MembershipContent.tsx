"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function MembershipContent() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800">
            {/* ヒーローセクション */}
            <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.05] whitespace-nowrap">
                    <span className="text-[10rem] font-bold text-gray-900 uppercase">JOIN US</span>
                </div>

                <div className="relative z-10">
                    <div className="border-l-8 border-orange-500 pl-6 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                            MEMBERSHIP
                        </h1>
                        <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">入会案内 / 料金プラン</p>
                    </div>
                </div>
            </section>

            {/* キャンペーンセクション */}
            <section className="relative w-full mb-24 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 py-16 md:py-20 text-white relative flex items-center min-h-[400px]">
                    <div className="absolute inset-0 bg-black/5 z-0"></div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center md:text-left">
                        <div className="inline-block bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 rounded-full backdrop-blur-md border border-white/30">
                            New Member Campaign
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight font-maru">
                            <span className="text-white">START DOJO LIFE</span><br />
                            入会キャンペーン実施中
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left max-w-4xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
                                <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-2">Benefit 01</p>
                                <p className="text-xl font-bold font-maru">空手着プレゼント</p>
                                <p className="text-sm font-bold bg-orange-500 inline-block px-3 py-1 rounded-full mt-2">12,000円相当</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
                                <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-2">Benefit 02</p>
                                <p className="text-xl font-bold font-maru">親子割り引き</p>
                                <p className="text-sm font-bold bg-orange-500 inline-block px-3 py-1 rounded-full mt-2">毎月の月謝 -1,000円</p>
                            </div>
                        </div>

                        <div className="mb-10 text-left">
                            <p className="text-sm font-medium text-white/90 max-w-xl leading-relaxed">
                                ※キャンペーンの適用には一定期間の継続利用が条件となります。<br />
                                ※定員に達し次第終了となりますのでお早めにお申し込みください。
                            </p>
                        </div>

                        <div className="text-left">
                            <Link href="/contact" className="inline-block bg-white text-orange-500 px-10 py-4 font-bold text-lg hover:bg-orange-50 transition-all rounded-full shadow-lg font-maru">
                                体験予約はこちら
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 料金セクション */}
            <section className="bg-gray-50 py-24 mb-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">PRICING</h2>
                        <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">料金プラン</p>
                    </div>



                    {/* 月額プラン見出し */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-4">Monthly Plans</h3>
                        <p className="text-gray-500 text-sm mt-1 pl-5">月額会員プラン</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {/* 幼児 */}
                        <div className="group relative bg-white p-6 border border-gray-100 shadow-lg rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                            <div className="mb-4">
                                <span className="text-xs text-yellow-500 font-bold tracking-widest uppercase">Toddler</span>
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
                        <div className="group relative bg-white p-6 border border-gray-100 shadow-lg rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                            <div className="mb-4">
                                <span className="text-xs text-green-600 font-bold tracking-widest uppercase">Elementary</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">小学生</h3>
                                <p className="text-gray-400 text-xs mt-1">1年生〜6年生</p>
                            </div>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-bold text-gray-900">3,000</span>
                                <span className="text-lg font-bold text-gray-900">円</span>
                                <span className="text-gray-400 text-sm font-bold">/ 月</span>
                            </div>
                            <ul className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 基礎体力の向上</li>
                                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 武道の精神を学ぶ</li>
                            </ul>
                        </div>

                        {/* 中学生〜高校生 */}
                        <div className="group relative bg-white p-6 border border-gray-100 shadow-lg rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-orange-300"></div>
                            <div className="mb-4">
                                <span className="text-xs text-orange-500 font-bold tracking-widest uppercase">Student</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">中学生〜高校生</h3>
                                <p className="text-gray-400 text-xs mt-1">中学1年〜高校3年</p>
                            </div>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-bold text-gray-900">3,500</span>
                                <span className="text-lg font-bold text-gray-900">円</span>
                                <span className="text-gray-400 text-sm font-bold">/ 月</span>
                            </div>
                            <ul className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                                <li className="flex items-center gap-2"><span className="text-orange-500">✓</span> 実戦技術の習得</li>
                                <li className="flex items-center gap-2"><span className="text-orange-500">✓</span> 部活動との両立</li>
                            </ul>
                        </div>

                        {/* 社会人 */}
                        <div className="group relative bg-white p-6 border border-gray-100 shadow-lg rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-orange-400"></div>
                            <div className="mb-4">
                                <span className="text-xs text-orange-500 font-bold tracking-widest uppercase">Adult</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">社会人</h3>
                                <p className="text-gray-400 text-xs mt-1">一般・シニア</p>
                            </div>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-bold text-gray-900">5,000</span>
                                <span className="text-lg font-bold text-gray-900">円</span>
                                <span className="text-gray-400 text-sm font-bold">/ 月</span>
                            </div>
                            <ul className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                                <li className="flex items-center gap-2"><span className="text-orange-500">✓</span> 健康維持・ストレス発散</li>
                                <li className="flex items-center gap-2"><span className="text-orange-500">✓</span> 本格的な格闘技</li>
                            </ul>
                        </div>
                    </div>

                    {/* 親子割引バナー */}
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 p-8 rounded-xl shadow-lg relative overflow-hidden mb-16 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-shadow">
                        <div>
                            <span className="bg-white text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Special Discount</span>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">親子割引</h3>
                            <p className="text-pink-100 text-sm font-medium">親子で入会されると、毎月の会費がお得になります。</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                            <div className="text-right">
                                <p className="text-xs text-pink-100">毎月の会費から</p>
                                <p className="text-3xl font-bold leading-none">-1,000<span className="text-sm">円</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-16">
                        <Link href="/schedule" className="inline-block bg-orange-500 text-white px-12 py-4 font-bold text-lg hover:bg-orange-600 transition-all rounded-full shadow-md hover:shadow-lg hover:-translate-y-1">
                            スケジュールを見る
                        </Link>
                    </div>

                </div>
            </section>

            {/* 入会手続きセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">HOW TO JOIN</h2>
                        <p className="text-orange-500 font-bold mb-6 tracking-widest">ご入会について</p>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            ご入会の手続きは体験レッスン時または稽古時に承っております。
                            月謝のお支払いは現金または銀行振込となります。
                            見学・無料体験も随時受け付けておりますので、まずはお気軽にお問い合わせください。
                        </p>
                    </div>
                    <div className="bg-white p-10 shadow-lg border border-gray-100 rounded-xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 border-b-2 border-orange-500 pb-2 inline-block">ご入会時に必要なもの</h3>
                        <ul className="space-y-6 text-gray-700">
                            <li className="flex items-start gap-4">
                                <span className="w-6 h-6 bg-orange-400 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold rounded-full">1</span>
                                <div>
                                    <p className="font-bold">初回月謝</p>
                                    <p className="text-sm text-gray-500">現金でのお支払いとなります。</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="w-6 h-6 bg-orange-400 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold rounded-full">2</span>
                                <div>
                                    <p className="font-bold">印鑑</p>
                                    <p className="text-sm text-gray-500">入会申込書への押印に使用します。</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="w-6 h-6 bg-orange-400 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold rounded-full">3</span>
                                <div>
                                    <p className="font-bold">動きやすい服装</p>
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
