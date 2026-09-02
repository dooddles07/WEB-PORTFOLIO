import { test, expect, type Page } from '@playwright/test'
import { projects } from '../src/data/projects'
import { experiences } from '../src/data/experience'
import { certifications } from '../src/data/certifications'

/** sections mount behind the preloader, so wait for the real content */
async function load(page: Page, path = '/') {
  await page.goto(path)
  await expect(page.locator('#contact')).toBeAttached({ timeout: 15_000 })
}

test('loads with no console or page errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))

  await load(page)
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 900) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
  })

  expect(errors).toEqual([])
})

test('every nav link points at a section that exists', async ({ page }) => {
  await load(page)

  const hrefs = await page.locator('header nav a[href^="#"]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('href')!).filter((h) => h !== '#top'),
  )
  expect(hrefs.length).toBeGreaterThan(0)

  for (const href of hrefs) {
    await expect(page.locator(href), `nav link ${href} has no target`).toBeAttached()
  }
})

test('counts on the page match the data files', async ({ page }) => {
  await load(page)

  // About stat row is derived from array lengths
  await expect(page.locator('#about')).toContainText(String(experiences.length).padStart(2, '0'))
  await expect(page.locator('#about')).toContainText(String(projects.length).padStart(2, '0'))
  await expect(page.locator('#about')).toContainText(String(certifications.length).padStart(2, '0'))

  // hero marginalia
  await expect(page.locator('#top')).toContainText(`${experiences.length} client platforms`)

  await expect(page.locator('#certifications img')).toHaveCount(certifications.length)
})

test('social card metadata is deployable', async ({ page }) => {
  await load(page)

  const meta = async (sel: string) =>
    page.locator(sel).first().getAttribute('content')

  const ogImage = await meta('meta[property="og:image"]')
  const twImage = await meta('meta[name="twitter:image"]')

  for (const [name, value] of [['og:image', ogImage], ['twitter:image', twImage]] as const) {
    // Facebook and LinkedIn do not resolve relative paths; the card renders blank
    expect(value, `${name} is missing`).toBeTruthy()
    expect(value, `${name} must be an absolute URL`).toMatch(/^https?:\/\//)
    expect(value, `${name} still points at the example.com placeholder`).not.toContain('example.com')
  }

  // Google truncates the snippet around 160 characters
  const description = await meta('meta[name="description"]')
  expect(description!.length, 'meta description is too long for a search snippet').toBeLessThanOrEqual(165)
})

test('projects collapse to one row each, and a row opens a rail with loaded screenshots', async ({ page }) => {
  await load(page)

  const rows = page.locator('section#projects button')
  await expect(rows).toHaveCount(projects.length)

  // opening one row is enough for a smoke test
  const featured = projects.find((p) => p.featured) ?? projects[0]
  await rows.filter({ hasText: featured.name }).click()

  const rail = page.getByRole('region', { name: `${featured.name} screenshots` })
  await expect(rail, `${featured.name} rail missing`).toBeVisible()
  await page.waitForTimeout(600)

  const imgs = rail.locator('img')
  await expect(imgs.first()).toBeVisible()
  const broken = await imgs.evaluateAll((els) =>
    els.filter((i) => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth === 0).length,
  )
  expect(broken, `${featured.name} has broken images`).toBe(0)
})

test('in-progress projects show the right chip and link label in the modal', async ({ page }) => {
  await load(page)

  for (const project of projects.filter((p) => p.status === 'in-progress')) {
    await page.locator('section#projects button').filter({ hasText: project.name }).click()
    const modal = page.getByRole('dialog')
    await expect(modal).toContainText('IN PROGRESS')
    await expect(modal).toContainText('VISIT PREVIEW')
    await page.getByRole('button', { name: 'Close', exact: true }).click()
    await expect(modal).toBeHidden()
  }
})

test('lightbox opens from the project modal and Escape peels back one layer at a time', async ({ page }) => {
  await load(page)

  const featured = projects.find((p) => p.featured) ?? projects[0]
  await page.locator('section#projects button').filter({ hasText: featured.name }).click()

  const modal = page.getByRole('dialog')
  await expect(modal).toBeVisible()

  const rail = page.getByRole('region', { name: `${featured.name} screenshots` })
  await expect(rail).toBeVisible()

  await rail.getByRole('button', { name: `Open ${featured.name} screenshots full size` }).click()

  const close = page.getByRole('button', { name: 'Close viewer' })
  await expect(close).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden')

  // first Escape closes only the lightbox; the modal stays and keeps the scroll lock
  await page.keyboard.press('Escape')
  await expect(close).toBeHidden()
  await expect(modal).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden')

  // second Escape closes the modal and releases the lock
  await page.keyboard.press('Escape')
  await expect(modal).toBeHidden()
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
})

test('reduced motion renders everything without stranding content', async ({ browser }) => {
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  await load(page)

  await expect(page.locator('main section')).toHaveCount(7)
  // the preloader must be skipped entirely
  await expect(page.locator('main')).toBeVisible()

  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
  })

  // whileInView reveals must not leave text permanently invisible
  const stranded = await page.evaluate(() =>
    [...document.querySelectorAll('main h2, main h3, main p, main li')].filter((el) => {
      const cs = getComputedStyle(el)
      return +cs.opacity < 0.9 && el.getBoundingClientRect().height > 0
    }).length,
  )
  expect(stranded).toBe(0)
  await page.close()
})

for (const width of [375, 768, 1440]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await load(page)

    const overflow = await page.evaluate(() => {
      const de = document.documentElement
      return { scroll: de.scrollWidth, client: de.clientWidth }
    })
    expect(overflow.scroll, `page scrolls horizontally at ${width}px`).toBeLessThanOrEqual(overflow.client)
  })
}
