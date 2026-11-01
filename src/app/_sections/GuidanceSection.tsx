const path = [
  ['Adviser', 'First point of contact'], ['Program Chair', 'Reviews concerns about advisers'], ['Dean', 'Escalated college concerns'],
  ['Guidance', 'Counselling and student support'], ['OSAS', 'Student affairs and standing'], ["President's Office", 'Final escalation'],
];

export function GuidanceSection() {
  return <section id="guidance" className="band band--navy" aria-labelledby="guidance-title">
    <div className="wrap">
      <div className="guide__copy">
        <h2 id="guidance-title">Who handles your concern</h2>
        <p>File a concern in Cases or book a counselling consultation in Schedule. Each step names the office responsible, so you can see where a report stands.</p>
        <p className="boundary"><span className="mark">Community access never implies report access.</span></p>
        <p className="note">A report about a student&apos;s adviser goes straight to the Program Chair.</p>
      </div>
      <ol className="path" aria-label="Concern escalation path">{path.map(([name, note]) => <li key={name}><strong>{name}</strong><span>{note}</span></li>)}</ol>
    </div>
  </section>;
}
