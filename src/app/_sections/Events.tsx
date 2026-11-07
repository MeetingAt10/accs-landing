const items = [
  { tag: 'Consultations', when: 'This month', title: 'Thesis consultation weeks', body: 'Professors open extra office-hour slots for thesis advising.', meta: 'CCS faculty' },
  { tag: 'Community', when: 'Before finals', title: 'Study circles in the library', body: 'Student organizations host open study sessions by program.', meta: 'CCS Student Organization' },
  { tag: 'Announcement', when: 'Next term', title: 'Enrollment and advising reminders', body: 'Check your standing and book an advising slot before enrollment opens.', meta: 'CCS Staff' },
];

export function Events() {
  return <section id="events" className="events" aria-labelledby="events-title">
    <div className="wrap">
      <div className="departures">
        <h2 id="events-title">Coming up</h2>
        <table>
          <thead><tr><th scope="col">When</th><th scope="col">What</th><th scope="col">From</th><th scope="col">Type</th></tr></thead>
          <tbody>{items.map(item => <tr key={item.title}>
            <th scope="row">{item.when}</th>
            <td><strong>{item.title}</strong><span>{item.body}</span></td>
            <td>{item.meta}</td>
            <td>{item.tag}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>
  </section>;
}
