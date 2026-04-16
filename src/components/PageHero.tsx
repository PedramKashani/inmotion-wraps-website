import { motion } from 'framer-motion'

interface PageHeroProps {
  label: string
  headline: string
  subtext: string
}

export default function PageHero({ label, headline, subtext }: PageHeroProps) {
  return (
    <section
      className="relative flex items-end overflow-hidden pt-36 pb-16"
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-heading font-medium text-brand-accent text-[10px] tracking-[0.28em] uppercase mb-4">
            {label}
          </p>
          <h1
            className="font-heading font-bold text-brand-text leading-none mb-5"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            {headline}
          </h1>
          <p className="text-brand-secondary text-base md:text-lg max-w-xl leading-relaxed">
            {subtext}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
