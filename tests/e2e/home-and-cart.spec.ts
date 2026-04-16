import { test, expect } from '@playwright/test';

const seededCart = [
  {
    productId: 'cake-1',
    productName: 'Strawberry Cake',
    quantity: 2,
    unitPrice: 24,
    image: '🍰',
  },
];

test('homepage renders the main brand and hero content', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByAltText('Rise by Amy bread logo')).toBeVisible();
  await expect(page.getByRole('img', { name: /^Rise by Amy$/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Handcrafted with Love, Baked to Perfection/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Browse Our Treats' })).toBeVisible();
});

test('cart page loads seeded cart data from localStorage', async ({ page }) => {
  await page.addInitScript((items) => {
    window.localStorage.setItem('sweet-delights-cart', JSON.stringify(items));
  }, seededCart);

  await page.goto('/cart');

  await expect(page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Strawberry Cake' })).toBeVisible();
  await expect(page.getByText('Strawberry Cake × 2')).toBeVisible();
  await expect(page.getByText('$48.00').first()).toBeVisible();
});
