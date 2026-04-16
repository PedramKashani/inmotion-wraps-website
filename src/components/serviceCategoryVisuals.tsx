import type { ReactNode } from 'react'

const icons: Record<string, ReactNode> = {
  'wraps-graphics': (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="22" width="48" height="22" rx="4" />
      <path d="M16 22l6-10h20l6 10" />
      <circle cx="18" cy="44" r="5" />
      <circle cx="46" cy="44" r="5" />
      <rect x="24" y="16" width="16" height="6" rx="1" />
      <line x1="4" y1="33" x2="8" y2="33" />
      <line x1="56" y1="33" x2="60" y2="33" />
    </svg>
  ),
  'signs-decals': (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="14" width="44" height="36" rx="2" />
      <line x1="18" y1="24" x2="46" y2="24" />
      <line x1="18" y1="32" x2="40" y2="32" />
      <line x1="18" y1="40" x2="34" y2="40" />
      <path d="M32 50v8M26 58h12" />
    </svg>
  ),
  'banners-trade-show': (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="12" width="36" height="28" rx="1" />
      <line x1="20" y1="18" x2="44" y2="18" />
      <line x1="20" y1="24" x2="40" y2="24" />
      <line x1="20" y1="30" x2="36" y2="30" />
      <path d="M32 40v14M24 54h16" />
      <circle cx="32" cy="8" r="2" />
    </svg>
  ),
  'marketing-print': (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="10" width="24" height="32" rx="1" />
      <rect x="30" y="18" width="20" height="28" rx="1" />
      <line x1="18" y1="16" x2="34" y2="16" />
      <line x1="18" y1="22" x2="34" y2="22" />
      <line x1="34" y1="24" x2="46" y2="24" />
      <line x1="34" y1="30" x2="44" y2="30" />
    </svg>
  ),
}

export function serviceCategoryIcon(categoryId: string): ReactNode {
  return icons[categoryId] ?? icons['wraps-graphics']
}
