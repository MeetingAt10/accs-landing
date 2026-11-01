import { AvatarGroup, ForumCard, Icon } from '@meetingat10/design-system/react';
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
    <div className="wrap forumgrid">
      <div className="forumgrid__intro">
        <h2 id="forum-title">Ask the community</h2>
        <p>Program discussions, class threads and organization spaces, all in one feed that is only for the CCS community.</p>
        <AvatarGroup names={['Paolo Dizon', 'Ana Villanueva', 'Miguel Santos', 'Bea Reyes', 'Carlo Mendoza']} max={4} lane="community" size={48} />
        <a className="text-link" href={href}>Visit the forum<Icon name="arrow-up-right" size={16} /></a>
      </div>
      <div className="forumgrid__threads">{threads.map(thread => <ForumCard key={thread.title} {...thread} status="Open discussion" href={href} actionLabel="Open thread" />)}</div>
    </div>
  </section>;
}
