"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6';

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
                    src="/2604_15.jpeg"
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
                            className="group relative flex items-center gap-4 bg-white/80 hover:bg-white backdrop-blur-sm px-6 py-3 border-2 border-emerald-400 text-emerald-700 shadow-xl transition-all hover:-translate-y-1"
                        >
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="font-bold font-maru">第10回 スパーリング大会 開催決定！概要はこちら</span>
                            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                        </Link>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-lg">
                            <Link
                                href="/contact"
                                className="bg-emerald-500 text-white px-10 py-5 font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 transform"
                            >
                                無料体験に申し込む
                            </Link>
                            <Link
                                href="/class"
                                className="bg-white text-gray-700 border-2 border-gray-100 px-10 py-5 font-bold text-lg hover:border-emerald-300 hover:text-emerald-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
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
                    <div className="inline-block bg-white/20 px-4 py-1 text-sm font-bold tracking-widest backdrop-blur-sm border border-white/30 mb-4 font-maru">
                        特別キャンペーン
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight font-maru">
                        今ならお得なキャンペーン実施中！
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
                        {/* 特典1 */}
                        <div className="bg-white text-gray-800 p-6 flex-1 shadow-xl border-2 border-emerald-100">
                            <div className="text-emerald-500 font-bold text-sm mb-2 uppercase tracking-wide">特典 01</div>
                            <div className="text-xl md:text-2xl font-bold mb-2 font-maru">空手着プレゼント</div>
                            <div className="text-white font-bold text-sm bg-emerald-400 inline-block px-3 py-1 text-xs font-sans">
                                12,000円相当
                            </div>
                        </div>
                        {/* 特典2 */}
                        <div className="bg-white text-gray-800 p-6 flex-1 shadow-xl border-2 border-emerald-100">
                            <div className="text-emerald-500 font-bold text-sm mb-2 uppercase tracking-wide">特典 02</div>
                            <div className="text-xl md:text-2xl font-bold mb-2 font-maru">親子割り引き</div>
                            <div className="text-white font-bold text-sm bg-emerald-400 inline-block px-3 py-1 text-xs font-sans">
                                毎月の月謝 -1,000円
                            </div>
                        </div>
                        {/* 特典3 */}
                        <div className="bg-white text-gray-800 p-6 flex-1 shadow-xl border-2 border-emerald-100">
                            <div className="text-emerald-500 font-bold text-sm mb-2 uppercase tracking-wide">特典 03</div>
                            <div className="text-xl md:text-2xl font-bold mb-2 font-maru">入会金無料</div>
                            <div className="text-white font-bold text-sm bg-emerald-400 inline-block px-3 py-1 text-xs font-sans">
                                親子で入会の場合
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
                        <div className="relative bg-gradient-to-br from-emerald-50/40 to-white p-10 shadow-xl border border-emerald-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black shadow-md group-hover:scale-110 transition-transform">
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
                        <div className="relative bg-gradient-to-br from-emerald-50/80 to-emerald-50/40 p-10 shadow-xl border border-emerald-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-300 to-emerald-400 flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black shadow-md group-hover:scale-110 transition-transform">
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
                        <div className="relative bg-gradient-to-br from-emerald-100/60 to-emerald-50 p-10 shadow-xl border border-emerald-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black shadow-md group-hover:scale-110 transition-transform">
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
                            <div className="bg-white w-full aspect-video flex items-center justify-center overflow-hidden shadow-xl relative">
                                <Image
                                    src="/2604_3.jpeg"
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
                                    <span className="w-3 h-3 bg-emerald-300 flex-shrink-0"></span>
                                    <span className="text-gray-700 font-medium font-maru">初心者から上級者まで対応</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-emerald-300 flex-shrink-0"></span>
                                    <span className="text-gray-700 font-medium font-maru">広々とした体育館でのびのび稽古</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-emerald-300 flex-shrink-0"></span>
                                    <span className="text-gray-700 font-medium font-maru">道具レンタルあり（手ぶらでOK）</span>
                                </li>
                            </ul>
                            <Link href="/access" className="inline-flex items-center gap-2 bg-white border-2 border-emerald-400 text-emerald-500 px-8 py-3 font-bold hover:bg-emerald-50 transition-all shadow-md group font-maru">
                                アクセス詳細を見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ニュースセクション（一旦非表示） */}
            {/* <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-10 pb-4 border-b border-emerald-100">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 font-maru">お知らせ</h2>
                            <p className="text-emerald-300 mt-2 text-xs font-bold tracking-widest">新着情報</p>
                        </div>
                        <Link href="/news" className="hidden md:inline-flex items-center gap-1 bg-white border border-emerald-400 text-emerald-500 px-6 py-2 font-bold text-sm hover:bg-emerald-50 transition-all shadow-sm font-maru">
                            一覧を見る →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {newsList.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.id}`}
                                className="group bg-white overflow-hidden border border-emerald-100 hover:shadow-xl transition-all hover:-translate-y-1 block h-full flex flex-col"
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
                                        <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2 py-1 font-bold">
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
                        <Link href="/news" className="inline-block border-2 border-emerald-400 text-emerald-500 px-8 py-3 font-bold text-sm hover:bg-emerald-50 transition-all font-maru">
                            お知らせ一覧
                        </Link>
                    </div>
                </div>
            </section> */}

            {/* 活動風景ギャラリー */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-emerald-500 font-bold tracking-widest text-sm uppercase">Gallery</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 font-maru">
                            活動の<span className="text-emerald-500">様子</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-emerald-500 mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/activity-1.jpg" alt="稽古風景 1" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/activity-2.jpg" alt="稽古風景 2" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group md:row-span-2 md:aspect-auto">
                            <Image src="/activity-3.jpg" alt="稽古風景 3" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/activity-4.jpg" alt="稽古風景 4" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/activity-5.jpg" alt="稽古風景 5" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/2604_2.jpeg" alt="稽古風景 6" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/2604_4.jpeg" alt="稽古風景 7" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/2604_5.jpeg" alt="稽古風景 8" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/2604_6.jpeg" alt="稽古風景 9" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/2604_8.jpeg" alt="稽古風景 10" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/2604_9.jpeg" alt="稽古風景 11" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/2604_11.jpeg" alt="稽古風景 12" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/2604_12.jpeg" alt="稽古風景 13" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image src="/2604_13.jpeg" alt="稽古風景 14" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>

                    <div className="text-center mt-12 space-y-4">
                        <p className="text-gray-500 font-medium mb-6">
                            帯会では、幼児から大人まで幅広い年代が楽しく、真剣に稽古に励んでいます。
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <Link 
                                href="https://www.instagram.com/obikai2018/?hl=ja" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white px-8 py-4 font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                            >
                                <FaInstagram className="text-2xl" />
                                <span>公式Instagramで最新情報を見る</span>
                            </Link>
                            <Link href="/instructors" className="inline-block border-2 border-emerald-500 text-emerald-600 px-8 py-4 font-bold hover:bg-emerald-50 transition-all font-maru rounded-lg">
                                指導員・活動風景をもっと見る
                            </Link>
                        </div>
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
                    <Link href="/contact" className="inline-block bg-white text-emerald-500 px-12 py-5 font-bold text-lg shadow-xl hover:bg-emerald-50 transition-all transform hover:-translate-y-1 font-maru">
                        体験予約はこちら
                    </Link>
                </div>
            </section>
        </main>
    );
}
