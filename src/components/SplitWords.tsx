import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SplitWordsProps {
  text: string
  className?: string
  /** Extra delay before the first word enters */
  delay?: number
  /** Stagger between each word */
  stagger?: number
}

/**
 * Splits text into words and reveals each one with a mask slide-up.
 * Respects prefers-reduced-motion automatically via Framer Motion.
 */
export default function SplitWords({ text, className, delay = 0, stagger = 0.07 }: SplitWordsProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const words = text.split(' ')

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.28em' }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{
              duration: 0.65,
              delay: delay + i * stagger,
              ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
