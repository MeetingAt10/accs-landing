// The mascot rig: splits the Figma SVG exports into reusable parts and composes frames from a pose
// state (eyes, lids, brows, mouth, blush, head tilt, body squash, arm angles, fur and ear sway, props).
// Every redrawn part uses the palette, gradients and filters of the source art.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, serialize, byId, namespace, clone, fmt } from './svg.mjs';

const INK = '#172033';
const NAVY = '#032E87';
const BLUSH = '#F9788D';
const YELLOW = '#FBC100';

const rad = d => (d * Math.PI) / 180;
const rot = (p, deg, c = [0, 0]) => {
  const a = rad(deg), dx = p[0] - c[0], dy = p[1] - c[1];
  return [c[0] + dx * Math.cos(a) - dy * Math.sin(a), c[1] + dx * Math.sin(a) + dy * Math.cos(a)];
};
const P = ([x, y]) => `${fmt(x)} ${fmt(y)}`;

/** A rounded rectangle with circular corners, matching the Figma arm capsules. */
function roundedRect(x0, y0, x1, y1, r) {
  const k = r * 0.5523;
  return `M${P([x0 + r, y0])}H${fmt(x1 - r)}C${P([x1 - r + k, y0])} ${P([x1, y0 + r - k])} ${P([x1, y0 + r])}V${fmt(y1 - r)}`
    + `C${P([x1, y1 - r + k])} ${P([x1 - r + k, y1])} ${P([x1 - r, y1])}H${fmt(x0 + r)}C${P([x0 + r - k, y1])} ${P([x0, y1 - r + k])} ${P([x0, y1 - r])}`
    + `V${fmt(y0 + r)}C${P([x0, y0 + r - k])} ${P([x0 + r - k, y0])} ${P([x0 + r, y0])}Z`;
}

// The arms of each mascot, measured from the body union in its Figma export: an arm is a rounded
// rectangle (width, length, corner radius) hanging from a shoulder pivot at a rest angle
// (0 = straight down, positive = clockwise on screen).
const MASCOTS = {
  lion: {
    file: 'lion.svg',
    viewBox: [-24, -50, 560, 550], // x, y, w, h in source units
    scale1x: 0.5,
    baseline: 485.4,
    bodyCenterX: 256,
    // Torso: the body union with the arms replaced by smooth sides.
    torso: 'M256.083 279.455C293.574 279.455 318.674 284.254 335.244 294.758C355.2 307.4 368.6 378 362.953 415.178C355.817 461.542 330.095 485.4 256.084 485.4C177.362 485.4 146.441 458.408 139.327 406.052C134 366.7 147.9 312.3 168.148 298.164C186.599 285.285 214.753 279.455 256.083 279.455Z',
    torsoFill: 'paint2_linear_1_4',
    torsoFilter: 'filter0_i_1_4',
    arm: { width: 85.5, radius: 34.2, pivotDepth: 36 },
    armR: { pivot: [350.55, 327.42], rest: -28.6, length: 127.5 },
    armL: { pivot: [146.06, 326.58], rest: 36.3, length: 129.85 },
    neck: [257, 300],
    furPivot: [257, 210],
    parts: {
      fur: ['Big Fur', 'Small Fur'],
      tie: ['Logo Mark', 'Mask group'],
      head: ['Mask group_2'],
      eyes: ['Ellipse 67', 'Ellipse 68'],
      highlights: ['Ellipse 70', 'Ellipse 69'],
      nose: 'nose',
      blush: ['Ellipse 72', 'Ellipse 73'],
    },
    faceOrder: ['eyes', 'nose', 'mouth', 'blush'],
    faceAngle: 0,
    faceCenter: [257, 215],
    eyeR: 20.44,
    eyeCenters: [[222.389, 208.082], [288.616, 208.082]],
    mouth: [257.33, 258.5],
    headTop: 93,
    bubble: [372, 22],
    zzz: [392, 70],
  },
  cub: {
    file: 'cub.svg',
    viewBox: [-50, -62, 440, 460],
    scale1x: 0.7,
    baseline: 387.64,
    bodyCenterX: 172.4,
    torso: 'M172.385 198.008C206.907 198.008 230.02 202.427 245.278 212.099C263.6 223.7 276.4 286.7 270.792 322.984C264.221 365.676 240.536 387.644 172.386 387.644C101.626 387.644 72.8091 363.96 65.3823 317.987C59.4 281.2 70.2 231.7 88.7925 217.172C105.695 203.96 132.315 198.008 172.385 198.008Z',
    torsoFill: 'paint0_linear_1_4',
    torsoFilter: 'filter0_i_1_4',
    hairline: true,
    arm: { width: 78.7, radius: 31.5, pivotDepth: 33 },
    armR: { pivot: [259.36, 242.01], rest: -28.6, length: 117.5 },
    armL: { pivot: [61.32, 239.87], rest: 24.3, length: 119.6 },
    neck: [171, 222],
    earPivots: [[92, 92], [244, 88]],
    parts: {
      ears: ['Ellipse 75', 'Ellipse 76'],
      tie: ['Logo Mark', 'Mask group'],
      head: ['Mask group_2'],
      eyes: ['Ellipse 67', 'Ellipse 68'],
      highlights: ['Ellipse 70', 'Ellipse 69'],
      nose: 'Polygon 6',
      blush: ['Ellipse 72', 'Ellipse 73'],
    },
    faceOrder: ['blush', 'eyes', 'nose', 'mouth'],
    faceAngle: -1.2141,
    faceCenter: [170, 135],
    eyeR: 18.8,
    eyeCenters: [[139.255, 128.6], [200.224, 127.31]],
    mouth: [171.6, 167.2],
    headTop: 30,
    bubble: [232, -40],
    zzz: [236, 58],
  },
};

export const DEFAULT_STATE = {
  headDx: 0, headDy: 0, headTilt: 0,
  furSway: 0, furScale: 1,
  earL: 0, earR: 0,
  bodySx: 1, bodySy: 1, bodyDy: 0,
  armL: null, armR: null, armsFront: false, fingerL: false, fingerR: false,
  eye: 'open', eyeScale: 1, lookX: 0, lookY: 0, lidTop: 0, lidBottom: 0, lidTilt: 0,
  eyeL: null, eyeR: null,
  brows: null, browL: null, browR: null,
  mouth: 'none', mouthDx: 0, mouthDy: 0,
  blush: 1,
  props: [],
};

export function loadMascot(name, dir) {
  const cfg = MASCOTS[name];
  const tree = parse(readFileSync(join(dir, cfg.file), 'utf8'));
  const svg = tree.children.find(n => n.name === 'svg');
  const defs = svg.children.find(n => n.name === 'defs');
  const pick = id => byId(svg, id);
  const parts = {};
  for (const [key, ids] of Object.entries(cfg.parts)) parts[key] = Array.isArray(ids) ? ids.map(pick) : pick(ids);
  const prefix = `${name}-`;
  namespace(tree, prefix);
  // The body filter must cover raised arms, so widen its region.
  const bodyFilter = byId(defs, `${prefix}${cfg.torsoFilter}`);
  Object.assign(bodyFilter.attrs, { x: '-300', y: '-300', width: '1200', height: '1200' });
  if (cfg.hairline) {
    // The cub's body has a 0.37px dark inside edge; recreate it on the union of torso and arms.
    bodyFilter.children.push(...parse('<feMorphology in="SourceAlpha" operator="erode" radius="0.37" result="eroded"/><feComposite in="SourceAlpha" in2="eroded" operator="out" result="edge"/><feFlood flood-color="black"/><feComposite in2="edge" operator="in" result="edgeInk"/><feMerge><feMergeNode in="effect1_innerShadow_1_4"/><feMergeNode in="edgeInk"/></feMerge>').children);
  }
  return { name, cfg, prefix, defs, parts };
}

/** Defs shared by every frame of one mascot: the source defs, reusable parts and redrawn-part paints. */
export function sharedDefs(m) {
  const { cfg, prefix: p, parts } = m;
  const group = (id, nodes, attrs = '') => `<g id="${p}${id}"${attrs}>${nodes.map(n => serialize(clone(n))).join('')}</g>`;
  const blushFilter = parts.blush[0].attrs.filter.match(/#([^)]+)/)[1];
  const out = [
    ...m.defs.children.map(serialize),
    parts.fur ? group('fur', parts.fur) : '',
    parts.ears ? group('ear-l', [parts.ears[0]]) + group('ear-r', [parts.ears[1]]) : '',
    group('tie', parts.tie),
    group('head', parts.head),
    `<path id="${p}torso" d="${cfg.torso}"/>`,
    group('nose', [parts.nose]),
    // Redrawn parts: heart eyes and love hearts (blush pink, shaded like the eyes), tears, the
    // yellow speech bubble of the "Hi" variant, and the document held in the report pose.
    `<linearGradient id="${p}heart" x1="0" y1="-1" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="#FF9DB0"/><stop offset="1" stop-color="#E8435E"/></linearGradient>`,
    `<linearGradient id="${p}tear" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#BDF6FF"/><stop offset="1" stop-color="#3C9BF6"/></linearGradient>`,
    `<linearGradient id="${p}paper" x1="0" y1="0" x2="0" y2="1"><stop stop-color="white"/><stop offset="1" stop-color="#EBE9E9"/></linearGradient>`,
    `<filter id="${p}soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${fmt(cfg.eyeR * 0.2)}"/></filter>`,
    `<filter id="${p}inner" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-3"/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0"/><feBlend mode="normal" in2="SourceGraphic"/></filter>`,
    `<filter id="${p}drop" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/><feOffset dy="3"/><feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>`,
  ];
  m.blushFilter = `${blushFilter}`;
  return `<defs>${out.join('')}</defs>`;
}

const ref = (m, id, attrs = '') => `<use href="#${m.prefix}${id}"${attrs}/>`;

function armPath(m, side, len, finger) {
  const { width: W, radius: r, pivotDepth: d } = m.cfg.arm;
  let path = roundedRect(-W / 2, -d, W / 2, len - d, r);
  if (finger) {
    // A short rounded finger at the hand end, on the side that faces up when the arm is raised.
    const fw = W * 0.34, fl = W * 0.42, s = side === 'R' ? 1 : -1;
    const x0 = s > 0 ? W / 2 - fw - W * 0.06 : -W / 2 + W * 0.06;
    path += roundedRect(x0, len - d - fw * 0.9, x0 + fw, len - d + fl, fw / 2);
  }
  return path;
}

function arms(m, s, torsoT, which) {
  const { cfg } = m;
  return ['L', 'R'].filter(k => which.includes(k)).map(k => {
    const a = cfg[`arm${k}`];
    const angle = s[`arm${k}`] ?? a.rest;
    const [px, py] = torsoT(a.pivot);
    return `<path d="${armPath(m, k, a.length, s[`finger${k}`])}" transform="translate(${fmt(px)} ${fmt(py)}) rotate(${fmt(angle)})" fill="url(#${m.prefix}${cfg.torsoFill})"/>`;
  }).join('');
}

// ---- face -----------------------------------------------------------------------------------

const stroke = (d, w, color = INK) => `<path d="${d}" stroke="${color}" stroke-width="${fmt(w)}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;

function heart(cx, cy, s, p, extra = '') {
  const shape = [[0, 0.9], [-0.1, 0.82], [-1, 0.25], [-1, -0.25], [-1, -0.68], [-0.7, -0.95], [-0.4, -0.95], [-0.2, -0.95], [-0.05, -0.83], [0, -0.66], [0.05, -0.83], [0.2, -0.95], [0.4, -0.95], [0.7, -0.95], [1, -0.68], [1, -0.25], [1, 0.25], [0.1, 0.82], [0, 0.9]]
    .map(([x, y]) => P([cx + x * s, cy + y * s]));
  const d = `M${shape[0]}C${shape[1]} ${shape[2]} ${shape[3]}C${shape[4]} ${shape[5]} ${shape[6]}C${shape[7]} ${shape[8]} ${shape[9]}C${shape[10]} ${shape[11]} ${shape[12]}C${shape[13]} ${shape[14]} ${shape[15]}C${shape[16]} ${shape[17]} ${shape[18]}Z`;
  return `<g${extra}><path d="${d}" fill="url(#${p}heart)" filter="url(#${p}inner)"/><ellipse cx="${fmt(cx - s * 0.42)}" cy="${fmt(cy - s * 0.42)}" rx="${fmt(s * 0.3)}" ry="${fmt(s * 0.14)}" transform="rotate(-35 ${fmt(cx - s * 0.42)} ${fmt(cy - s * 0.42)})" fill="white" opacity="0.85" filter="url(#${p}soft)"/></g>`;
}

function eye(m, s, i, uid) {
  const { cfg, parts, prefix: p } = m;
  const side = i === 0 ? 'L' : 'R';
  const e = { eye: s.eye, eyeScale: s.eyeScale, lookX: s.lookX, lookY: s.lookY, lidTop: s.lidTop, lidBottom: s.lidBottom, lidTilt: s.lidTilt, ...(s[`eye${side}`] ?? {}) };
  const r = cfg.eyeR;
  const [cx, cy] = local(m, cfg.eyeCenters[i]);
  const outer = i === 0 ? -1 : 1; // direction of the outer eye corner
  const lx = e.lookX * r * 0.4, ly = e.lookY * r * 0.3;
  if (e.eye === 'closed' || (e.eye === 'open' && e.lidTop + e.lidBottom >= 0.94)) {
    const y0 = cy + r * 0.12 + ly;
    return stroke(`M${P([cx - r * 0.95 + lx, y0])}Q${P([cx + lx, y0 + r * 0.62])} ${P([cx + r * 0.95 + lx, y0])}`, r * 0.3);
  }
  if (e.eye === 'happy') {
    const y0 = cy + r * 0.38 + ly;
    return stroke(`M${P([cx - r * 0.95 + lx, y0])}Q${P([cx + lx, y0 - r * 1.15])} ${P([cx + r * 0.95 + lx, y0])}`, r * 0.3);
  }
  if (e.eye === 'heart') return heart(cx + lx, cy + ly - r * 0.05, r * 1.18 * e.eyeScale, p);
  // Open eye: the source eye and its highlight, scaled and shifted for gaze; lids clip it.
  const eyeSrc = serialize(clone(parts.eyes[i]));
  const hl = serialize(clone(parts.highlights[i]));
  const sc = e.eyeScale;
  const unrot = cfg.faceAngle ? ` transform="rotate(${fmt(-cfg.faceAngle)} ${P(cfg.faceCenter)})"` : '';
  const top = cy - r, bottom = cy + r * 0.77, H = bottom - top;
  let clip = '', lidLine = '';
  if (e.lidTop > 0.01 || e.lidBottom > 0.01) {
    const t = Math.tan(rad(e.lidTilt)) * r * 1.3;
    const yt = top + e.lidTop * H, yb = bottom - e.lidBottom * H;
    const x0 = cx - r * 1.5, x1 = cx + r * 1.5;
    const ytL = yt + (outer < 0 ? t : -t), ytR = yt + (outer > 0 ? t : -t);
    const sag = e.lidTop > 0.01 ? r * 0.16 : 0;
    const lift = e.lidBottom > 0.01 ? r * 0.22 : 0;
    const d = `M${P([x0, ytL])}Q${P([cx, (ytL + ytR) / 2 + sag * 2])} ${P([x1, ytR])}L${P([x1, yb])}Q${P([cx, yb - lift * 2])} ${P([x0, yb])}Z`;
    clip = `<clipPath id="${uid}-lid${i}"><path d="${d}"/></clipPath>`;
    if (e.lidTop > 0.06) {
      // The lid edge, drawn a touch wider than the eye so the lid reads as a lid.
      const ramp = Math.min(1, (e.lidTop - 0.06) / 0.4);
      const w = r * (0.9 + 0.22 * ramp), f = u => [cx + u, ytL + (ytR - ytL) * ((u + r * 1.5) / (r * 3)) + sag * 2 * (1 - (u / (r * 1.5)) ** 2) * 0.5];
      lidLine = stroke(`M${P(f(-w))}Q${P([cx, (f(-w)[1] + f(w)[1]) / 2 + sag * 1.15])} ${P(f(w))}`, r * (0.12 + 0.08 * ramp));
    }
  }
  const tf = `translate(${fmt(cx + lx)} ${fmt(cy + ly)}) scale(${fmt(sc)}) translate(${fmt(-cx)} ${fmt(-cy)})`;
  const hlShift = `translate(${fmt(-lx * 0.35)} ${fmt(-ly * 0.35)})`;
  return `${clip}<g transform="${tf}"><g${clip ? ` clip-path="url(#${uid}-lid${i})"` : ''}><g${unrot}>${eyeSrc}</g><g transform="${hlShift}"><g${unrot}>${hl}</g></g></g>${lidLine}</g>`;
}

function brow(m, s, i) {
  const b = { ...(s.brows ?? {}), ...(s[i === 0 ? 'browL' : 'browR'] ?? {}) };
  if (!s.brows && !s[i === 0 ? 'browL' : 'browR']) return '';
  const r = m.cfg.eyeR;
  const [cx, cy] = local(m, m.cfg.eyeCenters[i]);
  const inner = i === 0 ? 1 : -1;
  const y = cy - r * 1.62 - (b.lift ?? 0) * r + s.lookY * r * 0.12;
  const x = cx + inner * r * 0.08 + s.lookX * r * 0.15;
  const a = rad(b.angle ?? 0), hw = r * 0.55;
  const p0 = [x - hw * Math.cos(a) * inner, y + hw * Math.sin(a)];
  const p1 = [x + hw * Math.cos(a) * inner, y - hw * Math.sin(a)];
  const c = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 - r * 0.16];
  return stroke(`M${P(p0)}Q${P(c)} ${P(p1)}`, r * 0.22);
}

function mouth(m, s, uid) {
  const r = m.cfg.eyeR, k = r / 20.44;
  const [mx0, my0] = local(m, m.cfg.mouth);
  const mx = mx0 + s.mouthDx * k + s.lookX * r * 0.12, my = my0 + s.mouthDy * k;
  const w = 4.3 * k;
  const at = pts => pts.map(([x, y]) => P([mx + x * k, my + y * k]));
  switch (s.mouth) {
    case 'cat': { const q = at([[-11, 0], [-9, 6.5], [-1.5, 6.5], [0, 0.5], [1.5, 6.5], [9, 6.5], [11, 0]]); return stroke(`M${q[0]}C${q[1]} ${q[2]} ${q[3]}C${q[4]} ${q[5]} ${q[6]}`, w); }
    case 'smile': { const q = at([[-10, 0], [0, 10], [10, 0]]); return stroke(`M${q[0]}Q${q[1]} ${q[2]}`, w); }
    case 'smug': { const q = at([[-10, 2], [-3, 8], [7, 6], [12, -2]]); return stroke(`M${q[0]}C${q[1]} ${q[2]} ${q[3]}`, w); }
    case 'frown': { const q = at([[-9, 7], [0, -2], [9, 7]]); return stroke(`M${q[0]}Q${q[1]} ${q[2]}`, w); }
    case 'flat': { const q = at([[-7, 3], [7, 3]]); return stroke(`M${q[0]}L${q[1]}`, w); }
    case 'wavy': { const q = at([[-11, 3], [-7, -1.5], [-4, -1.5], [0, 3], [4, 7.5], [7, 7.5], [11, 3]]); return stroke(`M${q[0]}C${q[1]} ${q[2]} ${q[3]}C${q[4]} ${q[5]} ${q[6]}`, w); }
    case 'o': case 'O': case 'yawn': {
      const [rx, ry] = s.mouth === 'o' ? [4.6, 5.6] : s.mouth === 'O' ? [7.5, 9.5] : [8.5, 11];
      return `<ellipse cx="${fmt(mx)}" cy="${fmt(my + (ry + 1) * k)}" rx="${fmt(rx * k)}" ry="${fmt(ry * k)}" fill="${INK}"/>`
        + (s.mouth !== 'o' ? `<ellipse cx="${fmt(mx)}" cy="${fmt(my + (ry * 1.7 + 1) * k)}" rx="${fmt(rx * 0.6 * k)}" ry="${fmt(ry * 0.32 * k)}" fill="${BLUSH}" opacity="0.9"/>` : '');
    }
    case 'grin': case 'laugh': {
      const [hw, dp] = s.mouth === 'grin' ? [13, 14] : [18.5, 24];
      const q = at([[-hw, 0], [hw, 0], [hw, dp * 0.75], [hw * 0.55, dp], [0, dp], [-hw * 0.55, dp], [-hw, dp * 0.75]]);
      const rc = 3 * k;
      const d = `M${P([mx - hw * k + rc, my])}L${P([mx + hw * k - rc, my])}Q${q[1]} ${P([mx + hw * k, my + rc])}C${q[2]} ${q[3]} ${q[4]}C${q[5]} ${q[6]} ${P([mx - hw * k, my + rc])}Q${q[0]} ${P([mx - hw * k + rc, my])}Z`;
      return `<clipPath id="${uid}-mouth"><path d="${d}"/></clipPath><path d="${d}" fill="${INK}"/>`
        + `<ellipse clip-path="url(#${uid}-mouth)" cx="${fmt(mx)}" cy="${fmt(my + dp * 1.02 * k)}" rx="${fmt(hw * 0.62 * k)}" ry="${fmt(dp * 0.42 * k)}" fill="${BLUSH}"/>`;
    }
    default: return '';
  }
}

function blush(m, s, i) {
  const node = clone(m.parts.blush[i]);
  const ell = node.children[0];
  const b = s.blush;
  ell.attrs['fill-opacity'] = fmt(Math.min(0.95, 0.5 * b));
  if (b > 1) {
    const cx = +ell.attrs.cx, cy = +ell.attrs.cy, sc = 1 + (b - 1) * 0.18;
    node.attrs.transform = `translate(${fmt(cx)} ${fmt(cy)}) scale(${fmt(sc)}) translate(${fmt(-cx)} ${fmt(-cy)})`;
  }
  return serialize(node);
}

/** Maps a source point into the face's local (unrotated) frame. */
function local(m, pt) {
  return m.cfg.faceAngle ? rot(pt, -m.cfg.faceAngle, m.cfg.faceCenter) : pt;
}

function tear(m, i, t = 0) {
  const r = m.cfg.eyeR, k = r / 20.44;
  const [cx, cy] = local(m, m.cfg.eyeCenters[i]);
  const x = cx + (i === 0 ? -1 : 1) * r * 0.7, y = cy + r * 0.85 + t * r * 1.2;
  const s = 9 * k;
  const d = `M${P([x, y - s * 1.5])}C${P([x + s * 0.3, y - s * 0.9])} ${P([x + s, y - s * 0.2])} ${P([x + s, y + s * 0.35])}C${P([x + s, y + s * 0.95])} ${P([x + s * 0.55, y + s * 1.3])} ${P([x, y + s * 1.3])}C${P([x - s * 0.55, y + s * 1.3])} ${P([x - s, y + s * 0.95])} ${P([x - s, y + s * 0.35])}C${P([x - s, y - s * 0.2])} ${P([x - s * 0.3, y - s * 0.9])} ${P([x, y - s * 1.5])}Z`;
  return `<g opacity="${fmt(1 - t * 0.6)}"><path d="${d}" fill="url(#${m.prefix}tear)" filter="url(#${m.prefix}inner)"/><ellipse cx="${fmt(x - s * 0.38)}" cy="${fmt(y + s * 0.3)}" rx="${fmt(s * 0.22)}" ry="${fmt(s * 0.4)}" fill="white" opacity="0.8"/></g>`;
}

// ---- props ----------------------------------------------------------------------------------

function bubble(x, y, w, h) {
  // The "Hi" bubble from lion-hi.svg (8px corners, tail at the lower left), resized.
  const b = y + h;
  return `M${P([x + 8, y])}H${fmt(x + w - 8)}C${P([x + w - 3.58, y])} ${P([x + w, y + 3.58])} ${P([x + w, y + 8])}V${fmt(b - 8)}C${P([x + w, b - 3.58])} ${P([x + w - 3.58, b])} ${P([x + w - 8, b])}`
    + `H${fmt(x + Math.min(58.6, w * 0.45))}C${P([x + Math.min(58.2, w * 0.448), b])} ${P([x + Math.min(57.7, w * 0.444), b + 0.07])} ${P([x + Math.min(57.3, w * 0.44), b + 0.22])}`
    + `L${P([x + 9.7, b + 16.6])}C${P([x + 6.6, b + 17.7])} ${P([x + 3.6, b + 14.8])} ${P([x + 4.58, b + 11.68])}L${P([x + 8.1, b + 0.14])}C${P([x + 8.12, b + 0.07])} ${P([x + 8.07, b])} ${P([x + 8, b])}`
    + `C${P([x + 3.58, b])} ${P([x, b - 3.58])} ${P([x, b - 8])}V${fmt(y + 8)}C${P([x, y + 3.58])} ${P([x + 3.58, y])} ${P([x + 8, y])}Z`;
}

function question(m, pop = 1) {
  const [bx, by] = m.cfg.bubble;
  const w = 64, h = 59.6;
  const cx = bx + w / 2, cy = by + h / 2;
  const q = `M${P([cx - 7.5, cy - 8])}C${P([cx - 7.5, cy - 16.5])} ${P([cx + 8, cy - 16.5])} ${P([cx + 8, cy - 8])}C${P([cx + 8, cy - 2])} ${P([cx + 0.5, cy - 1.5])} ${P([cx + 0.5, cy + 5])}`;
  return `<g transform="translate(${fmt(bx)} ${fmt(by + h + 17)}) scale(${fmt(pop)}) translate(${fmt(-bx)} ${fmt(-(by + h + 17))})"><path d="${bubble(bx, by, w, h)}" fill="${YELLOW}" filter="url(#${m.prefix}drop)"/>${stroke(q, 6, NAVY)}<circle cx="${fmt(cx + 0.5)}" cy="${fmt(cy + 14)}" r="3.6" fill="${NAVY}"/></g>`;
}

function zed(x, y, size, opacity) {
  const h = size / 2;
  const d = `M${P([x - h, y - h])}H${fmt(x + h)}L${P([x - h, y + h])}H${fmt(x + h)}`;
  const sw = size * 0.24;
  return `<g opacity="${fmt(opacity)}">${stroke(d, sw + size * 0.2, 'white')}${stroke(d, sw, NAVY)}</g>`;
}

/** Three Z's drifting up and to the right; phase in [0, 1) loops seamlessly. */
function zzz(m, phase, count = 3) {
  const [x0, y0] = m.cfg.zzz;
  const k = m.cfg.eyeR / 20.44;
  let out = '';
  for (let j = 0; j < count; j++) {
    const t = (phase + j / count) % 1;
    const fade = t < 0.15 ? t / 0.15 : t > 0.75 ? (1 - t) / 0.25 : 1;
    out += zed(x0 + t * 60 * k + Math.sin(t * Math.PI * 2) * 6 * k, y0 - t * 95 * k, (18 + t * 18) * k, fade);
  }
  return out;
}

function sparkle(x, y, s, color = YELLOW) {
  const c = s * 0.16;
  return `<path d="M${P([x, y - s])}C${P([x + c, y - c])} ${P([x + c, y - c])} ${P([x + s, y])}C${P([x + c, y + c])} ${P([x + c, y + c])} ${P([x, y + s])}C${P([x - c, y + c])} ${P([x - c, y + c])} ${P([x - s, y])}C${P([x - c, y - c])} ${P([x - c, y - c])} ${P([x, y - s])}Z" fill="${color}"/>`;
}

function sparkles(m, t = 0) {
  const { cfg } = m;
  const [vx, , vw] = cfg.viewBox;
  const k = cfg.eyeR / 20.44;
  const pts = [[vx + vw * 0.13, cfg.headTop + 10, 16], [vx + vw * 0.86, cfg.headTop - 18, 20], [vx + vw * 0.9, cfg.headTop + 60, 11]];
  return pts.map(([x, y, s], j) => sparkle(x, y, s * k * (0.85 + 0.15 * Math.cos((t + j / 3) * Math.PI * 2)))).join('');
}

function floatHearts(m, t = 0) {
  const { cfg } = m;
  const k = cfg.eyeR / 20.44;
  const [bx, by] = cfg.bubble;
  const pts = [[bx + 30, by + 40, 15], [bx + 72, by + 8, 11], [bx - 270 * k, by + 70, 10]];
  return pts.map(([x, y, s], j) => heart(x, y - 6 * Math.sin((t + j / 3) * Math.PI * 2), s * k, m.prefix, ` opacity="0.95"`)).join('');
}

function documentProp(m) {
  const { cfg, prefix: p } = m;
  const k = cfg.eyeR / 20.44;
  const w = 150 * k, h = 146 * k;
  const cx = cfg.bodyCenterX, cy = cfg.baseline - 96 * k;
  const x = cx - w / 2, y = cy - h / 2, f = 22 * k;
  const sheet = `M${P([x + 8 * k, y])}H${fmt(x + w - f)}L${P([x + w, y + f])}V${fmt(y + h - 8 * k)}Q${P([x + w, y + h])} ${P([x + w - 8 * k, y + h])}H${fmt(x + 8 * k)}Q${P([x, y + h])} ${P([x, y + h - 8 * k])}V${fmt(y + 8 * k)}Q${P([x, y])} ${P([x + 8 * k, y])}Z`;
  const fold = `M${P([x + w - f, y])}V${fmt(y + f - 5 * k)}Q${P([x + w - f, y + f])} ${P([x + w - f + 5 * k, y + f])}H${fmt(x + w)}Z`;
  const line = (yy, len, color = '#C9D2E8') => `<rect x="${fmt(x + 16 * k)}" y="${fmt(yy)}" width="${fmt(len)}" height="${fmt(6 * k)}" rx="${fmt(3 * k)}" fill="${color}"/>`;
  const bars = [[0.45, '#3C66F6'], [0.75, NAVY], [0.6, '#00B8D9'], [0.9, NAVY]].map(([v, c], j) => {
    const bh = 44 * k * v, bx = x + 18 * k + j * 22 * k, base = y + h - 18 * k;
    return `<rect x="${fmt(bx)}" y="${fmt(base - bh)}" width="${fmt(14 * k)}" height="${fmt(bh)}" rx="${fmt(3 * k)}" fill="${c}"/>`;
  }).join('');
  return `<g transform="rotate(-5 ${P([cx, cy])})" filter="url(#${p}drop)"><path d="${sheet}" fill="url(#${p}paper)"/><path d="${fold}" fill="#DAD8D8"/>`
    + `<rect x="${fmt(x + 16 * k)}" y="${fmt(y + 16 * k)}" width="${fmt(52 * k)}" height="${fmt(9 * k)}" rx="${fmt(4.5 * k)}" fill="${NAVY}"/>`
    + line(y + 34 * k, 92 * k) + line(y + 46 * k, 78 * k) + line(y + 58 * k, 86 * k) + bars + '</g>';
}

// ---- frame ----------------------------------------------------------------------------------

/** Returns the SVG markup of one frame (in source units, without the outer <svg>). */
export function frame(m, state, uid) {
  const s = { ...DEFAULT_STATE, ...state };
  const { cfg, prefix: p } = m;
  const by = cfg.baseline + s.bodyDy, bx = cfg.bodyCenterX;
  const torsoTf = `translate(${fmt(bx)} ${fmt(by)}) scale(${fmt(s.bodySx)} ${fmt(s.bodySy)}) translate(${fmt(-bx)} ${fmt(-cfg.baseline)})`;
  const torsoT = ([x, y]) => [bx + (x - bx) * s.bodySx, by + (y - cfg.baseline) * s.bodySy];
  // The head rides on the torso: follow the neck point through the squash.
  const [nx, ny] = torsoT(cfg.neck);
  const hdx = nx - cfg.neck[0] + s.headDx, hdy = ny - cfg.neck[1] + s.headDy;
  const headTf = `translate(${fmt(hdx)} ${fmt(hdy)}) rotate(${fmt(s.headTilt)} ${P(cfg.neck)})`;
  const props = new Set(s.props.map(x => (typeof x === 'string' ? x : x.type)));
  const prop = type => s.props.find(x => (typeof x === 'string' ? x : x.type) === type);
  const arg = (type, key, d) => { const x = prop(type); return typeof x === 'object' && x[key] !== undefined ? x[key] : d; };

  const out = [];
  if (cfg.parts.fur) {
    const [fx, fy] = cfg.furPivot;
    out.push(`<g transform="${headTf}"><g transform="translate(${P([fx, fy])}) rotate(${fmt(s.furSway)}) scale(${fmt(s.furScale)}) translate(${P([-fx, -fy])})">${ref(m, 'fur')}</g></g>`);
  }
  const front = s.armsFront ? '' : arms(m, s, torsoT, 'LR');
  out.push(`<g filter="url(#${p}${cfg.torsoFilter})">${front}<use href="#${p}torso" transform="${torsoTf}" fill="url(#${p}${cfg.torsoFill})"/></g>`);
  out.push(`<g transform="${torsoTf}">${ref(m, 'tie')}</g>`);
  if (props.has('document')) out.push(`<g transform="translate(0 ${fmt(by - cfg.baseline)})">${documentProp(m)}</g>`);
  if (s.armsFront) out.push(`<g filter="url(#${p}${cfg.torsoFilter})">${arms(m, s, torsoT, 'LR')}</g>`);

  const head = [];
  if (cfg.parts.ears) {
    cfg.earPivots.forEach((pv, i) => {
      head.push(`<g transform="rotate(${fmt(i === 0 ? -s.earL : s.earR)} ${P(pv)})">${ref(m, i === 0 ? 'ear-l' : 'ear-r')}</g>`);
    });
  }
  head.push(ref(m, 'head'));
  const faceRot = cfg.faceAngle ? ` transform="rotate(${fmt(cfg.faceAngle)} ${P(cfg.faceCenter)})"` : '';
  const face = {
    eyes: `<g${faceRot}>${eye(m, s, 0, uid)}${eye(m, s, 1, uid)}${brow(m, s, 0)}${brow(m, s, 1)}</g>`,
    nose: ref(m, 'nose'),
    mouth: `<g${faceRot}>${mouth(m, s, uid)}</g>`,
    blush: blush(m, s, 0) + blush(m, s, 1),
  };
  head.push(...cfg.faceOrder.map(k => face[k]));
  if (props.has('tear')) head.push(`<g${faceRot}>${tear(m, 0, arg('tear', 't', 0))}${arg('tear', 'both', false) ? tear(m, 1, arg('tear', 't', 0)) : ''}</g>`);
  out.push(`<g transform="${headTf}">${head.join('')}</g>`);

  if (props.has('question')) out.push(question(m, arg('question', 'pop', 1)));
  if (props.has('zzz')) out.push(`<g transform="translate(${fmt(hdx)} ${fmt(hdy)})">${zzz(m, arg('zzz', 'phase', 0.2), arg('zzz', 'count', 3))}</g>`);
  if (props.has('sparkles')) out.push(sparkles(m, arg('sparkles', 't', 0)));
  if (props.has('hearts')) out.push(floatHearts(m, arg('hearts', 't', 0)));
  return `<g fill="none">${out.join('')}</g>`;
}

export { MASCOTS };
