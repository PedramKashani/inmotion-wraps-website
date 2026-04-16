import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ServiceGroupData } from '../data/services'

interface ServiceGroupProps extends ServiceGroupData {
  reversed?: boolean
}

export default function ServiceGroup({ id, num, title, items, ctaLabel, ctaLink, reversed = false }: ServiceGroupProps) {
  // Swap this div for <img loading="lazy" src="..." alt="..." className="w-full h-full object-cover" />
  // once real photos are available (3:2 landscape, min 1400px wide).
  const ImagePlaceholder = (
    <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-brand-surface">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 35% 40%, rgba(245,196,0,0.07) 0%, transparent 60%), #161616',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-brand-border">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    </div>
  )

  const Content = (
    <div className="flex flex-col justify-center relative">
      {/* Ghost decorative number */}
      <span
        aria-hidden="true"
        className="absolute -bottom-6 -right-4 font-display leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(7rem, 18vw, 14rem)',
          color: 'rgba(245,196,0,0.03)',
        }}
      >
        {num}
      </span>

      <p className="font-heading font-medium text-[10px] text-brand-muted tracking-[0.28em] uppercase mb-2 relative z-10">
        {num} — {title}
      </p>
      <h2
        className="font-heading font-bold text-brand-text leading-tight mb-8 relative z-10"
        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
      >
        {title}
      </h2>

      <ul className="mb-8 border-t border-brand-border relative z-10">
        {items.map((item) => (
          <li
            key={item.name}
            className="relative flex gap-4 items-start py-4 border-b border-brand-border group/item cursor-default"
          >
            {/* Accent slide-in bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-accent origin-top scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200" />

            <span className="text-brand-accent mt-[3px] shrink-0 transition-transform duration-200 group-hover/item:translate-x-0.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <div>
              <p className="font-heading font-semibold text-brand-text text-sm leading-snug transition-colors duration-200 group-hover/item:text-white">
                {item.name}
              </p>
              <p className="text-brand-muted text-xs mt-0.5 leading-relaxed transition-colors duration-200 group-hover/item:text-brand-secondary">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to={ctaLink}
        className="inline-block self-start bg-brand-accent text-brand-bg font-semibold text-xs px-7 py-3.5 uppercase tracking-widest rounded cursor-pointer hover:brightness-110 transition-all duration-200 relative z-10"
      >
        {ctaLabel}
      </Link>
    </div>
  )

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 border-b border-brand-border last:border-b-0 scroll-mt-20"
    >
      {reversed ? (
        <>
          {Content}
          {ImagePlaceholder}
        </>
      ) : (
        <>
          {ImagePlaceholder}
          {Content}
        </>
      )}
    </motion.div>
  )
}
