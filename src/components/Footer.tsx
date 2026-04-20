import { Link } from 'react-router-dom'
import logoSrc from '../assets/logo-light.webp'

const HAIR = '#1C1C1C'
const MUTED = '#6E6A63'
const GOLD = '#F5C400'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${HAIR}`,
        backgroundColor: '#0A0A0A',
        fontFamily: '"Barlow Condensed", sans-serif',
        color: MUTED,
      }}
    >
      {/* Main row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
          padding: '40px 48px',
        }}
        className="footer-main"
      >
        <Link to="/" style={{ display: 'inline-flex', lineHeight: 0, flexShrink: 0 }}>
          <img
            src={logoSrc}
            alt="InMotion Wraps & Print"
            style={{ height: 22, width: 'auto', display: 'block', opacity: 0.75 }}
          />
        </Link>

        <nav
          aria-label="Footer navigation"
          style={{ display: 'flex', gap: 32, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase' }}
        >
          {[
            { to: '/#capabilities', label: 'Capabilities', hash: true },
            { to: '/#work', label: 'Work', hash: true },
            { to: '/contact', label: 'Contact', hash: false },
          ].map(({ to, label, hash }) => (
            hash ? (
              <a
                key={label}
                href={to}
                style={{ color: MUTED, transition: 'color 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED }}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                style={{ color: MUTED, transition: 'color 0.25s', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED }}
              >
                {label}
              </Link>
            )
          ))}
        </nav>

        <span style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase' }}>
          Cert. 3M &amp; Avery · (702) 551-7315
        </span>
      </div>

      {/* Copyright rule */}
      <div
        style={{
          borderTop: `1px solid ${HAIR}`,
          padding: '16px 48px',
          fontSize: 10,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#3A3A3A',
        }}
        className="footer-copy"
      >
        © MMXXVI InMotion Wraps &amp; Print LLC
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-main { padding: 32px 24px !important; flex-direction: column; align-items: flex-start; gap: 28px !important; }
          .footer-copy { padding: 14px 24px !important; }
        }
      `}</style>
    </footer>
  )
}
