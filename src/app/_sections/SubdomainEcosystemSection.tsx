'use client';
import { useState, type ReactNode } from 'react';
import { Badge, Cell, CaseTimeline, CountUp, Column, ForumCard, Icon, ReportRecord, Row as TableRow, Segment, SegmentedControl, Switch, Tab, Table, TableBody, TableHeader, TabList, TabPanel, Tabs, Tile, Timetable, type IconName, type TimetableDay, type TimetableEvent, type TileTone } from '@meetingat10/design-system/react';
import { modules, signInUrl, type ModuleSite } from '../../data/modules';
import { sites } from '../../lib/sites';
import { appSites } from './site-list';

const roleTiles: Record<string, { icon: IconName; tone: TileTone; title: string; note: string }[]> = {
  Student: [
    { icon: 'calendar-check', tone: 'consult', title: 'Request a consultation', note: 'Pick an open slot with a professor' },
    { icon: 'chats', tone: 'community', title: 'Community feed', note: 'Discussions from your program' },
    { icon: 'flag', tone: 'restricted', title: 'My reports', note: 'Replies and milestones only you can see' },
    { icon: 'bell', tone: 'neutral', title: 'Notifications', note: 'Updates for your role' },
  ],
  Professor: [
    { icon: 'clock', tone: 'consult', title: 'Office hours', note: 'Publish and manage availability' },
    { icon: 'chats', tone: 'community', title: 'Class discussions', note: 'Post to your sections' },
    { icon: 'list-checks', tone: 'neutral', title: 'Evaluations', note: 'Summaries you may read' },
    { icon: 'bell', tone: 'neutral', title: 'Notifications', note: 'Requests and changes' },
  ],
  'Program Chair': [
    { icon: 'flag', tone: 'restricted', title: 'Assigned queue', note: 'Reports routed to the chair' },
    { icon: 'archive', tone: 'neutral', title: 'Standing and records', note: 'Program views you may open' },
    { icon: 'list-checks', tone: 'neutral', title: 'Evaluations', note: 'Program-level results' },
    { icon: 'megaphone', tone: 'community', title: 'Announcements', note: 'Post to the program' },
  ],
  Dean: [
    { icon: 'flag', tone: 'restricted', title: 'Escalated cases', note: 'Cases raised past the chair' },
    { icon: 'archive', tone: 'neutral', title: 'Records and analytics', note: 'College-wide views you may open' },
    { icon: 'list-checks', tone: 'neutral', title: 'Evaluation results', note: 'Summaries for the college' },
    { icon: 'megaphone', tone: 'community', title: 'College announcements', note: 'Reach every program' },
  ],
};
const days: TimetableDay[] = [
  { id: 'mon', label: 'Mon', fullLabel: 'Monday' }, { id: 'tue', label: 'Tue', fullLabel: 'Tuesday' },
  { id: 'wed', label: 'Wed', fullLabel: 'Wednesday', isToday: true }, { id: 'thu', label: 'Thu', fullLabel: 'Thursday' }, { id: 'fri', label: 'Fri', fullLabel: 'Friday' },
];
const events: TimetableEvent[] = [
  { id: 'mon-ds', day: 'mon', start: 9, end: 10.5, title: 'Data Structures', meta: 'CCS 201' },
  { id: 'tue-open', day: 'tue', start: 10, end: 11, title: 'Advising', meta: 'Open slot', lane: 'consult', form: 'open' },
  { id: 'wed-hours', day: 'wed', start: 9, end: 11, title: 'Office hours', meta: 'CCS 304', lane: 'consult' },
  { id: 'wed-forum', day: 'wed', start: 13, end: 14.5, title: 'Org meetup', meta: 'AVR', lane: 'community' },
  { id: 'thu-algo', day: 'thu', start: 8, end: 9.5, title: 'Algorithms', meta: 'CCS 105' },
  { id: 'fri-cap', day: 'fri', start: 8, end: 10, title: 'Thesis writing', meta: 'Lab 3' },
];
const criteria = ['Explains clearly', 'Responds to questions', 'Starts and ends on time'];
const standing = [
  { ref: 'CCS-2026-0142', program: 'BSIT', status: 'Good standing', tone: 'success' as const, updated: '21 Oct' },
  { ref: 'CCS-2026-0157', program: 'BSCS', status: 'Review pending', tone: 'warning' as const, updated: '24 Oct' },
  { ref: 'CCS-2026-0163', program: 'BSIS', status: 'Good standing', tone: 'success' as const, updated: '27 Oct' },
];
const adminRoles = ['Student', 'Professor', 'CCS Staff', 'Program Chair'];

function Window({ path, children }: { path: string; children: ReactNode }) {
  return <div className="window">
    <div className="window__bar"><span>{path}</span></div>
    <div className="window__body">{children}</div>
  </div>;
}

function PortalPreview() {
  const [role, setRole] = useState('Student');
  return <div className="pv">
    <SegmentedControl aria-label="Preview a role dashboard" selectedKey={role} onSelectionChange={key => setRole(String(key))}>{Object.keys(roleTiles).map(name => <Segment key={name} id={name}>{name}</Segment>)}</SegmentedControl>
    <ul className="pv-tiles">{roleTiles[role].map(tile => <li key={tile.title}><Tile icon={tile.icon} tone={tile.tone} /><div><strong>{tile.title}</strong><span>{tile.note}</span></div></li>)}</ul>
  </div>;
}
function ForumsPreview() {
  const href = `${sites.forums}/feed`;
  return <div className="pv pv--stack">
    <ForumCard topic="Thesis" title="Looking for a thesis adviser for the IS track" excerpt="Which faculty are taking advisees this term?" author="Paolo Dizon" replies={6} status="Open discussion" href={href} actionLabel="Open thread" />
    <ForumCard topic="BSCS" title="Study group for Algorithms midterm" excerpt="Library 2F, Thursday after class." author="Ana Villanueva" replies={11} status="Open discussion" href={href} actionLabel="Open thread" />
  </div>;
}
function SchedulePreview() {
  return <div className="pv"><Timetable label="Consultation week" days={days} events={events} startHour={8} endHour={13} now={10.4} /></div>;
}
function CasesPreview() {
  return <div className="pv pv--split">
    <ReportRecord reference="CCS-2026-0142" title="General concern" status="Under review" statusTone="info" facts={[{ label: 'Updated', value: '21 Oct' }, { label: 'Assigned', value: 'Program Chair' }]} href={signInUrl} actionLabel="Open record" />
    <CaseTimeline label="Case milestones" events={[
      { title: 'Report received', actor: 'System', date: '19 Oct 09:12', state: 'done' },
      { title: 'Routed to Program Chair', actor: 'Adviser conflict rule', date: '19 Oct 09:13', state: 'done' },
      { title: 'Under review', actor: 'Assigned reviewer', date: '21 Oct 14:40', state: 'current' },
      { title: 'Reply to student', state: 'pending' },
    ]} />
  </div>;
}
function EvaluationsPreview() {
  const [scores, setScores] = useState<Record<string, string>>({ [criteria[0]]: '4' });
  const done = Object.keys(scores).length;
  return <div className="pv">
    <p className="pv-count">{done} of {criteria.length} answered</p>
    {criteria.map(item => <div className="pv-rate" key={item}><span>{item}</span>
      <SegmentedControl aria-label={`${item}, 1 to 5`} selectedKey={scores[item]} onSelectionChange={key => setScores({ ...scores, [item]: String(key) })}>{['1', '2', '3', '4', '5'].map(n => <Segment key={n} id={n}>{n}</Segment>)}</SegmentedControl>
    </div>)}
  </div>;
}
// The DS Row types its children as ReactNode, but react-aria needs the render function to build cells per column.
const cells = <T,>(render: (column: T) => ReactNode) => render as unknown as ReactNode;
const withColumns = (columns: unknown): object => ({ columns });
const recordCols = [{ id: 'ref', name: 'Reference' }, { id: 'program', name: 'Program' }, { id: 'status', name: 'Standing' }, { id: 'updated', name: 'Updated' }];
function RecordsPreview() {
  return <div className="pv"><Table aria-label="Standing records"><TableHeader {...withColumns(recordCols)}>{(col: typeof recordCols[number]) => <Column isRowHeader={col.id === 'ref'}>{col.name}</Column>}</TableHeader>
    <TableBody items={standing}>{row => <TableRow id={row.ref} {...withColumns(recordCols)}>{cells((col: typeof recordCols[number]) => col.id === 'ref' ? <Cell reference>{row.ref}</Cell> : col.id === 'program' ? <Cell>{row.program}</Cell> : col.id === 'status' ? <Cell><Badge tone={row.tone} form="solid">{row.status}</Badge></Cell> : <Cell>{row.updated}</Cell>)}</TableRow>}</TableBody></Table></div>;
}
const adminCols = [{ id: 'role', name: 'Role' }, { id: 'access', name: 'Workspace access' }];
function AdminPreview() {
  const [on, setOn] = useState<Record<string, boolean>>({ Student: true, Professor: true, 'CCS Staff': true, 'Program Chair': false });
  return <div className="pv"><Table aria-label="Role configuration"><TableHeader {...withColumns(adminCols)}>{(col: typeof adminCols[number]) => <Column isRowHeader={col.id === 'role'}>{col.name}</Column>}</TableHeader>
    <TableBody items={adminRoles.map(role => ({ role }))}>{row => <TableRow id={row.role} {...withColumns(adminCols)}>{cells((col: typeof adminCols[number]) => col.id === 'role' ? <Cell>{row.role}</Cell> : <Cell><Switch isSelected={on[row.role]} onChange={value => setOn({ ...on, [row.role]: value })} showState>{`${row.role} access`}</Switch></Cell>)}</TableRow>}</TableBody></Table></div>;
}

const previews: Record<ModuleSite, { path: string; node: ReactNode }> = {
  portal: { path: 'ACCS Home / dashboard', node: <PortalPreview /> },
  forums: { path: 'Forums / feed', node: <ForumsPreview /> },
  schedule: { path: 'Schedule / consultations', node: <SchedulePreview /> },
  cases: { path: 'Cases / reports', node: <CasesPreview /> },
  evaluations: { path: 'Evaluations / form', node: <EvaluationsPreview /> },
  records: { path: 'Records / standing', node: <RecordsPreview /> },
  admin: { path: 'Admin / roles', node: <AdminPreview /> },
};

export function SubdomainEcosystemSection() {
  return <section id="sites" className="band band--sheet" aria-labelledby="sites-title">
    <div className="wrap">
      <div className="band__head"><h2 id="sites-title">Seven sites on one college account</h2><p>Each site runs part of the 58 ACCS modules. Choose a tab to try a working preview, then open the site.</p></div>
      <Tabs defaultSelectedKey="portal" className="eco">
        <TabList aria-label="ACCS sites" className="eco__tabs">{appSites.map(site => <Tab key={site.key} id={site.key} icon={site.icon}>{site.name}</Tab>)}</TabList>
        {appSites.map(site => <TabPanel key={site.key} id={site.key} shouldForceMount className="eco__panel">
          <div className="eco__info">
            <h3>{site.name}{site.access && <Badge tone={site.key === 'admin' ? 'warning' : 'info'} form={site.key === 'admin' || site.key === 'records' ? 'restricted' : 'solid'}>{site.access}</Badge>}</h3>
            <p>{site.blurb}</p>
            <p className="eco__count" data-site-modules={site.key} data-value={site.moduleCount}><strong><CountUp value={site.moduleCount} /></strong> {site.moduleCount === 1 ? 'module' : 'modules'}</p>
            <a className="text-link" href={site.href}>{site.access ? `Sign in to open ${site.name}` : `Open ${site.name}`}<Icon name="arrow-up-right" size={16} /></a>
            <ul className="eco__modules" aria-label={`${site.name} modules`}>{modules.filter(module => module.site === site.key).map(module => <li key={module.id}><article data-module={module.id} data-site={module.site}>
              <a href={module.href}>{module.name}</a><small>{module.role}</small>
            </article></li>)}</ul>
          </div>
          <Window path={previews[site.key].path}>{previews[site.key].node}</Window>
        </TabPanel>)}
      </Tabs>
    </div>
  </section>;
}
