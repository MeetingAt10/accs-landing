import { Badge } from '@meetingat10/design-system/react';

const items = [
  { tag: 'Consultations', tone: 'consult' as const, when: 'This month', title: 'Thesis consultation weeks', body: 'Professors open extra office-hour slots for thesis advising.', meta: 'CCS faculty' },
  { tag: 'Community', tone: 'community' as const, when: 'Before finals', title: 'Study circles in the library', body: 'Student organizations host open study sessions by program.', meta: 'CCS Student Organization' },
  { tag: 'Announcement', tone: 'info' as const, when: 'Next term', title: 'Enrollment and advising reminders', body: 'Check your standing and book an advising slot before enrollment opens.', meta: 'CCS Staff' },
];

export function EventsSection() {
  return <section id="events" className="band" aria-labelledby="events-title">
    <div className="wrap">
      <h2 id="events-title" className="band__title">Coming up</h2>
      <div className="agenda">{items.map(item => <article key={item.title}>
        <p className="agenda__when">{item.when}</p>
        <Badge tone={item.tone} marker={false}>{item.tag}</Badge>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        <p className="agenda__meta">{item.meta}</p>
      </article>)}</div>
    </div>
  </section>;
}
