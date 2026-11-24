import { Asset } from '../_components/asset';
import { Wordmark } from '../_components/logo';
import { signIn } from './site-list';

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__art" aria-hidden="true">
      <span className="hero__photo" />
    </div>
    <div className="hero__copy wrap">
      <Wordmark className="wordmark--hero" />
      <h1 id="hero-title" className="hero__title">Your access to the College of Computer Studies.</h1>
      <p className="hero__lead">Book consultations, follow your section and organization spaces, and raise concerns that reach the right office.</p>
      <a className="btn btn--light btn--lg" href={signIn}>Sign In<Asset name="arrow-up-right.svg" width={18} /></a>
    </div>
  </section>;
}
