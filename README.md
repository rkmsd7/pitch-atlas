# Pitch Atlas

A Markdown-driven football encyclopedia: leagues with live tables and fixtures, club histories and
current squads, player profiles with playing-style breakdowns and highlight links, manager profiles,
World Cup / Olympics / continental tournaments, men's and women's national teams, and the tactical
philosophies behind it all. Built with [Astro](https://astro.build) and deployed on Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
```

## Refresh live data

```bash
npm run refresh            # standings, fixtures, results, rosters (ESPN public API, ~3 min)
npm run refresh:managers   # current head coaches from Wikipedia infoboxes (~6 min, resumable)
npm run lint:content       # validate frontmatter; add --links to list missing link targets
npm run fix:frontmatter    # auto-quote YAML values that break parsing
```

Live JSON lives in `src/data/live/` and `src/data/managers.json` and is committed, so builds never
depend on a third-party API being up. Re-run the refresh scripts and push to update the deployed site.

## Add or edit content with Claude Code

Everything editorial is a Markdown file with YAML frontmatter under `src/content/`:

| Collection    | Folder                      | Page URL              |
|---------------|-----------------------------|-----------------------|
| leagues       | `src/content/leagues/`      | `/leagues/<slug>`     |
| clubs         | `src/content/clubs/`        | `/clubs/<slug>`       |
| players       | `src/content/players/`      | `/players/<slug>`     |
| managers      | `src/content/managers/`     | `/managers/<slug>`    |
| tournaments   | `src/content/tournaments/`  | `/tournaments/<slug>` |
| nations       | `src/content/nations/`      | `/nations/<slug>`     |
| tactics       | `src/content/tactics/`      | `/tactics/<slug>`     |

Add a file and the page, listings, search index and cross-links appear automatically. The schemas
are in `src/content.config.ts`; the full authoring guide with templates and slug conventions is
`CONTENT_GUIDE.md`. Clubs in a tracked league that have no Markdown file still get a live page
(`/clubs/<league>--<espn-slug>`) with squad, results and table position.

A good prompt for Claude Code: *"Read CONTENT_GUIDE.md, then write src/content/players/<slug>.md for
<player> following the players template; verify current club with a web search."*
