import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '競技ルール | 実戦空手道 帯会',
  description: '帯会スパーリング大会の競技ルール詳細です。フルコンタクト空手、グローブ空手それぞれのルール、反則、防具規定をまとめています。',
};

export default function RulesPage() {
  return (
    <main className="bg-gray-50 min-h-screen pt-32 pb-20 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
            <Link href="/sparing-tournament" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            大会概要に戻る
            </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12 border-b border-gray-100 flex flex-col md:flex-row justify-between items-baseline gap-4">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight font-maru tracking-widest">
                    帯会スパーリング大会 <br className="md:hidden" />競技ルール
                </h1>
                <p className="text-gray-500 font-bold tracking-widest text-lg">2025.11 版</p>
            </div>

            <div className="p-8 md:p-12 space-y-16 mt-4">
                {/* 1. フルコンタクト空手 */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gray-300 text-gray-800 px-6 py-4 rounded-t-xl tracking-widest font-maru">
                        フルコンタクト空手
                    </h2>
                    <div className="border-x border-b border-gray-200 rounded-b-xl p-6 md:p-8 space-y-10 bg-white">
                        
                        {/* ルール */}
                        <div>
                            <h3 className="bg-gray-100 text-gray-800 font-bold px-4 py-2 mb-4 border-l-4 border-gray-400 text-lg">ルール</h3>
                            <ul className="space-y-3 text-gray-800 pl-2 font-medium">
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">フルコンタクト空手ルールの試合は、一般的なフルコンタクト空手ルールに準拠する</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">幼児からでも上段の膝蹴りは有効打とし、的確に決まった場合は技ありとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">同様に幼児から胴廻し回転蹴りも有効打とし、的確に決まった場合は技ありとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">幼児〜小学2年生までは早めの技有り等を示す</span></li>
                            </ul>
                        </div>

                        {/* 反則 */}
                        <div>
                            <h3 className="bg-gray-100 text-gray-800 font-bold px-4 py-2 mb-4 border-l-4 border-gray-400 text-lg">反則</h3>
                            <ul className="space-y-6 text-gray-800 pl-2 font-medium">
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">押し、掴み、投げ、掴みからの攻撃、金的、膝関節への攻撃、顔面へのパンチ</span></li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gray-400 mt-0.5">◇</span>
                                    <div className="leading-relaxed w-full">
                                        審判5人中、3人が認めたら、注意1、注意2で減点1、注意4（減点2）で失格<br/>
                                        <span className="text-gray-500 text-sm">※3審制の場合は3人中、2人が認めた場合</span>
                                        <div className="mt-6 p-6 md:p-8 bg-white border border-gray-200 rounded-xl max-w-2xl shadow-sm">
                                            <p className="font-bold mb-8 text-gray-700">反則による失格の早見表</p>
                                            <div className="flex items-start justify-between text-xs md:text-sm font-bold text-gray-600 relative">
                                                {/* Timeline style */}
                                                <div className="absolute top-2 left-6 right-6 h-0.5 bg-gray-400 hidden sm:block"></div>
                                                <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                    <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                    <div className="flex flex-col">
                                                        <span>口頭注意</span>
                                                        <span className="text-xs font-normal text-gray-500 whitespace-nowrap">(判定に影響しない)</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                    <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                    <span>注意1</span>
                                                </div>
                                                <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                    <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                    <div className="flex flex-col">
                                                        <span>減点1</span>
                                                        <span className="text-xs font-normal text-gray-500">(注意2)</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                    <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                    <span>注意3</span>
                                                </div>
                                                <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                    <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                    <span>失格</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">反則による続行不可能となった場合、反則した方の反則負けとなる</span></li>
                            </ul>
                        </div>

                        {/* 防具 */}
                        <div>
                            <h3 className="bg-gray-100 text-gray-800 font-bold px-4 py-2 mb-4 border-l-4 border-gray-400 text-lg">防具</h3>
                            <ul className="space-y-3 text-gray-800 pl-2 font-medium">
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">各自の道場での試合服装とする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">拳サポーター、すね当て、ファールカップ、ヘッドギア</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">3年生以上はひざ当てを着用する</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">幼児、1年生はプロテクターを着用する</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">防具は各自の物を使用する</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">男子対女子の場合はプロテクターの着用は任意とする</span></li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 2. グローブ空手 */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gray-300 text-gray-800 px-6 py-4 rounded-t-xl tracking-widest font-maru">
                        グローブ空手
                    </h2>
                    <div className="border-x border-b border-gray-200 rounded-b-xl p-6 md:p-8 space-y-10 bg-white">
                        
                        {/* クラス別詳細 */}
                        <div>
                            <h3 className="bg-gray-100 text-gray-800 font-bold px-4 py-2 mb-4 border-l-4 border-gray-400 text-lg">クラス別ルール</h3>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full text-center border-collapse border border-gray-800 text-gray-800 whitespace-nowrap md:whitespace-normal">
                                    <thead>
                                        <tr className="bg-gray-300">
                                            <th className="border border-gray-800 p-4 font-normal w-1/5 min-w-[100px]"></th>
                                            <th className="border border-gray-800 p-4 font-normal w-1/5">押し</th>
                                            <th className="border border-gray-800 p-4 font-normal w-1/5">掴み</th>
                                            <th className="border border-gray-800 p-4 font-normal w-1/5">
                                                ワンキャッチ<br/>ワンアタック
                                            </th>
                                            <th className="border border-gray-800 p-4 font-normal w-1/5">首相撲</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-800 bg-gray-300 p-4 font-normal text-left">Aクラス</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">◯</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">◯</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl relative hidden-overflow">
                                                ◯<span className="text-red-500 text-sm align-top">※1</span>
                                            </td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl relative hidden-overflow">
                                                ◯<span className="text-blue-500 text-sm align-top">※2</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-800 bg-gray-300 p-4 font-normal text-left">Bクラス</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">◯</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">✕</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">✕</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">✕</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-800 bg-gray-300 p-4 font-normal text-left">ビギナー</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">◯</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">✕</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">✕</td>
                                            <td className="border border-gray-800 p-4 text-2xl lg:text-3xl">✕</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="space-y-1 mb-8 text-[15px]">
                                <p className="text-red-500 border-b border-red-200 inline-block pb-0.5 mb-2">※1 前蹴り、ミドルキック、ハイキック等</p><br/>
                                <p className="text-blue-500 border-b border-blue-200 inline-block pb-0.5">※2 主審のカウントで3秒以内</p>
                            </div>
                            
                            <ul className="space-y-5 text-gray-800 pl-2 text-[15px] font-medium leading-loose">
                                <li className="flex items-start gap-4">
                                    <span className="text-black font-black mt-1">●</span>
                                    <span>首相撲有り、ワンキャッチ・ワンアタック有り、掴み有りをAクラス、無しをBクラスと致しました。</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-black font-black mt-1">●</span>
                                    <div className="w-full">
                                        首相撲は主審カウントで3秒以内、ワンキャッチ・ワンアタックの場合、キャッチして歩けるのは1歩までです。<br/>
                                        <span className="text-gray-600 text-sm">※数歩以上歩きながらのワンアタックは、注意1の対象となります。</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-black font-black mt-1">●</span>
                                    <span>スパーリング大会も9回を迎え、昨今のキックボクシングのルールを鑑み、ルール改正を都度行っております。今回も分かりやすいクラス編成をと考慮し、上表の3クラスへと変更させて頂きます。</span>
                                </li>
                            </ul>
                        </div>

                        {/* ルール */}
                        <div>
                            <h3 className="bg-gray-100 text-gray-800 font-bold px-4 py-2 mb-4 border-l-4 border-gray-400 text-lg">ルール</h3>
                            <ul className="space-y-3 text-gray-800 pl-2 font-medium">
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">グローブルールの試合は、一般的なキックボクシングルールに準拠する（K.Oルール）</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">相手の攻撃によるダウン、又はレフリーの判断によるダウンにより、10カウント以内で続行できなければK.Oとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">又、戦意喪失など続行不可能とレフリーが判断した場合はT.K.Oとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">2ダウンK.O制とする</span></li>
                                <li className="flex items-start gap-3 bg-gray-200 p-5 rounded-xl my-4"><span className="text-gray-600 mt-0.5 font-black text-xl leading-none">◆</span><span className="leading-relaxed font-bold">当日は計量を行う。計量で申告体重を1kg以上オーバーした選手は減点1となるが、計量後、規定時間内に範囲内に落とした場合は双方の合意のもと、罰則は無しとする。<br/>再計量はフルコンの試合が終わり次第に行う。</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">プッシングはOKとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">テンカオ（組まずにボディへの膝蹴り）はOKとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">Aクラス以上は首相撲（膝蹴りは3秒まで）あり、ワンキャッチ・ワンアタックも有効とする</span></li>
                            </ul>
                        </div>

                        {/* 反則 */}
                        <div>
                            <h3 className="bg-gray-100 text-gray-800 font-bold px-4 py-2 mb-4 border-l-4 border-gray-400 text-lg">反則</h3>
                            <ul className="space-y-4 text-gray-800 pl-2 font-medium">
                                <li className="flex items-start gap-3">
                                    <span className="text-gray-400 mt-0.5">◇</span>
                                    <div className="leading-relaxed">
                                        掴み、首相撲※1、首相撲からの膝蹴り※1、顔面への膝蹴り、投げ、金的、膝関節への攻撃、バックハンドブロー<br/>
                                        <span className="text-gray-500 text-sm font-normal">※1 Aクラスは首相撲あり（膝蹴りは3秒まで）</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">ダメージの無い掴み程度の行為は口頭注意</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">口頭注意が何度も続く場合（2〜3回）で注意1、故意による反則は減点1（注意2）<br/>酷い反則行為があった場合は、減点1を</span></li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gray-400 mt-0.5">◇</span>
                                    <div className="leading-relaxed">
                                        審判5人中、3人が認めたら、注意1、注意2で減点1、注意4（減点2）で失格<br/>
                                        <span className="text-gray-500 text-sm font-normal">※3審制の場合は3人中、2人が認めた場合</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gray-400 mt-0.5">◇</span>
                                    <div className="leading-relaxed w-full">
                                        <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
                                            <div className="flex-shrink-0">
                                                <div className="space-y-1 text-[15px]">
                                                    <div>a ダウンの有無</div>
                                                    <div>b 減点1</div>
                                                    <div>c 相手へのダメージ</div>
                                                    <div>d 有効打</div>
                                                    <div>e 全体的な試合の支配率</div>
                                                    <div>f 手数、気迫</div>
                                                </div>
                                            </div>
                                            <div className="flex-1 max-w-lg mt-2 lg:mt-0 p-6 bg-white border border-gray-200 rounded-xl relative shadow-sm">
                                                <p className="font-bold border-b border-gray-200 pb-3 mb-6 flex items-center gap-4 text-lg">
                                                    a <span className="text-xs text-gray-400">&gt;</span> b <span className="text-xs text-gray-400">&gt;</span> c <span className="text-xs text-gray-400">&gt;</span> d <span className="text-xs text-gray-400">&gt;</span> e <span className="text-xs text-gray-400">&gt;</span> f  
                                                </p>
                                                <p className="text-sm text-gray-600 font-normal mb-8">この順を判定の基準の強弱とする</p>
                                                
                                                <div className="flex items-start justify-between text-xs md:text-sm font-bold text-gray-600 relative">
                                                    {/* Timeline style */}
                                                    <div className="absolute top-2 left-6 right-6 h-0.5 bg-gray-400 hidden sm:block"></div>
                                                    <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                        <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                        <div className="flex flex-col">
                                                            <span>口頭注意</span>
                                                            <span className="text-xs font-normal text-gray-500 whitespace-nowrap">(判定に影響しない)</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                        <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                        <span>注意1</span>
                                                    </div>
                                                    <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                        <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                        <div className="flex flex-col">
                                                            <span>減点1</span>
                                                            <span className="text-xs font-normal text-gray-500">(注意2)</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                        <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                        <span>注意3</span>
                                                    </div>
                                                    <div className="flex flex-col items-center relative z-10 w-full sm:w-auto text-center gap-2">
                                                        <span className="w-4 h-4 bg-gray-400 rounded-full hidden sm:block"></span>
                                                        <span>失格</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">基本的にダウンを取った方が勝ち</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">ダメージ、有効打共にA選手の有利でも、A選手に減点1がある場合は、B選手の勝ちとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">反則による続行不可能となった場合、反則した方の反則負けとなる</span></li>
                                <li className="flex items-start gap-3 text-red-600"><span className="text-red-400 mt-[-2px] text-xl font-normal leading-none shrink-0">◇</span><span className="leading-relaxed">Bクラスは首相撲無し、首に掛かる掴みも無し、ミドルキックや前蹴りを対象とするワンキャッチ・ワンアタックも無しとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">掴みか押しか微妙な場合は口頭注意、又は流す</span></li>
                            </ul>
                        </div>

                        {/* 防具 */}
                        <div>
                            <h3 className="bg-gray-100 text-gray-800 font-bold px-4 py-2 mb-4 border-l-4 border-gray-400 text-lg">防具</h3>
                            <ul className="space-y-3 text-gray-800 pl-2 font-medium">
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">幼児のグローブルールは無しとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">小1はプロテクターを<span className="text-red-600 font-bold">任意とする</span></span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">男子対女子の場合、女子のプロテクターは任意とする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">小学生 28.0kgまで08オンス、28.1kg以上12オンス</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">中学生 38.0kgまで12オンス、38.1kg以上14オンス</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">グローブの下は軍手、バンテージどちらでもOKとする</span></li>
                                <li className="flex items-start gap-3"><span className="text-gray-400 mt-0.5">◇</span><span className="leading-relaxed">ヘッドギアは各自の物とする <span className="text-gray-500 font-normal text-sm ml-2">※面付きのヘッドギア推奨、面無しの場合はマウスピース必須</span></span></li>
                                <li className="flex items-start gap-3 text-red-600"><span className="text-red-400 mt-0.5">◇</span><span className="leading-relaxed font-bold">膝当ては必須とする</span></li>
                            </ul>
                        </div>

                    </div>
                </section>
            </div>
        </div>
      </div>
    </main>
  );
}
