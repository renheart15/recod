'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import Guideline from '@/components/Guideline';
import { Footer } from '@/components/Footer';

export default function GuidelinePage() {
    const guidelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.location.hash === '#guideline' || document.referrer.includes('/guideline')) {
        guidelineRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <div ref={guidelineRef} id="guideline">
        <Guideline/>
      </div>
      <Footer />
    </main>
  );
}