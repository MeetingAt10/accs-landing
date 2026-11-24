'use client';

import { useEffect } from 'react';

/**
 * Inertia for mouse-wheel scrolling on the home page: wheel input sets a target and the page eases toward it,
 * so the scroll (and everything tied to it) glides. Keyboard, scrollbar, touch and anchor jumps stay native;
 * pinch-zoom (ctrl + wheel), scrollable inner areas and reduced motion are left alone.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let target = scrollY;
    let raf = 0;
    let last = 0;

    const scrollable = (node: EventTarget | null) => {
      for (let el = node as HTMLElement | null; el && el !== document.body; el = el.parentElement) {
        const style = getComputedStyle(el);
        if (/(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight) return true;
      }
      return false;
    };

    const step = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      const y = scrollY + (target - scrollY) * (1 - Math.exp(-dt / 110));
      window.scrollTo(0, Math.abs(target - y) < .5 ? target : y);
      if (Math.abs(target - scrollY) >= .5) raf = requestAnimationFrame(step);
      else { raf = 0; last = 0; }
    };

    const wheel = (event: WheelEvent) => {
      if (reduce.matches || event.ctrlKey || event.defaultPrevented || scrollable(event.target)) return;
      event.preventDefault();
      if (!raf) target = scrollY;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
      const max = document.documentElement.scrollHeight - innerHeight;
      target = Math.max(0, Math.min(max, target + event.deltaY * unit));
      if (!raf) raf = requestAnimationFrame(step);
    };
    // Any other scroll (keys, scrollbar, anchors) takes over from a glide in progress.
    const interrupt = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; last = 0; } target = scrollY; };

    addEventListener('wheel', wheel, { passive: false });
    addEventListener('keydown', interrupt);
    addEventListener('pointerdown', interrupt);
    addEventListener('touchstart', interrupt, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('wheel', wheel);
      removeEventListener('keydown', interrupt);
      removeEventListener('pointerdown', interrupt);
      removeEventListener('touchstart', interrupt);
    };
  }, []);
  return null;
}
