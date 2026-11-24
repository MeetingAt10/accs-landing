'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from '../_components/logo';
import { signIn, team } from './site-list';

/** Logo, "Our Team" and the only account action, Sign In. Floats over the hero on the home page. */
export function Navbar() {
  const overHero = usePathname() === '/';
  return <header className="nav" data-over-hero={overHero}>
    <div className="nav__bar">
      <Link className="nav__brand" href="/" aria-label="ACCS home"><LogoMark /></Link>
      <nav className="nav__actions" aria-label="Primary">
        <a className="btn btn--outline" href={team}>Our Team</a>
        <a className="btn btn--navy" href={signIn}>Sign In</a>
      </nav>
    </div>
  </header>;
}
