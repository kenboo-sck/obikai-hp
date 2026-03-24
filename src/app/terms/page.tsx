
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '利用規約',
    description: '実戦空手道 帯会のウェブサイト利用規約について掲載しています。',
};

export default function TermsPage() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800">
            <section className="max-w-4xl mx-auto px-6 mb-16">
                <div className="border-l-8 border-emerald-500 pl-6 mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-none">
                        利用規約
                    </h1>
                </div>

                <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 space-y-10 leading-relaxed">
                    <div>
                        <p className="mb-6">
                            この利用規約（以下、「本規約」といいます。）は、実戦空手道 帯会（以下、「当会」といいます。）が提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。ご利用者の皆様（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-6 h-6 bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">1</span>
                            適用
                        </h2>
                        <ol className="list-decimal list-outside pl-5 text-gray-600 space-y-2 text-sm md:text-base marker:text-emerald-400 marker:font-bold">
                            <li>本規約は、ユーザーと当会との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
                            <li>当会は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-6 h-6 bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">2</span>
                            禁止事項
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mb-2">
                            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
                        </p>
                        <ol className="list-decimal list-outside pl-5 text-gray-600 space-y-2 text-sm md:text-base marker:text-emerald-400 marker:font-bold">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>犯罪行為に関連する行為</li>
                            <li>当会のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                            <li>当会のサービスの運営を妨害するおそれのある行為</li>
                            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                            <li>不正アクセスをし、またはこれを試みる行為</li>
                            <li>他のユーザーに成りすます行為</li>
                            <li>当会のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                            <li>その他、当会が不適切と判断する行為</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-6 h-6 bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">3</span>
                            本サービスの提供の停止等
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mb-2">
                            当会は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                        </p>
                        <ol className="list-decimal list-outside pl-5 text-gray-600 space-y-2 text-sm md:text-base marker:text-emerald-400 marker:font-bold">
                            <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                            <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                            <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                            <li>その他、当会が本サービスの提供が困難と判断した場合</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-6 h-6 bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">4</span>
                            免責事項
                        </h2>
                        <ol className="list-decimal list-outside pl-5 text-gray-600 space-y-2 text-sm md:text-base marker:text-emerald-400 marker:font-bold">
                            <li>当会の債務不履行責任は、当会の故意または重過失によらない場合には免責されるものとします。</li>
                            <li>当会は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。</li>
                            <li>稽古中や施設利用中の怪我や事故については、スポーツ安全保険の適用範囲内での対応とし、当会に故意または重大な過失がある場合を除き、当会はその責任を負わないものとします。</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-6 h-6 bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">5</span>
                            利用規約の変更
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            当会は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-6 h-6 bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">6</span>
                            準拠法・裁判管轄
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当会の所在地を管轄する裁判所を専属的合意管轄とします。
                        </p>
                    </div>

                    <div className="text-right text-xs text-gray-400 mt-12 bg-white pt-4 border-t border-gray-100">
                        <p>制定日：2024年4月1日</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
