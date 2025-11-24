import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object Model - The Internet Herokuapp Secure Area
 * URL: https://the-internet.herokuapp.com/secure
 * 
 * This page is shown after successful login
 */
export class HomePage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly logoutButton: Locator;
  private readonly successMessage: Locator;
  private readonly secureAreaText: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators for https://the-internet.herokuapp.com/secure
    this.pageTitle = page.locator('.example h2');
    this.logoutButton = page.locator('a[href="/logout"]');
    this.successMessage = page.locator('#flash.success');
    this.secureAreaText = page.locator('.example h4');
  }

  /**
   * Navigate to secure area (home page)
   */
  async navigate(): Promise<void> {
    await this.goto('https://the-internet.herokuapp.com/secure');
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

