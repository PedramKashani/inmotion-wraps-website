import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://inmotionwrapslv.com').replace(/\/$/, '')

const ROUTES = ['/', '/services', '/contact'] as const

function seoStaticFilesPlugin() {
  return {
    name: 'seo-static-files',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      const lastmod = new Date().toISOString().slice(0, 10)

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (route) => `  <url>
    <loc>${SITE_URL}${route === '/' ? '' : route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
).join('\n')}
</urlset>
`

      const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf8')
      writeFileSync(resolve(outDir, 'robots.txt'), robots, 'utf8')
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoStaticFilesPlugin()],
})
