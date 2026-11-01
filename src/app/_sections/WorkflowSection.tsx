import { Tile, type IconName } from '@meetingat10/design-system/react';

const flow: { icon: IconName; title: string; body: string }[] = [
  { icon: 'pencil', title: 'You ask or report', body: 'Request a consultation in Schedule or file a concern in Cases. Both start from your signed-in account.' },
  { icon: 'arrows-down-up', title: 'ACCS routes it', body: 'The request goes to the right role. A concern about your adviser skips them and goes to the Program Chair.' },
  { icon: 'chat', title: 'A person replies', body: 'Professors confirm slots and reviewers answer reports. You read every reply and milestone in one thread.' },
  { icon: 'bell', title: 'You get a notice', body: 'Each notice names the kind of event and leaves out confidential details.' },
  { icon: 'archive', title: 'ACCS keeps the record', body: 'Milestones stay on the case timeline for the people allowed to see them.' },
];

export function WorkflowSection() {
  return <section id="workflow" className="band band--sheet" aria-labelledby="workflow-title">
    <div className="wrap flowwrap">
      <div className="flowwrap__sticky"><h2 id="workflow-title">How a request moves</h2><p>Every request follows the same path, from the first message to the closed record.</p></div>
      <ol className="flow">{flow.map(item => <li key={item.title}><Tile icon={item.icon} size="lg" tone="neutral" /><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
    </div>
  </section>;
}
