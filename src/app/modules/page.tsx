import type { Metadata } from 'next';
import { CountUp } from '@meetingat10/design-system/react';
import { InventoryFilter } from '../_components/inventory-filter';
import { modules, roles } from '../../data/modules';

export const metadata: Metadata = { title: 'Module inventory - ACCS', description: 'All 58 DOC003 modules, their source roles, purposes and owning ACCS sites.' };

export default function ModulesPage() {
  return <main id="main" tabIndex={-1}>
    <header className="inv-hero">
      <div className="hero__ground" aria-hidden="true" />
      <div className="wrap">
        <h1 className="inv-hero__title">Every module. <em>Every role.</em></h1>
        <p className="inv-hero__lead"><CountUp value={modules.length} /> modules from DOC003, across {roles.length - 1} operational roles and the shared functions for all users. Names, purposes and roles follow the source inventory.</p>
      </div>
    </header>
    <InventoryFilter />
    <div className="wrap"><p className="caption inventory-source">Source: DOC003_MODULE-INVENTORY.xlsm, “Module Inventory”, rows 7 to 64. Community and schedule modules open their site; the rest go through sign-in, and access depends on your role.</p></div>
  </main>;
}
