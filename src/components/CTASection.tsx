import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CTASectionProps {
  headline: string;
  subtext: string;
  buttonLabel: string;
  buttonLink: string;
}

export default function CTASection({
  headline,
  subtext,
  buttonLabel,
  buttonLink,
}: CTASectionProps) {
  return (
    <section className="py-20 bg-brand-surface border-y border-brand-border">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <h2
          className="font-display text-brand-text leading-none mb-4"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          {headline}
        </h2>
        <p className="text-brand-muted text-base md:text-lg mb-10">{subtext}</p>
        <Link
          to={buttonLink}
          className="inline-block bg-brand-accent text-brand-bg font-semibold text-xs px-10 py-4 uppercase tracking-widest rounded cursor-pointer hover:brightness-110 transition-all duration-200"
        >
          {buttonLabel}
        </Link>
      </motion.div>
    </section>
  );
}
