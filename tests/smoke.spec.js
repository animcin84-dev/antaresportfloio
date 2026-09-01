import { test, expect } from '@playwright/test'

const collectPageErrors = (page) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  return errors
}

test('desktop experience renders full-screen robot and interactive systems', async ({ page }) => {
  const pageErrors = collectPageErrors(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveTitle(/ABAI BOL/)
  await expect(page.locator('.spline-stage iframe')).toBeVisible()

  const viewport = page.viewportSize()
  const frameBox = await page.locator('.spline-stage iframe').boundingBox()
  expect(frameBox).toBeTruthy()
  expect(frameBox.width).toBeGreaterThanOrEqual(viewport.width * .95)
  expect(frameBox.height).toBeGreaterThanOrEqual(viewport.height * .95)

  const scrollHeight = await page.locator('.spline-scroll').evaluate(el => el.getBoundingClientRect().height)
  expect(scrollHeight).toBeGreaterThan(viewport.height * 3)

  await page.locator('#engineering').scrollIntoViewIfNeeded()
  const controlTab = page.getByRole('tab', { name: /CONTROL/ })
  await controlTab.click()
  await expect(controlTab).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('.eng-copy h3')).toContainText('CONTROL')

  const indexButton = page.locator('.mission-index-button')
  await expect(indexButton).toBeVisible()
  await indexButton.click()
  await expect(page.getByRole('dialog', { name: /ABAI BOL mission index/i })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: /ABAI BOL mission index/i })).toBeHidden()

  await page.locator('.orbit-section').scrollIntoViewIfNeeded()
  await expect(page.locator('.mission-orbit-wrap canvas')).toBeVisible()

  await page.locator('#record').scrollIntoViewIfNeeded()
  await expect(page.locator('.legacy-card')).toHaveCount(11)

  await page.waitForTimeout(700)
  expect(pageErrors, `Unexpected browser page errors: ${pageErrors.join(' | ')}`).toEqual([])
})

test('mobile art direction has no page-level horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const pageErrors = collectPageErrors(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.locator('#engineering').scrollIntoViewIfNeeded()
  await page.locator('#record').scrollIntoViewIfNeeded()
  const dimensions = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width + 2)
  expect(pageErrors, `Unexpected mobile page errors: ${pageErrors.join(' | ')}`).toEqual([])
})

test('reduced motion removes the long pinned hero journey', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const viewport = page.viewportSize()
  const heroHeight = await page.locator('.spline-scroll').evaluate(el => el.getBoundingClientRect().height)
  expect(heroHeight).toBeLessThanOrEqual(viewport.height * 1.15)
  await expect(page.locator('.hero-chapter-copy').first()).toBeHidden()
})
