const HAIR = '#1C1C1C'
const MUTED = '#6E6A63'
const GOLD = '#C9A961'

export default function Footer() {
  return (
    <footer
      style={{
        padding: '48px',
        borderTop: `1px solid ${HAIR}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
        fontFamily: '"Barlow Condensed", sans-serif',
        fontSize: 11,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: MUTED,
        backgroundColor: '#0A0A0A',
      }}
    >
      <span>© MMXXVI · INMOTION WRAPS</span>

      <div style={{ display: 'flex', gap: 32 }}>
        {[
          { to: '/#capabilities', label: 'Capabilities' },
          { to: '/#work', label: 'Work' },
          { to: '/contact', label: 'Contact' },
        ].map(({ to, label }) => (
          <a
            key={label}
            href={to}
            style={{ color: MUTED, transition: 'color 0.25s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED }}
          >
            {label}
          </a>
        ))}
      </div>

      <span>Cert. 3M &amp; Avery · (702) 551-7315</span>

      <style>{`
        @media (max-width: 600px) {
          footer { padding: 32px 24px; font-size: 10px; letter-spacing: 0.24em; }
        }
      `}</style>
    </footer>
  )
}
