import type { CSSProperties } from 'react';
import lion from '../../../public/landing/mascot/lion/manifest.json';
import cub from '../../../public/landing/mascot/cub/manifest.json';

/**
 * Plays a mascot sprite sheet from public/landing/mascot (built by `npm run mascot`) with a CSS steps()
 * animation, or shows one emotion or pose from the stills sheet. Decorative by default (aria-hidden);
 * pass `label` to expose it as an image. With prefers-reduced-motion it shows the first frame, which
 * is the rest pose of every loop.
 */
const manifests = { lion, cub };

export type MascotName = keyof typeof manifests;
export type MascotAnimation = keyof typeof lion.animations & keyof typeof cub.animations;

type Props = {
  mascot: MascotName;
  /** A looping idle animation. Ignored when `still` is set. Defaults to "breathe". */
  animation?: MascotAnimation;
  /** An emotion or pose from the stills sheet, such as "happy" or "wave" (see the manifest). */
  still?: string;
  /** Rendered width in CSS pixels; the height follows the frame's aspect ratio. Defaults to the 1x frame width. */
  width?: number;
  className?: string;
  /** Accessible name. Without one the sprite is hidden from assistive technology. */
  label?: string;
};

const css = `
.mascot-sprite { display: inline-block; background-repeat: no-repeat; }
.mascot-sprite[data-playing] { animation: mascot-sprite-play var(--sprite-duration) steps(var(--sprite-frames), jump-none) var(--sprite-iterations) both; }
@keyframes mascot-sprite-play { from { background-position-x: 0%; } to { background-position-x: 100%; } }
@media (prefers-reduced-motion: reduce) { .mascot-sprite[data-playing] { animation: none; background-position-x: 0%; } }
`;

export function MascotSprite({ mascot, animation = 'breathe', still, width, className, label }: Props) {
  const manifest = manifests[mascot];
  const url = (file: string) => `url(${manifest.basePath}${file})`;
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  const w = width ?? manifest.frameWidth;
  const base: CSSProperties = { width: w, height: (w * manifest.frameHeight) / manifest.frameWidth, flex: 'none' };
  let style: CSSProperties;
  let playing = false;

  const index = still === undefined ? -1 : manifest.stills.frames.indexOf(still);
  if (index >= 0) {
    const { columns, rows, file, file2x } = manifest.stills;
    const col = index % columns, row = Math.floor(index / columns);
    style = {
      ...base,
      backgroundImage: `image-set(${url(file)} 1x, ${url(file2x)} 2x)`,
      backgroundSize: `${columns * 100}% ${rows * 100}%`,
      backgroundPosition: `${columns > 1 ? (col / (columns - 1)) * 100 : 0}% ${rows > 1 ? (row / (rows - 1)) * 100 : 0}%`,
    };
  } else {
    const sheet = manifest.animations[animation];
    playing = sheet.frames > 1;
    style = {
      ...base,
      backgroundImage: `image-set(${url(sheet.file)} 1x, ${url(sheet.file2x)} 2x)`,
      backgroundSize: `${sheet.frames * 100}% 100%`,
      '--sprite-frames': sheet.frames,
      '--sprite-duration': `${sheet.frames / sheet.fps}s`,
      '--sprite-iterations': sheet.loop ? 'infinite' : 1,
    } as CSSProperties;
  }

  return <>
    <style href="mascot-sprite" precedence="default">{css}</style>
    <span {...a11y} className={className ? `mascot-sprite ${className}` : 'mascot-sprite'} data-playing={playing || undefined} style={style} />
  </>;
}
