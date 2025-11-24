# 🎨 Common Playwright Patterns & Examples

A collection of common patterns and code snippets for quick reference during test automation.

## 🔍 Locator Strategies

### Best Practices (Preferred Order)

```typescript
// 1. By Role (Most accessible and reliable)
await page.getByRole('button', { name: 'Sign in' });
await page.getByRole('textbox', { name: 'Email' });
await page.getByRole('checkbox', { name: 'Subscribe' });

// 2. By Label (Good for form fields)
await page.getByLabel('Email address');
await page.getByLabel('Password');

// 3. By Test ID (Best for dynamic content)
await page.getByTestId('submit-button');
await page.getByTestId('user-profile');

// 4. By Placeholder
await page.getByPlaceholder('Enter your email');

// 5. By Text
await page.getByText('Welcome back');
await page.getByText(/hello/i); // Case insensitive regex
```

### Complex Locators

```typescript
// Chaining locators
await page.locator('.header').getByRole('button', { name: 'Login' });

// Multiple matches - get specific one
await page.getByRole('button').nth(0); // First button
await page.getByRole('button').first(); // First
await page.getByRole('button').last(); // Last

// Filter locators
await page.getByRole('listitem').filter({ hasText: 'Product 1' });

// Has child element
await page.locator('article').filter({ has: page.locator('button') });

// Combining locators
await page.locator('div').and(page.locator('.visible'));
await page.locator('div').or(page.locator('span'));
```

## 📝 Form Interactions

### Input Fields

```typescript
// Fill input
await page.fill('#email', 'test@example.com');
await page.getByLabel('Email').fill('test@example.com');

// Clear and fill
await page.getByLabel('Email').clear();
await page.getByLabel('Email').fill('new@example.com');

// Type with delay (simulate real typing)
await page.type('#search', 'playwright', { delay: 100 });

// Press keys
await page.press('#search', 'Enter');
await page.press('#search', 'Control+A');
```

### Checkboxes and Radio Buttons

```typescript
// Check checkbox
await page.check('#terms');
await page.getByRole('checkbox', { name: 'Accept' }).check();

// Uncheck
await page.uncheck('#terms');

// Select radio button
await page.check('#option1');
await page.getByRole('radio', { name: 'Male' }).check();

// Verify state
expect(await page.isChecked('#terms')).toBeTruthy();
```

### Dropdowns and Select

```typescript
// Select by value
await page.selectOption('#country', 'USA');

// Select by label
await page.selectOption('#country', { label: 'United States' });

// Select by index
await page.selectOption('#country', { index: 2 });

// Multiple selections
await page.selectOption('#countries', ['USA', 'UK', 'Canada']);

// Get selected value
const selected = await page.inputValue('#country');
```

### File Upload

```typescript
// Upload single file
await page.setInputFiles('#upload', 'path/to/file.pdf');

// Upload multiple files
await page.setInputFiles('#upload', [
  'path/to/file1.pdf',
  'path/to/file2.pdf'
]);

// Remove uploaded files
await page.setInputFiles('#upload', []);
```

## 👆 Click Actions

```typescript
// Simple click
await page.click('button');

// Double click
await page.dblclick('button');

// Right click
await page.click('button', { button: 'right' });

// Click with modifiers
await page.click('button', { modifiers: ['Control'] });

// Click at specific position
await page.click('button', { position: { x: 10, y: 10 } });

// Force click (even if hidden)
await page.click('button', { force: true });

// Click and wait for navigation
await Promise.all([
  page.waitForNavigation(),
  page.click('a[href="/next-page"]')
]);
```

## ⏱️ Waits and Timing

### Auto-waiting (Built-in)

```typescript
// Playwright auto-waits for:
await page.click('button'); // Waits for button to be visible and enabled
await page.fill('#input', 'text'); // Waits for input to be editable
```

### Explicit Waits

```typescript
// Wait for element to be visible
await page.waitForSelector('.modal', { state: 'visible' });

// Wait for element to be hidden
await page.waitForSelector('.loading', { state: 'hidden' });

// Wait for element to exist in DOM
await page.waitForSelector('.element', { state: 'attached' });

// Wait for element to be removed from DOM
await page.waitForSelector('.element', { state: 'detached' });

// Wait for load state
await page.waitForLoadState('networkidle');
await page.waitForLoadState('domcontentloaded');
await page.waitForLoadState('load');

// Wait for URL
await page.waitForURL('**/dashboard');
await page.waitForURL(/.*dashboard/);

// Wait for function/condition
await page.waitForFunction(() => {
  return document.querySelector('.data')?.textContent === 'Loaded';
});

// Wait for timeout (avoid if possible)
await page.waitForTimeout(1000); // 1 second
```

## 📸 Screenshots and Videos

```typescript
// Full page screenshot
await page.screenshot({ path: 'screenshots/full.png', fullPage: true });

// Element screenshot
await page.locator('.hero').screenshot({ path: 'screenshots/hero.png' });

// Screenshot with options
await page.screenshot({
  path: 'screenshots/custom.png',
  type: 'png', // or 'jpeg'
  quality: 100, // For JPEG
  fullPage: false,
});

// Screenshot to buffer
const buffer = await page.screenshot();
```

## 🔄 Navigation

```typescript
// Navigate to URL
await page.goto('https://example.com');
await page.goto('https://example.com', { waitUntil: 'networkidle' });

// Go back/forward
await page.goBack();
await page.goForward();

// Reload
await page.reload();

// Get current URL
const url = page.url();

// Get title
const title = await page.title();
```

## 🎭 Assertions

### Element Assertions

```typescript
import { expect } from '@playwright/test';

// Visibility
await expect(page.locator('.modal')).toBeVisible();
await expect(page.locator('.modal')).toBeHidden();

// Enabled/Disabled
await expect(page.locator('button')).toBeEnabled();
await expect(page.locator('button')).toBeDisabled();

// Text content
await expect(page.locator('h1')).toHaveText('Welcome');
await expect(page.locator('h1')).toContainText('Wel');

// Count
await expect(page.locator('li')).toHaveCount(5);

// Attribute
await expect(page.locator('a')).toHaveAttribute('href', '/home');

// CSS class
await expect(page.locator('div')).toHaveClass('active');
await expect(page.locator('div')).toHaveClass(/active/);

// Value (for inputs)
await expect(page.locator('#email')).toHaveValue('test@example.com');

// URL
await expect(page).toHaveURL('https://example.com/dashboard');
await expect(page).toHaveURL(/.*dashboard/);

// Title
await expect(page).toHaveTitle('My App');
await expect(page).toHaveTitle(/My App/);
```

### Custom Assertions

```typescript
// Check if element exists
const elementCount = await page.locator('.item').count();
expect(elementCount).toBeGreaterThan(0);

// Check URL contains
expect(page.url()).toContain('/dashboard');

// Check text content
const text = await page.locator('h1').textContent();
expect(text).toBe('Welcome');
```

## 🍪 Cookies and Storage

### Cookies

```typescript
// Get all cookies
const cookies = await context.cookies();

// Get specific cookie
const cookie = cookies.find(c => c.name === 'session');

// Add cookie
await context.addCookies([{
  name: 'session',
  value: 'abc123',
  domain: 'example.com',
  path: '/',
}]);

// Clear cookies
await context.clearCookies();
```

### Local Storage

```typescript
// Set local storage
await page.evaluate(() => {
  localStorage.setItem('key', 'value');
});

// Get local storage
const value = await page.evaluate(() => {
  return localStorage.getItem('key');
});

// Clear local storage
await page.evaluate(() => {
  localStorage.clear();
});
```

### Session Storage

```typescript
// Similar to localStorage
await page.evaluate(() => {
  sessionStorage.setItem('key', 'value');
});

const value = await page.evaluate(() => {
  return sessionStorage.getItem('key');
});
```

## 🎪 Multiple Windows/Tabs

```typescript
// Open new page
const newPage = await context.newPage();
await newPage.goto('https://example.com');

// Handle popup
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('a[target="_blank"]')
]);
await popup.waitForLoadState();

// Get all pages
const pages = context.pages();

// Close page
await page.close();
```

## 🖱️ Mouse and Keyboard

### Mouse Actions

```typescript
// Hover
await page.hover('button');

// Drag and drop
await page.dragAndDrop('#source', '#target');

// Mouse wheel
await page.mouse.wheel(0, 100); // Scroll down
```

### Keyboard Actions

```typescript
// Press key
await page.keyboard.press('Enter');
await page.keyboard.press('ArrowDown');

// Type text
await page.keyboard.type('Hello World');

// Key combinations
await page.keyboard.press('Control+A');
await page.keyboard.press('Control+C');
await page.keyboard.press('Meta+V'); // Mac Command key
```

## 📦 Network Interception

```typescript
// Wait for response
const response = await page.waitForResponse('**/api/users');
console.log(await response.json());

// Wait for specific request
const request = await page.waitForRequest('**/api/users');

// Mock API response
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ users: [] })
  });
});

// Abort requests (e.g., images)
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
```

## 🎬 Page Object Pattern

```typescript
// Base Page
class BasePage {
  constructor(protected page: Page) {}
  
  async goto(url: string) {
    await this.page.goto(url);
  }
  
  async getTitle() {
    return await this.page.title();
  }
}

// Specific Page
class LoginPage extends BasePage {
  private emailInput = this.page.getByLabel('Email');
  private passwordInput = this.page.getByLabel('Password');
  private submitButton = this.page.getByRole('button', { name: 'Login' });
  
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
  
  async isLoginButtonVisible() {
    return await this.submitButton.isVisible();
  }
}

// Usage in test
test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('/login');
  await loginPage.login('user@example.com', 'password');
});
```

## 🔁 Test Hooks

```typescript
test.describe('Test Suite', () => {
  // Before all tests in this describe block
  test.beforeAll(async ({ browser }) => {
    // Setup that runs once
  });

  // Before each test
  test.beforeEach(async ({ page }) => {
    // Setup that runs before every test
    await page.goto('/');
  });

  // After each test
  test.afterEach(async ({ page }) => {
    // Cleanup after each test
  });

  // After all tests
  test.afterAll(async ({ browser }) => {
    // Cleanup that runs once
  });

  test('my test', async ({ page }) => {
    // Test code
  });
});
```

## 🏷️ Test Annotations

```typescript
// Skip test
test.skip('not ready yet', async ({ page }) => {
  // ...
});

// Skip conditionally
test('conditional test', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Not working in Safari');
  // ...
});

// Only run this test
test.only('focus on this', async ({ page }) => {
  // ...
});

// Mark as flaky
test('flaky test', async ({ page }) => {
  test.flaky(); // Will retry on failure
  // ...
});

// Slow test (3x timeout)
test('slow test', async ({ page }) => {
  test.slow();
  // ...
});

// Custom timeout
test('custom timeout', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ...
});

// Test info and annotations
test('annotated test', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'issue', description: 'BUG-123' });
  // ...
});
```

## 🔍 Debugging

```typescript
// Pause execution
await page.pause();

// Step through
await page.step('Login user', async () => {
  await page.click('button');
});

// Console logging
page.on('console', msg => console.log(msg.text()));

// Take screenshot on failure
test('example', async ({ page }) => {
  try {
    // test code
  } catch (error) {
    await page.screenshot({ path: 'failure.png' });
    throw error;
  }
});
```

## 📱 Mobile Emulation

```typescript
// In test
test('mobile test', async ({ browser }) => {
  const iPhone = playwright.devices['iPhone 12'];
  const context = await browser.newContext({
    ...iPhone,
  });
  const page = await context.newPage();
  
  await page.goto('https://example.com');
  // ...
});

// Available devices
// iPhone 12, iPhone 12 Pro, iPhone 11, Pixel 5, etc.
```

## 🔐 Authentication

```typescript
// Save authentication state
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://example.com/login');
await page.fill('#email', 'user@example.com');
await page.fill('#password', 'password');
await page.click('button[type="submit"]');

// Save storage state
await context.storageState({ path: 'auth.json' });

// Reuse authentication
const context2 = await browser.newContext({
  storageState: 'auth.json'
});
```

---

## 💡 Quick Tips

1. **Use auto-waiting**: Playwright waits automatically, avoid explicit waits when possible
2. **Prefer user-facing selectors**: Use getByRole, getByLabel instead of CSS
3. **Keep tests independent**: Each test should work in isolation
4. **Use Page Object Model**: Separate page logic from test logic
5. **Handle flaky tests**: Add proper waits, not arbitrary timeouts
6. **Use test fixtures**: Share common setup across tests
7. **Enable tracing**: Use `trace: 'on'` for debugging
8. **Run in parallel**: Playwright runs tests in parallel by default

---

**Happy Testing! 🚀**

