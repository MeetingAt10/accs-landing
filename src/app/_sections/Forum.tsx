import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { sites } from '../../lib/sites';

const href = `${sites.portal}/feed`;
const threads = [
  { topic: 'Thesis', title: 'Looking for a thesis adviser for the IS track', excerpt: 'Which faculty are taking advisees this term?', author: 'Paolo Dizon', replies: 6 },
  { topic: 'BSCS', title: 'Study group for the Algorithms midterm', excerpt: 'Library 2F, Thursday after class. Bring practice sets.', author: 'Ana Villanueva', replies: 11 },
  { topic: 'BSIT', title: 'Which lab machines have the networking tools installed?', excerpt: 'Planning a practice session before the lab exam.', author: 'Miguel Santos', replies: 4 },
  { topic: 'Organizations', title: 'Org recruitment week: share your booth schedule', excerpt: 'Post your table times so members can plan.', author: 'Bea Reyes', replies: 9 },
];

export function Forum() {
  return <section id="forum" className="forum" aria-labelledby="forum-title">
    <div className="wrap forum__grid">
      <div className="forum__head">
        <h2 id="forum-title">Ask the community</h2>
        <p>Program discussions, class threads and organization spaces share one feed for the CCS community.</p>
        <a className="btn btn--line" data-site="forums" href={href}>Open the forum<ArrowRight size={20} weight="bold" aria-hidden="true" /></a>
      </div>
      <ul className="threads">{threads.map(thread => <li key={thread.title}>
        <a href={href}>
          <span className="tag">{thread.topic}</span>
          <strong>{thread.title}</strong>
          <span className="threads__excerpt">{thread.excerpt}</span>
          <small>{thread.author}, {thread.replies} replies</small>
        </a>
      </li>)}</ul>
    </div>
  </section>;
}
