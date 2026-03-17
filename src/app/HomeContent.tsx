"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from 'next/image';
import Link from 'next/link';

export default function HomeContent() {
    const [newsList, setNewsList] = useState<any[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const q = query(
                    collection(db, "news"),
                    where("status", "==", "published")
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as any[];
                // クライアント側で日付順にソートして最新3件を取得
                const sortedData = data.sort((a: any, b: any) => (b.date > a.date ? 1 : -1)).slice(0, 3);
                setNewsList(sortedData);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    const features = [
        { title: "親子で", subtitle: "親子で一緒に", desc: "親子で一緒に汗を流し、共通の話題で絆を深めることができます。" },
        { title: "子供の成長", subtitle: "子供の成長", desc: "礼儀作法から始まり、強い体と心の強さを育みます。" },
        { title: "初心者対象", subtitle: "初心者歓迎", desc: "運動経験がなくても大丈夫。基本から丁寧に指導します。" },
    ];

    return (
        <main className="bg-white min-h-screen pt-20 font-sans text-gray-800">
            {/* ヒーローセクション */}
            <section className="relative min-h-[60vh] md:h-[80vh] flex items-center justify-center bg-emerald-50 overflow-hidden">
                {/* 背景画像 */}
                <Image
                    src="/o-002.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />

                {/* オーバーレイ (テキストの可読性確保のため) */}
                <div className="absolute inset-0 bg-[#ffffff]/70"></div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 tracking-tight mb-6 leading-tight font-maru">
                        親子で始める空手教室<br />
                        <span className="text-emerald-500 text-2xl md:text-4xl mt-4 inline-block">フルコンタクト空手とキックボクシング</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed font-maru">
                        空手とキックボクシングをどちらも学べる新しい形の道場。<br className="hidden md:block" />
                        礼節を学び、強く優しい心を育む「帯会」へようこそ。
                    </p>
                    <div className="flex flex-col items-center gap-6">
                        {/* 大会告知バナー導線 */}
                        <Link 
                            href="/sparing-tournament"
                            className="group relative flex items-center gap-4 bg-white/80 hover:bg-white backdrop-blur-sm px-6 py-3 rounded-2xl border-2 border-emerald-400 text-emerald-700 shadow-xl transition-all hover:-translate-y-1"
                        >
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="font-bold font-maru">第10回 スパーリング大会 開催決定！概要はこちら</span>
                            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                        </Link>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-lg">
                            <Link
                                href="/contact"
                                className="bg-emerald-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 transform"
                            >
                                無料体験に申し込む
                            </Link>
                            <Link
                                href="/class"
                                className="bg-white text-gray-700 border-2 border-gray-100 px-10 py-5 rounded-full font-bold text-lg hover:border-emerald-300 hover:text-emerald-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
                            >
                                クラス紹介を見る
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* キャンペーンセクション */}
            <section className="bg-gradient-to-r from-emerald-400 to-teal-400 py-12 text-white overflow-hidden relative">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-bold tracking-widest backdrop-blur-sm border border-white/30 mb-4 font-maru">
                        特別キャンペーン
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight font-maru">
                        今ならお得なキャンペーン実施中！
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
                        {/* 特典1 */}
                        <div className="bg-white text-gray-800 p-6 rounded-2xl flex-1 shadow-xl border-2 border-emerald-100">
                            <div className="text-emerald-500 font-bold text-sm mb-2 uppercase tracking-wide">特典 01</div>
                            <div className="text-xl md:text-2xl font-bold mb-2 font-maru">空手着プレゼント</div>
                            <div className="text-white font-bold text-sm bg-emerald-400 inline-block px-3 py-1 rounded-full">
                                12,000円相当
                            </div>
                        </div>
                        {/* 特典2 */}
                        <div className="bg-white text-gray-800 p-6 rounded-2xl flex-1 shadow-xl border-2 border-emerald-100">
                            <div className="text-emerald-500 font-bold text-sm mb-2 uppercase tracking-wide">特典 02</div>
                            <div className="text-xl md:text-2xl font-bold mb-2 font-maru">親子割り引き</div>
                            <div className="text-white font-bold text-sm bg-emerald-400 inline-block px-3 py-1 rounded-full">
                                毎月の月謝 -1,000円
                            </div>
                        </div>
                    </div>
                    <p className="mt-6 text-white/90 text-xs md:text-sm font-maru">※キャンペーンの詳細は体験時にスタッフまでお問い合わせください。</p>
                </div>
            </section>

            {/* コンセプトセクション */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-emerald-400 font-bold tracking-widest text-sm">道場の思い</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6 font-maru">
                            強く、正しく、美しく。
                        </h2>
                        <p className="text-gray-600 leading-loose text-lg font-maru">
                            帯会（OBIKAI）は、実戦空手とキックボクシングを融合させた独自のスタイルで、<br className="hidden md:block" />
                            心技体をバランスよく鍛えることができる道場です。<br />
                            小学生・中学生を中心に、もちろん大人の方まで、<br className="hidden md:block" />
                            それぞれの目的に合わせた指導を行っています。
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1: Lightest Green */}
                        <div className="relative bg-gradient-to-br from-emerald-50/40 to-white p-10 rounded-3xl shadow-xl border border-emerald-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full -mr-16 -mt-16"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black shadow-md group-hover:scale-110 transition-transform">
                                    01
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-maru">親子で一緒に</h3>
                                <p className="text-emerald-500 font-bold text-sm mb-4">親子の絆を深める</p>
                                <p className="text-gray-600 leading-relaxed text-sm font-maru">
                                    親子で一緒に汗を流し、共通の話題で絆を深めることができます。
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Light Green */}
                        <div className="relative bg-gradient-to-br from-emerald-50/80 to-emerald-50/40 p-10 rounded-3xl shadow-xl border border-emerald-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full -mr-16 -mt-16"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black shadow-md group-hover:scale-110 transition-transform">
                                    02
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-maru">子供の成長</h3>
                                <p className="text-emerald-500 font-bold text-sm mb-4">心身を鍛える</p>
                                <p className="text-gray-600 leading-relaxed text-sm font-maru">
                                    礼儀作法から始まり、強い体と心の強さを育みます。
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Medium-Light Green */}
                        <div className="relative bg-gradient-to-br from-emerald-100/60 to-emerald-50 p-10 rounded-3xl shadow-xl border border-emerald-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/40 rounded-full -mr-16 -mt-16"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black shadow-md group-hover:scale-110 transition-transform">
                                    03
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-maru">初心者歓迎</h3>
                                <p className="text-emerald-600 font-bold text-sm mb-4">基本から丁寧に</p>
                                <p className="text-gray-600 leading-relaxed text-sm font-maru">
                                    運動経験がなくても大丈夫。基本から丁寧に指導します。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* アクセス/情報セクション (簡易版) */}
            <section className="bg-emerald-50 py-20 flex flex-col items-center">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 w-full">
                            {/* 画像プレースホルダー */}
                            <div className="bg-white rounded-3xl w-full aspect-video flex items-center justify-center overflow-hidden shadow-xl relative">
                                <Image
                                    src="/o-1006.jpg"
                                    alt="Activities"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <span className="text-emerald-400 font-bold tracking-widest text-sm">道場について</span>
                            <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-6 font-maru">
                                地域に根ざした<br />活動場所
                            </h2>
                            <p className="text-gray-600 leading-relaxed max-w-lg mb-6 font-maru">
                                新発田市内の学校体育館やコミュニティセンターで活動中。<br />
                                お住まいの近くや、通いやすい場所を選んで稽古に参加できます。<br />
                                なじみのある場所で、リラックスして空手に打ち込めます。
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-emerald-300 rounded-full flex-shrink-0"></span>
                                    <span className="text-gray-700 font-medium font-maru">初心者から上級者まで対応</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-emerald-300 rounded-full flex-shrink-0"></span>
                                    <span className="text-gray-700 font-medium font-maru">広々とした体育館でのびのび稽古</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-emerald-300 rounded-full flex-shrink-0"></span>
                                    <span className="text-gray-700 font-medium font-maru">道具レンタルあり（手ぶらでOK）</span>
                                </li>
                            </ul>
                            <Link href="/access" className="inline-flex items-center gap-2 bg-white border-2 border-emerald-400 text-emerald-500 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-md group font-maru">
                                アクセス詳細を見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ニュースセクション */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-10 pb-4 border-b border-emerald-100">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 font-maru">お知らせ</h2>
                            <p className="text-emerald-300 mt-2 text-xs font-bold tracking-widest">新着情報</p>
                        </div>
                        <Link href="/news" className="hidden md:inline-flex items-center gap-1 bg-white border border-emerald-400 text-emerald-500 px-6 py-2 rounded-full font-bold text-sm hover:bg-emerald-50 transition-all shadow-sm font-maru">
                            一覧を見る →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {newsList.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.id}`}
                                className="group bg-white rounded-2xl overflow-hidden border border-emerald-100 hover:shadow-xl transition-all hover:-translate-y-1 block h-full flex flex-col"
                            >
                                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                    {(item.image || item.imageUrl || item.thumbnail) ? (
                                        <Image
                                            src={item.image || item.imageUrl || item.thumbnail}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-300 font-bold text-sm bg-emerald-50">画像なし</div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2 py-1 rounded-full font-bold">
                                            {item.category || "お知らせ"}
                                        </span>
                                        <span className="text-gray-400 text-xs font-medium">
                                            {item.date?.seconds
                                                ? new Date(item.date.seconds * 1000).toLocaleDateString('ja-JP').replace(/\//g, '.')
                                                : typeof item.date === 'string'
                                                    ? item.date.replace(/-/g, '.')
                                                    : '---'}
                                        </span>
                                    </div>
                                    <h3 className="text-gray-800 font-bold group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug font-maru">
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10 text-center md:hidden">
                        <Link href="/news" className="inline-block border-2 border-emerald-400 text-emerald-500 px-8 py-3 rounded-full font-bold text-sm hover:bg-emerald-50 transition-all font-maru">
                            お知らせ一覧
                        </Link>
                    </div>
                </div>
            </section>

            {/* 大会結果セクション */}
            <section className="py-20 bg-[#ffffff] border-t border-emerald-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-emerald-400 font-bold tracking-widest text-sm">大会実績一覧</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 font-maru">
                            大会実績
                        </h2>
                        <p className="text-gray-600 mt-4 leading-relaxed mb-6 font-maru">
                            日々の稽古の成果を発揮し、多くの大会で入賞しています。
                        </p>
                        <Link href="/results" className="inline-block bg-white border-2 border-emerald-400 text-emerald-500 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-md group font-maru">
                            大会結果一覧を見る <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>

                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                        {/* 結果リストアイテム */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-100 flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="mb-4">
                                <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    2025.10.15
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-8 font-maru leading-snug flex-1">
                                第9回帯会スパーリング大会
                            </h3>
                            <Link
                                href="/results/tourney-009"
                                className="block w-full text-center bg-gray-50 hover:bg-emerald-500 hover:text-white text-emerald-600 font-bold py-3 rounded-xl transition-all duration-300 border border-gray-100 font-maru"
                            >
                                詳細を見る
                            </Link>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-100 flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="mb-4">
                                <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    2025.09.20
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-8 font-maru leading-snug flex-1">
                                第8回帯会スパーリング大会
                            </h3>
                            <Link
                                href="/results/tourney-008"
                                className="block w-full text-center bg-gray-50 hover:bg-emerald-500 hover:text-white text-emerald-600 font-bold py-3 rounded-xl transition-all duration-300 border border-gray-100 font-maru"
                            >
                                詳細を見る
                            </Link>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-100 flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="mb-4">
                                <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    2025.08.05
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-8 font-maru leading-snug flex-1">
                                第7回帯会スパーリング大会
                            </h3>
                            <Link
                                href="/results/tourney-007"
                                className="block w-full text-center bg-gray-50 hover:bg-emerald-500 hover:text-white text-emerald-600 font-bold py-3 rounded-xl transition-all duration-300 border border-gray-100 font-maru"
                            >
                                詳細を見る
                            </Link>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-gray-400 text-xs">※掲載している実績は一部です</p>
                    </div>
                </div>
            </section>

            {/* CTAセクション */}
            <section className="bg-emerald-400 py-24 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-maru">
                        まずは体験してみませんか？
                    </h2>
                    <p className="text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed text-lg font-maru">
                        空手やキックボクシングが初めての方でも安心してご参加いただけます。<br className="hidden md:block" />
                        親子での体験も大歓迎です。お気軽にお申し込みください。
                    </p>
                    <Link href="/contact" className="inline-block bg-white text-emerald-500 px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-emerald-50 transition-all transform hover:-translate-y-1 font-maru">
                        体験予約はこちら
                    </Link>
                </div>
            </section>
        </main>
    );
}
