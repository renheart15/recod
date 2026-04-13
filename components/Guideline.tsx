'use client';

import { useState, useEffect, useCallback } from 'react';

type GuidelineKey = 'research' | 'product';

interface Guideline {
  key: GuidelineKey;
  label: string;
  title: string;
  pdfPath: string;
  downloadName: string;
}

const GUIDELINES: Guideline[] = [
  {
    key: 'research',
    label: 'Online Research Presentation',
    title: 'RECOD 2026 — Online Research Presentations',
    pdfPath: '/guideline/Guidelines - RECOD 2026 Online Research Presentation.pdf',
    downloadName: 'RECOD_2026_Online_Research_Presentation_Guidelines.pdf',
  },
  {
    key: 'product',
    label: 'Product Exhibit',
    title: 'RECOD 2026 — Product Exhibit',
    pdfPath: '/guideline/Guidelines - RECOD 2026 Product Exhibit.pdf',
    downloadName: 'RECOD_2026_Product_Exhibit_Guidelines.pdf',
  },
];

export default function GuidelinesPage() {
  const [activeTab, setActiveTab] = useState<GuidelineKey>('research');
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayKey, setOverlayKey] = useState<GuidelineKey>('research');

  const active = GUIDELINES.find((g) => g.key === activeTab)!;
  const overlayGuideline = GUIDELINES.find((g) => g.key === overlayKey)!;

  const openOverlay = useCallback((key: GuidelineKey) => {
    setOverlayKey(key);
    setOverlayOpen(true);
  }, []);

  const closeOverlay = useCallback(() => setOverlayOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeOverlay]);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [overlayOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Lato:wght@300;400;700&display=swap');

        .guidelines-root {
          font-family: 'Lato', sans-serif;
          background: #fffbf0;
          color: #3d1a00;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── HERO ── */
        .g-hero {
          padding: 2rem 2.5rem;
          overflow: hidden;
        }
        .g-hero::before {
          content: '';
          position: absolute; inset: 0;
          opacity: 0.08;
          pointer-events: none;
        }
        .g-hero-inner {
          position: relative; z-index: 1;
          max-width: 960px; margin: 0 auto;
          display: flex; align-items: center; gap: 1.5rem;
        }
          
        .g-hero-text h1 {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.1rem, 3vw, 1.9rem);
          color: #1a5c00;
          text-shadow: 1px 1px 0 rgba(255,255,255,.3);
          line-height: 1.2;
        }
        .g-hero-text p {
          color: #5c2d00;
          font-size: .9rem;
          margin-top: .35rem;
        }

        .g-hero-text{
          justify-content: center;
          display: flex;
          align-content: flex-start;
          flex-wrap: wrap;
        }

        /* ── TABS ── */
        .g-tabs-wrap {
          max-width: 960px;
          margin: 2rem auto 0;
          padding: 0 1.5rem;
        }
        .g-tab-btns { display: flex; gap: .75rem; flex-wrap: wrap; }
        .g-tab-btn {
          font-family: 'Cinzel', serif;
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: .65rem 1.4rem;
          border-radius: .5rem .5rem 0 0;
          border: 2px solid #8B4513;
          border-bottom: none;
          background: #fef9e7;
          color: #8B4513;
          cursor: pointer;
          transition: background .2s, color .2s;
        }
        .g-tab-btn.active {
          background: #5c2d00;
          color: #fde68a;
          border-color: #5c2d00;
        }
        .g-tab-btn:not(.active):hover { background: #fef3c7; }

        /* ── PANEL ── */
        .g-panel-wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 1.5rem 3rem;
          flex: 1;
        }
        .g-panel {
          background: #fff;
          border: 2px solid #8B4513;
          border-radius: 0 .5rem .5rem .5rem;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(92,45,0,.10);
          display: flex;
          flex-direction: column;
          width: 800px;
          height: 990px;
        }
        .g-panel-header {
          background: linear-gradient(90deg, #5c2d00, #8B4513);
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .g-panel-header h2 {
          font-family: 'Cinzel', serif;
          color: #fde68a;
          font-size: 1rem;
          letter-spacing: .05em;
        }
          
        .g-panel-actions { display: flex; gap: .6rem; flex-shrink: 0; }

        /* ── BUTTONS ── */
        .g-btn {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: .78rem;
          padding: .45rem 1rem;
          border-radius: .4rem;
          border: 2px solid transparent;
          cursor: pointer;
          text-decoration: none;
          transition: all .2s;
          letter-spacing: .04em;
          line-height: 1;
        }
        .g-btn-fullscreen {
          background: rgba(255,255,255,.12);
          color: #fde68a;
          border-color: rgba(218,165,32,.5);
        }
        .g-btn-fullscreen:hover { background: rgba(255,255,255,.25); }
        .g-btn-download {
          background: #DAA520;
          color: #3d1a00;
          border-color: #DAA520;
        }
        .g-btn-download:hover { background: #c8920e; border-color: #c8920e; color: #fff; }
        .g-btn-close {
          background: rgba(255,255,255,.1);
          color: #fff;
          border-color: rgba(255,255,255,.25);
        }
        .g-btn-close:hover { background: rgba(200,0,0,.35); border-color: #f00; }

        /* ── PDF EMBED ── */
        .g-pdf-container {
          width: 100%;
          height: 990px;
          background: #f5f0e8;
        }
        .g-pdf-container iframe {
          width: 100%; height: 100%; border: none; display: block;
        }

        /* ── OVERLAY ── */
        .g-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(30,10,0,.92);
          display: flex;
          flex-direction: column;
          animation: g-fadeIn .2s ease;
        }
        @keyframes g-fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .g-overlay-header {
          background: #5c2d00;
          padding: .75rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #DAA520;
          flex-shrink: 0;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .g-overlay-header h3 {
          font-family: 'Cinzel', serif;
          color: #fde68a;
          font-size: .95rem;
        }
        .g-overlay-actions { display: flex; gap: .6rem; }
        .g-overlay-body { flex: 1; overflow: hidden; }
        .g-overlay-body iframe { width: 100%; height: 100%; border: none; display: block; }

        /* ── FOOTER ── */
        .g-footer {
          background: #5c2d00;
          border-top: 3px solid #DAA520;
          padding: 1.25rem;
          text-align: center;
          color: #fde68a;
          font-size: .8rem;
          letter-spacing: .05em;
        }

        @media (max-width: 600px) {
          .g-hero-inner { flex-direction: column; text-align: center; }
          .g-pdf-container { height: 480px; }
        }
      `}</style>

      <div className="guidelines-root">

        {/* ── HERO ── */}
        <header className="g-hero">
          <div className="g-hero-inner">
            <div className="g-hero-text">
              <h1>Official Guidelines &amp; Mechanics</h1>
              <p>
                1st International &amp; 4th Institutional Research Congress and Online Discussion
                <br />
                <em>April 15–16, 2026 · Cebu Technological University – Tuburan Campus</em>
              </p>
            </div>
          </div>
        </header>

        {/* ── TABS ── */}
        <div className="g-tabs-wrap">
          <div className="g-tab-btns">
            {GUIDELINES.map((g) => (
              <button
                key={g.key}
                className={`g-tab-btn${activeTab === g.key ? ' active' : ''}`}
                onClick={() => setActiveTab(g.key)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── PANEL ── */}
        <div className="g-panel-wrap">
          <div className="g-panel">
            <div className="g-panel-header">
              <h2>{active.title}</h2>
              <div className="g-panel-actions">
                <button
                  className="g-btn g-btn-fullscreen"
                  onClick={() => openOverlay(active.key)}
                >
                  ⛶ Full Screen
                </button>
              </div>
            </div>
            <div className="g-pdf-container">
              <iframe
                key={active.key}
                src={`${active.pdfPath}#toolbar=1&navpanes=0`}
                title={active.title}
              />
            </div>
          </div>
        </div>

        {/* ── FULLSCREEN OVERLAY ── */}
        {overlayOpen && (
          <div className="g-overlay" role="dialog" aria-modal="true" aria-label={overlayGuideline.title}>
            <div className="g-overlay-header">
              <h3>{overlayGuideline.title}</h3>
              <div className="g-overlay-actions">
                <button className="g-btn g-btn-close" onClick={closeOverlay}>
                  ✕ Close
                </button>
              </div>
            </div>
            <div className="g-overlay-body">
              <iframe
                src={`${overlayGuideline.pdfPath}#toolbar=1&navpanes=0`}
                title={`${overlayGuideline.title} – Full Screen`}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}