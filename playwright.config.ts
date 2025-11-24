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
  // Test directory
  testDir: './tests',
  
  // Test timeout (45 seconds per test)
  timeout: 45_000,
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail build if test.only is committed (CI only)
  forbidOnly: !!process.env.CI,
  
  // Retries: 0 locally, 1 in CI (for flaky tests)
  retries: process.env.CI ? 1 : 0,
  
  // Workers: 3 in CI, 1 locally (for debugging)
  workers: process.env.CI ? 3 : 1,
  
  // Reporters
  reporter: [
    ['list'], // Console output
    ['html', { open: 'never' }], // HTML report
    ['allure-playwright', { 
      resultsDir: 'allure-results', 
      detail: true, 
      suiteTitle: false 
    }],
  ],
  
  // Global settings for all tests
  use: {
    // Base URL for navigation
    baseURL: process.env.BASE_URL || 'https://example.com',
    
    // Browser channel (use Chrome)
    channel: 'chrome',
    
    // Viewport: maximized locally, 1920x1080 in CI
    viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
    
    // Launch options: maximize window locally
    launchOptions: process.env.CI ? undefined : { 
      args: ['--start-maximized'] 
    },
    
    // Trace: keep only on failure (for debugging)
    trace: 'retain-on-failure',
    
    // Screenshots: only on failure
    screenshot: 'only-on-failure',
    
    // Videos: retain on failure
    video: 'retain-on-failure',
    
    // Timeouts
    actionTimeout: 10_000, // 10 seconds for actions
    navigationTimeout: 30_000, // 30 seconds for navigation
  },

  // Projects (browsers)
  // By default: Chrome only
  // Uncomment others if needed for cross-browser testing
  projects: [
    {
      name: 'chromium',
      use: { channel: 'chrome' },
    },
    
    // Uncomment for Firefox testing
    // {
    //   name: 'firefox',
    //   use: { channel: 'firefox' },
    // },
    
    // Uncomment for Safari testing (Mac only)
    // {
    //   name: 'webkit',
    // },
  ],
});

