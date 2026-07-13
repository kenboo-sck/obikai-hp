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
    organizer?: string; // 主催を追加
    description: string;
    mainImage?: string;
    results: ParticipantResult[];
};

// 大会実績データ
const tournaments: Record<string, TournamentData> = {
    "climb-up-fight-2": {
        id: "climb-up-fight-2",
        date: "2026.07.12",
        title: "第2回CLIMB UP FIGHT",
        organizer: "CLIMB UP 実行委員会",
        description: "CLIMB UP 実行委員会が主催する「第2回CLIMB UP FIGHT」に帯会の選手たちが参戦しました。ワンマッチなどの実戦形式の試合の中、それぞれが持てる力を尽くして戦い抜きました。この経験を糧に、さらなる向上を目指します。",
        results: [
            { class: "ワンマッチの部", rank: "1勝1敗", name: "田坂 宗帯" },
            { class: "ワンマッチの部", rank: "1敗", name: "井上 心太郎" }
        ]
    },
    "niigata-boxing-karate-24": {
        id: "niigata-boxing-karate-24",
        date: "2026.07.05",
        title: "第24回新潟県拳闘空手道選手権大会",
        organizer: "拳闘空手道連合会",
        description: "拳闘空手道連合会が主催する「第24回新潟県拳闘空手道選手権大会」が開催されました。日頃の厳しい稽古で培った技と精神力を発揮し、熱い闘いを繰り広げた結果、見事な成績を収めることができました。",
        results: [
            { class: "小学3.4年生の部", rank: "優勝", name: "井上 心太郎" },
            { class: "小学3.4年生の部", rank: "準優勝", name: "田坂 宗帯" }
        ]
    },
    "ibaraki-karate-6": {
        id: "ibaraki-karate-6",
        date: "2026.06.28",
        title: "第6回茨城県空手道選手権大会",
        organizer: "武将會",
        description: "武将會が主催する「第6回茨城県空手道選手権大会」に帯会の選手が出場しました。各道場から強豪が集うハイレベルな大会でしたが、選手たちは一歩も退かずに粘り強く戦い抜き、表彰台に登りました。",
        results: [
            { class: "中級小学2年生の部", rank: "3位", name: "村田 大珂" },
            { class: "エクスペリエンス小学2年生の部", rank: "準優勝", name: "井上 丈太郎" },
            { class: "エクスペリエンス小学2年生の部", rank: "3位", name: "島津 大智" }
        ]
    },
    "niigata-karate-27": {
        id: "niigata-karate-27",
        date: "2026.06.07",
        title: "第27回新潟県空手道選手権大会",
        organizer: "新極真会新潟支部",
        description: "新極真会新潟支部が主催する「第27回新潟県空手道選手権大会」に出場しました。日頃の厳しい稽古の成果を遺憾なく発揮し、多くの選手が見事優勝を果たす素晴らしい結果となりました。応援ありがとうございました。",
        results: [
            { class: "小学2年男子の部", rank: "優勝", name: "村田 大珂" },
            { class: "小学4年男子初級の部", rank: "優勝", name: "井上 心太郎" },
            { class: "小学3.4年男子中量級", rank: "優勝", name: "田坂 宗帯" },
            { class: "小学5年男子軽量級", rank: "優勝", name: "石井 哲弥" },
            { class: "中学2.3年男子の部", rank: "優勝", name: "石井 寛弥" },
            { class: "シニア中級の部", rank: "優勝", name: "増子 元" }
        ]
    }
};

export default function TournamentDetailContent({ id }: { id: string }) {
    const safeId = id || "";
    const data = tournaments[safeId] || {
        id: safeId,
        date: "----.--.--",
        title: "大会結果詳細",
        organizer: "",
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
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="bg-emerald-500 text-white text-[10px] px-3 py-1 font-bold tracking-widest uppercase">大会結果</span>
                        <span className="text-gray-400 text-sm font-mono font-bold">{data.date}</span>
                        {data.organizer && (
                            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-1 rounded border border-emerald-100">
                                主催: {data.organizer}
                            </span>
                        )}
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
                                <div key={idx} className="bg-white p-6 md:p-8 shadow-sm border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:shadow-md transition-all duration-300">
                                    <div className="flex-1">
                                        <span className="text-xs font-bold text-gray-400 block mb-1">
                                            {res.class}
                                        </span>
                                        <h3 className="text-xl font-black text-gray-900 font-maru">
                                            <span className="text-emerald-500 mr-2 text-sm">●</span>
                                            {res.name} <span className="text-stone-400 font-normal text-sm ml-1">選手</span>
                                        </h3>
                                        {res.note && <p className="text-sm text-stone-500 leading-relaxed mt-2 pl-6">{res.note}</p>}
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className={`inline-block px-5 py-2 text-sm font-bold tracking-wider rounded font-maru ${
                                            res.rank === '優勝' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                            res.rank === '準優勝' ? 'bg-slate-100 text-slate-800 border border-slate-200' :
                                            (res.rank === '3位' || res.rank === '第3位') ? 'bg-orange-50 text-orange-800 border border-orange-200' :
                                            'bg-emerald-50 text-emerald-800 border border-emerald-100'
                                        }`}>
                                            {res.rank}
                                        </span>
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
