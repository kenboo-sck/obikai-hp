"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: '初めての方へ', en: 'BEGINNERS', href: '/beginners' },
  { name: 'クラス紹介', en: 'CLASS', href: '/class' },
  { name: '入会案内', en: 'MEMBERSHIP', href: '/membership' },
  { name: 'お知らせ', en: 'NEWS', href: '/news' },
  { name: '大会結果', en: 'RESULTS', href: '/results' },
  { name: 'スケジュール', en: 'SCHEDULE', href: '/schedule' },
  { name: 'インストラクター', en: 'INSTRUCTORS', href: '/instructors' },
  { name: 'アクセス', en: 'ACCESS', href: '/access' },
  { name: '問合せ', en: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-100 font-sans shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-50 bg-white">

        {/* ロゴ部分(テキスト) */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo-obikai.svg"
            alt="実戦空手道 帯会"
            width={200}
            height={44}
            className="w-auto h-8 md:h-10 object-contain"
            priority
          />
        </Link>

        {/* ナビゲーション */}
        <nav className="hidden lg:flex gap-5 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center leading-tight py-2"
            >
              <span className="font-bold text-sm tracking-wide text-gray-700 group-hover:text-orange-500 transition-colors whitespace-nowrap">
                {item.name}
              </span>
              <span className="text-[9px] font-medium text-gray-400 group-hover:text-orange-400 transition-colors mt-0.5 uppercase tracking-wider">
                {item.en}
              </span>
            </Link>
          ))}

          <a
            href="#"
            className="ml-4 bg-orange-400 text-white px-6 py-3 text-sm font-bold rounded-full hover:bg-orange-500 transition-all duration-300 shadow-md"
          >
            体験予約
          </a>
        </nav>

        {/* ハンバーガーボタン (Mobile) */}
        <button
          className="lg:hidden flex flex-col gap-1.5 z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニューを開く"
        >
          <span className={`w-8 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-8 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-8 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* モバイルメニューオーバーレイ */}
      <div className={`fixed inset-0 bg-white transition-all duration-500 ease-in-out lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-32 px-10 pb-10 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex flex-col transition-all duration-500 border-b border-gray-100 pb-2 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
              >
                <span className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                  {item.name}
                </span>
                <span className="text-xs font-medium text-gray-400 group-hover:text-orange-400 transition-colors uppercase">
                  {item.en}
                </span>
              </Link>
            ))}
          </div>

          <div className={`mt-12 transition-all duration-500 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-orange-400 text-white text-center py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-900/20"
            >
              体験予約
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}