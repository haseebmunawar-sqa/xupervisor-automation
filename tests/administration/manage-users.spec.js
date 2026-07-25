import { test, expect } from '../../fixtures/fixtures.js';
import { STATE } from '../../utils/authState.js';

test.use({ storageState: STATE.admin });

test.describe('Administration > Manage Users', () => {
  test('opens Manage Users directly', async ({ manageUsersPage }) => {
    await manageUsersPage.open();
    await manageUsersPage.expectLoaded();
  });

  test('navigates to Manage Users from the sidebar', async ({ dashboardPage, manageUsersPage }) => {
    await dashboardPage.open();
    await dashboardPage.expectLoaded();
    await manageUsersPage.openFromMenu();
    await manageUsersPage.expectLoaded();
  });

  test('shows the Manage Users and Custom Roles tabs', async ({ manageUsersPage }) => {
    await manageUsersPage.open();
    await expect(manageUsersPage.manageUsersTab.first()).toBeVisible();
    await expect(manageUsersPage.customRolesTab.first()).toBeVisible();
  });
});
