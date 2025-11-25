import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Playwright Configuration
 * 
 * Simple, practical configuration for E2E testing
 * Optimized for both local development and CI/CD
 * 
 * Key configurations:
 * - Uses Chrome by default (most common browser)
 * - Parallel execution for speed
 * - Allure + HTML reporting
 * - Automatic screenshots/traces on failure
 * - Environment-based settings (local vs CI)
 */
export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 3 : 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { 
      resultsDir: 'allure-results', 
      detail: true, 
      suiteTitle: false 
    }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
    channel: process.env.CI ? undefined : 'chrome',
    viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
    launchOptions: process.env.CI ? undefined : { 
      args: ['--start-maximized'] 
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 10_000,
  },

  // Projects (browsers)
  // By default: Chrome only (locally), Chromium in Docker/CI
  // Uncomment others if needed for cross-browser testing
  projects: [
    {
      name: 'chromium',
      use: { 
        // Use Chrome locally (macOS), Chromium in Docker/CI (ARM64 compatible)
        ...(process.env.CI ? {} : { channel: 'chrome' })
      },
    },
    
    // for Firefox testing
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    
    // Uncomment for Safari testing (Mac only)
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});

