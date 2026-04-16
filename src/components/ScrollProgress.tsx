import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-brand-accent z-[9999] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
