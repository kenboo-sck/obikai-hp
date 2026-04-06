"use client";

import { FaInstagram } from 'react-icons/fa6';

export default function FloatingSocial() {
  return (
    <div className="fixed right-4 bottom-40 lg:right-8 lg:bottom-28 z-40 flex flex-col gap-3">
      <a
        href="https://www.instagram.com/obikai2018/?hl=ja"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 group relative"
        aria-label="Instagram"
      >
        <FaInstagram className="text-2xl" />
        <span className="absolute right-full mr-3 bg-white text-gray-800 text-xs font-bold py-1 px-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden lg:block">
          Instagramを見る
        </span>
      </a>
    </div>
  );
}
