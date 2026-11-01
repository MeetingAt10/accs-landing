'use client';
import { motion } from 'motion/react';
import { isOpenSite, moduleSites, type Module } from '../../data/modules';

/** One DOC003 module as a table-like row. Layout-animated so filtering glides the list instead of jumping. */
export function ModuleRow({ module }: { module: Module }) {
  return <motion.article layout="position" initial={false} exit={{ opacity: 0, transition: { duration: .15 } }} transition={{ type: 'spring', stiffness: 380, damping: 36 }}
    className="module-row" id={`module-${module.id}`} data-module={module.id} data-site={module.site}>
    <span className="module-code">{module.id}</span>
    <div className="module-row__main"><h3>{module.name}</h3><p>{module.purpose}</p></div>
    <p className="module-row__does">{module.coreFunctionality}</p>
    <a className="module-row__link" href={module.href}>{isOpenSite(module.site) ? `Open ${moduleSites[module.site].name}` : 'Sign in to open'}</a>
  </motion.article>;
}
