import { test, expect } from '@playwright/test';

test('spot page loads and shows heading', async ({ page }) => {
  await page.goto('http://localhost:5173/spot');
  await expect(page.locator('text=Spot Trading')).toBeVisible();
});
