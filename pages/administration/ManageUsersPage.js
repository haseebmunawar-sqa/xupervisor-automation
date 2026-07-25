import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.js';

/**
 * Administration > Manage Users (/manage_users).
 */
export class ManageUsersPage extends BasePage {
  constructor(page) {
    super(page);
    this.path = '/manage_users';
    this.manageUsersTab = page
      .getByRole('tab', { name: 'Manage Users' })
      .or(page.getByText('Manage Users', { exact: true }));
    this.customRolesTab = page
      .getByRole('tab', { name: 'Custom Roles' })
      .or(page.getByText('Custom Roles', { exact: true }));
  }

  async open() {
    await this.page.goto(this.path);
  }

  async openFromMenu() {
    await this.sidebar.goTo('Administration');
    await this.sidebar.goTo('Manage Users');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/manage_users/);
    await expect(this.customRolesTab.first()).toBeVisible();
  }
}
