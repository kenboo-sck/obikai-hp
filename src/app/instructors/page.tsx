import { Metadata } from 'next';
import InstructorsContent from './InstructorsContent';

export const metadata: Metadata = {
  title: 'インストラクター',
  description: '実戦空手道 帯会のインストラクター紹介。代表師範 田坂 貴満をはじめ、経験豊富な指導陣が子供から大人まで徹底サポートします。',
};

export default function InstructorsPage() {
  return <InstructorsContent />;
}
