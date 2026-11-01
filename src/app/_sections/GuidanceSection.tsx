const path = [
  ['Adviser', 'First point of contact'], ['Program Chair', 'Reviews concerns about advisers'], ['Dean', 'Escalated college concerns'],
  ['Guidance', 'Counselling and student support'], ['OSAS', 'Student affairs and standing'], ['President’s Office', 'Final escalation'],
];

export function GuidanceSection() {
  return <section id="guidance" className="band band--navy" aria-labelledby="guidance-title">
    <div className="wrap split">
      <div className="split__copy">
        <h2 id="guidance-title">Guidance and concerns have a clear path</h2>
        <p>Raise a concern from Cases, or book a counselling consultation from Schedule. Each step names who is responsible, so you always know where a report stands.</p>
        <p className="boundary"><span className="mark">Community access never implies report access.</span></p>
        <p className="note">A report naming a student’s adviser goes straight to the Program Chair.</p>
      </div>
      <ol className="path" aria-label="Concern escalation path">{path.map(([name, note]) => <li key={name}><strong>{name}</strong><span>{note}</span></li>)}</ol>
    </div>
  </section>;
}
