'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button, DoorPlate, Icon } from '@meetingat10/design-system/react';
import { signIn } from './site-list';

const links = [
  { label: 'Sites', href: '/#sites' }, { label: 'Features', href: '/#features' }, { label: 'Guidance', href: '/#guidance' },
  { label: 'Programs', href: '/#programs' }, { label: 'Modules', href: '/modules/' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key !== 'Escape') return; setOpen(false); bar.current?.querySelector<HTMLElement>('.nav__toggle')?.focus(); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="nav" ref={bar} data-open={open}>
    <div className="nav__bar wrap">
      <Link className="nav__brand" href="/" aria-label="ACCS home"><DoorPlate /></Link>
      <nav className="nav__links" aria-label="Primary">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <div className="nav__actions">
        <Button href={signIn} variant="secondary" size="sm">Sign in</Button>      </div>
      <button type="button" className="nav__toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
        <Icon name={open ? 'x' : 'list'} size={24} />
      </button>
    </div>
    <div className="nav__scrim" aria-hidden="true" onClick={() => setOpen(false)} />
    <div id="mobile-menu" className="nav__menu" inert={!open}>
      <nav aria-label="Mobile">{links.map((link, index) => <a key={link.href} href={link.href} style={{ '--i': index } as React.CSSProperties} onClick={() => setOpen(false)}>{link.label}</a>)}</nav>
      <div className="nav__menu-actions">
        <Button href={signIn} variant="secondary" block>Sign in</Button>      </div>
    </div>
  </header>;
}
