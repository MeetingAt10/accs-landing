import { Archive, CalendarDots, Chats, Flag, Gear, House, ListChecks } from '@phosphor-icons/react/dist/ssr';
import type { WorkspaceKey } from '../../data/workspaces';

const icons = { portal: House, forums: Chats, schedule: CalendarDots, cases: Flag, evaluations: ListChecks, records: Archive, admin: Gear };

/** A workspace's sign: its line color and pictogram. */
export function Pictogram({ site, size = 28 }: { site: WorkspaceKey; size?: number }) {
  const Icon = icons[site];
  return <span className="pict" data-site={site}><Icon size={size} weight="fill" aria-hidden="true" /></span>;
}
