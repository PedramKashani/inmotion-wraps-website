import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { serviceGroups } from '../data/services'

type SceneId = (typeof serviceGroups)[number]['id']

const SCENE_MS = 6000

const springSoft = { type: 'spring' as const, stiffness: 180, damping: 22, mass: 0.9 }

const shellVariants = {
  initial: { opacity: 0, scale: 0.96, y: 14, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  },
}


function SceneChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-0 top-0 bottom-7 rounded-2xl border border-brand-border/70 bg-brand-surface/30 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(245,196,0,0.06)',
        }}
        initial={false}
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {children}
    </div>
  )
}

/** 01 — Wraps & commercial graphics (vehicle metaphor) */
function WrapsScene({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <SceneChrome>
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(245,196,0,0) 0%, rgba(245,196,0,0.14) 48%, rgba(245,196,0,0.05) 100%)',
          transformOrigin: 'left center',
        }}
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={reduceMotion ? { duration: 0 } : { ...springSoft, delay: 0.2 }}
      />
      {!reduceMotion && <GlossSweep axis="x" />}
    </SceneChrome>
  )
}

/** 02 — Signs & decals (vertical face) */
function SignsScene({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <SceneChrome>
      <motion.div
        className="absolute pointer-events-none rounded-sm"
        style={{
          left: '19%',
          right: '19%',
          top: '19%',
          bottom: '30%',
          background:
            'linear-gradient(95deg, rgba(245,196,0,0) 0%, rgba(245,196,0,0.12) 50%, rgba(245,196,0,0.04) 100%)',
          transformOrigin: 'left center',
        }}
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={reduceMotion ? { duration: 0 } : { ...springSoft, delay: 0.22 }}
      />
      {!reduceMotion && <GlossSweep axis="x" narrow />}
    </SceneChrome>
  )
}

/** 03 — Banners & large format (wide roll-up) */
function BannersScene({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <SceneChrome>
      <motion.div
        className="absolute inset-[22%_8%_30%_8%] rounded-md pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(245,196,0,0) 0%, rgba(245,196,0,0.13) 50%, rgba(245,196,0,0.05) 100%)',
          transformOrigin: 'left center',
        }}
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={reduceMotion ? { duration: 0 } : { ...springSoft, delay: 0.2 }}
      />
      {!reduceMotion && <GlossSweep axis="x" />}
    </SceneChrome>
  )
}

/** 04 — Marketing print (stacked cards / collateral) */
function MarketingScene({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <SceneChrome>
      <motion.div
        className="absolute inset-[18%_12%_22%_12%] rounded-sm pointer-events-none"
        style={{
          background:
            'linear-gradient(115deg, rgba(245,196,0,0) 0%, rgba(245,196,0,0.11) 45%, rgba(245,196,0,0.04) 100%)',
          transformOrigin: '20% 50%',
        }}
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={reduceMotion ? { duration: 0 } : { ...springSoft, delay: 0.35 }}
      />
      {!reduceMotion && <GlossSweep axis="x" narrow />}
    </SceneChrome>
  )
}

function SceneVisual({ id, reduceMotion }: { id: SceneId; reduceMotion: boolean | null }) {
  switch (id) {
    case 'wraps-graphics':
      return <WrapsScene reduceMotion={reduceMotion} />
    case 'signs-decals':
      return <SignsScene reduceMotion={reduceMotion} />
    case 'banners-trade-show':
      return <BannersScene reduceMotion={reduceMotion} />
    case 'marketing-print':
      return <MarketingScene reduceMotion={reduceMotion} />
    default:
      return <WrapsScene reduceMotion={reduceMotion} />
  }
}

function GlossSweep({ axis, narrow }: { axis: 'x' | 'y'; narrow?: boolean }) {
  const isX = axis === 'x'
  return (
    <motion.div
      className={`absolute pointer-events-none rounded-full ${narrow ? 'w-[30%]' : 'w-[36%]'}`}
      style={
        isX
          ? {
              top: '12%',
              bottom: '22%',
              left: 0,
              skewX: -14,
              background: 'linear-gradient(90deg, transparent 0%, rgba(245,196,0,0.5) 45%, transparent 100%)',
              boxShadow: '0 0 28px rgba(245,196,0,0.14)',
            }
          : {
              left: '16%',
              right: '16%',
              top: '14%',
              height: '34%',
              skewY: 5,
              background: 'linear-gradient(180deg, transparent 0%, rgba(245,196,0,0.45) 50%, transparent 100%)',
              boxShadow: '0 0 24px rgba(245,196,0,0.12)',
            }
      }
      animate={
        isX
          ? { x: ['-40%', '360%'], opacity: [0, 1, 1, 0] }
          : { y: ['-40%', '230%'], opacity: [0, 1, 1, 0] }
      }
      transition={{
        duration: 2.65,
        repeat: Infinity,
        ease: [0.45, 0, 0.2, 1],
        repeatDelay: 0.65,
        times: [0, 0.12, 0.5, 1],
      }}
    />
  )
}

export default function VinylWrapAnimation() {
  const reduceMotion = useReducedMotion()
  const [scene, setScene] = useState<SceneId>(serviceGroups[0].id)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setScene((s) => {
        const i = serviceGroups.findIndex((g) => g.id === s)
        const next = (i + 1) % serviceGroups.length
        return serviceGroups[next].id
      })
    }, SCENE_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,380px)] md:max-w-[440px] h-[110px] md:h-[124px] select-none">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            variants={reduceMotion ? undefined : shellVariants}
            initial={reduceMotion ? false : 'initial'}
            animate={reduceMotion ? { opacity: 1 } : 'animate'}
            exit={reduceMotion ? undefined : 'exit'}
            className="absolute inset-0"
          >
            <SceneVisual id={scene} reduceMotion={reduceMotion} />
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
