# Playwright TypeScript E2E Testing Framework

A comprehensive end-to-end testing framework built with Playwright and TypeScript, featuring Page Object Model, Allure reporting, Docker support, and CI/CD integration.

## 🚀 Features

- ✅ **Playwright** - Modern, fast, and reliable browser automation
- ✅ **TypeScript** - Type-safe test development
- ✅ **Page Object Model (POM)** - Maintainable test architecture
- ✅ **Allure Reports** - Beautiful and detailed test reports
- ✅ **Multi-browser Support** - Chrome, Firefox, Safari, Mobile browsers
- ✅ **Docker Support** - Containerized test execution
- ✅ **CI/CD Ready** - GitHub Actions workflow included
- ✅ **API Testing** - Built-in API testing capabilities
- ✅ **Custom Fixtures** - Reusable test setup and teardown
- ✅ **Test Data Management** - Centralized test data

## 📁 Project Structure

```
DemoTest/
├── pages/                  # Page Object Models
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   └── HomePage.ts
├── utils/                  # Utility functions
│   ├── helpers.ts
│   └── logger.ts
├── fixtures/               # Custom test fixtures
│   └── test-fixtures.ts
├── data/                   # Test data
│   └── test-data.ts
├── tests/
│   ├── e2e/                # End-to-end tests
│   │   ├── example.spec.ts
│   │   └── demo.spec.ts
│   └── api/                # API tests
│       └── api-example.spec.ts
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
└── .github/
    └── workflows/
        └── playwright.yml # CI/CD workflow

```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Allure (already installed on your system)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npm run install:browsers
   ```

3. **Create environment file:**
   Copy the environment example and configure:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

## 🧪 Running Tests

### Playwright Commands (Recommended)

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in UI mode (interactive - BEST for development)
npx playwright test --ui

# Debug tests
npx playwright test --debug

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test file
npx playwright test tests/e2e/demo.spec.ts

# Run specific test by name
npx playwright test -g "should login successfully"

# Run tests in specific folder
npx playwright test tests/e2e
npx playwright test tests/api

# Run with trace for debugging
npx playwright test --trace on

# Run failed tests only
npx playwright test --last-failed
```

### NPM Scripts (Shortcuts)

```bash
# If you prefer shorter commands, these npm scripts are available:
npm test                 # = npx playwright test
npm run test:headed      # = npx playwright test --headed
npm run test:ui          # = npx playwright test --ui
npm run test:debug       # = npx playwright test --debug
npm run test:chromium    # Run chromium only
npm run test:firefox     # Run firefox only
npm run test:webkit      # Run webkit only
npm run test:mobile      # Run mobile browsers
npm run test:e2e         # Run e2e tests only
npm run test:api         # Run api tests only
```

### Viewing Reports

```bash
# View Playwright HTML report
npx playwright show-report

# Allure reports
allure serve allure-results           # Generate and serve
allure generate allure-results --clean # Generate only
allure open allure-report             # Open existing report

# Or use npm shortcuts
npm run report           # = npx playwright show-report
npm run allure:serve     # = allure serve allure-results
```

### Clean up

```bash
# Clean all reports and results
rm -rf test-results playwright-report allure-results allure-report

# Or use npm script
npm run clean
```

## 🐳 Docker Usage

### Build and run with Docker

```bash
# Build Docker image
docker build -t playwright-tests .

# Run tests in Docker
docker run --rm playwright-tests

# Run with Docker Compose
docker-compose up --build

# Run specific tests
docker-compose run playwright-tests npm run test:chromium
```

## 🎯 Writing Tests

### Example Test with Page Objects

```typescript
import { test, expect } from '../../fixtures/test-fixtures';
import { TestUsers } from '../../data/test-data';

test('should login successfully', async ({ loginPage, homePage }) => {
  await loginPage.navigate();
  await loginPage.login(TestUsers.validUser.username, TestUsers.validUser.password);
  
  const isLoggedIn = await homePage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});
```

### Creating Page Objects

1. Extend `BasePage` class
2. Define locators in constructor
3. Create action methods
4. Add assertion helpers

Example:
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  private readonly myButton: Locator;

  constructor(page: Page) {
    super(page);
    this.myButton = page.locator('#my-button');
  }

  async clickMyButton(): Promise<void> {
    await this.myButton.click();
  }
}
```

## 📊 Reports

### Playwright HTML Report
- Generated automatically after test run
- View with: `npm run report`
- Location: `playwright-report/`

### Allure Report
- Rich, interactive test reports
- Generate with: `npm run allure:generate`
- View with: `npm run allure:open`
- Location: `allure-report/`

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)
- Browser settings
- Test timeout configurations
- Reporter settings
- Base URL and environment setup

### TypeScript Config (`tsconfig.json`)
- TypeScript compiler options
- Module resolution
- Path aliases

### Environment Variables (`.env`)
- `BASE_URL` - Application base URL
- `TEST_USERNAME` - Test user username
- `TEST_PASSWORD` - Test user password
- `HEADLESS` - Run in headless mode
- `CI` - CI/CD flag

## 🚀 CI/CD

### GitHub Actions
- Workflow file: `.github/workflows/playwright.yml`
- Runs on push and pull requests
- Multi-browser testing in parallel
- Automatic Allure report generation
- Deploys reports to GitHub Pages

### Setting up GitHub Actions
1. Push code to GitHub repository
2. Enable GitHub Actions in repository settings
3. Enable GitHub Pages (Settings → Pages → Source: gh-pages)
4. Configure secrets if needed (Settings → Secrets)

## 📝 Best Practices

1. **Use Page Object Model** - Keep test logic separate from page structure
2. **Use Custom Fixtures** - Share common setup across tests
3. **Centralize Test Data** - Manage test data in `src/data/`
4. **Use Meaningful Assertions** - Make test failures clear
5. **Keep Tests Independent** - Each test should run standalone
6. **Use Descriptive Names** - Test and method names should explain intent
7. **Handle Waits Properly** - Use Playwright's auto-waiting features
8. **Take Screenshots on Failure** - Already configured in `playwright.config.ts`

## 🎓 Tips for Interview

1. **Preparation:**
   - Familiarize yourself with the folder structure
   - Run the demo tests to ensure everything works
   - Review the Page Object Model pattern
   - Understand the fixture system

2. **During the Interview:**
   - Start by understanding the scenario requirements
   - Break down the scenario into smaller test cases
   - Create page objects first, then write tests
   - Use existing utilities and helpers
   - Run tests frequently to verify your work
   - Don't hesitate to ask clarifying questions
   - Explain your thought process while coding

3. **Showcase Skills:**
   - Demonstrate POM usage
   - Show how to organize tests logically
   - Use assertions effectively
   - Handle synchronization properly
   - Show debugging skills if tests fail
   - Generate and show Allure reports

## 🤝 Contributing

Feel free to extend this framework with additional features:
- More utility functions
- Additional page objects
- Custom reporters
- Performance testing
- Visual regression testing
- Accessibility testing

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Allure Report](https://docs.qameta.io/allure/)
- [Page Object Model](https://playwright.dev/docs/pom)

## 📧 Support

If you encounter any issues or have questions, please refer to the official Playwright documentation or reach out to the team.

---

**Good luck with your interview! 🎉**

