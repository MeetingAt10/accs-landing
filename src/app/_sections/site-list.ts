import type { IconName } from '@meetingat10/design-system/react';
import { isOpenSite, modules, moduleSites, signInUrl, type ModuleSite } from '../../data/modules';
import { sites } from '../../lib/sites';

export const signIn = signInUrl;
export const register = `${sites.portal}/register`;

const icons: Record<ModuleSite, IconName> = { portal: 'house', forums: 'chats', schedule: 'calendar-dots', cases: 'flag', evaluations: 'list-checks', records: 'archive', admin: 'gear' };
const access: Partial<Record<ModuleSite, string>> = { cases: 'Sign-in required', evaluations: 'Sign-in required', records: 'Staff sign-in required', admin: 'Admin role' };
const blurbs: Record<ModuleSite, string> = {
  portal: 'Sign in once, see the dashboard for your role and find the workspaces open to you.',
  forums: 'College discussions, organization spaces, messages and the people directory.',
  schedule: 'Faculty availability, consultation requests and the academic calendar.',
  cases: 'Raise a concern, follow its replies and see each milestone as it happens.',
  evaluations: 'Faculty evaluation participation, administration and authorized summaries.',
  records: 'Standing, offense, restriction and analytics views for authorized roles.',
  admin: 'Role configuration, moderation and system monitoring.',
};

/** The seven app sites, in navigation order, with DOC003-derived module counts. */
export const appSites = (Object.keys(moduleSites) as ModuleSite[]).map(key => ({
  key, name: moduleSites[key].name, icon: icons[key], blurb: blurbs[key],
  access: access[key],
  href: key === 'portal' ? signInUrl : isOpenSite(key) ? `${sites[key]}${moduleSites[key].path}` : signInUrl,
  moduleCount: modules.filter(module => module.site === key).length,
}));
