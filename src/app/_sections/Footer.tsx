import { DoorPlate, Footer as DsFooter } from '@meetingat10/design-system/react';
import { sites } from '../../lib/sites';
import { register, signIn } from './site-list';

export function Footer() {
  return <DsFooter brand={<DoorPlate />} description="Your access to the College of Computer Studies." columns={[
    { title: 'ACCS', links: [{ label: 'Sign in', href: signIn }, { label: 'Create account', href: register }, { label: 'All modules', href: '/modules/' }] },
    { title: 'Community', links: [{ label: 'Forums', href: `${sites.forums}/feed` }, { label: 'Schedule', href: `${sites.schedule}/consultations` }] },
    { title: 'Related sites', links: [{ label: 'Design system', href: sites.design }, { label: 'Meeting At 10', href: sites.meeting }] },
  ]} meta="QCU College of Computer Studies, San Bartolome" />;
}
