// Auto-quotes frontmatter values that break YAML (unquoted colons, quotes, etc.). Usage: node scripts/fix-frontmatter.mjs
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
const root = fileURLToPath(new URL('../src/content/', import.meta.url));
let fixed = 0, failed = 0;
for (const c of await readdir(root)) {
  for (const f of (await readdir(join(root, c))).filter((x) => x.endsWith('.md'))) {
    const p = join(root, c, f);
    let text = await readFile(p, 'utf8');
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) continue;
    let fm = m[1], changed = false;
    for (let i = 0; i < 12; i++) {
      try { yaml.load(fm); break; } catch (e) {
        const line = e.mark?.line; if (line == null) { failed++; break; }
        const lines = fm.split('\n');
        // walk up to the nearest "key: value" line (the error may be reported one line later)
        let idx = line; while (idx >= 0 && !/^\s*[\w-]+:\s*\S/.test(lines[idx])) idx--;
        const mm = lines[idx]?.match(/^(\s*[\w-]+:\s*)(.+)$/);
        if (!mm || /^["'\[{]/.test(mm[2].trim()) || i === 11) { failed++; console.log(`✗ ${c}/${f}: ${e.message.split('\n')[0]}`); break; }
        lines[idx] = `${mm[1]}"${mm[2].trim().replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
        fm = lines.join('\n'); changed = true;
      }
    }
    if (changed) { try { yaml.load(fm); text = text.replace(m[1], fm); await writeFile(p, text); fixed++; console.log(`✓ fixed ${c}/${f}`); } catch { failed++; } }
  }
}
console.log(`fixed ${fixed}, unfixable ${failed}`);
