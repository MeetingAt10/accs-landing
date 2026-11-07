import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const decode = text => text.replace(/&(?:amp|quot|apos|lt|gt|#x27|#39|#\d+|#x[\da-f]+);/gi, entity => ({ '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&#x27;': "'", '&#39;': "'" })[entity] ?? String.fromCodePoint(parseInt(entity.slice(entity[2] === 'x' ? 3 : 2, -1), entity[2] === 'x' ? 16 : 10)));
const textOnly = html => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
const home = readFileSync('out/index.html', 'utf8');
const text = textOnly(home);
const configured = Object.fromEntries([...readFileSync('src/lib/sites.ts', 'utf8').matchAll(/(\w+):\s*process\.env\.(NEXT_PUBLIC_\w+)\s*\?\?\s*['"]([^'"]+)['"]/g)].map(([, key, env, fallback]) => [key, process.env[env] ?? fallback]));
const portalPaths = ['/sign-in', '/feed', '/consultations'];
const under = (path, route) => path === route || path.startsWith(`${route}/`);
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : entry.name.endsWith('.html') ? [join(dir, entry.name)] : []);

test('module and role lists stay off this site', () => {
  assert.ok(!existsSync('out/modules'), 'no /modules route');
  assert.doesNotMatch(text, /\bmodules?\b/i);
  assert.doesNotMatch(text, /\broles?\b/i);
  assert.doesNotMatch(home, /data-module/);
});
test('visible copy has no document codes, module IDs, dashes or disclaimers', () => {
  assert.doesNotMatch(text, /DOC0\d\d/);
  assert.doesNotMatch(text, /\b(ALL|STU|ORG|PRO|STF|CHR|DEAN|GUD|OSAS|PRES|ADM)-\d{2}\b/);
  assert.doesNotMatch(text, /[–—]/);
  assert.doesNotMatch(text, /sample data|synthetic|prototype|simulated|\bdemo\b|not an official/i);
});
test('links use configured hosts, public portal paths and valid anchors', () => {
  const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map(match => decode(match[1]));
  assert.equal(ids.length, new Set(ids).size, 'unique element IDs');
  for (const [, raw] of home.matchAll(/\bhref="([^"]+)"/g)) {
    const href = decode(raw);
    if (href.startsWith('#')) assert.ok(ids.includes(href.slice(1)), href);
    if (!/^https?:/.test(href)) continue;
    const url = new URL(href);
    const entry = Object.entries(configured).find(([, origin]) => url.origin === new URL(origin).origin);
    assert.ok(entry, href);
    if (entry[0] === 'portal') assert.ok(portalPaths.some(route => under(url.pathname, route)), href);
    else assert.equal(url.pathname.replace(/\/$/, ''), new URL(entry[1]).pathname.replace(/\/$/, ''), href);
  }
});
test('the home page uses no picture assets', () => {
  assert.equal([...home.matchAll(/<img\b[^>]+>/g)].length, 0);
  assert.doesNotMatch(home, /\.webp\b|\/imagery\//i);
});
test('home presents the workspaces, programs, the boundary, the escalation path and sign-in only', () => {
  for (const title of ['ACCS Home', 'Forums', 'Schedule', 'Cases', 'Evaluations', 'Records', 'Admin', 'BSIT', 'BSCS', 'BSIS']) assert.ok(text.includes(title), title);
  assert.ok(text.includes('Community access never implies report access.'));
  assert.match(text, /Adviser.*Program Chair.*Dean.*Guidance.*OSAS.*President's Office/);
  assert.ok(text.includes('Sign in') && !text.includes('Create account'));
});
test('static export never links public visitors to restricted portal paths', () => {
  const blocked = ['/admin', '/records', '/restrictions', '/analytics', '/reports', '/cases', '/evaluations'];
  const portal = new URL(configured.portal).origin;
  for (const file of walk('out')) {
    for (const [, raw] of readFileSync(file, 'utf8').matchAll(/\bhref="([^"]+)"/g)) {
      const href = decode(raw);
      if (/^https?:/.test(href) && new URL(href).origin === portal) assert.ok(!blocked.some(route => under(new URL(href).pathname, route)), `${file}: ${href}`);
    }
  }
});
test('the site does not use the design system', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.ok(!('@meetingat10/design-system' in pkg.dependencies));
  assert.doesNotMatch(home, /class="[^"]*\bds-/);
});
