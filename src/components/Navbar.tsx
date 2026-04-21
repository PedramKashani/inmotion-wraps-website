import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import logoLightSrc from '../assets/logo-light.webp'

const GOLD = '#C9A961'
const HAIR2 = '#262523'
const INK = '#EDEAE4'
const INK2 = '#B8B4AC'
const MUTED = '#6E6A63'

const NAV_LINKS = [
  { to: '/#work',    label: 'Work',     blurb: 'Projects & installs',  num: '01', hash: true  },
  { to: '/services', label: 'Services', blurb: 'Wraps, print & more',  num: '02', hash: false },
  { to: '/contact',  label: 'Contact',  blurb: '',                     num: '03', hash: false },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const reduceMotion  = useReducedMotion()
  const location      = useLocation()
  const hamburgerRef  = useRef<HTMLButtonElement>(null)
  const prevOpenRef   = useRef(false)

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // iOS-friendly scroll lock: cleanup must restore scroll using the Y captured
  // when the menu opened. A separate "else" branch fails because React runs the
  // previous effect's cleanup *before* the next effect body — cleanup clears
  // body.style.top, so reading it in else never works.
  useEffect(() => {
    if (!menuOpen) return
    const y = window.scrollY
    document.body.style.setProperty('overflow', 'hidden')
    document.body.style.setProperty('position', 'fixed')
    document.body.style.setProperty('top', `-${y}px`)
    document.body.style.setProperty('width', '100%')
    return () => {
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('position')
      document.body.style.removeProperty('top')
      document.body.style.removeProperty('width')
      window.scrollTo(0, y)
    }
  }, [menuOpen])

  // Close menu on any React Router route change (back/forward, programmatic nav).
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Restore focus to the hamburger when menu closes so keyboard users don't lose context.
  useEffect(() => {
    if (prevOpenRef.current && !menuOpen) hamburgerRef.current?.focus()
    prevOpenRef.current = menuOpen
  }, [menuOpen])

  // Escape key closes menu
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  const linkStyle: React.CSSProperties = {
    fontFamily: '"Barlow Condensed", sans-serif',
    fontWeight: 400,
    fontSize: 11,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: INK2,
    paddingBottom: 3,
    transition: 'color 0.3s',
  }

  // Navbar height mirrors the CSS transition so the overlay spacer tracks it.
  const navbarHeight = scrolled ? 60 : 80

  return (
    <>
      {/* ─── Navbar bar ───────────────────────────────────────────────────────
          IMPORTANT: backdropFilter is disabled when the menu is open.
          backdrop-filter creates a new CSS containing block, which would
          confine any position:fixed child to the header's bounding box
          instead of the full viewport — the root cause of the overlay bug.
      ──────────────────────────────────────────────────────────────────────── */}
      <header
        className="nav-header fixed top-0 left-0 right-0 z-[10100] grid w-full grid-cols-[1fr_auto_1fr] items-center transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{
          padding: scrolled ? '16px 48px' : '26px 48px',
          backgroundColor: menuOpen
            ? '#030303'
            : scrolled
              ? 'rgba(10,10,10,0.82)'
              : 'transparent',
          backdropFilter:    !menuOpen && scrolled ? 'blur(16px)' : undefined,
          WebkitBackdropFilter: !menuOpen && scrolled ? 'blur(16px)' : undefined,
          borderBottom: menuOpen || scrolled ? `1px solid ${HAIR2}` : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="nav-logo-link"
          style={{ display: 'flex', alignItems: 'center', gap: 10, justifySelf: 'start' }}
          onClick={close}
        >
          <motion.span
            style={{ display: 'inline-flex', lineHeight: 0 }}
            initial={false}
            animate={reduceMotion ? false : { scale: [1, 1.04, 1] }}
            transition={{ duration: 2.75, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
            whileHover={reduceMotion ? undefined : { scale: 1.08, transition: { duration: 0.2, ease: 'easeOut' } }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            <img
              src={logoLightSrc}
              alt="InMotion Wraps & Print"
              style={{ height: 28, width: 'auto', display: 'block' }}
            />
          </motion.span>
        </Link>

        {/* Desktop nav links */}
        <nav
          aria-label="Main navigation"
          className="nav-links-desktop"
          style={{ display: 'flex', gap: 44, justifySelf: 'center' }}
        >
          {NAV_LINKS.map(({ to, label, hash }) =>
            hash ? (
              <a
                key={label}
                href={to}
                style={linkStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = INK }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = INK2 }}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                style={linkStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = INK }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = INK2 }}
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop right: phone + CTA */}
        <div
          className="nav-right-desktop"
          style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: 28 }}
        >
          <a
            href="tel:7025517315"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 12, color: MUTED, letterSpacing: '0.04em', fontWeight: 400,
            }}
          >
            +1 (702) 551 7315
          </a>
          <Link
            to="/contact"
            style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 500, fontSize: 11, letterSpacing: '0.26em',
              textTransform: 'uppercase', color: INK,
              padding: '12px 20px', border: `1px solid ${HAIR2}`,
              borderRadius: 1, transition: 'all 0.3s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = GOLD; el.style.color = GOLD
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = HAIR2; el.style.color = INK
            }}
          >
            Request a Quote
          </Link>
        </div>

        {/* Hamburger — 44×44 min touch target */}
        <button
          ref={hamburgerRef}
          type="button"
          className={`nav-hamburger justify-self-end cursor-pointer rounded-md border border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 ${
            menuOpen
              ? 'border-brand-border/80 bg-black/75 text-brand-accent'
              : 'text-brand-text hover:border-brand-border/60 hover:bg-white/[0.04]'
          }`}
          style={{
            minWidth: 44, minHeight: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 10,
          }}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-sheet"
        >
          <div style={{ position: 'relative', width: 22, height: 14 }}>
            <motion.span
              animate={menuOpen ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'currentColor', borderRadius: 2 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'currentColor', borderRadius: 2, top: 6, transformOrigin: 'left center' }}
            />
            <motion.span
              animate={menuOpen ? { bottom: 8, rotate: -45 } : { bottom: 0, rotate: 0 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'currentColor', borderRadius: 2, bottom: 0 }}
            />
          </div>
        </button>

        <style>{`
          @media (max-width: 900px) {
            .nav-header        { padding-left: 20px !important; padding-right: 20px !important; }
            .nav-links-desktop { display: none !important; }
            .nav-right-desktop { display: none !important; }
            .nav-logo-link     { grid-column: 2; grid-row: 1; justify-self: center !important; }
            .nav-hamburger     { grid-column: 3; grid-row: 1; display: flex !important; }
          }
          @media (min-width: 901px) {
            .nav-hamburger     { display: none !important; }
            .nav-logo-link     { grid-column: 1; grid-row: 1; justify-self: start !important; }
            .nav-mobile-sheet  { display: none !important; }
          }
        `}</style>
      </header>

      {/* ─── Mobile full-screen sheet ──────────────────────────────────────────
          Rendered as a SIBLING of <header>, not a child. This is intentional:
          any element with backdrop-filter becomes the CSS containing block for
          position:fixed descendants, so the overlay must live outside the header
          to correctly cover the full viewport (inset-0 / 100dvh).

          z-[10090] sits below the header (z-[10100]) so the navbar bar and its
          hamburger button remain visible and tappable above the sheet.
      ──────────────────────────────────────────────────────────────────────── */}
      {/* mode="wait" ensures the exit animation fully completes before a new
          enter starts, preventing double-render flicker on rapid taps. */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            id="mobile-nav-sheet"
            key="mobile-menu-sheet"
            className="nav-mobile-sheet fixed inset-0 z-[10090] flex flex-col"
            style={{ height: '100dvh', backgroundColor: '#030303' }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={close}
          >
            {/* Spacer — mirrors navbar height so no content hides behind it.
                Shares the same transition timing as the header.
                Tapping this area (above the content panel) also closes the menu. */}
            <div
              className="shrink-0 transition-all duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{ height: navbarHeight, borderBottom: `1px solid ${HAIR2}` }}
            />

            {/* Content area — stopPropagation prevents taps here from bubbling
                to the sheet's onClick={close} handler above. */}
            <div className="flex flex-1 flex-col min-h-0 overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Nav links — vertically centered, scrollable on short viewports */}
            <nav
              aria-label="Mobile navigation"
              className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-6 gap-0.5"
            >
              {NAV_LINKS.map(({ to, label, blurb, num, hash }, i) => {
                const inner = (
                  <>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                      <span style={{
                        fontFamily: '"Barlow Condensed", sans-serif',
                        fontSize: 10, fontWeight: 500, letterSpacing: '0.24em',
                        color: GOLD, textTransform: 'uppercase',
                        flexShrink: 0,
                      }}>
                        {num}
                      </span>
                      <span style={{
                        fontFamily: '"Barlow Condensed", sans-serif',
                        // clamp keeps labels readable across 320px–900px viewports
                        fontSize: 'clamp(28px, 8.5vw, 42px)',
                        fontWeight: 600, letterSpacing: '0.06em',
                        color: INK, textTransform: 'uppercase', lineHeight: 1,
                      }}>
                        {label}
                      </span>
                    </div>
                    {blurb && (
                      <span style={{
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                        fontSize: 13, color: MUTED, lineHeight: 1.4,
                        display: 'block', marginTop: 5, paddingLeft: 22,
                      }}>
                        {blurb}
                      </span>
                    )}
                  </>
                )

                // 72px min height = well above the 44px WCAG touch-target floor
                const itemStyle: React.CSSProperties = {
                  minHeight: 72,
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  padding: '14px 16px', borderRadius: 10,
                  textDecoration: 'none', color: 'inherit', outline: 'none',
                  transition: 'background-color 0.18s',
                }

                const hoverOn  = (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)' }
                const hoverOff = (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }

                return (
                  <motion.div
                    key={label}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.12, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {hash ? (
                      <a href={to} style={itemStyle} onClick={close}
                        onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link to={to} style={itemStyle} onClick={close}
                        onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                      >
                        {inner}
                      </Link>
                    )}
                  </motion.div>
                )
              })}
            </nav>

            {/* Bottom CTA strip — fixed to sheet bottom with safe-area inset */}
            <div
              className="flex shrink-0 items-center justify-between gap-4 px-5 py-4"
              style={{
                borderTop: `1px solid ${HAIR2}`,
                backgroundColor: '#08080a',
                // env(safe-area-inset-bottom) accounts for iPhone home indicator
                paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
              }}
            >
              <a
                href="tel:7025517315"
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: 13, color: MUTED, letterSpacing: '0.02em', fontWeight: 400,
                  textDecoration: 'none',
                  minHeight: 44, display: 'flex', alignItems: 'center',
                }}
              >
                +1 (702) 551 7315
              </a>
              <Link
                to="/contact"
                onClick={close}
                style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 500, fontSize: 11, letterSpacing: '0.24em',
                  textTransform: 'uppercase', color: INK,
                  padding: '12px 20px',
                  border: `1px solid ${GOLD}`,
                  backgroundColor: 'rgba(201,169,97,0.1)',
                  whiteSpace: 'nowrap', textDecoration: 'none',
                  minHeight: 44, display: 'flex', alignItems: 'center',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(201,169,97,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(201,169,97,0.1)' }}
              >
                Request a Quote
              </Link>
            </div>
            </div> {/* end content stop-propagation wrapper */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
