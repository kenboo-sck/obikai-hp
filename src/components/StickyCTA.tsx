"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StickyCTA() {
  const pathname = usePathname();

  // Hide on the contact page to avoid redundancy
  if (pathname === '/contact') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 lg:hidden pointer-events-none">
      <div className="flex px-4 pb-6 pt-10 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-auto">
        <Link
          href="/contact"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-full text-center shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transform transition-transform active:scale-95 animate-pulse"
          style={{ animationDuration: '3s' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          無料体験に申し込む
        </Link>
      </div>
    </div>
  );
}
