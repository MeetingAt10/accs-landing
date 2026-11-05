import inventory from './doc003.json';
import { sites } from '../lib/sites';

/** Derived presentation groups; DOC003 names, roles and descriptions stay verbatim. */
export const moduleSites = {
  portal: { name: 'ACCS Home', path: '/home', group: 'Shared and oversight', ids: 'ALL-01 ALL-04 ALL-05 STU-11 STU-12 STF-01 CHR-01 DEAN-01' },
  forums: { name: 'Forums', path: '/feed', group: 'Community and communication', ids: 'ALL-02 ALL-03 STU-01 STU-02 STU-03 ORG-01 ORG-02 PRO-01 PRO-02 PRO-03 CHR-06 DEAN-06 GUD-05 OSAS-04' },
  schedule: { name: 'Schedule', path: '/consultations', group: 'Consultations and calendar', ids: 'STU-04 STU-05 PRO-04 PRO-05' },
  cases: { name: 'Cases', path: '/reports', group: 'Reports and cases', ids: 'STU-06 STU-07 STU-08 STU-09 PRO-06 CHR-02 CHR-07 DEAN-02 GUD-01 GUD-02 OSAS-01 PRES-01 PRES-02' },
  evaluations: { name: 'Evaluations', path: '/evaluations', group: 'Evaluation', ids: 'STU-10 PRO-07 PRO-08 CHR-04 DEAN-03 DEAN-04' },
  records: { name: 'Records', path: '/records', group: 'Standing and records', ids: 'CHR-03 CHR-05 DEAN-05 GUD-03 GUD-04 OSAS-02 OSAS-03 ADM-03' },
  admin: { name: 'Admin', path: '/admin', group: 'Administration', ids: 'ADM-01 ADM-02 ADM-04 ADM-05 ADM-06' },
} as const;

export type ModuleSite = keyof typeof moduleSites;
/** Only these sites are linked directly from public pages; every other site is reached through sign-in. */
const openSites: readonly ModuleSite[] = ['portal', 'forums', 'schedule'];
export const isOpenSite = (site: ModuleSite) => openSites.includes(site);
export const signInUrl = `${sites.portal}/sign-in`;
export const roles: readonly string[] = inventory.roles;
export const programs = ['BSIT', 'BSCS', 'BSIS'] as const;
export const modules = inventory.modules.map(module => {
  const site = (Object.keys(moduleSites) as ModuleSite[]).find(key => moduleSites[key].ids.split(' ').includes(module.id));
  if (!site) throw new Error(`Module has no owning site: ${module.id}`);
  return { ...module, purpose: module.description, group: moduleSites[site].group, site, href: isOpenSite(site) ? `${sites.portal}${moduleSites[site].path}` : signInUrl };
});
export type Module = typeof modules[number];
export const roleId = (role: string) => `role-${roles.indexOf(role)}`;
