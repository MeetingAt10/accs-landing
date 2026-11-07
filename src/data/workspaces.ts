import { sites } from '../lib/sites';

export const signInUrl = `${sites.portal}/sign-in`;

export type WorkspaceKey = 'portal' | 'forums' | 'schedule' | 'cases' | 'evaluations' | 'records' | 'admin';
type Workspace = { key: WorkspaceKey; name: string; href: string; blurb: string; access?: string };

/** The seven workspaces in navigation order. Forums and Schedule link to their path; the rest go through sign-in. A link never grants access. */
export const workspaces: Workspace[] = [
  { key: 'portal', name: 'ACCS Home', href: signInUrl, blurb: 'Sign in once and land on your dashboard, with links to the workspaces you can use.' },
  { key: 'forums', name: 'Forums', href: `${sites.portal}/feed`, blurb: 'College discussions, organization spaces, direct messages and the people directory.' },
  { key: 'schedule', name: 'Schedule', href: `${sites.portal}/consultations`, blurb: 'Professor availability, consultation requests and the academic calendar.' },
  { key: 'cases', name: 'Cases', href: signInUrl, access: 'Sign-in required', blurb: 'File a concern and follow each reply and milestone.' },
  { key: 'evaluations', name: 'Evaluations', href: signInUrl, access: 'Sign-in required', blurb: 'Answer faculty evaluations. Authorized staff run them and read the summaries.' },
  { key: 'records', name: 'Records', href: signInUrl, access: 'Staff sign-in required', blurb: 'Standing, offense and restriction records, plus analytics, for authorized staff.' },
  { key: 'admin', name: 'Admin', href: signInUrl, access: 'Admin sign-in required', blurb: 'Moderation and system monitoring.' },
];
