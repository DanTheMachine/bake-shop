import { test, expect } from '@playwright/test';

test.describe('Custom Cakes page', () => {
  test('form renders all fields', async ({ page }) => {
    await page.goto('/custom-cakes');

    await expect(page.getByRole('heading', { name: /custom cake orders/i })).toBeVisible();
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/event date/i)).toBeVisible();
    await expect(page.getByLabel(/cake size/i)).toBeVisible();
  });

  test('shows validation when submitting empty form', async ({ page }) => {
    await page.goto('/custom-cakes');
    await page.getByRole('button', { name: /submit quote request/i }).click();

    // Native HTML5 validation prevents submission — form should not advance
    await expect(page.getByRole('heading', { name: /custom cake orders/i })).toBeVisible();
  });
});
