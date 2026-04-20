import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'

// ─── Design tokens ────────────────────────────────────────────────────────────
const BG   = '#0A0A0A'
const BG2  = '#070707'
const INK  = '#EDEAE4'
const INK2 = '#B8B4AC'
const MUTED = '#6E6A63'
const HAIR  = '#1C1C1C'
const HAIR2 = '#262523'
const GOLD  = '#C9A961'
const GOLDS = '#8A7642'

// ─── Capabilities data ────────────────────────────────────────────────────────
const CAPS = [
  {
    num: '01',
    title: 'Wraps & Colour Change',
    tag: '01 · WRAPS & COLOUR CHANGE',
    visualNote: 'wrapped vehicle · studio light',
    h3: 'Wraps & Colour Change',
    lede: 'Full and partial vehicle wraps, fleet programmes, colour flips and safe removal — finished to a showroom standard by certified installers.',
    items: [
      'Full colour-change wraps (gloss, satin, matte, textured)',
      'Partial & accent wraps — roofs, hoods, trim',
      'Fleet programmes & multi-vehicle rollouts',
      'Safe vinyl removal & lease-return prep',
      'Paint protection film & ceramic coatings',
    ],
  },
  {
    num: '02',
    title: 'Signs & Decals',
    tag: '02 · SIGNS & DECALS',
    visualNote: 'storefront · vinyl lettering',
    h3: 'Signs & Decals',
    lede: 'Storefronts, fascia, vinyl lettering and precision-cut decals — coordinated with your brand system and installed clean.',
    items: [
      'Storefront & fascia packages (channel, cabinet, vinyl on glass)',
      'Window decals, campaigns & privacy frost',
      'Cut vinyl lettering, wayfinding & safety signs',
      'Personalised decals for teams & promotional runs',
      'Spot graphics, stripes & equipment markings',
    ],
  },
  {
    num: '03',
    title: 'Large Format & Display',
    tag: '03 · LARGE FORMAT & DISPLAY',
    visualNote: 'hoarding · trade-show display',
    h3: 'Large Format & Display',
    lede: 'Banners, rigid boards, site hoarding, retractables, pop-ups and trade-show hardware — ship-ready or installed.',
    items: [
      'Vinyl & mesh banners, hemmed & grommeted',
      'Construction hoarding runs, weatherable',
      'Retractables, pop-ups & tabletop displays',
      'Feather & teardrop flags, step-and-repeat walls',
      'Rigid ACM, PVC & foam board signage',
    ],
  },
  {
    num: '04',
    title: 'Marketing Print',
    tag: '04 · MARKETING PRINT',
    visualNote: 'stationery · collateral flat lay',
    h3: 'Marketing Print',
    lede: 'Stationery, mail, labels and promotional collateral printed alongside your programme — soft-touch, foils, and specialty finishes available.',
    items: [
      'Business cards, letterhead & envelopes',
      'Flyers, brochures, postcards & direct mail',
      'Roll labels, die-cut stickers & magnets',
      'Sell sheets, rack cards & announcement cards',
      'Canvas prints & promotional merchandise',
    ],
  },
]

// ─── Work cases ──────────────────────────────────────────────────────────────
const CASES = [
  {
    num: '042',
    title: 'Satin Slate\nColour Change',
    category: 'Full Wrap',
    accent: '#C9A961',
    glow: 'rgba(201,169,97,0.14)',
    gradient: 'radial-gradient(ellipse 70% 60% at 55% 42%, #1e1a12 0%, #0a0a08 58%, #040402 100%)',
    hatch: 'repeating-linear-gradient(140deg, rgba(255,255,255,.016) 0 2px, transparent 2px 20px)',
    specs: { material: '3M 2080 M21', install: '2 days', year: '2026' },
    featured: true,
  },
  {
    num: '039',
    title: 'Fleet Livery\nProgramme',
    category: 'Fleet Branding',
    accent: '#7AAFC4',
    glow: 'rgba(122,175,196,0.11)',
    gradient: 'radial-gradient(ellipse 65% 55% at 58% 38%, #0c1820 0%, #060d12 55%, #030508 100%)',
    hatch: 'repeating-linear-gradient(90deg, rgba(255,255,255,.01) 0 1px, transparent 1px 28px)',
    specs: { material: 'Avery MPI 1105', install: '8 days', year: '2025' },
    featured: false,
  },
  {
    num: '044',
    title: 'Window\nCampaign',
    category: 'Signs & Decals',
    accent: '#9B8FC9',
    glow: 'rgba(155,143,201,0.11)',
    gradient: 'radial-gradient(ellipse 60% 55% at 50% 44%, #110f1c 0%, #090710 55%, #040306 100%)',
    hatch: 'repeating-linear-gradient(180deg, rgba(255,255,255,.01) 0 1px, transparent 1px 22px)',
    specs: { material: '3M Envision', install: '1 day', year: '2026' },
    featured: false,
  },
]

// ─── Shared reveal animation ──────────────────────────────────────────────────
const revealProps = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
  transition: { duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1] as [number,number,number,number] },
})

// ─── Arrow SVG ────────────────────────────────────────────────────────────────
const Arrow = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
    <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const ArrowSm = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
    <path d="M1 4h10M8 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

// ─── Visual placeholder (caps panel image area) ───────────────────────────────
const CapVisual: React.FC<{ cap: typeof CAPS[0]; active: boolean }> = ({ cap, active }) => (
  <div
    style={{
      position: 'relative',
      height: 300,
      flexShrink: 0,
      overflow: 'hidden',
      borderBottom: `1px solid ${HAIR}`,
    }}
  >
    {/* bg */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 60% 55% at 65% 45%, #1c1c1c 0%, #0a0a0a 60%, #050505 100%), repeating-linear-gradient(138deg, rgba(255,255,255,.015) 0 2px, transparent 2px 18px)`,
        transform: active ? 'scale(1)' : 'scale(1.025)',
        transition: 'transform 1.8s cubic-bezier(0.2,0.8,0.2,1)',
      }}
    />
    {/* gold glow */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 40% 55% at 70% 36%, rgba(201,169,97,0.12) 0%, transparent 60%)`,
        opacity: active ? 1 : 0.5,
        transition: 'opacity 1s',
        pointerEvents: 'none',
      }}
    />
    {/* Corner brackets */}
    {(['tl','tr','bl','br'] as const).map(pos => (
      <div
        key={pos}
        style={{
          position: 'absolute',
          width: 18,
          height: 18,
          top: pos.startsWith('t') ? 20 : undefined,
          bottom: pos.startsWith('b') ? 20 : undefined,
          left: pos.endsWith('l') ? 20 : undefined,
          right: pos.endsWith('r') ? 20 : undefined,
          borderColor: GOLD,
          opacity: active ? 0.5 : 0.2,
          transition: 'opacity 0.8s',
          borderTopWidth: pos.startsWith('t') ? 1 : 0,
          borderBottomWidth: pos.startsWith('b') ? 1 : 0,
          borderLeftWidth: pos.endsWith('l') ? 1 : 0,
          borderRightWidth: pos.endsWith('r') ? 1 : 0,
          borderStyle: 'solid',
        }}
      />
    ))}
    {/* Tag */}
    <div
      style={{
        position: 'absolute',
        top: 22,
        left: 22,
        fontFamily: '"Barlow Condensed", sans-serif',
        fontSize: 10,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: GOLD,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        opacity: active ? 1 : 0.5,
        transition: 'opacity 0.6s',
      }}
    >
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD }} />
      {cap.tag}
    </div>
    {/* Index num watermark */}
    <div
      style={{
        position: 'absolute',
        top: 18,
        right: 22,
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '2rem',
        letterSpacing: '0.06em',
        color: 'rgba(255,255,255,0.06)',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      {cap.num}
    </div>
    {/* Center placeholder note */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        fontFamily: '"Barlow Condensed", sans-serif',
        fontSize: 9,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.1)',
        textAlign: 'center',
        lineHeight: 2,
        pointerEvents: 'none',
      }}
    >
      — Drop in —<br />{cap.visualNote}
    </div>
  </div>
)

// ─── Component ───────────────────────────────────────────────────────────────
export default function Home() {
  usePageMeta(
    'InMotion Wraps & Print — Vehicle Wraps, Signs & Printing',
    'InMotion Wraps & Print LLC: vehicle wraps, fleet graphics, signs and decals, trade show displays, large format printing, and marketing materials. Call (702) 551-7315.',
  )

  const [activeCap, setActiveCap] = useState(0)
  const heroImageRef = useRef<HTMLDivElement>(null)

  // Hero parallax
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroImageRef.current) {
            const y = window.scrollY
            heroImageRef.current.style.transform =
              `translate3d(0, ${y * 0.12}px, 0) scale(${1 + y * 0.00008})`
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main style={{ backgroundColor: BG, color: INK }}>

      {/* ═══════════════════════════════════════════════════════════ HERO */}
      <section
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        {/* Full-bleed cinematic image layer */}
        <div
          ref={heroImageRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -2,
            background: `
              radial-gradient(ellipse 60% 55% at 68% 38%, #1a1a1a 0%, #0a0a0a 55%, #050505 100%),
              #060606
            `,
            overflow: 'hidden',
          }}
        >
          {/* placeholder hatch — swap with real wrapped-car photo via background-image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(138deg, rgba(255,255,255,.012) 0 2px, transparent 2px 18px)',
              mixBlendMode: 'screen',
            }}
          />
          {/* Spotlight wash */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(ellipse 40% 70% at 78% 40%, rgba(201,169,97,.07) 0%, transparent 60%),
                radial-gradient(ellipse 30% 50% at 10% 80%, rgba(255,255,255,.02) 0%, transparent 60%)
              `,
            }}
          />
        </div>

        {/* Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            background: `
              linear-gradient(180deg, rgba(10,10,10,.35) 0%, transparent 25%, transparent 60%, rgba(10,10,10,.8) 100%),
              linear-gradient(90deg, rgba(10,10,10,.45) 0%, transparent 40%)
            `,
            pointerEvents: 'none',
          }}
        />

        {/* Placeholder drop-in note */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: -1,
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: 10,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.08)',
            textAlign: 'center',
            lineHeight: 2,
          }}
        >
          — DROP IN —<br />Full-bleed photograph · wrapped vehicle<br />dark studio, single light source
        </div>

        {/* Meta — top-left */}
        <div
          className="hero-meta-top"
          style={{
            position: 'absolute',
            top: 120,
            left: 48,
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: 11,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: MUTED,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span style={{ width: 32, height: 1, background: GOLD, display: 'inline-block' }} />
          <span>INMOTION &nbsp;/ &nbsp;WRAPS &amp; COATINGS</span>
        </div>

        {/* Meta — top-right */}
        <div
          className="hero-meta-right"
          style={{
            position: 'absolute',
            top: 120,
            right: 48,
            textAlign: 'right',
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: MUTED,
            lineHeight: 2.2,
          }}
        >
          <div><span style={{ color: INK2, fontWeight: 400, letterSpacing: '0.2em' }}>EST</span> &nbsp;·&nbsp; MMXV</div>
          <div><span style={{ color: INK2, fontWeight: 400, letterSpacing: '0.2em' }}>CERT</span> &nbsp;·&nbsp; 3M &nbsp;/ &nbsp;AVERY</div>
          <div><span style={{ color: INK2, fontWeight: 400, letterSpacing: '0.2em' }}>STUDIO</span> &nbsp;·&nbsp; BY APPT.</div>
        </div>

        {/* Hero body — bottom-left content */}
        <div
          style={{
            position: 'relative',
            maxWidth: 1440,
            width: '100%',
            margin: '0 auto',
            padding: '0 48px 120px',
          }}
          className="hero-body"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: GOLD,
              marginBottom: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span style={{ color: MUTED }}>01 / 04</span>
            <span>Vehicle Finish · Storefront · Large Format</span>
          </motion.div>

          {/* Headline with line-mask rise-up */}
          <h1
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3.4rem, 11vw, 11rem)',
              lineHeight: 0.9,
              letterSpacing: '0.005em',
              color: INK,
              marginBottom: 0,
              maxWidth: '18ch',
            }}
          >
            <div style={{ overflow: 'hidden', display: 'block' }}>
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
                style={{ display: 'block' }}
              >
                PRECISION
              </motion.span>
            </div>
            <div style={{ overflow: 'hidden', display: 'block' }}>
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                style={{ display: 'block', color: INK2 }}
              >
                IN MOTION.
              </motion.span>
            </div>
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            style={{
              marginTop: 44,
              maxWidth: '52ch',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: INK2,
              fontWeight: 300,
            }}
          >
            A finishing studio for the commercial vehicle — colour changes, fleet programmes,
            storefront and large-format work. Measured to spec, installed by hand, delivered quiet.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 36 }}
          >
            <HeroCTA />
            <a
              href="#work"
              style={{
                fontFamily: '"Barlow Condensed", sans-serif',
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: INK2,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                paddingBottom: 4,
                borderBottom: '1px solid transparent',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = GOLD
                el.style.borderColor = GOLD
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = INK2
                el.style.borderColor = 'transparent'
              }}
            >
              View work
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: 10,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: MUTED,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span>Scroll</span>
          <ScrollLine />
        </motion.div>

        <style>{`
          @media (max-width: 1180px) { .hero-meta-top, .hero-meta-right { display: none !important; } }
          @media (max-width: 900px) { .hero-body { padding: 0 24px 80px !important; } }
        `}</style>
      </section>

      {/* ═════════════════════════════════════════════ CAPABILITIES */}
      <section
        id="capabilities"
        style={{ padding: '200px 48px', borderTop: `1px solid ${HAIR}` }}
        className="section-caps"
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>

          {/* Section intro */}
          <motion.div {...revealProps()} style={{ maxWidth: 1040, marginBottom: 100 }}>
            <Kicker idx="§ 02" label="Capabilities" />
            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                lineHeight: 0.92,
                letterSpacing: '0.005em',
                color: INK,
                maxWidth: '18ch',
                paddingBottom: '0.18em',
              }}
            >
              Four disciplines.<br />
              <span style={{ color: INK2 }}>One studio.</span>
            </h2>
            <p
              style={{
                marginTop: 64,
                maxWidth: '56ch',
                color: INK2,
                fontWeight: 300,
                fontSize: '1.0625rem',
                lineHeight: 1.75,
              }}
            >
              Every project flows through a single pipeline — measure, proof, produce, install.
              Select a capability to explore the scope.
            </p>
          </motion.div>

          {/* Split stage */}
          <motion.div
            {...revealProps(0.1)}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.15fr',
              gap: 64,
              borderTop: `1px solid ${HAIR}`,
            }}
            className="caps-stage"
          >
            {/* Left — selector list */}
            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 8 }}>
              {CAPS.map((cap, i) => (
                <CapsItem
                  key={i}
                  cap={cap}
                  active={activeCap === i}
                  onClick={() => setActiveCap(i)}
                  onMouseEnter={() => setActiveCap(i)}
                />
              ))}
            </div>

            {/* Right — preview stage */}
            <div
              style={{
                position: 'relative',
                minHeight: 640,
                border: `1px solid ${HAIR}`,
                background: BG2,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {CAPS.map((cap, i) => (
                <CapsPanel key={i} cap={cap} active={activeCap === i} />
              ))}
            </div>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 1080px) { .caps-stage { grid-template-columns: 1fr !important; gap: 32px !important; } }
          @media (max-width: 900px) { .section-caps { padding: 120px 24px !important; } }
        `}</style>
      </section>

      {/* ═════════════════════════════════════════════ FEATURED WORK */}
      <section
        id="work"
        style={{ padding: '0 48px 200px' }}
        className="section-work"
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>

          {/* Head row */}
          <motion.div
            {...revealProps()}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 48,
              padding: '200px 0 80px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <Kicker idx="§ 03" label="Selected Work" />
              <h2
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '0.005em',
                  color: INK,
                  maxWidth: '18ch',
                  paddingBottom: '0.18em',
                }}
              >
                Selected<br />
                <span style={{ color: INK2 }}>case files.</span>
              </h2>
            </div>
            <div>
              <div
                style={{
                  maxWidth: '42ch',
                  color: INK2,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  fontSize: '1.0625rem',
                  marginBottom: 32,
                }}
              >
                A curated selection of recent commissions — wraps, fleet livery, and signage.
                Hover each file to review the spec sheet.
              </div>
              <a
                href="/contact"
                style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: INK2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  paddingBottom: 4,
                  borderBottom: `1px solid ${HAIR2}`,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = GOLD
                  el.style.borderColor = GOLD
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = INK2
                  el.style.borderColor = HAIR2
                }}
              >
                Request full portfolio
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 4h10M8 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Work grid */}
          <motion.div {...revealProps(0.1)}>
            <WorkGrid />
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 900px) { .section-work { padding: 0 24px 120px !important; } }
        `}</style>
      </section>

      {/* ═════════════════════════════════════════════ CONTACT */}
      <section
        id="contact"
        style={{ padding: '200px 48px', borderTop: `1px solid ${HAIR}`, position: 'relative' }}
        className="section-contact"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 40% 60% at 80% 50%, rgba(201,169,97,.04) 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: 1440,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 120,
            alignItems: 'flex-start',
          }}
          className="contact-inner"
        >
          {/* Left */}
          <motion.div {...revealProps()}>
            <Kicker idx="§ 04" label="Begin" />
            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3rem, 8.5vw, 8rem)',
                lineHeight: 0.9,
                letterSpacing: '0.005em',
                color: INK,
              }}
            >
              Bring us<br />the <span style={{ color: INK2 }}>brief.</span>
            </h2>
            <p
              style={{
                marginTop: 44,
                maxWidth: '50ch',
                color: INK2,
                fontWeight: 300,
                fontSize: '1.0625rem',
                lineHeight: 1.7,
              }}
            >
              Fleet, storefront, event or full colour change — start with a quote and a measured
              timeline. A reply lands inside one business day.
            </p>
            <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 36, flexWrap: 'wrap' }}>
              <ContactCTA />
              <a
                href="tel:7025517315"
                style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: INK2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  paddingBottom: 4,
                  borderBottom: '1px solid transparent',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = GOLD
                  el.style.borderColor = GOLD
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = INK2
                  el.style.borderColor = 'transparent'
                }}
              >
                or call the studio
              </a>
            </div>
          </motion.div>

          {/* Right — meta */}
          <motion.div {...revealProps(0.1)} style={{ display: 'grid', gap: 40, paddingTop: 12 }}>
            {[
              { k: 'Studio', v: <>By appointment<br /><span style={{ color: MUTED, fontSize: '0.9rem' }}>Mon – Fri &nbsp;·&nbsp; 08:00 – 18:00</span></> },
              { k: 'Line', v: <a href="tel:7025517315" style={{ color: GOLD, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.06em', fontSize: '1.15rem' }}>+1 (702) 551 7315</a> },
              { k: 'Mail', v: <a href="mailto:hello@inmotionwraps.co" style={{ color: INK, fontWeight: 300 }}>hello@inmotionwraps.co</a> },
              { k: 'Service', v: 'Regional · on-site install available' },
            ].map(({ k, v }) => (
              <div
                key={k}
                style={{
                  borderTop: `1px solid ${HAIR}`,
                  paddingTop: 20,
                  display: 'grid',
                  gridTemplateColumns: '90px 1fr',
                  gap: 24,
                  alignItems: 'baseline',
                }}
              >
                <div
                  style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: MUTED,
                  }}
                >
                  {k}
                </div>
                <div style={{ color: INK, fontWeight: 300, fontSize: '1.0625rem', letterSpacing: '0.01em' }}>
                  {v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 900px) { .section-contact { padding: 120px 24px !important; } .contact-inner { grid-template-columns: 1fr !important; gap: 64px !important; } }
        `}</style>
      </section>

    </main>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Kicker({ idx, label }: { idx: string; label: string }) {
  return (
    <div
      style={{
        fontFamily: '"Barlow Condensed", sans-serif',
        fontWeight: 400,
        fontSize: 11,
        letterSpacing: '0.34em',
        textTransform: 'uppercase',
        color: GOLD,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 40,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 28, height: 1, background: GOLD, display: 'inline-block' }} />
      <span style={{ color: MUTED }}>{idx}</span>
      <span>{label}</span>
    </div>
  )
}

function CapsItem({
  cap,
  active,
  onClick,
  onMouseEnter,
}: {
  cap: typeof CAPS[0]
  active: boolean
  onClick: () => void
  onMouseEnter: () => void
}) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr auto',
        gap: 24,
        alignItems: 'center',
        padding: `32px ${active ? '22px' : '8px'}`,
        borderBottom: `1px solid ${HAIR}`,
        cursor: 'pointer',
        transition: 'padding 0.4s cubic-bezier(0.2,0.8,0.2,1)',
        position: 'relative',
        outline: 'none',
      }}
    >
      {/* Gold left bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: GOLD,
          transform: active ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'center',
          transition: 'transform 0.5s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      />
      <span
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '1.4rem',
          letterSpacing: '0.08em',
          color: active ? GOLD : MUTED,
          transition: 'color 0.4s',
        }}
      >
        {cap.num}
      </span>
      <span
        style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(1.4rem, 2vw, 1.9rem)',
          lineHeight: 1.1,
          letterSpacing: '0.005em',
          color: active ? INK : INK2,
          transition: 'color 0.4s',
        }}
      >
        {cap.title}
      </span>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: `1px solid ${active ? GOLD : HAIR2}`,
          display: 'grid',
          placeItems: 'center',
          color: active ? '#0a0a0a' : MUTED,
          background: active ? GOLD : 'transparent',
          transition: 'all 0.4s',
          flexShrink: 0,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  )
}

function CapsPanel({ cap, active }: { cap: typeof CAPS[0]; active: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(14px)',
        pointerEvents: active ? 'auto' : 'none',
        transition: 'opacity 0.65s cubic-bezier(0.2,0.8,0.2,1), transform 0.65s cubic-bezier(0.2,0.8,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CapVisual cap={cap} active={active} />

      {/* Editorial body — single column */}
      <div
        style={{
          padding: '40px 48px 48px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 400,
            fontSize: 10,
            letterSpacing: '0.36em',
            textTransform: 'uppercase',
            color: GOLD,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ color: MUTED }}>{cap.num}</span>
          <span style={{ width: 20, height: 1, background: HAIR2, display: 'inline-block' }} />
          <span>{cap.title}</span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            letterSpacing: '0.02em',
            lineHeight: 0.95,
            color: INK,
            marginBottom: 20,
          }}
        >
          {cap.h3}
        </h3>

        {/* Lede */}
        <p
          style={{
            color: INK2,
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: 1.75,
            marginBottom: 32,
            maxWidth: '52ch',
          }}
        >
          {cap.lede}
        </p>

        {/* Items — hairline menu style */}
        <ul style={{ listStyle: 'none', borderTop: `1px solid ${HAIR}` }}>
          {cap.items.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                padding: '13px 0',
                borderBottom: `1px solid ${HAIR}`,
                fontSize: '0.9rem',
                color: INK2,
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 1,
                  background: GOLD,
                  display: 'inline-block',
                  flexShrink: 0,
                  marginTop: 8,
                  opacity: 0.7,
                }}
              />
              {item}
            </li>
          ))}
        </ul>

        {/* Spacer pushes CTA to bottom */}
        <div style={{ flex: 1, minHeight: 24 }} />

        {/* CTA */}
        <CapsCTA />
      </div>
    </div>
  )
}

function CapsCTA() {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        alignSelf: 'flex-start',
        fontFamily: '"Barlow Condensed", sans-serif',
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: hovered ? '#0a0a0a' : INK,
        padding: '16px 28px',
        border: `1px solid ${hovered ? GOLD : HAIR2}`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: hovered ? 18 : 14,
        transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
        background: hovered ? GOLD : 'transparent',
        textDecoration: 'none',
      }}
    >
      Begin this project
      <ArrowSm />
    </Link>
  )
}

function WorkCard({ c }: { c: typeof CASES[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#080808',
        border: `1px solid ${hovered ? c.accent + '55' : HAIR}`,
        gridRow: c.featured ? 'span 2' : undefined,
        transition: 'border-color 0.5s cubic-bezier(0.2,0.8,0.2,1)',
        cursor: 'default',
      }}
    >
      {/* Image bg — Ken Burns on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `${c.gradient}, ${c.hatch}`,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 1.8s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      />

      {/* Accent glow — brightens on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 50% 55% at 65% 38%, ${c.glow} 0%, transparent 60%)`,
          opacity: hovered ? 1.6 : 1,
          transition: 'opacity 0.8s',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom shadow gradient — always present */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
          background: 'linear-gradient(to top, rgba(4,4,4,0.96) 0%, rgba(4,4,4,0.4) 55%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Gold left-edge bar — slides in on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 2,
          background: `linear-gradient(180deg, transparent, ${c.accent}, transparent)`,
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'bottom center',
          transition: 'transform 0.65s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      />

      {/* Top — category tag + case num */}
      <div
        style={{
          position: 'absolute',
          top: 22,
          left: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: c.accent,
            opacity: hovered ? 1 : 0.65,
            transition: 'opacity 0.3s',
          }}
        />
        <span
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: c.accent,
            opacity: hovered ? 1 : 0.75,
            transition: 'opacity 0.3s',
          }}
        >
          {c.category}
        </span>
      </div>

      {/* Watermark index */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          right: 22,
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '2.2rem',
          letterSpacing: '0.06em',
          color: 'rgba(255,255,255,0.05)',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {c.num}
      </div>

      {/* Center drop-in note */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: '"Barlow Condensed", sans-serif',
          fontSize: 9,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.09)',
          textAlign: 'center',
          lineHeight: 2,
          pointerEvents: 'none',
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.4s',
        }}
      >
        — Drop in —<br />project photograph
      </div>

      {/* Bottom content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 28px 28px',
        }}
      >
        {/* Spec sheet — slides up on hover */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: hovered ? 96 : 0,
            marginBottom: hovered ? 14 : 0,
            transition: 'max-height 0.45s cubic-bezier(0.2,0.8,0.2,1), margin-bottom 0.3s',
          }}
        >
          <div
            style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontSize: 10,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: MUTED,
              lineHeight: 1.9,
              paddingBottom: 12,
              borderBottom: `1px solid rgba(255,255,255,0.07)`,
              marginBottom: 12,
            }}
          >
            {Object.entries(c.specs).map(([k, v]) => (
              <div key={k}>
                <span style={{ color: INK2, fontWeight: 400, letterSpacing: '0.18em' }}>
                  {k.toUpperCase()}
                </span>
                {' '}·{' '}
                {v.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* Title + case number */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 16,
          }}
        >
          <h4
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: c.featured ? 'clamp(1.8rem, 2.8vw, 2.8rem)' : 'clamp(1.3rem, 1.8vw, 1.9rem)',
              lineHeight: 1,
              color: INK,
              letterSpacing: '0.01em',
              whiteSpace: 'pre-line',
            }}
          >
            {c.title}
          </h4>
          <span
            style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: MUTED,
              flexShrink: 0,
              paddingBottom: 4,
            }}
          >
            CASE · {c.num}
          </span>
        </div>
      </div>
    </div>
  )
}

function WorkGrid() {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.45fr 1fr',
          gridTemplateRows: '360px 360px',
          gap: 14,
        }}
        className="work-grid"
      >
        {CASES.map(c => <WorkCard key={c.num} c={c} />)}
      </div>

      {/* Footer row */}
      <div
        style={{
          marginTop: 28,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          borderTop: `1px solid ${HAIR}`,
        }}
      >
        <span
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: 10,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          3 of 18 case files shown
        </span>
        <a
          href="/contact"
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: GOLD,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            paddingBottom: 4,
            borderBottom: `1px solid ${GOLDS}`,
            transition: 'gap 0.3s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '16px' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '10px' }}
        >
          Request full portfolio
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 4h10M8 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: 320px 260px 260px !important;
          }
          .work-grid > *:first-child { grid-row: span 1 !important; }
        }
      `}</style>
    </div>
  )
}

function HeroCTA() {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        fontFamily: '"Barlow Condensed", sans-serif',
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: hovered ? '#0a0a0a' : INK,
        padding: '20px 34px',
        border: `1px solid ${hovered ? GOLD : GOLDS}`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: hovered ? 20 : 16,
        transition: 'all 0.45s cubic-bezier(0.2,0.8,0.2,1)',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? '0 18px 40px -18px rgba(201,169,97,0.4)' : 'none',
        background: hovered ? GOLD : 'transparent',
        textDecoration: 'none',
      }}
    >
      <span>Begin a project</span>
      <Arrow />
    </Link>
  )
}

function ContactCTA() {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="mailto:hello@inmotionwraps.co"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        fontFamily: '"Barlow Condensed", sans-serif',
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: hovered ? '#0a0a0a' : INK,
        padding: '20px 34px',
        border: `1px solid ${hovered ? GOLD : GOLDS}`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: hovered ? 20 : 16,
        transition: 'all 0.45s cubic-bezier(0.2,0.8,0.2,1)',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? '0 18px 40px -18px rgba(201,169,97,0.4)' : 'none',
        background: hovered ? GOLD : 'transparent',
        textDecoration: 'none',
      }}
    >
      <span>Begin a project</span>
      <Arrow />
    </a>
  )
}

function ScrollLine() {
  return (
    <div
      style={{
        width: 1,
        height: 40,
        background: `linear-gradient(to bottom, ${INK2}, transparent)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{ y: [0, 26, 0], opacity: [1, 0, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 1, height: 14, background: GOLD, position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  )
}
