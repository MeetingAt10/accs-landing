'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, List } from '@phosphor-icons/react/dist/ssr';
import { signInUrl } from '../../data/workspaces';

const links = [
  { label: 'Workspaces', href: '/#sites' }, { label: 'Features', href: '/#features' }, { label: 'Guidance', href: '/#guidance' },
  { label: 'Programs', href: '/#programs' },
];

export function Nav() {
  const menu = useRef<HTMLDivElement>(null);
  return <header className="nav">
    <div className="wrap nav__bar">
      <Link className="plate" href="/" aria-label="ACCS home">ACCS</Link>
      <nav className="nav__links" aria-label="Primary">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <a className="btn btn--signal btn--sm nav__signin" href={signInUrl}>Sign in<ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
      <button type="button" className="nav__toggle" popoverTarget="menu" aria-label="Menu"><List size={28} weight="bold" aria-hidden="true" /></button>
    </div>
    <div id="menu" className="menu" popover="auto" ref={menu}>
      <nav aria-label="Mobile">
        {links.map(link => <a key={link.href} href={link.href} onClick={() => menu.current?.hidePopover()}>{link.label}<ArrowRight size={28} weight="bold" aria-hidden="true" /></a>)}
      </nav>
      <a className="btn btn--signal" href={signInUrl}>Sign in<ArrowRight size={20} weight="bold" aria-hidden="true" /></a>
    </div>
  </header>;
}
