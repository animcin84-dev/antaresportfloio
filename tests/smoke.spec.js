import { test, expect } from '@playwright/test'

async function reportDesktopOverflow(page) {
  const report = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth
    const describe = node => {
      if (!node) return null
      const rect = node.getBoundingClientRect()
      const style = getComputedStyle(node)
      return {
        tag: node.tagName?.toLowerCase?.() || '',
        id: node.id || '',
        className: typeof node.className === 'string' ? node.className : '',
        left: Math.round(rect.left * 10) / 10,
        right: Math.round(rect.right * 10) / 10,
        width: Math.round(rect.width * 10) / 10,
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
        overflowX: style.overflowX,
        position: style.position,
        fontSize: style.fontSize,
        transform: style.transform,
      }
    }
    const rows = [...document.querySelectorAll('body *')]
      .map(node => {
        const rect = node.getBoundingClientRect()
        const parent = node.parentElement
        return {
          ...describe(node),
          overflowRight: Math.round(Math.max(0, rect.right - viewport) * 10) / 10,
          overflowLeft: Math.round(Math.max(0, -rect.left) * 10) / 10,
          selfScrollOverflow: Math.max(0, node.scrollWidth - node.clientWidth),
          parent: describe(parent),
        }
      })
      .filter(row => row.overflowRight > 1 || row.overflowLeft > 1 || row.selfScrollOverflow > 1)
      .sort((a, b) => Math.max(b.overflowRight, b.overflowLeft, b.selfScrollOverflow) - Math.max(a.overflowRight, a.overflowLeft, a.selfScrollOverflow))
      .slice(0, 35)
    return {
      viewport,
      documentScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      continuitySection: describe(document.querySelector('.continuity-section')),
      continuityStage: describe(document.querySelector('.continuity-stage')),
      continuityLegacy: describe(document.querySelector('.continuity-legacy')),
      continuityCurrent: describe(document.querySelector('.continuity-current')),
      missionPin: describe(document.querySelector('.mission-v7-pin')),
      missionPhoto: describe(document.querySelector('.mission-v7-photo')),
      machineLayout: describe(document.querySelector('.machine-layout')),
      rows,
    }
  })
  console.log(`POST_ANIMATION_OVERFLOW ${JSON.stringify(report)}`)
}

test('desktop experience has no page-level overflow or uncaught app errors', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/?quality=low')
  await page.waitForTimeout(700)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  if (overflow > 1) await reportDesktopOverflow(page)
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
  await page.waitForTimeout(180)
  const status = page.locator('.record-copy > span')
  const before = await status.textContent()
  const beforeIndex = Number(before?.match(/^(\d{2})/)?.[1] || 1)
  const beforeY = await page.evaluate(() => scrollY)
  const forward = beforeIndex < 4
  const control = page.locator('#record').getByRole('button', { name: forward ? /next/i : /prev/i }).first()
  const expected = forward ? beforeIndex + 1 : beforeIndex - 1
  await control.click()
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
