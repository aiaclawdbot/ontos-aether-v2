'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/* ───────────────────────── CONSTANTS ───────────────────────── */
const SECTIONS = 7;
const PURPLE = '#6366F1';
const RED = '#EF4444';
const BG = '#0A0E17';
const MUTED = '#64748B';
const BORDER = '#1E293B';

const INDICATORS = [
  'Dumb Money Confidence', 'Smart Money Confidence', 'Put/Call Ratio (Equity)',
  'VIX Term Structure', 'NYSE Advance/Decline', 'AAII Bull-Bear Spread',
  'Insider Buy/Sell Ratio', 'Options Volume Ratio', 'High-Yield Spread',
  'Rydex Cash Flow Ratio', 'Equity Fund Flows', 'Margin Debt Change',
  'IPO Sentiment', 'Junk Bond Demand', 'Treasury Yield Curve',
  'Credit Default Swaps', 'Volatility Risk Premium', 'Skew Index',
  'Breadth Thrust', 'McClellan Oscillator',
];

/* ───────────────────────── HELPERS ───────────────────────── */
function Section({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section
      id={id}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 40px',
        scrollSnapAlign: 'start',
        position: 'relative',
      }}
    >
      {children}
    </section>
  );
}

function FadeIn({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function Stat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '2rem', fontWeight: 700, color: PURPLE }}>{value}</div>
        <div style={{ color: MUTED, fontSize: '0.875rem', marginTop: 4 }}>{label}</div>
      </div>
    </FadeIn>
  );
}

/* ───────────────────────── COPILOT PROVENANCE (Section 6) ───────────────────────── */
function CopilotProvenance() {
  const [open, setOpen] = useState(false);
  const provenanceNodes = [
    { node: 'JPY/USD 10d Volatility', value: '1.8σ', threshold: '> 1.5σ', source: 'SentimenTrader + BOJ', reliability: 0.89 },
    { node: 'Smart Money Confidence', value: '28%', threshold: '< 30%', source: 'SentimenTrader', reliability: 0.93 },
    { node: 'XLK McClellan Oscillator', value: '-45', threshold: '< -40', source: 'SentimenTrader', reliability: 0.87 },
    { node: 'VIX Term Structure', value: 'Flattening', threshold: '== Flattening', source: 'CBOE', reliability: 0.91 },
  ];

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'rgba(99,102,241,0.1)', border: `1px solid rgba(99,102,241,0.3)`,
          borderRadius: 6, padding: '8px 14px', cursor: 'pointer', color: PURPLE,
          fontSize: '0.8rem', fontWeight: 600, width: '100%', textAlign: 'center',
          fontFamily: "'JetBrains Mono', monospace", transition: 'all 0.2s ease',
        }}
      >
        {open ? '▾ Hide' : '▸ View'} Mathematical Provenance
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: 12, overflow: 'hidden' }}
        >
          <div style={{
            background: 'rgba(10,14,23,0.9)', border: `1px solid ${BORDER}`,
            borderRadius: 8, padding: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem',
          }}>
            <div style={{ color: MUTED, marginBottom: 10, letterSpacing: '0.1em', fontSize: '0.65rem' }}>
              ONTOS PROVENANCE CHAIN — 4-HOP GRAPH TRAVERSAL
            </div>
            {provenanceNodes.map((n, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr auto auto auto',
                gap: 12, padding: '8px 0', borderBottom: i < provenanceNodes.length - 1 ? `1px solid ${BORDER}` : 'none',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: 500 }}>{n.node}</div>
                  <div style={{ color: MUTED, fontSize: '0.65rem', marginTop: 2 }}>{n.source}</div>
                </div>
                <div style={{ color: RED, fontWeight: 600 }}>{n.value}</div>
                <div style={{ color: '#22C55E' }}>{n.threshold} ✓</div>
                <div>
                  <div style={{ width: 40, height: 4, background: BORDER, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${n.reliability * 100}%`, height: '100%', background: '#22C55E', borderRadius: 2 }} />
                  </div>
                  <div style={{ color: MUTED, fontSize: '0.6rem', marginTop: 2, textAlign: 'right' }}>{n.reliability}</div>
                </div>
              </div>
            ))}
            <div style={{
              marginTop: 12, padding: '10px 0 0', borderTop: `1px solid ${BORDER}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ color: MUTED }}>Composite Graph Confidence</span>
              <span style={{ color: '#22C55E', fontWeight: 700, fontSize: '1rem' }}>0.94</span>
            </div>
            <div style={{ color: MUTED, fontSize: '0.6rem', marginTop: 8 }}>
              Rule: systemic_carry_unwind | Execution: 0.08ms | Cross-asset: Sentiment × Currency × Breadth × Volatility
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ───────────────────────── CHART (Section 5) ───────────────────────── */
function CapitalDefenseChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const w = 700, h = 300;
  const padL = 60, padR = 10, padT = 30, padB = 50;
  const cW = w - padL - padR, cH = h - padT - padB;

  // Data: [dayOffset, marketVal, ontosVal] — day 0 = Jul 1, values = portfolio $M
  const data: [number,number,number][] = [
    [0,1.000,1.000],[2,1.008,1.008],[4,1.015,1.015],[6,1.020,1.020],
    [8,1.028,1.028],[10,1.035,1.035],[12,1.042,1.042],[14,1.048,1.048],
    [16,1.058,1.058], // Jul 16 ATH
    [18,1.055,1.056],[20,1.052,1.054], // Jul 20 - breadth divergence
    [22,1.048,1.052],[24,1.035,1.050], // Jul 24 - carry unwind alert
    [26,1.015,1.048],[28,0.990,1.046],[30,0.972,1.044],
    [32,0.960,1.043],[34,0.956,1.042], // Aug 5 - VIX 65 crash
    [36,0.965,1.044],[38,0.978,1.048],[40,0.990,1.052],[42,1.000,1.055],
    [44,1.008,1.058],[46,1.012,1.060],
  ];

  const minV = 0.94, maxV = 1.08;
  const xOf = (d: number) => padL + (d / 46) * cW;
  const yOf = (v: number) => padT + (1 - (v - minV) / (maxV - minV)) * cH;

  // Build smooth bezier paths
  const buildPath = (pts: [number,number][]) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1], cur = pts[i];
      const cpx1 = prev[0] + (cur[0] - prev[0]) * 0.4;
      const cpx2 = cur[0] - (cur[0] - prev[0]) * 0.4;
      d += ` C ${cpx1} ${prev[1]}, ${cpx2} ${cur[1]}, ${cur[0]} ${cur[1]}`;
    }
    return d;
  };

  const marketPts: [number,number][] = data.map(d => [xOf(d[0]), yOf(d[1])]);
  const ontosPts: [number,number][] = data.map(d => [xOf(d[0]), yOf(d[2])]);
  const marketPath = buildPath(marketPts);
  const ontosPath = buildPath(ontosPts);
  const marketArea = marketPath + ` L ${marketPts[marketPts.length-1][0]} ${padT + cH} L ${marketPts[0][0]} ${padT + cH} Z`;
  const ontosArea = ontosPath + ` L ${ontosPts[ontosPts.length-1][0]} ${padT + cH} L ${ontosPts[0][0]} ${padT + cH} Z`;

  // Key x positions
  const xJul16 = xOf(16), xJul20 = xOf(20), xJul24 = xOf(24), xAug5 = xOf(34);

  // Y-axis labels
  const yLabels = [0.94,0.96,0.98,1.00,1.02,1.04,1.06,1.08];
  // X-axis dates
  const xDates: [number,string][] = [[0,'Jul 1'],[8,'Jul 8'],[16,'Jul 16'],[24,'Jul 24'],[32,'Aug 1'],[38,'Aug 8'],[46,'Aug 16']];

  const annotations = [
    { x: xJul16, label: 'S&P 500 ATH: 5,667', color: '#22C55E', yOff: -8 },
    { x: xJul20, label: 'Breadth divergence detected', color: '#EAB308', yOff: 8 },
    { x: xJul24, label: '⚠ Carry unwind alert — de-risk', color: RED, yOff: -8, pulse: true },
    { x: xAug5, label: 'VIX: 65 — crash', color: RED, yOff: 18 },
  ];

  return (
    <div ref={ref} style={{ width: '100%', maxWidth: 780, margin: '40px auto 0' }}>
      <svg viewBox={`0 0 ${w} ${h + 10}`} style={{ width: '100%' }}>
        <defs>
          <linearGradient id="marketGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={RED} stopOpacity={0.25} />
            <stop offset="100%" stopColor={RED} stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="ontosGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PURPLE} stopOpacity={0.3} />
            <stop offset="100%" stopColor={PURPLE} stopOpacity={0.02} />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yLabels.map(v => (
          <line key={v} x1={padL} y1={yOf(v)} x2={w - padR} y2={yOf(v)} stroke={BORDER} strokeWidth={0.5} opacity={0.5} />
        ))}

        {/* Danger zone */}
        <rect x={xJul24} y={padT} width={xAug5 - xJul24} height={cH} fill={RED} opacity={0.06} rx={2} />

        {/* Area fills */}
        <path d={marketArea} fill="url(#marketGrad)" />
        <path d={ontosArea} fill="url(#ontosGrad)" />

        {/* Lines */}
        <motion.path d={marketPath} fill="none" stroke={RED} strokeWidth={2} initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 2, ease: 'easeInOut' }} />
        <motion.path d={ontosPath} fill="none" stroke={PURPLE} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }} />

        {/* Y-axis labels */}
        {yLabels.map(v => (
          <text key={v} x={padL - 6} y={yOf(v) + 4} fill={MUTED} fontSize={9} textAnchor="end" fontFamily="'JetBrains Mono', monospace">
            ${v.toFixed(2)}M
          </text>
        ))}

        {/* X-axis dates */}
        {xDates.map(([d, label]) => (
          <text key={d} x={xOf(d)} y={padT + cH + 16} fill={MUTED} fontSize={9} textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{label}</text>
        ))}

        {/* Annotations */}
        {annotations.map((a, i) => (
          <motion.g key={i} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.2 + i * 0.4 }}>
            <line x1={a.x} y1={padT} x2={a.x} y2={padT + cH} stroke={a.color} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
            {a.pulse && (
              <motion.circle cx={a.x} cy={padT + 10} r={5} fill={a.color} opacity={0.7}
                animate={{ r: [5, 10, 5], opacity: [0.7, 0.2, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <rect x={a.x - 70} y={a.yOff < 0 ? padT - 22 : padT + cH + 20 + (a.yOff - 8)} width={140} height={18} rx={3} fill="rgba(10,14,23,0.85)" stroke={a.color} strokeWidth={0.5} />
            <text x={a.x} y={a.yOff < 0 ? padT - 9 : padT + cH + 25 + (a.yOff - 8) + 9} fill={a.color} fontSize={8} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontWeight={600}>
              {a.label}
            </text>
          </motion.g>
        ))}

        {/* Legend */}
        <circle cx={padL + 8} cy={padT - 16} r={4} fill={PURPLE} />
        <text x={padL + 16} y={padT - 12} fill="#E2E8F0" fontSize={10} fontFamily="'Inter', sans-serif">Ontos-guided</text>
        <circle cx={padL + 120} cy={padT - 16} r={4} fill={RED} />
        <text x={padL + 128} y={padT - 12} fill="#E2E8F0" fontSize={10} fontFamily="'Inter', sans-serif">Standard portfolio</text>
      </svg>

      {/* Drawdown comparison */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 2.8 }}
        style={{
          display: 'flex', justifyContent: 'center', gap: 40, marginTop: 16, padding: '14px 28px',
          border: `1px solid ${BORDER}`, borderRadius: 8, background: 'rgba(15,23,42,0.6)',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem',
        }}>
        <div><span style={{ color: MUTED }}>Standard drawdown: </span><span style={{ color: RED, fontWeight: 700 }}>-9.7%</span></div>
        <div style={{ color: BORDER }}>|</div>
        <div><span style={{ color: MUTED }}>Ontos-guided: </span><span style={{ color: '#22C55E', fontWeight: 700 }}>-1.2%</span></div>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── NODE NETWORK (Section 3) ───────────────────────── */
function NodeNetwork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const nodes = [
    { x: 350, y: 150, label: 'JPY/USD', r: 24 },
    { x: 180, y: 80, label: 'VIX', r: 18 },
    { x: 520, y: 90, label: 'SPX', r: 20 },
    { x: 150, y: 220, label: 'HY Spread', r: 16 },
    { x: 500, y: 240, label: 'Nikkei', r: 17 },
    { x: 280, y: 280, label: 'UST 10Y', r: 15 },
    { x: 450, y: 170, label: 'Margin', r: 14 },
    { x: 250, y: 150, label: 'Carry', r: 16 },
    { x: 400, y: 260, label: 'Credit', r: 15 },
    { x: 550, y: 170, label: 'EM FX', r: 14 },
  ];

  const edges = [
    [0,1],[0,2],[0,4],[0,7],[1,2],[1,3],[2,4],[2,6],[3,5],[3,8],[4,9],[5,8],[6,7],[6,9],[7,1],[8,5],[8,9],
  ];

  return (
    <div ref={ref} style={{ width: '100%', maxWidth: 700, margin: '40px auto 0' }}>
      <svg viewBox="0 0 700 340" style={{ width: '100%' }}>
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={`e${i}`}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke={PURPLE}
            strokeWidth={1}
            opacity={0.4}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
            transition={{ duration: 0.6, delay: 0.8 + i * 0.08 }}
          />
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={`n${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
          >
            <circle cx={n.x} cy={n.y} r={n.r} fill={BG} stroke={PURPLE} strokeWidth={1.5} />
            <text x={n.x} y={n.y + 4} fill="#FFF" fontSize={9} textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{n.label}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */
export default function Home() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((idx: number) => {
    const el = document.getElementById(`s${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Track current section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.id.replace('s', ''));
            setCurrent(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    for (let i = 0; i < SECTIONS; i++) {
      const el = document.getElementById(`s${i}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(current + 1, SECTIONS - 1);
        scrollTo(next);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(current - 1, 0);
        scrollTo(prev);
      } else if (e.key >= '1' && e.key <= '8') {
        e.preventDefault();
        scrollTo(parseInt(e.key) - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, scrollTo]);

  return (
    <div ref={containerRef}>
      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 100, background: BORDER }}>
        <motion.div
          style={{ height: '100%', background: PURPLE }}
          animate={{ width: `${((current + 1) / SECTIONS) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Section nav dots */}
      <div style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Array.from({ length: SECTIONS }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            style={{
              width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: current === i ? PURPLE : MUTED,
              opacity: current === i ? 1 : 0.4,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* ─── SECTION 1: HERO ─── */}
      <Section id="s0">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 900 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: PURPLE, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32 }}>
              Ontos × SentimenTrader
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 24, letterSpacing: '-0.02em' }}>
              We built autonomous reasoning engines for telecom networks.{' '}
              <span style={{ color: PURPLE }}>Now we&apos;ve compiled the same architecture for Wall Street.</span>
            </h1>
            <FadeIn delay={0.5}>
              <p style={{ color: MUTED, fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                From 4G/5G network topology to cross-asset contagion mapping.
                Same math. Different domain. Unprecedented alpha.
              </p>
            </FadeIn>
            <FadeIn delay={0.8}>
              <div style={{ marginTop: 48, display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ color: MUTED, fontSize: '0.8rem' }}>↓ Scroll or press</span>
                <kbd style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', padding: '2px 8px', border: `1px solid ${BORDER}`, borderRadius: 4, color: MUTED }}>1-8</kbd>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </Section>

      {/* ─── SECTION 2: THE CEILING ─── */}
      <Section id="s1">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 800, marginBottom: 40 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: MUTED, letterSpacing: '0.15em', marginBottom: 16 }}>01 / THE PROBLEM</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              The Best Data Moat on Wall Street.{' '}
              <span style={{ color: RED }}>Trapped in Tabular Silos.</span>
            </h2>
            <p style={{ color: MUTED, marginTop: 16, fontSize: '1rem', lineHeight: 1.7 }}>
              20,000 indicators. Users must manually guess which to combine. The burden falls on the quant.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8, maxWidth: 900, width: '100%' }}>
          {INDICATORS.map((name, i) => (
            <FadeIn key={name} delay={i * 0.05} y={10}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', padding: '10px 14px',
                border: `1px solid ${BORDER}`, borderRadius: 4, color: MUTED,
                background: 'rgba(255,255,255,0.02)',
              }}>
                {name}
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={1.2}>
          <p style={{ color: MUTED, marginTop: 32, fontStyle: 'italic', fontSize: '0.9rem' }}>
            ...and 19,980 more. All isolated. No connections. No topology.
          </p>
        </FadeIn>
      </Section>

      {/* ─── SECTION 3: TELECOM ARCHITECTURE ─── */}
      <Section id="s2">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 800, marginBottom: 20 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: MUTED, letterSpacing: '0.15em', marginBottom: 16 }}>02 / THE INSIGHT</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Cross-Asset Contagion ={' '}
              <span style={{ color: PURPLE }}>Network Failure</span>
            </h2>
            <p style={{ color: MUTED, marginTop: 16, fontSize: '1rem', lineHeight: 1.7, maxWidth: 640, margin: '16px auto 0' }}>
              The Yen Carry Trade unwind behaves like cascading telecom router failures.
              Flat databases can&apos;t map it. Semantic topologies can.
            </p>
          </div>
        </FadeIn>
        <NodeNetwork />
      </Section>

      {/* ─── SECTION 4: THE ONTOS PARADIGM ─── */}
      <Section id="s3">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 800, marginBottom: 40 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: MUTED, letterSpacing: '0.15em', marginBottom: 16 }}>03 / THE ARCHITECTURE</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Define the Rules of the Market Once.{' '}
              <span style={{ color: PURPLE }}>Execute in Sub-Milliseconds.</span>
            </h2>
          </div>
        </FadeIn>

        {/* Pipeline boxes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1100, width: '100%' }}>
          <FadeIn delay={0.2}>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: '28px 32px', minWidth: 180, textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: MUTED, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>INPUT</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>20,000 Indicators</div>
              <div style={{ color: MUTED, fontSize: '0.78rem', marginTop: 4 }}>Flat, isolated, tabular</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}><span style={{ color: PURPLE, fontSize: '1.5rem' }}>→</span></FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ border: `1px solid ${PURPLE}`, borderRadius: 8, padding: '20px 24px', minWidth: 340, background: 'rgba(99,102,241,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: PURPLE, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>COMPILER</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 12 }}>.onto Compiler</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
                textAlign: 'left', background: 'rgba(0,0,0,0.5)', borderRadius: 6, lineHeight: 1.7,
                overflow: 'hidden', border: `1px solid ${BORDER}`,
              }}>
                <div style={{ background: 'rgba(99,102,241,0.08)', padding: '6px 12px', fontSize: '0.6rem', color: MUTED, borderBottom: `1px solid ${BORDER}`, letterSpacing: '0.05em' }}>
                  systemic_carry_unwind.onto
                </div>
                <div style={{ padding: '12px 0', display: 'flex' }}>
                  <div style={{ padding: '0 10px', borderRight: `1px solid ${BORDER}`, color: '#475569', fontSize: '0.62rem', textAlign: 'right', lineHeight: 1.7, userSelect: 'none', minWidth: 28 }}>
                    {Array.from({length: 14}, (_, i) => <div key={i}>{i + 1}</div>)}
                  </div>
                  <pre style={{ margin: 0, padding: '0 12px', lineHeight: 1.7, fontSize: '0.68rem' }}>
<span style={{ color: '#C084FC' }}>rule</span>{' '}<span style={{ color: '#E2E8F0' }}>systemic_carry_unwind</span>{' '}{'{\n'}
{'  '}<span style={{ color: '#C084FC' }}>match</span>{' '}<span style={{ color: '#E2E8F0' }}>market</span>{': '}<span style={{ color: '#F59E0B' }}>MarketRegime</span>{'\n'}
{'  '}<span style={{ color: '#C084FC' }}>where</span>{' '}market.status == <span style={{ color: '#4ADE80' }}>&quot;live&quot;</span>{'\n'}
{'    '}<span style={{ color: '#C084FC' }}>and</span>{' '}market.sentiment.smart_money{'\n'}
{'        _confidence &lt; '}<span style={{ color: '#22D3EE' }}>30</span>{'\n'}
{'    '}<span style={{ color: '#C084FC' }}>and</span>{' '}market.currencies.jpy_usd{'\n'}
{'        .volatility_index &gt; '}<span style={{ color: '#22D3EE' }}>1.5</span>{'\n'}
{'    '}<span style={{ color: '#C084FC' }}>and</span>{' '}market.sectors.tech{'\n'}
{'        .mcclellan_oscillator &lt; '}<span style={{ color: '#22D3EE' }}>-40</span>{'\n'}
{'  '}<span style={{ color: '#C084FC' }}>then</span>{' {\n'}
{'    flag: '}<span style={{ color: '#4ADE80' }}>&quot;severe_cross_asset_unwind&quot;</span>{'\n'}
{'    severity: '}<span style={{ color: '#4ADE80' }}>&quot;critical&quot;</span>{'\n'}
{'    confidence: '}<span style={{ color: '#E2E8F0' }}>graph_confidence</span>{'()\n'}
{'  }\n'}
{'}'}</pre>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.5}><span style={{ color: PURPLE, fontSize: '1.5rem' }}>→</span></FadeIn>
          <FadeIn delay={0.6}>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: '28px 32px', minWidth: 180, textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: MUTED, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>OUTPUT</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Executable Intelligence</div>
              <div style={{ color: MUTED, fontSize: '0.78rem', marginTop: 4 }}>Cross-asset reasoning in 0.08ms</div>
            </div>
          </FadeIn>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, marginTop: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Stat value="3,100" label="nodes" delay={0.8} />
          <Stat value="28,400" label="edges" delay={0.9} />
          <Stat value="847" label="rules" delay={1.0} />
          <Stat value="0.08ms" label="execution" delay={1.1} />
        </div>
      </Section>

      {/* ─── SECTION 5: CAPITAL DEFENSE ─── */}
      <Section id="s4">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 800, marginBottom: 20 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: MUTED, letterSpacing: '0.15em', marginBottom: 16 }}>04 / CEO PLAY</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Catch Structural Breaks{' '}
              <span style={{ color: RED }}>Before Price Action Drops</span>
            </h2>
            <p style={{ color: MUTED, marginTop: 16, fontSize: '1rem', lineHeight: 1.7 }}>
              August 2024: The Yen Carry Trade unwind. One portfolio saw it coming.
            </p>
          </div>
        </FadeIn>
        <CapitalDefenseChart />
        <FadeIn delay={2.5}>
          <div style={{
            marginTop: 40, textAlign: 'center', padding: '20px 40px',
            border: `1px solid ${PURPLE}`, borderRadius: 8, background: 'rgba(99,102,241,0.05)',
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5rem', fontWeight: 700, color: PURPLE }}>12 days early.</span>
            <span style={{ color: MUTED, fontSize: '1.1rem', marginLeft: 16 }}>Capital preserved.</span>
          </div>
        </FadeIn>
      </Section>

      {/* ─── SECTION 6: ENTERPRISE AI — COPILOT MOCKUP ─── */}
      <Section id="s5">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 800, marginBottom: 24 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: MUTED, letterSpacing: '0.15em', marginBottom: 16 }}>05 / CSO PLAY</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              The Product Your Clients Will Pay{' '}
              <span style={{ color: PURPLE }}>$20K/Month</span> For
            </h2>
            <p style={{ color: MUTED, marginTop: 12, fontSize: '0.95rem', lineHeight: 1.6 }}>
              Standard LLMs hallucinate on financial data. This is the zero-hallucination AI Copilot — powered by your data, verified by Ontos.
            </p>
          </div>
        </FadeIn>

        {/* Chat Interface Mockup */}
        <FadeIn delay={0.3}>
          <div style={{
            maxWidth: 680, width: '100%',
            border: `1px solid ${BORDER}`, borderRadius: 12,
            background: 'rgba(15,23,42,0.8)',
            overflow: 'hidden',
          }}>
            {/* Chat header */}
            <div style={{
              padding: '14px 20px',
              borderBottom: `1px solid ${BORDER}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>SentimenTrader AI Copilot</span>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: MUTED }}>Powered by Ontos</span>
            </div>

            {/* Chat messages */}
            <div style={{ padding: '20px 20px 8px' }}>
              {/* User message */}
              <FadeIn delay={0.5}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                  <div style={{
                    background: PURPLE, borderRadius: '12px 12px 2px 12px',
                    padding: '12px 16px', maxWidth: '85%', fontSize: '0.88rem', lineHeight: 1.5,
                  }}>
                    What is our exposure to a Yen carry-trade unwind given current market breadth and retail sentiment?
                  </div>
                </div>
              </FadeIn>

              {/* AI response */}
              <FadeIn delay={0.9}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                  <div style={{
                    background: 'rgba(30,41,59,0.8)', borderRadius: '12px 12px 12px 2px',
                    padding: '16px 18px', maxWidth: '90%', fontSize: '0.88rem', lineHeight: 1.7,
                    border: `1px solid ${BORDER}`,
                  }}>
                    <div style={{ marginBottom: 12 }}>
                      <span style={{ color: RED, fontWeight: 600 }}>⚠ Structural vulnerability detected.</span>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      The Ontos engine has identified a <strong>systemic carry-trade unwind pattern</strong> across 4 independent signal domains:
                    </div>
                    <ul style={{ margin: '8px 0 12px 20px', padding: 0 }}>
                      <li style={{ marginBottom: 4 }}>Smart Money Confidence at <strong>28%</strong> — below critical threshold</li>
                      <li style={{ marginBottom: 4 }}>JPY/USD 10-day volatility at <strong>1.8σ</strong> — carry stress confirmed</li>
                      <li style={{ marginBottom: 4 }}>XLK McClellan Oscillator at <strong>-45</strong> — tech breadth collapsing</li>
                      <li style={{ marginBottom: 4 }}>VIX term structure <strong>flattening</strong> — hedging demand surging</li>
                    </ul>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                      <div style={{ padding: '6px 12px', borderRadius: 6, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', fontSize: '0.8rem' }}>
                        <span style={{ color: MUTED }}>Action:</span> <span style={{ color: RED, fontWeight: 600 }}>De-gross tech exposure</span>
                      </div>
                      <div style={{ padding: '6px 12px', borderRadius: 6, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', fontSize: '0.8rem' }}>
                        <span style={{ color: MUTED }}>Confidence:</span> <span style={{ color: '#22C55E', fontWeight: 600 }}>94%</span>
                      </div>
                    </div>

                    {/* Provenance dropdown */}
                    <CopilotProvenance />
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Chat input */}
            <div style={{
              padding: '12px 20px 16px',
              borderTop: `1px solid ${BORDER}`,
            }}>
              <div style={{
                background: 'rgba(30,41,59,0.5)', border: `1px solid ${BORDER}`,
                borderRadius: 8, padding: '10px 14px', fontSize: '0.85rem', color: MUTED,
              }}>
                Ask about portfolio risk, regime shifts, or indicator relationships...
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={1.5}>
          <p style={{ color: MUTED, marginTop: 24, fontSize: '0.85rem', textAlign: 'center', maxWidth: 500 }}>
            Your data becomes the deterministic ground truth for Wall Street&apos;s AI agents.
            Not a chatbot — a <span style={{ color: '#22C55E' }}>mathematically verified reasoning engine</span>.
          </p>
        </FadeIn>
      </Section>

      {/* ─── SECTION 7: THE CLOSE ─── */}
      <Section id="s6">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 800 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 24 }}>
              You have the best behavioral data in the world.{' '}
              <span style={{ color: PURPLE }}>
                We have the architecture to turn it into an autonomous reasoning engine.
              </span>
            </h2>
            <FadeIn delay={0.4}>
              <p style={{ fontSize: '1.2rem', color: MUTED, marginBottom: 48, lineHeight: 1.7 }}>
                Let&apos;s build the Enterprise AI tier of your platform together.
              </p>
            </FadeIn>
            <FadeIn delay={0.7}>
              <a
                href="https://cal.com/michael-walker-pamuoj/ontos"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block', padding: '16px 48px', background: PURPLE,
                  color: '#FFF', borderRadius: 8, fontSize: '1rem', fontWeight: 600,
                  textDecoration: 'none', transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Schedule a Strategy Call →
              </a>
            </FadeIn>
            <FadeIn delay={0.9}>
              <div style={{ marginTop: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: MUTED }}>
                michael@ontos.ai
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}
