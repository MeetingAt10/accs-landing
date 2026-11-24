'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@meetingat10/design-system/react';
import { Brand } from '../_components/brand';
import { anchors, portal, signIn } from './site-list';

const links = [
  { label: 'Features', href: anchors.features }, { label: 'Offices', href: anchors.offices }, { label: 'How it works', href: anchors.howItWorks },
  { label: 'Forums', href: portal('/feed') }, { label: 'Help', href: portal('/help') },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLElement>(null);
  // On the home page the bar floats over the hero sky until the page scrolls; elsewhere it is solid.
  const overHero = usePathname() === '/';
  useEffect(() => {
    // The bar also shows how far down the page you are (the page has no visible scrollbar).
    const update = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty('--progress', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key !== 'Escape') return; setOpen(false); bar.current?.querySelector<HTMLElement>('.nav__toggle')?.focus(); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="nav" ref={bar} data-open={open} data-solid={!overHero || scrolled || open}>
    <div className="nav__bar">
      <span className="nav__progress" aria-hidden="true" />
      <Link className="nav__brand" href="/" aria-label="ACCS home"><Brand /></Link>
      <nav className="nav__links" aria-label="Primary">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <div className="nav__actions">
        <a className="pill pill--light" href={signIn}>Sign in</a>
      </div>
      <button type="button" className="nav__toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
        <Icon name={open ? 'x' : 'list'} size={24} />
      </button>
    </div>
    <div className="nav__scrim" aria-hidden="true" onClick={() => setOpen(false)} />
    <div id="mobile-menu" className="nav__menu" inert={!open}>
      <nav aria-label="Mobile">{links.map((link, index) => <a key={link.href} href={link.href} style={{ '--i': index } as React.CSSProperties} onClick={() => setOpen(false)}>{link.label}</a>)}</nav>
      <div className="nav__menu-actions">
        <a className="pill pill--light" href={signIn}>Sign in</a>
      </div>
    </div>
  </header>;
}
