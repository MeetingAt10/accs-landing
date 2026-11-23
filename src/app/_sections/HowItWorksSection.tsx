import { Asset } from '../_components/asset';
import { SectionHead } from '../_components/section-head';

const steps = [
  { title: 'Submit', body: 'Describe the concern, add files, and choose who can see it.' },
  { title: 'Get routed', body: 'ACCS sends it to the right office automatically.' },
  { title: 'Handler reviews', body: 'The office reads it, adds notes, or books a meeting with you.' },
  { title: 'Escalate if needed', body: 'Unresolved concerns move up — chair, dean, or guidance.' },
  { title: 'Resolved', body: 'You get the outcome and can rate how it was handled.' },
];

export function HowItWorksSection() {
  return <section id="how-it-works" className="how" aria-labelledby="how-title">
    <span className="how__ring how__ring--lg" aria-hidden="true" />
    <span className="how__ring how__ring--sm" aria-hidden="true" />
    <div className="lp-wrap">
      <SectionHead id="how-title" eyebrow="How it works" title="How a request moves" lead="From the moment you file to the final outcome, you always know where it stands." />
      <ol className="steps">{steps.map((step, index) => {
        const last = index === steps.length - 1;
        return <li key={step.title} className="step">
          <div className="step__track">
            <span className={last ? 'step__dot step__dot--done' : 'step__dot'}>{last ? <Asset name="how-check" width={22} /> : index + 1}</span>
            {!last && <span className="step__line" aria-hidden="true" />}
          </div>
          <div className="step__text"><h3>{step.title}</h3><p>{step.body}</p></div>
        </li>;
      })}</ol>
    </div>
  </section>;
}
