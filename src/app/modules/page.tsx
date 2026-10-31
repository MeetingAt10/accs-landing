import type { Metadata } from 'next';
import { Badge, Section, SectionHeader } from '@meetingat10/design-system/react';
import { modules, moduleSites, roles, roleId, type ModuleSite } from '../../data/modules';
import { ModuleCard } from '../_components/module-card';
import { InventoryFilter } from '../_components/inventory-filter';

export const metadata: Metadata = { title: 'Module inventory · ACCS prototype', description: 'All 58 DOC003 modules, their source roles, purposes and owning ACCS sites.' };

export default function ModulesPage() {
  return <main id="main" tabIndex={-1}>
    <Section className="inventory-intro">
      <Badge form="pending" tone="info">Capstone prototype</Badge>
      <SectionHeader level={1} title="Every module. Every role." description="58 modules from DOC003, across ten operational roles and the shared functions for all users. Names, purposes and roles follow the source inventory." />
      <p className="caption">QCU College of Computer Studies · San Bartolome · BSIT, BSCS, BSIS</p>
      <nav aria-label="Module inventory roles" className="role-index">{roles.map(role => <a key={role} href={`#${roleId(role)}`}>{role}</a>)}</nav>
      <InventoryFilter groups={(Object.keys(moduleSites) as ModuleSite[]).map(key => ({ key, label: moduleSites[key].group, count: modules.filter(module => module.site === key).length }))}>
        {roles.map(role => <section className="inventory-role" key={role} id={roleId(role)} data-sites={modules.filter(module => module.role === role).map(module => module.site).join(' ')} aria-labelledby={`${roleId(role)}-title`}>
          <div className="inventory-role__header"><h2 id={`${roleId(role)}-title`}>{role}</h2><span className="module-code">{modules.filter(module => module.role === role).length} modules</span></div>
          <div className="module-grid">{modules.filter(module => module.role === role).map((module, index) => <ModuleCard module={module} key={module.id} index={index} full />)}</div>
        </section>)}
      </InventoryFilter>
      <p className="caption inventory-source">Source: DOC003_MODULE-INVENTORY.xlsm, “Module Inventory”, rows 7–64. This is the specified scope of a prototype; a module listing is not a claim that its workflow is approved or complete. A site link opens the relevant workspace and access depends on your role.</p>
    </Section>
  </main>;
}
