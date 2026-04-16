import { useEffect } from 'react'

/**
 * Sets document title and meta description for basic SEO on client-routed pages.
 * Each route overwrites the previous values on mount.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    if (description) meta.setAttribute('content', description)
  }, [title, description])
}
