import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: '実戦空手道 帯会へのお問い合わせフォーム。無料体験の予約・入会相談・見学のお申し込みはこちら。',
};

export default function ContactPage() {
  return <ContactContent />;
}
