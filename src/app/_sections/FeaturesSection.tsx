import { Asset } from '../_components/asset';
import { Cub } from '../_components/mascot';
import { FeatureList } from './FeatureList';

export function FeaturesSection() {
  return <section id="features" className="features" aria-labelledby="features-title">
    <div className="features__head">
      <h2 id="features-title">Unified Access, <br />Empowered Community!</h2>
      <p>Streamlining how students connect, communicate concerns securely, and collaborate with faculty to enhance institutional success</p>
    </div>
    <div className="features__body">
      <FeatureList />
      <div className="features__mascot">
        <Cub />
        <Asset name="shadow-cub.svg" width={307} height={77} className="features__shadow" />
      </div>
    </div>
  </section>;
}
