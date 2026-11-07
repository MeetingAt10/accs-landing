'use client';
import { useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { workspaces, type WorkspaceKey } from '../../data/workspaces';
import { Pictogram } from '../_components/pictogram';
import { previews } from './previews';

const W = 1240, H = 392, TOP = 28, ROW = 56, HUB_Y = TOP + 3 * ROW, FAN_X = 92, END = 262;

/** Line geometry: seven tracks leave the hub as a bundle and fan out at 45 degrees to their workspace. */
const lines = workspaces.map((site, index) => {
  const y = TOP + index * ROW;
  const start = HUB_Y + (index - 3) * 9;
  return { ...site, y, d: `M40 ${start}H${FAN_X}L${FAN_X + Math.abs(y - start)} ${y}H${END}` };
});

export function RouteMap() {
  const [selected, setSelected] = useState<WorkspaceKey>('forums');
  return <section id="sites" className="sites" aria-labelledby="sites-title">
    <div className="wrap">
      <h2 id="sites-title">Seven workspaces on one college account</h2>
      <p className="sites__lead">Pick a line to try a working preview of that workspace. A link never grants access on its own.</p>

      <div className="map">
        <svg className="map__svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          {lines.map(line => <g key={line.key} className="line" data-site={line.key} data-selected={selected === line.key} onClick={() => setSelected(line.key)}>
            <path className="line__track" d={line.d} pathLength={1} />
          </g>)}
          <circle className="hub" cx={40} cy={HUB_Y} r={30} />
        </svg>
        <p className="map__hub" style={{ top: `${(HUB_Y / H) * 100}%` }}>One college account</p>
        <ul className="map__lines">
          {lines.map(line => <li key={line.key} style={{ '--y': `${(line.y / H) * 100}%` } as React.CSSProperties}>
            <button type="button" data-site={line.key} aria-pressed={selected === line.key} aria-controls="line-panels" onClick={() => setSelected(line.key)}>
              <span className="chip">{line.name}</span>
              <span className="map__blurb">{line.blurb}</span>
            </button>
          </li>)}
        </ul>
      </div>

      <div id="line-panels">
        {workspaces.map(site => <div key={site.key} className="panel" data-site={site.key} hidden={selected !== site.key}>
          <div className="panel__info">
            <h3><Pictogram site={site.key} size={32} />{site.name}</h3>
            {site.access && <p className="panel__meta">{site.access}</p>}
            <a className="btn btn--line" href={site.href}>{site.access ? `Sign in to open ${site.name}` : `Open ${site.name}`}<ArrowRight size={20} weight="bold" aria-hidden="true" /></a>
          </div>
          <div className="preview">{previews[site.key]}</div>
        </div>)}
      </div>
    </div>
  </section>;
}
