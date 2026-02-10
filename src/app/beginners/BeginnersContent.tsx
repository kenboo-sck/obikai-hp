"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function BeginnersContent() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800">
            {/* ヒーローセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="border-l-8 border-orange-500 pl-6 mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                        FOR <span className="text-orange-500">BEGINNERS</span>
                    </h1>
                    <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">初めての方へ</p>
                </div>

                <div className="relative aspect-[4/5] md:aspect-[21/9] w-full overflow-hidden shadow-lg rounded-xl mb-12 bg-gray-100">
                    <Image
                        src="/o-1007.jpg"
                        alt="Beginners Welcome"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-900/90 via-stone-900/40 to-transparent flex items-end md:items-center">
                        <div className="p-8 md:p-12 text-white max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">未経験から始める、<br />武道ライフ。</h2>
                            <p className="text-sm md:text-lg font-medium leading-relaxed opacity-95">
                                帯会では、空手やキックボクシングを通じて、心と体を育むお手伝いをしています。
                                「痛そう」「怖そう」というイメージはいりません。
                                礼儀正しく、楽しく、そして真剣に。初心者の方こそ大歓迎です。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 帯会とは */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="border-l-8 border-orange-500 pl-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-none mb-4">
                            WHAT IS <span className="text-orange-500">OBIKAI?</span>
                        </h2>
                        <p className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-8">実戦空手道 帯会とは</p>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                            <p>
                                帯会は、新潟県新発田市にある「実戦空手」と「キックボクシング」を学べる道場です。
                                古来からの武道精神である「礼節」を重んじながら、現代のトレーニング理論を取り入れた合理的な指導を行っています。
                            </p>
                            <p>
                                お子様には礼儀作法と思いやりの心を、大人の方には健康維持と護身の技術を。
                                家族みんなで通える、明るく清潔な道場です。
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden shadow-lg rounded-lg bg-gray-200">
                        <Image
                            src="/o-1008.jpg"
                            alt="Dojo"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* 選ばれる理由 */}
            <section className="bg-orange-50 text-gray-800 py-24 mb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">WHY CHOOSE US</h2>
                        <p className="text-orange-500 font-bold mt-2 tracking-widest text-sm">帯会が選ばれる理由</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center bg-[#fff5f5] p-8 rounded-xl shadow-md border border-orange-100 hover:shadow-xl transition-shadow">
                            <div className="text-orange-500 text-4xl font-bold mb-4">01</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">初心者・子供に優しい指導</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                厳しいだけが武道ではありません。褒めて伸ばす指導方針で、初めての方やお子様でも安心して続けられます。
                            </p>
                        </div>
                        <div className="text-center bg-[#f0f9ff] p-8 rounded-xl shadow-md border border-blue-100 hover:shadow-xl transition-shadow">
                            <div className="text-blue-500 text-4xl font-bold mb-4">02</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">地域に根ざした活動場所</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                新発田市内の学校や公民館を利用して活動しています。お住まいの近くで無理なく通うことができます。
                            </p>
                        </div>
                        <div className="text-center bg-[#f0fdf4] p-8 rounded-xl shadow-md border border-green-100 hover:shadow-xl transition-shadow">
                            <div className="text-green-500 text-4xl font-bold mb-4">03</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">親子で学べるファミリープラン</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                親子で一緒に稽古に参加できるクラスを用意。共通の趣味を持つことで、親子の絆がより深まります。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* こんな人におすすめ */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="border-l-8 border-orange-500 pl-6 mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-none">
                        RECOMMENDED <span className="text-orange-500">FOR YOU</span>
                    </h2>
                    <p className="text-orange-500 font-bold mt-4 tracking-widest uppercase text-sm">こんな人におすすめ</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        {
                            title: "礼儀作法を身につけさせたい",
                            text: "元気な挨拶、返事、靴を揃えるなど、当たり前のことができる子に育てます。武道を通じて相手を敬う心を養います。"
                        },
                        {
                            title: "運動不足を解消したい",
                            text: "全身運動である空手やキックボクシングは、シェイプアップや体力向上に最適です。自分のペースで無理なく続けられます。"
                        },
                        {
                            title: "自分に自信をつけたい",
                            text: "「できた！」という小さな成功体験の積み重ねが自信に繋がります。大きな声を出して体を動かすことで積極性も生まれます。"
                        },
                        {
                            title: "親子で共通の趣味を持ちたい",
                            text: "休日に親子で一緒に汗を流す。普段とは違うコミュニケーションが生まれ、家庭での会話も弾みます。"
                        },
                        {
                            title: "ストレスを発散したい",
                            text: "思い切りミットを叩く爽快感は格別です。日頃のストレスを忘れ、心身ともにリフレッシュできます。"
                        },
                        {
                            title: "護身術を学びたい",
                            text: "万が一の時に身を守る技術と、危険を察知・回避する心構えを習得します。"
                        }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all hover:border-orange-200"
                        >
                            <h3 className="font-bold text-lg text-gray-900 mb-2 text-orange-600">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ステップセクション */}
            <section className="bg-gray-50 py-24 mb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">HOW TO START</h2>
                        <p className="text-orange-500 font-bold mt-2 tracking-widest text-sm">ご利用開始までの流れ</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
                        {[
                            {
                                step: "01",
                                title: "体験予約",
                                desc: "WEBサイトの予約フォームより、ご希望のクラスと日時をお選びください。",
                            },
                            {
                                step: "02",
                                title: "体験レッスン",
                                desc: "動きやすい服装でお越しください。まずは準備体操から、無理なく楽しく体を動かしましょう。",
                            },
                            {
                                step: "03",
                                title: "ご入会",
                                desc: "気に入っていただけたら、ご入会手続きへ。スタッフが丁寧にプランをご案内します。",
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="flex-1 flex flex-col md:flex-row items-center">
                                <div className="bg-white p-8 shadow-lg rounded-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 w-full h-full flex flex-col justify-between border-b-4 border-transparent hover:border-orange-400">
                                    <div className="text-6xl font-black text-gray-100 absolute top-2 right-4 group-hover:text-orange-50 transition-colors pointer-events-none">{item.step}</div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 inline-block border-b-2 border-orange-500">{item.title}</h3>
                                        <p className="text-gray-600 font-medium leading-relaxed text-sm">{item.desc}</p>
                                    </div>
                                </div>
                                {idx < 2 && (
                                    <div className="hidden md:flex items-center justify-center px-4 text-orange-300">
                                        <svg className="w-8 h-8 rotate-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                )}
                                {idx < 2 && (
                                    <div className="md:hidden py-4 text-orange-300">
                                        <svg className="w-8 h-8 rotate-90" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 持ち物セクション */}
            {/* 持ち物セクション */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">WHAT TO BRING</h2>
                            <p className="text-orange-500 font-bold mb-6 tracking-widest text-sm">体験当日の持ち物</p>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    動きやすい服装（Tシャツ、ジャージなど）
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                    タオル
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    水分補給用の飲み物
                                </li>
                            </ul>
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                            <Image
                                src="/o-1009.jpg"
                                alt="What to bring"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Q&Aセクション */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">FAQ</h2>
                    <p className="text-orange-500 font-bold mt-2 tracking-widest text-sm">よくある質問</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        {
                            q: "まったくの未経験でも大丈夫ですか？",
                            a: "はい、もちろん大丈夫です。入会される方のほとんどが未経験からスタートしています。基本から丁寧に指導しますのでご安心ください。"
                        },
                        {
                            q: "体験レッスンに親の見学は必要ですか？",
                            a: "お子様の体験レッスンの場合、保護者の方のご見学をお願いしております。道場の雰囲気やお子様の様子をぜひご覧ください。"
                        },
                        {
                            q: "週1回からでも通えますか？",
                            a: "はい、可能です。ご自身のライフスタイルに合わせて、無理のないペースで通っていただけます。稽古のスケジュールに合わせて自由に参加できます。"
                        },
                        {
                            q: "何歳から入会できますか？",
                            a: "年中（4〜5歳）からご入会いただけます。年齢や体力に合わせた指導を行っていますので、小さなお子様でも安心して始めていただけます。"
                        },
                        {
                            q: "怪我の心配はありませんか？",
                            a: "安全面には最大限配慮して指導を行っています。組手（スパーリング）なども防具を着用し、レベルに合わせて行いますので、大きな怪我の心配はほとんどありません。"
                        },
                        {
                            q: "駐車場はありますか？",
                            a: "はい、各稽古場所（学校体育館・コミュニティセンター）に駐車場がございますので、お車でお越しいただけます。"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="flex items-start gap-4 font-bold text-lg text-gray-900 mb-3">
                                <span className="text-orange-500 font-black text-xl shrink-0">Q.</span>
                                {item.q}
                            </h3>
                            <div className="flex items-start gap-4">
                                <span className="text-orange-300 font-black text-xl shrink-0">A.</span>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {item.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="bg-orange-400 p-12 md:p-20 text-center text-white relative overflow-hidden rounded-2xl shadow-xl">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">
                            Start Your <span className="text-orange-100">Journey</span>
                        </h2>
                        <p className="font-medium max-w-xl mx-auto mb-12 text-lg text-white/90">
                            まずは一度、体験レッスンで道場の雰囲気を感じてみませんか？<br />
                            スタッフ一同、あなたのお越しを心よりお待ちしております。
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-white text-orange-500 px-12 py-5 font-bold text-xl hover:bg-orange-50 transition-all rounded-full shadow-lg"
                        >
                            体験レッスンを予約する
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
