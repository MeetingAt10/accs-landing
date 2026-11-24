import { Asset } from '../_components/asset';
import { signIn } from './site-list';

export function CtaBanner() {
  return <section className="cta lp-section" aria-labelledby="cta-title">
    <div className="wrap cta__inner">
      <div className="cta__card">
        <div className="cta__copy">
          <h2 id="cta-title">Sign in to ACCS</h2>
          <p>Accounts are issued by the CCS Secretary. Use the sign-in details you received from that office.</p>
        </div>
        <a className="btn btn--light btn--lg" href={signIn}>Sign In<Asset name="arrow-up-right.svg" width={18} /></a>
      </div>
    </div>
  </section>;
}
