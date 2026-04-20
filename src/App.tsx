import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Marquee from './components/Marquee'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import { serviceMarqueeTags } from './data/services'

function NotFound() {
  return (
    <main style={{ backgroundColor: '#0A0A0A', color: '#EDEAE4', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(48px, 10vh, 80px) clamp(16px, 6vw, 24px)' }}>
      <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(6rem, 20vw, 14rem)', lineHeight: 1, color: '#1C1C1C', userSelect: 'none' }}>404</div>
      <p style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6E6A63', marginTop: -8, marginBottom: 48 }}>Page not found</p>
      <Link to="/" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 500, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#EDEAE4', padding: '18px 32px', border: '1px solid #2A2A2A', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </main>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      {/* Marquee pinned to bottom of viewport */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 98 }}>
        <Marquee items={serviceMarqueeTags} />
      </div>
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
