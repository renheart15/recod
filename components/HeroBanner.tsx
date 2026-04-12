'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function HeroBanner() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Event date: April 15, 2026
  const countdown = useCountdown('2026-04-15T08:00:00');

  return (
    <section
      className="relative w-full overflow-hidden border-b-4"
      style={{
        background: 'linear-gradient(135deg, #f5a623 0%, #f7b733 30%, #f5a020 60%, #e8820c 100%)',
        borderBottomColor: '#8B4513',
      }}
    >
      {/* Dotted texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center px-6 md:px-10 py-6 md:py-8 gap-8">

        {/* Left: Mascot logo + pill badge */}
        <div className="flex-shrink-0 flex flex-row items-center gap-4">
          {/* Mascot / book illustration */}
          <img
            src="/images/logo/recod-logo.png"
            alt="RECOD 2026 Mascot"
            className="w-44 md:w-60 h-auto drop-shadow-lg"
          />
          {/* Pill badge — always visible beside the mascot */}
          <div
            className="flex flex-col items-center justify-center text-center px-6 py-5"
            style={{
              background: '#5c2d00',
              border: '3px solid #DAA520',
              borderRadius: '2rem',
              minWidth: '130px',
            }}
          >
            <span style={{ color: '#fde68a', fontWeight: 700, fontSize: '13px', lineHeight: 1.4 }}>
              CTU – TUBURAN
            </span>
            <span style={{ color: '#fbbf24', fontWeight: 900, fontSize: '34px', lineHeight: 1.1, display: 'block' }}>
              RECOD
            </span>
            <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '42px', lineHeight: 1, display: 'block' }}>
              2026
            </span>
          </div>
        </div>

        {/* Right: Main content */}
        <div className="flex-1 text-center">

          {/* Institutional logos row */}
          <div className="flex justify-center items-center gap-4 mb-2">
            {['/images/logo/CTU.png', '/images/logo/FSTLP.png', '/images/logo/PATE.png'].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="Institution logo"
                width={120}
                height={120}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            ))}
          </div>

          {/* Institution name */}
          <p
            className="font-bold tracking-widest text-sm md:text-base"
            style={{ color: '#4a1a00', letterSpacing: '0.12em' }}
          >
            CEBU TECHNOLOGICAL UNIVERSITY - TUBURAN CAMPUS
          </p>
          <p className="text-sm md:text-base" style={{ color: '#5c2a00' }}>
            Future Science and Technology Leaders of the Philippines
          </p>
          <p className="text-sm italic" style={{ color: '#5c2a00' }}>
            in collaboration with
          </p>
          <p className="text-sm md:text-base mb-3" style={{ color: '#5c2a00' }}>
            Philippine Association for Teachers and Educators (PAFTE) Region VII
          </p>

          {/* Horizontal divider */}
          <div className="w-3/4 mx-auto mb-3" style={{ borderTop: '2px solid #8B4513' }} />

          {/* Main title */}
          <h1
            className="font-extrabold text-2xl md:text-4xl lg:text-5xl leading-tight mb-2 uppercase"
            style={{ color: '#1a5c00', textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}
          >
            1st International and 4th Institutional Research Congress and Online Discussion
          </h1>

          {/* Tagline */}
          <p className="text-base md:text-lg italic" style={{ color: '#3d1a00' }}>
            "Technological Innovation and Academic Sustainability Towards a Resilient Green Environment"
          </p>

          {/* Date */}
          <p className="text-base md:text-lg italic font-semibold" style={{ color: '#6b3300' }}>
            April 15 – 16, 2026
          </p>

          {/* Location */}
          <p className="text-sm md:text-base mb-3" style={{ color: '#3d1a00' }}>
            Cebu Technological University – Tuburan Campus, Tuburan, Cebu, Philippines, 6043
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-3 md:gap-5">
              {[
                { value: countdown.days, label: 'Days' },
                { value: countdown.hours, label: 'Hours' },
                { value: countdown.minutes, label: 'Mins' },
                { value: countdown.seconds, label: 'Secs' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div
                    className="rounded-lg px-4 py-3 md:px-6 md:py-3"
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      border: '2px solid #8B4513',
                      minWidth: '72px',
                    }}
                  >
                    <p
                      className="text-3xl md:text-5xl font-extrabold leading-none"
                      style={{ color: '#1a5c00' }}
                    >
                      {String(value).padStart(2, '0')}
                    </p>
                    <p className="text-xs md:text-sm font-semibold mt-1" style={{ color: '#8B4513' }}>
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}