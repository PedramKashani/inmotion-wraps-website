import { Link } from 'react-router-dom'
import logoSrc from '../assets/logo.webp'

export default function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">

          {/* Logo + tagline */}
          <div className="max-w-xs">
            <img src={logoSrc} alt="InMotion Wraps" className="h-7 w-auto mb-3" />
            <p className="text-brand-muted text-sm leading-relaxed">
              Your brand, wrapped in motion. Vehicle wraps, fleet graphics & large format printing.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <span className="text-brand-muted text-[10px] font-semibold uppercase tracking-[0.2em]">Navigate</span>
            <Link to="/" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">Home</Link>
            <Link to="/services" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">Services</Link>
            <Link to="/contact" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">Contact</Link>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <span className="text-brand-muted text-[10px] font-semibold uppercase tracking-[0.2em]">Contact</span>
            <a href="tel:+10000000000" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">
              (000) 000-0000
            </a>
            <a href="mailto:info@inmotionwraps.com" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">
              info@inmotionwraps.com
            </a>
            <p className="text-brand-muted text-sm">Mon–Fri, 8am–6pm</p>
          </div>
        </div>

        <div className="border-t border-brand-border pt-6">
          <p className="text-brand-muted text-xs text-center tracking-wide">
            © {new Date().getFullYear()} InMotion Wraps. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
