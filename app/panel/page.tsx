'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { PanelMembers } from '@/components/PanelMembers';
import { Footer } from '@/components/Footer';

export default function PanelsPage() {
    const panelsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.location.hash === '#panels' || document.referrer.includes('/panels')) {
        panelsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <div ref={panelsRef} id="panels">
        <PanelMembers/>
      </div>
      <Footer />
    </main>
  );
}