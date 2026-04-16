interface MarqueeProps {
  items: string[]
  /** seconds to complete one full loop */
  duration?: number
}

export default function Marquee({ items, duration = 28 }: MarqueeProps) {
  // Double items for seamless loop — animate -50% = exactly one set width
  const track = [...items, ...items]

  return (
    <div
      className="overflow-hidden border-y border-brand-border bg-brand-surface py-3.5 select-none"
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-6">
            <span className="font-heading font-medium text-[11px] text-brand-muted tracking-[0.22em] uppercase">
              {item}
            </span>
            <span style={{ color: 'rgba(245,196,0,0.4)', fontSize: '7px' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
