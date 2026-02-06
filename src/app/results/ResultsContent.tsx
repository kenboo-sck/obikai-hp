"use client";

import Link from 'next/link';
import Image from 'next/image';

// データ型定義
type ResultItem = {
    date: string;
    title: string;
    location?: string; // 開催場所
    class?: string;    // 出場クラス・部門
    rank: string;
    rankColor: 'gold' | 'silver' | 'bronze' | 'default';
    name: string;
    image?: string;
};

// ダミーデータ
const resultsData: ResultItem[] = [
    {
        date: "2025.10.15",
        title: "第10回 大阪府空手道選手権大会",
        location: "大阪府立体育会館",
        class: "小学6年生男子の部",
        rank: "準優勝",
        rankColor: "silver",
        name: "田中 太郎",
    },
    {
        date: "2025.09.20",
        title: "関西ジュニア空手道選手権",
        location: "兵庫県立武道館",
        class: "中学生男子 軽量級",
        rank: "第3位",
        rankColor: "bronze",
        name: "佐藤 健太"
    },
    {
        date: "2025.08.05",
        title: "全国空手道選手権大会 予選",
        location: "東京武道館",
        class: "小学3年生男女混合",
        rank: "ベスト8",
        rankColor: "default",
        name: "鈴木 一郎"
    },
    {
        date: "2025.07.12",
        title: "夏期交流試合",
        location: "市民体育館",
        class: "幼年の部",
        rank: "優勝",
        rankColor: "gold",
        name: "高橋 次郎"
    },
    {
        date: "2024.4.28",
        title: "第4回スパーリング大会",
        location: "新発田カルチャーセンター",
        class: "ー",
        rank: "優勝",
        rankColor: "gold",
        name: "山田 花子",
        image: "/o-1001.jpg"
    }
];

const getRankBadgeStyle = (color: string) => {
    switch (color) {
        case 'gold':
            return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300";
        case 'silver':
            return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300";
        case 'bronze':
            return "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300";
        default:
            return "bg-orange-50 text-orange-600 border-orange-100";
    }
};

export default function ResultsContent() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800 min-h-screen">
            {/* ヒーローセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-12">
                <div className="border-l-8 border-orange-500 pl-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                        RESULTS
                    </h1>
                    <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">大会結果</p>
                </div>
            </section>

            {/* 結果リスト（カード型） */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <p className="text-gray-600 mb-10 leading-relaxed text-center md:text-left max-w-3xl">
                    帯会の選手たちの大会出場結果、入賞実績をご報告します。<br className="hidden md:inline" />
                    日々の稽古の成果を発揮し、多くの選手が素晴らしい成績を収めています。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resultsData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
                        >
                            {/* 画像エリア - 画像がない場合はプレースホルダーを表示 */}
                            <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
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
                                {/* 結果バッジを画像上に配置 */}
                                <div className="absolute top-3 right-3 shadow-lg">
                                    <span className={`px-4 py-1 text-sm font-bold rounded-full border ${getRankBadgeStyle(item.rankColor)}`}>
                                        {item.rank}
                                    </span>
                                </div>
                            </div>

                            {/* コンテンツエリア */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {item.date}
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
                                    {item.title}
                                </h3>

                                <div className="space-y-2 mb-6 flex-1">
                                    {item.location && (
                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 mt-0.5 shrink-0 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{item.location}</span>
                                        </div>
                                    )}
                                    {item.class && item.class !== "ー" && (
                                        <div className="flex items-start gap-2 text-sm text-gray-500">
                                            <span className="shrink-0 w-4 text-center text-orange-400 font-bold">・</span>
                                            <span>{item.class}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">WINNER</span>
                                        <span className="font-bold text-gray-900 text-lg">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 text-center">
                <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
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
