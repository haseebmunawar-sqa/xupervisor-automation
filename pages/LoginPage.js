import { expect } from '@playwright/test';

/**
 * Authentication screen (/auth).
 *
 * Fields are matched by role and label. The app is built on React and Radix,
 * whose element ids are generated at runtime and change between builds, so
 * label-based locators are the reliable choice here.
 */
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.password = page.getByLabel('Password', { exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.rememberMe = page.getByRole('checkbox', { name: 'Remember me' });
    this.forgotPassword = page.getByRole('button', { name: 'Forgot password' });
  }

  async goto() {
    await this.page.goto('/auth');
    await expect(this.email).toBeVisible();
  }

  async login(email, password, { remember = false } = {}) {
    await this.email.fill(email);
    await this.password.fill(password);
    if (remember) await this.rememberMe.check();
    await this.loginButton.click();
  }

  async loginAs(user, options) {
    await this.login(user.email, user.password, options);
  }

  async expectError(message) {
    await expect(this.page.getByText(message, { exact: false })).toBeVisible({
      timeout: 15_000,
    });
  }
}
