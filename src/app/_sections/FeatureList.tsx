'use client';
import { useEffect, useRef, useState } from 'react';
import { features, type FeatureIcon } from './features';

function Icon({ icon }: { icon: FeatureIcon }) {
  return <span aria-hidden="true" className="feat__icon" style={{ width: icon.size, height: icon.size }}>
    {icon.parts.map(part => <span key={part.file} style={{ inset: part.inset, backgroundImage: `url(/landing/icons/${part.file}.svg)` }} />)}
  </span>;
}

/**
 * The four Feature Hover buttons. Hovering with a mouse, or pressing (click, tap, Enter or Space),
 * shows the pressed variant: a brighter button with its detail panel. Escape closes the open panel.
 */
export function FeatureList() {
  const [open, setOpen] = useState<number | null>(null);
  const list = useRef<HTMLUListElement>(null);
  const pointer = useRef('');
  useEffect(() => {
    if (open === null) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      list.current?.querySelectorAll<HTMLButtonElement>('.feat__button')[open]?.focus();
      setOpen(null);
    };
    const outside = (event: PointerEvent) => { if (!list.current?.contains(event.target as Node)) setOpen(null); };
    window.addEventListener('keydown', close);
    window.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('pointerdown', outside); };
  }, [open]);
  return <ul className="feats" ref={list}>
    {features.map((feature, index) => {
      const expanded = open === index;
      return <li key={feature.title} className="feat" data-open={expanded}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(index); }}
        onPointerLeave={event => { if (event.pointerType === 'mouse') setOpen(current => current === index ? null : current); }}>
        <button type="button" className="feat__button" aria-expanded={expanded} aria-controls={`feat-${index}`}
          onPointerDown={event => { pointer.current = event.pointerType; }}
          onClick={event => {
            // A mouse already opened the panel on hover, so its click keeps it open; keys and taps toggle.
            const hovered = event.detail !== 0 && pointer.current === 'mouse';
            setOpen(expanded && !hovered ? null : index);
          }}>
          {feature.title}
        </button>
        <div id={`feat-${index}`} className="feat__panel" role="region" aria-label={feature.title}>
          <ul>{feature.items.map(item => <li key={item.title}>
            <Icon icon={item.icon} />
            <span><strong>{item.title}</strong><span>{item.body}</span></span>
          </li>)}</ul>
        </div>
      </li>;
    })}
  </ul>;
}
