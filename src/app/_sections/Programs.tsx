const programs = [
  ['BSIT', 'Bachelor of Science in Information Technology', 'Networks, systems and the software that connects them.'],
  ['BSCS', 'Bachelor of Science in Computer Science', 'Algorithms, data structures and the theory behind computing.'],
  ['BSIS', 'Bachelor of Science in Information Systems', 'Information systems built for how organizations run.'],
];

export function Programs() {
  return <section id="programs" className="programs" aria-labelledby="programs-title">
    <div className="wrap">
      <h2 id="programs-title">Three programs in one college</h2>
      <ul>{programs.map(([code, name, line]) => <li key={code}>
        <span className="programs__code">{code}</span>
        <div><h3>{name}</h3><p>{line}</p></div>
      </li>)}</ul>
    </div>
  </section>;
}
