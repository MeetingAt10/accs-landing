/** The five offices in the order a report reaches them. Notes appear only where the rule is known. */
const tiers: { name: string; note?: string }[] = [
  { name: 'Adviser', note: 'Skipped when the concern involves your adviser.' },
  { name: 'Program Chair', note: 'Takes concerns that involve your adviser.' },
  { name: 'Dean' },
  { name: 'Guidance' },
  { name: 'OSAS', note: 'The last office.' },
];

/** "Who handles your concerns?": the five offices as a descending staircase. */
export function OfficesSection() {
  return <section id="offices" className="offices lp-section" aria-labelledby="offices-title">
    <div className="wrap">
      <div className="lp-head">
        <h2 id="offices-title">Who handles your concerns?</h2>
        <p>A report moves through these offices in order. Each office decides the next step, and you can see every stage.</p>
      </div>
      <ol className="stairs">
        {tiers.map((tier, index) => <li key={tier.name} style={{ '--i': index } as React.CSSProperties}>
          <span className="stairs__num" aria-hidden="true">{index + 1}</span>
          <h3>{tier.name}</h3>
          {tier.note && <p>{tier.note}</p>}
        </li>)}
      </ol>
      <p className="offices__note">Community access never implies report access.</p>
    </div>
  </section>;
}
