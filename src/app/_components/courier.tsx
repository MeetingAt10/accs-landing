'use client';

import { useEffect, useRef } from 'react';

/**
 * The student's report, travelling down the home page with the scroll. It idles in a dock under the hero sign-in
 * button, then floats from dock to dock (`[data-dock]` elements, in page order): each feature tile, the routing
 * panel, the status card and the call to action. At each dock it takes that stop's shape. While a dock sits at
 * the reading line the report stays in it and moves with the page; between docks it flies on a short arc.
 * Off on narrow screens and under reduced motion, where the docks simply stay empty and the static key card shows.
 */
const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lines = [34, 50, 66, 82];

export function Courier() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const off = matchMedia('(prefers-reduced-motion: reduce), (max-width: 1023px)');
    let raf = 0;
    let last = 0;
    let shown: { x: number; y: number; tilt: number } | null = null;

    // Each frame works out where the report should be, then eases the shown position toward it, so it glides and
    // trails the scroll slightly instead of snapping. The loop runs until the report has caught up.
    const frame = (now: number) => {
      raf = 0;
      if (off.matches) { el.hidden = true; delete root.dataset.courier; shown = null; return; }
      const docks = [...document.querySelectorAll<HTMLElement>('[data-dock]')].filter(dock => dock.offsetWidth > 0).map(dock => {
        const box = dock.getBoundingClientRect();
        return { stage: dock.dataset.dock ?? 'start', x: box.left + box.width / 2, y: box.top + box.height / 2, key: 0 };
      });
      if (!docks.length) return;
      // Docks side by side (two tiles in a row) share a height, so each dock's scroll key is kept at least 300px
      // past the previous one: the report reaches the second tile 300px of scroll after the first.
      docks.forEach((dock, k) => { dock.key = k ? Math.max(dock.y, docks[k - 1].key + 300) : dock.y; });
      el.hidden = false;
      root.dataset.courier = 'on';

      // The reading line sits a little below the middle of the screen; the report rests in a dock until the next
      // dock is 20% of the way to the line, flies for the middle 60%, and settles in the next dock.
      const line = innerHeight * .55;
      const end = docks[docks.length - 1];
      let { x, y, stage } = docks[0];
      let tilt = 0;
      if (line >= end.key) ({ x, y, stage } = end);
      else if (line >= docks[0].key) {
        const i = docks.findIndex((dock, k) => k < docks.length - 1 && line >= dock.key && line < docks[k + 1].key);
        const a = docks[i], b = docks[i + 1];
        const t = smoother(Math.min(1, Math.max(0, ((line - a.key) / (b.key - a.key) - .2) / .6)));
        const arc = Math.sin(Math.PI * t);
        x = a.x + (b.x - a.x) * t;
        y = a.y + (b.y - a.y) * t - arc * 70;
        tilt = arc * (b.x >= a.x ? 14 : -14);
        stage = t < .5 ? a.stage : b.stage;
      }
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      const follow = 1 - Math.exp(-dt / 120);
      shown ??= { x, y, tilt };
      shown.x += (x - shown.x) * follow;
      shown.y += (y - shown.y) * follow;
      shown.tilt += (tilt - shown.tilt) * follow;
      el.style.transform = `translate3d(${shown.x.toFixed(2)}px, ${shown.y.toFixed(2)}px, 0) rotate(${shown.tilt.toFixed(2)}deg)`;
      if (el.dataset.stage !== stage) el.dataset.stage = stage;
      if (Math.abs(x - shown.x) + Math.abs(y - shown.y) + Math.abs(tilt - shown.tilt) > .3) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const request = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const resize = new ResizeObserver(request);
    resize.observe(document.body);
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    off.addEventListener('change', request);
    request();
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      removeEventListener('scroll', request);
      removeEventListener('resize', request);
      off.removeEventListener('change', request);
      delete root.dataset.courier;
    };
  }, []);

  return <div ref={ref} className="courier" data-stage="start" aria-hidden="true" hidden>
    <div className="courier__bob">
      <svg className="courier__art" viewBox="0 0 160 130">
        {/* Hero and Raise a concern: a note being written; the concern adds a lock for confidentiality. */}
        <g data-shape="start concern">
          <rect className="c-paper" x="38" y="8" width="84" height="112" rx="10" />
          <rect className="c-ink" x="50" y="20" width="34" height="7" rx="3.5" />
          {lines.map((y, i) => <path key={y} className="c-line" d={`M50 ${y + 8} H${i === 3 ? 92 : 110}`} style={{ '--i': i } as React.CSSProperties} />)}
        </g>
        <g data-shape="concern" className="c-badge"><circle cx="118" cy="102" r="17" /><rect x="110.5" y="100" width="15" height="11" rx="2.5" className="c-badge__body" /><path d="M113.5 100 v-3.5 a4.5 4.5 0 0 1 9 0 v3.5" className="c-badge__loop" /></g>
        {/* Book a consultation: a calendar slip with the picked slot. */}
        <g data-shape="consult">
          <rect className="c-paper" x="22" y="16" width="116" height="98" rx="12" />
          <path className="c-ink" d="M22 28 a12 12 0 0 1 12 -12 h92 a12 12 0 0 1 12 12 v8 h-116 z" />
          {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} className={i === 4 ? 'c-slot c-slot--pick' : 'c-slot'} x={36 + (i % 3) * 32} y={50 + Math.floor(i / 3) * 28} width="24" height="18" rx="4" />)}
        </g>
        {/* Follow your spaces: a chat bubble with a reply. */}
        <g data-shape="spaces">
          <path className="c-paper" d="M30 18 h86 a14 14 0 0 1 14 14 v40 a14 14 0 0 1 -14 14 h-58 l-16 14 v-14 h-12 a14 14 0 0 1 -14 -14 v-40 a14 14 0 0 1 14 -14 z" />
          <path className="c-line" d="M34 42 H104" style={{ '--i': 0 } as React.CSSProperties} />
          <path className="c-line" d="M34 60 H86" style={{ '--i': 1 } as React.CSSProperties} />
          <rect className="c-ink" x="92" y="82" width="52" height="30" rx="12" />
          <circle cx="106" cy="97" r="3" className="c-dot-w" /><circle cx="118" cy="97" r="3" className="c-dot-w" /><circle cx="130" cy="97" r="3" className="c-dot-w" />
        </g>
        {/* Evaluate your professors: a rating card. */}
        <g data-shape="evaluate">
          <rect className="c-paper" x="22" y="20" width="116" height="90" rx="12" />
          {[0, 1, 2].map(r => <g key={r}><path className="c-line c-line--static" d={`M36 ${44 + r * 22} H66`} />{[0, 1, 2, 3, 4].map(d => <circle key={d} className={r * 5 + d < 12 ? 'c-rate c-rate--on' : 'c-rate'} cx={80 + d * 11} cy={44 + r * 22} r="4" />)}</g>)}
        </g>
        {/* Routing: sealed, with the alias stamped on. */}
        <g data-shape="routing">
          <rect className="c-paper" x="16" y="22" width="128" height="88" rx="12" />
          <path className="c-flap" d="M20 30 L80 72 L140 30" />
          <g className="c-stamp"><circle cx="118" cy="48" r="16" /><text x="118" y="51.5">A-41</text></g>
        </g>
        {/* How it works: the report as a ticket whose stages fill. */}
        <g data-shape="how">
          <path className="c-paper" d="M26 30 h108 a10 10 0 0 1 10 10 v14 a8 8 0 0 0 0 16 v14 a10 10 0 0 1 -10 10 h-108 a10 10 0 0 1 -10 -10 v-14 a8 8 0 0 0 0 -16 v-14 a10 10 0 0 1 10 -10 z" />
          <text className="c-label" x="34" y="54">Report A-41</text>
          {[0, 1, 2, 3, 4].map(i => <circle key={i} className="c-dot" cx={40 + i * 20} cy="80" r="5" />)}
        </g>
        {/* Call to action: the report becomes your key to ACCS. */}
        <g data-shape="cta">
          <rect className="c-key" x="12" y="22" width="136" height="86" rx="14" />
          <rect className="c-key__chip" x="114" y="34" width="22" height="16" rx="4" />
          <text className="c-key__name" x="26" y="84">ACCS</text>
          <text className="c-key__meta" x="26" y="98">Student A-41</text>
        </g>
      </svg>
    </div>
  </div>;
}
