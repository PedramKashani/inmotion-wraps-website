import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from 'framer-motion'
import { serviceGroups } from '../data/services'

type SceneId = (typeof serviceGroups)[number]['id']

const SCENE_MS = 6000

const springSnappy = { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.85 }
const springSoft = { type: 'spring' as const, stiffness: 180, damping: 22, mass: 0.9 }
const springPop = { type: 'spring' as const, stiffness: 320, damping: 18, mass: 0.6 }

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

function sceneCaption(id: SceneId): string {
  const g = serviceGroups.find((x) => x.id === id)
  if (!g) return id
  return `${g.num} ${g.shortTitle}`
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
      <svg
        className="absolute inset-0 w-full h-full text-brand-border/55"
        viewBox="0 0 320 120"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M28 88 L40 62 L78 56 L102 34 L218 34 L248 52 L288 52 L302 64 L302 88 L278 88 Q268 88 264 80 L264 76 Q260 68 248 68 Q236 68 232 76 L232 80 Q228 88 218 88 L118 88 Q108 88 104 80 L104 76 Q100 68 88 68 Q76 68 72 76 L72 80 Q68 88 58 88 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ pathLength: { duration: reduceMotion ? 0 : 2, ease: [0.16, 1, 0.3, 1] } }}
        />
        <motion.circle
          cx="88"
          cy="78"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={reduceMotion ? { opacity: 0.9 } : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : springPop}
        />
        <motion.circle
          cx="248"
          cy="78"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={reduceMotion ? { opacity: 0.9 } : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { ...springPop, delay: 0.12 }}
        />
      </svg>
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
      <svg
        className="absolute inset-0 w-full h-full text-brand-border/55"
        viewBox="0 0 320 120"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M118 22 L202 22 L202 94 L118 94 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M160 94 L160 102 M142 102 L178 102"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.5, duration: reduceMotion ? 0 : 0.55, ease: [0.33, 1, 0.68, 1] }}
        />
      </svg>
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
      <svg
        className="absolute inset-0 w-full h-full text-brand-border/55"
        viewBox="0 0 320 120"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M44 36 L276 36 L276 78 L44 78 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M158 78 L158 96 M138 96 L182 96"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.45, duration: reduceMotion ? 0 : 0.55, ease: [0.33, 1, 0.68, 1] }}
        />
      </svg>
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
      <svg
        className="absolute inset-0 w-full h-full text-brand-border/55"
        viewBox="0 0 320 120"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M148 30 L228 30 L228 98 L148 98 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M92 38 L172 38 L172 106 L92 106 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0 : 0.95, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
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
    <div className="relative mx-auto w-full max-w-[min(100%,380px)] md:max-w-[440px] h-[132px] md:h-[148px] select-none">
      <div className="absolute inset-x-0 top-0 bottom-11 overflow-hidden" aria-hidden>
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

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 pt-0.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={scene}
            initial={reduceMotion ? undefined : { opacity: 0, y: 6, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4, filter: 'blur(3px)' }}
            transition={reduceMotion ? { duration: 0 } : springSnappy}
            className="font-heading text-[10px] uppercase tracking-[0.2em] text-brand-muted text-center leading-tight"
          >
            {sceneCaption(scene)}
          </motion.span>
        </AnimatePresence>

        <LayoutGroup>
          <div className="relative flex flex-wrap items-center justify-center gap-1.5 max-w-full px-1">
            {serviceGroups.map((g) => {
              const active = g.id === scene
              return (
                <motion.button
                  key={g.id}
                  type="button"
                  onClick={() => setScene(g.id)}
                  aria-label={`Show ${g.title} illustration`}
                  className="relative h-7 w-7 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 shrink-0"
                  whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                  transition={springSnappy}
                >
                  <span
                    className={`h-1.5 rounded-full transition-colors duration-200 ${
                      active ? 'w-5 bg-brand-accent' : 'w-1.5 bg-brand-border hover:bg-brand-muted'
                    }`}
                  />
                  {active && !reduceMotion && (
                    <motion.span
                      layoutId="sceneProgressRing"
                      className="pointer-events-none absolute inset-0 rounded-full border border-brand-accent/35"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </LayoutGroup>
      </div>
    </div>
  )
}
