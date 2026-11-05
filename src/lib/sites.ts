/** Build-time origins. Every signed-in module is a path on the portal; a link does not grant access to a module. */
export const sites = {
  landing: process.env.NEXT_PUBLIC_LANDING_URL ?? 'https://access-ccs.com',
  portal: process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.access-ccs.com',
  design: process.env.NEXT_PUBLIC_DESIGN_URL ?? 'https://design.access-ccs.com',
  meeting: process.env.NEXT_PUBLIC_MEETING_URL ?? 'https://team.access-ccs.com',
} as const;
