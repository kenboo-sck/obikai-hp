import { Metadata } from 'next';
import ClassContent from './ClassContent';

export const metadata: Metadata = {
  title: 'クラス紹介',
  description: '新潟県新発田市の空手道場「実戦空手道 帯会」のクラス紹介。キッズクラス、一般向けクラス、スパーリング重視の実践クラスなど、目的や年齢に合わせたクラスを用意しています。',
};

export default function ClassPage() {
  return <ClassContent />;
}
