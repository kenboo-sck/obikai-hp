import TournamentDetailContent from './TournamentDetailContent';

export async function generateStaticParams() {
    const ids = ['tourney-009', 'tourney-008', 'tourney-007', 'tourney-006', 'tourney-005'];
    return ids.map((id) => ({
        id: id,
    }));
}

export default async function TournamentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <TournamentDetailContent id={id} />;
}
