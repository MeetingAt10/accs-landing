import { Fragment } from 'react';
import { Avatar, Badge, Button, ForumCard } from '@meetingat10/design-system/react';
import { sites } from '../../lib/sites';
import { register, signIn } from './site-list';

export function Hero() {
  return <section className="hero">
    <div className="hero__ground" aria-hidden="true" />
    <div className="wrap hero__grid">
      <div className="hero__copy">
        <h1 className="hero__title">
          {'Your access to the College of Computer Studies.'.split(' ').map((word, index) => <Fragment key={index}>{index > 0 && ' '}<span className="hero__word" style={{ '--i': index } as React.CSSProperties}>{word}</span></Fragment>)}
        </h1>
        <p className="hero__lead hero-in" style={{ '--i': 9 } as React.CSSProperties}>Join your program forum and book professors with one QCU account. Concerns go to the right office in private.</p>
        <div className="hero__actions hero-in" style={{ '--i': 11 } as React.CSSProperties}>
          <Button href={signIn} size="lg" iconEnd="arrow-up-right">Sign in</Button>
          <Button href={register} size="lg" variant="secondary">Create account</Button>
        </div>
      </div>
      <div className="hero__visual hero-in hero-in--panel" style={{ '--i': 4 } as React.CSSProperties}>
        <div className="frame">
          <div className="frame__glass frame__glass--forum">
            <ForumCard topic="Thesis" title="Looking for a thesis adviser for the IS track" author="Paolo Dizon" replies={6} status="Open discussion" href={`${sites.forums}/feed`} actionLabel="Join the thread" />
          </div>
          <div className="frame__glass frame__glass--consult">
            <Avatar name="Liza Manalastas" lane="consult" size={36} />
            <div><strong>Prof. Liza Manalastas</strong><span>Consultation confirmed</span></div>
            <Badge tone="consult" form="solid">Wed 09:00</Badge>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
