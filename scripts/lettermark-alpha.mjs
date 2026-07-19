// One-off: the lettermark PNG was exported on solid black. Turn black into
// transparency so the mark sits on any background. Brightness becomes alpha.
// Run: node scripts/lettermark-alpha.mjs
import sharp from 'sharp'

const src = 'public/assets/me/lettermark.png'
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

for (let i = 0; i < data.length; i += 4) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  data[i + 3] = Math.max(r, g, b)
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile('public/assets/me/lettermark-t.png')

console.log('written lettermark-t.png', info.width, 'x', info.height)
