"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";

export default function NewsContent() {
    const [newsList, setNewsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

                const sortedData = data.sort((a: any, b: any) => (b.date > a.date ? 1 : -1));

                setNewsList(sortedData);
            } catch (error) {
                console.error(error);
                setErrorMsg(error instanceof Error ? error.message : "不明なエラーが発生しました");
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return <div className="pt-40 text-center font-black italic">LOADING NEWS...</div>;

    return (
        <div className="pt-32 pb-20 px-4 max-w-[1260px] mx-auto font-[family-name:var(--font-oswald)]">
            <div className="mb-12 border-l-8 border-orange-600 pl-6">
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                    News & Topics
                </h1>
                <p className="text-gray-400 font-bold mt-2 tracking-widest uppercase text-sm">ジムからの最新情報</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {errorMsg && (
                    <div className="col-span-full bg-red-50 border border-red-200 text-red-600 p-4 font-bold mb-6">
                        エラーが発生しました: {errorMsg}
                        <br />
                        <span className="text-sm font-normal">※Firebaseの「ルール」や「コレクション名」を確認してください。</span>
                    </div>
                )}
                {newsList.length === 0 ? (
                    <p className="col-span-full text-center py-20 text-gray-500 italic font-bold">現在、お知らせはありません。</p>
                ) : (
                    newsList.map((item) => (
                        <Link
                            key={item.id}
                            href={`/news/${item.id}`}
                            className="group flex flex-col bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
                        >
                            <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                                {(item.image || item.imageUrl || item.thumbnail) ? (
                                    <Image
                                        src={item.image || item.imageUrl || item.thumbnail}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized={true}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300 font-black italic text-xs tracking-widest">NO IMAGE</div>
                                )}
                            </div>

                            <div className="px-2 pt-2 md:px-4 md:pt-4 flex items-center gap-2 md:gap-3">
                                <span className="text-gray-400 font-bold text-[10px]">
                                    {item.date?.seconds
                                        ? new Date(item.date.seconds * 1000).toLocaleDateString('ja-JP').replace(/\//g, '.')
                                        : typeof item.date === 'string'
                                            ? item.date.replace(/-/g, '.')
                                            : '---'}
                                </span>
                                <span className="bg-black text-white text-[8px] px-2 py-0.5 font-black italic uppercase tracking-tighter">
                                    {item.category || "INFO"}
                                </span>
                            </div>

                            <div className="flex-1 p-2 md:p-4">
                                <h2 className="text-sm md:text-base font-black italic uppercase group-hover:text-orange-600 transition-colors mb-1 md:mb-2 leading-tight">
                                    {item.title}
                                </h2>
                                <div className="text-gray-500 text-[10px] font-bold line-clamp-2 italic">
                                    {item.content?.replace(/<[^>]*>?/gm, '')}
                                </div>
                            </div>
                        </Link>
                    )))}
            </div>
        </div>
    );
}
