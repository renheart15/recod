import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { SpeakersGrid } from '@/components/SpeakersGrid';
import { PanelMembers } from '@/components/PanelMembers';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <SpeakersGrid />
      <PanelMembers />
      <Footer />
    </main>
  );
}
