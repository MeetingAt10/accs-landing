import { Asset } from '../_components/asset';
import { SectionHead } from '../_components/section-head';

const features = [
  { tone: 'adviser', icon: 'feat-shield', eyebrow: 'Private, protected reporting', title: 'Secure grievance & smart routing',
    body: 'File a concern privately — or anonymously to peers. ACCS sends it to the right office and shows you every step.',
    points: ['Adviser bypass when needed', 'Consent before sharing', 'Every view is logged'] },
  { tone: 'chair', icon: 'feat-calendar', eyebrow: 'Easy appointment booking', title: 'Synchronized faculty consultations',
    body: 'See when your professors are free and request a slot. They confirm in one tap, and it lands on both calendars.',
    points: ['Live faculty availability', 'Reminders before meetings', 'Link a meeting to a case'] },
  { tone: 'guidance', icon: 'feat-forums', eyebrow: 'Connect with your classmates', title: 'Moderated academic community hub',
    body: 'Section and subject spaces, organizations and a college feed, with moderation that keeps it respectful.',
    points: ['Spaces for every section', 'Anonymous, but accountable', 'Reports reviewed by staff'] },
  { tone: 'osas', icon: 'feat-evaluations', eyebrow: 'Transparent evaluations', title: 'Better academic standards',
    body: 'Complete faculty evaluations online. Chairs and the dean see clear results to improve teaching every term.',
    points: ['Short, focused forms', 'Results by subject and term', 'Anonymous to faculty'] },
];

export function FeaturesSection() {
  return <section id="features" className="band band--tint" aria-labelledby="features-title">
    <div className="lp-wrap">
      <SectionHead id="features-title" eyebrow="Features" title="Everything the CCS office does, online." lead="Four tools built around how students and faculty already work." />
      <div className="features">{features.map(feature => <article key={feature.title} className="feature card" data-tone={feature.tone}>
        <div className="feature__head">
          <span className="feature__tile"><Asset name={feature.icon} width={24} /></span>
          <div><p className="feature__eyebrow">{feature.eyebrow}</p><h3>{feature.title}</h3></div>
        </div>
        <p className="feature__body">{feature.body}</p>
        <ul className="feature__points">{feature.points.map(point => <li key={point}><span className="feature__check"><Asset name={`check-${feature.tone}`} width={12} /></span>{point}</li>)}</ul>
      </article>)}</div>
    </div>
  </section>;
}
