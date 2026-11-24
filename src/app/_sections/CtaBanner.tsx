import { Asset } from '../_components/asset';
import { signIn } from './site-list';

export function CtaBanner() {
  return <section className="cta" aria-labelledby="cta-title">
    <div className="lp-wrap">
      <div className="cta__card">
        <span className="cta__ring cta__ring--lg" aria-hidden="true" />
        <span className="cta__ring cta__ring--sm" aria-hidden="true" />
        <div className="cta__copy">
          <h2 id="cta-title">Access your college workspace now.</h2>
          <p>Sign in with your QCU account. First time? Use the temporary password from the CCS office.</p>
        </div>
        {/* The last stop of the travelling report (see Courier); the static key card shows when it is off. */}
        <div className="cta__key" data-dock="cta" aria-hidden="true">
          <div className="key-card">
            <span className="key-card__sheen" />
            <span className="key-card__top"><Asset name="logo-mark" width={34} height={21.66} /><span className="key-card__chip" /></span>
            <span className="key-card__name">ACCS</span>
            <span className="key-card__meta">Student A-41</span>
          </div>
        </div>
        <a className="cta__button" href={signIn}>Sign in to ACCS<Asset name="cta-arrow" width={18} /></a>
      </div>
    </div>
  </section>;
}
