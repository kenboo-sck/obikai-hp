import ResultsContent from './ResultsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '大会結果',
    description: '実戦空手道 帯会の大会出場結果・入賞実績の一覧です。',
};

export default function ResultsPage() {
    return <ResultsContent />;
}
