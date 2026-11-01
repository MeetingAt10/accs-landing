import { CtaBanner } from './_sections/CtaBanner';
import { EventsSection } from './_sections/EventsSection';
import { FeaturesSection } from './_sections/FeaturesSection';
import { ForumPreviewSection } from './_sections/ForumPreviewSection';
import { GuidanceSection } from './_sections/GuidanceSection';
import { Hero } from './_sections/Hero';
import { ProgramsSection } from './_sections/ProgramsSection';
import { QuickAccessBar } from './_sections/QuickAccessBar';
import { SubdomainEcosystemSection } from './_sections/SubdomainEcosystemSection';
import { WorkflowSection } from './_sections/WorkflowSection';

/** Navbar and Footer live in layout.tsx so /modules shares them. */
export default function Home() {
  return <main id="main" tabIndex={-1}>
    <Hero /><QuickAccessBar /><SubdomainEcosystemSection /><FeaturesSection /><GuidanceSection />
    <WorkflowSection /><ProgramsSection /><ForumPreviewSection /><EventsSection /><CtaBanner />
  </main>;
}
