'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { SpeakersGrid } from '@/components/SpeakersGrid';
import { Footer } from '@/components/Footer';

export default function SpeakersPage() {
  const speakersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === '#speakers' || document.referrer.includes('/speakers')) {
      speakersRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <div ref={speakersRef} id="speakers">
        <SpeakersGrid />
      </div>
      <Footer />
    </main>
  );
}