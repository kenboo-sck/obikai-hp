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

    if (loading) return <div className="pt-40 text-center text-emerald-500 font-bold font-maru">読み込み中...</div>;

    return (
        <div className="pt-32 pb-20 px-4 max-w-[1260px] mx-auto font-sans">
            <div className="mb-12 border-l-8 border-emerald-500 pl-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-none tracking-widest font-maru">
                    お知らせ
                </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {errorMsg && (
                    <div className="col-span-full bg-red-50 border border-red-200 text-red-600 p-4 font-bold mb-6">
                        エラーが発生しました: {errorMsg}
                    </div>
                )}
                {newsList.length === 0 ? (
                    <p className="col-span-full text-center py-20 text-gray-500 font-medium">現在、お知らせはありません。</p>
                ) : (
                    newsList.map((item) => (
                        <Link
                            key={item.id}
                            href={`/news/${item.id}`}
                            className="group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                        >
                            <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                                {(item.image || item.imageUrl || item.thumbnail) ? (
                                    <Image
                                        src={item.image || item.imageUrl || item.thumbnail}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        unoptimized={true}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300 font-bold text-sm bg-gray-50">画像なし</div>
                                )}
                            </div>

                            <div className="p-4 flex flex-col h-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                        {item.category || "お知らせ"}
                                    </span>
                                    <span className="text-gray-400 text-xs">
                                        {item.date?.seconds
                                            ? new Date(item.date.seconds * 1000).toLocaleDateString('ja-JP').replace(/\//g, '.')
                                            : typeof item.date === 'string'
                                                ? item.date.replace(/-/g, '.')
                                                : '---'}
                                    </span>
                                </div>

                                <h2 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-emerald-500 transition-colors mb-2 line-clamp-2">
                                    {item.title}
                                </h2>
                                <div className="text-gray-500 text-xs line-clamp-2 mt-auto">
                                    {item.content?.replace(/<[^>]*>?/gm, '')}
                                </div>
                            </div>
                        </Link>
                    )))}
            </div>
        </div>
    );
}
