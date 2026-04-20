import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import { serviceGroups } from '../data/services'

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

/** Matches ContactInfo / business inbox */
const CONTACT_EMAIL = 'inmotionwraps@gmail.com'

/** Temporary full-bleed hero (replace with on-brand photography when ready). */
const HERO_BG_IMAGE =
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2400&q=80'

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
    imageUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=80',
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
    imageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
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

// ─── Component ───────────────────────────────────────────────────────────────
export default function Home() {
  usePageMeta(
    'InMotion Wraps & Print — Vehicle Wraps, Signs & Printing',
    'InMotion Wraps & Print LLC: vehicle wraps, fleet graphics, signs and decals, trade show displays, large format printing, and marketing materials. Call (702) 551-7315.',
  )

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
            overflow: 'hidden',
            backgroundColor: '#060606',
            backgroundImage: `
              radial-gradient(ellipse 58% 70% at 72% 42%, rgba(10,10,10,0.15) 0%, rgba(5,5,5,0.62) 72%, rgba(4,4,4,0.9) 100%),
              radial-gradient(ellipse 38% 65% at 82% 36%, rgba(201,169,97,.08) 0%, transparent 52%),
              url(${HERO_BG_IMAGE})
            `,
            backgroundSize: 'cover, cover, cover',
            backgroundPosition: 'center, center, 68% center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(138deg, rgba(255,255,255,.012) 0 2px, transparent 2px 18px)',
              mixBlendMode: 'screen',
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

        {/* Meta — top-left */}
        <div
          className="hero-meta-top"
          style={{
            position: 'absolute',
            top: 120,
            left: 48,
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: 12,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: INK2,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.5)',
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
            fontSize: 11,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: INK2,
            lineHeight: 2.2,
            textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.5)',
          }}
        >
          <div><span style={{ color: INK, fontWeight: 500, letterSpacing: '0.2em' }}>EST</span> &nbsp;·&nbsp; MMXV</div>
          <div><span style={{ color: INK, fontWeight: 500, letterSpacing: '0.2em' }}>CERT</span> &nbsp;·&nbsp; 3M &nbsp;/ &nbsp;AVERY</div>
          <div><span style={{ color: INK, fontWeight: 500, letterSpacing: '0.2em' }}>STUDIO</span> &nbsp;·&nbsp; CALL · MAIL</div>
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
              fontSize: 12,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                color: GOLD,
                textShadow: '0 1px 2px rgba(0,0,0,0.85)',
              }}
            >
              01 / 04
            </span>
            <span
              style={{
                color: INK,
                fontWeight: 500,
                letterSpacing: '0.26em',
                textShadow: '0 1px 2px rgba(0,0,0,0.92), 0 0 28px rgba(0,0,0,0.55)',
              }}
            >
              Vehicle Finish · Storefront · Large Format
            </span>
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
        style={{ padding: '120px 48px 132px', borderTop: `1px solid ${HAIR}` }}
        className="section-caps"
      >
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <motion.div {...revealProps()} style={{ maxWidth: 1040, marginBottom: 44 }}>
            <Kicker idx="§ 02" label="Capabilities" />
            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(2.4rem, 6vw, 4.25rem)',
                lineHeight: 0.95,
                letterSpacing: '0.005em',
                color: INK,
                maxWidth: '22ch',
                paddingBottom: '0.12em',
              }}
            >
              Four disciplines.<br />
              <span style={{ color: INK2 }}>One studio.</span>
            </h2>
            <p
              style={{
                marginTop: 36,
                maxWidth: '52ch',
                color: INK2,
                fontWeight: 300,
                fontSize: '1rem',
                lineHeight: 1.75,
              }}
            >
              Same pipeline on every job — measure, proof, produce, install. Follow a category
              to Services for full scope, deliverables, and how to quote.
            </p>
            <Link
              to="/services"
              className="caps-all-services"
              style={{
                marginTop: 28,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: '"Barlow Condensed", sans-serif',
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: GOLD,
                textDecoration: 'none',
                borderBottom: `1px solid ${GOLDS}`,
                paddingBottom: 4,
                cursor: 'pointer',
              }}
            >
              All services
              <Arrow />
            </Link>
          </motion.div>

          <motion.div
            {...revealProps(0.06)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 14,
              borderTop: `1px solid ${HAIR}`,
              paddingTop: 36,
            }}
            className="caps-quick-grid"
          >
            {serviceGroups.map(g => (
              <Link
                key={g.id}
                to={`/services#${g.id}`}
                className="caps-quick-link"
              >
                <span
                  style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: 10,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: GOLD,
                  }}
                >
                  {g.num}
                </span>
                <span
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: 'clamp(1.5rem, 2.4vw, 1.85rem)',
                    letterSpacing: '0.04em',
                    lineHeight: 1.05,
                    color: INK,
                  }}
                >
                  {g.shortTitle}
                </span>
                <span
                  style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.45,
                    color: INK2,
                    marginTop: 4,
                  }}
                >
                  {g.overviewTagline}
                </span>
                <span
                  style={{
                    marginTop: 'auto',
                    paddingTop: 14,
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: MUTED,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  View on Services
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </span>
              </Link>
            ))}
          </motion.div>
        </div>

        <style>{`
          .caps-quick-link {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 22px 22px 24px;
            border: 1px solid ${HAIR2};
            background: ${BG2};
            text-decoration: none;
            color: ${INK};
            outline: none;
            cursor: pointer;
            transition: border-color 0.25s ease, background 0.25s ease;
          }
          .caps-quick-link:hover {
            border-color: ${GOLD};
            background: #0c0c0c;
          }
          .caps-quick-link:focus-visible {
            box-shadow: 0 0 0 2px ${GOLD}, 0 0 0 4px #0a0a0a;
          }
          .caps-all-services:focus-visible {
            outline: 2px solid ${GOLD};
            outline-offset: 6px;
          }
          @media (max-width: 720px) {
            .caps-quick-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 900px) {
            .section-caps { padding: 88px 24px 96px !important; }
          }
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
              {
                k: 'Studio',
                v: (
                  <>
                    No appointments — call or email and we’ll respond as soon as we can.
                    <br />
                    <span style={{ color: MUTED, fontSize: '0.9rem' }}>Mon – Fri · 8am–6pm</span>
                  </>
                ),
              },
              { k: 'Line', v: <a href="tel:7025517315" style={{ color: GOLD, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.06em', fontSize: '1.15rem' }}>+1 (702) 551 7315</a> },
              {
                k: 'Mail',
                v: (
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: INK, fontWeight: 300 }}>
                    {CONTACT_EMAIL}
                  </a>
                ),
              },
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

function WorkCard({ c }: { c: typeof CASES[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        minHeight: 0,
        background: '#080808',
        border: `1px solid ${hovered ? c.accent + '55' : HAIR}`,
        gridRow: c.featured ? 'span 2' : undefined,
        transition: 'border-color 0.5s cubic-bezier(0.2,0.8,0.2,1)',
        cursor: 'default',
      }}
    >
      {/* Photo + grade — Ken Burns on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 1.8s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        <img
          src={c.imageUrl}
          alt=""
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Tint + texture — keep opacity low so photography stays visible */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `${c.gradient}, ${c.hatch}`,
            opacity: 0.35,
          }}
        />
      </div>

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
          background:
            'linear-gradient(to top, rgba(4,4,4,0.88) 0%, rgba(4,4,4,0.38) 52%, transparent 100%)',
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
