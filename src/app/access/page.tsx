import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'アクセス',
  description: '実戦空手道 帯会へのアクセス・地図・営業時間。新潟県新発田市内の学校体育館やコミュニティセンターで活動しています。',
};

export default function AccessPage() {
  return (
    <div className="pt-32 pb-20 font-sans text-gray-800">
      {/* ヒーローセクション */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="border-l-8 border-orange-500 pl-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
            ACCESS
          </h1>
          <p className="text-orange-500 font-bold mt-2 tracking-widest uppercase text-sm">アクセス</p>
        </div>
      </section>

      {/* マップ & 基本情報 */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Google Map */}
          <div className="w-full lg:w-2/3 aspect-video lg:aspect-auto lg:h-[500px] bg-gray-100 shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=新潟県新発田市東新町2-5-4-9&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Obikai Location"
            ></iframe>
          </div>

          {/* 情報エリア */}
          <div className="w-full lg:w-1/3 space-y-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-orange-500 pb-2 inline-block">Address</h2>
              <p className="text-gray-700 leading-relaxed">
                〒957-0053<br />
                新潟県新発田市東新町2-5-4-9
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-orange-500 pb-2 inline-block">Contact</h2>
              <div className="space-y-2">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Phone</p>
                <a href="tel:0254429040" className="text-2xl font-bold text-orange-600 hover:text-orange-800 transition-colors">
                  0254-42-9040
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-orange-500 pb-2 inline-block">Business Hours</h2>
              <div className="space-y-3 font-sans text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-bold text-gray-600">月・火・金 (Mon, Tue, Fri)</span>
                  <span className="font-bold text-gray-900">19:00 - 21:00</span>
                </div>
                <p className="text-xs text-orange-500 mt-2">※詳細はスケジュールページをご確認ください</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Ready to <span className="text-orange-600">Start?</span>
          </h2>
          <p className="text-gray-600 font-medium">見学・体験は随時受け付けております。お気軽にお越しください。</p>
        </div>
        <a
          href="#"
          className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all hover:-translate-y-1"
        >
          体験・見学を予約する →
        </a>
      </section>
    </div>
  );
}