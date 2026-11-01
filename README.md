# ACCS landing

Public landing site and DOC003 module inventory for ACCS, the live workspace for the QCU College of Computer Studies. The site uses Next.js 16, React 19 and `@meetingat10/design-system` pinned to GitHub tag `v1.2.0`. It exports static files to `out/`.

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

See [module compliance](docs/module-compliance.md) for the acceptance scope and recorded results.

## Content and routes

- `/`: landing page with a live site showcase, features, guidance path, workflow, programs, forum and events.
- `/modules/`: all 58 modules, grouped by the 11 source role labels and filterable by owning application site.

`src/data/doc003.json` is the checked-in DOC003 source fixture. `src/data/modules.ts` derives the cards, role counts and destinations from it. The ten operational roles share the five All users modules. The explorer keeps every role panel in the exported HTML.

The seven application sites are Home, Forums, Schedule, Cases, Evaluations, Records and Admin. Each module links to its owning site. These destinations follow `accs-system/docs/deltas/2026-11-01-subdomain-sites.md`; opening a site does not grant permission to its modules.

## Design system and imagery

The Office Hours components provide the navigation, cards, timetable and motion. The transparent renders shipped in design system v1.1.0 were generated in `meeting-at-ten-assets/` and processed by the design-system imagery pipeline. The art helper imports WebP assets from the pinned package; Next.js fingerprints them into the static export. Image dimensions come from the package's `imagery` manifest. Decorative images use empty alt text. The linked-C render is a proposed motif; the ACCS wordmark remains the door plate.

## Build-time URLs

`src/lib/sites.ts` reads these public environment variables when the site builds. Rebuild after changing a URL. The technical `portal` key refers to ACCS Home in the interface.

| Variable | Default |
|---|---|
| `NEXT_PUBLIC_LANDING_URL` | https://d1o7nnm2soozyn.cloudfront.net |
| `NEXT_PUBLIC_PORTAL_URL` | https://d1njh2nozcwz0u.cloudfront.net |
| `NEXT_PUBLIC_FORUMS_URL` | https://dgkec2nkm3n3s.cloudfront.net |
| `NEXT_PUBLIC_SCHEDULE_URL` | https://d19h8rd7p5r1ek.cloudfront.net |
| `NEXT_PUBLIC_CASES_URL` | https://d3aoaw841wc6e2.cloudfront.net |
| `NEXT_PUBLIC_EVALUATIONS_URL` | https://d3nw1hv5xoevnq.cloudfront.net |
| `NEXT_PUBLIC_RECORDS_URL` | https://du3q9mhys1ofn.cloudfront.net |
| `NEXT_PUBLIC_ADMIN_URL` | https://d3ru4j9n1z7rme.cloudfront.net |
| `NEXT_PUBLIC_DESIGN_URL` | https://dqd3zf55ijbpq.cloudfront.net |
| `NEXT_PUBLIC_MEETING_URL` | https://d34p7a45addcro.cloudfront.net |

`NEXT_PUBLIC_SITE_URL` sets `metadataBase` and defaults to the landing URL above. It is separate from `NEXT_PUBLIC_LANDING_URL`, which controls navigation links.

## Deployment

`.github/workflows/deploy.yml` runs on pushes to `main` and on manual dispatch. It installs the private design-system dependency with `DS_DEPLOY_KEY`, reads the `LandingBucket`, `LandingDistributionId` and `LandingUrl` outputs from the `accs-dev` CloudFormation stack in `ap-southeast-1`, builds the export, uploads `out/` to S3 and invalidates CloudFront. AWS access uses the repository's configured deployment secrets.

The deployed URL is the corresponding CloudFront default above. Custom domains remain a proposal.
