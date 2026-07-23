/**
 * Optional image tooling (requires: npm install sharp).
 *
 * Site photos live in public/photos/ as .webp — add new files there and
 * reference them from src/pages/Home.tsx or ServiceCategorySection.tsx.
 *
 * Regenerates favicon.ico and PNG icons from public/favicon.svg when the mark changes.
 */
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = join(__dirname, '..', 'public')
const svgSrc = join(pub, 'favicon.svg')

const pngTargets = [
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
]

for (const { file, size } of pngTargets) {
  await sharp(svgSrc, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(join(pub, file))
  console.log(`✓ ${file} — ${size}×${size}`)
}

const icoTmp = join(pub, 'favicon-32.png')
await sharp(svgSrc, { density: 384 }).resize(32, 32).png().toFile(icoTmp)
await sharp(icoTmp).toFile(join(pub, 'favicon.ico'))
await unlink(icoTmp)
console.log('✓ favicon.ico — 32×32')
