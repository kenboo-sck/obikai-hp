import { Metadata } from 'next';
import NewsListContent from './NewsListContent';

export const metadata: Metadata = {
  title: 'ニュース',
  description: '実戦空手道 帯会の最新ニュース。大会結果、イベント情報、休館日のお知らせなどを発信しています。',
};

export default function NewsPage() {
  return <NewsListContent />;
}
