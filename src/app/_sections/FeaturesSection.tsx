import { Asset } from '../_components/asset';
import { Cub } from '../_components/mascot';
import { FeatureList } from './FeatureList';

export function FeaturesSection() {
  return <section id="features" className="features lp-section" aria-labelledby="features-title">
    <div className="wrap">
      <div className="lp-head">
        <h2 id="features-title">What you can do in ACCS</h2>
        <p>Four things you can do with one account. Open a topic to see what it covers.</p>
      </div>
      <div className="features__body">
        <FeatureList />
        <div className="features__mascot">
          <Cub />
          <Asset name="shadow-cub.svg" width={240} height={60} className="features__shadow" />
        </div>
      </div>
    </div>
  </section>;
}
