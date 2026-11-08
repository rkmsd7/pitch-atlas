import type { APIRoute } from 'astro';
import { maps, slugOf } from '../lib/content';
import { liveLeagues } from '../lib/live';

export const GET: APIRoute = async () => {
  const m = await maps();
  const out: { t: string; k: string; u: string; s: string }[] = [];
  for (const p of m.players) out.push({ t: p.data.name, k: 'player', u: `/players/${slugOf(p)}`, s: `${p.data.position} · ${p.data.nationality}${p.data.currentClubName ? ' · ' + p.data.currentClubName : ''}` });
  for (const c of m.clubs) out.push({ t: c.data.name, k: 'club', u: `/clubs/${slugOf(c)}`, s: `${c.data.country} · ${c.data.league}` });
  for (const g of m.managers) out.push({ t: g.data.name, k: 'manager', u: `/managers/${slugOf(g)}`, s: `${g.data.nationality}${g.data.currentTeam ? ' · ' + g.data.currentTeam : ''}` });
  for (const n of m.nations) out.push({ t: n.data.name, k: 'nation', u: `/nations/${slugOf(n)}`, s: `${n.data.confederation} · ${n.data.gender}` });
  for (const l of m.leagues) out.push({ t: l.data.name, k: 'league', u: `/leagues/${slugOf(l)}`, s: l.data.country });
  for (const t of m.tournaments) out.push({ t: t.data.name, k: 'tournament', u: `/tournaments/${slugOf(t)}`, s: t.data.organiser ?? '' });
  for (const t of m.tactics) out.push({ t: t.data.name, k: 'tactic', u: `/tactics/${slugOf(t)}`, s: t.data.formation ?? '' });
  const known = new Set(out.filter((o) => o.k === 'club').map((o) => o.t.toLowerCase()));
  for (const l of liveLeagues()) for (const t of l.teams) if (!known.has(t.name.toLowerCase())) out.push({ t: t.name, k: 'club', u: `/clubs/${l.slug}--${t.slug}`, s: l.name });
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json' } });
};
