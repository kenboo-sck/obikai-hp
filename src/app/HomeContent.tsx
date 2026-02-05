"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from 'next/image';
import Link from 'next/link';

export default function HomeContent() {
    const [newsList, setNewsList] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const q = query(
                    collection(db, "news"),
                    where("status", "==", "published")
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as any[];
                // クライアント側で日付順にソートして最新4件を取得
                const sortedData = data.sort((a: any, b: any) => (b.date > a.date ? 1 : -1)).slice(0, 4);
                setNewsList(sortedData);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    const features = [
        { title: "Location", desc: "本町駅1番出口より徒歩5分の好立地。仕事帰りや隙間時間にも通いやすい環境です。" },
        { title: "Instructor", desc: "アダルト黒帯全日本チャンピオンが直接指導。世界基準の技術を丁寧にレクチャーします。" },
        { title: "Direct Shop", desc: "マーシャルワールド直営店を併設。最新の格闘技ギアをその場で見極め、購入可能です。" },
        { title: "Amenities", desc: "男女別の清潔な更衣室と無料シャワーを完備。練習後も快適に次の予定へ向かえます。" },
        { title: "Machines", desc: "本格的なトレーニングマシンを完備。格闘技に必要な補強運動も道場内で完結します。" },
        { title: "Rental", desc: "道着などの用具レンタルが可能。手ぶらでOKなので、思い立った時に練習できます。" },
        { title: "Safety", desc: "スポーツ保険完備。万が一の怪我にも備え、安心してトレーニングに集中できる環境です。" },
    ];

    const facilityImages = [
        { src: "/image10.jpeg", alt: "トレーニングエリア", label: "Training Area" },
        { src: "/image12.jpeg", alt: "トレーニング機器", label: "Machines" },
        { src: "/image14.jpeg", alt: "トレーニング機器", label: "Machines" },
        { src: "/image16.jpeg", alt: "トレーニング機器", label: "Machines" },
        { src: "/image18.jpeg", alt: "トレーニング機器", label: "Machines" },
        { src: "/image24.jpeg", alt: "マットエリア", label: "Mat Area" },
        { src: "/image25.jpeg", alt: "マットエリア", label: "Mat Area" },
        { src: "/image6.jpeg", alt: "シャワールーム", label: "Shower" },
        { src: "/image9.jpeg", alt: "更衣室", label: "Locker Room" },
        { src: "/image5.jpeg", alt: "ダンベル", label: "Free Weights" },
        { src: "/image8.jpeg", alt: "洗面台", label: "Wash Room" },
        { src: "/image30.jpeg", alt: "練習エリア全景", label: "Training Mat" },
    ];

    return (
        <main>
            {/* ヒーローセクション */}
            <section className="relative min-h-screen md:h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white pt-20 md:pt-0">
                {/* 背景画像 */}
                <Image
                    src="/hm-t-hero-1.png"
                    alt="トレーニングジムの風景"
                    fill
                    priority
                    sizes="100vw"
                    quality={75}
                    className="object-cover"
                />
                {/* オーバーレイを濃くして視認性を向上 */}
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 text-center px-4 py-12 md:px-6 md:py-0 w-full max-w-4xl mx-auto">
                    <p className="text-orange-500 font-bold tracking-[0.3em] mb-4 md:mb-6 text-[10px] md:text-base">
                        BEGIN YOUR EVOLUTION
                    </p>
                    <h1 className="text-3xl md:text-6xl font-black italic leading-tight tracking-tighter mb-4 md:mb-0">
                        理想の自分へ、<br className="md:hidden" />最短ルート。
                    </h1>
                    <p className="mt-4 md:mt-8 text-gray-200 max-w-xl mx-auto text-xs md:text-lg leading-relaxed px-4 md:px-0">
                        初心者・未経験者大歓迎。<br />本町駅すぐの本格ジムで、
                        理想の体と自信を手に入れる。
                    </p>

                    {/* キャンペーンバッジ */}
                    <div className="mt-6 md:mt-10 inline-block w-[calc(100%-2rem)] md:w-auto bg-black/60 backdrop-blur-md border border-orange-600/50 p-4 md:p-6 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-orange-600 text-white px-2 py-0.5 text-[8px] md:text-[10px] font-bold italic tracking-tighter uppercase">Limited Offer</div>
                        <div className="relative z-10 text-left">
                            <h3 className="text-orange-500 text-[10px] md:text-xs font-bold tracking-widest mb-3 uppercase italic text-center md:text-left">Opening Campaign</h3>
                            <div className="grid grid-cols-1 md:flex md:flex-row gap-3 md:gap-8">
                                <div className="flex justify-between md:flex-col items-center md:items-start border-b border-white/5 md:border-none pb-2 md:pb-0">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider md:mb-0.5">Benefit 01</span>
                                    <span className="text-lg md:text-2xl font-black italic">入会金 ¥0</span>
                                </div>
                                <div className="hidden md:block w-px h-10 bg-white/10"></div>
                                <div className="flex justify-between md:flex-col items-center md:items-start border-b border-white/5 md:border-none pb-2 md:pb-0">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider md:mb-0.5">Benefit 02</span>
                                    <span className="text-lg md:text-2xl font-black italic">道着プレゼント</span>
                                </div>
                                <div className="hidden md:block w-px h-10 bg-white/10"></div>
                                <div className="flex justify-between md:flex-col items-center md:items-start">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider md:mb-0.5">Benefit 03</span>
                                    <span className="text-lg md:text-2xl font-black italic text-orange-500">2ヶ月無料</span>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-col items-center md:items-start space-y-2 pt-4 border-t border-white/10">
                                <p className="text-base md:text-xl font-bold italic text-center md:text-left">
                                    先着 <span className="text-orange-500 text-xl md:text-2xl underline decoration-white decoration-2 underline-offset-4">30名様</span> 限定
                                </p>
                                <p className="text-[9px] text-gray-500 font-medium leading-tight text-center md:text-left italic">
                                    ※6ヶ月間の継続利用が条件となります。<br />
                                    6か月以内に解約の場合は実費請求となります。
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-3 md:gap-5 justify-center items-center px-4 md:px-0">
                        <a href="https://picro.jp/sports/almafight/trials/entry/3284" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-orange-600 text-white px-8 py-4 md:px-12 md:py-5 font-bold text-sm md:text-lg hover:bg-orange-500 transition-all shadow-2xl shadow-orange-900/40 cursor-pointer italic text-center">
                            今すぐ無料で体験する
                        </a>
                        <Link href="/class" className="w-full md:w-auto border border-white/20 text-white px-8 py-4 md:px-12 md:py-5 font-bold text-sm md:text-lg hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer italic text-center">
                            クラスの紹介
                        </Link>
                    </div>
                </div>

                {/* スクロールを促す表示 */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
                    <span className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase">Scroll</span>
                    <div className="w-[1px] h-8 md:h-12 bg-white animate-pulse"></div>
                </div>
            </section>

            {/* コンセプトリードセクション */}
            <section className="py-24 bg-white relative overflow-hidden font-[family-name:var(--font-oswald)]">
                {/* 背景タイポグラフィ */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-20 select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
                    <span className="text-[15rem] md:text-[25rem] font-black italic leading-none uppercase tracking-tighter">
                        AUTHENTIC
                    </span>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="md:w-1/2">
                            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-gray-900">
                                REAL <span className="text-orange-600">VIBES</span><br />
                                EVERY DAY.
                            </h2>
                            <p className="text-gray-400 font-bold mt-4 tracking-[0.2em] uppercase text-sm md:text-base">
                                本物を、日常に。
                            </p>
                        </div>
                        <div className="md:w-1/2 md:pt-4">
                            <div className="space-y-6 text-gray-600 font-sans text-base md:text-lg leading-relaxed">
                                <p>
                                    大阪・本町駅すぐの好立地に、新ジムが誕生。<br />
                                    ブラジリアン柔術を中心に、キックボクシングやMMAまで、多彩なクラスをご用意。
                                </p>
                                <p>
                                    日本トップレベルのインストラクターが格闘技の楽しさ、最高峰の技術を丁寧に指導します。
                                    初心者から上級者まで、老若男女問わず歓迎。
                                </p>
                                <p className="text-gray-900 font-bold text-xl md:text-2xl italic">
                                    日常を変える一歩を、ここから。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ジムの特長セクション */}
            <section className="py-24 bg-white font-[family-name:var(--font-oswald)] overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="mb-16 border-l-8 border-orange-600 pl-6">
                        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
                            GYM <span className="text-orange-600">FEATURES</span>
                        </h2>
                        <p className="text-gray-400 font-bold mt-2 tracking-widest uppercase text-sm">ジムの特長</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 overflow-hidden shadow-2xl">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 md:p-10 relative group hover:bg-gray-50 transition-colors duration-500"
                            >
                                {/* ナンバリング背景 */}
                                <span className="absolute top-2 right-2 md:top-4 md:right-6 text-8xl md:text-9xl font-black italic text-gray-50 group-hover:text-orange-50 transition-colors duration-500 leading-none">
                                    0{i + 1}
                                </span>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-4 md:mb-6">
                                        {f.title}
                                    </h3>
                                    <p className="text-gray-500 font-sans text-sm leading-relaxed font-medium border-l-2 border-gray-100 pl-4 group-hover:border-orange-600 transition-colors duration-500">
                                        {f.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* 空きスペースを埋めるCTAブロック */}
                        <div className="bg-orange-600 p-6 md:p-10 relative group flex flex-col justify-center lg:col-span-2 overflow-hidden">
                            {/* 背景の装飾的なタイポグラフィ */}
                            <div className="absolute -right-4 -bottom-8 opacity-10 select-none pointer-events-none">
                                <span className="text-9xl font-black italic uppercase tracking-tighter text-white">JOIN</span>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
                                    START YOUR <span className="text-black">EVOLUTION</span>
                                </h3>
                                <p className="text-orange-100 font-bold mb-6 md:mb-8 max-w-md text-sm md:text-base">
                                    本物の技術、最高の環境。あなたの挑戦を私たちが全力でサポートします。まずは無料体験から。
                                </p>
                                <a
                                    href="https://picro.jp/sports/almafight/trials/entry/3284"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-white text-orange-600 px-10 py-4 font-black italic uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl"
                                >
                                    体験予約はこちらから →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 施設ギャラリーセクション */}
            <section className="py-24 bg-gray-900 font-[family-name:var(--font-oswald)] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 border-l-8 border-orange-600 pl-6">
                        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-white">
                            FACILITY <span className="text-orange-600">GALLERY</span>
                        </h2>
                        <p className="text-gray-400 font-bold mt-2 tracking-widest uppercase text-sm">施設紹介（クリックで拡大）</p>
                    </div>

                    {/* メイングリッド */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                        {facilityImages.map((img, index) => (
                            <div
                                key={index}
                                className={`relative group overflow-hidden cursor-pointer ${index === 0 ? 'col-span-2 row-span-2' : ''} ${index === 11 ? 'col-span-2' : ''}`}
                                onClick={() => setSelectedImage(img.src)}
                            >
                                <div className={`relative ${index === 0 ? 'aspect-square' : index === 11 ? 'aspect-[2/1]' : 'aspect-square'}`}>
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        loading="lazy"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        quality={60}
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <h3 className="text-sm font-black italic uppercase text-white">{img.label}</h3>
                                    </div>
                                    {/* クリックアイコン */}
                                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 施設の特徴 */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black italic text-orange-600 mb-2">広々</div>
                            <p className="text-gray-400 text-xs md:text-sm font-bold">マットエリア</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black italic text-orange-600 mb-2">清潔</div>
                            <p className="text-gray-400 text-xs md:text-sm font-bold">常に清潔な環境</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black italic text-orange-600 mb-2">充実</div>
                            <p className="text-gray-400 text-xs md:text-sm font-bold">本格的な設備</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black italic text-orange-600 mb-2">無料</div>
                            <p className="text-gray-400 text-xs md:text-sm font-bold">シャワー完備</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ブラジリアン柔術の魅力セクション */}
            <section className="py-24 bg-white font-[family-name:var(--font-oswald)] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div className="border-l-8 border-orange-600 pl-6">
                            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                                The Charm of BJJ
                            </h2>
                            <p className="text-gray-400 font-bold mt-2 tracking-widest uppercase text-sm">ブラジリアン柔術の魅力</p>
                        </div>
                        <p className="text-gray-600 font-sans max-w-md leading-relaxed">
                            格闘技の枠を超え、ライフスタイルとして世界中で愛されるブラジリアン柔術。その奥深い魅力を3つのポイントでご紹介します。
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* 魅力 1 */}
                        <div className="group">
                            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden shadow-lg">
                                <Image
                                    src="/oh-1001.jpg"
                                    alt="Mental Game"
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    quality={70}
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="text-9xl md:text-[10rem] font-black italic text-gray-50 group-hover:text-orange-50 transition-colors leading-none mb-[-50px] md:mb-[-60px] relative z-0">01</div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black italic uppercase mb-4 border-b-2 border-black pb-2 inline-block">Mental Game</h3>
                                <p className="text-gray-700 font-sans leading-relaxed">
                                    「体を使ったチェス」と称される柔術は、力だけでなくテクニックと戦略が重要です。パズルを解くような知的な興奮が、日常のストレスを忘れさせてくれます。
                                </p>
                            </div>
                        </div>
                        {/* 魅力 2 */}
                        <div className="group">
                            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden shadow-lg">
                                <Image
                                    src="/oh-1002.png"
                                    alt="Total Fitness"
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    quality={70}
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="text-9xl md:text-[10rem] font-black italic text-gray-50 group-hover:text-orange-50 transition-colors leading-none mb-[-50px] md:mb-[-60px] relative z-0">02</div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black italic uppercase mb-4 border-b-2 border-black pb-2 inline-block">Total Fitness</h3>
                                <p className="text-gray-700 font-sans leading-relaxed">
                                    全身を連動させる動きにより、筋力、柔軟性、持久力が自然と向上します。楽しみながら動いているうちに、理想的な引き締まった体へと変化していきます。
                                </p>
                            </div>
                        </div>
                        {/* 魅力 3 */}
                        <div className="group">
                            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden shadow-lg">
                                <Image
                                    src="/oh-04.jpg"
                                    alt="Community"
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    quality={70}
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="text-9xl md:text-[10rem] font-black italic text-gray-50 group-hover:text-orange-50 transition-colors leading-none mb-[-50px] md:mb-[-60px] relative z-0">03</div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black italic uppercase mb-4 border-b-2 border-black pb-2 inline-block">Community</h3>
                                <p className="text-gray-700 font-sans leading-relaxed">
                                    マットの上では年齢や職業は関係ありません。共に汗を流し、技術を高め合う仲間との絆は、あなたの人生をより豊かにする一生の財産になります。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MMA & KickBoxing セクション */}
            <section className="py-24 bg-black text-white font-[family-name:var(--font-oswald)]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* MMA */}
                        <div className="relative group overflow-hidden border border-white/10">
                            <div className="relative aspect-[4/5] lg:aspect-[16/9]">
                                <Image
                                    src="/mma-hero.png"
                                    alt="MMA"
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={60}
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                    <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-2 md:mb-4">
                                        MMA
                                    </h2>
                                    <p className="text-gray-300 font-sans max-w-md leading-relaxed text-sm md:text-base">
                                        打撃、投げ、寝技を融合させた総合格闘技。初心者からプロ志望まで、個々のレベルに合わせた指導で、究極の強さを追求します。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* KickBoxing */}
                        <div className="relative group overflow-hidden border border-white/10">
                            <div className="relative aspect-[4/5] lg:aspect-[16/9]">
                                <Image
                                    src="/kick-hero.png"
                                    alt="KickBoxing"
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={60}
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                    <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-2 md:mb-4">
                                        Kick<span className="text-orange-600">Boxing</span>
                                    </h2>
                                    <p className="text-gray-300 font-sans max-w-md leading-relaxed text-sm md:text-base">
                                        パンチとキックを組み合わせた全身運動。ダイエットやストレス解消はもちろん、本格的なテクニックも基礎から丁寧にレクチャーします。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 最新ニュースセクション */}
            <section className="py-24 bg-gray-50 font-[family-name:var(--font-oswald)]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12 border-l-8 border-orange-600 pl-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                                Latest News
                            </h2>
                            <p className="text-gray-400 font-bold mt-2 tracking-widest uppercase text-sm">最新のお知らせ</p>
                        </div>
                        <Link href="/news" className="text-orange-600 font-bold hover:underline italic uppercase tracking-tighter hidden md:block">
                            View All News →
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                        {newsList.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.id}`}
                                className="group flex flex-col bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
                            >
                                <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                                    {(item.image || item.imageUrl || item.thumbnail) ? (
                                        <Image
                                            src={item.image || item.imageUrl || item.thumbnail}
                                            alt={item.title}
                                            fill
                                            loading="lazy"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            quality={60}
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-300 font-black italic text-xs tracking-widest">NO IMAGE</div>
                                    )}
                                </div>

                                <div className="px-2 pt-2 md:px-4 md:pt-4 flex items-center gap-2 md:gap-3">
                                    <span className="text-gray-400 font-bold text-[10px]">
                                        {item.date?.seconds
                                            ? new Date(item.date.seconds * 1000).toLocaleDateString('ja-JP').replace(/\//g, '.')
                                            : typeof item.date === 'string'
                                                ? item.date.replace(/-/g, '.')
                                                : '---'}
                                    </span>
                                    <span className="bg-black text-white text-[8px] px-2 py-0.5 font-black italic uppercase tracking-tighter">
                                        {item.category || "INFO"}
                                    </span>
                                </div>

                                <div className="flex-1 p-2 md:p-4">
                                    <h2 className="text-sm md:text-base font-black italic uppercase group-hover:text-orange-600 transition-colors mb-1 md:mb-2 leading-tight">
                                        {item.title}
                                    </h2>
                                    <div className="text-gray-500 text-[10px] font-bold line-clamp-2 italic">
                                        {item.content?.replace(/<[^>]*>?/gm, '')}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/news" className="inline-block bg-black text-white px-8 py-3 font-bold text-sm hover:bg-orange-600 transition-all">
                            VIEW ALL NEWS
                        </Link>
                    </div>
                </div>
            </section>

            {/* 画像拡大モーダル */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* 閉じるボタン */}
                    <button
                        className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors z-50"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* 拡大画像 */}
                    <div
                        className="relative max-w-5xl max-h-[90vh] w-full h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="施設画像"
                            fill
                            sizes="100vw"
                            quality={85}
                            className="object-contain"
                        />
                    </div>

                    {/* クリックで閉じるヒント */}
                    <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-bold">
                        クリックまたはESCで閉じる
                    </p>
                </div>
            )}

        </main>
    );
}
