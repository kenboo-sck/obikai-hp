"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: '初めての方へ', href: '/beginners' },
  { name: 'クラス紹介', href: '/class' },
  { name: '入会案内', href: '/membership' },
  { name: 'お知らせ', href: '/news' },
  { name: '大会結果', href: '/results' },
  { name: '大会案内', href: '/sparing-tournament' },
  { name: 'スケジュール', href: '/schedule' },
  { name: 'インストラクター', href: '/instructors' },
  { name: 'アクセス', href: '/access' },
  { name: '問合せ', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-100 font-sans shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-50 bg-white">

        {/* ロゴ部分(テキスト) */}
        <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo-obikai2.svg"
            alt="実戦空手道 帯会"
            width={200}
            height={44}
            className="w-auto h-8 md:h-10 object-contain brightness-0"
            priority
          />
        </Link>

        <nav className="hidden lg:flex gap-2 xl:gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group py-2 px-1"
            >
              <span className="font-bold text-[10px] xl:text-xs text-gray-700 group-hover:text-emerald-500 transition-colors whitespace-nowrap font-maru">
                {item.name}
              </span>
            </Link>
          ))}

          <Link
            href="/contact"
            className="ml-2 xl:ml-4 bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 xl:px-4 xl:py-1.5 text-[10px] xl:text-xs font-bold flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-sm shrink-0 font-maru"
          >
            無料体験
          </Link>
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
                className={`group flex flex-col transition-all duration-500 border-b border-gray-100 pb-3 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
              >
                <span className="text-xl font-bold text-gray-800 group-hover:text-emerald-500 transition-colors">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div className={`mt-12 transition-all duration-500 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-emerald-500 text-white text-center py-4 font-bold text-lg shadow-lg shadow-emerald-900/20 active:scale-95 transition-transform"
            >
              無料体験に申し込む
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}