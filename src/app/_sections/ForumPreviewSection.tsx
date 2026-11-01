import { Avatar, AvatarGroup, Icon } from '@meetingat10/design-system/react';
import { sites } from '../../lib/sites';

const href = `${sites.forums}/feed`;
const threads = [
  { topic: 'Thesis', title: 'Looking for a thesis adviser for the IS track', excerpt: 'Which faculty are taking advisees this term?', author: 'Paolo Dizon', replies: 6 },
  { topic: 'BSCS', title: 'Study group for the Algorithms midterm', excerpt: 'Library 2F, Thursday after class. Bring practice sets.', author: 'Ana Villanueva', replies: 11 },
  { topic: 'BSIT', title: 'Which lab machines have the networking tools installed?', excerpt: 'Planning a practice session before the lab exam.', author: 'Miguel Santos', replies: 4 },
  { topic: 'Organizations', title: 'Org recruitment week: share your booth schedule', excerpt: 'Post your table times so members can plan.', author: 'Bea Reyes', replies: 9 },
];

export function ForumPreviewSection() {
  return <section id="forum" className="band band--sheet" aria-labelledby="forum-title">
    <div className="wrap">
      <div className="forum__head">
        <h2 id="forum-title">Ask the community</h2>
        <div className="forum__aside">
          <p>Program discussions, class threads and organization spaces share one feed for the CCS community.</p>
          <div className="forum__links"><AvatarGroup names={['Paolo Dizon', 'Ana Villanueva', 'Miguel Santos', 'Bea Reyes', 'Carlo Mendoza']} max={4} lane="community" size={36} /><a className="text-link" href={href}>Open the forum<Icon name="arrow-up-right" size={16} /></a></div>
        </div>
      </div>
      <ul className="threads">{threads.map(thread => <li key={thread.title}>
        <a href={href}>
          <span className="threads__topic">{thread.topic}</span>
          <span className="threads__main"><strong>{thread.title}</strong><span>{thread.excerpt}</span></span>
          <span className="threads__author"><Avatar name={thread.author} lane="community" size={24} />{thread.author}</span>
          <span className="threads__replies">{thread.replies} replies</span>
        </a>
      </li>)}</ul>
    </div>
  </section>;
}
