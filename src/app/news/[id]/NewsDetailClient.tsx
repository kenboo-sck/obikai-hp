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

    if (loading) return <div className="pt-40 text-center">読み込み中...</div>;
    if (!news) return <div className="pt-40 text-center">記事が見つかりません。</div>;

    const imageUrl = news.image || news.imageUrl || news.thumbnail;
    const dateStr = news.date?.seconds
        ? new Date(news.date.seconds * 1000).toLocaleDateString('ja-JP').replace(/\//g, '.')
        : typeof news.date === 'string'
            ? news.date.replace(/-/g, '.')
            : '';

    return (
        <div className="pt-40 pb-20 px-4 max-w-[1000px] mx-auto font-[family-name:var(--font-oswald)]">
            <div className="mb-6 flex items-center gap-3">
                {dateStr && <span className="text-gray-400 font-bold">{dateStr}</span>}
                <span className="bg-black text-white text-xs px-2 py-1 font-black italic uppercase tracking-tighter">
                    {news.category || "INFO"}
                </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black italic mb-8 uppercase leading-tight">{news.title}</h1>

            {imageUrl && (
                <div className="relative w-full aspect-video mb-10 bg-gray-100">
                    <Image
                        src={imageUrl}
                        alt={news.title}
                        fill
                        className="object-contain"
                        unoptimized={true}
                    />
                </div>
            )}

            <div className="prose max-w-none prose-headings:font-black prose-headings:italic prose-a:text-orange-600" dangerouslySetInnerHTML={{ __html: news.content }} />
        </div>
    );
}
