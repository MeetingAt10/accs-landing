import { Button, DoorPlate, Footer, Navbar, ScrollProgress } from '@meetingat10/design-system/react';
import { sites } from '../../lib/sites';

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <ScrollProgress />
    <Navbar brand={<DoorPlate />} brandLabel="ACCS home" links={[
      { label: 'Modules', href: '/#modules' }, { label: 'Lanes', href: '/#lanes' },
      { label: 'Roles', href: '/#roles' }, { label: 'Sites', href: '/#sites' },
    ]} actions={<><Button href={`${sites.forums}/feed`} variant="tertiary" size="sm" className="forum-action">Visit the forum</Button><Button href={`${sites.portal}/sign-in`} size="sm">Open ACCS</Button></>} />
  </>;
}

export function SiteFooter() {
  return <Footer brand={<DoorPlate />} description="Access for College of Computer Studies." columns={[
    { title: 'Product', links: [{ label: 'Modules', href: '/modules/' }, { label: 'Lanes', href: '/#lanes' }, { label: 'Sites', href: '/#sites' }] },
    { title: 'ACCS sites', links: [{ label: 'ACCS Home', href: `${sites.portal}/sign-in` }, { label: 'Forums', href: `${sites.forums}/feed` }, { label: 'Schedule', href: `${sites.schedule}/consultations` }, { label: 'Cases', href: `${sites.cases}/reports` }] },
    { title: 'More sites', links: [{ label: 'Evaluations', href: `${sites.evaluations}/evaluations` }, { label: 'Records', href: `${sites.records}/records` }, { label: 'Admin', href: `${sites.admin}/admin` }, { label: 'Design system', href: sites.design }, { label: 'Meeting At 10', href: sites.meeting }] },
  ]} note="ACCS is a capstone prototype by Meeting At 10 for the Quezon City University College of Computer Studies. It is not an official QCU service and uses synthetic data." meta="San Bartolome · 2026" />;
}
