// What the build renders: the emotion and pose stills and the looping idle animations, as rig states.
// Loops are written as functions of a phase t in [0, 1) so the last frame flows back into the first.

const TAU = Math.PI * 2;
const wave = (t, phase = 0) => Math.sin((t + phase) * TAU);
const ease = x => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, x)));

/** A gentle breath: torso squashes on the exhale, the head rides along. */
const breath = (t, amount = 1) => {
  const b = wave(t, 0.25); // starts at full inhale (b = 1) so frame 1 is the rest pose
  return { bodySy: 1 - 0.012 * amount * (1 - b), bodySx: 1 + 0.008 * amount * (1 - b), headDy: 1.2 * amount * (1 - b), furScale: 1 - 0.004 * amount * (1 - b) };
};

export const EMOTIONS = {
  neutral: {},
  happy: { eye: 'open', lidBottom: 0.3, mouth: 'cat', blush: 1.35, headTilt: -3 },
  laughing: { eye: 'happy', mouth: 'laugh', blush: 1.7, headTilt: -5, headDy: -4, bodySy: 1.01, armL: 52, armR: -46 },
  surprised: { eyeScale: 1.18, mouth: 'O', brows: { lift: 0.45, angle: 0 }, blush: 0.7, headDy: -3, bodySy: 1.015, armL: 58, armR: -52 },
  sad: { lidTop: 0.32, lidTilt: 14, lookY: 0.35, brows: { lift: 0.05, angle: 20 }, mouth: 'frown', blush: 0.7, headDy: 6, headTilt: 3, bodySy: 0.985, armL: 18, armR: -14, props: ['tear'] },
  thinking: { lookX: 0.7, lookY: -0.75, browR: { lift: 0.35, angle: -6 }, browL: { lift: 0, angle: 6 }, mouth: 'wavy', mouthDx: 5, headTilt: 6, props: ['question'] },
  sleepy: { lidTop: 0.5, lidTilt: -4, mouth: 'o', mouthDy: 2, blush: 0.9, headTilt: 5, headDy: 4, bodySy: 0.99, props: [{ type: 'zzz', phase: 0.35, count: 2 }] },
  wink: { eyeR: { eye: 'happy' }, mouth: 'smile', blush: 1.3, headTilt: -5, props: [{ type: 'sparkles', t: 0.2 }] },
  love: { eye: 'heart', mouth: 'smile', blush: 1.6, headTilt: -3, props: ['hearts'] },
  proud: { eye: 'happy', mouth: 'smug', blush: 1.2, headDy: -5, headTilt: -4, bodySx: 1.02, bodySy: 1.01, armL: 12, armR: -8, props: ['sparkles'] },
};

export const POSES = {
  wave: { armL: 112, headTilt: -7, mouth: 'smile', blush: 1.2, lidBottom: 0.15 },
  point: { armR: -102, fingerR: true, lookX: 0.9, headTilt: -4, headDx: 4, mouth: 'smile', blush: 1.1 },
  cheer: { armL: 140, armR: -136, eye: 'happy', mouth: 'grin', blush: 1.5, headDy: -4, bodySy: 1.015 },
  document: { armL: -12, armR: 14, armsFront: true, props: ['document'], lookY: 0.65, lookX: 0.15, headTilt: 3, headDy: 3, mouth: 'smile', blush: 1.1 },
};

export const ANIMATIONS = {
  breathe: { frames: 16, fps: 10, state: t => breath(t, 1.4) },
  blink: {
    frames: 12, fps: 12,
    state: (t, i) => {
      const lids = [0, 0, 0, 0, 0, 0, 0, 0.5, 1, 0.55, 0.15, 0][i];
      return { ...breath(t, 0.6), lidTop: lids * 0.97, eye: lids >= 1 ? 'closed' : 'open' };
    },
  },
  'look-around': {
    frames: 16, fps: 8,
    state: (t, i) => {
      // centre, glance left, hold, glance right, hold, back to centre
      const keys = [0, 0, -0.5, -1, -1, -1, -0.6, 0, 0.6, 1, 1, 1, 0.6, 0.2, 0, 0];
      const x = keys[i];
      return { ...breath(t, 0.6), lookX: x, lookY: -0.1 * Math.abs(x), headDx: 5 * x, headTilt: -3 * x, mouth: 'none' };
    },
  },
  sway: { frames: 12, fps: 10, state: t => ({ ...breath(t, 0.5), furSway: 2.2 * wave(t), earL: 9 * wave(t), earR: 9 * wave(t, 0.5), headTilt: 1.2 * wave(t) }) },
  doze: {
    frames: 16, fps: 6,
    state: t => {
      const nod = ease(wave(t, -0.25) * 0.5 + 0.5); // 0 = up, 1 = drooped
      return { eye: 'closed', mouth: 'o', mouthDy: 2, blush: 0.9, headDy: 2 + 6 * nod, headTilt: 3 + 4 * nod, bodySy: 1 - 0.012 * nod, bodySx: 1 + 0.008 * nod, furSway: 1.5 * nod, earL: 4 * nod, earR: 4 * nod, props: [{ type: 'zzz', phase: t, count: 3 }] };
    },
  },
  wave: {
    frames: 12, fps: 12,
    state: t => ({ ...POSES.wave, armL: 112 + 20 * wave(t), headTilt: -7 + 1.5 * wave(t, 0.25), ...breath(t, 0.5) }),
  },
};
