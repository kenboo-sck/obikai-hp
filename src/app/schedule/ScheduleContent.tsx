"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { FaLocationDot } from "react-icons/fa6";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

// スケジュールデータの型定義
type ScheduleItem = {
    id: string;
    dayOfWeek: number; // 0: Mon, 1: Tue, ... 6: Sun
    startTime: string;
    endTime: string;
    title: string;
    location: string;
    target?: string; // 対象（年中〜小1など）
    color: string;
    coach?: string;
};

type ClassInfoItem = {
    id: string;
    title: string;
    description: string;
    notice?: string;
    recommended: string[];
    color: string;
    image?: string;
};

export default function ScheduleContent() {
    const [selectedClass, setSelectedClass] = useState<ClassInfoItem | null>(null);
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                // 初期表示用・兼バックアップ用データ（画像に合わせた内容）
                const defaultSchedules: ScheduleItem[] = [
                    { id: 'm1', dayOfWeek: 0, startTime: '19:00', endTime: '20:30', title: '空手クラス', location: '川東教室 体育館', target: '小学生から一般', color: '#3b82f6' },
                    { id: 't1', dayOfWeek: 1, startTime: '19:00', endTime: '20:30', title: 'キックボクシングクラス', location: '東豊防災センター', target: '小学生から一般', color: '#eab308' },
                    { id: 'th1', dayOfWeek: 3, startTime: '18:30', endTime: '19:30', title: '空手クラス', location: '七葉教室 七葉コミュニティセンター 多目的ホール', target: '初心者', color: '#ef4444' },
                    { id: 'th2', dayOfWeek: 3, startTime: '19:00', endTime: '20:00', title: '空手クラス', location: '七葉教室（七葉コミュニティセンター 多目的ホール）', target: '小学生から一般', color: '#3b82f6' },
                    { id: 'f1', dayOfWeek: 4, startTime: '19:00', endTime: '20:00', title: '空手クラス', location: '五十公野コミュニティセンター 多目的ホール', target: '小学生から一般', color: '#3b82f6' },
                    { id: 'f2', dayOfWeek: 4, startTime: '20:00', endTime: '21:00', title: 'キックボクシングクラス', location: '五十公野コミュニティセンター 多目的ホール', target: '小学生から一般', color: '#eab308' },
                    { id: 's1', dayOfWeek: 5, startTime: '09:00', endTime: '12:00', title: 'キックボクシングクラス', location: '川東中学校', target: '小学生から一般', color: '#eab308' }
                ];

                const q = query(collection(db, "schedules"), orderBy("startTime", "asc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as any[];

                if (data.length > 0) {
                    // Firestoreにデータがある場合はそれを使用
                    const formattedData: ScheduleItem[] = data.map(item => ({
                        id: item.id,
                        dayOfWeek: Number(item.dayOfWeek),
                        startTime: item.startTime,
                        endTime: item.endTime,
                        title: item.title,
                        location: item.location || "",
                        target: item.target,
                        color: item.color || (item.title.includes('キック') ? '#eab308' : '#3b82f6'),
                        coach: item.coach
                    }));
                    formattedData.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
                    setSchedules(formattedData);
                } else {
                    // データがない場合は初期データを使用
                    setSchedules(defaultSchedules);
                }
            } catch (error) {
                console.error("Error fetching schedules:", error);
                // エラー時もとりあえず初期表示は行う
            }
        };

        fetchSchedules();
    }, []);

    // クラス情報（詳細ポップアップ用）
    const classInfo: ClassInfoItem[] = [
        {
            id: 'class-karate',
            title: '空手クラス',
            notice: 'お子さんと一緒に参加されるパパさんも大歓迎です！',
            description: '基本的な動作から応用まで、幅広い年齢層で一緒に汗を流すクラスです。初心者から経験者まで、レベルに合わせた指導を行います。',
            recommended: ['武道を一から学びたい', '親子で参加したい', '礼儀作法を身につけたい'],
            color: '#10b981',
            image: '/IMG_0694.jpeg'
        },
        {
            id: 'class-kickboxing',
            title: 'キックボクシングクラス',
            notice: 'お子さんと一緒に参加されるパパさんも大歓迎です！',
            description: 'グローブを着用し、実戦的な技術を学ぶクラスです。ダイエットや体力作りから、本格的な技術習得まで幅広く対応しています。',
            recommended: ['楽しく体を動かしたい', 'ストレス発散したい', '実戦技術を学びたい'],
            color: '#c2410c',
            image: '/o-1005.jpg'
        },
        {
            id: 'class-kids-basic',
            title: 'キッズ・初心者クラス',
            description: '年中〜小学生や、初心者の方を対象としたクラスです。楽しみながら基本を学び、体を動かす楽しさを知ってもらうことを目標にしています。',
            recommended: ['初めての習い事として', '運動能力を向上させたい', '集中力を養いたい'],
            color: '#ef4444',
            image: '/IMG_1297.jpeg'
        }
    ];

    const weekLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const weekDaysJP = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"];

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto font-sans text-gray-800">
            {/* ヘッダー */}
            <section className="mb-16">
                <div className="border-l-8 border-emerald-500 pl-6 mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                        スケジュール
                    </h1>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-6 text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
                    <p className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                        <span className="bg-emerald-500 text-white text-xs px-2 py-0.5">INFO</span>
                        稽古場所について
                    </p>
                    <p>
                        曜日によって稽古を行う場所（教室）が異なりますのでご注意ください。<br />
                        見学・体験をご希望の方は、ご希望の曜日の開催場所へ直接お越しいただくか、フォームよりお問い合わせください。
                    </p>
                </div>


            </section>

            {/* PC版：週間グリッド (md以上) */}
            <div className="hidden md:block">
                <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 overflow-hidden shadow-lg">
                    {weekLabels.map((day, idx) => (
                        <div key={day} className={`py-4 text-center font-bold text-sm tracking-widest text-white ${idx === 6 ? 'bg-teal-500' : idx === 5 ? 'bg-emerald-400' : 'bg-stone-800'}`}>
                            {day}
                        </div>
                    ))}
                    {weekLabels.map((_, index) => {
                        const daySchedules = schedules.filter(s => s.dayOfWeek === index).sort((a, b) => a.startTime.localeCompare(b.startTime));

                        return (
                            <div key={index} className="bg-white min-h-[400px] p-2 transition-colors hover:bg-gray-50 border-r border-gray-100 last:border-r-0 flex flex-col">
                                <div className="space-y-2 flex-1">
                                    {daySchedules.length > 0 ? (
                                        daySchedules.map(item => (
                                            <div
                                                key={item.id}
                                                style={{ borderLeftColor: item.color }}
                                                className="bg-white border-l-4 p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                            >
                                                <div style={{ color: item.color }} className="font-bold text-lg leading-tight mb-1">
                                                    {item.startTime}
                                                    <span className="text-xs text-gray-400 font-normal mx-1">-</span>
                                                    {item.endTime}
                                                </div>
                                                <div className="font-bold text-sm leading-tight mb-1 text-gray-900">
                                                    {item.title}
                                                </div>
                                                {item.target && (
                                                    <div className="text-xs font-bold text-red-500 mb-2">
                                                        {item.target}
                                                    </div>
                                                )}
                                                <div className="text-[10px] text-gray-500 flex items-start gap-1 mt-2 border-t border-dashed border-gray-100 pt-2">
                                                    <FaLocationDot className="shrink-0 mt-0.5" />
                                                    <span className="leading-tight">{item.location}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <span className="text-gray-100 font-bold text-xl -rotate-45 tracking-widest select-none">OFF</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* スマホ版：曜日別リスト (md未満) */}
            <div className="md:hidden space-y-8">
                {weekLabels.map((label, index) => {
                    const daySchedules = schedules.filter(s => s.dayOfWeek === index).sort((a, b) => a.startTime.localeCompare(b.startTime));
                    if (daySchedules.length === 0) return null;

                    return (
                        <div key={label} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`text-4xl font-bold leading-none ${index === 6 ? 'text-teal-200' : index === 5 ? 'text-emerald-200' : 'text-stone-300'}`}>
                                    {label}
                                </span>
                                <span className="font-bold text-gray-500 text-sm">{weekDaysJP[index]}</span>
                                <div className="h-[1px] flex-1 bg-gray-100"></div>
                            </div>
                            <div className="space-y-4">
                                {daySchedules.map(item => (
                                    <div key={item.id} className="relative p-5 bg-white border border-gray-100 shadow-md overflow-hidden">
                                        <div style={{ backgroundColor: item.color }} className="absolute top-0 left-0 w-1.5 h-full"></div>
                                        <div className="pl-2">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="text-2xl font-bold leading-none text-gray-800 font-mono">
                                                    {item.startTime}<span className="text-gray-300 text-lg mx-1">-</span>{item.endTime}
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                                            {item.target && (
                                                <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-0.5 font-bold mb-3">
                                                    {item.target}
                                                </span>
                                            )}
                                            <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 mt-1">
                                                <FaLocationDot className="shrink-0 mt-1 text-emerald-500" />
                                                <span className="font-bold text-xs leading-relaxed">{item.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* クラス説明セクション */}
            <section className="mt-24">
                <div className="border-l-8 border-emerald-500 pl-6 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-none tracking-widest font-maru">
                        クラス<span className="text-emerald-500">詳細</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classInfo.map((cls) => (
                        <div
                            key={cls.id}
                            onClick={() => setSelectedClass(cls)}
                            className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer h-full flex flex-col"
                        >
                            {cls.image && (
                                <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={cls.image}
                                        alt={cls.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-3 h-3 shrink-0"
                                        style={{ backgroundColor: cls.color }}
                                    />
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{cls.title}</h3>
                                </div>
                                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4 flex-1">
                                    {cls.description}
                                </p>
                                <span className="text-emerald-500 text-xs font-bold self-end group-hover:underline">詳細を見る →</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* クラス別スケジュールポップアップ */}
            {selectedClass && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* 背景オーバーレイ */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSelectedClass(null)}
                    />

                    {/* モーダル本体 */}
                    <div className="relative bg-white w-full max-w-lg max-h-[90vh] shadow-2xl overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        {/* ヘッダー */}
                        <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white z-10">
                            <div className="border-l-4 pl-4" style={{ borderLeftColor: selectedClass.color }}>
                                <h3 className="text-xl font-bold text-gray-900 leading-none">
                                    {selectedClass.title}
                                </h3>
                                <p className="text-gray-400 text-[10px] font-bold mt-1 tracking-widest uppercase">Class Details</p>
                            </div>
                            <button
                                onClick={() => setSelectedClass(null)}
                                className="text-gray-400 hover:text-black transition-colors p-1"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {selectedClass.image && (
                            <div className="relative h-72 w-full bg-gray-100">
                                <Image
                                    src={selectedClass.image}
                                    alt={selectedClass.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* コンテンツ */}
                        <div className="p-6">
                            {selectedClass.notice && (
                                <div className="mb-4">
                                    <span className="inline-block bg-yellow-100 border border-yellow-200 text-yellow-800 font-bold px-4 py-2 text-sm">
                                        {selectedClass.notice}
                                    </span>
                                </div>
                            )}
                            <div className="mb-6">
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    {selectedClass.description}
                                </p>
                            </div>

                            {/* こんな方にお勧め */}
                            <div className="mb-8 bg-emerald-50/50 p-4 border border-emerald-50">
                                <h4 className="text-[10px] font-bold uppercase mb-3 tracking-widest text-emerald-600">
                                    こんな方にお勧め
                                </h4>
                                <ul className="space-y-2">
                                    {selectedClass.recommended.map((item, rIdx) => (
                                        <li key={rIdx} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <span className="text-emerald-400 text-xs">●</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 開催スケジュール */}
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Weekly Schedule</h4>
                                {schedules
                                    .filter(s => s.title === selectedClass.title)
                                    .map((session, idx) => (
                                        <div key={idx} className="flex flex-col p-3 border border-gray-100 bg-gray-50">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-gray-900 text-lg">{weekLabels[session.dayOfWeek]}</span>
                                                    <span className="text-xs text-gray-500">({weekDaysJP[session.dayOfWeek]})</span>
                                                </div>
                                                <span className="font-mono font-bold text-emerald-600 text-lg">
                                                    {session.startTime}-{session.endTime}
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200/50 mt-1">
                                                <FaLocationDot className="shrink-0 mt-0.5 text-gray-400" />
                                                <span>{session.location}</span>
                                            </div>
                                            {session.target && <div className="text-xs font-bold text-red-500 mt-1 pl-5">※ 対象: {session.target}</div>}
                                        </div>
                                    ))}
                            </div>

                            <div className="mt-8">
                                <Link
                                    href="/contact"
                                    className="block w-full bg-emerald-500 text-white text-center py-4 font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200"
                                >
                                    無料体験を予約する
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* 稽古場所セクション */}
            <section className="mt-24 mb-12">
                <div className="border-l-8 border-emerald-500 pl-6 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-none">
                        アクセス
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            name: "川東小学校体育館",
                            zip: "957-0341",
                            address: "新潟県新発田市下羽津1938番地",
                            mapUrl: "https://maps.google.com/maps?q=新潟県新発田市下羽津1938番地&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        },
                        {
                            name: "東豊コミニティー防災センター",
                            zip: "957-0016",
                            address: "新潟県新発田市豊町4丁目8-4",
                            mapUrl: "https://maps.google.com/maps?q=新潟県新発田市豊町4丁目8-4&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        },
                        {
                            name: "七葉コミュニティセンター",
                            zip: "957-0062",
                            address: "新潟県新発田市三日市862番地",
                            mapUrl: "https://maps.google.com/maps?q=新潟県新発田市三日市862番地&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        },
                        {
                            name: "五十公野コミュニティセンター",
                            zip: "957-0021",
                            address: "新潟県新発田市五十公野4930番地1",
                            mapUrl: "https://maps.google.com/maps?q=新潟県新発田市五十公野4930番地1&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        },
                        {
                            name: "川東中学校体育館",
                            zip: "957-0341",
                            address: "新潟県新発田市下羽津1566-1",
                            mapUrl: "https://maps.google.com/maps?q=新潟県新発田市下羽津1566-1&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        }
                    ].map((loc, index) => (
                        <div key={index} className="bg-white shadow-xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <div className="relative h-64 w-full bg-gray-200">
                                <iframe
                                    title={`Map: ${loc.name}`}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    src={loc.mapUrl}
                                    className="absolute inset-0"
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{loc.name}</h3>
                                </div>
                                <div className="mb-8 flex-1">
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 leading-none">Address</p>
                                    <p className="text-gray-700 leading-relaxed text-sm">
                                        〒{loc.zip}<br />
                                        {loc.address}
                                    </p>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-600 font-bold py-4 transition-all duration-300 border border-emerald-100 font-maru"
                                >
                                    Google Mapで開く
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 稽古風景（活動の様子）ギャラリー */}
            <section className="mt-24 mb-12">
                <div className="border-l-8 border-emerald-500 pl-6 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-none">
                        稽古風景
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="relative aspect-square overflow-hidden group">
                        <Image src="/activity-10.jpg" alt="稽古風景 1" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="relative aspect-square overflow-hidden group">
                        <Image src="/activity-12.jpg" alt="稽古風景 2" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="relative aspect-square overflow-hidden group">
                        <Image src="/activity-13.jpg" alt="稽古風景 3" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="relative aspect-square overflow-hidden group">
                        <Image src="/activity-11.jpg" alt="稽古風景 4" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                </div>
            </section>
        </div>
    );
}
