import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL || 'https://dev.xupervisor.com';
const isCI = !!process.env.CI;

/**
 * The target is a shared development environment that slows down under
 * repeated sign-ins, so CI runs Chromium only for fast, dependable feedback.
 * Set ALL_BROWSERS=1 to run the full Chromium/Firefox/WebKit matrix, which is
 * the default locally.
 */
const allBrowsers = !isCI || process.env.ALL_BROWSERS === '1';

const viewport = { width: 1920, height: 1080 };

const browsers = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'], viewport } },
  { name: 'webkit', use: { ...devices['Desktop Safari'], viewport } },
];

export default defineConfig({
  testDir: './tests',
  timeout: isCI ? 120_000 : 60_000,
  expect: { timeout: 15_000 },

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: 1,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: BASE_URL,
    navigationTimeout: isCI ? 90_000 : 45_000,
    actionTimeout: 20_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.js/ },
    ...(allBrowsers ? browsers : [browsers[0]]).map((b) => ({
      ...b,
      dependencies: ['setup'],
    })),
  ],
});
