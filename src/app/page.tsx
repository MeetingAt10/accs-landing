import { Badge, DoorPlate, Hero } from "@meetingat10/design-system/react";
import { SampleWeek } from "./sample-week";

export default function Home() {
  return (
    <main>
      <Hero
        plate={<DoorPlate size="lg" />}
        title="Your Access to the College of Computer Studies."
        lead="Student support, an academic forum and confidential concern reporting, in one place."
        actions={<Badge tone="info" form="pending">Coming soon</Badge>}
        note="The week shown is a sample. ACCS is not live yet."
        art={<SampleWeek />}
      />
    </main>
  );
}
