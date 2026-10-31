import { Reveal } from '@meetingat10/design-system/react';
import { moduleSites, type Module } from '../../data/modules';

export function ModuleCard({ module, index = 0, full = false }: { module: Module; index?: number; full?: boolean }) {
  const words = module.purpose.split(/\s+/);
  const purpose = full || words.length <= 14 ? module.purpose : `${words.slice(0, 14).join(' ')}…`;
  return <Reveal as="article" index={index % 3} className="module-card" id={`module-${module.id}`} data-module={module.id} data-site={module.site}>
    <div className="module-card__meta"><span className="module-code">{module.id}</span><span>{module.group}</span></div>
    <h3>{module.name}</h3><p>{purpose}</p>
    {full && <p className="module-card__functionality">{module.coreFunctionality}</p>}
    <a className="module-card__link" href={module.href}>Open {moduleSites[module.site].name}<span aria-hidden="true"> ↗</span></a>
  </Reveal>;
}
