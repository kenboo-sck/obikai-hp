"use client";

import Image from 'next/image';
import Link from 'next/link';

const classCategories = [
    {
        category: "KARATE LESSON",
        sub: "空手クラス",
        classes: [
            {
                title: "全体稽古クラス",
                en: "General Training",
                desc: "子供から大人まで、初心者から上級者まで、全ての会員が参加できる合同クラスです。基本稽古から移動稽古、型、組手まで、空手の総合的な技術を磨きます。年齢やレベルを超えて共に汗を流すことで、道場としての一体感も育まれます。",
                image: "/o-1003.jpg",
                recommended: ["まずはこちらから", "親子で参加したい方", "基本から応用まで学びたい方"]
            },
            {
                title: "キッズクラス",
                en: "Kids Class",
                desc: "年中〜小学1年生を主な対象としたクラスです。礼儀作法の習得を第一に、大きな声での挨拶や返事、話を聞く姿勢などを身につけます。楽しみながら体を動かし、空手の基礎を少しずつ学んでいきます。",
                image: "/o-001.jpg",
                recommended: ["礼儀を身につけたい", "初めての習い事に", "体を動かすのが好きなお子様"]
            },
            {
                title: "基本稽古クラス",
                en: "Basic Training",
                desc: "小学2年生から一般部を対象とした、基礎重視のクラスです。立ち方、突き、蹴りなどの基本動作を徹底的に反復練習します。正しいフォームを身につけることで、怪我の防止や技術の向上につながります。初心者の方にも最適です。",
                image: "/o-1004.jpg",
                recommended: ["基礎を固めたい方", "初心者の方", "フォームを見直したい方"]
            }
        ]
    },
    {
        category: "PRACTICAL KARATE",
        sub: "実戦・応用クラス",
        classes: [
            {
                title: "スパーリング＆グローブ空手",
                en: "Sparring & Glove Karate",
                desc: "実際に相手と戦う技術（組手）を学ぶクラスです。防具やグローブを着用し、安全に配慮しながら実戦感覚を養います。突きや蹴りの攻防、間合いの取り方、スタミナ配分などを実践形式で学びます。試合を目指す方や、護身術として身につけたい方におすすめです。",
                image: "/o-1005.jpg",
                recommended: ["強くなりたい方", "試合に出場したい方", "実戦技術を学びたい方"]
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
                    <span className="text-[10rem] font-bold text-gray-900 uppercase">PROGRAMS</span>
                </div>

                <div className="relative z-10">
                    <div className="border-l-8 border-orange-500 pl-6 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                            OUR <span className="text-orange-500">CLASSES</span>
                        </h1>
                        <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">クラス紹介</p>
                    </div>
                    <div className="w-full relative">
                        <p className="text-3xl md:text-5xl font-bold leading-none text-gray-900 mb-6">
                            心技体を磨く、<br />充実のプログラム。
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed text-base md:text-lg max-w-2xl">
                            実戦空手道 帯会では、幼児から大人まで、目的やレベルに合わせた多彩なクラスをご用意しています。強さを求めるだけでなく、礼節を重んじ、健康で豊かな人生を送るためのサポートをいたします。
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/schedule"
                                className="inline-block border-b-2 border-orange-500 pb-1 font-bold text-orange-500 hover:text-orange-700 hover:border-orange-700 transition-colors"
                            >
                                Check Schedule →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* カテゴリー別クラス一覧 */}
            {classCategories.map((cat, idx) => (
                <section key={idx} className={`py-24 ${idx % 2 === 1 ? 'bg-orange-50' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight leading-none">
                                {cat.category}
                            </h2>
                            <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">
                                {cat.sub}
                            </p>
                        </div>

                        <div className="flex flex-col gap-20">
                            {cat.classes.map((cls, cIdx) => (
                                <div key={cIdx} className="group flex flex-col md:flex-row gap-12 items-start">
                                    <div className="relative w-full md:w-5/12 aspect-[4/3] overflow-hidden shadow-lg rounded-xl bg-gray-200">
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
                                            <span className="text-xs font-bold tracking-widest uppercase text-orange-400">
                                                {cls.en}
                                            </span>
                                            <h3 className="text-3xl font-bold text-gray-900 mt-1">
                                                {cls.title}
                                            </h3>
                                        </div>
                                        <p className="font-sans leading-relaxed text-gray-600 text-base md:text-lg mb-8">
                                            {cls.desc}
                                        </p>

                                        {/* こんな方にお勧めセクション */}
                                        <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
                                            <h4 className="text-sm font-bold uppercase mb-4 tracking-widest text-orange-500">
                                                こんな方にお勧め
                                            </h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {cls.recommended?.map((item, rIdx) => (
                                                    <li key={rIdx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-[10px] bg-orange-100 text-orange-500 rounded-full">✓</span>
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

            {/* 下部CTA */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="bg-orange-400 p-12 md:p-20 text-center text-white relative overflow-hidden shadow-xl rounded-2xl">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">
                            Ready to <span className="text-orange-100">Train?</span>
                        </h2>
                        <p className="font-sans max-w-xl mx-auto mb-12 text-lg text-white/90">
                            まずは体験・見学にお越しください。<br />
                            道場の雰囲気や指導内容を肌で感じていただけます。
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <Link href="/schedule" className="bg-white text-orange-500 px-10 py-4 font-bold text-lg hover:bg-orange-50 transition-all rounded-full shadow-lg">
                                スケジュールを確認
                            </Link>
                            <Link href="/contact" className="bg-orange-600 text-white px-10 py-4 font-bold text-lg hover:bg-orange-700 transition-all rounded-full shadow-lg border border-orange-400">
                                キャンペーンを利用して体験
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
