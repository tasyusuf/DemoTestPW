import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

/**
 * Custom fixtures for test setup
 * Extend this with your page objects and any setup/teardown logic
 */

type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';

