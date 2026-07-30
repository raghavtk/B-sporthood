import { expect, test } from '@playwright/test';

const resetDemoState = async (page: import('@playwright/test').Page) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await page.reload();
};

test.describe('B-Sporthood booking journey', () => {
  test.beforeEach(async ({ page }) => {
    await resetDemoState(page);
  });

  test('an anonymous player can select a court, sign in, pay, and see their booking', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-chromium', 'The full funnel is covered at desktop; mobile is covered below.');
    await page.locator('.desktop-nav').getByRole('link', { name: 'Discover' }).click();
    await expect(page.getByRole('heading', { name: 'Find your kind of court.' })).toBeVisible();
    await page.getByRole('link', { name: 'View Ace Arena' }).click();

    const openSlot = page.locator('.slot:not([disabled])').first();
    await openSlot.click();
    await page.getByRole('button', { name: 'Continue to book' }).click();
    await expect(page).toHaveURL(/\/login\?returnTo=\/checkout/);

    await page.getByRole('button', { name: /Use the demo account/i }).click();
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('heading', { name: 'One last look.' })).toBeVisible();
    await page.getByRole('button', { name: 'Confirm demo booking' }).click();

    await expect(page.getByText('Court confirmed')).toBeVisible();
    await expect(page.getByText(/BSP-/)).toBeVisible();
    await page.getByRole('link', { name: 'View my bookings' }).click();
    await expect(page.getByRole('heading', { name: 'My bookings' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ace Arena' })).toBeVisible();
  });
});

test.describe('navigation and responsive controls', () => {
  test.beforeEach(async ({ page }) => {
    await resetDemoState(page);
  });

  test('theme control persists and mobile navigation is dismissible', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'This assertion is specific to the mobile project.');
    await page.setViewportSize({ width: 375, height: 720 });
    await page.getByRole('button', { name: 'Use light theme' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();

    await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll');
  });
});
