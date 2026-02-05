"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import dynamic from 'next/dynamic';
import Image from "next/image";

const TiptapEditor = dynamic(
    () => import("@/components/TiptapEditor"),
    { ssr: false, loading: () => <div className="h-[400px] bg-gray-50 animate-pulse rounded-xl" /> }
);

export default function AdminEditClient() {
    const params = useParams();
    const router = useRouter();

    // State definitions
    const [user, setUser] = useState<any>(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("INFO");
    const [status, setStatus] = useState("published");
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [newImage, setNewImage] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Auth check
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push("/admin/login");
            }
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    // Fetch Data
    useEffect(() => {
        const fetchNews = async () => {
            let id = params?.id as string;

            // Fallback: Get ID from URL
            if (!id || id === "_template" || id === "dummy") {
                const pathId = window.location.pathname.split("/").filter(Boolean).pop();
                if (pathId && pathId !== "edit") {
                    id = pathId;
                }
            }

            if (!id || id === "_template" || id === "dummy") return;

            try {
                const docSnap = await getDoc(doc(db, "news", id));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title || "");
                    setCategory(data.category || "INFO");
                    setStatus(data.status || "published");
                    setDate(data.date || ""); // Assuming date string YYYY-MM-DD
                    setContent(data.content || "");
                    setCurrentImage(data.image || data.imageUrl || data.thumbnail || "");
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, [params?.id]);

    // Image Handler for Editor
    const handleImageUpload = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
                try {
                    const storageRef = ref(storage, `news_content/${Date.now()}_${file.name}`);
                    await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(storageRef);

                    setContent(prev => prev + `<img src="${url}" alt="Uploaded image" />`);
                } catch (error) {
                    console.error("Image upload failed:", error);
                    alert("画像のアップロードに失敗しました");
                }
            }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let id = params?.id as string;
            if (!id || id === "_template" || id === "dummy") {
                const pathId = window.location.pathname.split("/").filter(Boolean).pop();
                if (pathId && pathId !== "edit") id = pathId;
            }

            let imageUrl = currentImage;

            // Upload new image if selected
            if (newImage) {
                const storageRef = ref(storage, `news/${Date.now()}_${newImage.name}`);
                await uploadBytes(storageRef, newImage);
                imageUrl = await getDownloadURL(storageRef);
            }

            await updateDoc(doc(db, "news", id), {
                title,
                category,
                status,
                date,
                content,
                image: imageUrl,
                updatedAt: new Date(),
            });

            alert("更新完了");
            router.push("/admin/dashboard");
        } catch (error) {
            console.error("Error updating document:", error);
            alert("更新に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted || authLoading) return <div className="pt-40 text-center font-black italic">LOADING...</div>;

    return (
        <div className="pt-32 pb-20 px-4 max-w-[1200px] mx-auto font-[family-name:var(--font-oswald)]">
            <div className="flex justify-between items-end mb-8 border-l-8 border-orange-600 pl-6">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">記事編集</h1>
                <Link href="/admin/dashboard" className="text-gray-400 hover:text-black font-bold text-sm italic uppercase">← 戻る</Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl">
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">タイトル</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-sans"
                        placeholder="記事のタイトルを入力"
                        required
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">カテゴリ</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-sans"
                        >
                            <option value="INFO">お知らせ</option>
                            <option value="EVENT">イベント</option>
                            <option value="CAMPAIGN">キャンペーン</option>
                            <option value="HOLIDAY">休館日</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">ステータス</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-sans"
                        >
                            <option value="published">公開</option>
                            <option value="draft">下書き</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">日付</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-sans"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">メイン画像</label>
                    {currentImage && (
                        <div className="mb-4 relative w-40 h-24 rounded-xl overflow-hidden bg-gray-100">
                            <Image
                                src={currentImage}
                                alt="Current"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-black file:text-white hover:file:bg-orange-600 file:transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-1">※新しい画像を選択すると上書きされます</p>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">本文</label>
                    {isMounted && (
                        <TiptapEditor
                            content={content}
                            onChange={setContent}
                            onImageUpload={handleImageUpload}
                        />
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 rounded-xl font-black italic uppercase tracking-widest text-white transition-all ${loading ? "bg-gray-400" : "bg-orange-600 hover:bg-black shadow-xl shadow-orange-200"}`}
                    >
                        {loading ? "更新中..." : "記事を更新する"}
                    </button>
                </div>
            </form>
        </div>
    );
}