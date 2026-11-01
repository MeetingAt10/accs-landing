import { Avatar, AvatarGroup, Badge, Icon, RoleBadge, Tile } from '@meetingat10/design-system/react';

export function FeaturesSection() {
  return <section id="features" className="band" aria-labelledby="features-title">
    <div className="wrap">
      <div className="band__head"><h2 id="features-title">Tools for how the college runs</h2><p>These six functions from the DOC003 inventory are shared across the ACCS sites.</p></div>
      <div className="feat">
        <article className="feat__role">
          <h3>A dashboard for your role</h3>
          <p>Students, professors, chairs, deans and offices each open to the tasks they use most.</p>
          <div className="feat__chips">{['Student', 'Professor', 'Program Chair', 'Dean', 'Guidance', 'OSAS'].map(role => <RoleBadge key={role}>{role}</RoleBadge>)}</div>
        </article>
        <article className="feat__queue">
          <h3>See the consultation queue</h3>
          <div className="feat__prof"><Avatar name="Liza Manalastas" lane="consult" size={48} /><div><strong>Prof. Liza Manalastas</strong><span>Office hours, CCS 304</span></div></div>
          <ul className="feat__slots">
            <li><span>Wed 09:00</span><Badge tone="consult" form="solid">Open</Badge></li>
            <li><span>Wed 10:00</span><Badge tone="consult" form="pending">Requested</Badge></li>
            <li><span>Wed 13:00</span><Badge tone="consult" form="taken">Taken</Badge></li>
          </ul>
        </article>
        <article className="feat__report">
          <Icon name="lock" size={32} weight="duotone" />
          <h3>Reports stay restricted</h3>
          <p>Access follows the role and the case, not the site you signed in to.</p>
          <Badge tone="warning" form="restricted">Restricted</Badge>
        </article>
        <article className="feat__notice">
          <h3>Notifications say what happened and never include case details.</h3>
        </article>
        <article className="feat__assist">
          <h3>An assistant for navigation</h3>
          <div className="feat__qa">
            <div className="feat__q"><Avatar name="Ana Villanueva" size={32} /><span>Where do I book office hours?</span></div>
            <div className="feat__a"><Tile icon="question" tone="consult" size="sm" /><span>Open Schedule and pick a slot with your professor. I can take you there.</span></div>
          </div>
          <p>It suggests. Staff decide.</p>
        </article>
        <article className="feat__people">
          <h3>Find people, spaces and organizations</h3>
          <p>Look up students, faculty and organizations in the Forums directory.</p>
          <AvatarGroup names={['Paolo Dizon', 'Ana Villanueva', 'Miguel Santos', 'Bea Reyes', 'Carlo Mendoza', 'Trisha Lim', 'Jun Aquino', 'Ria Cruz']} max={5} size={48} />
        </article>
      </div>
    </div>
  </section>;
}
