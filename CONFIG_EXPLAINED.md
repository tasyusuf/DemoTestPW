# ⚙️ Configuration Explained

This document explains the Playwright configuration in simple terms.

## 🎯 Philosophy: Keep It Simple

**Why simple?**
- ✅ Easy to understand during interviews
- ✅ Quick to modify for different scenarios
- ✅ Less complexity = fewer bugs
- ✅ Focuses on what matters: **running tests**

## 📄 Configuration Breakdown

### Basic Settings

```typescript
testDir: './tests'
```
**What it does:** Tells Playwright where to find test files  
**Why it matters:** All `.spec.ts` files in `tests/` folder will be executed

---

```typescript
timeout: 45_000
```
**What it does:** Each test has 45 seconds to complete  
**Why 45 seconds?** 
- Most web tests finish in 5-15 seconds
- 45 seconds gives buffer for slower operations
- Prevents infinite hangs
- Can override per-test: `test.setTimeout(60000)`

---

```typescript
fullyParallel: true
```
**What it does:** Run tests at the same time (not one after another)  
**Why it matters:** 
- 10 tests = 10 seconds instead of 100 seconds
- Much faster feedback
- Better CI/CD performance

**Example:**
- Sequential: Test1 → Test2 → Test3 (30 seconds total)
- Parallel: Test1 + Test2 + Test3 (10 seconds total)

---

```typescript
forbidOnly: !!process.env.CI
```
**What it does:** Prevents `test.only()` in CI/CD  
**Why it matters:**
- `test.only()` runs just one test (ignores others)
- Good for local debugging
- Bad for CI - you want ALL tests to run
- This catches accidental commits of `test.only()`

---

```typescript
retries: process.env.CI ? 1 : 0
```
**What it does:** Retry failed tests automatically  
**Local (0 retries):** Test fails = stays failed (easier to debug)  
**CI (1 retry):** Test fails = try once more (handles flakiness)

**Why different?**
- Local: You're watching tests, want immediate feedback
- CI: Network issues, timing issues are common - one retry helps

---

```typescript
workers: process.env.CI ? 3 : 1
```
**What it does:** Number of parallel test runners  
**Local (1 worker):** One test at a time (easier to watch/debug)  
**CI (3 workers):** Three tests simultaneously (faster execution)

**Why different?**
- Local: You want to **see** what's happening
- CI: You want **speed**, don't need to watch

---

### Reporters

```typescript
reporter: [
  ['list'],           // Console output
  ['html'],           // HTML report
  ['allure-playwright'], // Allure report
]
```

**What each does:**

1. **`list`** - Shows test results in terminal as they run
   ```
   ✓ should login successfully (2.3s)
   ✗ should handle invalid credentials (1.8s)
   ```

2. **`html`** - Generates `playwright-report/index.html`
   - Beautiful web interface
   - Screenshots, traces, videos
   - View with: `npx playwright show-report`

3. **`allure-playwright`** - Generates `allure-results/`
   - Professional reporting
   - Charts, graphs, trends
   - View with: `allure serve allure-results`

---

### Use Settings (Global Test Behavior)

```typescript
baseURL: process.env.BASE_URL || 'https://example.com'
```
**What it does:** Default URL for tests  
**How to use:**
```typescript
// Instead of:
await page.goto('https://example.com/login');

// You can write:
await page.goto('/login'); // Uses baseURL automatically
```

**Why it matters:**
- Test different environments easily
- Local: `BASE_URL=http://localhost:3000 npx playwright test`
- Staging: `BASE_URL=https://staging.app.com npx playwright test`
- Prod: `BASE_URL=https://app.com npx playwright test`

---

```typescript
channel: 'chrome'
```
**What it does:** Use Google Chrome (not Chromium)  
**Why Chrome?**
- Most popular browser (65%+ market share)
- Most users use Chrome
- Stable and reliable
- Has DevTools

**Chromium vs Chrome:**
- **Chromium**: Open-source, no Google services
- **Chrome**: Google's browser, includes extra features
- For testing: Chrome is more realistic

---

```typescript
viewport: process.env.CI ? { width: 1920, height: 1080 } : null
launchOptions: process.env.CI ? undefined : { args: ['--start-maximized'] }
```

**What it does:** Controls browser window size

**Local (null + maximized):**
- Browser opens **full screen** on your monitor
- Natural to watch tests
- Easier to debug

**CI (1920x1080):**
- Fixed size (Full HD resolution)
- Consistent screenshots
- Most common desktop resolution

---

```typescript
trace: 'retain-on-failure'
screenshot: 'only-on-failure'
video: 'retain-on-failure'
```

**What it does:** Captures debugging info only when tests fail

**Why only on failure?**
- Saves disk space (videos are large)
- Faster execution
- You only need debug info for failed tests

**What gets captured on failure:**
- **Screenshot** - What page looked like at moment of failure
- **Video** - Recording of entire test run
- **Trace** - Complete timeline with network, console, DOM snapshots

**How to view:**
- Screenshots/Videos: in `test-results/` folder
- Trace: `npx playwright show-trace trace.zip`

---

```typescript
actionTimeout: 10_000
navigationTimeout: 30_000
```

**What it does:** How long to wait for actions

**Action Timeout (10 seconds):**
- Clicking buttons
- Filling inputs
- Checking checkboxes
- Any element interaction

**Navigation Timeout (30 seconds):**
- `page.goto()` - Loading new pages
- `page.reload()` - Refreshing pages
- Slower because pages load external resources

**Why these values?**
- 10s for actions: Most elements appear in 1-2 seconds, 10s is safe buffer
- 30s for navigation: Pages can be slow, especially on slower connections

---

### Projects (Browsers)

```typescript
projects: [
  {
    name: 'chromium',
    use: { channel: 'chrome' },
  },
]
```

**What it does:** Defines which browsers to test

**Current setup: Chrome only**
- ✅ Fast (one browser)
- ✅ Covers 65%+ users
- ✅ Good for interviews
- ✅ Easy to debug

**When to add more browsers?**
- Client requires Firefox/Safari testing
- Cross-browser compatibility is critical
- After core functionality is stable

**How to add Firefox/Safari:** Uncomment in config file

---

## 🔄 Local vs CI Differences

| Setting | Local | CI | Why Different? |
|---------|-------|-----|----------------|
| Workers | 1 | 3 | Local: watch tests; CI: speed |
| Retries | 0 | 1 | Local: debug immediately; CI: handle flakiness |
| Viewport | Maximized | 1920x1080 | Local: natural; CI: consistent |
| Launch | Maximized | Headless | Local: see browser; CI: no screen |

## 🎓 Common Modifications

### Test Different URL

```bash
# Method 1: Environment variable
BASE_URL=https://staging.example.com npx playwright test

# Method 2: Update .env file
# BASE_URL=https://staging.example.com
```

### Increase Timeout for Slow Tests

```typescript
// In specific test
test('slow operation', async ({ page }) => {
  test.setTimeout(120_000); // 2 minutes for this test only
  // ... test code
});
```

### Run Tests Sequentially (Not Parallel)

```bash
npx playwright test --workers=1
```

### Add More Browsers

Uncomment in `playwright.config.ts`:
```typescript
projects: [
  { name: 'chromium', use: { channel: 'chrome' } },
  { name: 'firefox', use: { channel: 'firefox' } }, // Uncomment
  { name: 'webkit' }, // Uncomment (Safari)
]
```

Then run:
```bash
npx playwright test --project=firefox
```

---

## 💡 Interview Tips

### Question: "Why Chrome only?"
**Answer:** "For rapid development and interview scope, Chrome covers 65%+ users. We can easily add Firefox/Safari by uncommenting project configs when cross-browser testing is needed."

### Question: "Why different workers for local vs CI?"
**Answer:** "Local uses 1 worker so I can watch tests execute and debug easily. CI uses 3 workers for faster feedback in the pipeline. It's optimized for each use case."

### Question: "How do you handle flaky tests?"
**Answer:** "CI retries failed tests once to handle transient issues. Locally, no retries so I catch flakiness early. Long-term, I fix root causes rather than rely on retries."

---

## 🔧 Troubleshooting

### Tests timing out?
```typescript
// Increase timeout
timeout: 60_000, // 60 seconds
```

### Need to see browser?
```bash
npx playwright test --headed
```

### Tests too slow?
```typescript
// Increase workers
workers: 4, // Run 4 tests simultaneously
```

### Need detailed logs?
```bash
DEBUG=pw:api npx playwright test
```

---

## 📚 Further Reading

- [Playwright Config Docs](https://playwright.dev/docs/test-configuration)
- [Reporters](https://playwright.dev/docs/test-reporters)
- [Parallelism](https://playwright.dev/docs/test-parallel)
- [Timeouts](https://playwright.dev/docs/test-timeouts)

---

**Remember: Simple configuration = Easy to understand = Easy to modify = Better interviews!**

