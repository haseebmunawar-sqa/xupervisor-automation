import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { getUser, ROLES } from '../utils/users.js';
import { STATE } from '../utils/authState.js';

/**
 * Signs in once per role and saves the session so module specs can reuse it
 * without going through the login form every time.
 */
for (const role of ROLES) {
  setup(`authenticate as ${role}`, async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAs(getUser(role));
    await page.waitForURL(/\/dashboard/, { waitUntil: 'commit', timeout: 60_000 });
    await page.context().storageState({ path: STATE[role] });
  });
}
