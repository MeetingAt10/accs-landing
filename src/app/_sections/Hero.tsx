import { Asset } from '../_components/asset';
import { signIn, signInTo } from './site-list';

const offices = [
  { name: 'Adviser', icon: 'office-users' }, { name: 'Program Chair', icon: 'office-cases' }, { name: 'Dean', icon: 'office-shield' },
  { name: 'Guidance', icon: 'office-heart' }, { name: 'OSAS', icon: 'office-forums' }, { name: 'Registrar', icon: 'office-evaluations' },
];
// Light beams in the sky: offset from the page centre, width and peak opacity from the Figma frame.
const beams = [[-420, 2, .25], [-200, 1, .18], [190, 2, .22], [410, 1, .16], [0, 3, .12]] as const;

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__sky" aria-hidden="true">
      {beams.map(([x, width, alpha]) => <span key={x} className="hero__beam" style={{ '--x': `${x}px`, width, '--a': alpha } as React.CSSProperties} />)}
      <span className="hero__stars" />
    </div>
    <div className="hero__tag hero__tag--left" aria-hidden="true"><span>Prof. Reyes · Adviser</span><Asset name="cursor" width={16} /></div>
    <div className="hero__tag hero__tag--right" aria-hidden="true"><Asset name="cursor" width={16} /><span>Student A-41</span></div>
    <div className="hero__copy">
      {/* The horizon rides on the copy block so its curve meets the sign-in button at every width. */}
      <span className="hero__glow" aria-hidden="true" />
      <span className="hero__horizon" aria-hidden="true" />
      <a className="hero__news hero-in" href={signInTo('/evaluations')}><span className="hero__new">NEW</span>Faculty evaluations are open for 1st semester <span aria-hidden="true">&nbsp;→</span></a>
      <h1 id="hero-title" className="hero__title hero-in" style={{ '--i': 1 } as React.CSSProperties}>Your access to the <em>College of Computer Studies</em></h1>
      <p className="hero__lead hero-in" style={{ '--i': 2 } as React.CSSProperties}>One workspace for private concern reporting, faculty appointments, class spaces, and every update from adviser to dean.</p>
      <a className="hero__cta hero-in" href={signIn} style={{ '--i': 3 } as React.CSSProperties}>Sign in to ACCS<Asset name="cta-arrow" width={18} /></a>
    </div>
    <div className="offices">
      <h2 className="offices__label">Connected offices</h2>
      <ul className="offices__row">{offices.map(office => <li key={office.name}><Asset name={office.icon} width={24} />{office.name}</li>)}</ul>
    </div>
  </section>;
}
