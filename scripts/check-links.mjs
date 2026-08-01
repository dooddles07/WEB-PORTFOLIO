// Verify every outbound URL in the site data still resolves, and that every
// local asset referenced by the data actually exists on disk.
// Run: npm run check-links   (exits 1 on any failure, so CI can gate on it)
import { readFileSync, existsSync } from 'node:fs'

const SOURCES = ['src/data/projects.ts', 'src/data/profile.ts', 'src/data/experience.ts', 'src/data/certifications.ts', 'index.html']

/**
 * Hosts that block automated requests and return a non-200 to anything without
 * a real browser. A failure from these tells us nothing, so skip rather than
 * cry wolf. LinkedIn answers 999 to every non-browser client.
 */
const BOT_WALLED = [/(^|\.)linkedin\.com$/]

const urls = new Set()
const assets = new Set()

for (const file of SOURCES) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(/https?:\/\/[^\s'"<>)]+/g)) urls.add(m[0].replace(/[.,]$/, ''))
  for (const m of src.matchAll(/['"](\/(?:assets|fonts)\/[^'"?]+)/g)) assets.add(m[1])
}

// --- local assets -----------------------------------------------------------
const missingAssets = [...assets].filter((a) => !existsSync(`public${a}`))

// --- outbound urls ----------------------------------------------------------
const checked = await Promise.all(
  [...urls].map(async (url) => {
    const host = new URL(url).hostname
    if (BOT_WALLED.some((re) => re.test(host))) return { url, status: 'skipped', ok: true, skipped: true }
    try {
      let res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
      // some hosts refuse HEAD; retry with a tiny ranged GET before believing it
      if (res.status === 403 || res.status === 405) {
        res = await fetch(url, { method: 'GET', redirect: 'follow', headers: { Range: 'bytes=0-256' } })
      }
      return { url, status: res.status, ok: res.status < 400 }
    } catch (err) {
      return { url, status: 'NETWORK ERROR', ok: false, err: err.message }
    }
  }),
)

const broken = checked.filter((r) => !r.ok)
const skipped = checked.filter((r) => r.skipped)

console.log(`${checked.length - skipped.length} URLs checked, ${skipped.length} skipped, ${assets.size} local assets checked`)

if (missingAssets.length) {
  console.log(`\nMISSING ASSETS (${missingAssets.length}):`)
  for (const a of missingAssets) console.log(`  public${a}`)
}

if (broken.length) {
  console.log(`\nBROKEN LINKS (${broken.length}):`)
  for (const r of broken) console.log(`  ${r.status}  ${r.url}  ${r.err ?? ''}`)
}

if (broken.length || missingAssets.length) {
  console.log('\nFAIL')
  process.exit(1)
}

console.log('\nAll links and assets OK')
