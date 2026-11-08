// Looks up the current head coach of every live team from the English Wikipedia club infobox.
// Writes src/data/managers.json → { "<leagueSlug>": { "<teamId>": { name, wiki } } }
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const live = fileURLToPath(new URL('../src/data/live/', import.meta.url));
const out = fileURLToPath(new URL('../src/data/managers.json', import.meta.url));
const UA = { 'User-Agent': 'PitchAtlas/1.0 (static site builder; contact via GitHub rkmsd7/pitch-atlas)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(params) {
  await sleep(900);
  const url = 'https://en.wikipedia.org/w/api.php?' + new URLSearchParams({ format: 'json', ...params });
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await sleep(5000 * (i + 1)); continue; }
      return await r.json();
    } catch (e) { console.warn(`  retry ${i + 1}: ${e.message}`); await sleep(4000 * (i + 1)); }
  }
  return null;
}
const stripTemplates = (s) => { let prev; do { prev = s; s = s.replace(/\{\{[^{}]*\}\}/g, ''); } while (s !== prev); return s; };
const clean = (s) => stripTemplates(s.replace(/<!--.*?-->/g, '').replace(/<ref[^>]*\/>/g, '').replace(/<ref[\s\S]*?(<\/ref>|$)/g, '')).replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2').replace(/<[^>]+>/g, '').replace(/''+/g, '').replace(/\(.*?\)/g, '').trim();
let existing = {};
try { existing = JSON.parse(await readFile(out, 'utf8')); } catch {}
const result = existing;
for (const f of (await readdir(live)).filter((x) => x.endsWith('.json'))) {
  const league = JSON.parse(await readFile(join(live, f), 'utf8'));
  result[league.slug] ??= {};
  for (const t of league.teams) {
    if (result[league.slug][t.id]?.name && !process.argv.includes('--force')) continue;
    const q = league.slug === 'wsl' || league.slug === 'nwsl' ? `${t.name} women's football club` : `${t.name} football club`;
    const s = await api({ action: 'query', list: 'search', srsearch: q, srlimit: 3 });
    const women = league.slug === 'wsl' || league.slug === 'nwsl';
    const hits = (s?.query?.search ?? []).filter((h) => !/season|list of|rivalry|stadium|academy|flight|\(women\)|\(RN\)|uruguay|montevideo|\b(II|B|reserves?|youth|under-\d+)\b/i.test(h.title));
    const hit = hits.find((h) => women ? /women|w\.f\.c|ladies|l\.f\.c|nwsl|current|spirit|pride|thorns|courage|reign|wave|royals|dash|stars|legacy|summit|bay fc|angel city|gotham|louisville/i.test(h.title) : !/women|w\.f\.c|ladies/i.test(h.title)) ?? (women ? undefined : hits[0]);
    if (!hit) { console.log(`  ? ${t.name}: no wiki hit`); continue; }
    const p = await api({ action: 'parse', page: hit.title, prop: 'wikitext', section: 0, redirects: 1 });
    const wt = p?.parse?.wikitext?.['*'] ?? '';
    const mm = wt.match(/\|\s*(?:manager|head_coach|head coach|coach|mgr|chairman_manager)\s*=\s*([^\n]+)/i);
    let name = mm ? clean(mm[1]) : null;
    if (name && (name.length > 45 || /[|=\[\]{}<>]|\bago\b|founded|https?:|\d{3,}|^(vacant|tba|tbd|none)$/i.test(name))) name = null;
    result[league.slug][t.id] = { name, wiki: hit.title };
    console.log(`  ${t.name} → ${name ?? '?'} (${hit.title})`);
  }
  await writeFile(out, JSON.stringify(result, null, 1));
}
console.log('done');
