# ACCS landing

Public landing site for ACCS, the workspace for the QCU College of Computer Studies. Next.js 16 and React 19, exported as static files to `out/`. This site has its own styles and components and does not use the design system.

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

`verify` builds the static export and runs the Node.js content tests in `tests/site.test.mjs` (7 tests) against `out/`. The tests check that:

- the site has no `/modules` route and no `data-module` attribute, and visible copy never uses the words module or role;
- visible copy has no document codes, module IDs, em or en dashes, or words such as sample data, prototype and demo;
- every link uses a configured host, a public portal path (`/sign-in`, `/feed` or `/consultations`) or an anchor that exists, and no page links to the admin, records, restrictions, analytics, reports, cases or evaluations paths on the portal;
- the home page names the seven workspaces and the three programs, BSIT, BSCS and BSIS, the boundary sentence "Community access never implies report access.", the escalation path from adviser to the President's Office, and a sign-in link with no account creation;
- the home page has no `<img>` elements, no `ds-` classes, and `package.json` does not depend on the design system.

The module and role lists are not on this site. They are on the design system site, in `docs/modules-and-roles.md` of the design system repository, at `/guides/modules-and-roles/`.

## Build-time URLs

`src/lib/sites.ts` reads these public environment variables when the site builds.

| Variable | Default |
|---|---|
| `NEXT_PUBLIC_LANDING_URL` | https://access-ccs.com |
| `NEXT_PUBLIC_PORTAL_URL` | https://portal.access-ccs.com |
| `NEXT_PUBLIC_DESIGN_URL` | https://design.access-ccs.com |
| `NEXT_PUBLIC_MEETING_URL` | https://team.access-ccs.com |

`NEXT_PUBLIC_SITE_URL` sets `metadataBase` and defaults to the landing URL.

## Routes

The site has one route, `/`, with these sections in order:

| Section | Anchor |
|---|---|
| Hero board, a fixed list of four workspace links | |
| Route map: one hub, seven lines, each ending at a workspace and its description. Picking a line shows a working preview of that workspace | `#sites` |
| Features | `#features` |
| Concern route, with the adviser bypass | `#guidance` |
| Request staircase | `#workflow` |
| Programs | `#programs` |
| Threads | `#forum` |
| Coming up board | `#events` |
| Final sign | |

The primary nav is Workspaces (`#sites`), Features, Guidance and Programs. The footer ACCS column has Sign in and Workspaces.

## Content data

`src/data/workspaces.ts` holds the seven workspaces: name, description, link and access note. Visible copy has no document codes or module IDs.

## Workspaces

The seven workspaces are paths on the portal: ACCS Home, Forums, Schedule, Cases, Evaluations, Records and Admin. Forums links to `/feed` and Schedule to `/consultations`. The other five link to sign-in. A link does not grant permission, and the portal decides who can use what.

## Visual system

- Type: Archivo with its width axis for signs and map labels, Atkinson Hyperlegible Next for reading, Atkinson Hyperlegible Mono for references and times.
- Color: sign blue `#032E87`, navy `#172033` and signal yellow `#FFC629`. Seven line colors identify the workspaces.
- Theme: light and dark follow the OS. Sign bands keep their colors in both.
- Icons come from `@phosphor-icons/react`.
- The page has no picture assets and no design-system dependency.
- Scroll animations use CSS scroll-driven timelines. Where the browser does not support them, or the visitor prefers reduced motion, the page stays static.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main` and on manual dispatch. Runs share one `deploy` concurrency group and are not cancelled.

1. Check out the repository, set up Node.js 22 with the npm cache and run `npm ci`.
2. Configure AWS credentials in `ap-southeast-1` from the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` repository secrets.
3. Read the `LandingBucket`, `LandingDistributionId` and `LandingUrl` outputs of the `accs-prod` CloudFormation stack. The landing site exists only in prod.
4. Run `npm run build` with `NEXT_PUBLIC_SITE_URL` set to the stack's landing URL.
5. Run `npm test` in the step named Content tests.
6. Sync `out/` to the S3 bucket with `--delete`, then invalidate `/*` on the CloudFront distribution.

The workflow needs no design-system deploy key.

The rebuild spec is `context/deltas/2026-11-07-v2-rebuild.md`.
