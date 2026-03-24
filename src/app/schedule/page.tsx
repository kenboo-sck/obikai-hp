import { Metadata } from 'next';
import ScheduleContent from './ScheduleContent';

export const metadata: Metadata = {
  title: 'スケジュール',
  description: '実戦空手道 帯会の週間スケジュール。新発田市内の各教室（川東、七葉、五十公野）で曜日ごとに活動しています。',
};

export default function SchedulePage() {
  return <ScheduleContent />;
}
