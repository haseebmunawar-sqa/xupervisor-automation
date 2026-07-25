# Xupervisor E2E Automation

Playwright test suite for the Xupervisor web application. It covers
authentication, role-based access, and administration flows, organised with the
Page Object Model.

Credentials and the base URL come from environment variables (a local `.env`
during development, GitHub Actions secrets in CI). No credentials are stored in
the repository.

## Stack

Playwright, JavaScript, Node.js, GitHub Actions.

## Structure

```
xupervisor-automation/
├─ components/            Sidebar and top bar shared across pages
├─ pages/                 Page objects
│  ├─ BasePage.js
│  ├─ LoginPage.js
│  ├─ DashboardPage.js
│  └─ administration/
│     └─ ManageUsersPage.js
├─ fixtures/              Page objects wired into the test fixture
├─ tests/
│  ├─ auth.setup.js       Signs in per role, stores the session
│  ├─ auth/               Login and access-control specs
│  └─ administration/     Manage Users specs
├─ utils/                 Credential and session helpers
├─ playwright.config.js
└─ .env.example
```

## Setup

```bash
npm install
npx playwright install
cp .env.example .env
```

Fill in `.env`:

| Variable | Description |
|---|---|
| `BASE_URL` | App base URL (defaults to `https://dev.xupervisor.com`) |
| `DEFAULT_PASSWORD` | Password shared by the roles |
| `ADMIN_EMAIL`, `EDITOR_EMAIL`, `VIEWER_EMAIL` | Role logins |
| `ADMIN_PASSWORD`, `EDITOR_PASSWORD`, `VIEWER_PASSWORD` | Optional per-role override |

## Running

```bash
npm test                # all browsers
npm run test:chromium   # Chromium only
npm run test:auth       # login and access-control specs
npm run report          # open the last HTML report
```

The `setup` project signs in once per role and saves the session under
`playwright/.auth/`. Module specs reuse those sessions, so they do not repeat the
login form. Login specs run against the login form directly.

### Browser coverage

Locally the suite runs against Chromium, Firefox, and WebKit. CI runs Chromium
only: the target is a shared development environment that slows down under
repeated sign-ins, and the full matrix triples the number of logins per run,
which made builds fail on timeouts rather than on real defects. To run the full
matrix in CI, set `ALL_BROWSERS=1`.

## Coverage

| Area | Check |
|---|---|
| Login | Admin, Editor, and Viewer reach the dashboard |
| Login | Invalid password shows `Invalid credentials` |
| Login | Malformed email shows `This is not a valid email.` |
| Access control | Admin sees the Administration module |
| Access control | Editor and Viewer do not see the Administration module |
| Administration | Manage Users opens and shows the Manage Users / Custom Roles tabs |
