"use client";

import Link from 'next/link';
import Image from 'next/image';

// データ型定義
type ResultItem = {
    id: string;
    date: string;
    title: string;
    class?: string;    // 出場クラス・部門
    rank: string;
    rankColor: 'gold' | 'silver' | 'bronze' | 'default';
    name: string;
    image?: string;
    organizer?: string; // 主催を追加
};

// 大会結果データ
const resultsData: ResultItem[] = [
    {
        id: "climb-up-fight-2",
        date: "2026.07.12",
        title: "第2回CLIMB UP FIGHT",
        organizer: "CLIMB UP 実行委員会",
        rank: "他",
        rankColor: "default",
        name: "田坂 宗帯 他",
    },
    {
        id: "niigata-boxing-karate-24",
        date: "2026.07.05",
        title: "第24回新潟県拳闘空手道選手権大会",
        organizer: "拳闘空手道連合会",
        rank: "優勝",
        rankColor: "gold",
        name: "井上 心太郎 他",
    },
    {
        id: "ibaraki-karate-6",
        date: "2026.06.28",
        title: "第6回茨城県空手道選手権大会",
        organizer: "武将會",
        rank: "準優勝",
        rankColor: "silver",
        name: "井上 丈太郎 他",
    },
    {
        id: "niigata-karate-27",
        date: "2026.06.07",
        title: "第27回新潟県空手道選手権大会",
        organizer: "新極真会新潟支部",
        rank: "優勝",
        rankColor: "gold",
        name: "村田 大珂 他",
    }
];

export default function ResultsContent() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800 min-h-screen">
            {/* ヒーローセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-12">
                <div className="border-l-8 border-emerald-500 pl-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none tracking-widest font-maru">
                        大会<span className="text-emerald-500">結果</span>
                    </h1>
                </div>
            </section>

            {/* 結果リスト（カード型） */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <p className="text-gray-600 mb-10 leading-relaxed text-center md:text-left max-w-3xl">
                    帯会の選手たちの大会出場結果、入賞実績をご報告します。<br className="hidden md:inline" />
                    日々の稽古の成果を発揮し、多くの選手が素晴らしい成績を収めています。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resultsData.length > 0 ? (
                        resultsData.map((item, idx) => (
                            <div key={idx} className="bg-white shadow-lg border border-emerald-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                {/* 画像エリア（画像がある場合のみ表示） */}
                                {item.image && (
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                )}

                                {/* コンテンツエリア */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {item.date}
                                    </div>

                                    {item.organizer && (
                                        <div className="text-xs font-bold text-emerald-600 mb-3 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            主催: {item.organizer}
                                        </div>
                                    )}

                                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-6 line-clamp-2 font-maru">
                                        {item.title}
                                    </h3>

                                    <div className="flex-1">
                                        {/* 階級・部門・順位バッジは非表示 */}
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <Link
                                            href={`/results/${item.id}`}
                                            className="block w-full text-center bg-gray-50 hover:bg-emerald-500 hover:text-white text-emerald-600 font-bold py-3 transition-all duration-300 border border-gray-100 font-maru"
                                        >
                                            詳細を見る
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-gray-500 font-bold">現在、掲載する大会結果はありません。</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 text-center">
                <div className="bg-white p-12 shadow-lg border border-gray-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-maru">
                        目指せ、表彰台！
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
                        帯会では、大会出場を目指す選手クラスの指導も行っています。<br />
                        強くなりたい、試合で勝ちたいという目標を持つ仲間を待っています。
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/class" className="bg-white text-emerald-500 border-2 border-emerald-500 px-8 py-3 font-bold hover:bg-emerald-50 transition-colors">
                            選手クラスを見る
                        </Link>
                        <Link href="/contact" className="bg-emerald-500 text-white border-2 border-emerald-500 px-8 py-3 font-bold hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
                            お問い合わせ
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
