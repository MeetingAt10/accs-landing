import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { signInUrl } from '../../data/workspaces';

export function FinalSign() {
  return <section className="final" aria-labelledby="final-title">
    <a className="wrap final__link" href={signInUrl}>
      <span>
        <h2 id="final-title">Sign in to your college workspace</h2>
        <span className="final__note">The CCS secretary provides student accounts.</span>
      </span>
      <ArrowRight className="final__arrow" weight="bold" aria-hidden="true" />
    </a>
  </section>;
}
