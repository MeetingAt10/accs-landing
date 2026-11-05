import { Button } from '@meetingat10/design-system/react';
import { signIn } from './site-list';

export function CtaBanner() {
  return <section className="cta" aria-labelledby="cta-title">
    <div className="wrap cta__inner">
      <h2 id="cta-title">Sign in to your college workspace</h2>
      <div className="cta__actions"><Button href={signIn} variant="plate" size="lg" iconEnd="arrow-up-right">Sign in</Button></div>
    </div>
  </section>;
}
