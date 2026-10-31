import { Tab, TabList, TabPanel, Tabs } from '@meetingat10/design-system/react';
import { modules, roles, roleId } from '../../data/modules';
import { ModuleCard } from './module-card';

export function ModuleExplorer() {
  return <Tabs defaultSelectedKey={roleId(roles[0])}>
    <TabList aria-label="Explore modules by role">{roles.map(role => <Tab key={role} id={roleId(role)} count={modules.filter(module => module.role === role).length}>{role}</Tab>)}</TabList>
    {roles.map(role => <TabPanel key={role} id={roleId(role)} shouldForceMount className="module-panel">
      <p className="role-note">{role === 'All users' ? 'Shared functions apply to all ten operational roles.' : `${role} modules are shown alongside the shared functions available to all users.`}</p>
      <div className="module-grid">{modules.filter(module => module.role === role).map((module, index) => <ModuleCard key={module.id} module={module} index={index} />)}</div>
    </TabPanel>)}
  </Tabs>;
}
