import { ArrowRight, LockKey } from '@phosphor-icons/react/dist/ssr';
import { signInUrl, workspaces, type WorkspaceKey } from '../../data/workspaces';
import { Pictogram } from '../_components/pictogram';

const board: [WorkspaceKey, string][] = [['forums', 'Ask your program'], ['schedule', 'Book a professor'], ['cases', 'Send a concern in private'], ['evaluations', 'Answer your faculty evaluations']];
/** The seven lines run in from the page edge and pass behind the board. Offsets keep the bundle parallel through the 45 degree turn. */
const ribbon = workspaces.map((site, index) => {
  const offset = (index - 3) * 11;
  return { key: site.key, d: `M520 ${150 + offset}H${420 + .414 * offset}L${300 + offset} ${270 + .414 * offset}V2000` };
});

export function Hero() {
  return <section className="hero">
    <div className="hero__lines" aria-hidden="true">
      <svg className="hero__ribbon" viewBox="0 0 520 640">
        <path className="hero__casing" d="M520 150H420L300 270V2000" />
        {ribbon.map(line => <path key={line.key} data-site={line.key} d={line.d} pathLength={1} />)}
      </svg>
    </div>
    <div className="wrap hero__grid">
      <h1 className="hero__title">Your access to the College of Computer Studies.</h1>
      <div className="hero__lead">
        <p>Join program forums, book professors and send concerns to the right office in private. The CCS secretary provides student accounts.</p>
        <a className="btn btn--signal btn--lg" href={signInUrl}>Sign in<ArrowRight size={22} weight="bold" aria-hidden="true" /></a>
      </div>
      <ul className="board">
        {board.map(([key, doing], index) => {
          const site = workspaces.find(item => item.key === key)!;
          return <li key={key} style={{ '--i': index } as React.CSSProperties}>
            <a href={site.href}>
              <Pictogram site={key} size={30} />
              <span className="board__flip"><strong>{site.name}</strong></span>
              <span className="board__flip board__doing"><span>{doing}</span></span>
              {site.access
                ? <span className="board__lock"><LockKey size={22} weight="fill" aria-hidden="true" />Sign in</span>
                : <ArrowRight className="board__go" size={26} weight="bold" aria-hidden="true" />}
            </a>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
