
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'プライバシーポリシー',
    description: '実戦空手道 帯会のプライバシーポリシー（個人情報保護方針）について掲載しています。',
};

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-20 font-sans text-gray-800">
            <section className="max-w-4xl mx-auto px-6 mb-16">
                <div className="border-l-8 border-emerald-500 pl-6 mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-none">
                        PRIVACY POLICY
                    </h1>
                    <p className="text-emerald-500 font-bold mt-2 tracking-widest uppercase text-sm">プライバシーポリシー</p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-10 leading-relaxed">
                    <div>
                        <p className="mb-6">
                            実戦空手道 帯会（以下、「当会」といいます。）は、お客様の個人情報の重要性を認識し、その保護を徹底するために、以下の通り個人情報保護方針を定めます。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            個人情報の収集について
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            当会は、お問い合わせ、体験予約、入会申し込み等の際に、氏名、住所、電話番号、メールアドレスなどの個人情報をご提供いただく場合がございます。これらの情報は、それぞれの業務を遂行するために必要な範囲で収集し、適正に管理いたします。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            個人情報の利用目的
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mb-2">
                            お預かりした個人情報は、以下の目的のために利用いたします。
                        </p>
                        <ul className="list-disc list-outside pl-5 text-gray-600 space-y-1 text-sm md:text-base">
                            <li>お問い合わせやご相談への回答</li>
                            <li>体験レッスンやイベントのご案内</li>
                            <li>会員管理および連絡業務</li>
                            <li>サービスの改善や向上を目的とした分析</li>
                            <li>その他、当会の活動に必要な業務</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            個人情報の第三者への提供
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            当会は、法令に基づく場合や、人の生命・身体または財産の保護のために必要がある場合を除き、ご本人の同意を得ることなく個人情報を第三者に提供いたしません。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            個人情報の管理
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            当会は、個人情報の漏洩、紛失、改ざん等を防止するために、適切な安全管理措置を講じます。また、個人情報を取り扱う関係者に対し、適切な監督を行います。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            ご本人の照会・修正・削除
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            お客様がご自身の個人情報の照会・修正・削除をご希望される場合には、ご本人であることを確認の上、速やかに対応させていただきます。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            お問い合せ
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            当会の個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
                        </p>
                        <div className="mt-4 bg-gray-50 p-6 rounded-lg">
                            <p className="font-bold text-gray-900">実戦空手道 帯会</p>
                            <p className="text-gray-600 mt-2 text-sm">
                                〒957-0053<br />
                                新潟県新発田市東新町2丁目5-4-9<br />
                                TEL: 0254-42-9040
                            </p>
                        </div>
                    </div>

                    <div className="text-right text-xs text-gray-400 mt-12 bg-white pt-4 border-t border-gray-100">
                        <p>制定日：2024年4月1日</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
