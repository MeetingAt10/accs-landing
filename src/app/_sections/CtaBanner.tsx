import { Button } from '@meetingat10/design-system/react';
import { register, signIn } from './site-list';

export function CtaBanner() {
  return <section className="cta" aria-labelledby="cta-title">
    <div className="wrap cta__inner">
      <h2 id="cta-title">Your college workspace is one sign-in away</h2>
      <div className="cta__actions"><Button href={signIn} variant="plate" size="lg" iconEnd="arrow-up-right">Sign in</Button><Button href={register} variant="secondary" size="lg">Create account</Button></div>
    </div>
  </section>;
}
