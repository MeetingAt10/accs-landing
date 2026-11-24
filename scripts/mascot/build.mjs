#!/usr/bin/env node
// Builds the mascot sprite sheets in public/landing/mascot from the Figma SVG exports in public/landing:
// one strip per idle animation (SVG plus transparent PNG @1x and @2x), one emotions-and-poses sheet,
// a manifest.json per mascot and preview.html. Run with `npm run mascot`.
//
// PNGs are rendered with headless Chromium from Playwright. Set PLAYWRIGHT_MODULE to point at a
// Playwright install; the default is the shared one in ~/.agents/mcp-deps.
import { mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadMascot, sharedDefs, frame } from './rig.mjs';
import { EMOTIONS, POSES, ANIMATIONS } from './library.mjs';

const root = resolve(import.meta.dirname, '../..');
const source = join(root, 'public/landing');
const outDir = join(source, 'mascot');
const SHEET_COLUMNS = 7;
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE ?? join(homedir(), '.agents/mcp-deps/node_modules/playwright/index.mjs')).href);

/** An SVG holding `states` as a grid of cells that share one set of defs. */
function sheetSvg(m, states, columns, uid) {
  const [vx, vy, vw, vh] = m.cfg.viewBox;
  const rows = Math.ceil(states.length / columns);
  const s = m.cfg.scale1x;
  const cells = states.map((state, i) => {
    const x = (i % columns) * vw, y = Math.floor(i / columns) * vh;
    return `<svg x="${x}" y="${y}" width="${vw}" height="${vh}" viewBox="${vx} ${vy} ${vw} ${vh}" overflow="hidden">${frame(m, state, `${m.name}-${uid}${i}`)}</svg>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${columns * vw * s}" height="${rows * vh * s}" viewBox="0 0 ${columns * vw} ${rows * vh}" fill="none">${sharedDefs(m)}${cells.join('')}</svg>`;
}

/** Renders every frame with padding around its cell and reports ink outside the cell and loop seams. */
async function check(page, m, sets) {
  const [vx, vy, vw, vh] = m.cfg.viewBox;
  const pad = 40;
  const defs = sharedDefs(m);
  const svgs = sets.map(({ name, states }) => states.map((state, i) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${(vw + 2 * pad) / 4}" height="${(vh + 2 * pad) / 4}" viewBox="${vx - pad} ${vy - pad} ${vw + 2 * pad} ${vh + 2 * pad}" fill="none">${defs}${frame(m, state, `${m.name}-chk-${name}${i}`)}</svg>`));
  return page.evaluate(async ({ svgs, sets, pad }) => {
    const draw = async svg => {
      const img = new Image();
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      await img.decode();
      const c = new OffscreenCanvas(img.width, img.height);
      const g = c.getContext('2d');
      g.drawImage(img, 0, 0);
      return g.getImageData(0, 0, img.width, img.height);
    };
    const report = [];
    for (const [k, set] of sets.entries()) {
      const images = [];
      for (const svg of svgs[k]) images.push(await draw(svg));
      const { width: W, height: H } = images[0];
      const px = pad / 4, inner = [px, px, W - px, H - px];
      let outside = 0;
      for (const im of images) {
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
          if (x >= inner[0] + 1 && x < inner[2] - 1 && y >= inner[1] + 1 && y < inner[3] - 1) continue;
          if (im.data[(y * W + x) * 4 + 3] > 8) outside++;
        }
      }
      const diff = (a, b) => { let d = 0; for (let i = 0; i < a.data.length; i++) d += Math.abs(a.data[i] - b.data[i]); return d / a.data.length; };
      const steps = images.map((im, i) => diff(im, images[(i + 1) % images.length]));
      const seam = steps.at(-1), typical = Math.max(...steps.slice(0, -1));
      report.push({ name: set.name, frames: images.length, outside, seam: +seam.toFixed(3), maxStep: +typical.toFixed(3) });
    }
    return report;
  }, { svgs, sets: sets.map(s => ({ name: s.name })), pad });
}

async function renderPng(contexts, svg, width, height, file) {
  for (const [scale, page] of contexts) {
    await page.setViewportSize({ width: Math.ceil(width), height: Math.ceil(height) });
    await page.setContent(`<!doctype html><style>html,body{margin:0;background:transparent}svg{display:block}</style>${svg}`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: file.replace('.png', `@${scale}x.png`), omitBackground: true, clip: { x: 0, y: 0, width, height } });
  }
}

const browser = await chromium.launch();
const contexts = [];
for (const scale of [1, 2]) contexts.push([scale, await (await browser.newContext({ deviceScaleFactor: scale })).newPage()]);
const manifests = {};
let failed = false;

for (const name of ['lion', 'cub']) {
  const m = loadMascot(name, source);
  const dir = join(outDir, name);
  mkdirSync(dir, { recursive: true });
  const [vx, vy, vw, vh] = m.cfg.viewBox;
  const s = m.cfg.scale1x;
  const fw = vw * s, fh = vh * s;
  const manifest = {
    mascot: name,
    basePath: `/landing/mascot/${name}/`,
    frameWidth: fw,
    frameHeight: fh,
    // Where the feet meet the ground, in frame pixels at 1x; the same in every frame.
    anchor: { x: +((m.cfg.bodyCenterX - vx) * s).toFixed(1), y: +((m.cfg.baseline - vy) * s).toFixed(1) },
    animations: {},
    stills: null,
  };
  const sets = [];
  for (const [anim, def] of Object.entries(ANIMATIONS)) {
    const states = Array.from({ length: def.frames }, (_, i) => def.state(i / def.frames, i));
    sets.push({ name: anim, states });
    const svg = sheetSvg(m, states, def.frames, `${anim}-`);
    writeFileSync(join(dir, `${anim}.svg`), svg);
    await renderPng(contexts, svg, def.frames * fw, fh, join(dir, `${anim}.png`));
    manifest.animations[anim] = { file: `${anim}@1x.png`, file2x: `${anim}@2x.png`, svg: `${anim}.svg`, frameWidth: fw, frameHeight: fh, frames: def.frames, fps: def.fps, loop: true };
  }
  const stills = { ...EMOTIONS, ...POSES };
  const names = Object.keys(stills);
  sets.push(...names.map(n => ({ name: `still:${n}`, states: [stills[n]] })));
  const sheet = sheetSvg(m, Object.values(stills), SHEET_COLUMNS, 'still-');
  const rows = Math.ceil(names.length / SHEET_COLUMNS);
  writeFileSync(join(dir, 'sheet.svg'), sheet);
  await renderPng(contexts, sheet, SHEET_COLUMNS * fw, rows * fh, join(dir, 'sheet.png'));
  manifest.stills = { file: 'sheet@1x.png', file2x: 'sheet@2x.png', svg: 'sheet.svg', frameWidth: fw, frameHeight: fh, columns: SHEET_COLUMNS, rows, frames: names, emotions: Object.keys(EMOTIONS), poses: Object.keys(POSES) };
  writeFileSync(join(dir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  manifests[name] = manifest;

  for (const r of await check(contexts[0][1], m, sets)) {
    const seamOk = r.frames < 2 || r.seam <= r.maxStep * 1.05;
    if (r.outside || !seamOk) failed = true;
    console.log(`${name} ${r.name.padEnd(16)} frames=${String(r.frames).padStart(2)} outside=${r.outside}${r.frames > 1 ? ` seam=${r.seam} maxStep=${r.maxStep}` : ""}${r.outside ? '  CLIPPED' : ''}${seamOk ? '' : '  SEAM'}`);
  }
}
await browser.close();

writeFileSync(join(outDir, 'preview.html'), preview(manifests));
console.log(`Wrote ${outDir}`);
if (failed) process.exitCode = 1;

function preview(all) {
  const block = (m, title, file, file2x, frames, fps, columns = frames, cell = 0) => {
    const col = cell % columns, row = Math.floor(cell / columns), rows = Math.ceil((columns === frames ? frames : all[m].stills.frames.length) / columns);
    const anim = fps ? `animation:play ${(frames / fps).toFixed(3)}s steps(${frames}, jump-none) infinite;` : `background-position:${columns > 1 ? (col / (columns - 1)) * 100 : 0}% ${rows > 1 ? (row / (rows - 1)) * 100 : 0}%;`;
    return `<figure><div class="sprite" style="width:${all[m].frameWidth}px;aspect-ratio:${all[m].frameWidth}/${all[m].frameHeight};background-image:image-set(url(${m}/${file}) 1x,url(${m}/${file2x}) 2x);background-size:${columns * 100}% ${rows * 100}%;${anim}"></div><figcaption>${title}</figcaption></figure>`;
  };
  const sections = Object.keys(all).map(m => {
    const man = all[m];
    const anims = Object.entries(man.animations).map(([n, a]) => block(m, `${n} · ${a.frames} frames · ${a.fps} fps`, a.file, a.file2x, a.frames, a.fps)).join('');
    const stills = man.stills.frames.map((n, i) => block(m, `${n}${man.stills.poses.includes(n) ? ' (pose)' : ''}`, man.stills.file, man.stills.file2x, 1, 0, man.stills.columns, i)).join('');
    const strips = Object.entries(man.animations).map(([n, a]) => `<figure class="strip"><img src="${m}/${a.file}" alt="" width="${a.frames * a.frameWidth / 2}"><figcaption>${n} strip</figcaption></figure>`).join('');
    return `<section><h2>${m[0].toUpperCase()}${m.slice(1)} · ${man.frameWidth}×${man.frameHeight} cells</h2><h3>Animations</h3><div class="grid">${anims}</div><h3>Emotions and poses</h3><div class="grid">${stills}</div><h3>Strips</h3>${strips}</section>`;
  }).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ACCS mascot sprites</title>
<style>
  body { margin: 0; padding: 24px; font: 14px/1.4 system-ui, sans-serif; color: #172033; background: #f4f6fb; }
  body.navy { color: #fff; background: #032E87; }
  h1 { margin: 0 0 8px; font-size: 22px; }
  h2 { margin: 32px 0 8px; font-size: 18px; }
  h3 { margin: 20px 0 8px; font-size: 14px; text-transform: uppercase; letter-spacing: .06em; opacity: .7; }
  .grid { display: flex; flex-wrap: wrap; gap: 12px; }
  figure { margin: 0; }
  figcaption { margin-top: 4px; font-size: 12px; opacity: .8; }
  .sprite { background-repeat: no-repeat; outline: 1px dashed rgb(127 127 127 / .35); }
  .strip img { display: block; max-width: 100%; height: auto; outline: 1px dashed rgb(127 127 127 / .35); }
  @keyframes play { from { background-position-x: 0; } to { background-position-x: 100%; } }
  @media (prefers-reduced-motion: reduce) { .sprite { animation: none !important; } }
</style>
</head>
<body>
<h1>ACCS mascot sprites</h1>
<p>Generated by <code>scripts/mascot/build.mjs</code>. <label><input type="checkbox" onchange="document.body.classList.toggle('navy', this.checked)"> Navy background</label></p>
${sections}
</body>
</html>
`;
}
