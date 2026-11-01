'use client';
import { motion } from 'motion/react';
import { isOpenSite, moduleSites, type Module } from '../../data/modules';

/** One DOC003 module. Layout-animated so filtering glides the grid instead of jumping. */
export function ModuleCard({ module }: { module: Module }) {
  return <motion.article layout="position" initial={false} exit={{ opacity: 0, scale: .96, transition: { duration: .18 } }} transition={{ type: 'spring', stiffness: 380, damping: 36 }}
    className="module-card" id={`module-${module.id}`} data-module={module.id} data-site={module.site}>
    <div className="module-card__meta"><span className="module-code">{module.id}</span><span>{module.group}</span></div>
    <h3>{module.name}</h3><p>{module.purpose}</p>
    <p className="module-card__functionality">{module.coreFunctionality}</p>
    <a className="module-card__link" href={module.href}>{isOpenSite(module.site) ? `Open ${moduleSites[module.site].name}` : 'Sign in to open'}</a>
  </motion.article>;
}
