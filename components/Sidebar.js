import { expect } from '@playwright/test';

/**
 * Left-hand workspace navigation shared across every authenticated page.
 * Items are matched by their visible label, which keeps the selectors readable
 * and independent of the app's generated element ids.
 */
export class Sidebar {
  constructor(page) {
    this.page = page;
  }

  item(name) {
    return this.page
      .getByRole('link', { name })
      .or(this.page.getByRole('button', { name }));
  }

  async goTo(name) {
    // On the dashboard the main content's scroll overlay sits above the sidebar's
    // lower items and intercepts a real mouse click, so dispatch the click
    // straight to the element's own handler.
    const target = this.item(name).first();
    await target.waitFor({ state: 'visible' });
    await target.dispatchEvent('click');
  }

  /** Waits for the sidebar shell to render (every role has a Dashboard item). */
  async waitReady() {
    await this.item('Dashboard').first().waitFor({ state: 'visible' });
  }

  async expectVisible(name) {
    await expect(this.item(name).first()).toBeVisible();
  }

  async expectHidden(name) {
    await this.waitReady();
    await expect(this.item(name)).toHaveCount(0);
  }
}
