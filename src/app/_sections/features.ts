/** One icon part: a file in public/landing/icons and its inset inside the icon box (top right bottom left, %). */
export type IconPart = { file: string; inset: string };
export type FeatureIcon = { parts: IconPart[] };
export type Feature = { title: string; summary: string; items: { title: string; body: string; icon: FeatureIcon }[] };

const single = (file: string, inset: string): FeatureIcon => ({ parts: [{ file, inset }] });

/**
 * The four features: a row label with a one-line summary, and detail rows shown when the row opens.
 * Every line describes what ACCS does today. Routing is rule-based; there is no AI anywhere in ACCS.
 */
export const features: Feature[] = [
  {
    title: 'Raise a concern',
    summary: 'Report a problem in confidence and follow it office by office.',
    items: [
      { title: 'Adviser concerns go to the Program Chair', body: 'If your concern involves your adviser, you say so when you file it, and ACCS sends it to the Program Chair instead.', icon: single('progress', '10.35% 2.6% 11.46% 2.08%') },
      { title: 'You see every stage', body: 'Each office decides the next step, and every stage your report passes through is visible to you.', icon: single('time-refresh', '8.31% 8.33%') },
      { title: 'Anonymous to handlers, still accountable', body: 'An anonymous report stays linked to your verified account. Handlers see an alias until you choose to share your name.', icon: { parts: [{ file: 'lock-inner', inset: '31.25% 31.25% 18.75% 31.25%' }, { file: 'lock-outer', inset: '0 12.5%' }] } },
    ],
  },
  {
    title: 'Book a consultation',
    summary: 'Pick a time your professor has actually opened.',
    items: [
      { title: 'Real availability', body: 'You book from the hours your professors have set as available.', icon: single('calendar-time', '8.33% 6.25% 8.33% 12.5%') },
      { title: 'Professors confirm or decline', body: 'Your professor answers each request, so you know whether the slot is yours.', icon: { parts: [{ file: 'calendar-days-top', inset: '14.42% 12.52% 63.71% 12.54%' }, { file: 'calendar-days-frame', inset: '6.17% 11.31% 9.51% 11.31%' }, { file: 'calendar-days-mark', inset: '49.89% 26.38% 25.89% 26.43%' }] } },
    ],
  },
  {
    title: 'Follow your spaces',
    summary: 'Section, program, subject and organization spaces, with announcements.',
    items: [
      { title: 'Spaces for where you belong', body: 'Your section, program, subjects and student organizations each have a space.', icon: single('discussions', '9.38% 7.29% 13.54% 7.29%') },
      { title: 'Announcements from the college', body: 'The Dean, Program Chairs, professors and student organizations post announcements to their spaces.', icon: single('announcement', '12.51% 8.33% 11.37% 8.29%') },
      { title: 'Filters flag, people moderate', body: 'Word filters flag posts for a human moderator, who decides what happens next.', icon: single('fraud-safe', '8.33% 15.63%') },
    ],
  },
  {
    title: 'Evaluate your professors',
    summary: 'Your evaluations count toward clearance.',
    items: [
      { title: 'Students evaluate professors', body: 'You evaluate your own professors.', icon: single('review', '12.5% 12.5% 21.04% 12.5%') },
      { title: 'Part of your clearance', body: 'Completing your evaluations counts toward your clearance.', icon: single('exam', '12.5%') },
    ],
  },
];
