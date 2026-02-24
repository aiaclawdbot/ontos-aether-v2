'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/* ───────────────────────── CONSTANTS ───────────────────────── */
const SECTIONS = 8;
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

/* ───────────────────────── CHART (Section 5) ───────────────────────── */
function CapitalDefenseChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Simplified SVG chart
  const w = 700, h = 300;
  const marketPath = 'M 0 80 L 100 60 L 200 50 L 280 45 L 350 55 L 420 90 L 500 170 L 560 220 L 620 240 L 700 200';
  const ontosPath = 'M 0 80 L 100 60 L 200 50 L 280 45 L 340 48 L 420 52 L 500 55 L 560 50 L 620 48 L 700 45';

  const events = [
    { x: 200, label: 'Jul 16', sub: 'ATH', color: '#22C55E' },
    { x: 300, label: 'Jul 20', sub: 'Early Warning', color: '#EAB308' },
    { x: 370, label: 'Jul 24', sub: 'Critical Alert', color: RED },
    { x: 530, label: 'Aug 5', sub: 'Crash', color: RED },
  ];

  return (
    <div ref={ref} style={{ width: '100%', maxWidth: 750, margin: '40px auto 0' }}>
      <svg viewBox={`-20 -10 ${w + 40} ${h + 60}`} style={{ width: '100%' }}>
        {/* Grid */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1={0} y1={i * 75} x2={w} y2={i * 75} stroke={BORDER} strokeWidth={0.5} />
        ))}

        {/* Market line */}
        <motion.path
          d={marketPath}
          fill="none"
          stroke={RED}
          strokeWidth={2.5}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        {/* Ontos line */}
        <motion.path
          d={ontosPath}
          fill="none"
          stroke={PURPLE}
          strokeWidth={2.5}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
        />

        {/* Event markers */}
        {events.map((e, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 + i * 0.4 }}
          >
            <line x1={e.x} y1={0} x2={e.x} y2={h} stroke={e.color} strokeWidth={1} strokeDasharray="4 4" opacity={0.5} />
            <text x={e.x} y={h + 20} fill={e.color} fontSize={11} textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{e.label}</text>
            <text x={e.x} y={h + 36} fill={MUTED} fontSize={9} textAnchor="middle" fontFamily="'Inter', sans-serif">{e.sub}</text>
          </motion.g>
        ))}

        {/* Legend */}
        <circle cx={w - 160} cy={15} r={4} fill={PURPLE} />
        <text x={w - 150} y={19} fill="#FFF" fontSize={11} fontFamily="'Inter', sans-serif">Ontos-guided</text>
        <circle cx={w - 160} cy={35} r={4} fill={RED} />
        <text x={w - 150} y={39} fill="#FFF" fontSize={11} fontFamily="'Inter', sans-serif">Standard portfolio</text>
      </svg>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1000, width: '100%' }}>
          <FadeIn delay={0.2}>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: '28px 32px', minWidth: 180, textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: MUTED, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>INPUT</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Raw Data</div>
              <div style={{ color: MUTED, fontSize: '0.8rem', marginTop: 4 }}>20K indicators</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}><span style={{ color: PURPLE, fontSize: '1.5rem' }}>→</span></FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ border: `1px solid ${PURPLE}`, borderRadius: 8, padding: '20px 24px', minWidth: 280, background: 'rgba(99,102,241,0.05)' }}>
              <div style={{ fontSize: '0.7rem', color: PURPLE, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>COMPILER</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 12 }}>.onto Compiler</div>
              <pre style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#94A3B8',
                textAlign: 'left', background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 4, lineHeight: 1.6,
              }}>
{`topology CarryTradeContagion {
  node JPY_USD : currency_pair
  node VIX : volatility_index
  edge JPY_USD -> VIX : contagion(
    weight: 0.87,
    lag: "2d",
    trigger: threshold(0.65)
  )
  rule cascade_alert when
    propagation_depth > 3
    AND velocity > 0.4
}`}
              </pre>
            </div>
          </FadeIn>
          <FadeIn delay={0.5}><span style={{ color: PURPLE, fontSize: '1.5rem' }}>→</span></FadeIn>
          <FadeIn delay={0.6}>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: '28px 32px', minWidth: 180, textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: MUTED, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>OUTPUT</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Executable</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Intelligence</div>
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

      {/* ─── SECTION 6: ENTERPRISE AI ─── */}
      <Section id="s5">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 800, marginBottom: 40 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: MUTED, letterSpacing: '0.15em', marginBottom: 16 }}>05 / CSO PLAY</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Standard LLMs Hallucinate.{' '}
              <span style={{ color: PURPLE }}>Ontos Provides Ground Truth.</span>
            </h2>
          </div>
        </FadeIn>

        {/* Flow diagram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900, width: '100%' }}>
          <FadeIn delay={0.2}>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: '24px 28px', textAlign: 'center', minWidth: 160 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>💬</div>
              <div style={{ fontWeight: 600 }}>LLM Prompt</div>
              <div style={{ color: MUTED, fontSize: '0.8rem', marginTop: 4 }}>&ldquo;Is the carry trade unwinding?&rdquo;</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}><span style={{ color: PURPLE, fontSize: '1.5rem' }}>→</span></FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ border: `1px solid ${PURPLE}`, borderRadius: 8, padding: '24px 28px', textAlign: 'center', minWidth: 200, background: 'rgba(99,102,241,0.05)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>⚡</div>
              <div style={{ fontWeight: 600 }}>Ontos Provenance Engine</div>
              <div style={{ color: MUTED, fontSize: '0.8rem', marginTop: 4 }}>Semantic topology + rule execution</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.5}><span style={{ color: PURPLE, fontSize: '1.5rem' }}>→</span></FadeIn>
          <FadeIn delay={0.6}>
            <div style={{ border: `1px solid #22C55E`, borderRadius: 8, padding: '24px 28px', textAlign: 'center', minWidth: 200 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>✓</div>
              <div style={{ fontWeight: 600 }}>Verified Output</div>
              <div style={{ color: MUTED, fontSize: '0.8rem', marginTop: 4 }}>Mathematically grounded</div>
            </div>
          </FadeIn>
        </div>

        {/* Provenance chain */}
        <FadeIn delay={0.8}>
          <div style={{ marginTop: 40, maxWidth: 600, width: '100%' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: MUTED, marginBottom: 12, letterSpacing: '0.1em' }}>PROVENANCE CHAIN</div>
            {[
              { source: 'JPY/USD Spot Rate', reliability: 0.99, provider: 'Bloomberg' },
              { source: 'VIX Term Structure', reliability: 0.97, provider: 'CBOE' },
              { source: 'Margin Debt (FINRA)', reliability: 0.96, provider: 'FINRA' },
              { source: 'Smart Money Confidence', reliability: 0.98, provider: 'SentimenTrader' },
            ].map((s, i) => (
              <FadeIn key={i} delay={1 + i * 0.15} y={10}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 16px', borderBottom: `1px solid ${BORDER}`, fontSize: '0.85rem',
                }}>
                  <span>{s.source}</span>
                  <span style={{ color: MUTED, fontSize: '0.75rem' }}>{s.provider}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#22C55E', fontSize: '0.8rem' }}>{s.reliability}</span>
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={1.8}>
              <div style={{
                marginTop: 16, padding: '12px 16px', background: 'rgba(34,197,94,0.08)',
                border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 6,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontWeight: 600 }}>Composite Confidence</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#22C55E', fontWeight: 700, fontSize: '1.2rem' }}>0.98</span>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </Section>

      {/* ─── SECTION 7: DEMO SCRIPT ─── */}
      <Section id="s6">
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 800, marginBottom: 40 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: MUTED, letterSpacing: '0.15em', marginBottom: 16 }}>06 / LIVE DEMO</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Demo Choreography
            </h2>
          </div>
        </FadeIn>
        <div style={{ maxWidth: 650, width: '100%' }}>
          {[
            { step: 1, time: '60s', title: 'Vercel UI', talk: '"This is the concept"', desc: 'Walk through the pitch deck interface' },
            { step: 2, time: '1 min', title: '.onto in IDE', talk: '"This is the language"', desc: 'Show real topology definition syntax' },
            { step: 3, time: '2 min', title: 'Backtest', talk: '"This is capital defense"', desc: 'Aug 2024 crash — signals vs price action' },
            { step: 4, time: '2 min', title: 'Provenance', talk: '"This is enterprise AI"', desc: 'LLM query → verified, sourced answer' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.2} y={15}>
              <div style={{
                display: 'flex', gap: 20, padding: '20px 0',
                borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '1.2rem', fontWeight: 700,
                  color: PURPLE, minWidth: 32,
                }}>{s.step}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>{s.title}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: '0.75rem' }}>{s.time}</span>
                  </div>
                  <div style={{ color: PURPLE, fontSize: '0.85rem', fontStyle: 'italic', marginBottom: 4 }}>{s.talk}</div>
                  <div style={{ color: MUTED, fontSize: '0.85rem' }}>{s.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={1}>
          <div style={{ marginTop: 32, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: MUTED }}>
            Total: ~6 minutes
          </div>
        </FadeIn>
      </Section>

      {/* ─── SECTION 8: THE CLOSE ─── */}
      <Section id="s7">
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
