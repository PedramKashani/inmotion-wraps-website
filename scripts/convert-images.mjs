import sharp from 'sharp'
import { unlink } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = join(__dirname, '..', 'public')

const images = [
  'services-banners-trade-show',
  'services-marketing-print',
]

for (const name of images) {
  const src = join(pub, `${name}.png`)
  const dest = join(pub, `${name}.webp`)
  const info = await sharp(src).webp({ quality: 82 }).toFile(dest)
  console.log(`✓ ${name}.webp — ${(info.size / 1024).toFixed(0)} KB`)
  await unlink(src)
  console.log(`  deleted ${name}.png`)
}

// Generate favicon.ico from favicon.svg (32×32 PNG wrapped as ICO)
const svgSrc = join(pub, 'favicon.svg')
const icoDest = join(pub, 'favicon.ico')
await sharp(svgSrc, { density: 96 }).resize(32, 32).png().toFile(icoDest)
console.log('✓ favicon.ico — 32×32')
