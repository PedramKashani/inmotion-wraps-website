import PageHero from "../components/PageHero";
import ServiceCategorySection from "../components/ServiceCategorySection";
import CTASection from "../components/CTASection";
import { serviceGroups } from "../data/services";
import { usePageMeta } from "../hooks/usePageMeta";

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
    <main>
      <PageHero
        label="What We Do"
        headline="Services Built for Impact"
        subtext="Four production lines, one team, from vinyl and large format through install and fulfillment."
      />

      {/* Non-sticky overview: jump to deep sections (anchors preserved for Home/Footer) */}
      <section className="border-b border-brand-border bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
          <p className="font-heading font-medium text-brand-muted text-[10px] tracking-[0.22em] uppercase mb-5 text-center lg:text-left">
            Explore by category
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {serviceGroups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => scrollTo(g.id)}
                className="text-left rounded-xl border border-brand-border bg-brand-bg px-4 py-5 md:px-5 md:py-6 transition-all duration-200 hover:border-brand-accent/40 hover:bg-brand-surface cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50"
              >
                <span className="font-heading font-medium text-brand-accent text-[10px] tracking-widest">
                  {g.num}
                </span>
                <p className="font-heading font-bold text-brand-text text-base md:text-lg mt-2 leading-tight">
                  {g.shortTitle}
                </p>
                <p className="text-brand-muted text-xs mt-2 leading-snug line-clamp-2">
                  {g.overviewTagline}
                </p>
              </button>
            ))}
          </div>
        </div>
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
