import { CtaBanner } from './_sections/CtaBanner';
import { FeaturesSection } from './_sections/FeaturesSection';
import { Hero } from './_sections/Hero';
import { HowItWorksSection } from './_sections/HowItWorksSection';
import { OfficesSection } from './_sections/OfficesSection';

/** Landing page from the Figma frame "Landing Page". Navbar and Footer live in layout.tsx so /modules shares them. */
export default function Home() {
  return <main id="main" tabIndex={-1} className="home">
    <Hero /><FeaturesSection /><OfficesSection /><HowItWorksSection /><CtaBanner />
  </main>;
}
