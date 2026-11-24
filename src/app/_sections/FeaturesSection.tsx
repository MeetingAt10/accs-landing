import { SectionHead } from '../_components/section-head';
import { Spotlight } from '../_components/spotlight';

/**
 * The four things a student does in ACCS. Each tile pairs short copy with a small looping scene of the
 * feature at work. Every line describes what ACCS does today: routing is rule-based, with no AI.
 */
const tiles = [
  { id: 'concern', tone: 'adviser', title: 'Raise a concern', summary: 'Report a problem in confidence and follow it office by office.',
    facts: ['If it involves your adviser, it goes to the Program Chair instead.', 'Anonymous reports show handlers an alias until you choose to share your name.'] },
  { id: 'consult', tone: 'chair', title: 'Book a consultation', summary: 'Pick a time your professor has actually opened.',
    facts: ['Your professor confirms or declines each request.'] },
  { id: 'spaces', tone: 'guidance', title: 'Follow your spaces', summary: 'Your section, program, subjects and organizations, each with its own space.',
    facts: ['Word filters flag posts; a person decides what happens next.'] },
  { id: 'evaluate', tone: 'osas', title: 'Evaluate your professors', summary: 'Rate the professors who taught you this term.',
    facts: ['Completing your evaluations counts toward your clearance.'] },
] as const;

type TileId = (typeof tiles)[number]['id'];

function ConcernScene() {
  return <div className="scene scene--concern">
    <div className="scene__toggle"><span className="scene__switch" />Involves my adviser</div>
    <ol className="route-map">
      <li className="route-map__node route-map__node--you">You</li>
      <li className="route-map__node route-map__node--skip">Adviser</li>
      <li className="route-map__node route-map__node--to">Program Chair</li>
      <li className="route-map__node">Dean</li>
      <span className="route-map__token" />
    </ol>
    <ul className="stages">
      <li style={{ '--d': 0 } as React.CSSProperties}>Filed as Student A-41</li>
      <li style={{ '--d': 1 } as React.CSSProperties}>Received by the Program Chair</li>
      <li style={{ '--d': 2 } as React.CSSProperties}>Under review</li>
    </ul>
  </div>;
}

function ConsultScene() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const open = new Set([1, 3, 6, 8, 12, 13]);
  return <div className="scene scene--consult">
    <div className="slots">
      {days.map(day => <span key={day} className="slots__day">{day}</span>)}
      {Array.from({ length: 15 }, (_, i) => <span key={i} className={`slots__cell${open.has(i) ? ' slots__cell--open' : ''}${i === 8 ? ' slots__cell--pick' : ''}`} />)}
    </div>
    <div className="booking"><span className="booking__time">Thu · 10:00</span><span className="booking__status"><span>Requested</span><span>Confirmed</span></span></div>
  </div>;
}

function SpacesScene() {
  const posts = [
    { from: 'BSIT 3A', kind: 'Section', text: 'Lab moved to Room 304 this Friday.' },
    { from: 'Dean\'s Office', kind: 'Announcement', text: 'Enrollment for 2nd semester opens Monday.' },
    { from: 'BSCS 2B', kind: 'Section', text: 'Anyone have notes from the last lecture?', flag: true },
    { from: 'Student council', kind: 'Organization', text: 'General assembly this Thursday, 3 PM.' },
  ];
  const card = (post: (typeof posts)[number], key: string) => <li key={key} className="post">
    <span className="post__meta"><b>{post.from}</b>{post.kind}</span>
    <span className="post__text">{post.text}</span>
    {post.flag && <span className="post__flag"><span>Flagged by filter</span><span>Reviewed by moderator</span></span>}
  </li>;
  return <div className="scene scene--spaces"><ul className="feed">{posts.map((p, i) => card(p, `a${i}`))}{posts.map((p, i) => card(p, `b${i}`))}</ul></div>;
}

function EvaluateScene() {
  const rows = ['Clarity', 'Preparation', 'Feedback'];
  return <div className="scene scene--evaluate">
    <ul className="rate">{rows.map((row, r) => <li key={row}><span>{row}</span><span className="rate__dots">{[0, 1, 2, 3, 4].map(d => <i key={d} style={{ '--d': r * 5 + d } as React.CSSProperties} />)}</span></li>)}</ul>
    <div className="clearance"><span className="clearance__label">Clearance</span><span className="clearance__bar"><span /></span><span className="clearance__done">Done</span></div>
  </div>;
}

const scenes: Record<TileId, () => React.JSX.Element> = { concern: ConcernScene, consult: ConsultScene, spaces: SpacesScene, evaluate: EvaluateScene };

export function FeaturesSection() {
  return <section id="features" className="band band--tint" aria-labelledby="features-title">
    <div className="lp-wrap">
      <SectionHead id="features-title" eyebrow="Features" title="What you can do in ACCS" lead="Four things, one account. Each one goes to the office that should see it." />
      <Spotlight className="bento">{tiles.map((tile, i) => {
        const Scene = scenes[tile.id];
        return <article key={tile.id} className={`tile tile--${tile.id}`} data-tone={tile.tone} style={{ '--i': i } as React.CSSProperties}>
          <span className="dock dock--tile" data-dock={tile.id} aria-hidden="true" />
          <div className="tile__copy">
            <span className="tile__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3>{tile.title}</h3>
            <p>{tile.summary}</p>
          </div>
          <div className="tile__stage" aria-hidden="true"><Scene /></div>
          <ul className="tile__facts">{tile.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
        </article>;
      })}</Spotlight>
    </div>
  </section>;
}
