"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // authをエクスポートしている必要があります
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard"); // ログイン後ダッシュボードへ
    } catch (error) {
      alert("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
    }
  };

  return (
    <div className="pt-40 flex flex-col items-center min-h-screen bg-gray-50 font-sans">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 border-b border-gray-100 pb-4">
          ADMIN LOGIN
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
          LOGIN
        </button>
      </form>
    </div>
  );
}