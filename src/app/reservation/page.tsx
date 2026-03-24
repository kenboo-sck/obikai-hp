import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '体験予約',
  description: '大阪本町 実戦空手道 帯会の無料体験レッスン予約。手ぶらでOK、初心者大歓迎。空手・キックボクシングを気軽に体験してみませんか？',
};

export default function ReservationPage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto font-sans">
      <h1 className="text-4xl font-bold text-gray-900 border-l-8 border-blue-600 pl-4">体験予約</h1>
      <p className="mt-8 text-gray-600">
        現在、体験予約は外部サイト（準備中）またはお問い合わせフォームより受け付けております。
      </p>
    </div>
  );
}
