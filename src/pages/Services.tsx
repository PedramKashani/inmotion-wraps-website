import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import ServiceGroup from '../components/ServiceGroup'
import CTASection from '../components/CTASection'
import { serviceGroups } from '../data/services'

// ─── How We Work ─────────────────────────────────────────────────────────────

const processSteps = [
  {
    num: '01',
    title: 'Brief Us',
    description:
      'Tell us about your project — vehicle type, quantity, timeline, and any design notes. We respond with a clear quote within 24 hours.',
  },
  {
    num: '02',
    title: 'Approve the Design',
    description:
      'Our team creates artwork from your brand assets. You review and sign off on every detail before a single sheet of vinyl is cut.',
  },
  {
    num: '03',
    title: 'Install or Deliver',
    description:
      'Professional installation for wraps, fast production and shipping for print materials. We handle it all in-house.',
  },
]

// ─── Floating section nav ─────────────────────────────────────────────────────

function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const ids = serviceGroups.map((g) => g.id)

    const onScroll = () => {
      setVisible(window.scrollY > 480)

      // Walk sections in reverse — first one whose top is above 45% viewport = active
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          setActiveId(id)
          return
        }
      }
      setActiveId('')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Jump to section"
          className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-5"
        >
          {serviceGroups.map((g) => {
            const active = activeId === g.id
            return (
              <button
                key={g.id}
                onClick={() => scrollTo(g.id)}
                aria-label={`Jump to ${g.shortTitle}`}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span
                  className={`font-heading font-medium text-[10px] tracking-widest transition-colors duration-200 ${
                    active ? 'text-brand-accent' : 'text-brand-border group-hover:text-brand-muted'
                  }`}
                >
                  {g.num}
                </span>
                <span
                  className={`block h-px transition-all duration-300 ${
                    active
                      ? 'w-8 bg-brand-accent'
                      : 'w-4 bg-brand-border group-hover:w-6 group-hover:bg-brand-muted'
                  }`}
                />
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Services() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main>
      <FloatingNav />

      <PageHero
        label="What We Do"
        headline="Services Built for Impact"
        subtext="From full vehicle wraps to print materials — we handle it all in-house."
      />

      {/* ── Category jump strip ──────────────────────────────────────────── */}
      <div className="border-b border-brand-border bg-brand-bg sticky top-16 z-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-0 scrollbar-none">
            {serviceGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => scrollTo(g.id)}
                className="flex items-center gap-2.5 py-4 pr-10 shrink-0 border-b-2 border-transparent hover:border-brand-accent/40 transition-colors duration-200 group cursor-pointer"
              >
                <span className="font-heading font-medium text-[10px] text-brand-muted tracking-widest group-hover:text-brand-accent transition-colors duration-200">
                  {g.num}
                </span>
                <span className="font-heading font-semibold text-sm text-brand-secondary group-hover:text-brand-text transition-colors duration-200">
                  {g.shortTitle}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── How We Work ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-heading font-medium text-brand-accent text-[10px] tracking-[0.28em] uppercase mb-10"
          >
            How It Works
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
            {/* Connector line, desktop */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-[18px] left-[calc(33.3%+1rem)] right-[calc(33.3%+1rem)] h-px bg-brand-border"
            />

            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="relative"
              >
                {/* Circle marker */}
                <div className="w-9 h-9 rounded-full border border-brand-border bg-brand-bg flex items-center justify-center mb-5 relative z-10">
                  <span className="font-heading font-medium text-[10px] text-brand-accent tracking-widest">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-brand-text text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service groups ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6">
        {serviceGroups.map((group, i) => (
          <ServiceGroup key={group.id} {...group} reversed={i % 2 !== 0} />
        ))}
      </section>

      <CTASection
        headline="Not sure what you need?"
        subtext="Tell us about your project and we'll recommend the best solution."
        buttonLabel="Talk to Us"
        buttonLink="/contact"
      />
    </main>
  )
}
