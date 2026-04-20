import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageHero from "../components/PageHero";
import ServiceCategorySection from "../components/ServiceCategorySection";
import CTASection from "../components/CTASection";
import { serviceGroups } from "../data/services";
import { usePageMeta } from "../hooks/usePageMeta";

const CARD_BG       = '#0f0f0f'
const CARD_BG_HOV   = '#151515'
const DIVIDER       = '#1e1e1e'
const ACCENT        = '#F5C400'
const INK           = '#EDEAE4'
const INK2          = '#B8B4AC'
const MUTED         = '#6E6A63'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
}

function CategoryStrip({ onSelect }: { onSelect: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}
        className="category-strip"
      >
        {serviceGroups.map((g, i) => (
          <motion.button
            key={g.id}
            type="button"
            variants={cardVariants}
            onClick={() => onSelect(g.id)}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              background: CARD_BG,
              borderRight: i < serviceGroups.length - 1 ? `1px solid ${DIVIDER}` : undefined,
              borderTop: `1px solid ${DIVIDER}`,
              borderBottom: `1px solid ${DIVIDER}`,
              borderLeft: `1px solid ${DIVIDER}`,
              padding: 'clamp(18px, 3vw, 28px) clamp(16px, 3vw, 26px)',
              cursor: 'pointer',
              outline: 'none',
              minHeight: 'clamp(136px, 22vw, 168px)',
              overflow: 'hidden',
              willChange: 'transform',
            }}
            className="category-card"
          >
            {/* Bottom accent line — scaleX on hover (GPU composited, no reflow) */}
            <div className="card-accent-line" />

            <span className="card-num">{g.num}</span>

            <p className="card-title">{g.shortTitle}</p>

            <p className="card-tagline">{g.overviewTagline}</p>

            <div className="card-arrow">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M1 5h14M11 1l4 4-4 4" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <style>{`
        .category-card {
          transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
        }
        .category-card:hover {
          background: ${CARD_BG_HOV} !important;
          border-color: rgba(245,196,0,0.22) !important;
          transform: translateY(-3px);
        }
        .category-strip:has(.category-card:hover) .category-card:not(:hover) {
          opacity: 0.4;
        }

        .card-accent-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 100%;
          background: ${ACCENT};
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .category-card:hover .card-accent-line { transform: scaleX(1); }

        .card-num {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: ${MUTED};
          transition: color 0.25s ease;
        }
        .category-card:hover .card-num { color: ${ACCENT}; }

        .card-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(1.25rem, 2.2vw, 2rem);
          letter-spacing: 0.03em;
          line-height: 1;
          color: ${INK2};
          margin-top: 14px;
          transition: color 0.25s ease;
        }
        .category-card:hover .card-title { color: ${INK}; }

        .card-tagline {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1.5;
          color: ${MUTED};
          margin-top: 10px;
          transition: color 0.25s ease;
        }
        .category-card:hover .card-tagline { color: ${INK2}; }

        .card-arrow {
          margin-top: auto;
          padding-top: 18px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .category-card:hover .card-arrow { opacity: 1; transform: translateX(0); }

        .category-card:focus-visible {
          box-shadow: inset 0 0 0 2px rgba(245,196,0,0.5);
        }
        @media (max-width: 640px) {
          .category-strip { grid-template-columns: repeat(2, 1fr) !important; }
          .category-card { min-height: 140px !important; }
        }
        @media (max-width: 480px) {
          .category-strip { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default function Services() {
  usePageMeta(
    "Services, InMotion Wraps & Print | Wraps, Signs, Banners & Marketing Print",
    "InMotion Wraps & Print LLC, wraps, fleet graphics, signs, decals, banners, trade show hardware, and marketing print. Produced in-house. (702) 551-7315.",
  );

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-brand-bg">
      <PageHero
        label="What We Do"
        headline="Services Built for Impact"
        subtext="Four production lines, one team, from vinyl and large format through install and fulfillment."
      />

      <section style={{ borderBottom: `1px solid ${DIVIDER}`, backgroundColor: '#0D0D0D' }}>
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-0 lg:pt-12">
          <p style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: MUTED,
            marginBottom: 20,
          }}>
            Explore by category
          </p>
        </div>
        <CategoryStrip onSelect={scrollTo} />
      </section>

      {serviceGroups.map((group, i) => (
        <ServiceCategorySection key={group.id} group={group} index={i} />
      ))}

      <CTASection
        headline="Not sure what you need?"
        subtext="Tell us about your project and we'll recommend the best solution."
        buttonLabel="Talk to Us"
        buttonLink="/contact"
      />
    </main>
  );
}
