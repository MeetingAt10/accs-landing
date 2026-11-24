import { Asset } from '../_components/asset';
import { signIn } from './site-list';

// Light beams in the sky: offset from the page centre, width and peak opacity from the Figma frame.
const beams = [[-420, 2, .25], [-200, 1, .18], [190, 2, .22], [410, 1, .16], [0, 3, .12]] as const;

// Example messages for the hero: where they start, relative to the report under the sign-in button.
const messages = [
  { from: 'Concern', text: 'My grade in IT 301 looks wrong', x: -560, y: -10 },
  { from: 'Consultation', text: 'Is Prof. Reyes free on Thursday?', x: 470, y: -40 },
  { from: 'Concern', text: 'Our group chat is getting hostile', x: -380, y: 130 },
  { from: 'Announcement', text: 'Lab moved to Room 304', x: 400, y: 120 },
  { from: 'Concern', text: 'I need to talk to Guidance', x: -150, y: 190 },
  { from: 'Organization', text: 'Assembly this Thursday, 3 PM', x: 200, y: 200 },
];

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__sky" aria-hidden="true">
      {beams.map(([x, width, alpha]) => <span key={x} className="hero__beam" style={{ '--x': `${x}px`, width, '--a': alpha } as React.CSSProperties} />)}
      <span className="hero__stars" />
    </div>
    <div className="hero__copy">
      {/* The name tags and horizon ride on the copy block so they stay beside the sign-in button at every height. */}
      <div className="hero__tag hero__tag--left" aria-hidden="true"><span>Prof. Reyes · Adviser</span><Asset name="cursor" width={16} /></div>
      <div className="hero__tag hero__tag--right" aria-hidden="true"><Asset name="cursor" width={16} /><span>Student A-41</span></div>
      <span className="hero__glow" aria-hidden="true" />
      <span className="hero__horizon" aria-hidden="true" />
      <h1 id="hero-title" className="hero__title hero-in" style={{ '--i': 1 } as React.CSSProperties}>Your access to the <em>College of Computer Studies</em></h1>
      <p className="hero__lead hero-in" style={{ '--i': 2 } as React.CSSProperties}>One workspace for private concern reporting, faculty appointments, class spaces, and every update from adviser to dean.</p>
      <a className="hero__cta hero-in" href={signIn} style={{ '--i': 3 } as React.CSSProperties}>Sign in to ACCS<Asset name="cta-arrow" width={18} /></a>
      {/* Where the travelling report idles at the top of the page (see Courier). */}
      <span className="dock dock--hero" data-dock="start" aria-hidden="true">
        {/* Messages from around the college drift in and pull together into the one report in the dock. */}
        <span className="swarm">{messages.map((m, i) => <span key={m.text} className="swarm__msg" style={{ '--sx': `${m.x}px`, '--sy': `${m.y}px`, '--i': i } as React.CSSProperties}><b>{m.from}</b>{m.text}</span>)}</span>
      </span>
    </div>
  </section>;
}
