import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const md = (base: string) => glob({ pattern: '**/*.md', base });

const link = z.object({ title: z.string(), url: z.string() });
const dateish = z.union([z.string(), z.date()]).transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v)));

const leagues = defineCollection({
  loader: md('./src/content/leagues'),
  schema: z.object({
    name: z.string(),
    shortName: z.string().optional(),
    country: z.string(),
    confederation: z.string().optional(),
    gender: z.enum(['men', 'women']).default('men'),
    tier: z.number().default(1),
    founded: z.number().optional(),
    teams: z.number().optional(),
    liveSlug: z.string().optional(),
    currentChampion: z.string().optional(),
    mostTitles: z.string().optional(),
    format: z.string().optional(),
    summary: z.string(),
    order: z.number().default(100),
  }),
});

const clubs = defineCollection({
  loader: md('./src/content/clubs'),
  schema: z.object({
    name: z.string(),
    fullName: z.string().optional(),
    league: z.string(),
    country: z.string(),
    city: z.string().optional(),
    founded: z.number().optional(),
    stadium: z.string().optional(),
    capacity: z.number().optional(),
    nicknames: z.array(z.string()).default([]),
    colors: z.array(z.string()).default([]),
    sportsdbId: z.string().optional(),
    manager: z.string().optional(),
    summary: z.string(),
    honours: z.array(z.object({ title: z.string(), count: z.number(), latest: z.string().optional() })).default([]),
    legends: z.array(z.string()).default([]),
    currentStars: z.array(z.string()).default([]),
    rivals: z.array(z.string()).default([]),
    positions: z.array(z.object({ season: z.string(), position: z.number(), competition: z.string().optional(), note: z.string().optional() })).default([]),
    videos: z.array(link).default([]),
    tier: z.enum(['elite', 'major', 'standard']).default('standard'),
  }),
});

const players = defineCollection({
  loader: md('./src/content/players'),
  schema: z.object({
    name: z.string(),
    fullName: z.string().optional(),
    nationality: z.string(),
    born: dateish.optional(),
    died: dateish.optional(),
    position: z.string(),
    foot: z.string().optional(),
    height: z.string().optional(),
    status: z.enum(['active', 'retired']).default('active'),
    gender: z.enum(['men', 'women']).default('men'),
    currentClub: z.string().optional(),
    currentClubName: z.string().optional(),
    nationalTeam: z.string().optional(),
    number: z.number().optional(),
    summary: z.string(),
    style: z.string().optional(),
    tags: z.array(z.string()).default([]),
    career: z.array(z.object({ team: z.string(), years: z.string(), apps: z.number().optional(), goals: z.number().optional(), note: z.string().optional() })).default([]),
    honours: z.array(z.string()).default([]),
    videos: z.array(link).default([]),
    related: z.array(z.string()).default([]),
  }),
});

const managers = defineCollection({
  loader: md('./src/content/managers'),
  schema: z.object({
    name: z.string(),
    nationality: z.string(),
    born: dateish.optional(),
    died: dateish.optional(),
    status: z.enum(['active', 'retired']).default('active'),
    currentTeam: z.string().optional(),
    currentTeamSlug: z.string().optional(),
    currentTeamType: z.enum(['club', 'nation']).default('club'),
    formation: z.string().optional(),
    philosophy: z.string().optional(),
    summary: z.string(),
    career: z.array(z.object({ team: z.string(), years: z.string(), note: z.string().optional() })).default([]),
    honours: z.array(z.string()).default([]),
    tactics: z.array(z.string()).default([]),
    videos: z.array(link).default([]),
  }),
});

const tournaments = defineCollection({
  loader: md('./src/content/tournaments'),
  schema: z.object({
    name: z.string(),
    type: z.enum(['world', 'olympic', 'continental', 'club']),
    gender: z.enum(['men', 'women']).default('men'),
    organiser: z.string().optional(),
    founded: z.number().optional(),
    currentChampion: z.string().optional(),
    mostTitles: z.string().optional(),
    nextEdition: z.string().optional(),
    summary: z.string(),
    editions: z.array(z.object({ year: z.string(), host: z.string().optional(), winner: z.string(), runnerUp: z.string().optional(), score: z.string().optional(), note: z.string().optional() })).default([]),
    order: z.number().default(100),
  }),
});

const nations = defineCollection({
  loader: md('./src/content/nations'),
  schema: z.object({
    name: z.string(),
    code: z.string(),
    confederation: z.string(),
    gender: z.enum(['men', 'women']).default('men'),
    nickname: z.string().optional(),
    coach: z.string().optional(),
    coachSlug: z.string().optional(),
    fifaRanking: z.number().optional(),
    captain: z.string().optional(),
    summary: z.string(),
    honours: z.array(z.string()).default([]),
    worldCupBest: z.string().optional(),
    keyPlayers: z.array(z.string()).default([]),
    legends: z.array(z.string()).default([]),
    style: z.string().optional(),
  }),
});

const tactics = defineCollection({
  loader: md('./src/content/tactics'),
  schema: z.object({
    name: z.string(),
    formation: z.string().optional(),
    era: z.string().optional(),
    summary: z.string(),
    exponents: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    order: z.number().default(100),
  }),
});

export const collections = { leagues, clubs, players, managers, tournaments, nations, tactics };
