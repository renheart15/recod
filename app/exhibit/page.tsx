'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { ResearchExhibits } from '@/components/ResearchExhibits';
import { Footer } from '@/components/Footer';

export default function ExhibitPage() {
  const exhibitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === '#research-exhibits' || document.referrer.includes('/exhibit')) {
      exhibitRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <div ref={exhibitRef} id="research-exhibits">
        <ResearchExhibits />
      </div>
      <Footer />
    </main>
  );
}
