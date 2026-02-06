import { Metadata } from 'next';
import BeginnersContent from './BeginnersContent';

export const metadata: Metadata = {
  title: '初めての方へ',
  description: '空手未経験・運動不足でも安心。帯会では会員の多くが初心者からスタートしています。礼儀作法から実戦技術まで、丁寧に指導します。無料体験随時受付中。',
};

export default function BeginnersPage() {
  return <BeginnersContent />;
}