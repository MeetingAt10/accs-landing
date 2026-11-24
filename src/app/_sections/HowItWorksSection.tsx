import { Asset } from '../_components/asset';
import { SectionHead } from '../_components/section-head';

/** The five stages of a concern. Routing is rule-based: the adviser, or the Program Chair when it involves the adviser. */
const steps = [
  { title: 'Submit', body: 'File a concern from your account, named or anonymous.', status: 'Filed' },
  { title: 'Get routed', body: 'It goes to your adviser, or to the Program Chair if it involves your adviser.', status: 'With your adviser' },
  { title: 'Handler reviews', body: 'The office reads it and decides the next step.', status: 'Under review' },
  { title: 'Escalate if needed', body: 'If the office passes it on, it moves to the next office in line.', status: 'Passed to the next office' },
  { title: 'Resolved', body: 'The office records the outcome, and you see it.', status: 'Outcome recorded' },
];

export function HowItWorksSection() {
  return <section id="how-it-works" className="how" aria-labelledby="how-title">
    <div className="lp-wrap">
      <SectionHead id="how-title" eyebrow="How it works" title="How a request moves" lead="Every stage is visible to you, from filing to the recorded outcome." />
      <div className="journey">
        <div className="journey__rail" aria-hidden="true"><span className="journey__fill" /><span className="journey__token" /></div>
        <ol className="journey__steps">{steps.map((step, index) => {
          const last = index === steps.length - 1;
          return <li key={step.title} className="journey__step">
            <span className="journey__dot" aria-hidden="true">{last ? <Asset name="how-check" width={20} /> : index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>;
        })}</ol>
        <div className="journey__card" aria-hidden="true">
          <span className="dock dock--card" data-dock="how"><span className="journey__card-id">Report A-41</span></span>
          <span className="journey__status">{steps.map(step => <span key={step.status}><i />{step.status}</span>)}</span>
        </div>
      </div>
    </div>
  </section>;
}
