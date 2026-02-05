import NewsDetailClient from "./NewsDetailClient";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// 新しい記事も即座に反映されるよう、常に最新の状態を取得（SSR/Dynamic）
export const dynamic = "force-dynamic";

export default function Page() {
  return <NewsDetailClient />;
}