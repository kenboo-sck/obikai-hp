"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

const navItems = [
  { name: '初めての方へ', href: '/beginners' },
  { name: 'クラス紹介', href: '/class' },
  { name: '入会案内', href: '/membership' },
  { name: 'お知らせ', href: '/news' },
  { name: '大会結果', href: '/results' },
  { name: '大会概要', href: '/sparing-tournament' },
  { name: 'スケジュール', href: '/schedule' },
  { name: 'インストラクター', href: '/instructors' },
  { name: 'アクセス', href: '/access' },
  { name: '問合せ', href: '/contact' },
];

const socialLinks = [
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/obikai2018/?hl=ja', color: 'hover:text-teal-500' },
];

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-stone-900 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-40 h-12">
                <Image
                  src="/logo-obikai.svg"
                  alt="帯会ロゴ"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-stone-300 text-sm leading-relaxed mb-6">
              親子で始める、新しい武道の形。<br />
              礼節を重んじ、強く優しい心を育む。<br />
              見学・体験、随時受付中です。
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-stone-900 px-8 py-3 font-bold text-sm rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-md"
            >
              体験予約 →
            </Link>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-base font-bold tracking-widest text-emerald-400 mb-6 border-b border-emerald-900/10 pb-2">
              サイト案内
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col pb-2 hover:translate-x-1 transition-transform border-b border-white/5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-base font-bold tracking-widest text-emerald-400 mb-6 border-b border-emerald-900/10 pb-2">
              お問い合わせ
            </h3>
            <div className="space-y-6 text-sm">
              <div>
                <p className="text-[10px] text-stone-400 tracking-wider mb-2 font-bold bg-white/5 inline-block px-2 py-0.5 rounded">所在地</p>
                <p className="text-white leading-relaxed">
                  〒957-0015<br />
                  新潟県新発田市東新町2丁目5-4-9
                </p>
              </div>
              <div>
                <p className="text-[10px] text-stone-400 tracking-wider mb-2 font-bold bg-white/5 inline-block px-2 py-0.5 rounded">電話番号</p>
                <a href="tel:09010393392" className="text-white hover:text-emerald-300 transition-colors font-bold text-lg block">
                  090-1039-3392
                </a>
              </div>
              <div>
                <p className="text-[10px] text-stone-400 tracking-wider mb-2 font-bold bg-white/5 inline-block px-2 py-0.5 rounded">稽古時間</p>
                <p className="text-white leading-relaxed">
                  月・火・金 19:00 - 21:00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mb-8"></div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-bold tracking-widest text-emerald-400 mb-4">
              運営代表者
            </h3>
            <div className="space-y-2 text-xs text-stone-300">
              <p className="font-bold text-white text-sm">代表：田坂 貴満</p>
              <p>〒957-0015 新潟県新発田市東新町2丁目5-4-9</p>
              <p>電話番号 : 090-1039-3392</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-widest text-emerald-400 mb-4">
              公式SNS
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-lg text-white transition-all hover:bg-white hover:text-stone-900"
                    aria-label={social.name}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-stone-500">
              © {new Date().getFullYear()} 実戦空手道 帯会. 無断転載を禁じます。
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-stone-500 hover:text-white transition-colors font-maru">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="text-xs text-stone-500 hover:text-white transition-colors font-maru">
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>

      {
        showButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 bg-emerald-400 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all shadow-lg z-40 animate-fade-in"
            aria-label="トップへ戻る"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        )
      }
    </footer >
  );
}