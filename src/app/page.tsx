import { Aurora, Badge, Button, CountUp, DoorPlate, GridBackdrop, Hero, Highlight, Marquee, Parallax, ParallaxScene, Reveal, Section, SectionHeader, SpotlightCard, WordReveal } from '@meetingat10/design-system/react';
import { modules, programs, roles } from '../data/modules';
import { sites } from '../lib/sites';
import { Art, type ArtName } from './_components/art';
import { ModuleExplorer } from './_components/module-explorer';
import { SampleWeek } from './sample-week';

const lanes = [
  { name: 'Community', lane: 'community' as const, art: 'neural-cluster' as const, copy: 'A college feed, class discussions and organization spaces. A place to ask, share and keep up.', ids: ['ALL-03', 'STU-02', 'PRO-02', 'ORG-01', 'ORG-02'], href: `${sites.forums}/feed`, action: 'Visit the forum' },
  { name: 'Consultations & schedule', lane: 'consult' as const, art: 'glass-discs' as const, copy: 'Find office hours, request a consultation and keep an academic calendar in view.', ids: ['STU-04', 'STU-05', 'PRO-04', 'PRO-05'], href: `${sites.schedule}/consultations`, action: 'Explore Schedule' },
  { name: 'Reports & cases', lane: undefined, art: 'frosted-dodecahedron' as const, copy: 'Raise a concern and follow its replies and milestones. Report access follows separate permissions.', ids: ['STU-06', 'STU-07', 'STU-08', 'STU-09', 'PRO-06', 'CHR-02', 'DEAN-02', 'GUD-01', 'OSAS-01', 'PRES-01'], href: `${sites.cases}/reports`, action: 'Explore Cases' },
];
const ecosystem: { name: string; copy: string; href: string; art: ArtName; lane?: 'community' | 'consult' }[] = [
  { name: 'ACCS Home', copy: 'Sign in, see your role dashboard and find the workspaces available to you.', href: `${sites.portal}/sign-in`, art: 'linked-c-liquid-glass' },
  { name: 'Forums', copy: 'The community forum: college discussions, organizations, messages and the directory.', href: `${sites.forums}/feed`, art: 'neural-cluster', lane: 'community' },
  { name: 'Schedule', copy: 'Calendars, consultation requests and faculty availability.', href: `${sites.schedule}/consultations`, art: 'glass-discs', lane: 'consult' },
  { name: 'Cases', copy: 'Concern reports, assigned queues and case milestones.', href: `${sites.cases}/reports`, art: 'frosted-dodecahedron' },
  { name: 'Evaluations', copy: 'Faculty evaluation participation, administration and authorized summaries.', href: `${sites.evaluations}/evaluations`, art: 'wire-octahedron' },
  { name: 'Records', copy: 'Authorized standing, offense, restriction and analytics views.', href: `${sites.records}/records`, art: 'ribbon-torus' },
  { name: 'Admin', copy: 'Role configuration, moderation and system monitoring.', href: `${sites.admin}/admin`, art: 'fiber-ring' },
  { name: 'Design system', copy: 'Office Hours: the shared components, tokens and language behind ACCS.', href: sites.design, art: 'grid-cube' },
  { name: 'Meeting At 10', copy: 'The capstone team building the workspace and its shared design system.', href: sites.meeting, art: 'mobius-loop' },
];

export default function Home() {
  return <main id="main" tabIndex={-1}>
    <div className="hero-ground">
      <Aurora /><GridBackdrop />
      <Hero className="landing-hero" plate={<DoorPlate size="lg" code="CCS" />} title={<WordReveal as="span" text="Your Access to the College of Computer Studies." />} lead="ACCS (Access for College of Computer Studies) puts the CCS community, consultations and confidential concern reporting in one college workspace." actions={<><Button href={`${sites.portal}/sign-in`} iconEnd="arrow-up-right">Open ACCS</Button><Button href="#modules" variant="secondary">Explore the modules</Button></>} note="Capstone prototype for the QCU College of Computer Studies. Sample data only; not an official QCU service." art={
        <ParallaxScene className="hero-constellation" aria-hidden="true">
          <div className="hero-orbit" />
          <Art name="linked-c-liquid-glass" className="hero-art hero-art--main" depth={24} priority />
          <Art name="neural-cluster" className="hero-art hero-art--neural" depth={42} delay={-2} />
          <Art name="glass-discs" className="hero-art hero-art--discs" depth={14} delay={-5} />
          <Art name="frosted-dodecahedron" className="hero-art hero-art--frosted" depth={32} delay={-7} />
          <Art name="ribbon-torus" className="hero-art hero-art--ribbon" depth={18} delay={-3} />
          <span className="constellation-note">Community / Consultations / Concerns</span>
        </ParallaxScene>
      } />
    </div>
    <Marquee label="Programs and workspace features" className="college-marquee">{[...programs, 'Community', 'Consultations', 'Reports', 'Evaluations', 'Assistant', 'Directory', 'Notifications'].map(item => <span key={item}>{item}<span aria-hidden="true"> · </span></span>)}</Marquee>
    <Section tight className="numbers-section" aria-label="The specified scope">
      <div className="numbers">{[
        { key: 'modules', value: modules.length, label: 'modules' },
        { key: 'roles', value: roles.length - 1, label: 'operational roles' },
        { key: 'programs', value: programs.length, label: 'programs' },
        { key: 'workspace', value: 1, label: 'college workspace' },
      ].map(item => <div className="number" key={item.key} data-count={item.key} data-value={item.value}><CountUp value={item.value} /><span>{item.label}</span></div>)}</div>
      <p className="caption">From the ACCS module inventory (DOC003). BSIT, BSCS and BSIS · QCU College of Computer Studies, San Bartolome.</p>
    </Section>
    <Section id="lanes" tone="sheet" aria-labelledby="lanes-title">
      <Reveal><SectionHeader id="lanes-title" title="Three lanes, one workspace." description="The same college. Different kinds of work. Each lane keeps its own rules." /></Reveal>
      <div className="lanes-grid">{lanes.map((lane, index) => <Reveal key={lane.name} index={index}>
        <SpotlightCard as="article" lane={lane.lane} className={`lane-card${index === 2 ? ' lane-card--restricted' : ''}`} data-lane-modules={lane.ids.join(' ')}>
          <div className="lane-card__art" aria-hidden="true"><Art name={lane.art} float={index !== 2} /></div>
          <Badge tone={lane.lane ?? 'neutral'} form={index === 2 ? 'restricted' : 'solid'}>{index === 2 ? 'Separate access rules' : lane.name}</Badge>
          <h3>{lane.name}</h3><p>{lane.copy}</p>
          <p className="module-code lane-card__codes">{lane.ids.join(' · ')}</p>
          <a className="text-link" href={lane.href}>{lane.action}<span aria-hidden="true"> ↗</span></a>
        </SpotlightCard>
      </Reveal>)}</div>
      <p className="boundary"><Highlight>Community access never implies report access.</Highlight></p>
      <div className="sample-week"><Reveal><SectionHeader title="A week in ACCS." description="Class work and office hours on one sheet. This timetable contains sample events, not live availability." /><SampleWeek /></Reveal></div>
    </Section>
    <Section id="modules" aria-labelledby="modules-title">
      <Reveal><SectionHeader id="modules-title" title="A place for every role." description="Explore the specified modules. The inventory names what each role needs; permissions still decide what an account can use." actions={<Button href="/modules/" variant="secondary" iconEnd="arrow-right">See the full inventory</Button>} split /></Reveal>
      <div id="roles"><h3 className="ds-visually-hidden">Roles in DOC003</h3><ModuleExplorer /></div>
    </Section>
    <Section tone="sheet" aria-labelledby="path-title">
      <Reveal><SectionHeader id="path-title" title="A concern has a path." description="A proposed escalation sequence, with people responsible at each stage." /><Badge tone="warning" form="pending">Proposed — open decision D-04, not final</Badge></Reveal>
      <ol className="escalation">{['Adviser', 'Program Chair', 'Dean', 'Guidance', 'OSAS', "President’s Office"].map((step, index) => <Reveal as="li" key={step} index={index}><span className="escalation__node" aria-hidden="true" /><span>{step}</span></Reveal>)}</ol>
      <p className="reading-copy">Conflict rule: a report naming the student’s adviser goes to the Program Chair (PRO-06 / CHR-02). Routing and bypass decisions remain subject to the open decisions in DOC003.</p>
      <p className="caption">Permission is not confidentiality. A role or site membership does not automatically grant access to a report or case.</p>
    </Section>
    <Section aria-labelledby="support-title">
      <Reveal><SectionHeader id="support-title" title="Help finding your next step." description="Two shared modules keep the workspace understandable without making decisions for people." /></Reveal>
      <div className="support-grid">
        <Reveal className="support-item"><Parallax depth={24} aria-hidden="true"><Art name="swirl-sphere" className="support-art" /></Parallax><div><span className="module-code">ALL-04</span><h3>AI navigation assistant</h3><p>Answers system questions, helps navigate and draft reports. People decide — the assistant never applies restrictions or outcomes.</p><p className="caption">The prototype uses a local stub.</p><a className="text-link" href={`${sites.portal}/assistant`}>Open the assistant in ACCS Home ↗</a></div></Reveal>
        <Reveal className="support-item" index={1}><Parallax depth={-20} aria-hidden="true"><Art name="fiber-ring" className="support-art" /></Parallax><div><span className="module-code">ALL-05</span><h3>Role-aware notifications</h3><p>Announcements, consultation changes, report replies and milestones. Notices name the kind of event, never confidential details.</p><a className="text-link" href={`${sites.portal}/notifications`}>Open notifications in ACCS Home ↗</a></div></Reveal>
      </div>
    </Section>
    <Section id="sites" tone="sheet" aria-labelledby="sites-title">
      <Reveal><SectionHeader id="sites-title" title="One college. Connected sites." description="Seven app sites, with the same role and access rules. The design system and team site sit alongside them." /></Reveal>
      <div className="sites-grid">{ecosystem.map((site, index) => <Reveal key={site.name} index={index % 3}>
        <SpotlightCard href={site.href} lane={site.lane} className="site-card" aria-label={`Visit ${site.name}`}>
          <div className="site-card__art" aria-hidden="true"><Art name={site.art} float={false} /></div>
          <h3>{site.name}<span aria-hidden="true"> ↗</span></h3><p>{site.copy}</p><span className="site-card__destination">Visit {site.name}</span>
        </SpotlightCard>
      </Reveal>)}</div>
      <p className="caption">These links open the deployed CloudFront sites. Available functions depend on your signed-in role.</p>
    </Section>
    <Section tone="plate" className="closing-band"><Reveal><h2>Bring your questions to ACCS.</h2><p>A capstone prototype for the CCS community.</p><Button variant="plate" href={`${sites.portal}/sign-in`} iconEnd="arrow-up-right">Open ACCS</Button></Reveal></Section>
  </main>;
}
