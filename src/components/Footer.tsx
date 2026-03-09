"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

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

const socialLinks = [
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/obikai2018/?hl=ja', color: 'hover:text-pink-500' },
  { name: 'X', icon: FaXTwitter, href: 'https://x.com/afg_osaka', color: 'hover:text-white' }, // TODO: Confirm X link
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
              className="inline-block bg-white text-stone-900 px-8 py-3 font-bold text-sm rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all shadow-md"
            >
              体験予約 →
            </Link>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-base font-bold tracking-widest text-orange-400 uppercase mb-6">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col pb-2 hover:translate-x-1 transition-transform"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-stone-400 group-hover:text-orange-200 transition-colors uppercase">
                      {item.en}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-base font-bold tracking-widest text-orange-400 uppercase mb-6">
              Contact
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-1 font-bold">Address</p>
                <p className="text-white leading-relaxed">
                  〒957-0015<br />
                  新潟県新発田市東新町5-4-9
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-1 font-bold">Phone</p>
                <a href="tel:09010393392" className="text-white hover:text-orange-300 transition-colors font-bold text-lg">
                  090-1039-3392
                </a>
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-1 font-bold">Hours</p>
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
            <h3 className="text-sm font-bold tracking-widest text-orange-400 uppercase mb-4">
              Representative
            </h3>
            <div className="space-y-2 text-xs text-stone-300">
              <p className="font-bold text-white">代表：田坂 貴満</p>
              <p>〒957-0015 新潟県新発田市東新町5-4-9</p>
              <p>TEL : 090-1039-3392</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-widest text-orange-400 uppercase mb-4">
              Follow Us
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
              © {new Date().getFullYear()} OBIKAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-stone-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-stone-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {
        showButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-orange-400 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all shadow-lg z-40 animate-fade-in"
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