// Rehype plugin: rewrites internal links in Markdown content.
// - Known aliases are redirected (e.g. /tournaments/champions-league → /tournaments/champions-league-history).
// - Club slugs without a Markdown page but present in live data point at the generated live page.
// - Links to pages that do not exist are unwrapped into a styled <span> so readers never hit a 404.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const COLLECTIONS = ['players', 'clubs', 'managers', 'nations', 'leagues', 'tournaments', 'tactics'];
const ALIASES = {
  '/tournaments/champions-league': '/tournaments/champions-league-history',
  '/tournaments/european-cup': '/tournaments/champions-league-history',
  '/tournaments/uefa-champions-league': '/tournaments/champions-league-history',
  '/tournaments/uefa-cup': '/tournaments/europa-league',
  '/tournaments/olympics': '/tournaments/olympics-men',
  '/tournaments/euros': '/tournaments/euro',
  '/tournaments/african-cup-of-nations': '/tournaments/afcon',
  '/leagues/epl': '/leagues/premier-league',
  '/leagues/ligue1': '/leagues/ligue-1',
};
const slugify = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

let cache;
function index() {
  if (cache) return cache;
  const existing = new Set();
  for (const c of COLLECTIONS) {
    const dir = join(root, 'content', c);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) if (f.endsWith('.md')) existing.add(`/${c}/${f.slice(0, -3)}`);
  }
  const liveClub = new Map();
  const liveDir = join(root, 'data', 'live');
  if (existsSync(liveDir)) {
    for (const f of readdirSync(liveDir)) {
      if (!f.endsWith('.json')) continue;
      const d = JSON.parse(readFileSync(join(liveDir, f), 'utf8'));
      for (const t of d.teams ?? []) {
        const s = slugify(t.name);
        if (!liveClub.has(s)) liveClub.set(s, `/clubs/${d.slug}--${s}`);
      }
    }
  }
  cache = { existing, liveClub };
  return cache;
}

function walk(node, fn, parent) {
  fn(node, parent);
  if (node.children) for (const c of [...node.children]) walk(c, fn, node);
}

export default function rehypeInternalLinks() {
  return (tree) => {
    const { existing, liveClub } = index();
    walk(tree, (node, parent) => {
      if (node.type !== 'element' || node.tagName !== 'a' || !parent) return;
      const href = String(node.properties?.href ?? '');
      const m = href.match(/^(\/(players|clubs|managers|nations|leagues|tournaments|tactics)\/[a-z0-9-]+)(#.*)?$/);
      if (!m) return;
      let path = ALIASES[m[1]] ?? m[1];
      if (!existing.has(path) && m[2] === 'clubs') path = liveClub.get(m[1].split('/')[2]) ?? path;
      if (existing.has(path) || path.includes('--')) { node.properties.href = path + (m[3] ?? ''); return; }
      node.tagName = 'span';
      node.properties = { className: ['soon'], title: 'Profile coming soon' };
    });
  };
}
