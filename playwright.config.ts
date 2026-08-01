import { defineConfig, devices } from '@playwright/test'

/**
 * Smoke tests run against the production build, not the dev server: the bugs
 * worth catching here (lazy-loaded rails, font preloads, bundle-only failures)
 * only show up after a real build.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npx vite preview --port 4173',
    url: 'http://localhost:4173',
    /**
     * Never reuse. A leftover server from a previous run serves a stale dist/,
     * so edits to src/data would pass against the old build — the suite would
     * silently stop catching exactly the regressions it exists to catch.
     * The rebuild costs about a second.
     */
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
