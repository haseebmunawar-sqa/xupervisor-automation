import { Sidebar } from '../components/Sidebar.js';
import { TopBar } from '../components/TopBar.js';

/**
 * Shared base for every authenticated page. Exposes the sidebar and top bar so
 * pages and specs can navigate without repeating locators.
 */
export class BasePage {
  constructor(page) {
    this.page = page;
    this.sidebar = new Sidebar(page);
    this.topBar = new TopBar(page);
  }

  async open(path = '/') {
    await this.page.goto(path);
  }
}
