/** One icon part: a file in public/landing/icons and its inset inside the icon box (top right bottom left, %). */
export type IconPart = { file: string; inset: string };
export type FeatureIcon = { size: number; parts: IconPart[] };
export type Feature = { title: string; items: { title: string; body: string; icon: FeatureIcon }[] };

const single = (file: string, inset: string, size = 63): FeatureIcon => ({ size, parts: [{ file, inset }] });

/** The four Feature Hover components: the button label and, in their pressed variant, three detail rows. */
export const features: Feature[] = [
  {
    title: 'Secure Grievance & Smart Routing',
    items: [
      { title: 'Automated Adviser Conflict Detection', body: 'Algorithmic text scanning identifies potential adviser involvement and instantly flags it for rerouting.', icon: single('scan', '12.5% 8.33%', 69) },
      { title: 'Context-Aware Escalation', body: 'Automatically moves reports through predefined stages based on status and time-based deadlines.', icon: single('progress', '10.35% 2.6% 11.46% 2.08%') },
      { title: 'Progressive Anonymity', body: 'Encrypts identity data, allowing students to report securely and disclose identity only when necessary.', icon: { size: 55, parts: [{ file: 'lock-inner', inset: '31.25% 31.25% 18.75% 31.25%' }, { file: 'lock-outer', inset: '0 12.5%' }] } },
    ],
  },
  {
    title: 'Synchronized Faculty Consultations',
    items: [
      { title: 'Live Professor Availability', body: 'View when your professors are free in real-time without endless back-and-forth messaging.', icon: single('calendar-time', '8.33% 6.25% 8.33% 12.5%') },
      { title: 'Instant Calendar Updates', body: 'Booking requests automatically sync with faculty and student calendars to prevent double-booking.', icon: { size: 63, parts: [{ file: 'calendar-days-top', inset: '14.42% 12.52% 63.71% 12.54%' }, { file: 'calendar-days-frame', inset: '6.17% 11.31% 9.51% 11.31%' }, { file: 'calendar-days-mark', inset: '49.89% 26.38% 25.89% 26.43%' }] } },
      { title: 'Status Monitoring', body: 'Easily track whether your consultation request is pending, approved, or completed.', icon: single('time-refresh', '8.31% 8.33%') },
    ],
  },
  {
    title: 'Moderated Academic Community Hub',
    items: [
      { title: 'Program-Specific Discussions', body: 'Join dedicated conversation spaces tailored specifically for your section and program (IT, CS, or IS).', icon: single('discussions', '9.38% 7.29% 13.54% 7.29%') },
      { title: 'Official Announcements', body: 'Never miss important updates pinned directly to the top of your feed from college leaders and student organizations', icon: single('announcement', '12.51% 8.33% 11.37% 8.29%') },
      { title: 'Safe & Clean Discussions', body: 'Automated word filters help keep community boards respectful, friendly, and free of harmful content.', icon: single('fraud-safe', '8.33% 15.63%') },
    ],
  },
  {
    title: 'Better Academic Standards',
    items: [
      { title: 'Complete Class Feedback', body: 'Simple, organized semester evaluations ensuring every student has a voice in shaping course quality.', icon: single('exam', '12.5%') },
      { title: 'Multi-Directional Reviews', body: 'Supports feedback loops between students, faculty, and college administrators to improve teaching standards.', icon: single('review', '12.5% 12.5% 21.04% 12.5%') },
      { title: 'Data-Driven Improvements', body: 'Helps college chairs and the Dean spot issues early and resolve student concerns faster.', icon: { size: 63, parts: [{ file: 'analytics', inset: '8.33% 16.67%' }, { file: 'analytics-corner', inset: '12.5% 20.83% 70.83% 62.5%' }] } },
    ],
  },
];
