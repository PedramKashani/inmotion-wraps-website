import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, animate } from 'framer-motion'
import CTASection from '../components/CTASection'
import Marquee from '../components/Marquee'

// ─── Service data ────────────────────────────────────────────────────────────

const services = [
  {
    id: 1,
    num: '01',
    name: 'Vehicle Wraps & Fleet Graphics',
    description:
      'Full vehicle wraps, fleet branding, and large-format vehicle graphics engineered to turn heads on the road.',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="22" width="48" height="22" rx="4" />
        <path d="M16 22l6-10h20l6 10" />
        <circle cx="18" cy="44" r="5" />
        <circle cx="46" cy="44" r="5" />
        <rect x="24" y="16" width="16" height="6" rx="1" />
        <line x1="4" y1="33" x2="8" y2="33" />
        <line x1="56" y1="33" x2="60" y2="33" />
      </svg>
    ),
  },
  {
    id: 2,
    num: '02',
    name: 'Printing & Large Format Graphics',
    description:
      'Banners, construction hoarding, event displays, window & wall graphics — printed large and printed right.',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="8" width="40" height="30" rx="2" />
        <line x1="20" y1="16" x2="44" y2="16" />
        <line x1="20" y1="22" x2="44" y2="22" />
        <line x1="20" y1="28" x2="34" y2="28" />
        <path d="M12 38H8a2 2 0 00-2 2v8a2 2 0 002 2h48a2 2 0 002-2v-8a2 2 0 00-2-2h-4" />
        <circle cx="50" cy="43" r="2" />
        <rect x="22" y="50" width="20" height="8" rx="1" />
      </svg>
    ),
  },
  {
    id: 3,
    num: '03',
    name: 'Marketing & Promotional Materials',
    description:
      'Business cards, flyers, stickers, magnets, and flags — everything your brand needs to stay top of mind.',
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="32,6 38,24 58,24 42,36 48,54 32,42 16,54 22,36 6,24 26,24" />
      </svg>
    ),
  },
]

// ─── Gallery placeholders ─────────────────────────────────────────────────────
// Replace these with real <img> tags once photos are provided.
// Expected photos per BLUEPRINT.md section 9.

const galleryItems = [
  { id: 1, label: 'Full Vehicle Wrap', accent: 'rgba(245,196,0,0.06)' },
  { id: 2, label: 'Fleet Lineup', accent: 'rgba(245,196,0,0.04)' },
  { id: 3, label: 'Trade Show Display', accent: 'rgba(245,196,0,0.06)' },
  { id: 4, label: 'Construction Hoarding', accent: 'rgba(245,196,0,0.03)' },
  { id: 5, label: 'Print Materials Flat Lay', accent: 'rgba(245,196,0,0.05)' },
  { id: 6, label: 'Window Graphics', accent: 'rgba(245,196,0,0.04)' },
]

// ─── Stats — update these values to match the real business ──────────────────

const stats = [
  { value: 500, suffix: '+', label: 'Vehicles Wrapped' },
  { value: 10,  suffix: '+', label: 'Years in Business' },
  { value: 48,  suffix: 'hr', label: 'Avg. Turnaround' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate' },
]

const marqueeItems = [
  'Vehicle Wraps', 'Fleet Graphics', 'Large Format Printing',
  'Custom Design', 'Vinyl Banners', 'Trade Show Displays',
  'Construction Hoarding', 'Window Graphics', 'Business Cards',
  'Stickers & Decals', 'Premium Vinyl', 'Toronto & GTA',
]

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

// ─── Animated counter ────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setDisplay(target); return }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, target])

  return <span ref={ref}>{display}{suffix}</span>
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 72% 12%, rgba(245,196,0,0.11) 0%, transparent 52%),
            radial-gradient(ellipse at 18% 88%, rgba(245,196,0,0.05) 0%, transparent 45%),
            #0D0D0D
          `,
        }}
      >
        {/* Subtle grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-16">
          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0)}
            className="text-brand-accent text-xs font-semibold tracking-[0.28em] uppercase mb-7"
          >
            Vehicle Wraps & Printing
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display leading-none tracking-wide text-brand-text mb-8"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}
          >
            YOUR BRAND.<br />
            <span className="text-brand-accent">WRAPPED</span> IN MOTION.
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp(0.25)}
            className="text-brand-secondary text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Vehicle wraps, fleet graphics & large format printing.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.38)}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="bg-brand-accent text-brand-bg font-semibold text-xs px-8 py-4 uppercase tracking-widest rounded cursor-pointer hover:brightness-110 transition-all duration-200"
            >
              Get a Free Quote
            </Link>
            <a
              href="#gallery"
              className="border border-white/25 text-brand-text font-semibold text-xs px-8 py-4 uppercase tracking-widest rounded cursor-pointer hover:border-brand-accent hover:text-brand-accent transition-all duration-200"
            >
              View Our Work
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-muted"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-b border-brand-border py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUpInView(i * 0.08)}
                className="text-center"
              >
                <div
                  className="font-display text-brand-accent leading-none mb-2"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-heading font-medium text-brand-muted text-[10px] tracking-[0.2em] uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────────────── */}
      <Marquee items={marqueeItems} />

      {/* ── Services Preview ──────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <motion.div
            {...fadeUpInView()}
            className="mb-16"
          >
            <p className="text-brand-accent text-[10px] font-semibold tracking-[0.28em] uppercase mb-4">What We Do</p>
            <h2 className="font-heading font-bold text-[clamp(2.5rem,6vw,4rem)] text-brand-text leading-none">
              Our Services
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                {...fadeUpInView(i * 0.12)}
                className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden group cursor-pointer hover:border-brand-accent/30 transition-colors duration-300"
              >
                {/* Icon area */}
                <div
                  className="h-44 relative flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #1a1400 0%, #161616 100%)',
                  }}
                >
                  <div className="text-brand-accent/25 group-hover:text-brand-accent/45 transition-colors duration-300">
                    {svc.icon}
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute top-4 left-5 font-heading text-[4.5rem] leading-none text-white/[0.04] select-none"
                  >
                    {svc.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-brand-text leading-tight mb-3">
                    {svc.name}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6">
                    {svc.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-brand-accent text-xs font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-200 cursor-pointer"
                  >
                    Learn More
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ───────────────────────────────────────────────── */}
      <section id="gallery" className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <motion.div
            {...fadeUpInView()}
            className="mb-16"
          >
            <p className="text-brand-accent text-[10px] font-semibold tracking-[0.28em] uppercase mb-4">Our Work</p>
            <h2 className="font-heading font-bold text-[clamp(2.5rem,6vw,4rem)] text-brand-text leading-none">
              Recent Projects
            </h2>
          </motion.div>

          {/* Grid — swap divs for <img> once photos are available */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative aspect-[4/3] rounded overflow-hidden bg-brand-surface group cursor-pointer"
              >
                {/* Placeholder background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 40% 40%, ${item.accent} 0%, transparent 70%), #161616`,
                  }}
                />

                {/* Photo placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center text-brand-border group-hover:text-[#3A3A3A] transition-colors duration-300">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/[0.04] transition-colors duration-300" />

                {/* Label — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-brand-text text-[10px] font-semibold tracking-[0.2em] uppercase">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to wrap your brand?"
        subtext="Get in touch for a free quote. Fast turnaround. Professional results."
        buttonLabel="Contact Us Today"
        buttonLink="/contact"
      />

    </main>
  )
}
