import { FloatingArt, imagery, type FloatingArtProps } from '@meetingat10/design-system/react';
import linkedC from '@meetingat10/design-system/assets/imagery/linked-c-liquid-glass.webp';
import neural from '@meetingat10/design-system/assets/imagery/neural-cluster.webp';
import discs from '@meetingat10/design-system/assets/imagery/glass-discs.webp';
import dodecahedron from '@meetingat10/design-system/assets/imagery/frosted-dodecahedron.webp';
import ribbon from '@meetingat10/design-system/assets/imagery/ribbon-torus.webp';
import swirl from '@meetingat10/design-system/assets/imagery/swirl-sphere.webp';
import fiber from '@meetingat10/design-system/assets/imagery/fiber-ring.webp';
import cube from '@meetingat10/design-system/assets/imagery/grid-cube.webp';
import octahedron from '@meetingat10/design-system/assets/imagery/wire-octahedron.webp';
import mobius from '@meetingat10/design-system/assets/imagery/mobius-loop.webp';

// Turbopack emits package assets as URL strings; Next's typings say StaticImageData.
const url = (asset: string | { src: string }) => typeof asset === 'string' ? asset : asset.src;
const renders = { 'linked-c-liquid-glass': linkedC, 'neural-cluster': neural, 'glass-discs': discs, 'frosted-dodecahedron': dodecahedron, 'ribbon-torus': ribbon, 'swirl-sphere': swirl, 'fiber-ring': fiber, 'grid-cube': cube, 'mobius-loop': mobius, 'wire-octahedron': octahedron };
export type ArtName = keyof typeof renders;
export function Art({ name, ...props }: { name: ArtName } & Omit<FloatingArtProps, 'src' | 'width' | 'height' | 'alt'>) {
  return <FloatingArt src={url(renders[name])} width={imagery[name].width} height={imagery[name].height} alt="" {...props} />;
}
