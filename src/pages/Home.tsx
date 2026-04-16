import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
import CTASection from "../components/CTASection";
import Marquee from "../components/Marquee";
import VinylWrapAnimation from "../components/VinylWrapAnimation";
import { serviceCategoryIcon } from "../components/serviceCategoryVisuals";
import { serviceGroups, serviceMarqueeTags } from "../data/services";
import { usePageMeta } from "../hooks/usePageMeta";

// ─── Gallery placeholders ─────────────────────────────────────────────────────
// Replace these with real <img> tags once photos are provided.
// Expected photos per BLUEPRINT.md section 9.

const galleryItems = [
  {
    id: 1,
    label: "Full Vehicle Wrap",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    label: "Fleet Lineup",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    label: "Trade Show Display",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    label: "Construction Hoarding",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    label: "Print Materials Flat Lay",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 6,
    label: "Window Graphics",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
  },
];

// ─── Stats, update these values to match the real business ──────────────────

const stats = [
  { value: 500, suffix: "+", label: "Vehicles Wrapped" },
  { value: 10, suffix: "+", label: "Years in Business" },
  { value: 48, suffix: "hr", label: "Avg. Turnaround" },
  { value: 100, suffix: "%", label: "Satisfaction Rate" },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

// ─── Animated counter ────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  usePageMeta(
    "InMotion Wraps & Print, Vehicle Wraps, Signs & Printing",
    "InMotion Wraps & Print LLC, vehicle wraps, fleet graphics, signs and decals, trade show displays, large format printing, and marketing materials. Call (702) 551-7315.",
  );

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
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
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
            style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}
          >
            YOUR BRAND.
            <br />
            <span className="text-brand-accent">WRAPPED</span> IN MOTION.
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp(0.25)}
            className="text-brand-secondary text-lg md:text-xl max-w-lg mx-auto mb-8 leading-relaxed"
          >
            Vehicle wraps, signs, trade show hardware, large format printing &
            marketing materials.
          </motion.p>

          {/* Vinyl wrap metaphor, outline draw + gloss sweep */}
          <motion.div {...fadeUp(0.3)} className="mb-12 md:mb-14">
            <VinylWrapAnimation />
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.42)}
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
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-muted"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
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
                  style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}
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
      <Marquee items={serviceMarqueeTags} />

      {/* ── Services Preview ──────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div {...fadeUpInView()} className="mb-16">
            <p className="text-brand-accent text-[10px] font-semibold tracking-[0.28em] uppercase mb-4">
              What We Do
            </p>
            <h2 className="font-heading font-bold text-[clamp(2.5rem,6vw,4rem)] text-brand-text leading-none">
              Our Services
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {serviceGroups.map((svc, i) => (
              <motion.div
                key={svc.id}
                {...fadeUpInView(i * 0.12)}
                className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden group hover:border-brand-accent/30 transition-colors duration-300"
              >
                {/* Icon area */}
                <div
                  className="h-44 relative flex items-center justify-center overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1400 0%, #161616 100%)",
                  }}
                >
                  <div className="text-brand-accent/25 group-hover:text-brand-accent/45 transition-colors duration-300">
                    {serviceCategoryIcon(svc.id)}
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
                    {svc.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6">
                    {svc.summary}
                  </p>
                  <Link
                    to={`/services#${svc.id}`}
                    className="inline-flex items-center gap-2 text-brand-accent text-xs font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-200 cursor-pointer"
                  >
                    Learn More
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
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
          <motion.div {...fadeUpInView()} className="mb-16">
            <p className="text-brand-accent text-[10px] font-semibold tracking-[0.28em] uppercase mb-4">
              Our Work
            </p>
            <h2 className="font-heading font-bold text-[clamp(2.5rem,6vw,4rem)] text-brand-text leading-none">
              Recent Projects
            </h2>
          </motion.div>

          {/* Grid, swap divs for <img> once photos are available */}
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
                <img
                  src={item.image}
                  alt={`${item.label} placeholder`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/[0.04] transition-colors duration-300" />

                {/* Label, slides up on hover */}
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
  );
}
