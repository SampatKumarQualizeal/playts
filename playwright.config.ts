import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const test_env = process.env.ENV_Test || "sit"

dotenv.config({
  //path: './env/.env.' + process.env.ENV_Test,
  path: './env/.env.' + test_env,
  //path: './env/.env.dev',
  override: true
});

export default defineConfig({
  webServer: []

  ,
  testDir: './src',
  /* Maximum time one test can run for. */
  timeout: 0,
  globalTimeout: 60 * 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* This will start 10 instances will start parallely of any browser */
  workers: 7, // Default is 5
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    //['dot'],
    //['line'],
    ['list', { printSteps: true }],
    ['html'],
    // [
    //   "allure-playwright",
    //   {
    //     detail: true,
    //     outputFolder: "allure-results",
    //     suiteTitle: false,
    //   },
    // ]
    ["ortoni-report",
      {
        projectName: "Playwright Demo",
      }
    ]

  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // All requests we send go to this API endpoint.
    baseURL: process.env.API_URL,
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/json',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      'Authorization': `token ${process.env.API_TOKEN}`,
    },
    // connectOptions: {
    //   wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
    // },
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10 * 1000,
    navigationTimeout: 120 * 1000,
    headless: false,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',
    //trace: 'on',
    trace: 'retain-on-failure',
    //trace:'on-first-retry',
    //trace:'off'

    /* This is for the screenshots (will be attached in the Reports) */
    //screenshot: 'on', // For every step
    // screenshot: 'off',
    screenshot: 'only-on-failure',
    /* This is for recording the videos */
    //video:'off', // Do not record video.
    //video:'on', //Record video for each test.
    //video:'on-first-retry', // Record video only when retrying a test for the first time.
    video: 'retain-on-failure', //Record video for each test, but remove all videos from successful test runs.
    //video:'retry-with-video',
    launchOptions:
    {
      //slowMo: 200
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: `chrome`,
      use: {
        browserName: `chromium`,
        channel: `chrome`,
        headless: false,
        screenshot: `on`,
        video: `on`,
        trace: `on`
      }
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  //globalSetup : './'
});
