'use client';
import { useState, type ReactNode } from 'react';
import { ArrowRight, Bell, CalendarCheck, Chats, Flag } from '@phosphor-icons/react/dist/ssr';
import { signInUrl, type WorkspaceKey } from '../../data/workspaces';
import { sites } from '../../lib/sites';

const feed = `${sites.portal}/feed`;

const tiles: { icon: ReactNode; title: string; note: string }[] = [
  { icon: <CalendarCheck weight="fill" />, title: 'Request a consultation', note: 'Pick an open slot with a professor' },
  { icon: <Chats weight="fill" />, title: 'Community feed', note: 'Discussions from your program' },
  { icon: <Flag weight="fill" />, title: 'My reports', note: 'Replies and milestones only you can see' },
  { icon: <Bell weight="fill" />, title: 'Notifications', note: 'Replies, changes and announcements' },
];

function HomePreview() {
  return <div>
    <h4 className="pv-title">Your dashboard</h4>
    <ul className="pv-tiles">{tiles.map(tile => <li key={tile.title}><span aria-hidden="true">{tile.icon}</span><div><strong>{tile.title}</strong><small>{tile.note}</small></div></li>)}</ul>
  </div>;
}

function ForumsPreview() {
  return <ul className="pv-threads">
    <li><span className="tag">Thesis</span><h4><a href={feed}>Looking for a thesis adviser for the IS track</a></h4><p>Which faculty are taking advisees this term?</p><small>Paolo Dizon, 6 replies</small></li>
    <li><span className="tag">BSCS</span><h4><a href={feed}>Study group for the Algorithms midterm</a></h4><p>Library 2F, Thursday after class.</p><small>Ana Villanueva, 11 replies</small></li>
  </ul>;
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hours = [8, 9, 10, 11, 12, 13, 14];
const events = [
  { day: 0, start: 9, end: 10.5, title: 'Data Structures', meta: 'CCS 201' },
  { day: 2, start: 9, end: 11, title: 'Office hours', meta: 'CCS 304', kind: 'consult' },
  { day: 2, start: 13, end: 14.5, title: 'Org meetup', meta: 'AVR', kind: 'community' },
  { day: 3, start: 8, end: 9.5, title: 'Algorithms', meta: 'CCS 105' },
  { day: 4, start: 8, end: 10, title: 'Thesis writing', meta: 'Lab 3' },
];

function SchedulePreview() {
  const [requested, setRequested] = useState(false);
  const row = (hour: number) => (hour - 8) * 2 + 2;
  return <div className="pv-week" role="group" aria-label="Consultation week">
    {days.map((day, index) => <div key={day} className="pv-week__day" data-today={day === 'Wed'} style={{ gridColumn: index + 2 }}>{day}</div>)}
    {hours.map(hour => <div key={hour} className="pv-week__hour" style={{ gridRow: `${row(hour)} / span 2` }}>{String(hour).padStart(2, '0')}:00</div>)}
    {events.map(event => <div key={event.title} className="pv-week__event" data-kind={event.kind} style={{ gridColumn: event.day + 2, gridRow: `${row(event.start)} / ${row(event.end)}` }}><strong>{event.title}</strong><small>{event.meta}</small></div>)}
    <button type="button" className="pv-week__event pv-week__open" aria-pressed={requested} onClick={() => setRequested(!requested)} style={{ gridColumn: 3, gridRow: `${row(10)} / ${row(11)}` }}>
      <strong>Advising</strong><small>{requested ? 'Requested' : 'Open slot'}</small>
    </button>
  </div>;
}

const milestones = [
  { title: 'Report received', who: 'System', when: '19 Oct 09:12', state: 'done' },
  { title: 'Routed to Program Chair', who: 'Adviser conflict rule', when: '19 Oct 09:13', state: 'done' },
  { title: 'Under review', who: 'Assigned reviewer', when: '21 Oct 14:40', state: 'current' },
  { title: 'Reply to student', state: 'pending' },
];

function CasesPreview() {
  return <div className="pv-case">
    <header><span className="mono">CCS-2026-0142</span><h4>General concern</h4><p>Under review by the Program Chair. Updated 21 Oct.</p><a href={signInUrl}>Open record<ArrowRight size={16} weight="bold" aria-hidden="true" /></a></header>
    <ol aria-label="Case milestones">{milestones.map(item => <li key={item.title} data-state={item.state}><strong>{item.title}</strong>{item.who && <small>{item.who}, {item.when}</small>}</li>)}</ol>
  </div>;
}

const criteria = ['Explains clearly', 'Responds to questions', 'Starts and ends on time'];

function EvaluationsPreview() {
  const [scores, setScores] = useState<Record<string, string>>({ [criteria[0]]: '4' });
  return <div className="pv-eval">
    <p role="status"><strong>{Object.keys(scores).length}</strong> of {criteria.length} answered</p>
    {criteria.map(item => <fieldset key={item}><legend>{item}</legend><div>
      {['1', '2', '3', '4', '5'].map(score => <label key={score}><input type="radio" name={item} checked={scores[item] === score} onChange={() => setScores({ ...scores, [item]: score })} /><span>{score}</span></label>)}
    </div></fieldset>)}
  </div>;
}

const standing = [
  { ref: 'CCS-2026-0142', program: 'BSIT', status: 'Good standing', updated: '21 Oct' },
  { ref: 'CCS-2026-0157', program: 'BSCS', status: 'Review pending', updated: '24 Oct' },
  { ref: 'CCS-2026-0163', program: 'BSIS', status: 'Good standing', updated: '27 Oct' },
];

function RecordsPreview() {
  return <table className="pv-table"><caption className="sr">Standing records</caption>
    <thead><tr><th scope="col">Reference</th><th scope="col">Program</th><th scope="col">Standing</th><th scope="col">Updated</th></tr></thead>
    <tbody>{standing.map(row => <tr key={row.ref}><th scope="row" className="mono">{row.ref}</th><td>{row.program}</td><td data-status={row.status === 'Good standing' ? 'ok' : 'pending'}>{row.status}</td><td>{row.updated}</td></tr>)}</tbody>
  </table>;
}

const switches = ['Forum posting', 'Comments', 'Anonymous reports', 'Navigation assistant'];

function AdminPreview() {
  const [off, setOff] = useState<Record<string, boolean>>({ 'Navigation assistant': true });
  return <ul className="pv-switches" aria-label="Feature switches">
    {switches.map(name => <li key={name}><label><span>{name}</span><input type="checkbox" role="switch" checked={!off[name]} onChange={event => setOff({ ...off, [name]: !event.target.checked })} /><small>{off[name] ? 'Off' : 'On'}</small></label></li>)}
  </ul>;
}

export const previews: Record<WorkspaceKey, ReactNode> = {
  portal: <HomePreview />, forums: <ForumsPreview />, schedule: <SchedulePreview />, cases: <CasesPreview />,
  evaluations: <EvaluationsPreview />, records: <RecordsPreview />, admin: <AdminPreview />,
};
