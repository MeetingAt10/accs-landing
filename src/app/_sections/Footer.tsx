import Link from 'next/link';
import { signInUrl } from '../../data/workspaces';
import { sites } from '../../lib/sites';

const columns = [
  { title: 'ACCS', links: [{ label: 'Sign in', href: signInUrl }, { label: 'Workspaces', href: '/#sites' }] },
  { title: 'Community', links: [{ label: 'Forums', href: `${sites.portal}/feed` }, { label: 'Schedule', href: `${sites.portal}/consultations` }] },
  { title: 'Related sites', links: [{ label: 'Design system', href: sites.design }, { label: 'Meeting At 10', href: sites.meeting }] },
];

export function Footer() {
  return <footer className="footer">
    <div className="wrap footer__grid">
      <div>
        <Link className="plate" href="/" aria-label="ACCS home">ACCS</Link>
        <p>Your access to the College of Computer Studies.</p>
      </div>
      {columns.map(column => <nav key={column.title} aria-label={column.title}><h2>{column.title}</h2>{column.links.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}</nav>)}
    </div>
    <p className="wrap footer__meta">QCU College of Computer Studies, San Bartolome</p>
  </footer>;
}
