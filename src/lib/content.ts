import { getCollection, type CollectionEntry } from 'astro:content';

export const slugOf = (e: { id: string }) => e.id.replace(/\.md$/, '');

export async function maps() {
  const [players, managers, clubs, nations, leagues, tactics, tournaments] = await Promise.all([
    getCollection('players'), getCollection('managers'), getCollection('clubs'), getCollection('nations'), getCollection('leagues'), getCollection('tactics'), getCollection('tournaments'),
  ]);
  const m = <T extends { id: string }>(arr: T[]) => new Map(arr.map((e) => [slugOf(e), e]));
  return { players, managers, clubs, nations, leagues, tactics, tournaments, player: m(players), manager: m(managers), club: m(clubs), nation: m(nations), league: m(leagues), tactic: m(tactics), tournament: m(tournaments) };
}

export const titleCase = (slug: string) => slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export function link<T extends CollectionEntry<any>>(map: Map<string, T>, slug: string, base: string) {
  const e = map.get(slug);
  return e ? { href: `${base}/${slug}`, label: (e.data as any).name as string, exists: true } : { href: `${base}/${slug}`, label: titleCase(slug), exists: false };
}
