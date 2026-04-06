"use client";

import Image from 'next/image';
import Link from 'next/link';

const classCategories = [
    {
        category: "MAIN PROGRAMS",
        sub: "基本プログラム",
        classes: [
            {
                title: "空手クラス",
                en: "Karate Class",
                notice: "お子さんと一緒に参加されるパパさんも大歓迎です！",
                desc: "基本的な動作から応用まで、幅広い年齢層で一緒に汗を流すクラスです。基本稽古、移動稽古、型、そして実戦的な技術まで、空手の総合的な技術を体系的に磨きます。初心者から経験者まで、レベルに合わせた丁寧な指導を行います。",
                image: "/IMG_0694.jpeg",
                recommended: ["武道を一から学びたい方", "親子で参加したい方", "礼儀作法を身につけたい方"]
            },
            {
                title: "キックボクシングクラス",
                en: "Kickboxing Class",
                notice: "お子さんと一緒に参加されるパパさんも大歓迎です！",
                desc: "グローブを着用し、実戦的な打撃技術（パンチ・蹴り）を学ぶクラスです。ダイエットや体力作り、ストレス発散を目的とした方から、本格的な技術習得を目指す方まで、それぞれの目標に合わせて楽しくトレーニングを行います。",
                image: "/o-1005.jpg",
                recommended: ["楽しく体を動かしたい方", "ストレス発散したい方", "実戦的な打撃技術を学びたい方"]
            },
            {
                title: "キッズ・初心者クラス",
                en: "Kids & Beginner Class",
                desc: "年中〜小学生や、格闘技が初めての方を対象としたクラスです。遊びの要素も取り入れながら、楽しみながら基本を学び、体を動かす楽しさと礼儀を身につけることを目標にしています。運動能力の向上にも最適です。",
                image: "/IMG_1297.jpeg",
                recommended: ["初めての習い事として", "運動が苦手なお子様", "基礎からゆっくり学びたい方"]
            }
        ]
    }
];

export default function ClassContent() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800">
            {/* ヒーローセクション */}
            <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 select-none pointer-events-none z-0 opacity-[0.05] whitespace-nowrap">
                    <span className="text-[10rem] font-bold text-gray-900">プログラム</span>
                </div>

                <div className="relative z-10">
                    <div className="border-l-8 border-emerald-500 pl-6 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none tracking-widest font-maru">
                            クラス<span className="text-emerald-500">紹介</span>
                        </h1>
                    </div>
                    <div className="w-full relative">
                        <p className="text-[6.5vw] sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6 font-maru whitespace-nowrap tracking-tight">
                            心技体を磨く、充実のプログラム。
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed text-base md:text-lg text-justify">
                            実戦空手道 帯会では、幼児から大人まで、目的やレベルに合わせた多彩なクラスをご用意しています。強さを求めるだけでなく、礼節を重んじ、健康で豊かな人生を送るためのサポートをいたします。
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/schedule"
                                className="inline-block border-b-2 border-emerald-500 pb-1 font-bold text-emerald-500 hover:text-emerald-700 hover:border-emerald-700 transition-colors"
                            >
                                スケジュールを確認 →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* カテゴリー別クラス一覧 */}
            {classCategories.map((cat, idx) => (
                <section key={idx} className={`py-24 ${idx % 2 === 1 ? 'bg-emerald-50' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-none font-maru">
                                {cat.sub}
                            </h2>
                        </div>

                        <div className="flex flex-col gap-20">
                            {cat.classes.map((cls, cIdx) => (
                                <div key={cIdx} className="group flex flex-col md:flex-row gap-12 items-start">
                                    <div className="relative w-full md:w-5/12 aspect-[4/3] overflow-hidden shadow-lg bg-gray-200">
                                        <Image
                                            src={cls.image}
                                            alt={cls.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            unoptimized={true}
                                        />
                                    </div>

                                    <div className="w-full md:w-7/12">
                                        <div className="mb-4">
                                            {/* Removed duplicated en text */}
                                            <h3 className="text-3xl font-bold text-gray-900 mt-1">
                                                {cls.title}
                                            </h3>
                                        </div>
                                        {/* Notice: パパさん大歓迎の一文を目立つように表示 */}
                                        {('notice' in cls) && (
                                            <div className="mb-6">
                                                <span className="inline-block bg-yellow-100 border border-yellow-200 text-yellow-800 font-bold px-4 py-2 text-sm">
                                                    {(cls as any).notice}
                                                </span>
                                            </div>
                                        )}
                                        <p className="font-sans leading-relaxed text-gray-600 text-base md:text-lg mb-8 text-justify">
                                            {cls.desc}
                                        </p>

                                        {/* こんな方にお勧めセクション */}
                                        <div className="p-6 bg-white border border-gray-100 shadow-sm">
                                            <h4 className="text-sm font-bold uppercase mb-4 tracking-widest text-emerald-500">
                                                こんな方にお勧め
                                            </h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {cls.recommended?.map((item, rIdx) => (
                                                    <li key={rIdx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-[10px] bg-emerald-100 text-emerald-500">✓</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* 稽古風景フォトセクション */}
            <section className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="relative aspect-[3/4] overflow-hidden shadow-md">
                            <Image src="/activity-7.jpg" alt="稽古風景" fill className="object-cover" />
                        </div>
                        <div className="relative aspect-[3/4] overflow-hidden shadow-md mt-8 md:mt-12">
                            <Image src="/activity-8.jpg" alt="稽古風景" fill className="object-cover" />
                        </div>
                        <div className="relative aspect-[3/4] overflow-hidden shadow-md">
                            <Image src="/activity-9.jpg" alt="稽古風景" fill className="object-cover" />
                        </div>
                        <div className="relative aspect-[3/4] overflow-hidden shadow-md mt-8 md:mt-12">
                            <Image src="/o-1001.jpg" alt="稽古風景" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 下部CTA */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="bg-emerald-400 p-12 md:p-20 text-center text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 font-maru tracking-widest">
                            さあ、<span className="text-emerald-100">始めよう！</span>
                        </h2>
                        <p className="font-sans max-w-xl mx-auto mb-12 text-lg text-white/90">
                            まずは体験・見学にお越しください。<br />
                            道場の雰囲気や指導内容を肌で感じていただけます。
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <Link href="/schedule" className="bg-white text-emerald-500 px-10 py-4 font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg">
                                スケジュールを確認
                            </Link>
                            <Link href="/contact" className="bg-emerald-600 text-white px-10 py-4 font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg border border-emerald-400">
                                キャンペーンを利用して体験
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
