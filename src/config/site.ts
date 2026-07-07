/**
 * Site-wide SEO and business constants.
 * Set VITE_SITE_URL in production to override the default domain if needed.
 */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://inmotionwrapslv.com'

export const SITE_NAME = 'InMotion Wraps & Print'
export const LEGAL_NAME = 'InMotion Wraps & Print LLC'
export const SITE_TAGLINE = 'Vehicle wraps, fleet graphics, signs & printing'

export const PHONE_DISPLAY = '(702) 551-7315'
export const PHONE_E164 = '+17025517315'
export const PHONE_TEL = 'tel:+17025517315'
export const EMAIL = 'inmotionwraps@gmail.com'

export const LOCATION = {
  city: 'Las Vegas',
  region: 'NV',
  country: 'US',
  label: 'Las Vegas, NV',
} as const

export const BUSINESS_HOURS = 'Mo-Fr 08:00-18:00'

export const DEFAULT_OG_IMAGE = '/photos/Hero.webp'

export const INSTAGRAM_URL = 'https://www.instagram.com/inmotion_wraps'

/** Indexable routes for sitemap and canonical URLs */
export const SITE_ROUTES = ['/', '/services', '/contact'] as const

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`
}

export function absoluteAssetUrl(assetPath: string): string {
  const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`
  return `${SITE_URL}${normalized}`
}
