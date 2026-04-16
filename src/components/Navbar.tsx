import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoSrc from '../assets/logo.webp'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 cursor-pointer ${
      isActive ? 'text-brand-accent' : 'text-brand-secondary hover:text-brand-text'
    }`

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? '#0D0D0D' : 'transparent',
        borderBottom: scrolled ? '1px solid #2A2A2A' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoSrc} alt="InMotion Wraps" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="bg-brand-accent text-brand-bg font-semibold text-xs px-5 py-2.5 uppercase tracking-widest rounded cursor-pointer hover:brightness-110 transition-all duration-200"
          >
            Get a Quote
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-brand-text cursor-pointer p-1.5 -mr-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-brand-surface border-t border-brand-border"
          >
            <nav className="flex flex-col px-6 py-5 gap-5">
              <NavLink to="/" end onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</NavLink>
              <NavLink to="/services" onClick={() => setMenuOpen(false)} className={navLinkClass}>Services</NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={navLinkClass}>Contact</NavLink>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-brand-accent text-brand-bg font-semibold text-xs px-5 py-3 uppercase tracking-widest rounded text-center cursor-pointer hover:brightness-110 transition-all duration-200"
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
