import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import StickyCTA from "@/components/StickyCTA";
import FloatingSocial from "@/components/FloatingSocial";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    default: "実戦空手道 帯会",
    template: "%s | 実戦空手道 帯会",
  },
  description: "空手とキックボクシングをどちらも学べる、親子で始める空手道場「帯会」。小学生・中学生を中心に、礼儀正しく、強く、優しい心を育みます。",
  icons: {
    icon: "/logo-obikai2.png",
    apple: "/logo-obikai2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning={true} className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-sans antialiased text-gray-800 bg-white">
        <Header />
        <Breadcrumbs />
        <main>{children}</main>
        <StickyCTA />
        <FloatingSocial />
        <Footer />
      </body>
    </html>
  );
}