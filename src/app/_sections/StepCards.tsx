'use client';
import { useState } from 'react';

const steps = [
  { title: 'You ask or report', body: 'Every request follows the same path, from the first message to the closed record' },
  { title: 'ACCS routes it', body: 'The system directs your request to the appropriate role. For example, a report involving an adviser automatically skips them and goes straight to the Program Chair.' },
  { title: 'A person replies', body: 'Professors confirm consultation slots and authorized reviewers handle reports. You can track every update and milestone in a single transparent thread.' },
  { title: 'You get a notice', body: 'Receive instant alerts for important status changes. Each notice clearly identifies the event type while protecting sensitive personal details.' },
  { title: 'ACCS keeps the record', body: 'All historical milestones remain securely logged on the case timeline, visible only to the specific personnel authorized to view them.' },
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
        <span className="deck__step">Step {step + 1}:</span>
        <span className="deck__title">{current.title}</span>
        <span className="deck__body">{current.body}</span>
      </span>
    </button>
    <p className="sr-only" aria-live="polite">{`Step ${step + 1}: ${current.title}. ${current.body}`}</p>
  </div>;
}
