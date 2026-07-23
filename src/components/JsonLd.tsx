import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  absoluteAssetUrl,
  absoluteUrl,
  BUSINESS_HOURS,
  EMAIL,
  INSTAGRAM_URL,
  LEGAL_NAME,
  LOCATION,
  PHONE_E164,
  SITE_NAME,
  SITE_URL,
} from '../config/site'
import { serviceGroups } from '../data/services'

const SCRIPT_ID = 'site-json-ld'

function buildSchema(pathname: string) {
  const logoUrl = absoluteAssetUrl('/favicon.svg')

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: LEGAL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: logoUrl,
    image: absoluteAssetUrl('/photos/Hero.webp'),
    description:
      'Vehicle wraps, fleet graphics, signs, decals, large-format printing, trade show displays, and marketing print in Las Vegas.',
    telephone: PHONE_E164,
    email: EMAIL,
    areaServed: {
      '@type': 'City',
      name: LOCATION.city,
      containedInPlace: {
        '@type': 'State',
        name: 'Nevada',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: LOCATION.city,
      addressRegion: LOCATION.region,
      addressCountry: LOCATION.country,
    },
    openingHours: BUSINESS_HOURS,
    sameAs: [INSTAGRAM_URL],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Printing and vehicle graphics services',
      itemListElement: serviceGroups.map((group, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: group.title,
          description: group.summary,
          url: absoluteUrl(`/services#${group.id}`),
          provider: { '@id': `${SITE_URL}/#localbusiness` },
          areaServed: LOCATION.label,
        },
      })),
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#localbusiness` },
    inLanguage: 'en-US',
  }

  const graph: Record<string, unknown>[] = [localBusiness, website]

  if (pathname === '/') {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': absoluteUrl('/'),
      url: absoluteUrl('/'),
      name: `${SITE_NAME} | Vehicle Wraps, Signs & Printing in Las Vegas`,
      description:
        'Vehicle wraps, fleet graphics, signs, decals, and large-format printing for Las Vegas businesses.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#localbusiness` },
    })
  }

  if (pathname === '/services') {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': absoluteUrl('/services'),
      url: absoluteUrl('/services'),
      name: 'Vehicle Wrap, Sign & Print Services | InMotion Wraps & Print',
      description:
        'Wraps, fleet graphics, signs, banners, trade show displays, and marketing print produced in-house in Las Vegas.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#localbusiness` },
    })
  }

  if (pathname === '/contact') {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': absoluteUrl('/contact'),
      url: absoluteUrl('/contact'),
      name: 'Contact | InMotion Wraps & Print',
      description: 'Request a quote for vehicle wraps, signs, banners, or marketing print in Las Vegas.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#localbusiness` },
    })
  }

  return graph
}

export default function JsonLd() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/services' && pathname !== '/contact') {
      document.getElementById(SCRIPT_ID)?.remove()
      return
    }

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = SCRIPT_ID
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(buildSchema(pathname))
  }, [pathname])

  return null
}
