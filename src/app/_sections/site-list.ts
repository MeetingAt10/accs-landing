import type { IconName } from '@meetingat10/design-system/react';
import { isOpenSite, modules, moduleSites, signInUrl, type ModuleSite } from '../../data/modules';
import { sites } from '../../lib/sites';

export const signIn = signInUrl;

const icons: Record<ModuleSite, IconName> = { portal: 'house', forums: 'chats', schedule: 'calendar-dots', cases: 'flag', evaluations: 'list-checks', records: 'archive', admin: 'gear' };
const access: Partial<Record<ModuleSite, string>> = { cases: 'Sign-in required', evaluations: 'Sign-in required', records: 'Staff sign-in required', admin: 'Admin role' };
const blurbs: Record<ModuleSite, string> = {
  portal: 'Sign in once and land on the dashboard for your role, with links to the workspaces you can use.',
  forums: 'College discussions, organization spaces, direct messages and the people directory.',
  schedule: 'Professor availability, consultation requests and the academic calendar.',
  cases: 'File a concern and follow each reply and milestone.',
  evaluations: 'Answer faculty evaluations. Authorized staff run them and read the summaries.',
  records: 'Standing, offense and restriction records, plus analytics, for authorized roles.',
  admin: 'Role configuration, moderation and system monitoring.',
};

/** The seven app workspaces, in navigation order, with DOC003-derived module counts. */
export const appSites = (Object.keys(moduleSites) as ModuleSite[]).map(key => ({
  key, name: moduleSites[key].name, icon: icons[key], blurb: blurbs[key],
  access: access[key],
  href: key === 'portal' ? signInUrl : isOpenSite(key) ? `${sites.portal}${moduleSites[key].path}` : signInUrl,
  moduleCount: modules.filter(module => module.site === key).length,
}));
