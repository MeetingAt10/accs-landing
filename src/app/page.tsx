import Image from "next/image";

// Paths from Figma components "ACCS 2026 / Icon / Forum | Calendar | Shield" (16px grid).
const icons = {
  calendar:
    "M5.33341 3.33333H2.66675V6.66667M5.33341 3.33333H10.6667M5.33341 3.33333V2M5.33341 3.33333V4.66667M10.6667 3.33333H13.3334V6.66667M10.6667 3.33333V2M10.6667 3.33333V4.66667M13.3334 6.66667V14H2.66675V6.66667M13.3334 6.66667H2.66675M5.33341 9.33333H6.66675M9.33342 9.33333H10.6667M5.33341 11.3333H6.66675",
  forum: "M4.66667 5.33329H11.3333M4.66667 7.99996H9.33333M2 2.66663H14V11.3333H6L2 14V2.66663Z",
  shield:
    "M5.33333 8L7.33333 10L10.6667 6M8 2L14 4.66667V8C14 11.3333 11.3333 13.3333 8 14.6667C4.66667 13.3333 2 11.3333 2 8V4.66667L8 2Z",
};

function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 16 16" width="24" height="24" fill="none" aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const features: { icon: string; tone: string; title: string; body: string }[] = [
  {
    icon: icons.calendar,
    tone: "bg-info-bg text-action",
    title: "Student support",
    body: "Book consultations with advisers and faculty, and follow up without chasing messages.",
  },
  {
    icon: icons.forum,
    tone: "bg-secondary-bg text-secondary-fg",
    title: "Academic forum",
    body: "Ask questions, share resources, and stay on top of department announcements.",
  },
  {
    icon: icons.shield,
    tone: "bg-accent-bg text-accent-fg",
    title: "Confidential concerns",
    body: "Report an incident privately and see each step as it moves to the right office.",
  },
];

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl items-center px-6 py-6">
        <Image src="/accs-logo.svg" alt="ACCS — Access for College of Computer Studies" width={473} height={116} priority className="h-10 w-auto" />
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold tracking-wide text-action uppercase">
          <span className="size-2 rounded-full bg-action" aria-hidden="true" />
          Coming soon
        </p>

        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight font-bold text-ink sm:text-5xl">
          Your Access to the College of Computer Studies
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
          ACCS brings student support, the academic forum, and confidential concern reporting into one trusted campus
          workspace. We&apos;re building it now.
        </p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <li key={f.title} className="rounded-card border border-line bg-surface p-6">
              <span className={`inline-flex size-11 items-center justify-center rounded-lg ${f.tone}`}>
                <Icon path={f.icon} />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{f.body}</p>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-6 text-sm text-ink-secondary sm:flex-row sm:justify-between">
          <p>© 2026 ACCS · Access for College of Computer Studies</p>
          <p>A capstone project by Meeting@10</p>
        </div>
      </footer>
    </>
  );
}
