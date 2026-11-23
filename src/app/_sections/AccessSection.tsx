import { Asset } from '../_components/asset';

const stats = [
  { icon: 'stat-shield', value: 'Private', label: 'Reports only assigned handlers can open' },
  { icon: 'stat-clock', value: '5 steps', label: 'From filing to a recorded outcome' },
  { icon: 'stat-users', value: '1 account', label: 'For classes, appointments and reports' },
];

export function AccessSection() {
  return <section className="access" aria-labelledby="access-title">
    <div className="lp-wrap access__inner">
      <div className="access__copy">
        <h2 id="access-title">One account for <em>every CCS office</em> and every student.</h2>
        <p>Students, faculty, chairs, the dean, guidance and OSAS work from the same verified workspace, so nothing gets lost between messages, papers and hallways.</p>
      </div>
      <ul className="access__stats">{stats.map(stat => <li key={stat.value}>
        <span className="access__icon"><Asset name={stat.icon} width={14} /></span>
        <strong>{stat.value}</strong>
        <span>{stat.label}</span>
      </li>)}</ul>
    </div>
  </section>;
}
