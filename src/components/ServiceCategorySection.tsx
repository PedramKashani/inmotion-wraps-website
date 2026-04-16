import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { ServiceGroupData } from "../data/services";
import { serviceCategoryIcon } from "./serviceCategoryVisuals";

interface ServiceCategorySectionProps {
  group: ServiceGroupData;
  index: number;
}

const externalCategoryImages: Record<string, string> = {
  "wraps-graphics":
    "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1600&q=80",
  "signs-decals":
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
  "banners-trade-show":
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
  "marketing-print":
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1600&q=80",
};

function CategoryVisualPanel({
  num,
  categoryId,
}: {
  num: string;
  categoryId: string;
}) {
  return (
    <div className="relative min-h-[280px] lg:min-h-[400px] rounded-xl overflow-hidden border border-brand-border bg-brand-surface">
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
          alt="Temporary service placeholder"
          loading="lazy"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute right-5 bottom-5 text-brand-accent/90 scale-[1.1] lg:scale-[1.2] drop-shadow-[0_0_30px_rgba(245,196,0,0.2)]">
          {serviceCategoryIcon(categoryId)}
        </div>
      </div>
    </div>
  );
}

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

  return (
    <section
      id={id}
      className={`scroll-mt-24 border-b border-brand-border ${index % 2 === 0 ? "bg-brand-bg" : "bg-brand-surface"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-20 gap-12 lg:gap-y-0 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className={visualOnRight ? "lg:order-2" : "lg:order-1"}
          >
            <CategoryVisualPanel num={num} categoryId={id} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
            className={`flex flex-col ${visualOnRight ? "lg:order-1" : "lg:order-2"}`}
          >
            <p className="font-heading font-medium text-[10px] text-brand-accent tracking-[0.28em] uppercase mb-3">
              {num}, {shortTitle}
            </p>
            <h2
              className="font-heading font-bold text-brand-text leading-[1.08] mb-5"
              style={{ fontSize: "clamp(1.65rem, 3.8vw, 2.5rem)" }}
            >
              {title}
            </h2>
            <p className="text-brand-secondary text-sm md:text-base leading-relaxed max-w-xl mb-8">
              {summary}
            </p>

            <ul className="space-y-3 mb-9">
              {previewBullets.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 items-start text-sm text-brand-text"
                >
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-accent"
                    aria-hidden
                  />
                  <span className="text-brand-secondary leading-relaxed">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to={ctaLink}
              className="inline-flex self-start bg-brand-accent text-brand-bg font-semibold text-xs px-8 py-3.5 uppercase tracking-widest rounded cursor-pointer hover:brightness-110 transition-all duration-200 mb-2"
            >
              {ctaLabel}
            </Link>

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
              <div className="border-t border-brand-border px-4 pb-4 pt-1 max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
