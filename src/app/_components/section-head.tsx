/** Centered section heading: an eyebrow pill, the title and one line of support copy. */
export function SectionHead({ id, eyebrow, title, lead }: { id: string; eyebrow: string; title: string; lead: string }) {
  return <header className="section-head">
    <span className="section-head__pill">{eyebrow}</span>
    <h2 id={id}>{title}</h2>
    <p>{lead}</p>
  </header>;
}
