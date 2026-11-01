import { AnnouncementCard } from '@meetingat10/design-system/react';

const items = [
  { tag: 'Consultations', lane: 'consult' as const, when: 'This month', title: 'Thesis consultation weeks', body: 'Professors open extra office-hour slots for thesis advising.', meta: 'CCS faculty' },
  { tag: 'Community', lane: 'community' as const, when: 'Before finals', title: 'Study circles in the library', body: 'Student organizations host open study sessions by program.', meta: 'CCS Student Organization' },
  { tag: 'Announcement', lane: 'schedule' as const, when: 'Next term', title: 'Enrollment and advising reminders', body: 'Check your standing and book an advising slot before enrollment opens.', meta: 'CCS Staff' },
];

export function EventsSection() {
  return <section id="events" className="band" aria-labelledby="events-title">
    <div className="wrap eventswrap">
      <h2 id="events-title">What is coming up</h2>
      <ol className="timeline">{items.map(item => <li key={item.title}><AnnouncementCard tag={item.tag} lane={item.lane} when={item.when} title={item.title} meta={item.meta}>{item.body}</AnnouncementCard></li>)}</ol>
    </div>
  </section>;
}
