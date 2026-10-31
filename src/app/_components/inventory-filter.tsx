'use client';
import { useState } from 'react';
import { Button } from '@meetingat10/design-system/react';

export function InventoryFilter({ groups, children }: { groups: readonly { key: string; label: string; count: number }[]; children: React.ReactNode }) {
  const [selected, setSelected] = useState('all');
  return <div className="inventory" data-filter={selected}>
    <div className="inventory-filters" role="group" aria-label="Filter inventory by derived lane">
      <Button size="sm" variant={selected === 'all' ? 'primary' : 'secondary'} aria-pressed={selected === 'all'} onPress={() => setSelected('all')}>All lanes · 58</Button>
      {groups.map(group => <Button key={group.key} size="sm" variant={selected === group.key ? 'primary' : 'secondary'} aria-pressed={selected === group.key} onPress={() => setSelected(group.key)}>{group.label} · {group.count}</Button>)}
    </div>
    <p className="caption" aria-live="polite">{selected === 'all' ? 'Showing all 58 modules.' : `Showing ${groups.find(group => group.key === selected)?.count} modules in ${groups.find(group => group.key === selected)?.label}.`} Lane groupings are derived for navigation; roles and access rules still apply.</p>
    {children}
  </div>;
}
