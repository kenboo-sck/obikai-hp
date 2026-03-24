import SparingContent from './SparingContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'スパーリング大会概要',
  description: '実戦空手道 帯会が主催するスパーリング大会の概要とお申し込みについて。',
};

export default function SparingPage() {
  return <SparingContent />;
}
