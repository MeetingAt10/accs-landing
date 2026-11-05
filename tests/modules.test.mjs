import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const fixture = JSON.parse(readFileSync('src/data/doc003.json', 'utf8'));
const decode = text => text.replace(/&(?:amp|quot|apos|lt|gt|#x27|#39|#\d+|#x[\da-f]+);/gi, entity => ({ '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&#x27;': "'", '&#39;': "'" })[entity] ?? String.fromCodePoint(parseInt(entity.slice(entity[2] === 'x' ? 3 : 2, -1), entity[2] === 'x' ? 16 : 10)));
const textOnly = html => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
const pages = ['out/index.html', 'out/modules/index.html'];
const expectedRoles = ['All users', 'Student', 'CCS Student Organization', 'Professor', 'CCS Staff', 'Program Chair', 'Dean', 'QCU Administrator / Moderator', 'Guidance', 'OSAS', 'Office of the University President'];
const configured = Object.fromEntries([...readFileSync('src/lib/sites.ts', 'utf8').matchAll(/(\w+):\s*process\.env\.(NEXT_PUBLIC_\w+)\s*\?\?\s*['"]([^'"]+)['"]/g)].map(([, key, env, fallback]) => [key, process.env[env] ?? fallback]));
const portalPaths = ['/sign-in', '/home', '/notifications', '/assistant', '/help', '/standing', '/profile', '/feed', '/spaces', '/organizations', '/messages', '/directory', '/calendar', '/consultations'];
const under = (path, route) => path === route || path.startsWith(`${route}/`);
const ownership = {
  portal: 'ALL-01 ALL-04 ALL-05 STU-11 STU-12 STF-01 CHR-01 DEAN-01',
  forums: 'ALL-02 ALL-03 STU-01 STU-02 STU-03 ORG-01 ORG-02 PRO-01 PRO-02 PRO-03 CHR-06 DEAN-06 GUD-05 OSAS-04',
  schedule: 'STU-04 STU-05 PRO-04 PRO-05',
  cases: 'STU-06 STU-07 STU-08 STU-09 PRO-06 CHR-02 CHR-07 DEAN-02 GUD-01 GUD-02 OSAS-01 PRES-01 PRES-02',
  evaluations: 'STU-10 PRO-07 PRO-08 CHR-04 DEAN-03 DEAN-04',
  records: 'CHR-03 CHR-05 DEAN-05 GUD-03 GUD-04 OSAS-02 OSAS-03 ADM-03',
  admin: 'ADM-01 ADM-02 ADM-04 ADM-05 ADM-06',
};

test('DOC003 has 58 unique modules and the 11 exact source roles', () => {
  assert.equal(fixture.modules.length, 58);
  assert.equal(new Set(fixture.modules.map(item => item.id)).size, 58);
  assert.deepEqual(fixture.roles, expectedRoles);
  assert.deepEqual([...new Set(fixture.modules.map(item => item.role))], expectedRoles);
});
for (const path of pages) {
  test(`${path}: all module IDs, exact names and roles render as HTML`, () => {
    const text = textOnly(readFileSync(path, 'utf8'));
    for (const item of fixture.modules) {
      assert.ok(text.includes(item.name), item.name);
    }
    for (const role of expectedRoles) assert.ok(text.includes(role), role);
  });
  test(`${path}: visible copy has no document codes or module IDs`, () => {
    const text = textOnly(readFileSync(path, 'utf8'));
    assert.doesNotMatch(text, /DOC0\d\d/);
    assert.doesNotMatch(text, /\b(ALL|STU|ORG|PRO|STF|CHR|DEAN|GUD|OSAS|PRES|ADM)-\d{2}\b/);
    assert.ok(!text.includes('.xlsm'));
  });
  test(`${path}: links use configured hosts, public portal routes and valid anchors`, () => {
    const html = readFileSync(path, 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => decode(match[1]));
    assert.equal(ids.length, new Set(ids).size, 'unique element IDs');
    for (const [, raw] of html.matchAll(/\bhref="([^"]+)"/g)) {
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
  test(`${path}: uses no picture assets`, () => {
    const html = readFileSync(path, 'utf8');
    assert.equal([...html.matchAll(/<img\b[^>]+>/g)].length, 0, 'no <img> elements');
    assert.doesNotMatch(html, /\.webp\b|\/imagery\//i, 'no generated renders');
  });
  test(`${path}: all 58 modules have the correct owning-site destination`, () => {
    const html = readFileSync(path, 'utf8');
    for (const [site, ids] of Object.entries(ownership)) {
      for (const id of ids.split(' ')) {
        const card = html.match(new RegExp(`<article[^>]*data-module="${id}"[^>]*>[\\s\\S]*?<\\/article>`))?.[0];
        assert.ok(card, id);
        assert.ok(card.includes(`data-site="${site}"`), `${id}: ${site}`);
        const open = ['portal', 'forums', 'schedule'].includes(site);
        assert.ok(card.includes(`href="${open ? configured.portal : `${configured.portal}/sign-in`}`), `${id}: ${site}`);
      }
    }
  });
}
test('home shows each site module count from source and the three named programs', () => {
  const html = readFileSync(pages[0], 'utf8');
  let total = 0;
  for (const [site, ids] of Object.entries(ownership)) {
    const count = ids.split(' ').length;
    total += count;
    assert.match(html, new RegExp(`data-site-modules="${site}" data-value="${count}"`));
  }
  assert.equal(total, fixture.modules.length);
  for (const program of ['BSIT', 'BSCS', 'BSIS']) assert.ok(textOnly(html).includes(program));
});
test('home presents the seven workspaces, the boundary, the escalation path and no disclaimers', () => {
  const text = textOnly(readFileSync(pages[0], 'utf8'));
  for (const title of ['ACCS Home', 'Forums', 'Schedule', 'Cases', 'Evaluations', 'Records', 'Admin']) assert.ok(text.includes(title), title);
  assert.ok(text.includes('Community access never implies report access.'));
  assert.match(text, /Adviser.*Program Chair.*Dean.*Guidance.*OSAS.*President's Office/);
  assert.ok(text.includes('Sign in') && !text.includes('Create account'));
  assert.doesNotMatch(text, /sample data|synthetic|prototype|simulated|\bdemo\b|not an official/i);
});
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : entry.name.endsWith('.html') ? [join(dir, entry.name)] : []);
test('static export never links public visitors to the admin, records, cases or evaluations paths', () => {
  const blocked = ['/admin', '/records', '/restrictions', '/analytics', '/reports', '/cases', '/evaluations'];
  const portal = new URL(configured.portal).origin;
  for (const file of walk('out')) {
    for (const [, raw] of readFileSync(file, 'utf8').matchAll(/\bhref="([^"]+)"/g)) {
      const href = decode(raw);
      if (/^https?:/.test(href) && new URL(href).origin === portal) assert.ok(!blocked.some(route => under(new URL(href).pathname, route)), `${file}: ${href}`);
    }
  }
});
