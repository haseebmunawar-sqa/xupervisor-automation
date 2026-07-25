/**
 * Top navigation bar present on every authenticated page.
 */
export class TopBar {
  constructor(page) {
    this.page = page;
    this.search = page.locator('input[name="global_search"]').first();
    this.notifications = page.getByRole('button', { name: /notification/i });
  }
}
