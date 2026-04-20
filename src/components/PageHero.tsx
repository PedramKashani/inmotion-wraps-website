import { motion } from 'framer-motion'
import SplitWords from './SplitWords'

interface PageHeroProps {
  label: string
  headline: string
  subtext: string
}

export default function PageHero({ label, headline, subtext }: PageHeroProps) {
  return (
    <section
      className="relative flex items-end overflow-hidden pt-16 sm:pt-24 md:pt-32 lg:pt-36 pb-8 sm:pb-10 md:pb-16"
      style={{
        background: `
          radial-gradient(ellipse at 80% 0%, rgba(245,196,0,0.06) 0%, transparent 50%),
          #0D0D0D
        `,
      }}
    >
      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-border" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Label slides in */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-heading font-medium text-brand-accent text-[10px] tracking-[0.28em] uppercase mb-4"
        >
          {label}
        </motion.p>

        {/* Headline — word-by-word mask reveal */}
        <h1
          className="font-heading font-bold text-brand-text leading-none mb-5"
          style={{ fontSize: 'clamp(1.85rem, 7vw, 5rem)' }}
        >
          <SplitWords text={headline} delay={0.1} stagger={0.06} />
        </h1>

        {/* Subtext fades up */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="text-brand-secondary text-base md:text-lg max-w-xl leading-relaxed"
        >
          {subtext}
        </motion.p>
      </div>
    </section>
  )
}
