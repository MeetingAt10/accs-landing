import { Asset } from '../_components/asset';
import { SectionHead } from '../_components/section-head';

const offices = [
  { tone: 'adviser', icon: 'route-users', name: 'Adviser', role: 'Your first stop for academic and class concerns.' },
  { tone: 'chair', icon: 'route-cases', name: 'Program Chair', role: 'Program-level issues, grades, and anything that skips the adviser.' },
  { tone: 'dean', icon: 'route-shield', name: 'Dean', role: 'College-wide matters and escalations from chairs.' },
  { tone: 'guidance', icon: 'route-heart', name: 'Guidance', role: 'Wellbeing, peer conflict, and personal concerns.' },
  { tone: 'osas', icon: 'route-forums', name: 'OSAS', role: 'Student organizations, activities, and conduct.' },
];

export function RoutingSection() {
  return <section id="offices" className="band" aria-labelledby="offices-title">
    <div className="lp-wrap">
      <SectionHead id="offices-title" eyebrow="Routing" title="Who handles your concerns?" lead="Each office has a clear role. ACCS sends your report to the first one that can act on it." />
      <ol className="routes">{offices.map((office, index) => <li key={office.name} className="route card" data-tone={office.tone}>
        <div className="route__head"><span className="route__tile"><Asset name={office.icon} width={22} /></span><span className="route__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
        <h3>{office.name}</h3>
        <p>{office.role}</p>
        <span className="route__bar" aria-hidden="true" />
      </li>)}</ol>
      <p className="routes__note"><Asset name="note-lock" width={18} />Uncomfortable going to your adviser? You can send a report straight to the Program Chair.</p>
    </div>
  </section>;
}
