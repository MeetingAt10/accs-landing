import { AccessSection } from './_sections/AccessSection';
import { CtaBanner } from './_sections/CtaBanner';
import { FeaturesSection } from './_sections/FeaturesSection';
import { Hero } from './_sections/Hero';
import { HowItWorksSection } from './_sections/HowItWorksSection';
import { RoutingSection } from './_sections/RoutingSection';

/** Navbar and Footer live in layout.tsx so /modules shares them. */
export default function Home() {
  return <main id="main" tabIndex={-1}>
    <Hero /><AccessSection /><FeaturesSection /><RoutingSection /><HowItWorksSection /><CtaBanner />
  </main>;
}
