import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * Landing page after a successful login (/dashboard).
 */
export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.path = '/dashboard';
  }

  async open() {
    await this.page.goto(this.path);
  }

  async expectLoaded() {
    // The dev server is slow to redirect after login and slower still on CI,
    // where sign-ins from the whole suite queue up behind each other.
    await expect(this.page).toHaveURL(/\/dashboard/, {
      timeout: process.env.CI ? 90_000 : 45_000,
    });
    await this.sidebar.waitReady();
  }
}
