import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import type { ServiceGroupData } from "../data/services";
import { serviceCategoryIcon } from "./serviceCategoryVisuals";

interface ServiceCategorySectionProps {
  group: ServiceGroupData;
  index: number;
}

const externalCategoryImages: Record<string, string> = {
  /** Gloved tech working a vehicle hood in-shop — reads clearly as hands-on wrap / finish work */
  "wraps-graphics":
    "https://images.unsplash.com/photo-1632605157148-6313421c504b?auto=format&fit=crop&w=1600&q=80",
  /** https://unsplash.com/photos/a-black-and-white-photo-of-a-store-window-SYquPBkhKl8 */
  "signs-decals":
    "https://images.unsplash.com/photo-1740955803167-be35f9bfddd2?auto=format&fit=crop&w=1600&q=80",
  /** On-brand booth / large-format mock — asset in `/public` */
  "banners-trade-show": "/services-banners-trade-show.webp",
  /** On-brand marketing print & stationery mock — asset in `/public` */
  "marketing-print": "/services-marketing-print.webp",
};

function CategoryVisualPanel({
  num,
  categoryId,
  isInView,
}: {
  num: string;
  categoryId: string;
  isInView: boolean;
}) {
  return (
    <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-[400px] rounded-xl overflow-hidden border border-brand-border bg-brand-surface">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 40% 35%, rgba(245,196,0,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(245,196,0,0.05) 0%, transparent 50%), #161616",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute -left-2 -bottom-4 font-display leading-none select-none pointer-events-none text-brand-accent/[0.07]"
        style={{ fontSize: "clamp(6rem, 22vw, 12rem)" }}
      >
        {num}
      </span>
      <div className="relative z-10 h-full min-h-[inherit]">
        <img
          src={externalCategoryImages[categoryId]}
          alt={
            categoryId === "wraps-graphics"
              ? "Technician in gloves working on a vehicle finish in the shop"
              : categoryId === "signs-decals"
                ? "Black and white photograph of a retail store window"
                : categoryId === "banners-trade-show"
                  ? "Trade show booth with banners, fabric displays, flags, and large-format signage"
                  : categoryId === "marketing-print"
                    ? "Marketing products and stationery: brochures, business cards, labels, and branded print on display"
                    : "Example photograph for this service category"
          }
          loading="lazy"
          className="h-full w-full object-cover"
          referrerPolicy={externalCategoryImages[categoryId].startsWith("http") ? "no-referrer" : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute right-5 bottom-5 text-brand-accent/90 scale-[1.1] lg:scale-[1.2] drop-shadow-[0_0_30px_rgba(245,196,0,0.2)]">
          {serviceCategoryIcon(categoryId)}
        </div>
      </div>

      {/* Sweep reveal curtain — accent overlay retracts right on scroll-in */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-brand-accent z-20 origin-right"
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.05,
          ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        }}
      />
    </div>
  );
}

const bulletVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.2 },
  },
};

const bulletItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function ServiceCategorySection({
  group,
  index,
}: ServiceCategorySectionProps) {
  const {
    id,
    num,
    title,
    shortTitle,
    summary,
    previewBullets,
    items,
    ctaLabel,
    ctaLink,
  } = group;
  const visualOnRight = index % 2 === 1;

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-mt-24 border-b border-brand-border ${index % 2 === 0 ? "bg-brand-bg" : "bg-brand-surface"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-20 gap-8 md:gap-12 lg:gap-y-0 items-center">
          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className={visualOnRight ? "lg:order-2" : "lg:order-1"}
          >
            <CategoryVisualPanel num={num} categoryId={id} isInView={isInView} />
          </motion.div>

          {/* Content panel */}
          <div className={`flex flex-col ${visualOnRight ? "lg:order-1" : "lg:order-2"}`}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="font-heading font-medium text-[10px] text-brand-accent tracking-[0.28em] uppercase mb-3"
            >
              {num}, {shortTitle}
            </motion.p>

            {/* Heading mask reveal */}
            <div className="overflow-hidden mb-5">
              <motion.h2
                className="font-heading font-bold text-brand-text leading-[1.08]"
                style={{ fontSize: "clamp(1.65rem, 3.8vw, 2.5rem)" }}
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.08,
                  ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
                }}
              >
                {title}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="text-brand-secondary text-sm md:text-base leading-relaxed max-w-xl mb-8"
            >
              {summary}
            </motion.p>

            {/* Staggered bullet list */}
            <motion.ul
              className="space-y-3 mb-6 md:mb-9"
              variants={bulletVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {previewBullets.map((line) => (
                <motion.li
                  key={line}
                  variants={bulletItemVariants}
                  className="flex gap-3 items-start text-sm text-brand-text"
                >
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-accent"
                    aria-hidden
                  />
                  <span className="text-brand-secondary leading-relaxed">
                    {line}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.38, ease: "easeOut" }}
            >
              <Link
                to={ctaLink}
                className="inline-flex w-full sm:w-auto justify-center sm:justify-start self-start bg-brand-accent text-brand-bg font-semibold text-xs px-6 sm:px-8 py-3.5 uppercase tracking-widest rounded cursor-pointer hover:brightness-110 transition-all duration-200 mb-2"
              >
                {ctaLabel}
              </Link>
            </motion.div>

            <details className="group mt-6 border border-brand-border rounded-lg bg-brand-bg/40 open:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary hover:text-brand-text transition-colors [&::-webkit-details-marker]:hidden">
                <span>View all capabilities</span>
                <span
                  className="text-brand-accent transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-brand-border px-4 pb-4 pt-1 max-h-[min(50vh,22rem)] md:max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain">
                <ul className="divide-y divide-brand-border/80">
                  {items.map((item) => (
                    <li key={item.name} className="py-3.5 first:pt-3">
                      <p className="font-heading font-semibold text-brand-text text-sm leading-snug">
                        {item.name}
                      </p>
                      <p className="text-brand-muted text-xs mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
