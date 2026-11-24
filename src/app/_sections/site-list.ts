import { signInUrl } from '../../data/modules';
import { sites } from '../../lib/sites';

/** Portal destinations used by the landing page. A link does not grant access to a module. */
export const signIn = signInUrl;
/** Signed-out visitors land on sign-in first; the portal returns them to the path they asked for. */
export const signInTo = (path: string) => `${signInUrl}?redirect=${encodeURIComponent(path)}`;
export const portal = (path: string) => `${sites.portal}${path}`;

/** In-page anchors shared by the navbar and footer. */
export const anchors = { features: '/#features', offices: '/#offices', howItWorks: '/#how-it-works' } as const;
