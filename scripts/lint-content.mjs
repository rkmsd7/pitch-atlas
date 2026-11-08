// Validates YAML frontmatter of every content file and reports broken internal links.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const root = fileURLToPath(new URL('../src/content/', import.meta.url));
const collections = await readdir(root);
const slugs = new Map();
let bad = 0;
const docs = [];
for (const c of collections) {
  const files = (await readdir(join(root, c))).filter((f) => f.endsWith('.md'));
  slugs.set(c, new Set(files.map((f) => f.replace(/\.md$/, ''))));
  for (const f of files) {
    const text = await readFile(join(root, c, f), 'utf8');
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) { console.log(`✗ ${c}/${f}: no frontmatter`); bad++; continue; }
    try { const fm = yaml.load(m[1]); docs.push({ c, f, fm, body: text.slice(m[0].length) }); }
    catch (e) { console.log(`✗ ${c}/${f}: ${e.message.split('\n')[0]}`); bad++; }
  }
}
const base = { players: 'players', clubs: 'clubs', managers: 'managers', nations: 'nations', leagues: 'leagues', tournaments: 'tournaments', tactics: 'tactics' };
const broken = new Map();
for (const d of docs) {
  for (const [, path] of d.body.matchAll(/\]\(\/(players|clubs|managers|nations|leagues|tournaments|tactics)\/([a-z0-9-]+)\)/g)) {
    const [, col, slug] = [null, ...path.split('/')];
  }
  for (const mm of d.body.matchAll(/\]\(\/(players|clubs|managers|nations|leagues|tournaments|tactics)\/([a-z0-9-]+)[)#]/g)) {
    if (!slugs.get(mm[1])?.has(mm[2])) { const k = `/${mm[1]}/${mm[2]}`; broken.set(k, (broken.get(k) ?? 0) + 1); }
  }
}
console.log(`${docs.length} files parsed, ${bad} with YAML errors`);
if (process.argv.includes('--links')) {
  const list = [...broken.entries()].sort((a, b) => b[1] - a[1]);
  console.log(`${list.length} distinct missing link targets (count of references):`);
  for (const [k, n] of list) console.log(`  ${n.toString().padStart(3)}  ${k}`);
}
process.exitCode = bad ? 1 : 0;
