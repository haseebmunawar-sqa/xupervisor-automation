/**
 * Resolves per-role credentials from environment variables. Real values live in
 * a local .env (git-ignored) or in CI secrets. A single shared password can be
 * set with DEFAULT_PASSWORD, or overridden per role with <ROLE>_PASSWORD.
 */

const passwordFor = (role) =>
  process.env[`${role.toUpperCase()}_PASSWORD`] || process.env.DEFAULT_PASSWORD;

export const ROLES = ['admin', 'editor', 'viewer'];

export const NON_ADMIN_ROLES = ['editor', 'viewer'];

export const USERS = {
  admin: { role: 'admin', email: process.env.ADMIN_EMAIL, password: passwordFor('admin') },
  editor: { role: 'editor', email: process.env.EDITOR_EMAIL, password: passwordFor('editor') },
  viewer: { role: 'viewer', email: process.env.VIEWER_EMAIL, password: passwordFor('viewer') },
};

export function getUser(role) {
  const user = USERS[role];
  if (!user || !user.email || !user.password) {
    throw new Error(
      `Missing credentials for role "${role}". Set ${role.toUpperCase()}_EMAIL and ` +
        `DEFAULT_PASSWORD (or ${role.toUpperCase()}_PASSWORD) in your .env file.`
    );
  }
  return user;
}
