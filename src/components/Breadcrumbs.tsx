"use client";

import { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const routeMap: { [key: string]: string } = {
  beginners: "初めての方へ",
  class: "クラス紹介",
  membership: "入会案内",
  news: "お知らせ",
  schedule: "スケジュール",
  instructors: "インストラクター",
  access: "アクセス",
  contact: "問合せ",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const params = useParams();
  const [newsTitle, setNewsTitle] = useState<string>("");

  useEffect(() => {
    const fetchNewsTitle = async () => {
      if (params.id && pathname.startsWith("/news/")) {
        try {
          const docRef = doc(db, "news", params.id as string);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNewsTitle(docSnap.data().title);
          }
        } catch (error) {
          console.error("Error fetching news title for breadcrumbs:", error);
        }
      }
    };
    fetchNewsTitle();
  }, [params.id, pathname]);

  if (pathname === "/" || !pathname) return null;

  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="fixed top-20 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 flex-nowrap overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-blue-600 transition-colors">HOME</Link>

        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const href = `/${paths.slice(0, index + 1).join("/")}`;

          let label = routeMap[path] || path;
          if (path === params.id && pathname.startsWith("/news/")) {
            label = newsTitle || "LOADING...";
          }

          return (
            <div key={href} className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              {isLast ? (
                <span className="text-blue-900 truncate max-w-[200px] md:max-w-none">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:text-blue-600 transition-colors">
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}