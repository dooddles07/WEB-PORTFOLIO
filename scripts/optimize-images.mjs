// One-off: convert heavy screenshots to WebP. Keeps originals on disk.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const folders = ['public/assets/experience', 'public/assets/projects', 'public/assets/certs', 'public/assets/me']
let before = 0
let after = 0

for (const folder of folders) {
  const files = await readdir(folder)
  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue
    if (file === 'lettermark.png') continue // keeps transparency, already small
    const src = join(folder, file)
    const out = join(folder, `${basename(file, ext)}.webp`)
    const { size } = await stat(src)
    before += size
    // cap width: screenshots never render wider than ~1600 css px on this site
    await sharp(src).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out)
    const { size: outSize } = await stat(out)
    after += outSize
    console.log(`${src} ${(size / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB`)
  }
}

console.log(`TOTAL ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`)
