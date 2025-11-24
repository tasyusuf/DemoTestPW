import { test, expect } from '../../fixtures/test-fixtures';
import { TestUsers } from '../../data/test-data';

/**
 * Login Test Suite - The Internet Herokuapp
 * 
 * Demonstrates Page Object Model pattern with real website
 * Website: https://the-internet.herokuapp.com/login
 * 
 * Valid credentials:
 * - Username: tomsmith
 * - Password: SuperSecretPassword!
 * 
 * Tests:
 * - Login page accessibility
 * - Invalid login attempts
 * - Successful login
 * - Logout functionality
 */

test.describe('Login Test Suite - The Internet Herokuapp', () => {

  test('should load login page successfully', async ({ loginPage }) => {
    await loginPage.navigate();
    
    // Verify URL
    await expect(loginPage['page']).toHaveURL(/.*login/);
    
    // Verify page title
    await expect(loginPage['page']).toHaveTitle(/The Internet/);
    
    // Verify login button is enabled
    const isEnabled = await loginPage.isLoginButtonEnabled();
    expect(isEnabled).toBeTruthy();
  });

  test('should display error message with invalid username', async ({ loginPage }) => {
    await loginPage.navigate();
    
    // Attempt login with invalid credentials
    await loginPage.login(TestUsers.invalidUser.username, TestUsers.invalidUser.password);
    
    // Assert error message is visible
    const hasError = await loginPage.isErrorMessageVisible();
    expect(hasError).toBeTruthy();
    
    // Verify error message content
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('invalid');
  });

  test('should successfully login with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.navigate();
    
    // Login with valid credentials
    await loginPage.login(TestUsers.validUser.username, TestUsers.validUser.password);
    
    // Assert navigation to secure area
    await expect(homePage['page']).toHaveURL(/.*secure/);
    
    // Verify user is logged in
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    
    // Verify page title
    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toContain('Secure Area');
  });

  test('should successfully logout after login', async ({ loginPage, homePage }) => {
    await loginPage.navigate();
    
    // Login first
    await loginPage.login(TestUsers.validUser.username, TestUsers.validUser.password);
    
    // Verify logged in
    await expect(homePage['page']).toHaveURL(/.*secure/);
    
    // Logout
    await homePage.logout();
    
    // Verify redirected to login page
    await expect(loginPage['page']).toHaveURL(/.*login/);
    
    // Verify success message
    const hasSuccess = await loginPage.isSuccessMessageVisible();
    expect(hasSuccess).toBeTruthy();
  });
});

