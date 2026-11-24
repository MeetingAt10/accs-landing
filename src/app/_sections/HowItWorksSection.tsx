import { StepCards } from './StepCards';

export function HowItWorksSection() {
  return <section id="how-it-works" className="how" aria-labelledby="how-title">
    <span className="how__mark" aria-hidden="true" />
    <div className="how__copy">
      <h2 id="how-title">How a request moves</h2>
      <p>Every request follows the same path, from the first message to the closed record</p>
    </div>
    <StepCards />
  </section>;
}
