# 🔧 GitHub Actions Workflow Explained

This document explains our `playwright.yml` workflow line by line, with links to official documentation.

## 📚 Documentation Sources

### Primary Resources
1. **Playwright CI Guide:** https://playwright.dev/docs/ci
2. **GitHub Actions Docs:** https://docs.github.com/en/actions
3. **Workflow Syntax:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions

### Action-Specific Docs
- **checkout:** https://github.com/actions/checkout
- **setup-node:** https://github.com/actions/setup-node
- **upload-artifact:** https://github.com/actions/upload-artifact
- **download-artifact:** https://github.com/actions/download-artifact
- **allure-report-action:** https://github.com/simple-elf/allure-report-action
- **gh-pages:** https://github.com/peaceiris/actions-gh-pages

## 📋 Workflow Structure

### Section 1: Workflow Name & Triggers

```yaml
name: Playwright Tests
```
**What:** Display name in GitHub Actions tab  
**Docs:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name

---

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

**What:** When to run the workflow  
**Explanation:**
- `push` - Runs when code is pushed to main branch
- `pull_request` - Runs when PR is created/updated to main
- `workflow_dispatch` - Allows manual trigger from GitHub UI

**Docs:** 
- https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows
- https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow

---

### Section 2: Test Job

```yaml
jobs:
  test:
    name: Run Playwright Tests
    timeout-minutes: 60
    runs-on: ubuntu-latest
```

**What:** Defines a job named "test"  
**Explanation:**
- `name` - Friendly name shown in UI
- `timeout-minutes` - Max time before auto-cancellation (60 min)
- `runs-on` - Virtual machine to use (Ubuntu Linux)

**Docs:**
- https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow
- https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on
- https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes

**Why Ubuntu?**
- Free for public repos
- Fast and reliable
- Most common CI environment
- Same environment every time

---

### Step 1: Checkout Code

```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

**What:** Downloads your repository code to the runner  
**Explanation:** This is always the first step - gets your code from GitHub

**Docs:** 
- https://github.com/actions/checkout
- https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsuses

**Why needed?** Without this, the runner has an empty filesystem

---

### Step 2: Setup Node.js

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

**What:** Installs Node.js and sets up npm caching  
**Explanation:**
- `node-version: '20'` - Uses Node.js v20 (current LTS)
- `cache: 'npm'` - Caches node_modules for faster builds

**Docs:** 
- https://github.com/actions/setup-node
- https://github.com/actions/setup-node#caching-global-packages-data

**Why cache?**
- Downloads dependencies once
- Reuses on subsequent runs
- Saves 1-2 minutes per run

---

### Step 3: Install Dependencies

```yaml
- name: Install dependencies
  run: npm ci
```

**What:** Installs project dependencies  
**Explanation:**
- `npm ci` is like `npm install` but:
  - Uses package-lock.json exactly
  - Faster in CI environments
  - Removes node_modules first (clean install)
  - Fails if package.json and package-lock.json are out of sync

**Docs:** https://docs.npmjs.com/cli/v9/commands/npm-ci

**Why `npm ci` not `npm install`?**
- ✅ Faster (optimized for CI)
- ✅ More reliable (clean install)
- ✅ Deterministic (exact versions)

---

### Step 4: Install Playwright Chrome

```yaml
- name: Install Playwright Chrome
  run: npx playwright install chrome --with-deps
```

**What:** Downloads Chrome browser and system dependencies  
**Explanation:**
- `chrome` - Only Chrome (faster than all browsers)
- `--with-deps` - Also installs system libraries (fonts, codecs, etc.)

**Docs:** 
- https://playwright.dev/docs/browsers#install-browsers
- https://playwright.dev/docs/ci#introduction

**Why --with-deps?**
- CI environments are bare-bones
- Missing libraries cause test failures
- --with-deps installs everything needed

---

### Step 5: Run Playwright Tests

```yaml
- name: Run Playwright tests
  run: npx playwright test
  env:
    CI: true
    BASE_URL: ${{ secrets.BASE_URL || 'https://example.com' }}
```

**What:** Executes all Playwright tests  
**Explanation:**
- `npx playwright test` - Runs all tests
- `CI: true` - Triggers CI-specific config (3 workers, retries)
- `BASE_URL` - Uses secret if set, otherwise example.com

**Docs:**
- https://playwright.dev/docs/test-cli
- https://docs.github.com/en/actions/learn-github-actions/variables#using-the-env-context
- https://docs.github.com/en/actions/security-guides/encrypted-secrets

**Environment Variables:**
- `CI=true` detected by playwright.config.ts
- Changes behavior (workers, retries, viewport)

---

### Step 6-8: Upload Artifacts

```yaml
- name: Upload Playwright Report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

**What:** Saves test results for download  
**Explanation:**
- `if: always()` - Upload even if tests fail
- `name` - Artifact name in GitHub UI
- `path` - Folder(s) to upload
- `retention-days` - Keep for 30 days

**Docs:**
- https://github.com/actions/upload-artifact
- https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts

**Why `if: always()`?**
- Test failures produce screenshots/videos
- We want to see WHY tests failed
- Always upload artifacts, pass or fail

---

### Section 3: Allure Report Job

```yaml
allure-report:
  name: Generate Allure Report
  timeout-minutes: 10
  runs-on: ubuntu-latest
  needs: test
  if: always()
```

**What:** Second job that depends on test job  
**Explanation:**
- `needs: test` - Waits for test job to complete
- `if: always()` - Runs even if tests fail
- Separate job = parallel execution not possible

**Docs:**
- https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow#defining-prerequisite-jobs
- https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idneeds

**Why separate job?**
- Test job focuses on testing
- Report job focuses on reporting
- Clear separation of concerns
- Can be skipped if not needed

---

### Step 1: Download Test Results

```yaml
- name: Download Allure results
  uses: actions/download-artifact@v4
  with:
    name: allure-results
    path: allure-results
```

**What:** Gets allure-results from test job  
**Explanation:** Downloads artifacts uploaded in previous job

**Docs:** https://github.com/actions/download-artifact

---

### Step 2: Get History

```yaml
- name: Get Allure history
  uses: actions/checkout@v4
  continue-on-error: true
  with:
    ref: gh-pages
    path: gh-pages
```

**What:** Gets previous Allure reports for trends  
**Explanation:**
- `ref: gh-pages` - Checkout gh-pages branch
- `continue-on-error: true` - Don't fail if branch doesn't exist (first run)

**Docs:** https://github.com/actions/checkout#usage

**Why?**
- Allure shows historical trends
- Compares current run to previous runs
- Shows if failures are new or recurring

---

### Step 3: Build Report

```yaml
- name: Build Allure Report
  uses: simple-elf/allure-report-action@master
  with:
    allure_results: allure-results
    allure_history: allure-history
    keep_reports: 20
```

**What:** Generates beautiful Allure HTML report  
**Explanation:**
- Converts raw results to interactive HTML
- Includes charts, graphs, trends
- Keeps last 20 reports

**Docs:** https://github.com/simple-elf/allure-report-action

---

### Step 4: Deploy to GitHub Pages

```yaml
- name: Deploy Allure Report to GitHub Pages
  uses: peaceiris/actions-gh-pages@v4
  continue-on-error: true
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_branch: gh-pages
    publish_dir: allure-history
```

**What:** Publishes report to GitHub Pages  
**Explanation:**
- `github_token` - Auto-provided by GitHub (no setup needed)
- `publish_branch: gh-pages` - Creates/updates gh-pages branch
- `continue-on-error: true` - Won't fail on first run

**Docs:** 
- https://github.com/peaceiris/actions-gh-pages
- https://docs.github.com/en/pages

**Result:** Report available at `https://username.github.io/repo-name`

---

## 🔍 Common Patterns Explained

### Pattern: `if: always()`

```yaml
if: always()
```

**What:** Run this step even if previous steps failed  
**Use case:** Uploading artifacts, cleanup  
**Docs:** https://docs.github.com/en/actions/learn-github-actions/expressions#always

### Pattern: `continue-on-error: true`

```yaml
continue-on-error: true
```

**What:** Don't fail workflow if this step fails  
**Use case:** Optional steps, first-run scenarios  
**Docs:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error

### Pattern: Environment Variables

```yaml
env:
  CI: true
  BASE_URL: ${{ secrets.BASE_URL || 'https://example.com' }}
```

**What:** Set environment variables for this step  
**Explanation:**
- `CI: true` - Simple boolean
- `${{ }}` - GitHub Actions expression syntax
- `secrets.BASE_URL` - Encrypted secret
- `||` - Fallback if secret not set

**Docs:** 
- https://docs.github.com/en/actions/learn-github-actions/variables
- https://docs.github.com/en/actions/learn-github-actions/expressions

### Pattern: Secrets

```yaml
BASE_URL: ${{ secrets.BASE_URL }}
```

**What:** Use encrypted secrets  
**Setup:** Repository Settings → Secrets and variables → Actions → New secret  
**Docs:** https://docs.github.com/en/actions/security-guides/encrypted-secrets

---

## 🎯 Optimization Tips

### 1. Caching Dependencies

```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'npm'  # Enables caching
```

**Benefit:** Saves 1-2 minutes per run

### 2. Parallel Execution

Our config:
```typescript
workers: process.env.CI ? 3 : 1
```

Runs 3 tests simultaneously in CI

### 3. Fail Fast

```yaml
strategy:
  fail-fast: false
```

If you add browser matrix:
- `fail-fast: true` - Stop all if one fails (faster)
- `fail-fast: false` - Run all even if one fails (more info)

---

## 📚 Learning Resources

### Official Docs
1. **GitHub Actions Learning Path:** https://docs.github.com/en/actions/learn-github-actions
2. **Playwright CI Guide:** https://playwright.dev/docs/ci
3. **GitHub Actions Marketplace:** https://github.com/marketplace?type=actions

### Tutorials
1. **GitHub Actions Tutorial:** https://docs.github.com/en/actions/quickstart
2. **Playwright CI Examples:** https://playwright.dev/docs/ci-intro

### Reference
1. **Workflow Syntax:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
2. **Contexts:** https://docs.github.com/en/actions/learn-github-actions/contexts
3. **Expressions:** https://docs.github.com/en/actions/learn-github-actions/expressions

---

## 🔧 Customization Examples

### Run on Multiple Node Versions

```yaml
strategy:
  matrix:
    node-version: [18, 20]
steps:
  - uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}
```

### Run on Multiple Browsers

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
steps:
  - run: npx playwright test --project=${{ matrix.browser }}
```

### Run on Schedule

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
```

**Docs:** https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule

---

## 💡 Best Practices

1. **Always use specific versions:** `@v4` not `@latest`
2. **Cache dependencies:** Faster builds
3. **Upload artifacts:** Debug failures
4. **Use `npm ci`:** Not `npm install`
5. **Set timeouts:** Prevent hanging jobs
6. **Use secrets:** Never hardcode credentials
7. **Test locally first:** Before pushing to CI

---

## 🐛 Troubleshooting

### Check these first:
1. **Syntax errors:** https://rhysd.github.io/actionlint/
2. **Logs:** Click on failed step in GitHub Actions
3. **Artifacts:** Download to see screenshots/videos
4. **Local reproduction:** Run same commands locally

### Common Issues:
- **Dependencies:** Missing in package-lock.json
- **Timeouts:** Increase timeout-minutes
- **Permissions:** Check repository settings
- **Secrets:** Verify they're set correctly

---

**This workflow follows best practices and industry standards for CI/CD!** ✅

