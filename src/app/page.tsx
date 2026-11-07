import { Events } from './_sections/Events';
import { Features } from './_sections/Features';
import { FinalSign } from './_sections/FinalSign';
import { Forum } from './_sections/Forum';
import { Guidance } from './_sections/Guidance';
import { Hero } from './_sections/Hero';
import { Programs } from './_sections/Programs';
import { RouteMap } from './_sections/RouteMap';
import { Workflow } from './_sections/Workflow';

export default function Home() {
  return <main id="main" tabIndex={-1}>
    <Hero /><RouteMap /><Features /><Guidance /><Workflow /><Programs /><Forum /><Events /><FinalSign />
  </main>;
}
