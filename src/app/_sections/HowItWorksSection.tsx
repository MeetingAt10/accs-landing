import { StepCards } from './StepCards';

export function HowItWorksSection() {
  return <section id="how-it-works" className="how lp-section" aria-labelledby="how-title">
    <div className="wrap how__inner">
      <div className="how__copy">
        <h2 id="how-title">How a request moves</h2>
        <p>Consultations and concerns follow the same five steps. Press the card to see the next one.</p>
      </div>
      <StepCards />
    </div>
  </section>;
}
