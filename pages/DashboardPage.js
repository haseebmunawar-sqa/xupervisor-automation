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
    // The dev server can be slow to redirect after login, so allow extra time.
    await expect(this.page).toHaveURL(/\/dashboard/, { timeout: 45_000 });
    await this.sidebar.waitReady();
  }
}
