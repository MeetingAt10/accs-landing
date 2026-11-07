const path = [
  ['Adviser', 'First point of contact'], ['Program Chair', 'Reviews concerns about advisers'], ['Dean', 'Escalated college concerns'],
  ['Guidance', 'Counselling and student support'], ['OSAS', 'Student affairs and standing'], ["President's Office", 'Final escalation'],
];

export function Guidance() {
  return <section id="guidance" className="guide" aria-labelledby="guidance-title">
    <div className="wrap">
      <h2 id="guidance-title">Who handles your concern</h2>
      <p className="guide__lead">File a concern in Cases or book a counselling consultation in Schedule. Each step names the office responsible, so you can see where a report stands.</p>
      <label className="guide__toggle"><input type="checkbox" /><span>My concern is about my adviser</span></label>
      <div className="guide__route">
        <svg viewBox="0 0 700 64" preserveAspectRatio="none" aria-hidden="true">
          <path className="guide__track guide__skipped" d="M0 54H200" />
          <path className="guide__track" d="M200 54H600" />
          <path className="guide__bypass" d="M0 54L40 10H160L200 54" />
        </svg>
        <p className="guide__you">You</p>
        <ol aria-label="Concern escalation path">{path.map(([name, note]) => <li key={name}><strong>{name}</strong><span>{note}</span></li>)}</ol>
      </div>
      <p className="guide__note">A report about a student&apos;s adviser goes straight to the Program Chair.</p>
      <p className="guide__rule"><span>Community access never implies report access.</span></p>
    </div>
  </section>;
}
