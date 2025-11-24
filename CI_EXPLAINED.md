# 🚀 CI/CD Explained - GitHub Actions

This document explains how Continuous Integration (CI) works for this project.

## 🎯 What is CI/CD?

**CI (Continuous Integration):**
- Automatically runs tests when you push code to GitHub
- Catches bugs before they reach production
- Ensures all tests pass before merging code

**Our CI Setup:**
- Runs on GitHub Actions (free for public repos)
- Executes all Playwright tests
- Generates HTML and Allure reports
- Deploys Allure report to GitHub Pages

## 📋 Workflow File

Location: `.github/workflows/playwright.yml`

### When CI Runs (Triggers)

```yaml
on:
  push:
    branches: [main]           # Every push to main branch
  pull_request:
    branches: [main]           # Every PR to main branch
  workflow_dispatch:           # Manual trigger from GitHub UI
```

**Examples:**
1. You push code: `git push origin main` → CI runs automatically
2. You create PR → CI runs to validate changes
3. Click "Run workflow" in GitHub Actions tab → CI runs manually

### Jobs Explained

Our workflow has **2 jobs** that run sequentially:

#### Job 1: `test` - Run Tests

**What it does:**
1. ✅ Checks out your code
2. ✅ Sets up Node.js 20
3. ✅ Installs dependencies (`npm ci`)
4. ✅ Installs Chrome browser
5. ✅ Runs all Playwright tests
6. ✅ Uploads test results as artifacts

**Environment:**
- `CI=true` → Triggers CI-specific config settings
- Uses 3 workers (parallel execution)
- 1 retry for flaky tests
- 1920x1080 viewport
- All configured in `playwright.config.ts`

**Duration:** ~2-5 minutes

#### Job 2: `allure-report` - Generate Report

**What it does:**
1. ✅ Downloads test results from Job 1
2. ✅ Generates beautiful Allure report
3. ✅ Deploys to GitHub Pages (gh-pages branch)
4. ✅ Keeps history of last 20 runs

**Result:** 
- Report available at: `https://your-username.github.io/your-repo`
- Shows trends, statistics, test history

**Duration:** ~1-2 minutes

## 🔧 How to Enable

### Step 1: Enable GitHub Actions

Actions are enabled by default, but verify:
1. Go to your repo on GitHub
2. Click "Actions" tab
3. If disabled, click "Enable Actions"

### Step 2: Enable GitHub Pages (for Allure Reports)

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** (will be created automatically)
4. Folder: **/ (root)**
5. Click **Save**

### Step 3: Trigger First Run

**Option A: Push code**
```bash
git add .
git commit -m "Enable CI"
git push origin main
```

**Option B: Manual trigger**
1. Go to "Actions" tab on GitHub
2. Click "Playwright Tests" workflow
3. Click "Run workflow" button
4. Select branch: main
5. Click "Run workflow"

## 📊 Viewing Results

### GitHub Actions UI

1. Go to **Actions** tab in your repo
2. Click on the latest workflow run
3. See the status (✅ passing or ❌ failing)
4. Click on "test" job to see logs
5. Download artifacts (test-results, reports)

### Test Results Artifacts

After each run, these are available for download:
- **playwright-report** - HTML report with screenshots
- **test-results** - Raw test results, videos, traces
- **allure-results** - Data for Allure report

**How to download:**
1. Go to workflow run
2. Scroll to "Artifacts" section
3. Click to download ZIP file

### Allure Report (GitHub Pages)

After first successful run:
- Report URL: `https://your-username.github.io/your-repo`
- Updates automatically on each run
- Shows test trends over time
- Interactive charts and graphs

## 🎨 What Gets Tested in CI

```bash
npx playwright test
```

This runs:
- ✅ All tests in `tests/e2e/`
- ✅ All tests in `tests/api/`
- ✅ Chrome only (fastest)
- ✅ 3 tests in parallel
- ✅ With automatic retries

## 📈 CI vs Local Differences

| Feature | Local | CI |
|---------|-------|-----|
| Workers | 1 | 3 |
| Retries | 0 | 1 |
| Browser | Chrome (headed) | Chrome (headless) |
| Viewport | Maximized | 1920x1080 |
| Purpose | Debug | Validate |

**Why different?**
- **Local:** You want to SEE tests run and debug immediately
- **CI:** You want SPEED and handling of minor flakiness

## 🔍 Understanding CI Status

### ✅ Green Check (Passing)

```
✓ All tests passed
✓ Build successful
✓ Safe to merge
```

**What it means:**
- All tests executed successfully
- No failures or errors
- Code quality is good

### ❌ Red X (Failing)

```
✗ Some tests failed
✗ Build failed
✗ Do NOT merge
```

**What to do:**
1. Click on the failed workflow
2. Check which tests failed
3. Download artifacts for screenshots/videos
4. Fix the issue locally
5. Push the fix
6. CI runs again automatically

### 🟡 Yellow Dot (Running)

```
⚙ Tests in progress...
⏳ Please wait
```

**What it means:**
- CI is currently running
- Wait 3-7 minutes for completion
- Refresh page to see updates

## 🐛 Common CI Issues & Solutions

### Issue: CI fails but local passes

**Causes:**
- Environment differences
- Timing issues (CI is slower)
- Hardcoded data

**Solutions:**
```typescript
// Bad: Hardcoded
await page.click('#button-123');

// Good: Wait properly
await page.waitForSelector('#button-123', { state: 'visible' });
await page.click('#button-123');
```

### Issue: Flaky tests in CI

**Causes:**
- Race conditions
- Network delays
- Insufficient waits

**Solutions:**
```typescript
// Use auto-waiting
await page.click('button'); // Playwright waits automatically

// Or explicit waits
await page.waitForLoadState('networkidle');
```

### Issue: Tests timeout in CI

**Solution:** Increase timeout
```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(120_000); // 2 minutes
  // ... test code
});
```

### Issue: GitHub Pages not showing report

**Solutions:**
1. Check if gh-pages branch exists
2. Verify GitHub Pages is enabled
3. Wait 5-10 minutes after first deployment
4. Check repo Settings → Pages for URL

## 🎯 Best Practices for CI

### 1. Keep Tests Fast
```typescript
// Bad: Unnecessary waits
await page.waitForTimeout(5000);

// Good: Playwright auto-waits
await page.click('button');
```

### 2. Make Tests Stable
```typescript
// Bad: Fragile selector
await page.click('.btn-primary');

// Good: Semantic selector
await page.getByRole('button', { name: 'Submit' });
```

### 3. Clean Test Data
```typescript
// Use test.afterEach for cleanup
test.afterEach(async ({ page }) => {
  // Delete test data
  // Logout user
  // Reset state
});
```

### 4. Use Environment Variables
```typescript
// Bad: Hardcoded
baseURL: 'https://example.com'

// Good: Environment variable
baseURL: process.env.BASE_URL || 'https://example.com'
```

### 5. Monitor CI Performance
- Check run duration
- Aim for < 5 minutes
- Use parallel execution
- Skip unnecessary tests in CI

## 🔐 Secrets Management

For sensitive data (API keys, passwords):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add secret:
   - Name: `BASE_URL`
   - Value: `https://staging.example.com`
4. Use in workflow:
   ```yaml
   env:
     BASE_URL: ${{ secrets.BASE_URL }}
   ```

## 📊 Monitoring CI

### Success Rate

Good CI health:
- ✅ >95% pass rate
- ✅ <5 minutes duration
- ✅ No flaky tests

Poor CI health:
- ❌ <80% pass rate
- ❌ >15 minutes duration
- ❌ Frequent retries needed

### What to Monitor

1. **Pass rate** - How often tests pass
2. **Duration** - How long CI takes
3. **Flakiness** - Tests that fail randomly
4. **Coverage** - What's being tested

## 🚀 Advanced: Running Specific Tests in CI

Edit workflow file to add jobs:

```yaml
test-e2e-only:
  steps:
    # ... setup steps
    - name: Run E2E tests only
      run: npx playwright test tests/e2e

test-api-only:
  steps:
    # ... setup steps
    - name: Run API tests only
      run: npx playwright test tests/api
```

## 💡 Interview Tips

### Question: "How do you ensure tests run reliably in CI?"

**Answer:**
"I use several strategies:
1. **Stable selectors** - Use semantic locators like `getByRole`
2. **Proper waits** - Leverage Playwright's auto-waiting
3. **Retries** - Configure 1 retry in CI for transient issues
4. **Parallel execution** - Run tests concurrently for speed
5. **Environment consistency** - Use fixed viewport and browser version"

### Question: "What do you do when CI fails?"

**Answer:**
"First, I check the CI logs to identify which test failed and why. Then I download the artifacts - screenshots and videos show exactly what happened. If it's a flaky test, I investigate timing or race conditions. If it's a real bug, I reproduce locally, fix it, and push the update. CI runs automatically to verify the fix."

### Question: "How do you optimize CI performance?"

**Answer:**
"I focus on:
1. **Parallel execution** - Run tests concurrently (3 workers)
2. **Chrome only** - Multi-browser testing is for later stages
3. **Fast tests** - Avoid unnecessary waits, use auto-waiting
4. **Smart retries** - Only retry in CI, not locally
5. **Artifact retention** - Keep reports for 30 days only"

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [Allure Reports](https://docs.qameta.io/allure/)

---

**CI is your safety net - it catches bugs before they reach users!** ✅

