import { Brand } from '../_components/brand';
import { anchors, portal, signIn } from './site-list';

const qcu = 'https://qcu.edu.ph/';
const columns = [
  { title: 'ACCS', links: [{ label: 'Features', href: anchors.features }, { label: 'How it works', href: anchors.howItWorks }, { label: 'Help center', href: portal('/help') }] },
  { title: 'Community', links: [{ label: 'Forums', href: portal('/feed') }, { label: 'Organizations', href: portal('/organizations') }, { label: 'Guidelines', href: portal('/help') }] },
  { title: 'Related sites', links: [{ label: 'QCU website', href: qcu }, { label: 'CCS page', href: `${qcu}academics/colleges-and-courses-offered/college-of-information-technology/` }, { label: 'Student portal', href: signIn }] },
];

export function Footer() {
  return <footer className="site-footer">
    <div className="lp-wrap">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Brand size="lg" />
          <p>Your access to the College of Computer Studies, Quezon City University.</p>
          {/* Social marks from the frame. The college has published no account URLs yet, so they are not links. */}
          <ul className="site-footer__social" aria-hidden="true"><li>f</li><li>in</li><li>@</li></ul>
        </div>
        {columns.map(column => <nav key={column.title} className="site-footer__col" aria-label={column.title}>
          <h2>{column.title}</h2>
          <ul>{column.links.map(link => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
        </nav>)}
      </div>
      <div className="site-footer__bottom">
        <p>© 2026 ACCS · College of Computer Studies, Quezon City University</p>
        <p>Privacy  ·  Terms</p>
      </div>
    </div>
  </footer>;
}
