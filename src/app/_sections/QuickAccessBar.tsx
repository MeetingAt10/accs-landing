import { Icon } from '@meetingat10/design-system/react';
import { appSites } from './site-list';

export function QuickAccessBar() {
  return <nav className="quick wrap" aria-label="Go straight to an ACCS site">
    <ul>{appSites.map(site => <li key={site.key}><a href={site.href}><Icon name={site.icon} size={20} /><span>{site.name}</span></a></li>)}</ul>
  </nav>;
}
