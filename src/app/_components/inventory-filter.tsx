'use client';
import { useState } from 'react';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'motion/react';
import { Button, CountUp } from '@meetingat10/design-system/react';
import { modules, moduleSites, roleId, roles, type ModuleSite } from '../../data/modules';
import { ModuleCard } from './module-card';

const keys = Object.keys(moduleSites) as ModuleSite[];

export function InventoryFilter() {
  const [selected, setSelected] = useState<ModuleSite | 'all'>('all');
  const shown = modules.filter(module => selected === 'all' || module.site === selected);
  const label = selected === 'all' ? 'all lanes' : moduleSites[selected].group;
  return <MotionConfig reducedMotion="user"><LayoutGroup>
    <div className="inv-bar">
      <div className="inv-bar__inner wrap">
        <div className="inventory-filters" role="group" aria-label="Filter inventory by derived lane">
          <Button size="sm" variant={selected === 'all' ? 'primary' : 'secondary'} aria-pressed={selected === 'all'} onPress={() => setSelected('all')}>All lanes · {modules.length}</Button>
          {keys.map(key => <Button key={key} size="sm" variant={selected === key ? 'primary' : 'secondary'} aria-pressed={selected === key} onPress={() => setSelected(key)}>{moduleSites[key].group} · {modules.filter(module => module.site === key).length}</Button>)}
        </div>
        <p className="inv-bar__status" aria-live="polite">Showing <strong><CountUp value={shown.length} /></strong> of {modules.length} in {label}</p>
      </div>
    </div>
    <div className="wrap inv-body">
      <nav aria-label="Module inventory roles" className="role-index">{roles.map(role => <a key={role} href={`#${roleId(role)}`}>{role}</a>)}</nav>
      <AnimatePresence initial={false}>{roles.map(role => {
        const mine = shown.filter(module => module.role === role);
        return mine.length > 0 && <motion.section layout="position" key={role} className="inventory-role" id={roleId(role)} aria-labelledby={`${roleId(role)}-title`} exit={{ opacity: 0, transition: { duration: .15 } }}>
          <div className="inventory-role__header"><h2 id={`${roleId(role)}-title`}>{role}</h2><span className="module-code">{mine.length} modules</span></div>
          <div className="module-grid"><AnimatePresence initial={false} mode="popLayout">{mine.map(module => <ModuleCard module={module} key={module.id} />)}</AnimatePresence></div>
        </motion.section>;
      })}</AnimatePresence>
    </div>
  </LayoutGroup></MotionConfig>;
}
