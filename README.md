# ACCS landing

Public landing site and module list for ACCS, the live workspace for the QCU College of Computer Studies. The site uses Next.js 16, React 19 and `@meetingat10/design-system` pinned to GitHub tag `v2.0.0`. It exports static files to `out/`. A rebuild of the site lives on the `backup/redesign-v2-20261107` branch and is not merged.

## Run and verify

Use Node.js 22, matching CI. Installing the private design-system package requires GitHub SSH access.

```bash
npm ci
npm run dev
```

Development runs at `http://localhost:3000`. Run the checks serially on the shared development machine:

```bash
flock /tmp/claude-1000/capstone-build.lock pcore npm run lint
flock /tmp/claude-1000/capstone-build.lock pcore npm run typecheck
flock /tmp/claude-1000/capstone-build.lock pcore npm run verify
```

`verify` builds the static export and runs the Node.js compliance tests against `out/`. `npm test` checks an existing export. Preview the built files with a static server:

```bash
python3 -m http.server 4173 --directory out
```

## Content and routes

- `/`: landing page built from the Figma frame "10 Landing page": hero with a quick-start box, connected offices, one-account stats, four features, the five offices that handle concerns, how a request moves, and a sign-in call to action. The quick-start box sends visitors to the portal: concern words and the concern chips open `/reports/new`, booking words open `/consultations`, anything else opens sign-in with a redirect to `/search`. There is no sign-up: the CCS Secretary creates accounts, so every account link is Sign in.
- `/modules/`: all 58 modules as rows grouped under the 11 source role labels, with a role index and a filter by owning application site.

`src/data/doc003.json` is the checked-in module fixture. Visible copy carries no document codes or module IDs; IDs stay only as `id`/`data-module` attributes for tests. `src/data/modules.ts` derives the rows, role counts and destinations from it. The ten operational roles share the five All users modules. The exported HTML contains every role section and module row.

The seven application workspaces are Home, Forums, Schedule, Cases, Evaluations, Records and Admin, all paths on the portal (`accs-system/docs/deltas/2026-11-05-one-portal-host.md`). Public modules link to their portal path; the rest link to sign-in. A link does not grant permission to a module.

## Design system

The `/modules` inventory uses the Office Hours components for its forms and motion. The landing page uses Poppins and Inter with the colours from the Figma frame (`globals.css`). Its icons, stars, horizon and rings are SVGs exported from Figma into `public/landing/` and drawn as CSS backgrounds, so the pages still render no `<img>` elements.

## Build-time URLs

`src/lib/sites.ts` reads these public environment variables when the site builds. Rebuild after changing a URL. The technical `portal` key refers to ACCS Home in the interface.

| Variable | Default |
|---|---|
| `NEXT_PUBLIC_LANDING_URL` | https://access-ccs.com |
| `NEXT_PUBLIC_PORTAL_URL` | https://portal.access-ccs.com |
| `NEXT_PUBLIC_DESIGN_URL` | https://design.access-ccs.com |
| `NEXT_PUBLIC_MEETING_URL` | https://team.access-ccs.com |

`NEXT_PUBLIC_GA_ID` is the Google Analytics measurement ID. Unset: no analytics script is rendered.

`NEXT_PUBLIC_SITE_URL` sets `metadataBase` and defaults to the landing URL above. It is separate from `NEXT_PUBLIC_LANDING_URL`, which controls navigation links.

## Deployment

`.github/workflows/deploy.yml` runs on pushes to `main` and `dev` and on manual dispatch. `main` deploys to `access-ccs.com` (stack `accs-prod`), `dev` to `dev.access-ccs.com` (stack `accs-dev`). It installs the private design-system dependency with `DS_DEPLOY_KEY`, reads the `Landing*` outputs and the portal, design and team URLs from the stack in `ap-southeast-1`, builds the export, uploads `out/` to S3 and invalidates CloudFront. AWS access uses the repository's configured deployment secrets.

Links in the build point at the same environment's portal, design and team sites.

The `dev` trigger, the stack choice by branch and the per-environment URLs are uncommitted edits to `deploy.yml`. The committed workflow runs on `main` only and deploys to `accs-prod`.
