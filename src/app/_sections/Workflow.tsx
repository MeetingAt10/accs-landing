const flow = [
  { title: 'You ask or report', body: 'Request a consultation in Schedule or file a concern in Cases. Both start from your signed-in account.' },
  { title: 'ACCS routes it', body: 'The request goes to the right person. A concern about your adviser skips them and goes to the Program Chair.' },
  { title: 'A person replies', body: 'Professors confirm slots and reviewers answer reports. You read every reply and milestone in one thread.' },
  { title: 'You get a notice', body: 'Each notice names the kind of event and leaves out confidential details.' },
  { title: 'ACCS keeps the record', body: 'Milestones stay on the case timeline for the people allowed to see them.' },
];

export function Workflow() {
  return <section id="workflow" className="flow" aria-labelledby="workflow-title">
    <div className="wrap">
      <h2 id="workflow-title">How a request moves</h2>
      <p className="flow__lead">Every request follows the same path, from the first message to the closed record.</p>
      <div className="stair">
        <svg className="stair__line" viewBox="0 0 1000 384" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H104L200 96H304L400 192H504L600 288H704L800 384H1000" /></svg>
        <ol>{flow.map((step, index) => <li key={step.title} style={{ '--i': index } as React.CSSProperties}><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
      </div>
    </div>
  </section>;
}
