import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Dot follows precisely
  const dotX = useSpring(x, { stiffness: 600, damping: 30, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 600, damping: 30, mass: 0.2 })

  // Ring follows with lag
  const ringX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.5 })

  useEffect(() => {
    // Only activate for devices with a fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.body.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      // Detect hover by computed cursor style of element under the pointer
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovering(!!el && window.getComputedStyle(el).cursor === 'pointer')
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.style.cursor = ''
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10001] rounded-full bg-brand-accent"
        style={{
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          width: hovering ? 6 : 8,
          height: hovering ? 6 : 8,
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />
      {/* Ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          border: `1px solid rgba(245,196,0,${hovering ? 0.7 : 0.3})`,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  )
}
