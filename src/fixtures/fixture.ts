import ApplicationGeneric from '../pages/application_generic'
import PlaywrightUtil from '../utils/playwright_util'
import LoginPage from '../pages/login_page'
import Companies from '../pages/companies'
import Contacts from '../pages/contacts'
import capabilities from '../utils/config_prop'

import base from '@playwright/test'
import path from 'path'
import { chromium, type Browser, type Page } from 'playwright'

const test = base.test.extend({
  playwrightUtil: async ({ page }, use) => {
    await use(new PlaywrightUtil(page))
  },
  applicationGeneric: async ({ page }, use) => {
    await use(new ApplicationGeneric(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  companies: async ({ page }, use) => {
    await use(new Companies(page));
  },
  contacts: async ({ page }, use) => {
    await use(new Contacts(page));
  },
  page: async ({ page }, use, testInfo) => {
    // Configure LambdaTest platform for cross-browser testing
    let fileName = testInfo.file.split(path.sep).pop()
    if (process.env.LAMBDATEST == 'true') {
      capabilities['LT:Options']['name'] = `${testInfo.title} - ${fileName}`
      let device: any, context: any, browser: Browser | undefined, ltPage: Page | undefined;

      // Desktop test
      browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
      ltPage = await browser.newPage(testInfo.project.use as any)

      await use(ltPage)

      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status,
          remark: testInfo.error?.stack || testInfo.error?.message,
        }
      }
      await ltPage.evaluate(() => { },
        `lambdatest_action: ${JSON.stringify(testStatus)}`)

      await ltPage.close()
      await context?.close();
      await browser?.close()
      await device?.close();
    } else {
      // Run tests in local in case of local config provided
      await use(page)
    }
  },
})

export default test;
