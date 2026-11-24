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

- `/`: landing page that uses the Figma frame "Landing Page" (node `745:1289`) as a reference: a navy hero with the ACCS wordmark, building photo and lion mascot, the roles who use ACCS, "What you can do in ACCS" with four feature rows, the five offices that handle concerns, how a request moves, a mascot call to action and the footer. A feature row opens its details on hover, click, tap, Enter or Space (Escape closes); the step cards deal the next of five steps when pressed; the mascots wave and say "Hi!" on hover. Copy describes only what ACCS does: routing is rule-based (the student says when a concern involves their adviser, and it goes to the Program Chair), each office decides the next step, anonymous reports stay linked to the verified account, and evaluations are students evaluating their professors. There is no sign-up and no form: the CCS Secretary creates accounts, so every account action (navbar, hero, call to action, footer) is a Sign In link to portal sign-in. Our Team and Meeting At Ten link to the team site, Design System to the design site, Forum to `/feed` and FAQS to `/help` on the portal. The footer social icons have no published URLs and are not links.
- `/modules/`: all 58 modules as rows grouped under the 11 source role labels, with a role index and a filter by owning application site.

`src/data/doc003.json` is the checked-in module fixture. Visible copy carries no document codes or module IDs; IDs stay only as `id`/`data-module` attributes for tests. `src/data/modules.ts` derives the rows, role counts and destinations from it. The ten operational roles share the five All users modules. The exported HTML contains every role section and module row.

The seven application workspaces are Home, Forums, Schedule, Cases, Evaluations, Records and Admin, all paths on the portal (`accs-system/docs/deltas/2026-11-05-one-portal-host.md`). Public modules link to their portal path; the rest link to sign-in. A link does not grant permission to a module.

## Design system

The `/modules` inventory uses the Office Hours components for its forms and motion. The landing page uses Plus Jakarta Sans (Inter for buttons) with navy #032E87, ink #172033 and white (`globals.css`); the navy hero is the only strong surface. The building photo, mascots, icons and logo are exported from Figma into `public/landing/` and drawn as CSS backgrounds, so the pages still render no `<img>` elements. Decorative art is hidden from assistive technology; the wordmark has the accessible name "ACCS".

### Mascot sprites

`npm run mascot` runs `scripts/mascot/build.mjs`, which rigs the lion and cub from their Figma exports in `public/landing/` and writes sprite sheets to `public/landing/mascot/`. The rig (`scripts/mascot/rig.mjs`) reuses the source parts, gradients and filters, splits the body into torso and arms, and redraws only the parts that change (lids, closed and happy eyes, brows, mouths, heart eyes, tears and props) in the source palette. `scripts/mascot/library.mjs` defines the stills and loops:

- Emotions: neutral, happy, laughing, surprised, sad, thinking, sleepy, wink, love, proud. Poses: wave, point, cheer, document.
- Loops: breathe (16 frames, 10 fps), blink (12, 12), look-around (16, 8), sway (fur or ears, 12, 10), doze (16, 6), wave (12, 12). Frame 1 of every loop is the rest pose.

Each mascot folder holds one strip per loop (`<name>.svg`, `<name>@1x.png`, `<name>@2x.png`), the stills sheet (`sheet.*`, 7 columns) and `manifest.json` with the frame size, anchor, frame count, fps and loop flag. Cells are 280×275 (lion) and 308×322 (cub) at 1x, with the feet on the same baseline in every frame. The build fails if a frame draws outside its cell or a loop's last frame does not flow into its first. PNGs are rendered with headless Chromium from Playwright; set `PLAYWRIGHT_MODULE` to its `index.mjs` if it is not in `~/.agents/mcp-deps`. Open `public/landing/mascot/preview.html` to review every still and loop.

`src/app/_components/mascot-sprite.tsx` plays a loop with CSS `steps()` (`<MascotSprite mascot="lion" animation="blink" />`) or shows a still (`still="happy"`). It is hidden from assistive technology unless given a `label`, and shows the first frame under `prefers-reduced-motion`. The landing page does not use it yet.

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
