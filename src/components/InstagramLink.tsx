import type { AnchorHTMLAttributes } from 'react'

export const INSTAGRAM_URL = 'https://www.instagram.com/inmotion_wraps'

interface InstagramLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: number
}

export function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function InstagramLink({
  size = 20,
  className,
  style,
  ...props
}: InstagramLinkProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="InMotion Wraps on Instagram"
      className={className}
      style={{ display: 'inline-flex', lineHeight: 0, ...style }}
      {...props}
    >
      <InstagramIcon size={size} />
    </a>
  )
}
