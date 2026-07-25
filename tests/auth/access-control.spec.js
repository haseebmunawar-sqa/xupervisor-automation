import { test } from '../../fixtures/fixtures.js';
import { STATE } from '../../utils/authState.js';

test.describe('Administration module access', () => {
  test.describe('admin', () => {
    test.use({ storageState: STATE.admin });

    test('can see the Administration module', async ({ dashboardPage }) => {
      await dashboardPage.open();
      await dashboardPage.expectLoaded();
      await dashboardPage.sidebar.expectVisible('Administration');
    });
  });

  for (const role of ['editor', 'viewer']) {
    test.describe(role, () => {
      test.use({ storageState: STATE[role] });

      test('cannot see the Administration module', async ({ dashboardPage }) => {
        await dashboardPage.open();
        await dashboardPage.expectLoaded();
        await dashboardPage.sidebar.expectHidden('Administration');
      });
    });
  }
});
