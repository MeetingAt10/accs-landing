/** Build-time origins; site navigation does not grant access to a module. */
export const sites = {
  landing: process.env.NEXT_PUBLIC_LANDING_URL ?? 'https://access-ccs.com',
  portal: process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.access-ccs.com',
  forums: process.env.NEXT_PUBLIC_FORUMS_URL ?? 'https://forums.access-ccs.com',
  schedule: process.env.NEXT_PUBLIC_SCHEDULE_URL ?? 'https://schedule.access-ccs.com',
  cases: process.env.NEXT_PUBLIC_CASES_URL ?? 'https://cases.access-ccs.com',
  evaluations: process.env.NEXT_PUBLIC_EVALUATIONS_URL ?? 'https://evaluations.access-ccs.com',
  records: process.env.NEXT_PUBLIC_RECORDS_URL ?? 'https://records.access-ccs.com',
  admin: process.env.NEXT_PUBLIC_ADMIN_URL ?? 'https://admin.access-ccs.com',
  design: process.env.NEXT_PUBLIC_DESIGN_URL ?? 'https://design.access-ccs.com',
  meeting: process.env.NEXT_PUBLIC_MEETING_URL ?? 'https://team.access-ccs.com',
} as const;
