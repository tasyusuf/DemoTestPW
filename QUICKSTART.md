# 🚀 Quick Start Guide - Interview Preparation

This guide is specifically designed for **QA technical interviews**. It focuses on the most important commands and workflows you'll need when demonstrating your skills live during a coding interview.

## Why This Guide?

During a technical interview, you'll typically:
1. **Receive a test scenario** from the interviewer
2. **Create automated tests** based on that scenario
3. **Run the tests** and show results
4. **Debug** if something fails
5. **Present** your work professionally

This guide helps you do all of that efficiently.

## Pre-Interview Checklist ✅

### 1. Verify Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Allure is installed
allure --version

# Verify all dependencies are installed
npm list
```

### 2. Test Your Setup

```bash
# Run demo tests to verify everything works
npm test tests/e2e/demo.spec.ts

# Should see tests passing in terminal
```

### 3. View Reports

```bash
# View Playwright HTML report
npm run report

# Generate and view Allure report
npm run allure:serve
```

## 📋 During Interview - Quick Commands

### Essential Playwright Commands

```bash
# Run all tests
npx playwright test

# Run tests with visible browser (headed mode)
npx playwright test --headed

# Run tests in UI mode (BEST - interactive debugging)
npx playwright test --ui

# Run specific test file
npx playwright test tests/e2e/demo.spec.ts

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox

# Debug a specific test
npx playwright test tests/e2e/demo.spec.ts --debug

# Run specific test by name
npx playwright test -g "should login successfully"

# Run with trace for debugging
npx playwright test --trace on
```

### Creating New Tests

```bash
# 1. Create test file in tests/e2e/
touch tests/e2e/my-scenario.spec.ts

# 2. Create page object if needed in pages/
touch pages/MyPage.ts
```

## 🎯 Typical Interview Flow

### 1. Understand the Scenario
- Listen carefully to requirements
- Ask clarifying questions
- Break down into test cases

### 2. Create Page Objects (if needed)

**Example**: Creating a new page object

```typescript
// pages/SearchPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly results: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.results = page.locator('.search-results');
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async getResultsCount(): Promise<number> {
    return await this.results.count();
  }
}
```

### 3. Add to Fixtures (Optional)

```typescript
// fixtures/test-fixtures.ts
import { SearchPage } from '../pages/SearchPage';

// Add to type definition
type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  searchPage: SearchPage; // Add this
};

// Add fixture
export const test = base.extend<TestFixtures>({
  // ... existing fixtures ...
  
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
});
```

### 4. Write Tests

```typescript
// tests/e2e/search.spec.ts
import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Search Functionality', () => {
  test('should search for products', async ({ searchPage }) => {
    await searchPage.navigate();
    await searchPage.search('laptop');
    
    const resultsCount = await searchPage.getResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });
});
```

### 5. Run and Verify

```bash
# Run your test
npm test tests/e2e/search.spec.ts

# View results
npm run report
```

## 🔍 Common Locator Strategies

```typescript
// By role (preferred)
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Email' })

// By label
page.getByLabel('Email address')

// By placeholder
page.getByPlaceholder('Enter email...')

// By text
page.getByText('Welcome')

// By test ID (most reliable)
page.getByTestId('submit-button')

// CSS selector
page.locator('.my-class')
page.locator('#my-id')

// XPath (avoid if possible)
page.locator('xpath=//div[@class="example"]')
```

## 🐛 Debugging Tips

### 1. Use UI Mode
```bash
npm run test:ui
```
- Visual step-by-step execution
- Time travel through test
- Inspect DOM at any point

### 2. Use Debug Mode
```bash
npm run test:debug
```
- Pause execution
- Step through code
- Inspect state

### 3. Add Console Logs
```typescript
console.log('Current URL:', await page.url());
console.log('Element visible:', await element.isVisible());
```

### 4. Screenshots
```typescript
await page.screenshot({ path: 'debug.png', fullPage: true });
```

### 5. Slow Down Execution
```typescript
// In test
test('my test', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // 1 second pause
});
```

## 📊 Showing Results to Interviewers

### Option 1: Playwright HTML Report
```bash
npm run report
```
- Opens in browser automatically
- Shows test results, screenshots, traces
- Easy to navigate

### Option 2: Allure Report
```bash
npm run allure:serve
```
- More professional looking
- Detailed charts and graphs
- Historical trends

## 💡 Pro Tips for Interview

1. **Think Aloud**: Explain what you're doing and why
2. **Start Simple**: Get basic tests working first
3. **Use Existing Code**: Reference examples in the framework
4. **Ask Questions**: Clarify requirements before coding
5. **Test Frequently**: Run tests often to catch issues early
6. **Handle Failures**: Show how you debug when tests fail
7. **Be Organized**: Keep code clean and well-structured
8. **Show Knowledge**: Mention best practices as you code

## 🆘 Common Issues & Solutions

### Issue: Test times out
```typescript
// Solution: Increase timeout or wait for element
test.setTimeout(60000); // 60 seconds
await page.waitForSelector('.my-element', { timeout: 30000 });
```

### Issue: Element not found
```typescript
// Solution: Wait for element to be visible
await page.waitForSelector('.my-element', { state: 'visible' });
```

### Issue: Race conditions
```typescript
// Solution: Use Playwright's auto-waiting or explicit waits
await page.waitForLoadState('networkidle');
```

### Issue: Flaky tests
```typescript
// Solution: Use stable locators and proper waits
// Prefer getByRole, getByTestId over CSS selectors
```

## 📝 Interview Scenario Example

**Scenario**: "Create automated tests for a login form with username, password, and submit button."

**Your Approach**:

1. **Create Page Object**: `LoginPage.ts`
2. **Write Test Cases**:
   - Valid login
   - Invalid credentials
   - Empty fields
   - Password visibility toggle
3. **Run Tests**: `npm test`
4. **Show Results**: `npm run allure:serve`
5. **Explain**: Walk through your code and decisions

## 🎬 Final Check Before Interview

```bash
# 1. Clean previous results
npm run clean

# 2. Run all tests
npm test

# 3. Generate fresh reports
npm run allure:serve

# 4. Check everything in your IDE
# - Files are organized
# - Code is readable
# - No syntax errors
```

## 🔗 Quick Reference

| Action | Command |
|--------|---------|
| Run all tests | `npx playwright test` |
| Run with browser visible | `npx playwright test --headed` |
| Interactive mode | `npx playwright test --ui` |
| Debug mode | `npx playwright test --debug` |
| Specific file | `npx playwright test path/to/file.spec.ts` |
| Specific browser | `npx playwright test --project=chromium` |
| Run by test name | `npx playwright test -g "test name"` |
| View HTML report | `npx playwright show-report` |
| View Allure report | `allure serve allure-results` |
| Clean reports | `rm -rf test-results playwright-report allure-results` |

---

**You're all set! Good luck with your interview! 🎉**

Remember: It's not about completing everything perfectly, it's about showing your problem-solving skills, coding ability, and communication!

