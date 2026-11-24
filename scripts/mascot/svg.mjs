// Minimal XML tools for the Figma SVG exports in public/landing: parse to a tree, find nodes by
// id, namespace ids, and serialize. The exports have no comments, CDATA or doctype, so this stays small.

const ATTR = /([^\s=]+)\s*=\s*"([^"]*)"/g;

export function parse(xml) {
  const root = { name: '#root', attrs: {}, children: [] };
  const stack = [root];
  const tag = /<(\/?)([^\s/>]+)([^>]*?)(\/?)>|([^<]+)/g;
  for (const m of xml.matchAll(tag)) {
    const [, closing, name, rest, selfClosing, text] = m;
    const parent = stack[stack.length - 1];
    if (text !== undefined) {
      if (text.trim()) parent.children.push({ name: '#text', text });
      continue;
    }
    if (name.startsWith('?') || name.startsWith('!')) continue;
    if (closing) {
      stack.pop();
      continue;
    }
    const node = { name, attrs: Object.fromEntries([...rest.matchAll(ATTR)].map(a => [a[1], a[2]])), children: [] };
    parent.children.push(node);
    if (!selfClosing && !rest.endsWith('/')) stack.push(node);
  }
  return root;
}

export function serialize(node) {
  if (node.name === '#text') return node.text;
  if (node.name === '#root') return node.children.map(serialize).join('');
  const attrs = Object.entries(node.attrs).map(([k, v]) => ` ${k}="${v}"`).join('');
  return node.children.length ? `<${node.name}${attrs}>${node.children.map(serialize).join('')}</${node.name}>` : `<${node.name}${attrs}/>`;
}

export function walk(node, fn) {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
}

export function byId(root, id) {
  let found;
  walk(root, n => { if (!found && n.attrs?.id === id) found = n; });
  if (!found) throw new Error(`No element with id "${id}"`);
  return found;
}

/** Prefixes every id in the tree and rewrites url(#…) and href="#…" references to match. */
export function namespace(root, prefix) {
  const ids = new Set();
  walk(root, n => { if (n.attrs?.id) ids.add(n.attrs.id); });
  const safe = id => prefix + id.replace(/[^\w-]/g, '_');
  const ref = v => v.replace(/url\(#([^)]+)\)/g, (s, id) => (ids.has(id) ? `url(#${safe(id)})` : s));
  walk(root, n => {
    if (!n.attrs) return;
    for (const [k, v] of Object.entries(n.attrs)) {
      if (k === 'id') n.attrs[k] = safe(v);
      else if ((k === 'xlink:href' || k === 'href') && v.startsWith('#') && ids.has(v.slice(1))) n.attrs[k] = `#${safe(v.slice(1))}`;
      else if (v.includes('url(#')) n.attrs[k] = ref(v);
    }
  });
  return root;
}

/** Deep copy with the Figma layer names (`id`) of non-referenced nodes removed, so a part can be reused. */
export function clone(node, keepIds = true) {
  const copy = { ...node, attrs: { ...node.attrs }, children: (node.children ?? []).map(c => clone(c, keepIds)) };
  if (!keepIds) delete copy.attrs.id;
  return copy;
}

export const fmt = n => (Math.round(n * 1000) / 1000).toString();
