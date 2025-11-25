# Playwright TypeScript E2E Testing Framework

A production-ready end-to-end testing framework built with Playwright and TypeScript, featuring Page Object Model, Allure reporting, Docker support, and CI/CD integration.

[![Playwright Tests](https://github.com/tasyusuf/DemoTestPW/actions/workflows/playwright.yml/badge.svg)](https://github.com/tasyusuf/DemoTestPW/actions/workflows/playwright.yml)

**📊 Live Test Report:** https://tasyusuf.github.io/DemoTestPW/

---

## 📖 Table of Contents

- [Quick Start](#-quick-start)
- [What is This Framework?](#-what-is-this-framework)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Docker Usage](#-docker-usage)
- [Viewing Reports](#-viewing-reports)
- [Configuration](#-configuration)
- [CI/CD](#-cicd)
- [Writing Tests](#-writing-tests)
- [Best Practices](#-best-practices)
- [Interview Preparation](#-interview-preparation)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/tasyusuf/DemoTestPW.git
cd DemoTestPW

# Install dependencies
npm install

# Install Playwright Chrome
npx playwright install chrome

# Run tests
npx playwright test

# View report
npx playwright show-report
```

---

## 📖 What is This Framework?

This is a **production-ready test automation framework** designed for:
- ✅ **Web application testing** using Playwright (Chrome, Firefox, Safari, Edge)
- ✅ **API testing** with built-in HTTP client
- ✅ **Mobile testing** with device emulation
- ✅ **Cross-browser testing** in parallel
- ✅ **Visual testing** with screenshots and videos
- ✅ **CI/CD integration** for automated testing pipelines

### Key Technologies

- **Playwright**: Modern browser automation tool by Microsoft - faster and more reliable than Selenium
- **TypeScript**: Adds type safety to JavaScript, catches errors before runtime
- **Page Object Model (POM)**: Design pattern for maintainable tests
- **Allure Report**: Beautiful, interactive test reports with charts and graphs
- **GitHub Actions**: Automated CI/CD pipeline
- **Docker**: Containerized tests for consistency

---

## 📁 Project Structure

```
DemoTest/
├── pages/                  # Page Object Models
│   ├── BasePage.ts        # Base class with common functionality
│   ├── LoginPage.ts       # Example login page
│   └── HomePage.ts        # Example home page
│
├── fixtures/              # Test fixtures (setup/teardown)
│   └── test-fixtures.ts   # Custom fixtures for tests
│
├── utils/                 # Helper functions
│   ├── helpers.ts        # Utility functions
│   └── logger.ts         # Logging utility
│
├── data/                  # Test data
│   └── test-data.ts      # Centralized test data
│
├── tests/
│   ├── e2e/              # End-to-end tests
│   │   ├── demo.spec.ts  # Working demo tests
│   │   └── example.spec.ts # Template tests (skipped)
│   └── api/              # API tests
│       └── api-example.spec.ts
│
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json         # TypeScript configuration
├── Dockerfile            # Docker container setup
├── docker-compose.yml    # Docker Compose configuration
└── .github/
    └── workflows/
        └── playwright.yml # CI/CD workflow
```

### Why This Structure?

- **Separation of concerns** - Each folder has a specific purpose
- **Easy to navigate** - New team members can find things quickly
- **Scalable** - Easy to add new pages, tests, or utilities
- **Maintainable** - Changes in one area don't affect others

---

## 🛠️ Installation

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Allure (optional, for local reporting)

### Steps

1. **Clone and install:**
   ```bash
   git clone https://github.com/tasyusuf/DemoTestPW.git
   cd DemoTestPW
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install chrome
   ```

3. **Verify installation:**
   ```bash
   npx playwright test tests/e2e/demo.spec.ts
   ```

---

## 🧪 Running Tests

### Essential Commands

```bash
# Run all tests
npx playwright test

# Run with visible browser (headed mode)
npx playwright test --headed

# Run in UI mode (BEST - interactive debugging)
npx playwright test --ui

# Debug a specific test
npx playwright test tests/e2e/demo.spec.ts --debug

# Run specific browser
npx playwright test --project=chromium

# Run by test name
npx playwright test -g "should login successfully"

# Run with trace for debugging
npx playwright test --trace on
```

### Test Types

```bash
# E2E tests only
npx playwright test tests/e2e

# API tests only
npx playwright test tests/api

# Specific file
npx playwright test tests/e2e/demo.spec.ts
```

---

## 🐳 Docker Usage

Run tests in Docker containers for consistency across environments.

### Quick Start with Docker

```bash
# 🌟 EASIEST: Run tests + view report (one command)
npm run docker:full

# Or step-by-step:

# 1. Run tests in Docker
npm run docker:test
# or: docker-compose up --build

# 2. View Allure report
npm run docker:report

# Alternative Docker commands:

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f playwright-tests

# Stop containers
docker-compose down
```

### Using Docker Commands Directly

```bash
# Build image
docker build -t playwright-tests .

# Run tests with volume mounts
docker run --rm \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/playwright-report:/app/playwright-report \
  -v $(pwd)/allure-results:/app/allure-results \
  playwright-tests
```

### Run Specific Tests in Docker

```bash
# E2E tests only
docker-compose run playwright-tests npm run test:e2e

# API tests only
docker-compose run playwright-tests npm run test:api

# Specific test file
docker-compose run playwright-tests npx playwright test tests/e2e/demo.spec.ts

# Interactive shell
docker-compose run playwright-tests sh
```

### Environment Variables

Override BASE_URL or other variables:

```bash
# Set environment variable
BASE_URL=https://staging.app.com docker-compose up

# Or create .env file:
echo "BASE_URL=https://staging.app.com" > .env
docker-compose up
```

### View Reports After Docker Run

Reports are automatically saved to your local folders via Docker volumes:

```bash
# 🌟 RECOMMENDED: Run Docker tests + view Allure report (one command)
npm run docker:full

# Or step-by-step:

# 1. Run tests in Docker
npm run docker:test
# or: docker-compose up --build

# 2. Generate & view Allure report
npm run docker:report
# or: npm run allure:generate && npm run allure:open

# View Playwright report
npm run report
# or: npx playwright show-report

# Generate Allure HTML report only
npm run allure:generate

# Open existing Allure report
npm run allure:open
```

### Benefits of Docker

- ✅ **Consistent environment** - Same setup everywhere
- ✅ **Isolated** - Doesn't affect local machine  
- ✅ **CI/CD ready** - Same container locally and in pipeline
- ✅ **No local browser install** - Everything in container
- ✅ **Portable** - Works on any machine with Docker

### Troubleshooting Docker

```bash
# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up

# Check logs
docker-compose logs playwright-tests

# Clean up Docker
docker system prune -a
```

---

## 📊 Viewing Reports

### Playwright HTML Report

```bash
# View after test run
npx playwright show-report
```

**Features:**
- Screenshots on failure
- Videos on failure
- Test traces
- Execution timeline

### Allure Report

```bash
# Generate and serve (if Allure installed locally)
allure serve allure-results

# Or download from CI artifacts and run:
allure serve ~/Downloads/allure-results
```

**Features:**
- Beautiful interactive UI
- Charts and graphs
- Historical trends
- Detailed test steps

### Live Report (CI)

**View deployed report:** https://tasyusuf.github.io/DemoTestPW/

This updates automatically on every push to `main`.

---

## ⚙️ Configuration

### playwright.config.ts

```typescript
// Key settings explained:

timeout: 45_000              // 45 seconds per test
workers: process.env.CI ? 3 : 1  // 3 workers in CI, 1 locally
retries: process.env.CI ? 1 : 0  // Retry once in CI
channel: 'chrome'            // Use Google Chrome
```

### Local vs CI Differences

| Setting | Local | CI | Why? |
|---------|-------|-----|------|
| Workers | 1 | 3 | Debug vs Speed |
| Retries | 0 | 1 | Catch bugs vs Handle flakes |
| Viewport | Maximized | 1920x1080 | Natural vs Consistent |
| Browser | Chrome | Chrome | Fast and reliable |

### Environment Variables

Create `.env` file (not in repo):

```bash
BASE_URL=https://your-app.com
TEST_USERNAME=testuser
TEST_PASSWORD=testpass
```

Update in `playwright.config.ts`:
```typescript
baseURL: process.env.BASE_URL || 'https://example.com'
```

---

## 🚀 CI/CD

### GitHub Actions Workflow

**Location:** `.github/workflows/playwright.yml`

**Triggers:**
- Push to `main` branch
- Pull requests to `main`
- Manual trigger from Actions tab

**What It Does:**
1. ✅ Installs Node.js and dependencies
2. ✅ Installs Chrome browser
3. ✅ Runs all tests (3 workers in parallel)
4. ✅ Generates Allure report
5. ✅ Deploys report to GitHub Pages
6. ✅ Uploads artifacts (screenshots, videos)

**Duration:** ~5-7 minutes

### View CI Results

- **Actions Tab:** https://github.com/tasyusuf/DemoTestPW/actions
- **Live Report:** https://tasyusuf.github.io/DemoTestPW/
- **Artifacts:** Download from workflow run page

### CI Configuration

Key permissions in workflow:
```yaml
permissions:
  contents: write    # Push to gh-pages
  pages: write       # Deploy GitHub Pages
  id-token: write    # Secure deployment
```

---

## ✍️ Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test('test name', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Expected/);
});
```

### Using Page Objects

```typescript
import { test, expect } from '../fixtures/test-fixtures';
import { TestUsers } from '../data/test-data';

test('login test', async ({ loginPage, homePage }) => {
  await loginPage.navigate();
  await loginPage.login(TestUsers.validUser.username, TestUsers.validUser.password);
  expect(await homePage.isLoggedIn()).toBeTruthy();
});
```

### Locator Strategies (Priority Order)

1. **`getByRole()`** - Best for accessibility (buttons, links, etc.)
2. **`getByLabel()`** - Good for form fields
3. **`getByTestId()`** - Reliable for dynamic content
4. **`getByText()`** - Quick for static text
5. **CSS/XPath** - Last resort (fragile)

### Common Patterns

```typescript
// Assertions
await expect(page).toHaveURL('/dashboard');
await expect(element).toBeVisible();
await expect(element).toHaveText('Welcome');

// Wait for network/state
await page.waitForLoadState('networkidle');
```

**💡 Tip:** Check existing tests in `tests/e2e/` for real examples.

---

## 🎯 Best Practices

### 1. Use Page Object Model

**Why:** Maintainability, reusability, readability

```typescript
// Bad: Direct interaction in test
await page.locator('#email').fill('test@example.com');
await page.locator('#password').fill('password');
await page.locator('button[type="submit"]').click();

// Good: Use page object
await loginPage.login('test@example.com', 'password');
```

### 2. Use Auto-Waiting

```typescript
// Bad: Manual waits
await page.waitForTimeout(5000);

// Good: Playwright auto-waits
await page.click('button');
```

### 3. Keep Tests Independent

Each test should work standalone without depending on others.

### 4. Use Meaningful Names

```typescript
// Bad
test('test1', async ({ page }) => { ... });

// Good
test('should display error message on invalid login', async ({ page }) => { ... });
```

### 5. Centralize Test Data

```typescript
// data/test-data.ts
export const TestUsers = {
  validUser: { username: 'testuser', password: 'testpass' }
};

// In test
await loginPage.login(TestUsers.validUser.username, TestUsers.validUser.password);
```

---

## 🎓 Interview Preparation

### What to Highlight

1. **Framework Architecture**
   - Page Object Model implementation
   - Separation of concerns (pages, tests, data, utils)
   - TypeScript for type safety

2. **CI/CD Integration**
   - Automated testing on every push
   - Parallel execution (3 workers)
   - Allure reports deployed to GitHub Pages

3. **Best Practices**
   - Auto-waiting (no sleeps/timeouts)
   - Semantic locators (getByRole)
   - Test isolation
   - Comprehensive reporting

### Common Interview Questions

**Q: Why Playwright over Selenium?**
"Playwright is modern, faster, has auto-waiting built-in, better support for SPAs, and includes features like network interception and multiple contexts out of the box."

**Q: How do you handle flaky tests?**
"I focus on root causes: use stable locators (getByRole), leverage auto-waiting, ensure proper test isolation, and configure retries only in CI (1 retry) to handle transient issues."

**Q: Why Page Object Model?**
"POM separates test logic from page structure. If UI changes, I update one place (the page object), not 50 test files. It makes tests more maintainable and readable."

**Q: How do you handle different environments?**
"I use environment variables in `.env` files and playwright.config.ts. BASE_URL can be changed for dev/staging/prod without code changes."

### Demo Flow During Interview

1. **Show structure**: Explain folders and their purpose
2. **Run tests**: `npx playwright test --ui` (visual)
3. **Show Page Object**: Open `pages/LoginPage.ts`
4. **Show test**: Open `tests/e2e/demo.spec.ts`
5. **Show reports**: Open Allure report URL
6. **Show CI**: Navigate to GitHub Actions
7. **Live coding**: Create a simple test based on scenario

---

## 🐛 Troubleshooting

### Tests Timing Out

```typescript
// Increase timeout for specific test
test('slow operation', async ({ page }) => {
  test.setTimeout(120_000); // 2 minutes
  // ... test code
});

// Or increase globally in playwright.config.ts
timeout: 60_000
```

### Element Not Found

```typescript
// Wait for element explicitly
await page.waitForSelector('.my-element', { state: 'visible' });
await page.click('.my-element');

// Or use better locator
await page.getByRole('button', { name: 'Submit' }).click();
```

### CI Fails But Local Passes

**Common causes:**
- Environment differences
- Timing issues (CI is slower)
- Hardcoded data

**Solution:**
```typescript
// Use proper waits
await page.waitForLoadState('networkidle');

// Use environment variables
baseURL: process.env.BASE_URL
```

### View Debug Logs

```bash
# Run with debug output
DEBUG=pw:api npx playwright test

# Or use trace
npx playwright test --trace on
npx playwright show-trace trace.zip
```

---

## 📚 Resources

### Official Documentation
- [Playwright Docs](https://playwright.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Allure Report](https://docs.qameta.io/allure/)
- [GitHub Actions](https://docs.github.com/en/actions)

### This Framework
- **Repository:** https://github.com/tasyusuf/DemoTestPW
- **Live Reports:** https://tasyusuf.github.io/DemoTestPW/
- **CI/CD Pipeline:** https://github.com/tasyusuf/DemoTestPW/actions

---

## 🤝 Contributing

Feel free to extend this framework:
- Add more page objects
- Create new test scenarios
- Improve utilities
- Enhance reporting
- Add visual regression testing
- Add accessibility testing

---

## 📞 Support

For questions or issues:
1. Check this README
2. Review [Playwright Documentation](https://playwright.dev/docs/intro)
3. Check [GitHub Actions logs](https://github.com/tasyusuf/DemoTestPW/actions)

---

## ✨ Features

- ✅ Page Object Model
- ✅ TypeScript
- ✅ Allure Reports
- ✅ GitHub Actions CI/CD
- ✅ Docker Support
- ✅ Parallel Execution
- ✅ Auto-waiting
- ✅ Screenshots & Videos
- ✅ API Testing
- ✅ Multiple Browsers
- ✅ Mobile Emulation Ready

---

**Framework Version:** 1.0.0  
**Playwright Version:** 1.56.1  
**Last Updated:** November 2025

**Built with ❤️ for QA Technical Interviews**
