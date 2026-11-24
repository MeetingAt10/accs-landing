import { signInUrl } from '../../data/modules';
import { sites } from '../../lib/sites';

/** Portal destinations used by the landing page. A link does not grant access to a module. */
export const signIn = signInUrl;
export const portal = (path: string) => `${sites.portal}${path}`;
/** Sibling sites configured at build time: the design system and the Meeting At Ten team site. */
export const designSystem = sites.design;
export const team = sites.meeting;
