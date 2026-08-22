// One-off: renders favicon.png and og.png from inline SVG so the brand assets
// match the site. Run with `node scripts/generate-brand-assets.mjs`.
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

const BG = '#0b0a0a'
const INK = '#f5f2ec'
const MUTED = '#a8a29a'
const FAINT = '#726d66'
const ACCENT = '#8b5cf6'
const SERIF = "Georgia, 'Times New Roman', serif"
const MONO = "'Consolas', 'Courier New', monospace"

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="${BG}"/>
  <text x="240" y="368" text-anchor="middle" font-family="${SERIF}" font-size="320" fill="${INK}">B</text>
  <circle cx="400" cy="128" r="36" fill="${ACCENT}"/>
</svg>`

const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="wash" cx="0.82" cy="0.12" r="0.75">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#wash)"/>

  <circle cx="86" cy="82" r="6" fill="${ACCENT}"/>
  <text x="108" y="89" font-family="${MONO}" font-size="19" letter-spacing="3.4" fill="${MUTED}">OPEN FOR WORK</text>

  <text x="80" y="268" font-family="${SERIF}" font-size="150" fill="${INK}">Brixsonn</text>
  <text x="80" y="404" font-family="${SERIF}" font-size="150" font-style="italic" fill="${ACCENT}">Romero</text>

  <rect x="80" y="462" width="2" height="96" fill="${FAINT}"/>
  <text x="108" y="497" font-family="${MONO}" font-size="21" letter-spacing="1.4" fill="${INK}">AI Native Developer &amp; Automation Developer</text>
  <text x="108" y="537" font-family="${MONO}" font-size="19" letter-spacing="1.2" fill="${FAINT}">Naga City, Camarines Sur, Philippines</text>
</svg>`

const buf = Buffer.from(icon)
await sharp(buf).resize(512, 512).png({ compressionLevel: 9 }).toFile('public/favicon.png')
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og.png')
writeFileSync('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="${BG}"/>
  <text x="30" y="46" text-anchor="middle" font-family="${SERIF}" font-size="40" fill="${INK}">B</text>
  <circle cx="50" cy="16" r="4.5" fill="${ACCENT}"/>
</svg>
`)

console.log('wrote public/favicon.png, public/og.png, public/favicon.svg')
