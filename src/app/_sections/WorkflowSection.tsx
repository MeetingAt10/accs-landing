import { Tile, type IconName } from '@meetingat10/design-system/react';

const flow: { icon: IconName; title: string; body: string }[] = [
  { icon: 'pencil', title: 'Ask or report', body: 'Request a consultation in Schedule or raise a concern in Cases. Both start from your signed-in account.' },
  { icon: 'arrows-down-up', title: 'Routed by rule', body: 'ACCS sends it to the right role. Conflicts, such as a concern about an adviser, skip to the Program Chair.' },
  { icon: 'chat', title: 'A person responds', body: 'Professors confirm slots. Reviewers reply to reports. You see replies and milestones in one thread.' },
  { icon: 'bell', title: 'You are told what changed', body: 'Notifications name the kind of event and never include confidential details.' },
  { icon: 'archive', title: 'The record is kept', body: 'Milestones stay on the case timeline for the people authorized to see them.' },
];

export function WorkflowSection() {
  return <section id="workflow" className="band band--sheet" aria-labelledby="workflow-title">
    <div className="wrap flowwrap">
      <div className="flowwrap__sticky"><h2 id="workflow-title">How a request moves</h2><p>From the first message to the closed record, the same path every time.</p></div>
      <ol className="flow">{flow.map(item => <li key={item.title}><Tile icon={item.icon} size="lg" tone="neutral" /><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
    </div>
  </section>;
}
