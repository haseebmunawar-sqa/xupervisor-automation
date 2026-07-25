import { test, expect } from '../../fixtures/fixtures.js';
import { getUser, ROLES } from '../../utils/users.js';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  for (const role of ROLES) {
    test(`${role} logs in and reaches the dashboard`, async ({ loginPage, dashboardPage }) => {
      await loginPage.loginAs(getUser(role));
      await dashboardPage.expectLoaded();
    });
  }

  test('rejects an invalid password', async ({ loginPage }) => {
    const admin = getUser('admin');
    await loginPage.login(admin.email, 'WrongPassword!123');
    await loginPage.expectError('Invalid credentials');
    await expect(loginPage.page).toHaveURL(/\/auth/);
  });

  test('validates the email format', async ({ loginPage }) => {
    await loginPage.login('not-an-email', 'whatever123');
    await loginPage.expectError('This is not a valid email.');
  });
});
