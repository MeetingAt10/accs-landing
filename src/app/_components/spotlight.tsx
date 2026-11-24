'use client';

import { useRef } from 'react';

/** A container whose children light up under the pointer: sets --mx/--my on the hovered child. */
export function Spotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.PointerEvent) => {
    const tile = (event.target as HTMLElement).closest<HTMLElement>('[data-tone]');
    if (!tile || !ref.current?.contains(tile)) return;
    const box = tile.getBoundingClientRect();
    tile.style.setProperty('--mx', `${event.clientX - box.left}px`);
    tile.style.setProperty('--my', `${event.clientY - box.top}px`);
  };
  return <div ref={ref} className={className} onPointerMove={move}>{children}</div>;
}
