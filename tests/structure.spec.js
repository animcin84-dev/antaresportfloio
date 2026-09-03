import { test, expect } from '@playwright/test'

test('V7 semantic structure and eight chapters are present', async ({ page }) => {
  await page.goto('/?quality=low')
  await expect(page.locator('main#main')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveCount(1)
  for (const selector of ['#top','#continuity','#memory','#machine','#mission','#record','#team','#transmission']) {
    await expect(page.locator(selector)).toBeAttached()
  }
  await expect(page.locator('.memory-spine')).toBeAttached()
})

test('memory year controls work', async ({ page }) => {
  await page.goto('/?quality=low')
  await page.locator('#memory').scrollIntoViewIfNeeded()
  const buttons = page.locator('.memory-v7-index button')
  await expect(buttons).toHaveCount(4)
  await buttons.nth(2).click()
  await expect(buttons.nth(2)).toHaveAttribute('aria-pressed', 'true')
})

test('mission index exposes eight text-only chapters and restores focus', async ({ page }) => {
  await page.goto('/?quality=low')
  const trigger = page.locator('.index-button')
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: /chapter index/i })
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('nav button')).toHaveCount(8)
  await expect(dialog.locator('.mission-index-preview')).toHaveCount(0)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('complete record expands to all 18 supplied distinctions', async ({ page }) => {
  await page.goto('/?quality=low')
  await page.locator('#record').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: /expand complete record/i }).click()
  await expect(page.locator('.record-complete-list article')).toHaveCount(18)
})

test('full archive is off-canvas until explicitly opened', async ({ page }) => {
  await page.goto('/?quality=low')
  const trigger = page.getByRole('button', { name: /open full archive/i })
  await expect(page.locator('.archive-drawer')).toHaveCount(0)
  await trigger.click()
  await expect(page.getByRole('dialog', { name: /full visual archive/i })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('.archive-drawer')).toHaveCount(0)
  await expect(trigger).toBeFocused()
})
