import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

// フォントの設定（力強いウェイトを選択）
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: {
    default: "ALMA FIGHT GYM OSAKA HONMACHI",
    template: "%s | ALMA FIGHT GYM OSAKA HONMACHI",
  },
  description: "大阪・本町駅徒歩5分の格闘技ジム。ブラジリアン柔術・キックボクシング・MMAを全日本チャンピオンが直接指導。初心者歓迎、無料体験実施中。清潔な設備と充実のトレーニング環境で理想の自分へ。",
  icons: {
    icon: "/afgoh_icon.png",
    apple: "/afgoh_icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <body className={`${oswald.variable} antialiased`}>
        <Header />
        <Breadcrumbs />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}