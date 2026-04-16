import { Link } from 'react-router-dom'
import logoLightSrc from '../assets/logo-light.webp'
import { serviceGroups } from '../data/services'

export default function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1 max-w-xs">
            <img src={logoLightSrc} alt="InMotion Wraps & Print" className="h-7 w-auto mb-3" />
            <p className="text-brand-muted text-sm leading-relaxed">
              Your brand, wrapped in motion. Wraps, signs, banners, trade show graphics & marketing print.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <span className="text-brand-muted text-[10px] font-semibold uppercase tracking-[0.2em]">Navigate</span>
            <Link to="/" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">Home</Link>
            <Link to="/services" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">Services</Link>
            <Link to="/contact" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">Contact</Link>
          </div>

          {/* Service anchors — internal links for SEO + UX */}
          <div className="flex flex-col gap-3">
            <span className="text-brand-muted text-[10px] font-semibold uppercase tracking-[0.2em]">Services</span>
            {serviceGroups.map((g) => (
              <Link
                key={g.id}
                to={`/services#${g.id}`}
                className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer"
              >
                {g.shortTitle}
              </Link>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <span className="text-brand-muted text-[10px] font-semibold uppercase tracking-[0.2em]">Contact</span>
            <a href="tel:+17025517315" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">
              (702) 551-7315
            </a>
            <a href="mailto:inmotionwraps@gmail.com" className="text-brand-secondary hover:text-brand-accent text-sm transition-colors duration-200 cursor-pointer">
              inmotionwraps@gmail.com
            </a>
            <p className="text-brand-muted text-sm">Mon–Fri, 8am–6pm</p>
          </div>
        </div>

        <div className="border-t border-brand-border pt-6">
          <p className="text-brand-muted text-xs text-center tracking-wide">
            © {new Date().getFullYear()} InMotion Wraps & Print LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
