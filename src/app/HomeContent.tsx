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
        { title: "Parent & Child", subtitle: "親子で一緒に", desc: "親子で一緒に汗を流し、共通の話題で絆を深めることができます。" },
        { title: "Kid's Growth", subtitle: "子供の成長", desc: "礼儀作法から始まり、強い体と心の強さを育みます。" },
        { title: "Beginner Friendly", subtitle: "初心者歓迎", desc: "運動経験がなくても大丈夫。基本から丁寧に指導します。" },
    ];

    return (
        <main className="bg-white min-h-screen pt-20 font-sans text-gray-800">
            {/* ヒーローセクション */}
            <section className="relative min-h-[60vh] md:h-[80vh] flex items-center justify-center bg-orange-50 overflow-hidden">
                {/* 背景画像 */}
                <Image
                    src="/o-002.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />

                {/* オーバーレイ (テキストの可読性確保のため) */}
                <div className="absolute inset-0 bg-[#fffaf0]/70"></div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 tracking-tight mb-6 leading-tight font-maru">
                        親子で始める、<br />
                        <span className="text-orange-500">実戦空手道。</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed font-maru">
                        空手とキックボクシングをどちらも学べる新しい形の道場。<br className="hidden md:block" />
                        礼節を学び、強く優しい心を育む「帯会」へようこそ。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="bg-orange-400 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-maru">
                            無料体験を予約する
                        </Link>
                        <Link href="/class" className="bg-white text-orange-500 border-2 border-orange-400 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all font-maru">
                            クラス紹介を見る
                        </Link>
                    </div>
                </div>
            </section>

            {/* キャンペーンセクション */}
            <section className="bg-gradient-to-r from-orange-400 to-pink-400 py-12 text-white overflow-hidden relative">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-bold tracking-widest backdrop-blur-sm border border-white/30 mb-4 font-maru">
                        SPECIAL CAMPAIGN
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight font-maru">
                        今ならお得なキャンペーン実施中！
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
                        {/* 特典1 */}
                        <div className="bg-white text-gray-800 p-6 rounded-2xl flex-1 shadow-xl border-2 border-orange-100">
                            <div className="text-orange-500 font-bold text-sm mb-2 uppercase tracking-wide">Benefit 01</div>
                            <div className="text-xl md:text-2xl font-bold mb-2 font-maru">空手着プレゼント</div>
                            <div className="text-white font-bold text-sm bg-orange-400 inline-block px-3 py-1 rounded-full">
                                12,000円相当
                            </div>
                        </div>
                        {/* 特典2 */}
                        <div className="bg-white text-gray-800 p-6 rounded-2xl flex-1 shadow-xl border-2 border-orange-100">
                            <div className="text-orange-500 font-bold text-sm mb-2 uppercase tracking-wide">Benefit 02</div>
                            <div className="text-xl md:text-2xl font-bold mb-2 font-maru">親子割り引き</div>
                            <div className="text-white font-bold text-sm bg-orange-400 inline-block px-3 py-1 rounded-full">
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
                        <span className="text-orange-400 font-bold tracking-widest uppercase text-sm">Concept</span>
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
                        {features.map((f, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow text-center group">
                                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500 text-2xl font-bold group-hover:scale-110 transition-transform">
                                    0{i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 font-maru">{f.title}</h3>
                                <p className="text-orange-400 font-bold text-sm mb-4">{f.subtitle}</p>
                                <p className="text-gray-600 leading-relaxed text-sm font-maru">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* アクセス/情報セクション (簡易版) */}
            <section className="bg-orange-50 py-20 flex flex-col items-center">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 w-full">
                            {/* 画像プレースホルダー */}
                            <div className="bg-white rounded-3xl w-full aspect-video flex items-center justify-center overflow-hidden shadow-xl border-4 border-white relative">
                                <Image
                                    src="/o-1006.jpg"
                                    alt="Activities"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <span className="text-orange-400 font-bold tracking-widest uppercase text-sm">About Us</span>
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
                                    <span className="w-3 h-3 bg-orange-300 rounded-full flex-shrink-0"></span>
                                    <span className="text-gray-700 font-medium font-maru">初心者から上級者まで対応</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-orange-300 rounded-full flex-shrink-0"></span>
                                    <span className="text-gray-700 font-medium font-maru">広々とした体育館でのびのび稽古</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-orange-300 rounded-full flex-shrink-0"></span>
                                    <span className="text-gray-700 font-medium font-maru">道具レンタルあり（手ぶらでOK）</span>
                                </li>
                            </ul>
                            <Link href="/access" className="text-orange-500 font-bold hover:underline flex items-center gap-2 group font-maru">
                                アクセス詳細を見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ニュースセクション */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-10 pb-4 border-b border-orange-100">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 font-maru">お知らせ</h2>
                            <p className="text-orange-300 mt-2 text-xs font-bold tracking-widest uppercase">NEWS & TOPICS</p>
                        </div>
                        <Link href="/news" className="text-orange-500 font-bold text-sm hover:underline hidden md:flex items-center gap-1 font-maru">
                            一覧を見る →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {newsList.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.id}`}
                                className="group bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-xl transition-all hover:-translate-y-1 block h-full flex flex-col"
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
                                        <div className="flex items-center justify-center h-full text-gray-300 font-bold text-sm bg-orange-50">NO IMAGE</div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-orange-50 text-orange-600 text-[10px] px-2 py-1 rounded-full font-bold">
                                            {item.category || "INFO"}
                                        </span>
                                        <span className="text-gray-400 text-xs font-medium">
                                            {item.date?.seconds
                                                ? new Date(item.date.seconds * 1000).toLocaleDateString('ja-JP').replace(/\//g, '.')
                                                : typeof item.date === 'string'
                                                    ? item.date.replace(/-/g, '.')
                                                    : '---'}
                                        </span>
                                    </div>
                                    <h3 className="text-gray-800 font-bold group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug font-maru">
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10 text-center md:hidden">
                        <Link href="/news" className="inline-block border-2 border-orange-400 text-orange-500 px-8 py-3 rounded-full font-bold text-sm hover:bg-orange-50 transition-all font-maru">
                            お知らせ一覧
                        </Link>
                    </div>
                </div>
            </section>

            {/* 大会結果セクション */}
            <section className="py-20 bg-[#fffaf0] border-t border-orange-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-orange-400 font-bold tracking-widest uppercase text-sm">Tournament Results</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 font-maru">
                            大会実績
                        </h2>
                        <p className="text-gray-600 mt-4 leading-relaxed mb-6 font-maru">
                            日々の稽古の成果を発揮し、多くの大会で入賞しています。
                        </p>
                        <Link href="/results" className="inline-block text-orange-500 font-bold hover:underline group font-maru">
                            大会結果一覧を見る <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {/* 結果リストアイテム (ダミーデータ) */}
                        <div className="bg-white p-5 md:p-6 rounded-2xl border-l-8 border-orange-400 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                            <div>
                                <div className="text-sm text-gray-400 font-bold mb-1">2025.11.23</div>
                                <div className="text-lg font-bold text-gray-800 font-maru">第8回 リアルチャンピオンシップ決勝大会</div>
                                <div className="text-gray-500 text-sm mt-1">小学4年生女子 30kg未満の部</div>
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-center">
                                <span className="bg-orange-100 text-orange-700 font-bold px-4 py-1 rounded-full text-sm border border-orange-200 shrink-0">
                                    優勝
                                </span>
                                <span className="font-bold text-gray-800 whitespace-nowrap font-maru">山田 花子</span>
                            </div>
                        </div>

                        <div className="bg-white p-5 md:p-6 rounded-2xl border-l-8 border-gray-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                            <div>
                                <div className="text-sm text-gray-400 font-bold mb-1">2025.10.15</div>
                                <div className="text-lg font-bold text-gray-800 font-maru">第10回 大阪府空手道選手権大会</div>
                                <div className="text-gray-500 text-sm mt-1">小学6年生男子の部</div>
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-center">
                                <span className="bg-gray-100 text-gray-600 font-bold px-4 py-1 rounded-full text-sm border border-gray-200 shrink-0">
                                    準優勝
                                </span>
                                <span className="font-bold text-gray-800 whitespace-nowrap font-maru">田中 太郎</span>
                            </div>
                        </div>

                        <div className="bg-white p-5 md:p-6 rounded-2xl border-l-8 border-orange-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                            <div>
                                <div className="text-sm text-gray-400 font-bold mb-1">2025.09.20</div>
                                <div className="text-lg font-bold text-gray-800 font-maru">関西ジュニア空手道選手権</div>
                                <div className="text-gray-500 text-sm mt-1">中学生男子 軽量級</div>
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-center">
                                <span className="bg-orange-50 text-orange-600 font-bold px-4 py-1 rounded-full text-sm border border-orange-100 shrink-0">
                                    第3位
                                </span>
                                <span className="font-bold text-gray-800 whitespace-nowrap font-maru">佐藤 健太</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-gray-400 text-xs">※掲載している実績は一部です</p>
                    </div>
                </div>
            </section>

            {/* CTAセクション */}
            <section className="bg-orange-400 py-24 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-maru">
                        まずは体験してみませんか？
                    </h2>
                    <p className="text-white/90 mb-10 max-w-xl mx-auto leading-relaxed text-lg font-maru">
                        空手やキックボクシングが初めての方でも安心してご参加いただけます。<br />
                        親子での体験も大歓迎です。お気軽にお申し込みください。
                    </p>
                    <Link href="/contact" className="inline-block bg-white text-orange-500 px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-orange-50 transition-all transform hover:-translate-y-1 font-maru">
                        体験予約はこちら
                    </Link>
                </div>
            </section>
        </main>
    );
}
