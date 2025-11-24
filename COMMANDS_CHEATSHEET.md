# 🚀 Interview Commands Cheat Sheet

**Print this page and keep it visible during your interview!**

This is a **one-page reference** with the most essential commands you'll need. It's designed to be quick to scan and find what you need without scrolling through long documentation.

## Why These Commands?

- **Direct Playwright commands** (`npx playwright test`) are industry standard
- Shows you know the **tool itself**, not just npm scripts
- More **flexible** - you can add any CLI flags
- **Professional** - this is what senior QA engineers use

## ⚡ Most Important Commands (Direct Playwright)

```bash
# Run tests with UI (BEST for interview - interactive)
npx playwright test --ui

# Run tests with visible browser (headed mode)
npx playwright test --headed

# Run all tests (headless)
npx playwright test

# Run specific test file
npx playwright test tests/e2e/demo.spec.ts

# Debug a test
npx playwright test tests/e2e/demo.spec.ts --debug

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test by name
npx playwright test -g "should login successfully"

# Run in specific folder
npx playwright test tests/e2e
npx playwright test tests/api
```

## 🎯 Advanced Playwright Commands

```bash
# Run with trace (for debugging)
npx playwright test --trace on

# Run with specific number of workers
npx playwright test --workers=1

# Run tests in parallel (default)
npx playwright test --workers=4

# Update snapshots
npx playwright test --update-snapshots

# Run failed tests only
npx playwright test --last-failed

# Show browser with slow motion
npx playwright test --headed --slow-mo=1000
```

## 📊 View Reports

```bash
# Playwright HTML report (quick)
npx playwright show-report

# Allure report (professional)
allure serve allure-results

# Or generate and open
allure generate allure-results --clean -o allure-report
allure open allure-report
```

## 🧹 Clean Up

```bash
# Clean all reports before starting fresh
rm -rf test-results playwright-report allure-results allure-report

# Or use npm script
npm run clean
```

## 💡 NPM Shortcuts (Optional)

```bash
# These are shortcuts defined in package.json
npm test                 # = npx playwright test
npm run test:ui          # = npx playwright test --ui
npm run test:headed      # = npx playwright test --headed
npm run test:debug       # = npx playwright test --debug
```

## 📝 Common Playwright Code

### Basic Test Structure
```typescript
import { test, expect } from '@playwright/test';

test('test name', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Expected/);
});
```

### Locators (Best to Worst)
```typescript
// 1. By Role (BEST)
page.getByRole('button', { name: 'Submit' })

// 2. By Label
page.getByLabel('Email')

// 3. By Test ID
page.getByTestId('submit-btn')

// 4. By Text
page.getByText('Welcome')

// 5. CSS Selector (last resort)
page.locator('.my-class')
```

### Common Actions
```typescript
// Click
await page.click('button')

// Fill input
await page.fill('#email', 'test@example.com')

// Select dropdown
await page.selectOption('#country', 'USA')

// Check checkbox
await page.check('#terms')

// Wait for element
await page.waitForSelector('.modal')
```

### Assertions
```typescript
// Visibility
await expect(element).toBeVisible()
await expect(element).toBeHidden()

// Text content
await expect(element).toHaveText('Welcome')
await expect(element).toContainText('Wel')

// URL
await expect(page).toHaveURL('/dashboard')

// Enabled/Disabled
await expect(button).toBeEnabled()
await expect(button).toBeDisabled()
```

## 🎯 Page Object Template

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  private readonly myButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.myButton = page.getByRole('button', { name: 'Click' });
  }
  
  async clickButton(): Promise<void> {
    await this.myButton.click();
  }
}
```

## 🎯 Test with Page Object

```typescript
import { test, expect } from '../../src/fixtures/test-fixtures';

test('my test', async ({ page }) => {
  const myPage = new MyPage(page);
  await myPage.clickButton();
  await expect(page).toHaveURL('/success');
});
```

## 🆘 If Something Breaks

```bash
# 1. Check syntax errors in terminal
# 2. Run with debug mode
npm run test:debug

# 3. Run with visible browser
npm run test:headed

# 4. Check Playwright docs
# https://playwright.dev
```

## 📁 File Locations

```
tests/e2e/          → Your test files here
pages/              → Page objects here
data/               → Test data here
fixtures/           → Test fixtures here
utils/              → Helper functions here
playwright.config.ts → Configuration
```

---

**Keep this open during your interview!** 🎯

