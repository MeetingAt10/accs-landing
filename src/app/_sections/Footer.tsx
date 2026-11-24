import { Asset } from '../_components/asset';
import { Wordmark } from '../_components/logo';
import { designSystem, portal, signIn, team } from './site-list';

const columns = [
  { title: 'ACCS', links: [{ label: 'Sign In', href: signIn }, { label: 'Modules', href: '/modules/' }] },
  { title: 'Community', links: [{ label: 'Forum', href: portal('/feed') }, { label: 'FAQS', href: portal('/help') }] },
  { title: 'Related Sites', links: [{ label: 'Design System', href: designSystem }, { label: 'Meeting At Ten', href: team }] },
];

export function Footer() {
  return <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__brand">
        <Wordmark className="wordmark--footer" />
        <p>Your Access to the College of Computer Studies</p>
        {/* Social marks from the frame. The college has published no account URLs, so they are not links. */}
        <ul className="site-footer__social" aria-hidden="true">
          <li><Asset name="social-facebook.svg" width={39} /></li>
          <li><Asset name="social-email.svg" width={39} /></li>
          <li><Asset name="social-phone.svg" width={32.25} /></li>
        </ul>
      </div>
      {columns.map(column => <nav key={column.title} className="site-footer__col" aria-label={column.title}>
        <h2>{column.title}</h2>
        <ul>{column.links.map(link => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
      </nav>)}
    </div>
    <div className="site-footer__bottom"><p>© 2026 Quezon City University - College of Computer Studies. All rights reserved.</p></div>
  </footer>;
}
