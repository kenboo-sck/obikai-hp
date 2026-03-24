import Link from 'next/link';
import { Metadata } from 'next';
import { FaLocationDot } from "react-icons/fa6";

export const metadata: Metadata = {
  title: 'アクセス',
  description: '実戦空手道 帯会へのアクセス・各練習場所（教室）の地図。新発田市内の学校体育館やコミュニティセンターで活動しています。',
};

const locations = [
  {
    name: "川東小学校体育館",
    subName: "川東小学校体育館",
    zip: "957-0341",
    address: "新潟県新発田市下羽津1938番地",
    mapUrl: "https://maps.google.com/maps?q=新潟県新発田市下羽津1938番地&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "東豊コミニティー防災センター",
    subName: "東豊コミニティー防災センター",
    zip: "957-0016",
    address: "新潟県新発田市豊町4丁目8-4",
    mapUrl: "https://maps.google.com/maps?q=新潟県新発田市豊町4丁目8-4&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "七葉コミュニティセンター",
    subName: "七葉コミュニティセンター",
    zip: "957-0062",
    address: "新潟県新発田市三日市862番地",
    mapUrl: "https://maps.google.com/maps?q=新潟県新発田市三日市862番地&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "五十公野コミュニティセンター",
    subName: "五十公野コミュニティセンター",
    zip: "957-0021",
    address: "新潟県新発田市五十公野4930番地1",
    mapUrl: "https://maps.google.com/maps?q=新潟県新発田市五十公野4930番地1&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "川東中学校体育館",
    subName: "川東中学校体育館",
    zip: "957-0341",
    address: "新潟県新発田市下羽津1566-1",
    mapUrl: "https://maps.google.com/maps?q=新潟県新発田市下羽津1566-1&t=&z=15&ie=UTF8&iwloc=&output=embed"
  }
];

export default function AccessPage() {
  return (
    <div className="pt-32 pb-20 font-sans text-gray-800">
      {/* ヒーローセクション */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="border-l-8 border-emerald-500 pl-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
            LOCATIONS <span className="text-emerald-500">/ ACCESS</span>
          </h1>
          <p className="text-emerald-500 font-bold mt-2 tracking-widest uppercase text-sm">稽古場所へのアクセス</p>
        </div>
        <p className="max-w-none text-gray-600 leading-relaxed">
          実戦空手道 帯会では、新発田市内の複数の施設を利用して稽古を行っています。
          曜日によって場所が異なりますので、スケジュールをご確認の上、各会場へお越しください。
        </p>
      </section>

      {/* 練習場所一覧 */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
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
                  <p className="text-emerald-600 font-bold text-sm flex items-center gap-1.5">
                    <FaLocationDot /> {loc.subName}
                  </p>
                </div>
                <div className="mb-8 flex-1">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1 leading-none">Address</p>
                  <p className="text-gray-700 leading-relaxed">
                    〒{loc.zip}<br />
                    {loc.address}
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-600 font-bold py-4 rounded-xl transition-all duration-300 border border-emerald-100"
                >
                  Google Mapで開く
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 補足情報 */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-stone-50 border border-stone-200 p-8 md:p-12 rounded-3xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">お問い合わせについて</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                各施設への直接のお電話はご遠慮ください。<br className="hidden md:block" />
                入会、見学、体験に関するお問い合わせは、本部またはお問い合わせフォームより承っております。
              </p>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-4">
                  <span className="text-stone-400 font-bold text-xs uppercase tracking-widest">Phone</span>
                  <a href="tel:09010393392" className="text-2xl font-black text-emerald-600 hover:text-emerald-800 transition-colors">
                    090-1039-3392
                  </a>
                </div>
                <Link
                  href="/contact"
                  className="bg-stone-800 text-white px-8 py-5 rounded-2xl font-bold shadow-lg hover:bg-stone-900 transition-all hover:scale-105"
                >
                  お問い合わせはこちら
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 text-center py-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Ready to <span className="text-emerald-600">Start?</span>
          </h2>
          <p className="text-gray-600 font-medium mb-10 text-lg">
            見学・体験は随時受け付けております。<br />
            まずはご希望の会場へお気軽にお越しください。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-emerald-500 text-white px-12 py-5 rounded-full font-black shadow-xl shadow-emerald-200 hover:bg-emerald-600 transition-all hover:-translate-y-1 hover:scale-105"
          >
            体験・見学を予約する
          </Link>
        </div>
      </section>
    </div>
  );
}
