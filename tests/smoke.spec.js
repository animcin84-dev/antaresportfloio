import { test, expect } from '@playwright/test'

const collectPageErrors = (page) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  return errors
}

test('desktop V3 renders direct robot runtime and complete interactive systems', async ({ page }) => {
  const pageErrors = collectPageErrors(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveTitle(/ABAI BOL/)

  // V3 removes the iframe boundary. Spline is mounted directly through React.
  await expect(page.locator('.spline-runtime-shell')).toBeVisible()
  await expect(page.locator('.spline-stage iframe')).toHaveCount(0)
  const viewport = page.viewportSize()
  const runtimeBox = await page.locator('.spline-runtime-shell').boundingBox()
  expect(runtimeBox).toBeTruthy()
  expect(runtimeBox.width).toBeGreaterThanOrEqual(viewport.width * .95)
  expect(runtimeBox.height).toBeGreaterThanOrEqual(viewport.height * .95)

  const heroHeight = await page.locator('.spline-scroll').evaluate(el => el.getBoundingClientRect().height)
  expect(heroHeight).toBeGreaterThan(viewport.height * 3)

  await page.locator('#engineering').scrollIntoViewIfNeeded()
  const controlTab = page.getByRole('tab', { name: /CONTROL/ })
  await controlTab.click()
  await expect(controlTab).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('.eng-copy h3')).toContainText('CONTROL')

  const indexButton = page.locator('.mission-index-button')
  await expect(indexButton).toBeVisible()
  await indexButton.click()
  await expect(page.getByRole('dialog', { name: /ABAI BOL mission index/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /EVIDENCE/ })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: /ABAI BOL mission index/i })).toBeHidden()

  await page.locator('#orbit').scrollIntoViewIfNeeded()
  await expect(page.locator('.mission-orbit-canvas canvas')).toBeVisible()
  const orbitHeight = await page.locator('#orbit').evaluate(el => el.getBoundingClientRect().height)
  expect(orbitHeight).toBeGreaterThan(viewport.height * 4)

  // Move to the release edge of the pinned sequence: all four missions must be traversed.
  await page.locator('#orbit').evaluate((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, top + el.offsetHeight - window.innerHeight - 4)
  })
  await page.waitForTimeout(1200)
  await expect(page.locator('.orbit-exit-hint')).toContainText('NEXT CHAPTER UNLOCKED')
  await expect(page.locator('.orbit-copy-v3 h2')).toContainText('ABAI')

  await page.locator('#record').scrollIntoViewIfNeeded()
  await expect(page.locator('.legacy-card')).toHaveCount(18)
  await expect(page.locator('.legacy-grid')).toContainText('SUSTAIN AWARD · WINNER')
  await expect(page.locator('.legacy-grid')).toContainText('CONNECT AWARD · 2ND PLACE')
  await expect(page.locator('.legacy-grid')).toContainText('WINNING ALLIANCE AWARD · WINNER')

  await page.locator('#evidence').scrollIntoViewIfNeeded()
  const evidence = page.getByRole('link', { name: /OPEN GOOGLE DRIVE ARCHIVE/i })
  await expect(evidence).toHaveAttribute('href', /drive\.google\.com\/drive\/folders\/1F8peRnkwYX_1QZd7oxoTGL5CsWw1Fm9V/)

  await page.waitForTimeout(700)
  expect(pageErrors, `Unexpected browser page errors: ${pageErrors.join(' | ')}`).toEqual([])
})

test('mobile V3 preserves layout and the mission orbit remains readable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const pageErrors = collectPageErrors(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await page.locator('#orbit').scrollIntoViewIfNeeded()
  await expect(page.locator('.orbit-copy-v3')).toBeVisible()
  await expect(page.locator('.mission-orbit-canvas canvas')).toBeVisible()

  await page.locator('#record').scrollIntoViewIfNeeded()
  const dimensions = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width + 2)
  await expect(page.locator('.legacy-card')).toHaveCount(18)
  expect(pageErrors, `Unexpected mobile page errors: ${pageErrors.join(' | ')}`).toEqual([])
})

test('reduced motion removes forced long journeys while preserving content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const viewport = page.viewportSize()

  const heroHeight = await page.locator('.spline-scroll').evaluate(el => el.getBoundingClientRect().height)
  expect(heroHeight).toBeLessThanOrEqual(viewport.height * 1.15)
  await expect(page.locator('.hero-chapter-copy').first()).toBeHidden()

  const orbitHeight = await page.locator('#orbit').evaluate(el => el.getBoundingClientRect().height)
  expect(orbitHeight).toBeLessThanOrEqual(viewport.height * 1.15)
  await expect(page.locator('.orbit-copy-v3')).toBeVisible()
})
