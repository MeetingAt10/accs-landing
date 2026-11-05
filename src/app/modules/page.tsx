import type { Metadata } from 'next';
import { CountUp } from '@meetingat10/design-system/react';
import { InventoryFilter } from '../_components/inventory-filter';
import { modules, roles } from '../../data/modules';

export const metadata: Metadata = { title: 'Modules | ACCS', description: 'All 58 ACCS modules with the roles they serve, what each one does and the workspace that runs it.' };

export default function ModulesPage() {
  return <main id="main" tabIndex={-1}>
    <header className="inv-hero">
      <div className="wrap">
        <h1 className="inv-hero__title">Every ACCS module</h1>
        <p className="inv-hero__lead"><CountUp value={modules.length} /> modules for {roles.length - 1} roles, plus the functions every user shares.</p>
      </div>
    </header>
    <InventoryFilter />
    <div className="wrap"><p className="caption inventory-source">ACCS Home, Forums and Schedule modules open their workspace. The rest open through sign-in, and your role decides what you can use.</p></div>
  </main>;
}
