"use client";

import Link from 'next/link';
import Image from 'next/image';

type ParticipantResult = {
    class: string;
    rank: string;
    name: string;
    note?: string;
};

type TournamentData = {
    id: string;
    date: string;
    title: string;
    description: string;
    mainImage?: string;
    results: ParticipantResult[];
};

// 仮のデータ（本来はFirestore等から取得）
const tournaments: Record<string, TournamentData> = {
    "tourney-009": {
        id: "tourney-009",
        date: "2025.10.15",
        title: "第9回帯会スパーリング大会",
        description: "日頃の稽古の成果を存分に発揮し、熱い試合が繰り広げられました。一人一人が自分の限界に挑戦し、素晴らしい成長を見せてくれた大会となりました。",
        mainImage: "/tk-2025.png",
        results: [
            { class: "小学6年生男子の部", rank: "準優勝", name: "田中 太郎", note: "惜しくも判定で一歩及びませんでしたが、見事な立ち回りでした。" },
            { class: "中学女子の部", rank: "優勝", name: "佐藤 結衣", note: "圧倒的なスピードで全試合1本勝ちを収めました。" },
            { class: "一般男子 軽量級", rank: "第3位", name: "伊藤 翼", note: "力強い打撃で会場を沸かせました。" }
        ]
    },
    "tourney-008": {
        id: "tourney-008",
        date: "2025.09.20",
        title: "第8回帯会スパーリング大会",
        description: "多くの道場生が参加し、非常にレベルの高い試合が見られました。選手たちの気迫と、それを支える応援の熱気が会場を包み込みました。",
        results: [
            { class: "中学生男子 軽量級", rank: "第3位", name: "佐藤 健太", note: "" }
        ]
    },
    "tourney-007": {
        id: "tourney-007",
        date: "2025.08.05",
        title: "第7回帯会スパーリング大会",
        description: "厳しい状況の中でも、選手たちは最後まで諦めずに戦い抜きました。この経験が次への自信に繋がることを期待しています。",
        results: [
            { class: "小学3年生男女混合", rank: "ベスト8", name: "鈴木 一郎", note: "" }
        ]
    },
    "tourney-006": {
        id: "tourney-006",
        date: "2025.07.12",
        title: "第6回帯会スパーリング大会",
        description: "幼年の部から一般の部まで、それぞれのレベルで熱戦が展開されました。日々の積み重ねの重要性を改めて感じる一日となりました。",
        results: [
            { class: "幼年の部", rank: "優勝", name: "高橋 次郎", note: "" }
        ]
    },
    "tourney-005": {
        id: "tourney-005",
        date: "2024.04.28",
        title: "第5回帯会スパーリング大会",
        description: "帯会の歴史の中でも非常に活気のある大会となりました。参加した全ての選手に、心からの拍手を送りたいと思います。",
        results: [
            { class: "一般の部", rank: "優勝", name: "山田 花子", note: "" }
        ]
    },
};

export default function TournamentDetailContent({ id }: { id: string }) {
    const safeId = id || "";
    const data = tournaments[safeId] || {
        id: safeId,
        date: "----.--.--",
        title: `第${safeId.split('-').pop()?.replace(/^0+/, '') || "?"}回帯会スパーリング大会`,
        description: "この大会の詳細情報は現在準備中です。",
        results: []
    };

    return (
        <div className="pt-32 pb-20 font-sans text-gray-800 bg-stone-50 min-h-screen">
            {/* パンくずリスト */}
            <div className="max-w-[1024px] mx-auto px-6 mb-8 text-xs font-bold text-gray-400 flex gap-2">
                <Link href="/" className="hover:text-emerald-500 transition-colors font-maru">ホーム</Link>
                <span>/</span>
                <Link href="/results" className="hover:text-emerald-500 transition-colors font-maru">大会結果</Link>
                <span>/</span>
                <span className="text-gray-600 uppercase font-maru">{data.title}</span>
            </div>

            <article className="max-w-[1024px] mx-auto px-6">
                {/* ヘッダー */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-emerald-500 text-white text-[10px] px-3 py-1 font-bold tracking-widest uppercase">大会レポート</span>
                        <span className="text-gray-400 text-sm font-mono font-bold">{data.date}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8 font-maru">
                        {data.title}
                    </h1>

                    {data.mainImage && (
                        <div className="relative aspect-[16/10] w-full overflow-hidden shadow-2xl mb-12 group">
                            <Image
                                src={data.mainImage}
                                alt={data.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    )}

                    <div className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm mb-16">
                        <p className="text-gray-600 leading-loose text-lg font-medium">
                            {data.description}
                        </p>
                    </div>
                </header>

                {/* 結果セクション */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-10 pb-4 border-b-2 border-emerald-500">
                        <h2 className="text-2xl font-black text-gray-900 font-maru">入賞結果一覧</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {data.results.length > 0 ? (
                            data.results.map((res, idx) => (
                                <div key={idx} className="bg-white p-6 md:p-8 shadow-sm border border-stone-100 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:shadow-md transition-all duration-300">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-gray-900 mb-2 font-maru">
                                            <span className="text-emerald-500 mr-2 text-sm">●</span>
                                            {res.name} <span className="text-stone-300 font-normal ml-1">選手</span>
                                        </h3>
                                        {res.note && <p className="text-sm text-stone-500 leading-relaxed pl-6">{res.note}</p>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center bg-white border-2 border-dashed border-stone-200">
                                <p className="text-stone-300 font-bold font-maru">入賞データは現在準備中です。</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* フッター */}
                <footer className="text-center pt-10 border-t border-stone-200">
                    <Link
                        href="/results"
                        className="inline-flex items-center gap-2 bg-stone-900 text-white px-10 py-4 font-bold hover:bg-stone-800 transition-all hover:-translate-x-1 font-maru"
                    >
                        ← 大会結果一覧に戻る
                    </Link>
                </footer>
            </article>
        </div>
    );
}
