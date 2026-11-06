# ACCS landing

Public landing site and module list for ACCS, the workspace for the QCU College of Computer Studies. Next.js 16 and React 19, exported as static files to `out/`. This site has its own styles and components and does not use the design system.

## Run and verify

Use Node.js 22, matching CI.

```bash
npm ci
npm run dev
```

Run the checks serially on the shared development machine:

```bash
flock /tmp/claude-1000/capstone-build.lock pcore npm run lint
flock /tmp/claude-1000/capstone-build.lock pcore npm run typecheck
flock /tmp/claude-1000/capstone-build.lock pcore npm run verify
```

`verify` builds the static export and runs the Node.js content tests against `out/`. On the scaffold commit the tests fail because the pages are empty. They define what the rebuild must contain.

## Build-time URLs

`src/lib/sites.ts` reads these public environment variables when the site builds.

| Variable | Default |
|---|---|
| `NEXT_PUBLIC_LANDING_URL` | https://access-ccs.com |
| `NEXT_PUBLIC_PORTAL_URL` | https://portal.access-ccs.com |
| `NEXT_PUBLIC_DESIGN_URL` | https://design.access-ccs.com |
| `NEXT_PUBLIC_MEETING_URL` | https://team.access-ccs.com |

`NEXT_PUBLIC_SITE_URL` sets `metadataBase` and defaults to the landing URL.

The rebuild spec is `context/deltas/2026-11-07-v2-rebuild.md`.
