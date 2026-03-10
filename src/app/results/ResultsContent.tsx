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
};

// ダミーデータ
const resultsData: ResultItem[] = [
    {
        id: "tourney-009",
        date: "2025.10.15",
        title: "第9回帯会スパーリング大会",
        class: "小学6年生男子の部",
        rank: "準優勝",
        rankColor: "silver",
        name: "田中 太郎",
        image: "/tk-2025.png",
    },
    {
        id: "tourney-008",
        date: "2025.09.20",
        title: "第8回帯会スパーリング大会",
        class: "中学生男子 軽量級",
        rank: "第3位",
        rankColor: "bronze",
        name: "佐藤 健太"
    },
    {
        id: "tourney-007",
        date: "2025.08.05",
        title: "第7回帯会スパーリング大会",
        class: "小学3年生男女混合",
        rank: "ベスト8",
        rankColor: "default",
        name: "鈴木 一郎"
    },
    {
        id: "tourney-006",
        date: "2025.07.12",
        title: "第6回帯会スパーリング大会",
        class: "幼年の部",
        rank: "優勝",
        rankColor: "gold",
        name: "高橋 次郎"
    },
    {
        id: "tourney-005",
        date: "2024.4.28",
        title: "第5回帯会スパーリング大会",
        class: "ー",
        rank: "優勝",
        rankColor: "gold",
        name: "山田 花子",
    }
];

export default function ResultsContent() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800 min-h-screen">
            {/* ヒーローセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-12">
                <div className="border-l-8 border-orange-500 pl-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                        RESULTS
                    </h1>
                    <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">大会結果一覧</p>
                </div>
            </section>

            {/* 結果リスト（カード型） */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <p className="text-gray-600 mb-10 leading-relaxed text-center md:text-left max-w-3xl">
                    帯会の選手たちの大会出場結果、入賞実績をご報告します。<br className="hidden md:inline" />
                    日々の稽古の成果を発揮し、多くの選手が素晴らしい成績を収めています。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resultsData.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-3xl shadow-lg border border-orange-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                            {/* 画像エリア */}
                            <div className="relative aspect-video w-full overflow-hidden">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-orange-50/50">
                                        <span className="text-orange-200 font-bold text-lg tracking-widest">OBIKAI RESULTS</span>
                                    </div>
                                )}
                            </div>

                            {/* コンテンツエリア */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {item.date}
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-6 line-clamp-2 font-maru">
                                    {item.title}
                                </h3>

                                <div className="flex-1">
                                    {/* 階級・部門・順位バッジは非表示 */}
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <Link
                                        href={`/results/${item.id}`}
                                        className="block w-full text-center bg-gray-50 hover:bg-orange-500 hover:text-white text-orange-600 font-bold py-3 rounded-xl transition-all duration-300 border border-gray-100 font-maru"
                                    >
                                        詳細を見る
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 text-center">
                <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-maru">
                        目指せ、表彰台！
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
                        帯会では、大会出場を目指す選手クラスの指導も行っています。<br />
                        強くなりたい、試合で勝ちたいという目標を持つ仲間を待っています。
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/class" className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors">
                            選手クラスを見る
                        </Link>
                        <Link href="/contact" className="bg-orange-500 text-white border-2 border-orange-500 px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
                            お問い合わせ
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
