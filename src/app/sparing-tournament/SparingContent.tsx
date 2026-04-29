"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaTrophy, FaUserCheck, FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaMoneyBillWave, FaPhoneAlt } from 'react-icons/fa';

export default function SparingContent() {
    return (
        <main className="bg-white min-h-screen pt-32 pb-20 font-sans text-gray-800">
            {/* ヒーローセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-16">
                <div className="relative h-[300px] md:h-[450px] overflow-hidden shadow-2xl mb-12">
                    <Image
                        src="/IMG_0566.png"
                        alt="スパーリング大会"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
                        <div className="px-10 text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-maru leading-tight">
                                第10回 <br />帯会スパーリング大会
                            </h1>
                            <p className="text-xl md:text-2xl font-bold text-emerald-300 font-maru">
                                実戦の経験が、次なる成長を呼ぶ。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
                {/* メインコンテンツ */}
                <div className="lg:col-span-2 space-y-16">
                    {/* 概要 */}
                    <section>
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-8 border-b-2 border-emerald-500 pb-2 font-maru">
                            <FaTrophy className="text-emerald-500" /> 大会概要
                        </h2>
                        <p className="text-lg leading-loose mb-6">
                            平素は格別のご高配を賜り、厚く御礼申し上げます。<br />
                            この度も帯会のスパーリング大会を開催することとなりました。<br />
                            日頃の稽古の成果を確認し、実戦形式での経験を積むための道場内大会です。多数のご参加をお待ちしております。
                        </p>
                        
                        <div className="bg-emerald-50 p-8 space-y-4">
                            <div className="flex items-start gap-4 pb-4 border-b border-emerald-100">
                                <FaCalendarAlt className="text-emerald-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-emerald-600 uppercase">開催日時</p>
                                    <p className="text-xl font-bold">令和8年（2026年）6月21日（日）</p>
                                    <div className="text-sm text-gray-700 leading-relaxed mt-2 space-y-1">
                                        <p><span className="font-bold">9:30〜</span> 開場・受付</p>
                                        <p><span className="font-bold">9:45〜</span> 計量開始（グローブルールのみ）</p>
                                        <p><span className="font-bold">10:00〜</span> 開会式</p>
                                        <p><span className="font-bold">10:30〜</span> 試合開始</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 pb-4 border-b border-emerald-100">
                                <FaMapMarkerAlt className="text-emerald-500 mt-1 flex-shrink-0" />
                                <div className="w-full">
                                    <p className="text-sm font-bold text-emerald-600 uppercase">対戦場所</p>
                                    <p className="text-xl font-bold">亀田総合体育館<span className="text-base font-normal">（アスパーク亀田）武道場</span></p>
                                    <a 
                                        href="https://www.google.com/maps/search/?api=1&query=亀田総合体育館+新潟県新潟市江南区茅野山3丁目1番13号" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline mt-1 inline-flex items-center gap-1"
                                    >
                                        新潟県新潟市江南区茅野山3丁目1番13号
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                    <p className="text-sm text-gray-600 mt-1">TEL: 025-381-1222</p>
                                    <div className="mt-4 w-full h-48 md:h-64 overflow-hidden border border-gray-200">
                                        <iframe 
                                            src="https://maps.google.com/maps?q=亀田総合体育館+新潟県新潟市江南区茅野山3丁目1番13号&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                            width="100%" 
                                            height="100%" 
                                            style={{ border: 0 }} 
                                            allowFullScreen={false} 
                                            loading="lazy" 
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 pb-4 border-b border-emerald-100">
                                <FaUserCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-emerald-600 uppercase">出場資格</p>
                                    <p className="text-lg font-bold">幼児から中学生を対象とする。</p>
                                    <p className="text-sm text-gray-600">※相手が居れば、高校生・一般も可とする。</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaMoneyBillWave className="text-emerald-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-emerald-600 uppercase">参加費</p>
                                    <p className="text-lg font-bold">1人 2,000円</p>
                                    <p className="text-sm text-gray-700 leading-relaxed mt-1">
                                        ※各道場にて取りまとめの上、<span className="font-bold text-red-500">6月12日(金) 必着</span>で下記住所まで現金書留にてお送り下さい。
                                    </p>
                                    <div className="text-sm text-gray-600 bg-white p-3 mt-2 border border-emerald-100">
                                        <p className="font-bold mb-1">【郵送先】</p>
                                        <p>〒957-0015 新潟県新発田市東新町2-5-4-9</p>
                                        <p>田坂 貴満宛</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 大会資料・ルール */}
                    <section>
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-8 border-b-2 border-emerald-500 pb-2 font-maru">
                            <FaFileAlt className="text-emerald-500" /> 大会資料・ルール
                        </h2>
                        <div className="bg-gray-50 border border-gray-100 p-8">
                            <p className="text-gray-700 leading-relaxed mb-8">
                                大会に関する案内および競技ルールの詳細は、以下の各PDF資料をご確認ください。<br />
                                参加を希望される選手および関係者の皆様は、申込前に必ずご一読をお願いいたします。
                            </p>
                            <div className="grid gap-4">
                                {[
                                    { name: "① 帯会スパーリング大会開催のご案内", file: "Sparring_Tournament_Notice_20260621.pdf" },
                                    { name: "② 帯会スパーリング大会 競技ルール", file: "Obikai_Sparring_Tournament_Competition_Rules.pdf" },
                                    { name: "③ グローブ空手ルール", file: "Glove_Karate_Rules_2026.06.21.pdf" }
                                ].map((doc, index) => (
                                    <a 
                                        key={index}
                                        href={`/${doc.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-emerald-100 p-5 hover:bg-emerald-50 transition-all shadow-sm hover:shadow-md group gap-4"
                                    >
                                        <div className="flex items-center gap-4 flex-grow">
                                            <div className="bg-emerald-500 text-white p-3 rounded-lg group-hover:bg-emerald-600 transition-colors flex-shrink-0">
                                                <FaFileAlt className="text-xl" />
                                            </div>
                                            <span className="text-lg font-bold text-gray-800 leading-tight">{doc.name}</span>
                                        </div>
                                        <div className="flex justify-end sm:block">
                                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full font-bold text-sm border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all whitespace-nowrap">
                                                PDFを開く
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* お問い合わせ先 */}
                    <section>
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-8 border-b-2 border-emerald-500 pb-2 font-maru">
                            <FaPhoneAlt className="text-emerald-500" /> お問い合わせ先
                        </h2>
                        <div className="bg-gray-50 p-6 flex items-center gap-4 border border-gray-100">
                            <div>
                                <p className="text-xl font-bold text-gray-900 mb-1">TEL: 090-1039-3392</p>
                                <p className="text-sm text-gray-600">（代表：田坂 貴満）</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* サイドバー（申し込み導線） */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 space-y-8">
                        {/* 申し込みカード */}
                        <div className="bg-white shadow-2xl border-4 border-emerald-500 p-8 text-center overflow-hidden relative transform hover:scale-[1.02] transition-transform">
                            <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 text-xs font-bold mb-4">
                                申込締切：2026年5月29日(金)
                            </span>
                            <h3 className="text-2xl font-bold mb-6 font-maru">大会エントリー</h3>
                            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                                大会への参加を希望される選手、保護者の方は、以下の専用フォームよりお申し込みのお手続きをお願いいたします。
                            </p>
                            <a 
                                href="https://forms.gle/r5ocMDnA7MxDZN7n7" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-5 text-xl shadow-lg transition-all animate-pulse"
                                style={{ animationDuration: '3s' }}
                            >
                                専用フォームへ進む
                            </a>
                            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                                ※6月6日(土) 組合せ決定<br />
                                ※事前の参加費納入が必要です。
                            </p>
                        </div>

                        {/* 前回の結果リンク */}
                        <Link href="/results" className="block bg-gray-50 p-6 border border-gray-100 hover:bg-emerald-50 transition-colors group">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-gray-700 group-hover:text-emerald-600 font-maru">前回の大会結果はこちら</span>
                                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
