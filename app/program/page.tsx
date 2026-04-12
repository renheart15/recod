'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import Program from '@/components/Program';
import { Footer } from '@/components/Footer';

export default function ProgramPage() {
    const programRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.location.hash === '#program' || document.referrer.includes('/program')) {
        programRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <div ref={programRef} id="program">
        <Program/>
      </div>
      <Footer />
    </main>
  );
}