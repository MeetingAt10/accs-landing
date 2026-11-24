/**
 * Who handles a concern: the five offices in order, on one rail. A pulse runs down the rail and lights each office;
 * a dashed arc shows a concern that involves the adviser going straight to the Program Chair. Routing is rule-based.
 */
const offices = [
  { name: 'Adviser', role: 'Your first stop. Skipped when the concern involves your adviser.' },
  { name: 'Program Chair', role: 'Next in line, and first stop when the concern involves your adviser.' },
  { name: 'Dean', role: 'Takes the concern if it moves past the Program Chair.' },
  { name: 'Guidance', role: 'Takes the concern if it moves past the Dean.' },
  { name: 'OSAS', role: 'The last office.' },
];

export function RoutingSection() {
  return <section id="offices" className="band routing" aria-labelledby="offices-title">
    <div className="lp-wrap routing__inner">
      <div className="routing__copy">
        <span className="section-head__pill">Routing</span>
        <h2 id="offices-title">Who handles your concerns?</h2>
        <p>A report moves through these offices in order. Each office decides the next step, and you can see every stage.</p>
        <aside className="routing__note">
          <span className="routing__note-mark" aria-hidden="true" />
          <span><b>Uncomfortable going to your adviser?</b> Say so when you file, and the report goes straight to the Program Chair.</span>
        </aside>
      </div>
      <div className="ladder">
        <span className="dock dock--ladder" data-dock="routing" aria-hidden="true" />
        <svg className="ladder__bypass" viewBox="0 0 80 240" aria-hidden="true">
          <path d="M 66 52 C 4 80, 4 190, 50 208" />
        </svg>
        <span className="ladder__hop" aria-hidden="true" />
        <span className="ladder__rail" aria-hidden="true"><span className="ladder__pulse" /></span>
        <p className="ladder__start"><span aria-hidden="true" />You file a report</p>
        <ol className="ladder__list">{offices.map((office, i) => <li key={office.name} className="ladder__row" style={{ '--i': i } as React.CSSProperties}>
          <span className="ladder__node" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <span className="ladder__text"><h3>{office.name}</h3><span>{office.role}</span></span>
        </li>)}</ol>
      </div>
    </div>
  </section>;
}
