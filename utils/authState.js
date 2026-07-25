/**
 * Storage-state file per role, written by the auth setup project and reused by
 * module specs so they start already signed in.
 */
export const STATE = {
  admin: 'playwright/.auth/admin.json',
  editor: 'playwright/.auth/editor.json',
  viewer: 'playwright/.auth/viewer.json',
};
