import { useEffect } from 'react'
import { absoluteAssetUrl, absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from '../config/site'

export interface PageMetaOptions {
  title: string
  description?: string
  /** Route path for canonical/og:url, e.g. `/services` */
  path?: string
  ogImage?: string
  /** When true, adds noindex,nofollow (404 and utility pages) */
  noindex?: boolean
}

function upsertMeta(
  selector: string,
  create: () => HTMLMetaElement,
  content: string,
) {
  let el = document.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets document title, meta description, Open Graph, Twitter Card,
 * canonical URL, and robots directives for client-routed pages.
 */
export function usePageMeta(options: PageMetaOptions): void
export function usePageMeta(title: string, description?: string): void
export function usePageMeta(
  titleOrOptions: string | PageMetaOptions,
  legacyDescription?: string,
) {
  const options: PageMetaOptions =
    typeof titleOrOptions === 'string'
      ? { title: titleOrOptions, description: legacyDescription }
      : titleOrOptions

  const { title, description, path = '/', ogImage = DEFAULT_OG_IMAGE, noindex = false } = options

  useEffect(() => {
    document.title = title

    if (description) {
      upsertMeta(
        'meta[name="description"]',
        () => {
          const meta = document.createElement('meta')
          meta.setAttribute('name', 'description')
          return meta
        },
        description,
      )
    }

    const canonical = absoluteUrl(path)
    const image = absoluteAssetUrl(ogImage)

    upsertLink('canonical', canonical)

    const ogTags: [string, string][] = [
      ['og:type', 'website'],
      ['og:site_name', SITE_NAME],
      ['og:title', title],
      ['og:url', canonical],
    ]
    if (description) ogTags.push(['og:description', description])
    ogTags.push(['og:image', image])

    for (const [property, content] of ogTags) {
      upsertMeta(
        `meta[property="${property}"]`,
        () => {
          const meta = document.createElement('meta')
          meta.setAttribute('property', property)
          return meta
        },
        content,
      )
    }

    upsertMeta(
      'meta[name="twitter:card"]',
      () => {
        const meta = document.createElement('meta')
        meta.setAttribute('name', 'twitter:card')
        return meta
      },
      'summary_large_image',
    )
    upsertMeta(
      'meta[name="twitter:title"]',
      () => {
        const meta = document.createElement('meta')
        meta.setAttribute('name', 'twitter:title')
        return meta
      },
      title,
    )
    if (description) {
      upsertMeta(
        'meta[name="twitter:description"]',
        () => {
          const meta = document.createElement('meta')
          meta.setAttribute('name', 'twitter:description')
          return meta
        },
        description,
      )
    }
    upsertMeta(
      'meta[name="twitter:image"]',
      () => {
        const meta = document.createElement('meta')
        meta.setAttribute('name', 'twitter:image')
        return meta
      },
      image,
    )

    upsertMeta(
      'meta[name="robots"]',
      () => {
        const meta = document.createElement('meta')
        meta.setAttribute('name', 'robots')
        return meta
      },
      noindex ? 'noindex, nofollow' : 'index, follow',
    )
  }, [title, description, path, ogImage, noindex])
}
