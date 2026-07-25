import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { getUser } from '../utils/users.js';

/**
 * Temporary diagnostic: captures what the app actually renders after a failed
 * login, to explain why the "Invalid credentials" message is not found in
 * Firefox. Remove once the cause is understood.
 */
test('capture failed-login feedback', async ({ page, browserName }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(getUser('admin').email, 'WrongPassword!123');

  for (let i = 1; i <= 3; i++) {
    await page.waitForTimeout(1500);
    const alerts = await page
      .locator('[role="alert"],[role="status"],[data-sonner-toast],[class*="toast"],[class*="destructive"]')
      .allInnerTexts();
    const body = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
    console.log(`DIAG[${browserName}] t=${i * 1.5}s url=${page.url()}`);
    console.log(`DIAG[${browserName}] alerts=${JSON.stringify(alerts)}`);
    console.log(`DIAG[${browserName}] body=${body.slice(0, 300)}`);
  }
});
