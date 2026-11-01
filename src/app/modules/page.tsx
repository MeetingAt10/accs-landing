import type { Metadata } from 'next';
import { CountUp } from '@meetingat10/design-system/react';
import { InventoryFilter } from '../_components/inventory-filter';
import { modules, roles } from '../../data/modules';

export const metadata: Metadata = { title: 'Module inventory | ACCS', description: 'All 58 DOC003 modules with their roles, descriptions and the ACCS site that owns each one.' };

export default function ModulesPage() {
  return <main id="main" tabIndex={-1}>
    <header className="inv-hero">
      <div className="wrap">
        <h1 className="inv-hero__title">Module inventory</h1>
        <p className="inv-hero__lead"><CountUp value={modules.length} /> modules from DOC003 for {roles.length - 1} roles, plus the functions every user shares. Each name and description comes straight from the source spreadsheet.</p>
      </div>
    </header>
    <InventoryFilter />
    <div className="wrap"><p className="caption inventory-source">Source: DOC003_MODULE-INVENTORY.xlsm, sheet Module Inventory, rows 7 to 64. ACCS Home, Forums and Schedule modules open their site. The rest open through sign-in, and your role decides what you can use.</p></div>
  </main>;
}
