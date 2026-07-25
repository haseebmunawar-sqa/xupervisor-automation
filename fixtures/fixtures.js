import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ManageUsersPage } from '../pages/administration/ManageUsersPage.js';

/**
 * Base test extended with the page objects used across specs.
 */
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  manageUsersPage: async ({ page }, use) => {
    await use(new ManageUsersPage(page));
  },
});

export { expect };
