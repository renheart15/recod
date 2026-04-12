'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-12"
      style={{
        background: 'linear-gradient(135deg, #f5a623 0%, #f7b733 30%, #f5a020 60%, #e8820c 100%)',
      }}
    >
      {/* Dotted texture overlay — matches HeroBanner */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 flex flex-col items-center text-center max-w-xl w-full"
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          border: '3px solid #DAA520',
          borderRadius: '2rem',
          padding: '3rem 2.5rem',
          boxShadow: '0 12px 48px rgba(139, 69, 19, 0.25)',
        }}
      >
        {/* 404 badge */}
        <div
          className="flex flex-col items-center justify-center mb-6"
          style={{
            background: '#5c2d00',
            border: '3px solid #DAA520',
            borderRadius: '1.5rem',
            padding: '1rem 2rem',
          }}
        >
          <span style={{ color: '#fde68a', fontWeight: 700, fontSize: '13px', letterSpacing: '0.12em' }}>
            CTU – TUBURAN
          </span>
          <span style={{ color: '#fbbf24', fontWeight: 900, fontSize: '24px', lineHeight: 1.1 }}>
            RECOD 2026
          </span>
          <span
            style={{
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '72px',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              fontFamily: 'Georgia, serif',
            }}
          >
            404
          </span>
        </div>

        {/* Icon — open book with question */}
        <div className="mb-4" style={{ fontSize: '56px', lineHeight: 1 }}>
          📖
        </div>

        {/* Divider */}
        <div
          className="w-3/4 mb-5"
          style={{ borderTop: '2px solid #8B4513' }}
        />

        {/* Heading */}
        <h1
          className="font-extrabold uppercase mb-6"
          style={{
            color: '#1a5c00',
            fontSize: 'clamp(1.4rem, 5vw, 2rem)',
            textShadow: '1px 1px 0 rgba(255,255,255,0.4)',
            letterSpacing: '0.04em',
          }}
        >
          Not Yet Available
        </h1>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 transition-all duration-200"
            style={{
              background: '#5c2d00',
              color: '#fde68a',
              border: '2px solid #DAA520',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#7a3d00';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#5c2d00';
            }}
          >
            ← Back to Home
          </Link>

          <Link
            href="/program"
            className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 transition-all duration-200"
            style={{
              background: 'transparent',
              color: '#5c2d00',
              border: '2px solid #8B4513',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(139,69,19,0.08)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            }}
          >
            View Program
          </Link>
        </div>
      </div>

      {/* Footer note */}
      <p
        className="relative z-10 mt-8 text-xs italic"
        style={{ color: '#4a1a00', opacity: 0.7 }}
      >
        RECOD 2026 · April 15–16, 2026 · Bulawanong Tinubdan Cultural Center
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
      `}</style>
    </div>
  );
}