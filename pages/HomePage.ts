import { Page, Locator } from '@playwright/test';

/**
 * Home Page Object Model - The Internet Herokuapp Secure Area
 * URL: /secure
 * 
 * This page is shown after successful login
 */
export class HomePage {
  readonly page: Page;
  
  // Locators
  readonly pageTitle: Locator;
  readonly logoutButton: Locator;
  readonly successMessage: Locator;
  readonly secureAreaText: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.pageTitle = page.locator('.example h2');
    this.logoutButton = page.locator('a[href="/logout"]');
    this.successMessage = page.locator('#flash.success');
    this.secureAreaText = page.locator('.example h4');
  }

  /**
   * Navigate to secure area (home page)
   * Uses baseURL from playwright.config.ts
   */
  async navigate(): Promise<void> {
    await this.page.goto('/secure');
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  /**
   * Get secure area welcome text
   */
  async getSecureAreaText(): Promise<string> {
    return await this.secureAreaText.textContent() || '';
  }

  /**
   * Perform logout
   */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  /**
   * Check if user is logged in (logged in = logout button visible)
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.logoutButton.isVisible();
  }

  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}

