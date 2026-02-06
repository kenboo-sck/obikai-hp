"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function InstructorsContent() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800">
            {/* ヒーローセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-16">
                <div className="border-l-8 border-orange-500 pl-6 mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                        INSTRUCTORS
                    </h1>
                    <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">インストラクター紹介</p>
                </div>
            </section>

            {/* インストラクター詳細 */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* 画像エリア */}
                    <div className="w-full md:w-1/2 relative aspect-[3/4] overflow-hidden shadow-xl bg-gray-100 rounded-lg">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 font-bold">
                            INSTRUCTOR IMAGE
                        </div>
                        {/* 
                        <Image
                            src="/instructor_placeholder.jpg"
                            alt="Instructor"
                            fill
                            className="object-cover"
                        />
                        */}
                    </div>

                    {/* プロフィールエリア */}
                    <div className="w-full md:w-1/2 space-y-10">
                        <div>
                            <p className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">Head Instructor</p>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">代表師範 田坂 貴満</h2>
                            <div className="flex flex-wrap gap-3">
                                <span className="bg-stone-900 text-white px-4 py-1 text-xs font-bold rounded-full">
                                    実戦空手道 帯会 代表
                                </span>
                                <span className="bg-gray-100 text-gray-600 px-4 py-1 text-xs font-bold rounded-full">
                                    指導歴 10年以上
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="leading-relaxed text-gray-600">
                                武道を通じて、子供たちの心身の成長をサポートします。<br />
                                礼儀作法を重んじ、強く優しい心を育むことを目標に指導しています。<br />
                                初心者から経験者まで、一人ひとりに合わせた丁寧な指導を心がけています。
                            </p>

                            {/* 実績（プレースホルダー） */}
                            <div className="bg-gray-50 p-8 border border-gray-100 rounded-xl">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-orange-500 pb-2 inline-block">
                                    経歴・実績
                                </h3>
                                <ul className="space-y-4 text-sm text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold mt-1">●</span>
                                        <div>
                                            <p className="font-bold">主な大会実績などをここに記載</p>
                                            <p className="text-xs text-gray-500 mt-1">YYYY年 大会名 優勝</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold mt-1">●</span>
                                        <div>
                                            <p className="font-bold">指導実績などをここに記載</p>
                                            <p className="text-xs text-gray-500 mt-1">これまでの指導経験など</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6">
                            <a
                                href="#"
                                className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all hover:-translate-y-1"
                            >
                                体験・見学を予約する →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ギャラリー */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <div className="border-l-8 border-orange-500 pl-6 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-none">
                        GALLERY
                    </h2>
                    <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">活動風景</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden shadow-md flex items-center justify-center text-gray-400 font-bold">
                        IMAGE 01
                    </div>
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden shadow-md flex items-center justify-center text-gray-400 font-bold">
                        IMAGE 02
                    </div>
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden shadow-md flex items-center justify-center text-gray-400 font-bold">
                        IMAGE 03
                    </div>
                </div>
            </section>
        </div>
    );
}
