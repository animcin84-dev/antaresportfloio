import { test, expect } from '@playwright/test'

async function reportOverflow(page, label) {
  const report = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth
    const describe = node => {
      if (!node || node === document.documentElement) return null
      const rect = node.getBoundingClientRect()
      return {
        tag: node.tagName?.toLowerCase?.() || '',
        id: node.id || '',
        className: typeof node.className === 'string' ? node.className : '',
        left: Math.round(rect.left * 10) / 10,
        right: Math.round(rect.right * 10) / 10,
        width: Math.round(rect.width * 10) / 10,
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
      }
    }
    const rows = [...document.querySelectorAll('body *')].map(node => {
      const rect = node.getBoundingClientRect()
      const right = rect.right - viewport
      const left = -rect.left
      return {
        ...describe(node),
        overflowRight: Math.round(Math.max(0, right) * 10) / 10,
        overflowLeft: Math.round(Math.max(0, left) * 10) / 10,
        ancestors: [node.parentElement, node.parentElement?.parentElement, node.parentElement?.parentElement?.parentElement]
          .map(describe).filter(Boolean),
      }
    }).filter(row => row.overflowRight > 1 || row.overflowLeft > 1)
      .sort((a, b) => Math.max(b.overflowRight, b.overflowLeft) - Math.max(a.overflowRight, a.overflowLeft))
      .slice(0, 24)
    return {
      viewport,
      scrollWidth: document.documentElement.scrollWidth,
      body: describe(document.body),
      rows,
    }
  })
  console.log(`OVERFLOW_REPORT ${label}: ${JSON.stringify(report)}`)
  return report
}

async function recorderSnapshot(page, status, label) {
  const row = {
    label,
    status: await status.textContent(),
    y: await page.evaluate(() => Math.round(scrollY)),
    record: await page.locator('#record').evaluate(node => {
      const rect = node.getBoundingClientRect()
      return { top: Math.round(rect.top), bottom: Math.round(rect.bottom), height: Math.round(rect.height) }
    }),
  }
  console.log(`RECORDER_TRACE ${JSON.stringify(row)}`)
  return row
}

test('desktop experience has no page-level overflow or uncaught app errors', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/?quality=low')
  await page.waitForTimeout(700)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  if (overflow > 1) await reportOverflow(page, 'desktop')
  expect(overflow).toBeLessThanOrEqual(1)
  expect(errors).toEqual([])
})

test('Spline hero can enter the live-scene path without blocking navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/?quality=high')
  await expect(page.locator('.spline-hero')).toBeVisible()
  await expect(page.locator('.spline-poster')).toBeAttached()
  await page.waitForTimeout(1200)
  await expect(page.locator('.spline-live')).toBeAttached()
  await expect(page.locator('.index-button')).toBeEnabled()
})

test('Flight Recorder manual navigation advances active year and synchronizes scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/?quality=low')
  await page.locator('#record').scrollIntoViewIfNeeded()
  const status = page.locator('.record-copy > span')
  await recorderSnapshot(page, status, 'after-scrollIntoView')
  await page.waitForTimeout(120)
  await recorderSnapshot(page, status, 'before-click')
  const before = await status.textContent()
  const beforeIndex = Number(before?.match(/^(\d{2})/)?.[1] || 1)
  const beforeY = await page.evaluate(() => scrollY)
  const forward = beforeIndex < 4
  const control = page.locator('#record').getByRole('button', { name: forward ? /next/i : /prev/i }).first()
  const expected = forward ? beforeIndex + 1 : beforeIndex - 1
  await control.click()
  await recorderSnapshot(page, status, 'after-click')
  for (const [delay, label] of [[60, '60ms'], [140, '200ms'], [300, '500ms'], [500, '1000ms']]) {
    await page.waitForTimeout(delay)
    await recorderSnapshot(page, status, label)
  }
  await expect(status).toContainText(`${String(expected).padStart(2, '0')} / 04`)
  await expect.poll(() => page.evaluate(() => scrollY), { timeout: 2500 }).not.toBe(beforeY)
})

test('mobile director cut is overflow-safe', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/?quality=low')
  await page.waitForTimeout(600)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  if (overflow > 1) await reportOverflow(page, 'mobile')
  expect(overflow).toBeLessThanOrEqual(1)
  expect(errors).toEqual([])
})

test('reduced motion exposes complete V7 content without sticky locks', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } })
  const page = await context.newPage()
  await page.goto('/?quality=low')
  await expect(page.locator('.memory-v7-year')).toHaveCount(4)
  await expect(page.locator('.machine-revisions article')).toHaveCount(4)
  await expect(page.locator('#record')).toHaveClass(/is-reduced/)
  await context.close()
})
