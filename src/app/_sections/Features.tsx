'use client';
import { useState } from 'react';
import { LockKey, Question, UsersThree } from '@phosphor-icons/react/dist/ssr';
import { workspaces } from '../../data/workspaces';
import { Pictogram } from '../_components/pictogram';

const people = ['PD', 'AV', 'MS', 'BR', 'CM'];

export function Features() {
  const [requested, setRequested] = useState(false);
  return <section id="features" className="features" aria-labelledby="features-title">
    <div className="wrap">
      <h2 id="features-title">Tools for how the college runs</h2>
      <p className="features__lead">These six functions are shared across every ACCS workspace.</p>
      <div className="wall">
        <article className="wall__role">
          <h3>A dashboard that starts with your tasks</h3>
          <p>Sign in and see what needs you today, with links to the workspaces you can use.</p>
          <ul aria-hidden="true">{workspaces.map(site => <li key={site.key}><Pictogram site={site.key} size={24} /></li>)}</ul>
        </article>
        <article className="wall__queue">
          <h3>See the consultation queue</h3>
          <p><strong>Prof. Liza Manalastas</strong><br />Office hours, CCS 304</p>
          <ul>
            <li><span>Wed 09:00</span><button type="button" aria-pressed={requested} onClick={() => setRequested(!requested)}>{requested ? 'Requested' : 'Request'}</button></li>
            <li><span>Wed 10:00</span><em>Requested</em></li>
            <li data-taken="true"><span>Wed 13:00</span><em>Taken</em></li>
          </ul>
        </article>
        <article className="wall__report">
          <LockKey size={88} weight="fill" aria-hidden="true" />
          <h3>Reports stay restricted</h3>
          <p>Access follows the case, not the workspace you opened.</p>
        </article>
        <article className="wall__notice">
          <h3>Notifications say what happened and never include case details.</h3>
        </article>
        <article className="wall__assist">
          <h3><Question size={32} weight="fill" aria-hidden="true" />An assistant for navigation</h3>
          <div className="wall__qa">
            <p className="wall__q">Where do I book office hours?</p>
            <p className="wall__a">Open Schedule and pick a slot with your professor. I can take you there.</p>
          </div>
          <p>It suggests. Staff decide.</p>
        </article>
        <article className="wall__people">
          <h3><UsersThree size={32} weight="fill" aria-hidden="true" />Find people, spaces and organizations</h3>
          <p>Look up students, faculty and organizations in the Forums directory.</p>
          <ul aria-hidden="true">{people.map(initials => <li key={initials}>{initials}</li>)}<li>+3</li></ul>
        </article>
      </div>
    </div>
  </section>;
}
