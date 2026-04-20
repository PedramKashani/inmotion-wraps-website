import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import logoLightSrc from '../assets/logo-light.webp'

const GOLD = '#C9A961'
const HAIR2 = '#262523'
const INK = '#EDEAE4'
const INK2 = '#B8B4AC'
const MUTED = '#6E6A63'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const linkStyle: React.CSSProperties = {
    fontFamily: '"Barlow Condensed", sans-serif',
    fontWeight: 400,
    fontSize: 11,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: INK2,
    position: 'relative',
    paddingBottom: 3,
    transition: 'color 0.3s',
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: scrolled ? '16px 48px' : '26px 48px',
        transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)',
        backgroundColor: scrolled ? 'rgba(10,10,10,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : undefined,
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : undefined,
        borderBottom: scrolled ? `1px solid ${HAIR2}` : '1px solid transparent',
      }}
    >
      {/* Left — logo (desktop col 1; mobile centered in row) */}
      <Link
        to="/"
        className="nav-logo-link"
        style={{ display: 'flex', alignItems: 'center', gap: 10, justifySelf: 'start' }}
      >
        <motion.span
          style={{ display: 'inline-flex', lineHeight: 0 }}
          initial={false}
          animate={
            reduceMotion
              ? false
              : { scale: [1, 1.04, 1] }
          }
          transition={{
            duration: 2.75,
            repeat: reduceMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          whileHover={
            reduceMotion ? undefined : { scale: 1.08, transition: { duration: 0.2, ease: 'easeOut' } }
          }
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        >
          <img src={logoLightSrc} alt="InMotion Wraps & Print" style={{ height: 28, width: 'auto', display: 'block' }} />
        </motion.span>
      </Link>

      {/* Center — nav links */}
      <nav
        aria-label="Main navigation"
        className="nav-links-desktop"
        style={{ display: 'flex', gap: 44, justifySelf: 'center' }}
      >
        {[
          { to: '/#work', label: 'Work', hash: true },
          { to: '/services', label: 'Services', hash: false },
          { to: '/contact', label: 'Contact', hash: false },
        ].map(({ to, label, hash }) => (
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
        ))}
      </nav>

      {/* Right — phone + CTA */}
      <div
        className="nav-right-desktop"
        style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: 28 }}
      >
        <a
          href="tel:7025517315"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 12,
            color: MUTED,
            letterSpacing: '0.04em',
            fontWeight: 400,
          }}
        >
          +1 (702) 551 7315
        </a>
        <Link
          to="/contact"
          style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: INK,
            padding: '12px 20px',
            border: `1px solid ${HAIR2}`,
            borderRadius: 1,
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = GOLD
            el.style.color = GOLD
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = HAIR2
            el.style.color = INK
          }}
        >
          Request a Quote
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        style={{
          justifySelf: 'end',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: INK,
          padding: 8,
          position: 'relative',
          zIndex: 101,
        }}
      >
        <div style={{ position: 'relative', width: 22, height: 14 }}>
          <motion.span
            animate={menuOpen
              ? { top: 6, rotate: 45, width: '100%' }
              : { top: 0, rotate: 0, width: '100%' }
            }
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute', left: 0, height: 1.5,
              background: 'currentColor', borderRadius: 2,
            }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 1.5,
              background: 'currentColor', borderRadius: 2, top: 6,
              transformOrigin: 'left center',
            }}
          />
          <motion.span
            animate={menuOpen
              ? { bottom: 8, rotate: -45, width: '100%' }
              : { bottom: 0, rotate: 0, width: '100%' }
            }
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute', left: 0, height: 1.5,
              background: 'currentColor', borderRadius: 2, bottom: 0,
            }}
          />
        </div>
      </button>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              backgroundColor: '#080808',
              display: 'flex',
              flexDirection: 'column',
              padding: 'clamp(96px, 18vh, 136px) clamp(28px, 8vw, 48px) clamp(40px, 8vw, 52px)',
            }}
          >
            {/* Subtle grid texture */}
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '64px 64px',
              }}
            />

            {/* Nav links */}
            <nav aria-label="Mobile navigation" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {[
                { to: '/#work', label: 'Work', num: '01', hash: true },
                { to: '/services', label: 'Services', num: '02', hash: false },
                { to: '/contact', label: 'Contact', num: '03', hash: false },
              ].map(({ to, label, num, hash }, i) => {
                const inner = (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{ borderTop: `1px solid ${HAIR2}` }}
                    className="mobile-nav-item"
                  >
                    <span style={{
                      display: 'flex', alignItems: 'baseline', gap: 16,
                      padding: '18px 0',
                    }}>
                      <span style={{
                        fontFamily: '"Barlow Condensed", sans-serif',
                        fontSize: 10, letterSpacing: '0.3em',
                        textTransform: 'uppercase', color: GOLD,
                        flexShrink: 0,
                      }}>
                        {num}
                      </span>
                      <span style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: 'clamp(2.6rem, 11vw, 3.8rem)',
                        letterSpacing: '0.02em', lineHeight: 1,
                        color: INK,
                        transition: 'color 0.2s',
                      }}
                        className="mobile-nav-label"
                      >
                        {label}
                      </span>
                    </span>
                  </motion.div>
                )

                return hash ? (
                  <a key={label} href={to} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {inner}
                  </a>
                ) : (
                  <Link key={label} to={to} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {inner}
                  </Link>
                )
              })}
              <div style={{ borderTop: `1px solid ${HAIR2}` }} />
            </nav>

            {/* Bottom — phone + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.38, ease: 'easeOut' }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, paddingTop: 28 }}
            >
              <a
                href="tel:7025517315"
                style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontSize: 13, letterSpacing: '0.12em',
                  color: MUTED, textDecoration: 'none',
                }}
              >
                +1 (702) 551 7315
              </a>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 500, fontSize: 11,
                  letterSpacing: '0.26em', textTransform: 'uppercase',
                  color: INK, padding: '14px 24px',
                  border: `1px solid ${GOLD}`,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                Request a Quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-right-desktop { display: none !important; }
          .nav-logo-link {
            grid-column: 2;
            grid-row: 1;
            justify-self: center !important;
          }
          .nav-hamburger {
            grid-column: 3;
            grid-row: 1;
            justify-self: end;
          }
        }
        @media (min-width: 901px) {
          .nav-hamburger { display: none !important; }
          .nav-logo-link {
            grid-column: 1;
            grid-row: 1;
            justify-self: start !important;
          }
        }
        .mobile-nav-item:hover .mobile-nav-label { color: ${GOLD}; }
      `}</style>
    </header>
  )
}
