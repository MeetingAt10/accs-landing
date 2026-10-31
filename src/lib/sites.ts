/** Build-time origins; site navigation does not grant access to a module. */
export const sites = {
  landing: process.env.NEXT_PUBLIC_LANDING_URL ?? 'https://d1o7nnm2soozyn.cloudfront.net',
  portal: process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://d1njh2nozcwz0u.cloudfront.net',
  forums: process.env.NEXT_PUBLIC_FORUMS_URL ?? 'https://dgkec2nkm3n3s.cloudfront.net',
  schedule: process.env.NEXT_PUBLIC_SCHEDULE_URL ?? 'https://d19h8rd7p5r1ek.cloudfront.net',
  cases: process.env.NEXT_PUBLIC_CASES_URL ?? 'https://d3aoaw841wc6e2.cloudfront.net',
  evaluations: process.env.NEXT_PUBLIC_EVALUATIONS_URL ?? 'https://d3nw1hv5xoevnq.cloudfront.net',
  records: process.env.NEXT_PUBLIC_RECORDS_URL ?? 'https://du3q9mhys1ofn.cloudfront.net',
  admin: process.env.NEXT_PUBLIC_ADMIN_URL ?? 'https://d3ru4j9n1z7rme.cloudfront.net',
  design: process.env.NEXT_PUBLIC_DESIGN_URL ?? 'https://dqd3zf55ijbpq.cloudfront.net',
  meeting: process.env.NEXT_PUBLIC_MEETING_URL ?? 'https://d34p7a45addcro.cloudfront.net',
} as const;
