"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

export default function NewsDetailClient() {
    const params = useParams();
    const [news, setNews] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            let id = params?.id as string;

            // フォールバック（_template等）の場合やuseParamsで取れない場合はURLから直接取得
            if (!id || id === "_template" || id === "dummy" || id === "[id]") {
                // /news/12345 -> ["news", "12345"] -> "12345"
                const pathId = window.location.pathname.split("/").filter(Boolean).pop();
                if (pathId && pathId !== "news") {
                    id = pathId;
                }
            }

            if (!id || id === "_template" || id === "dummy" || id === "[id]") {
                setLoading(false);
                return;
            }

            try {
                const docRef = doc(db, "news", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setNews(docSnap.data());
                }
            } catch (e) {
                console.error("Firestore Error:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [params?.id]);

    if (loading) return <div className="pt-40 text-center text-emerald-500 font-bold animate-pulse">読み込み中...</div>;
    if (!news) return <div className="pt-40 text-center text-gray-500">記事が見つかりません。</div>;

    const imageUrl = news.image || news.imageUrl || news.thumbnail;
    const dateStr = news.date?.seconds
        ? new Date(news.date.seconds * 1000).toLocaleDateString('ja-JP').replace(/\//g, '.')
        : typeof news.date === 'string'
            ? news.date.replace(/-/g, '.')
            : '';

    return (
        <div className="pt-40 pb-20 px-4 max-w-[1000px] mx-auto font-sans text-gray-800">
            <div className="mb-6 flex items-center gap-3">
                {dateStr && <span className="text-gray-500 text-sm font-bold tracking-widest">{dateStr}</span>}
                <span className="bg-emerald-500 text-white text-xs px-3 py-1 font-bold rounded-full">
                    {news.category || "INFO"}
                </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-10 leading-tight border-b border-gray-100 pb-8">{news.title}</h1>

            {imageUrl && (
                <div className="relative w-full aspect-video mb-12 bg-gray-50 rounded-xl overflow-hidden shadow-md">
                    <Image
                        src={imageUrl}
                        alt={news.title}
                        fill
                        className="object-contain"
                        unoptimized={true}
                    />
                </div>
            )}

            <div
                className="prose max-w-none prose-lg text-gray-700 prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-emerald-500 prose-strong:text-emerald-900 prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: news.content }}
            />
        </div>
    );
}
