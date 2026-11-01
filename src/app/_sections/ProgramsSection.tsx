const programs = [
  ['BSIT', 'Bachelor of Science in Information Technology', 'Networks, systems and the software that connects them.'],
  ['BSCS', 'Bachelor of Science in Computer Science', 'Algorithms, data structures and the theory behind computing.'],
  ['BSIS', 'Bachelor of Science in Information Systems', 'Information systems built for how organizations run.'],
];

export function ProgramsSection() {
  return <section id="programs" className="band" aria-labelledby="programs-title">
    <div className="wrap">
      <h2 id="programs-title" className="band__title">Three programs in one college</h2>
      <ul className="programs">{programs.map(([code, name, line]) => <li key={code}>
        <span className="programs__code">{code}</span>
        <div><h3>{name}</h3><p>{line}</p></div>
      </li>)}</ul>
    </div>
  </section>;
}
