export interface LiveRow { rank: number; teamId: string; team: string; short: string; logo: string | null; played: number; won: number; drawn: number; lost: number; gf: number; ga: number; gd: number; points: number; note: string | null; noteColor: string | null; }
export interface LiveSide { id: string; name: string; short: string; logo: string; score: string | null; }
export interface LiveEvent { id: string; date: string; name: string; shortName: string; state: 'pre' | 'in' | 'post'; detail: string | null; venue: string | null; round: string | null; home: LiveSide; away: LiveSide; }
export interface LivePlayer { id: string; name: string; fullName: string; number: string | null; position: string | null; positionName: string | null; age: number | null; born: string | null; height: string | null; nationality: string | null; flag: string | null; headshot: string | null; }
export interface LiveTeam { id: string; name: string; short: string; slug: string; location: string; color: string | null; altColor: string | null; logo: string | null; squad: LivePlayer[]; }
export interface LiveLeague { slug: string; espn: string; name: string; abbreviation: string; season: string | null; fetchedAt: string; groups: { name: string; rows: LiveRow[] }[]; fixtures: LiveEvent[]; results: LiveEvent[]; teams: LiveTeam[]; }

const files = import.meta.glob<{ default: LiveLeague }>('../data/live/*.json', { eager: true });
const bySlug = new Map<string, LiveLeague>();
for (const [path, mod] of Object.entries(files)) {
  const slug = path.split('/').pop()!.replace('.json', '');
  bySlug.set(slug, mod.default);
}

export const liveLeagues = () => [...bySlug.values()];
export const getLive = (slug?: string) => (slug ? bySlug.get(slug) : undefined);

export const norm = (s: string) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/\b(fc|cf|afc|sc|ac|club|de|the|women|w)\b/g, '').replace(/[^a-z0-9]/g, '');

export function findTeam(league: LiveLeague | undefined, names: string[]): LiveTeam | undefined {
  if (!league) return;
  const keys = names.filter(Boolean).map(norm).filter((k) => k.length > 2);
  for (const t of league.teams) {
    const tk = [norm(t.name), norm(t.slug), norm(t.short), norm(t.location)].filter((k) => k.length > 2);
    if (keys.some((k) => tk.includes(k))) return t;
  }
  for (const t of league.teams) {
    const tn = norm(t.name);
    if (keys.some((k) => k.length > 4 && (tn.includes(k) || k.includes(tn)))) return t;
  }
}

export function teamEvents(league: LiveLeague | undefined, teamId: string) {
  if (!league) return { fixtures: [] as LiveEvent[], results: [] as LiveEvent[] };
  const mine = (e: LiveEvent) => e.home.id === teamId || e.away.id === teamId;
  return { fixtures: league.fixtures.filter(mine), results: league.results.filter(mine).reverse() };
}

export function allFixtures(limit = 12) {
  return liveLeagues()
    .flatMap((l) => l.fixtures.map((e) => ({ ...e, league: l.name, leagueSlug: l.slug })))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function rowFor(league: LiveLeague | undefined, teamId: string) {
  return league?.groups.flatMap((g) => g.rows).find((r) => r.teamId === teamId);
}

export const zoneClass = (note: string | null) => {
  if (!note) return '';
  const n = note.toLowerCase();
  if (n.includes('champions league')) return 'z-ucl';
  if (n.includes('europa') || n.includes('conference') || n.includes('libertadores') || n.includes('playoff')) return 'z-uel';
  if (n.includes('relegation')) return 'z-rel';
  return '';
};

export const fmtDate = (iso: string) => new Date(iso).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) + ' UTC';
export const fmtDay = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

import managersJson from '../data/managers.json';
const validCoach = (n?: string | null) => !!n && n.length <= 45 && !/[|=\[\]{}<>]|\bago\b|founded|https?:|\d{3,}|^(vacant|tba|tbd|none)$/i.test(n.trim());
export const liveManager = (leagueSlug?: string, teamId?: string): { name: string | null; wiki: string } | undefined => {
  const e = leagueSlug && teamId ? (managersJson as Record<string, Record<string, { name: string | null; wiki: string }>>)[leagueSlug]?.[teamId] : undefined;
  return e && validCoach(e.name) ? e : undefined;
};
