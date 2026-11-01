'use client';
import { useState } from 'react';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'motion/react';
import { Button, CountUp } from '@meetingat10/design-system/react';
import { modules, moduleSites, roleId, roles, type ModuleSite } from '../../data/modules';
import { ModuleRow } from './module-row';

const keys = Object.keys(moduleSites) as ModuleSite[];

export function InventoryFilter() {
  const [selected, setSelected] = useState<ModuleSite | 'all'>('all');
  const shown = modules.filter(module => selected === 'all' || module.site === selected);
  const scope = selected === 'all' ? '' : ` in ${moduleSites[selected].group}`;
  return <MotionConfig reducedMotion="user"><LayoutGroup>
    <div className="inv-bar">
      <div className="inv-bar__inner wrap">
        <div className="inventory-filters" role="group" aria-label="Filter modules by group">
          <Button size="sm" variant={selected === 'all' ? 'primary' : 'secondary'} aria-pressed={selected === 'all'} onPress={() => setSelected('all')}>All <span className="count">{modules.length}</span></Button>
          {keys.map(key => <Button key={key} size="sm" variant={selected === key ? 'primary' : 'secondary'} aria-pressed={selected === key} onPress={() => setSelected(key)}>{moduleSites[key].group} <span className="count">{modules.filter(module => module.site === key).length}</span></Button>)}
        </div>
        <p className="inv-bar__status" aria-live="polite">Showing <strong><CountUp value={shown.length} /></strong> of {modules.length} modules{scope}</p>
      </div>
    </div>
    <div className="wrap inv-body">
      <nav aria-label="Jump to a role" className="role-index">{roles.map(role => <a key={role} href={`#${roleId(role)}`}>{role}<span className="count">{modules.filter(module => module.role === role).length}</span></a>)}</nav>
      <div className="inv-list">
        <AnimatePresence initial={false}>{roles.map(role => {
          const mine = shown.filter(module => module.role === role);
          return mine.length > 0 && <motion.section layout="position" key={role} className="inventory-role" id={roleId(role)} aria-labelledby={`${roleId(role)}-title`} exit={{ opacity: 0, transition: { duration: .15 } }}>
            <div className="inventory-role__header"><h2 id={`${roleId(role)}-title`}>{role}</h2><span>{mine.length} {mine.length === 1 ? 'module' : 'modules'}</span></div>
            <div className="module-list"><AnimatePresence initial={false} mode="popLayout">{mine.map(module => <ModuleRow module={module} key={module.id} />)}</AnimatePresence></div>
          </motion.section>;
        })}</AnimatePresence>
      </div>
    </div>
  </LayoutGroup></MotionConfig>;
}
