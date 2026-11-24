import { Asset } from '../_components/asset';
import { Lion } from '../_components/mascot';
import { signIn } from './site-list';

export function CtaBanner() {
  return <section className="cta" aria-labelledby="cta-title">
    <Lion className="cta__lion" />
    <div className="cta__card">
      <div className="cta__copy">
        <h2 id="cta-title">Access Your College Workspace Now!</h2>
        <p>Sign in with your official QCU account to connect with your section, faculty, and student support services.</p>
      </div>
      <a className="btn btn--orange btn--access" href={signIn}>Access Now!<Asset name="arrow-up-right.svg" width={26.689} /></a>
    </div>
  </section>;
}
