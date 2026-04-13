import { useState, useEffect, useRef, CSSProperties } from "react";
import type React from "react";

const PDF_URL = "/program/program.pdf";
const TOTAL_PAGES = 64;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TocSection {
  label: string;
  spread: number;
  page: number;
}

interface PageFrameProps {
  pageNum: number;
  isCover?: boolean;
  side?: "left" | "right" | null;
  frameWidth: number;
  frameHeight: number;
}

type StyleMap = Record<string, CSSProperties>;

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BookViewer() {
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");
  const [showTOC, setShowTOC] = useState<boolean>(false);
  const [showFullView, setShowFullView] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // On mobile we show one page at a time (currentPage tracks a raw page number).
  // On desktop we keep the spread-based model.
  const [mobilePage, setMobilePage] = useState<number>(1);

  // spread 0 => cover (page 1)
  // spread 1 => pages 2-3, etc.
  const totalSpreads: number = Math.ceil((TOTAL_PAGES - 1) / 2) + 1;

  function getSpreadPages(spread: number): [number, number | null] {
    if (spread === 0) return [1, null];
    const base = 1 + (spread - 1) * 2 + 1;
    const left = base;
    const right = base + 1 <= TOTAL_PAGES ? base + 1 : null;
    return [left, right];
  }

  // Desktop navigation
  function goNext(): void {
    if (isFlipping) return;
    if (isMobile) {
      if (mobilePage >= TOTAL_PAGES) return;
      setFlipDir("next"); setIsFlipping(true);
      setTimeout(() => { setMobilePage((p) => p + 1); setIsFlipping(false); }, 320);
    } else {
      if (currentSpread >= totalSpreads - 1) return;
      setFlipDir("next"); setIsFlipping(true);
      setTimeout(() => { setCurrentSpread((s) => s + 1); setIsFlipping(false); }, 420);
    }
  }

  function goPrev(): void {
    if (isFlipping) return;
    if (isMobile) {
      if (mobilePage <= 1) return;
      setFlipDir("prev"); setIsFlipping(true);
      setTimeout(() => { setMobilePage((p) => p - 1); setIsFlipping(false); }, 320);
    } else {
      if (currentSpread <= 0) return;
      setFlipDir("prev"); setIsFlipping(true);
      setTimeout(() => { setCurrentSpread((s) => s - 1); setIsFlipping(false); }, 420);
    }
  }

  function goToSpread(spread: number): void {
    setShowTOC(false);
    setIsFlipping(true);
    setFlipDir(spread > currentSpread ? "next" : "prev");
    const [firstPage] = getSpreadPages(spread);
    setTimeout(() => {
      setCurrentSpread(spread);
      setMobilePage(firstPage);
      setIsFlipping(false);
    }, 320);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent): void {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSpread, mobilePage, isFlipping, isMobile]);

  // Sync desktop spread → mobile page when switching modes
  useEffect(() => {
    if (isMobile) {
      const [firstPage] = getSpreadPages(currentSpread);
      setMobilePage(firstPage);
    }
  }, [isMobile]);

  const [leftPage, rightPage] = getSpreadPages(currentSpread);
  const isCover = isMobile ? mobilePage === 1 : currentSpread === 0;
  const isLastDesktop = currentSpread === totalSpreads - 1;
  const isAtStart = isMobile ? mobilePage <= 1 : currentSpread <= 0;
  const isAtEnd = isMobile ? mobilePage >= TOTAL_PAGES : isLastDesktop;

  // Page frame dimensions — scale to viewport on mobile
  const DESKTOP_PAGE_W = 368;
  const DESKTOP_PAGE_H = 512;
  const mobilePageW = typeof window !== "undefined"
    ? Math.min(window.innerWidth - 32, 400) : 360;
  const mobilePageH = Math.round(mobilePageW * (DESKTOP_PAGE_H / DESKTOP_PAGE_W));

  const tocSections: TocSection[] = [
    { label: "Cover", spread: 0, page: 1 },
    { label: "Messages from VP, Campus Director", spread: 1, page: 2 },
    { label: "Dean of Instruction Message", spread: 3, page: 5 },
    { label: "R&D Chair Message", spread: 3, page: 6 },
    { label: "Day 1 Programme – Lecture Forum", spread: 4, page: 8 },
    { label: "Day 1 Paper Presentation Schedule", spread: 5, page: 9 },
    { label: "Day 2 Programme – Exhibit", spread: 6, page: 12 },
    { label: "Proclamation & Awarding", spread: 7, page: 14 },
    { label: "Abstracts – Food Security & Agriculture", spread: 8, page: 16 },
    { label: "Abstracts – Engineering & Technology", spread: 14, page: 27 },
    { label: "Abstracts – Education, Social Sciences", spread: 28, page: 56 },
    { label: "RECOD 2026 Committees", spread: 30, page: 59 },
    { label: "University Vision & Mission", spread: 32, page: 64 },
  ];

  const flipStyle: CSSProperties = isFlipping
    ? flipDir === "next" ? styles.flipNext : styles.flipPrev
    : {};

  const pageLabel = isMobile
    ? `p. ${mobilePage} / ${TOTAL_PAGES}`
    : isCover
      ? `Cover / ${TOTAL_PAGES}`
      : `pp. ${leftPage}${rightPage ? `–${rightPage}` : ""} / ${TOTAL_PAGES}`;

  return (
    <div style={styles.root}>

      {/* ── HEADER ── */}
      <header style={isMobile ? styles.headerMobile : styles.header}>
        <div style={styles.headerLeft}>
          <span style={isMobile ? styles.logoSmall : styles.logo}>📖</span>
          <div>
            <div style={isMobile ? styles.titleSmall : styles.title}>RECOD 2026</div>
            {!isMobile && (
              <div style={styles.subtitle}>E-Programme & Book of Abstracts</div>
            )}
          </div>
        </div>
        <div style={isMobile ? styles.headerRightMobile : styles.headerRight}>
          <button style={styles.iconBtn} onClick={() => setShowTOC(!showTOC)} title="Table of Contents">
            {isMobile ? "☰" : "☰ Contents"}
          </button>
          {!isMobile && (
            <button
              style={{ ...styles.iconBtn, ...styles.iconBtnAccent }}
              onClick={() => setShowFullView(true)}
              title="Full View"
            >
              ⛶ Full View
            </button>
          )}
          <a
            href={PDF_URL}
            download="RECOD2026-Programme.pdf"
            style={{ ...styles.iconBtn, ...styles.iconBtnAccent, textDecoration: "none" }}
            title="Download PDF"
          >
            {isMobile ? "⬇" : "↓ Download"}
          </a>
          <span style={isMobile ? styles.pageInfoSmall : styles.pageInfo}>
            {pageLabel}
          </span>
        </div>
      </header>

      {/* ── TOC DRAWER ── */}
      {showTOC && (
        <div style={styles.tocOverlay} onClick={() => setShowTOC(false)}>
          <div
            style={isMobile ? styles.tocPanelMobile : styles.tocPanel}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div style={styles.tocHeader}>Table of Contents</div>
            {tocSections.map((s, i) => (
              <button
                key={i}
                style={{
                  ...styles.tocItem,
                  backgroundColor: currentSpread === s.spread ? "#8b4513" : "transparent",
                  color: currentSpread === s.spread ? "#fff" : "#3d1c02",
                }}
                onClick={() => goToSpread(s.spread)}
              >
                <span style={styles.tocLabel}>{s.label}</span>
                <span style={styles.tocPage}>p. {s.page}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── BOOK STAGE ── */}
      <main style={isMobile ? styles.stageMobile : styles.stage}>

        {/* ── MOBILE: single page ── */}
        {isMobile ? (
          <div style={{ ...styles.bookContainer, ...flipStyle }}>
            <div style={styles.bookShadow} />
            <PageFrame
              pageNum={mobilePage}
              isCover={mobilePage === 1}
              side={null}
              frameWidth={mobilePageW}
              frameHeight={mobilePageH}
            />
          </div>
        ) : (
          /* ── DESKTOP: spread ── */
          <div style={{ ...styles.bookContainer, ...flipStyle }}>
            <div style={styles.bookShadow} />
            <div style={styles.book}>
              {isCover ? (
                <div style={styles.coverWrapper}>
                  <PageFrame pageNum={1} isCover frameWidth={DESKTOP_PAGE_W} frameHeight={DESKTOP_PAGE_H} />
                  <div style={styles.coverSpineDecor} />
                </div>
              ) : (
                <div style={styles.spreadWrapper}>
                  <div style={styles.leftPageWrapper}>
                    <PageFrame pageNum={leftPage} side="left" frameWidth={DESKTOP_PAGE_W} frameHeight={DESKTOP_PAGE_H} />
                  </div>
                  <div style={styles.spine}><div style={styles.spineGlow} /></div>
                  <div style={styles.rightPageWrapper}>
                    {rightPage !== null ? (
                      <PageFrame pageNum={rightPage} side="right" frameWidth={DESKTOP_PAGE_W} frameHeight={DESKTOP_PAGE_H} />
                    ) : (
                      <div style={{ ...styles.blankPage, width: DESKTOP_PAGE_W, height: DESKTOP_PAGE_H }}>
                        <div style={styles.blankInner}>
                          <div style={styles.blankDecor}>✦</div>
                          <div style={styles.blankText}>End of Document</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── NAV ARROWS ── */}
        <button
          style={{
            ...styles.navBtn,
            ...(isMobile ? styles.navLeftMobile : styles.navLeft),
            opacity: isAtStart ? 0.3 : 1,
          }}
          onClick={goPrev}
          disabled={isAtStart}
          title="Previous page"
        >
          ‹
        </button>
        <button
          style={{
            ...styles.navBtn,
            ...(isMobile ? styles.navRightMobile : styles.navRight),
            opacity: isAtEnd ? 0.3 : 1,
          }}
          onClick={goNext}
          disabled={isAtEnd}
          title="Next page"
        >
          ›
        </button>
      </main>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressBar,
              width: isMobile
                ? `${((mobilePage - 1) / (TOTAL_PAGES - 1)) * 100}%`
                : `${(currentSpread / (totalSpreads - 1)) * 100}%`,
            }}
          />
        </div>
        {!isMobile && (
          <div style={styles.footerNav}>
            {Array.from({ length: totalSpreads }, (_, i) => (
              <button
                key={i}
                style={{
                  ...styles.dot,
                  backgroundColor: i === currentSpread ? "#8b4513" : "#c9a87a",
                  transform: i === currentSpread ? "scale(1.4)" : "scale(1)",
                }}
                onClick={() => goToSpread(i)}
              />
            ))}
          </div>
        )}
        <div style={styles.footerText}>
          {isMobile ? "Tap arrows to navigate" : "Use ← → arrow keys or click to navigate"}
        </div>
      </footer>

      {/* ── FULL VIEW MODAL (desktop only) ── */}
      {showFullView && !isMobile && (
        <div style={styles.fullViewOverlay} onClick={() => setShowFullView(false)}>
          <div style={styles.fullViewModal} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div style={styles.fullViewHeader}>
              <span style={styles.fullViewTitle}>📖 RECOD 2026 — Full Document</span>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <a
                  href={PDF_URL}
                  download="RECOD2026-Programme.pdf"
                  style={{ ...styles.iconBtn, ...styles.iconBtnAccent, textDecoration: "none" }}
                >
                  ↓ Download
                </a>
                <button
                  style={{ ...styles.iconBtn, background: "rgba(255,255,255,0.15)" }}
                  onClick={() => setShowFullView(false)}
                >
                  ✕ Close
                </button>
              </div>
            </div>
            <iframe
              src={`${PDF_URL}#toolbar=1&navpanes=1&scrollbar=1`}
              style={styles.fullViewIframe}
              title="Full PDF View"
            />
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        @keyframes flipNext {
          0%   { transform: perspective(1400px) rotateY(0deg); }
          50%  { transform: perspective(1400px) rotateY(-8deg); filter: brightness(0.85); }
          100% { transform: perspective(1400px) rotateY(0deg); }
        }
        @keyframes flipPrev {
          0%   { transform: perspective(1400px) rotateY(0deg); }
          50%  { transform: perspective(1400px) rotateY(8deg); filter: brightness(0.85); }
          100% { transform: perspective(1400px) rotateY(0deg); }
        }
        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        iframe { display: block; border: none; }
        button:focus { outline: 2px solid #8b4513; outline-offset: 2px; }
      `}</style>
    </div>
  );
}

// ─── PageFrame Component ──────────────────────────────────────────────────────

const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function loadPdfJs(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).pdfjsLib) { resolve((window as any).pdfjsLib); return; }
    const existing = document.querySelector(`script[src="${PDFJS_CDN}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve((window as any).pdfjsLib));
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = PDFJS_CDN;
    script.onload = () => resolve((window as any).pdfjsLib);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function PageFrame({ pageNum, isCover = false, side = null, frameWidth, frameHeight }: PageFrameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    async function renderPage() {
      setLoading(true);
      try {
        const pdfjsLib = await loadPdfJs();
        pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
        const pdf = await pdfjsLib.getDocument(PDF_URL).promise;
        if (cancelled) return;
        const page = await pdf.getPage(pageNum);
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.min(frameWidth / viewport.width, frameHeight / viewport.height);
        const scaledViewport = page.getViewport({ scale });
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
        if (!cancelled) setLoading(false);
      } catch (err) {
        console.error("PDF render error:", err);
        if (!cancelled) setLoading(false);
      }
    }
    renderPage();
    return () => { cancelled = true; };
  }, [pageNum, frameWidth, frameHeight]);

  return (
    <div
      style={{
        ...styles.pageFrame,
        width: frameWidth,
        height: frameHeight,
        ...(isCover ? styles.coverFrame : {}),
        ...(side === "left" ? styles.leftFrame : {}),
        ...(side === "right" ? styles.rightFrame : {}),
        animation: "fadeInPage 0.3s ease forwards",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {!isCover && (
        <div style={{ ...styles.pageNumRibbon, ...(side === "left" ? { left: 8 } : { right: 8 }) }}>
          {pageNum}
        </div>
      )}
      {loading && (
        <div style={styles.loadingShimmer}>
          <div style={styles.loadingText}>Loading p.{pageNum}…</div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{ display: loading ? "none" : "block", width: "100%", height: "100%", objectFit: "contain" }}
      />
      {side === "right" && <div style={styles.curlRight} />}
      {side === "left" && <div style={styles.curlLeft} />}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: StyleMap = {
  root: {
    minHeight: "100vh",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Crimson Text', Georgia, serif",
    position: "relative",
    overflow: "hidden",
  },

  // ── Header ──
  header: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 28px",
    background: "linear-gradient(135deg, #5c2a0a 0%, #8b4513 60%, #a0521a 100%)",
    boxShadow: "0 4px 20px rgba(91,42,10,0.45)",
    borderBottom: "2px solid #c8841a",
  },
  headerMobile: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    background: "linear-gradient(135deg, #5c2a0a 0%, #8b4513 60%, #a0521a 100%)",
    boxShadow: "0 4px 20px rgba(91,42,10,0.45)",
    borderBottom: "2px solid #c8841a",
    gap: 8,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  logo: { fontSize: 28, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" },
  logoSmall: { fontSize: 22, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 700,
    fontSize: 20,
    color: "#f5e6c8",
    letterSpacing: "0.08em",
    lineHeight: 1.1,
  },
  titleSmall: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 700,
    fontSize: 15,
    color: "#f5e6c8",
    letterSpacing: "0.06em",
    lineHeight: 1.1,
  },
  subtitle: {
    fontFamily: "'Crimson Text', serif",
    fontStyle: "italic",
    fontSize: 13,
    color: "#d4a96a",
    letterSpacing: "0.04em",
  },
  headerRight: { display: "flex", alignItems: "center", gap: 10 },
  headerRightMobile: { display: "flex", alignItems: "center", gap: 6 },
  iconBtn: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(212,169,106,0.4)",
    borderRadius: 6,
    color: "#f5e6c8",
    fontFamily: "'Crimson Text', serif",
    fontSize: 14,
    padding: "5px 12px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  iconBtnAccent: {
    background: "linear-gradient(135deg, rgba(200,132,26,0.35), rgba(200,132,26,0.2))",
    border: "1px solid rgba(212,169,106,0.7)",
    fontWeight: 600,
  },
  pageInfo: {
    fontFamily: "'IM Fell English', serif",
    fontStyle: "italic",
    color: "#d4a96a",
    fontSize: 14,
    marginLeft: 4,
    whiteSpace: "nowrap",
  },
  pageInfoSmall: {
    fontFamily: "'IM Fell English', serif",
    fontStyle: "italic",
    color: "#d4a96a",
    fontSize: 12,
    whiteSpace: "nowrap",
  },

  // ── TOC ──
  tocOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 100,
    display: "flex",
    justifyContent: "flex-start",
  },
  tocPanel: {
    width: 340,
    background: "linear-gradient(180deg, #fdf6e9 0%, #f5ede0 100%)",
    borderRight: "3px solid #8b4513",
    padding: "24px 0 40px",
    overflowY: "auto",
    boxShadow: "8px 0 32px rgba(0,0,0,0.3)",
  },
  tocPanelMobile: {
    width: "85vw",
    maxWidth: 340,
    background: "linear-gradient(180deg, #fdf6e9 0%, #f5ede0 100%)",
    borderRight: "3px solid #8b4513",
    padding: "20px 0 40px",
    overflowY: "auto",
    boxShadow: "8px 0 32px rgba(0,0,0,0.3)",
  },
  tocHeader: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: 18,
    color: "#5c2a0a",
    padding: "0 20px 14px",
    borderBottom: "2px solid #c8841a",
    marginBottom: 8,
    letterSpacing: "0.05em",
  },
  tocItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Crimson Text', serif",
    fontSize: 15,
    transition: "all 0.2s",
    textAlign: "left",
  },
  tocLabel: { flex: 1, paddingRight: 8 },
  tocPage: { fontStyle: "italic", opacity: 0.7, fontSize: 13, whiteSpace: "nowrap" },

  // ── Stage ──
  stage: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    padding: "32px 80px 16px",
    minHeight: 0,
  },
  stageMobile: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    padding: "20px 48px 12px",  // side padding leaves room for arrows
    minHeight: 0,
  },
  bookContainer: {
    position: "relative",
    transition: "transform 0.2s ease",
  },
  bookShadow: {
    position: "absolute",
    bottom: -18,
    left: "5%",
    right: "5%",
    height: 32,
    background: "radial-gradient(ellipse, rgba(60,20,0,0.45) 0%, transparent 70%)",
    filter: "blur(8px)",
    zIndex: 0,
  },
  book: {
    position: "relative",
    zIndex: 1,
    borderRadius: "2px 4px 4px 2px",
    transition: "transform 0.42s cubic-bezier(0.4,0,0.2,1), filter 0.42s",
  },
  flipNext: { animation: "flipNext 0.42s cubic-bezier(0.4,0,0.2,1) forwards" },
  flipPrev: { animation: "flipPrev 0.42s cubic-bezier(0.4,0,0.2,1) forwards" },
  coverWrapper: { position: "relative", display: "flex", justifyContent: "center" },
  coverSpineDecor: {
    position: "absolute",
    left: -6, top: 0, bottom: 0, width: 14,
    background: "linear-gradient(180deg, #5c2a0a, #8b4513, #5c2a0a)",
    borderRadius: "3px 0 0 3px",
    boxShadow: "-2px 0 8px rgba(0,0,0,0.3)",
  },
  spreadWrapper: {
    display: "flex",
    alignItems: "stretch",
    boxShadow: "0 8px 40px rgba(60,20,0,0.5), 0 2px 8px rgba(0,0,0,0.2)",
    borderRadius: "2px 4px 4px 2px",
  },
  leftPageWrapper: { flex: 1, borderRadius: "2px 0 0 2px", overflow: "hidden", boxShadow: "inset -4px 0 12px rgba(0,0,0,0.08)" },
  spine: {
    width: 18,
    background: "linear-gradient(180deg, #3d1c02 0%, #6b3310 30%, #8b4513 50%, #6b3310 70%, #3d1c02 100%)",
    position: "relative",
    flexShrink: 0,
    boxShadow: "0 0 12px rgba(0,0,0,0.35)",
    zIndex: 2,
  },
  spineGlow: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(90deg, transparent 0%, rgba(255,200,120,0.18) 40%, transparent 100%)",
  },
  rightPageWrapper: { flex: 1, borderRadius: "0 4px 4px 0", overflow: "hidden", boxShadow: "inset 4px 0 12px rgba(0,0,0,0.06)" },

  // ── Page frame — dimensions passed as props now ──
  pageFrame: {
    position: "relative",
    background: "#fffdf5",
    overflow: "hidden",
  },
  coverFrame: {
    boxShadow: "6px 0 24px rgba(0,0,0,0.3), -2px 0 8px rgba(0,0,0,0.1)",
  },
  leftFrame: {
    borderRight: "1px solid rgba(0,0,0,0.06)",
    background: "linear-gradient(to right, #fdf8f0, #fffdf5)",
  },
  rightFrame: {
    background: "linear-gradient(to left, #fdf8f0, #fffdf5)",
  },
  loadingShimmer: {
    position: "absolute" as const,
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fdf8f0, #f5ede0)",
  },
  loadingText: {
    fontFamily: "'IM Fell English', serif",
    fontStyle: "italic",
    fontSize: 13,
    color: "#8b4513",
    opacity: 0.6,
  },
  pageNumRibbon: {
    position: "absolute",
    bottom: 8,
    zIndex: 5,
    fontFamily: "'IM Fell English', serif",
    fontStyle: "italic",
    fontSize: 12,
    color: "#8b4513",
    opacity: 0.7,
    userSelect: "none",
    pointerEvents: "none",
  },
  curlRight: {
    position: "absolute",
    bottom: 0, right: 0,
    width: 28, height: 28,
    background: "linear-gradient(225deg, #e8d5b7 45%, #c8a87a 100%)",
    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
    opacity: 0.6,
    pointerEvents: "none",
  },
  curlLeft: {
    position: "absolute",
    bottom: 0, left: 0,
    width: 28, height: 28,
    background: "linear-gradient(315deg, #e8d5b7 45%, #c8a87a 100%)",
    clipPath: "polygon(0 0, 100% 100%, 0 100%)",
    opacity: 0.6,
    pointerEvents: "none",
  },
  blankPage: {
    background: "linear-gradient(to left, #fdf8f0, #fffdf5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blankInner: { textAlign: "center", opacity: 0.35 },
  blankDecor: { fontSize: 40, color: "#8b4513", marginBottom: 12 },
  blankText: {
    fontFamily: "'IM Fell English', serif",
    fontStyle: "italic",
    fontSize: 16,
    color: "#5c2a0a",
    letterSpacing: "0.08em",
  },

  // ── Nav buttons ──
  navBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "linear-gradient(135deg, #5c2a0a, #8b4513)",
    border: "2px solid #c8841a",
    borderRadius: "50%",
    width: 52,
    height: 52,
    color: "#f5e6c8",
    fontSize: 30,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
    transition: "all 0.2s",
    lineHeight: 1,
    zIndex: 10,
    paddingBottom: 2,
  },
  navLeft: { left: 8 },
  navRight: { right: 8 },
  // Smaller arrows tucked closer on mobile so they don't cover the page
  navLeftMobile: { left: 4, width: 40, height: 40, fontSize: 24 },
  navRightMobile: { right: 4, width: 40, height: 40, fontSize: 24 },

  // ── Footer ──
  footer: {
    position: "relative",
    zIndex: 10,
    padding: "10px 28px 14px",
    background: "rgba(91,42,10,0.08)",
    borderTop: "1px solid rgba(200,132,26,0.25)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  progressTrack: {
    width: "60%",
    maxWidth: 500,
    height: 3,
    background: "rgba(139,69,19,0.15)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #8b4513, #c8841a)",
    borderRadius: 2,
    transition: "width 0.4s ease",
  },
  footerNav: {
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 600,
  },
  dot: {
    width: 8, height: 8,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    padding: 0,
  },
  footerText: {
    fontFamily: "'Crimson Text', serif",
    fontStyle: "italic",
    fontSize: 12,
    color: "#8b4513",
    opacity: 0.6,
    letterSpacing: "0.05em",
  },

  // ── Full-view modal ──
  fullViewOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.72)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  fullViewModal: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 1100,
    height: "90vh",
    background: "linear-gradient(180deg, #3d1c02 0%, #5c2a0a 100%)",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
    border: "2px solid #c8841a",
    animation: "modalFadeIn 0.25s ease forwards",
  },
  fullViewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "linear-gradient(135deg, #5c2a0a, #8b4513)",
    borderBottom: "2px solid #c8841a",
    flexShrink: 0,
  },
  fullViewTitle: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: 17,
    color: "#f5e6c8",
    letterSpacing: "0.06em",
  },
  fullViewIframe: {
    flex: 1,
    width: "100%",
    border: "none",
    display: "block",
    background: "#fff",
  },
};