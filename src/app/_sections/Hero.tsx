import { Asset } from '../_components/asset';
import { Wordmark } from '../_components/logo';
import { Lion } from '../_components/mascot';
import { signIn } from './site-list';

/** Role pills from the frame: label, fill and pill width in px. */
const roles = [
  { label: 'Student', color: '#D6334B', width: 107.635 }, { label: 'Dean', color: '#9A2FC4', width: 107.635 }, { label: 'Adviser', color: '#C77A0A', width: 107.635 },
  { label: 'OSAS', color: '#1E9E5A', width: 107.635 }, { label: 'Guidance', color: '#E43E3E', width: 107.635 }, { label: 'Faculty', color: '#F827AB', width: 107.635 },
  { label: 'Professors', color: '#FBC100', width: 139 }, { label: 'CCS Organization', color: '#2F3BD6', width: 180 },
];

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__bg" aria-hidden="true">
      <span className="hero__glow" />
      <span className="hero__glow" />
      <span className="hero__photo" />
    </div>
    <div className="hero__copy">
      <Wordmark className="wordmark--hero" />
      <h1 id="hero-title" className="hero__title">Your access to the <br />College of Computer Studies.</h1>
      <p className="hero__lead">Your direct connection to academic programs and resources. <br />Explore forums, schedule consultations, and securely route concerns</p>
      <a className="btn btn--navy btn--access" href={signIn}>Access Now!<Asset name="arrow-up-right.svg" width={26.689} /></a>
    </div>
    <div className="hero__mascot">
      <Lion />
      <Asset name="shadow-lion.svg" width={218.621} height={54.833} className="hero__shadow" />
    </div>
    <ul className="roles" aria-label="Who uses ACCS">
      {roles.map(role => <li key={role.label} style={{ '--role': role.color, '--w': `${role.width}px` } as React.CSSProperties}>{role.label}</li>)}
    </ul>
  </section>;
}
