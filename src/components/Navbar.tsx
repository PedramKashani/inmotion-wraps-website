import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import logoLightSrc from '../assets/logo-light.webp'

const GOLD = '#C9A961'
const HAIR2 = '#262523'
const INK = '#EDEAE4'
const INK2 = '#B8B4AC'
const MUTED = '#6E6A63'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
      {/* Left — logo */}
      <Link
        to="/"
        style={{ display: 'flex', alignItems: 'center', gap: 10, justifySelf: 'start' }}
      >
        <img src={logoLightSrc} alt="InMotion Wraps & Print" style={{ height: 28, width: 'auto' }} />
      </Link>

      {/* Center — nav links */}
      <nav
        className="nav-links-desktop"
        style={{ display: 'flex', gap: 44, justifySelf: 'center' }}
      >
        {[
          { to: '/#capabilities', label: 'Capabilities' },
          { to: '/#work', label: 'Work' },
          { to: '/services', label: 'Services' },
          { to: '/contact', label: 'Contact' },
        ].map(({ to, label }) => (
          <a
            key={label}
            href={to}
            style={linkStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = INK }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = INK2 }}
          >
            {label}
          </a>
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
        style={{ justifySelf: 'end', background: 'none', border: 'none', cursor: 'pointer', color: INK, padding: '6px' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {menuOpen ? (
            <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
          ) : (
            <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(10,10,10,0.96)',
              backdropFilter: 'blur(16px)',
              borderBottom: `1px solid ${HAIR2}`,
              overflow: 'hidden',
              gridColumn: '1 / -1',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', padding: '24px', gap: 20 }}>
              {[
                { to: '/#capabilities', label: 'Capabilities' },
                { to: '/#work', label: 'Work' },
                { to: '/services', label: 'Services' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <a
                  key={label}
                  href={to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 400,
                    fontSize: 13,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: INK2,
                  }}
                >
                  {label}
                </a>
              ))}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: INK,
                  padding: '14px 20px',
                  border: `1px solid ${GOLD}`,
                  textAlign: 'center',
                  marginTop: 4,
                }}
              >
                Request a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-right-desktop { display: none !important; }
        }
        @media (min-width: 901px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </header>
  )
}
