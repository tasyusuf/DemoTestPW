import { test, expect } from '../../fixtures/test-fixtures';
import { TestUsers } from '../../data/test-data';

/**
 * Example E2E Test Suite
 * This demonstrates the framework usage with Page Object Model
 * 
 * NOTE: These are TEMPLATE tests showing the framework structure.
 * They are skipped by default because they test non-existent pages.
 * 
 * TO USE:
 * 1. Remove .skip from the tests below
 * 2. Update baseURL in .env to your actual application
 * 3. Update page object selectors to match your app
 * 4. Customize test scenarios for your requirements
 */

test.describe.skip('Example Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Navigate to base URL before each test
    await page.goto('/');
  });

  test('should have correct page title', async ({ page }) => {
    // This is a simple example test
    await expect(page).toHaveTitle(/Example/);
  });

  test('should navigate to login page', async ({ loginPage }) => {
    // Using custom fixture
    await loginPage.navigate();
    await expect(loginPage['page']).toHaveURL(/.*login/);
  });

  test('should display error on invalid login', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(TestUsers.invalidUser.username, TestUsers.invalidUser.password);
    
    // Assert error message is visible
    const hasError = await loginPage.isErrorMessageVisible();
    expect(hasError).toBeTruthy();
  });

  test('should successfully login with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.navigate();
    await loginPage.login(TestUsers.validUser.username, TestUsers.validUser.password);
    
    // Assert navigation to home page
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });
});

