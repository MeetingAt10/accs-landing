'use client';
import { useState } from 'react';

const steps = [
  { title: 'You ask or report', body: 'Book a consultation or file a concern from your account.' },
  { title: 'ACCS routes it', body: 'Fixed rules send it to the right person. A concern you mark as involving your adviser goes to the Program Chair.' },
  { title: 'A person replies', body: 'Professors confirm or decline consultations. For a report, each office decides the next step.' },
  { title: 'You get a notice', body: 'ACCS notifies you when your request changes.' },
  { title: 'ACCS keeps the record', body: 'Every stage stays on the timeline, so you can see where your request has been.' },
];

/** The Card Effect component: a stack of cards; pressing it deals the next step, wrapping after step 5. */
export function StepCards() {
  const [step, setStep] = useState(0);
  const current = steps[step];
  return <div className="deck">
    <button type="button" className="deck__button" data-step={step} onClick={() => setStep((step + 1) % steps.length)}
      aria-label={`Step ${step + 1} of ${steps.length}: ${current.title}. Show step ${(step + 1) % steps.length + 1}.`}>
      <span className="deck__card deck__card--left" aria-hidden="true" />
      <span className="deck__card deck__card--right" aria-hidden="true" />
      <span className="deck__card deck__card--front" aria-hidden="true" />
      <span key={step} className="deck__text" aria-hidden="true">
        <span className="deck__step">Step {step + 1} of {steps.length}</span>
        <span className="deck__title">{current.title}</span>
        <span className="deck__body">{current.body}</span>
      </span>
    </button>
    <p className="sr-only" aria-live="polite">{`Step ${step + 1} of ${steps.length}: ${current.title}. ${current.body}`}</p>
  </div>;
}
