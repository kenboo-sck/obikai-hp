import { Metadata } from 'next';
import MembershipContent from './MembershipContent';

export const metadata: Metadata = {
  title: '入会案内・料金プラン',
  description: '新潟県新発田市の格闘技ジム料金案内。月額2,500円〜、空手着プレゼント（12,000円相当）・親子割り引きキャンペーン実施中。',
};

export default function MembershipPage() {
  return <MembershipContent />;
}
