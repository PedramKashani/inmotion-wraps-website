export default function ContactInfo() {
  return (
    <div className="flex flex-col">

      {/* Section overline */}
      <p
        className="font-heading font-medium uppercase text-brand-accent mb-5"
        style={{ fontSize: 10, letterSpacing: '0.3em' }}
      >
        Reach Us
      </p>

      {/* Primary action — phone number leads the hierarchy */}
      <a
        href="tel:+17025517315"
        className="font-heading font-semibold text-brand-text hover:text-brand-accent transition-colors duration-200 leading-none mb-3"
        style={{ fontSize: 'clamp(28px, 5.5vw, 36px)', letterSpacing: '0.03em' }}
      >
        (702) 551-7315
      </a>

      {/* Secondary — email sits close to the number, lower weight */}
      <a
        href="mailto:inmotionwraps@gmail.com"
        className="font-body text-brand-secondary hover:text-brand-text transition-colors duration-200 mb-10"
        style={{ fontSize: 13, letterSpacing: '0.01em' }}
      >
        inmotionwraps@gmail.com
      </a>

      {/* Thin rule separates contact from supporting context */}
      <div className="border-t border-brand-border mb-7" />

      {/* Supporting info — de-emphasised, no labels, no icons */}
      <div className="flex flex-col gap-2">
        <p
          className="font-heading font-medium uppercase text-brand-muted"
          style={{ fontSize: 11, letterSpacing: '0.16em' }}
        >
          Mon – Fri &nbsp; 8 am – 6 pm
        </p>
        <p
          className="font-heading font-medium uppercase text-brand-muted"
          style={{ fontSize: 11, letterSpacing: '0.16em' }}
        >
          Las Vegas, NV
        </p>
      </div>

      {/* Soft reassurance note */}
      <p
        className="font-body text-brand-muted mt-6 leading-relaxed"
        style={{ fontSize: 12 }}
      >
        We respond within one business day.
      </p>

    </div>
  )
}
