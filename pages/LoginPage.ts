import { Page, Locator } from '@playwright/test';

/**
 * Login Page Object Model - The Internet Herokuapp
 * URL: /login
 * 
 * Valid credentials:
 * - Username: tomsmith
 * - Password: SuperSecretPassword!
 */
export class LoginPage {
  readonly page: Page;
  
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('#flash');
    this.successMessage = page.locator('#flash.success');
  }

  /**
   * Navigate to login page
   * Uses baseURL from playwright.config.ts
   */
  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  /**
   * Perform login action
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Check if login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }

  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}

