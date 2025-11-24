import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object Model
 * Example implementation - customize based on your application
 */
export class HomePage extends BasePage {
  // Locators
  private readonly welcomeMessage: Locator;
  private readonly logoutButton: Locator;
  private readonly userProfile: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.welcomeMessage = page.locator('h1.welcome');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.userProfile = page.locator('.user-profile');
  }

  /**
   * Navigate to home page
   */
  async navigate(): Promise<void> {
    await this.goto('/');
  }

  /**
   * Get welcome message
   */
  async getWelcomeMessage(): Promise<string> {
    return await this.welcomeMessage.textContent() || '';
  }

  /**
   * Perform logout
   */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.userProfile.isVisible();
  }
}

