const tiers = ['Adviser', 'Program Chair', 'Dean', 'Guidance', 'OSAS'];

/** "Who handles your concerns?": the five offices as a descending staircase. */
export function OfficesSection() {
  return <section id="offices" className="offices" aria-labelledby="offices-title">
    <span className="offices__glow" aria-hidden="true" />
    <div className="offices__inner">
      <h2 id="offices-title">Who handles your concerns?</h2>
      <p className="offices__lead">File a report or book a consultation with complete confidence. Each tier defines the exact office responsible, ensuring absolute operational transparency.</p>
      <ol className="stairs">
        {tiers.map((tier, index) => <li key={tier} style={{ '--i': index } as React.CSSProperties}>
          <h3>{tier}</h3>
          <p>First point of access.</p>
        </li>)}
      </ol>
      <p className="offices__note">Community access never implies report access.</p>
    </div>
  </section>;
}
