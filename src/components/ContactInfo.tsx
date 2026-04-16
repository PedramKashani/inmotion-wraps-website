// Update phone, email, hours, and location to match the business details.

const details = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    display: '(000) 000-0000',
    href: 'tel:+10000000000',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    display: 'info@inmotionwraps.com',
    href: 'mailto:info@inmotionwraps.com',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Hours',
    display: 'Mon–Fri, 8am–6pm',
    href: null,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    display: 'Greater Toronto Area, ON',
    href: null,
  },
]

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-heading font-medium text-[10px] text-brand-accent tracking-[0.28em] uppercase mb-6">
        Contact Details
      </p>

      <div className="flex flex-col gap-6">
        {details.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-brand-surface border border-brand-border flex items-center justify-center text-brand-accent shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="font-heading font-medium text-[10px] text-brand-muted tracking-[0.2em] uppercase mb-0.5">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-brand-secondary text-sm hover:text-brand-accent transition-colors duration-200 cursor-pointer"
                >
                  {item.display}
                </a>
              ) : (
                <p className="text-brand-secondary text-sm">{item.display}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-brand-border">
        <p className="text-brand-muted text-xs leading-relaxed">
          Prefer to talk? Give us a call during business hours and we'll discuss your project right away.
        </p>
      </div>
    </div>
  )
}
