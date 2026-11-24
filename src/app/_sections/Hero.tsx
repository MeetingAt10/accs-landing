import { Asset } from '../_components/asset';
import { Wordmark } from '../_components/logo';
import { Lion } from '../_components/mascot';
import { signIn } from './site-list';

/** Who ACCS serves: the people and offices that sign in. One quiet list instead of colour-coded pills. */
const roles = ['Students', 'Professors', 'Advisers', 'Program Chairs', 'The Dean', 'Guidance', 'OSAS', 'CCS student organizations'];

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__art" aria-hidden="true">
      <span className="hero__photo" />
      <span className="hero__mascot"><Lion /></span>
    </div>
    <div className="hero__copy wrap">
      <Wordmark className="wordmark--hero" />
      <h1 id="hero-title" className="hero__title">Your access to the College of Computer Studies.</h1>
      <p className="hero__lead">Book consultations, follow your section and organization spaces, and raise concerns that reach the right office.</p>
      <a className="btn btn--light btn--lg" href={signIn}>Sign In<Asset name="arrow-up-right.svg" width={18} /></a>
    </div>
    <div className="hero__roles wrap">
      <p id="roles-title">Who uses ACCS</p>
      <ul className="roles" aria-labelledby="roles-title">
        {roles.map(role => <li key={role}>{role}</li>)}
      </ul>
    </div>
  </section>;
}
