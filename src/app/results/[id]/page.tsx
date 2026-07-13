import TournamentDetailContent from './TournamentDetailContent';

export async function generateStaticParams() {
    const ids = ['climb-up-fight-2', 'niigata-boxing-karate-24', 'ibaraki-karate-6', 'niigata-karate-27'];
    return ids.map((id) => ({
        id: id,
    }));
}

export default async function TournamentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <TournamentDetailContent id={id} />;
}
