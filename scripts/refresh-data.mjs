// Refreshes live standings, fixtures, results, teams and rosters from ESPN's public site API (no key needed).
// Usage: node scripts/refresh-data.mjs [leagueSlug ...]
import { writeFile, mkdir } from 'node:fs/promises';

const SITE = 'https://site.api.espn.com/apis/site/v2/sports/soccer';
const V2 = 'https://site.api.espn.com/apis/v2/sports/soccer';
const OUT = new URL('../src/data/live/', import.meta.url);
const DELAY_MS = Number(process.env.ESPN_DELAY || 120);
const PAST_DAYS = 28, FUTURE_DAYS = 42;

export const LEAGUES = [
  { slug: 'premier-league', espn: 'eng.1' },
  { slug: 'la-liga', espn: 'esp.1' },
  { slug: 'serie-a', espn: 'ita.1' },
  { slug: 'bundesliga', espn: 'ger.1' },
  { slug: 'ligue-1', espn: 'fra.1' },
  { slug: 'champions-league', espn: 'uefa.champions' },
  { slug: 'eredivisie', espn: 'ned.1' },
  { slug: 'primeira-liga', espn: 'por.1' },
  { slug: 'scottish-premiership', espn: 'sco.1' },
  { slug: 'super-lig', espn: 'tur.1' },
  { slug: 'mls', espn: 'usa.1' },
  { slug: 'liga-mx', espn: 'mex.1' },
  { slug: 'brasileirao', espn: 'bra.1' },
  { slug: 'argentine-primera', espn: 'arg.1' },
  { slug: 'saudi-pro-league', espn: 'ksa.1' },
  { slug: 'j1-league', espn: 'jpn.1' },
  { slug: 'indian-super-league', espn: 'ind.1' },
  { slug: 'wsl', espn: 'eng.w.1' },
  { slug: 'nwsl', espn: 'usa.nwsl' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    await sleep(DELAY_MS);
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'PitchAtlas/1.0 (static site build)' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === tries - 1) { console.warn(`  failed ${url}: ${e.message}`); return null; }
      await sleep(1000 * (i + 1));
    }
  }
}

export const slugify = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const ymd = (d) => d.toISOString().slice(0, 10).replace(/-/g, '');
const stat = (stats, name) => stats.find((s) => s.name === name)?.value ?? null;

function slimEvent(e) {
  const c = e.competitions?.[0];
  if (!c) return null;
  const home = c.competitors.find((t) => t.homeAway === 'home');
  const away = c.competitors.find((t) => t.homeAway === 'away');
  const state = e.status?.type?.state; // pre | in | post
  return {
    id: e.id,
    date: e.date,
    name: e.name,
    shortName: e.shortName,
    state,
    detail: e.status?.type?.shortDetail ?? null,
    venue: c.venue?.fullName ?? null,
    round: c.notes?.[0]?.headline ?? null,
    home: { id: home?.team?.id, name: home?.team?.displayName, short: home?.team?.abbreviation, logo: home?.team?.logo, score: state === 'pre' ? null : home?.score ?? null },
    away: { id: away?.team?.id, name: away?.team?.displayName, short: away?.team?.abbreviation, logo: away?.team?.logo, score: state === 'pre' ? null : away?.score ?? null },
  };
}

async function refreshLeague(L) {
  console.log(`\n== ${L.slug} (${L.espn})`);
  const st = await get(`${V2}/${L.espn}/standings`);
  if (!st) return;
  const groups = (st.children ?? []).map((g) => ({
    name: g.name,
    rows: (g.standings?.entries ?? []).map((r) => ({
      rank: stat(r.stats, 'rank'),
      teamId: r.team.id,
      team: r.team.displayName,
      short: r.team.abbreviation,
      logo: r.team.logos?.[0]?.href ?? null,
      played: stat(r.stats, 'gamesPlayed'),
      won: stat(r.stats, 'wins'),
      drawn: stat(r.stats, 'ties'),
      lost: stat(r.stats, 'losses'),
      gf: stat(r.stats, 'pointsFor'),
      ga: stat(r.stats, 'pointsAgainst'),
      gd: stat(r.stats, 'pointDifferential'),
      points: stat(r.stats, 'points'),
      note: r.note?.description ?? null,
      noteColor: r.note?.color ?? null,
    })).sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99)),
  }));

  // Match days from the league calendar within our window.
  const sb = await get(`${SITE}/${L.espn}/scoreboard`);
  const calendar = sb?.leagues?.[0]?.calendar ?? [];
  const now = Date.now();
  const from = now - PAST_DAYS * 864e5, to = now + FUTURE_DAYS * 864e5;
  let days;
  if (calendar.length && calendar.every((d) => typeof d === 'string')) {
    days = [...new Set(calendar.map((d) => new Date(d)).filter((d) => d.getTime() >= from && d.getTime() <= to).map(ymd))];
  } else {
    // Calendar given as phase ranges (e.g. Champions League): scan every day in the window.
    days = [];
    for (let t = from; t <= to; t += 864e5) days.push(ymd(new Date(t)));
  }
  const events = [];
  for (const day of days) {
    const data = await get(`${SITE}/${L.espn}/scoreboard?dates=${day}`);
    for (const e of data?.events ?? []) { const s = slimEvent(e); if (s) events.push(s); }
  }
  const seen = new Set();
  const uniq = events.filter((e) => !seen.has(e.id) && seen.add(e.id)).sort((a, b) => a.date.localeCompare(b.date));
  const results = uniq.filter((e) => e.state === 'post');
  const fixtures = uniq.filter((e) => e.state !== 'post');

  const teamsRaw = (await get(`${SITE}/${L.espn}/teams`))?.sports?.[0]?.leagues?.[0]?.teams ?? [];
  const teams = [];
  for (const { team: t } of teamsRaw) {
    const roster = await get(`${SITE}/${L.espn}/teams/${t.id}/roster`);
    const squad = (roster?.athletes ?? []).map((p) => ({
      id: p.id,
      name: p.displayName,
      fullName: p.fullName,
      number: p.jersey ?? null,
      position: p.position?.abbreviation ?? null,
      positionName: p.position?.name ?? null,
      age: p.age ?? null,
      born: p.dateOfBirth?.slice(0, 10) ?? null,
      height: p.displayHeight ?? null,
      nationality: p.citizenship ?? p.birthPlace?.country ?? null,
      flag: p.flag?.href ?? null,
      headshot: p.headshot?.href ?? null,
    }));
    teams.push({
      id: t.id,
      name: t.displayName,
      short: t.abbreviation,
      slug: slugify(t.displayName),
      location: t.location,
      color: t.color ? `#${t.color}` : null,
      altColor: t.alternateColor ? `#${t.alternateColor}` : null,
      logo: t.logos?.[0]?.href ?? null,
      squad,
    });
    console.log(`  ${t.displayName}: ${squad.length} players`);
  }

  const data = {
    slug: L.slug, espn: L.espn,
    name: st.name, abbreviation: st.abbreviation,
    season: st.children?.[0]?.name ?? null,
    fetchedAt: new Date().toISOString(),
    groups, fixtures, results, teams,
  };
  await mkdir(OUT, { recursive: true });
  await writeFile(new URL(`${L.slug}.json`, OUT), JSON.stringify(data));
  console.log(`  wrote ${L.slug}.json: ${groups.reduce((n, g) => n + g.rows.length, 0)} rows, ${fixtures.length} fixtures, ${results.length} results, ${teams.length} teams`);
}

const only = process.argv.slice(2);
for (const L of LEAGUES) {
  if (only.length && !only.includes(L.slug)) continue;
  await refreshLeague(L);
}
console.log('\ndone');
