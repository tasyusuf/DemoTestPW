import { test, expect } from '@playwright/test';

/**
 * Simple Demo Test
 * A quick test to verify Playwright is working correctly
 */

test.describe('Demo Tests - Playwright Basic Functionality', () => {
  
  test('should open example website and check title', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Expect a title "to contain" a substring
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should navigate and interact with elements', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Click the get started link
    await page.getByRole('link', { name: 'Get started' }).click();
    
    // Expects page to have a heading with the name of Installation
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('should take a screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Take a screenshot
    await page.screenshot({ path: 'test-results/playwright-homepage.png' });
    
    expect(true).toBeTruthy(); // Simple assertion
  });
});

