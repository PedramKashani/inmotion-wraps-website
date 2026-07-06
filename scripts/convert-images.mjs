/**
 * Optional image tooling (requires: npm install sharp).
 *
 * Site photos live in public/photos/ as .webp — add new files there and
 * reference them from src/pages/Home.tsx or ServiceCategorySection.tsx.
 *
 * Regenerates favicon.ico from public/favicon.svg when the SVG mark changes.
 */
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = join(__dirname, '..', 'public')

const svgSrc = join(pub, 'favicon.svg')
const icoDest = join(pub, 'favicon.ico')

await sharp(svgSrc, { density: 96 }).resize(32, 32).png().toFile(icoDest)
console.log('✓ favicon.ico — 32×32')
