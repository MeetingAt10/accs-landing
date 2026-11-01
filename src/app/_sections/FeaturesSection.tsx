import { Avatar, AvatarGroup, Badge, Icon, Meter, RoleBadge, Tile } from '@meetingat10/design-system/react';

export function FeaturesSection() {
  return <section id="features" className="band" aria-labelledby="features-title">
    <div className="wrap">
      <div className="band__head"><h2 id="features-title">Built around how a college actually works</h2><p>Six shared functions from the DOC003 inventory, available across the ACCS sites.</p></div>
      <div className="bento">
        <article className="cell cell--role">
          <h3>A dashboard for your role</h3>
          <p>Students, professors, chairs, deans and offices each land on what they need first.</p>
          <div className="cell__chips">{['Student', 'Professor', 'Program Chair', 'Dean', 'Guidance', 'OSAS'].map(role => <RoleBadge key={role}>{role}</RoleBadge>)}</div>
        </article>
        <article className="cell cell--live">
          <h3>Consultations with a visible queue</h3>
          <div className="cell__live">
            <div className="cell__prof"><Avatar name="Liza Manalastas" lane="consult" size={48} /><div><strong>Prof. Liza Manalastas</strong><span>Office hours, CCS 304</span></div></div>
            <Meter label="Slots taken" value={62} valueLabel="5 of 8" />
            <div className="cell__row"><Badge tone="consult" form="solid">Wed 09:00 open</Badge><Badge tone="consult" form="pending">Wed 10:00 requested</Badge></div>
          </div>
        </article>
        <article className="cell cell--report">
          <Icon name="lock" size={32} weight="duotone" />
          <h3>Reports stay restricted</h3>
          <p>Access follows the role and the case, not the site you signed in to.</p>
          <Badge tone="warning" form="restricted">Restricted lane</Badge>
        </article>
        <article className="cell cell--notice">
          <h3>Notices that name the event, never the detail.</h3>
        </article>
        <article className="cell cell--assist">
          <h3>An assistant for navigation</h3>
          <div className="cell__qa">
            <div className="cell__q"><Avatar name="Ana Villanueva" size={32} /><span>Where do I book office hours?</span></div>
            <div className="cell__a"><Tile icon="question" tone="consult" size="sm" /><span>Open Schedule and pick a slot with your professor. I can take you there.</span></div>
            <Badge tone="neutral" marker={false}>Suggests. People decide.</Badge>
          </div>
        </article>
        <article className="cell cell--people">
          <h3>Find people, spaces and organizations</h3>
          <AvatarGroup names={['Paolo Dizon', 'Ana Villanueva', 'Miguel Santos', 'Bea Reyes', 'Carlo Mendoza', 'Trisha Lim', 'Jun Aquino', 'Ria Cruz']} max={5} size={48} />
        </article>
      </div>
    </div>
  </section>;
}
