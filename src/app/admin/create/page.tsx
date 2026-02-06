"use client";

import { useState, useEffect, useCallback } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(
  () => import("@/components/TiptapEditor"),
  { ssr: false, loading: () => <div className="h-[400px] bg-gray-50 animate-pulse rounded-xl" /> }
);

export default function CreateNewsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("INFO");
  const [status, setStatus] = useState("published");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    if (!title || !content) return alert("タイトルと本文は必須です");
    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        const storageRef = ref(storage, `news/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "news"), {
        title,
        category,
        date,
        content,
        image: imageUrl,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      alert("記事を公開しました!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("公開に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted || authLoading) {
    return <div className="pt-40 text-center font-bold text-blue-600 animate-pulse">LOADING...</div>;
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-[1200px] mx-auto font-sans text-gray-800">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">ニュース作成</h1>
        <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-900 font-bold text-sm">←戻る</Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-sans transition-all"
            placeholder="記事のタイトルを入力"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">カテゴリ</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg outline-none font-sans focus:ring-2 focus:ring-blue-500"
            >
              <option value="INFO">お知らせ</option>
              <option value="EVENT">イベント</option>
              <option value="CAMPAIGN">キャンペーン</option>
              <option value="HOLIDAY">休館日</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">ステータス</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg outline-none font-sans focus:ring-2 focus:ring-blue-500"
            >
              <option value="published">公開</option>
              <option value="draft">下書き</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">日付</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg outline-none font-sans focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">メイン画像（任意）</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:transition-all cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-2">推奨サイズ: 1200x630px</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">本文</label>
          {isMounted && (
            <TiptapEditor
              content={content}
              onChange={setContent}
              onImageUpload={handleImageUpload}
            />
          )}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all shadow-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform active:scale-95"}`}
          >
            {loading ? "保存中..." : status === "published" ? "記事を公開する" : "下書きを保存"}
          </button>
        </div>
      </form>
    </div>
  );
}