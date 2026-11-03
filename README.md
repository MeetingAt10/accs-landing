# ACCS landing

Public landing site and DOC003 module inventory for ACCS, the live workspace for the QCU College of Computer Studies. The site uses Next.js 16, React 19 and `@meetingat10/design-system` pinned to GitHub tag `v1.2.1`. It exports static files to `out/`.

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

- `/`: landing page with site previews, features, the concern escalation path, workflow, programs, a forum thread list and upcoming events.
- `/modules/`: all 58 modules as rows grouped under the 11 source role labels, with a role index and a filter by owning application site.

`src/data/doc003.json` is the checked-in DOC003 source fixture. `src/data/modules.ts` derives the rows, role counts and destinations from it. The ten operational roles share the five All users modules. The exported HTML contains every role section and module row.

The seven application sites are Home, Forums, Schedule, Cases, Evaluations, Records and Admin. Each module links to its owning site. These destinations follow `accs-system/docs/deltas/2026-11-01-subdomain-sites.md`; opening a site does not grant permission to its modules.

## Design system

The Office Hours components provide the navigation, forms, timetable and motion. The pages use no picture assets: the hero is built from live components (a forum card and a consultation chip). The ACCS wordmark is the door plate.

## Build-time URLs

`src/lib/sites.ts` reads these public environment variables when the site builds. Rebuild after changing a URL. The technical `portal` key refers to ACCS Home in the interface.

| Variable | Default |
|---|---|
| `NEXT_PUBLIC_LANDING_URL` | https://access-ccs.com |
| `NEXT_PUBLIC_PORTAL_URL` | https://portal.access-ccs.com |
| `NEXT_PUBLIC_FORUMS_URL` | https://forums.access-ccs.com |
| `NEXT_PUBLIC_SCHEDULE_URL` | https://schedule.access-ccs.com |
| `NEXT_PUBLIC_CASES_URL` | https://cases.access-ccs.com |
| `NEXT_PUBLIC_EVALUATIONS_URL` | https://evaluations.access-ccs.com |
| `NEXT_PUBLIC_RECORDS_URL` | https://records.access-ccs.com |
| `NEXT_PUBLIC_ADMIN_URL` | https://admin.access-ccs.com |
| `NEXT_PUBLIC_DESIGN_URL` | https://design.access-ccs.com |
| `NEXT_PUBLIC_MEETING_URL` | https://team.access-ccs.com |

`NEXT_PUBLIC_SITE_URL` sets `metadataBase` and defaults to the landing URL above. It is separate from `NEXT_PUBLIC_LANDING_URL`, which controls navigation links.

## Deployment

`.github/workflows/deploy.yml` runs on pushes to `main` and on manual dispatch. It installs the private design-system dependency with `DS_DEPLOY_KEY`, reads the `LandingBucket`, `LandingDistributionId` and `LandingUrl` outputs from the `accs-dev` CloudFormation stack in `ap-southeast-1`, builds the export, uploads `out/` to S3 and invalidates CloudFront. AWS access uses the repository's configured deployment secrets.

The deployed URL is the corresponding CloudFront default above. Custom domains remain a proposal.
