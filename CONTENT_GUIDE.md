# Pitch Atlas — Content Guide

Pitch Atlas is a Markdown-driven football encyclopedia built with Astro. Every page is one
Markdown file in `src/content/<collection>/<slug>.md` with YAML frontmatter validated by
`src/content.config.ts`. Add a file → the page exists and is linked automatically.

Live data (standings, fixtures, results, badges) comes from `src/data/live/*.json`
(`npm run refresh`, TheSportsDB). Current squads and managers come from
`src/data/squads/*.json` (`npm run refresh:squads`, Wikipedia). Editorial content is written by hand.

## Ground truth as of 7 November 2026 (do NOT contradict these)

- **2026 World Cup** (USA/Canada/Mexico, 48 teams): **Spain** beat **Argentina 1-0 a.e.t.** in the final,
  19 July 2026, MetLife Stadium — Ferran Torres 106'. Enzo Fernández was sent off. Spain's knockout run:
  Austria, Portugal, France (semi), Argentina. Argentina beat England in the other semi. England beat France
  6-4 for third place. Golden Ball Rodri, Golden Boot Kylian Mbappé (10), Golden Glove Unai Simón (7 clean
  sheets), Best Young Player Pau Cubarsí. Spain's second title (after 2010).
- **2025-26 champions**: Premier League **Arsenal** (first title in 22 years, Mikel Arteta); La Liga **Barcelona**
  (2nd straight, 29th); Serie A **Inter** (Cristian Chivu); Bundesliga **Bayern Munich**; Ligue 1 **PSG**
  (5th straight, 14th); **Champions League PSG** beat Arsenal 4-3 on penalties after 1-1 (Havertz 6',
  Dembélé pen) in Budapest, 30 May 2026 — PSG retained the trophy. WSL **Manchester City** (first since 2016).
  NWSL 2025 **Gotham FC**. UEFA Women's Champions League 2025-26 **Barcelona** (4th title, final in Oslo).
  2026 FIFA Women's Champions Cup **Arsenal**.
- **Ballon d'Or 2026** (26 Oct 2026, London Palladium): **Harry Kane** (73 goals in 2025-26; first English
  winner since Owen 2001), ahead of Mbappé and Lamine Yamal. Women's: **Alexia Putellas** (3rd). Kopa: Lamine
  Yamal (3rd straight). Women's Kopa: Vicky López. Sócrates Award: Bukayo Saka.
- **Premier League managers 2026-27**: Arsenal Mikel Arteta; Aston Villa Unai Emery; Bournemouth Marco Rose;
  Brentford Keith Andrews; Brighton Fabian Hürzeler; Chelsea **Xabi Alonso** (from July 2026, after Liam
  Rosenior who had replaced Enzo Maresca); Coventry City Frank Lampard (promoted); Crystal Palace Pierre Sage;
  Everton David Moyes; Fulham Álvaro Arbeloa; Hull City Sergej Jakirović (promoted via play-offs);
  Ipswich Town Gary O'Neil (promoted; McKenna stepped down); Leeds Daniel Farke; Liverpool **Andoni Iraola**
  (replaced Arne Slot, June 2026); Manchester City **Enzo Maresca** (Pep Guardiola left summer 2026 after
  10 years and 20 trophies); Manchester United **Michael Carrick** (head coach since 13 Jan 2026, Ruben
  Amorim sacked); Newcastle **Matthias Jaissle** (from 5 Aug 2026, Eddie Howe left); Nottingham Forest
  Oliver Glasner; Sunderland Régis Le Bris; Tottenham **Roberto De Zerbi**. Relegated in 2025-26: Burnley,
  Wolves, West Ham.
- **Other club managers 2026-27**: Real Madrid **José Mourinho** (returned 13 July 2026, contract to 2029;
  Xabi Alonso left mid-season 2025-26); Barcelona Hansi Flick; Juventus Luciano Spalletti; Bayern Vincent
  Kompany; Dortmund Niko Kovač; Leverkusen **Carles Martínez Novell** (from 1 July 2026, ex-Toulouse; Kasper Hjulmand sacked after one season); RB Leipzig Ole Werner; Lyon Jorge Maciel (Paulo Fonseca left Lyon for Sporting CP on 4 Nov 2026); Lazio Gennaro Gattuso;
  Como Cesc Fàbregas; Genoa Daniele De Rossi; Monza Ivan Jurić; Parma Carlos Cuesta; Lecce Eusebio Di
  Francesco. Fiorentina sacked Fabio Grosso (Sep 2026); Venezia sacked Stroppa (Oct 2026); Osasuna sacked
  Luis Miguel Ramis (12 Oct 2026). Inter: Cristian Chivu. AC Milan: Ruben Amorim. Napoli: Massimiliano Allegri. Roma: Gian Piero Gasperini. Atalanta: Maurizio Sarri. Marseille: Bruno Genesio. Monaco: Filipe Luís. Lille: Davide Ancelotti. Al Nassr: Ange Postecoglou. Al Hilal: Simone Inzaghi. Inter Miami: Kily González. Flamengo: Leonardo Jardim. Fenerbahçe: Emre Belözoğlu (from 3 Nov 2026). PSG: Luis Enrique (3 European Cups as a coach).
- **National coaches**: France **Zinedine Zidane** (from 28 July 2026, replaced Deschamps); Germany **Jürgen
  Klopp** (from 24 July 2026, after early WC exit); Portugal **Jorge Jesus** (replaced Roberto Martínez);
  Scotland Sébastien Pocognoli; Italy **Roberto Mancini** (second spell, from 28 July 2026; Gennaro Gattuso resigned in April 2026 after Italy lost the World Cup play-off to Bosnia and Herzegovina on penalties and did not qualify, then took the Lazio job in June 2026); Spain Luis de la Fuente (extended after WC win);
  Brazil Carlo Ancelotti; England Thomas Tuchel; Argentina Lionel Scaloni (contract to Dec 2026, future
  unresolved in Nov 2026).
- **Summer 2026 transfers**: Bradley Barcola PSG→Liverpool (~€125m); Yan Diomande Leipzig→Real Madrid
  (~€125m); Morgan Rogers Aston Villa→Chelsea (£117m, British record); Sandro Tonali Newcastle→Tottenham
  (~£100m); Andrey Santos Chelsea→Man Utd (£48m); Alexander Isak joined Liverpool in 2025. Manchester City
  spent ~£458m. Window closed 1 Sep 2026.

- **More summer 2026 moves (verified)**: Rodri Man City→Barcelona (18 Aug 2026, ~€75m, No.16); Enzo Fernández
  Chelsea→Man City (1 Sep 2026, £125m, joint British record with Isak); Mohamed Salah left Liverpool as a free agent
  (442 apps, 257 goals) and joined Trabzonspor (6 Aug 2026, No.10); Bruno Guimarães Newcastle→Arsenal (8 Aug 2026,
  ~£75m); Anthony Gordon Newcastle→Barcelona (29 May 2026, ~€80m); Ollie Watkins Aston Villa→Al Hilal (30 Aug 2026,
  ~£50m) with Nicolas Jackson (£65m) replacing him at Villa; Omar Marmoush Man City→Tottenham (loan with obligation,
  27 Aug 2026); Savinho to Tottenham; Rasmus Højlund to Napoli permanently (June 2026); Jack Grealish second loan at
  Everton; Donnarumma, Guéhi, Elliot Anderson, Semenyo and Cherki at Man City; Araújo, Ekitike at Liverpool;
  Garnacho and Goretzka at Aston Villa; Denzel Dumfries at Real Madrid; Son Heung-min at LAFC (since Aug 2025).
  Manchester United made their worst start in 40 years (6 pts from 6) and went out of the League Cup to Brighton;
  Carrick confirmed Bruno Fernandes as captain on 29 Oct 2026. Real Madrid went out of the 2025-26 Champions League
  in the quarter-finals. Napoli (Allegri) went top of Serie A in late October 2026.
- **Also verified**: Robert Lewandowski→Chicago Fire (29 Jun 2026); Antoine Griezmann→Orlando City (July 2026);
  Ferran Torres→PSG (No.9); Karim Adeyemi→Barcelona (23 Jul 2026, ~€22m); Rafael Leão→Galatasaray; Nick Woltemade
  Newcastle→Juventus (loan, 2 Sep 2026); Luka Modrić extended at AC Milan to June 2027 (Milan coach Ruben Amorim,
  5th in 2025-26); Manuel Neuer extended one year at Bayern and retired from Germany after the World Cup round-of-32
  loss to Paraguay; Rodrygo (Real Madrid) out with an ACL injury from March 2026 until early 2027; Christian Pulisic
  extended at Milan to 2031; Raphinha is Barcelona captain; Xavi Simons (Tottenham) out with an ACL injury until
  2027; Karim Benzema's Al Ittihad contract ended in summer 2026 and his next move is unconfirmed.

Anything that happened after June 2026 that is not listed here must be verified with a web search before
being stated as fact. If it cannot be verified, phrase it as "as of the 2025-26 season".

## Slug rules (links depend on these)

- Lowercase kebab-case, ASCII only (ñ→n, é→e, ø→o, ü→u). File name = slug.
- Players: common name — `lionel-messi`, `cristiano-ronaldo`, `lamine-yamal`, `kylian-mbappe`, `erling-haaland`,
  `jude-bellingham`, `harry-kane`, `mohamed-salah`, `rodri`, `pedri`, `vinicius-junior`, `bukayo-saka`,
  `pele`, `diego-maradona`, `johan-cruyff`, `zinedine-zidane`, `ronaldo-nazario`, `ronaldinho`.
- Managers: `pep-guardiola`, `jose-mourinho`, `mikel-arteta`, `xabi-alonso`, `luis-enrique`, `carlo-ancelotti`,
  `alex-ferguson`, `jurgen-klopp`, `zinedine-zidane-manager` (person who is both player and manager gets
  `-manager` suffix in the managers collection).
- Clubs: `arsenal`, `liverpool`, `manchester-united`, `manchester-city`, `chelsea`, `tottenham-hotspur`,
  `newcastle-united`, `aston-villa`, `real-madrid`, `barcelona`, `atletico-madrid`, `athletic-bilbao`,
  `sevilla`, `real-betis`, `real-sociedad`, `villarreal`, `valencia`, `inter-milan`, `ac-milan`, `juventus`,
  `napoli`, `roma`, `lazio`, `atalanta`, `fiorentina`, `bayern-munich`, `borussia-dortmund`,
  `bayer-leverkusen`, `rb-leipzig`, `eintracht-frankfurt`, `vfb-stuttgart`, `paris-saint-germain`,
  `marseille`, `lyon`, `monaco`, `lille`, `ajax`, `psv-eindhoven`, `feyenoord`, `benfica`, `porto`,
  `sporting-cp`, `celtic`, `rangers`, `galatasaray`, `fenerbahce`, `al-nassr`, `al-hilal`, `al-ittihad`,
  `al-ahli`, `inter-miami`, `la-galaxy`, `flamengo`, `palmeiras`, `botafogo`, `boca-juniors`, `river-plate`,
  `mumbai-city`, `mohun-bagan`, `bengaluru-fc`. Women's clubs: `barcelona-women`, `chelsea-women`,
  `arsenal-women`, `manchester-city-women`, `lyon-women`, `gotham-fc`, `wolfsburg-women`, `bayern-munich-women`.
- Leagues: `premier-league`, `la-liga`, `serie-a`, `bundesliga`, `ligue-1`, `eredivisie`, `primeira-liga`,
  `scottish-premiership`, `super-lig`, `mls`, `liga-mx`, `brasileirao`, `argentine-primera`,
  `saudi-pro-league`, `j1-league`, `indian-super-league`, `champions-league`, `wsl`, `nwsl`, `liga-f`,
  `frauen-bundesliga`, `d1-feminine`.
- Nations: `spain`, `argentina`, `france`, `england`, `brazil`, `germany`, `portugal`, `netherlands`, `italy`,
  `belgium`, `croatia`, `uruguay`, `colombia`, `mexico`, `united-states`, `canada`, `japan`, `south-korea`,
  `morocco`, `senegal`, `nigeria`, `egypt`, `australia`, `iran`, `saudi-arabia`, `india`. Women's teams:
  `spain-women`, `united-states-women`, `england-women`, etc.
- Tournaments: `world-cup`, `womens-world-cup`, `olympics-men`, `olympics-women`, `euro`, `womens-euro`,
  `copa-america`, `afcon`, `asian-cup`, `gold-cup`, `champions-league-history`, `europa-league`,
  `club-world-cup`, `womens-champions-league`, `copa-libertadores`, `nations-league`.
- Tactics: `positional-play`, `gegenpressing`, `tiki-taka`, `catenaccio`, `total-football`,
  `counter-attacking`, `low-block`, `back-three`, `inverted-full-backs`, `false-nine`, `box-midfield`,
  `relationism`, `direct-play`, `high-line`, `set-pieces`, `pressing-traps`.

## Style rules

- Write as a knowledgeable, warm football editor. Plain English, specific facts (dates, scores, names),
  no filler. British spelling is fine. No em-dashes in frontmatter strings (use commas/colons).
- Every page body uses `##` headings. Link to other pages with relative site paths:
  `[Lionel Messi](/players/lionel-messi)`, `[Barcelona](/clubs/barcelona)`, `[Pep Guardiola](/managers/pep-guardiola)`,
  `[World Cup](/tournaments/world-cup)`, `[positional play](/tactics/positional-play)`, `[Spain](/nations/spain)`.
  Link generously; a link to a page that does not exist yet simply 404s, so prefer slugs from the lists above.
- Video links: never invent YouTube video IDs. Use YouTube search URLs:
  `https://www.youtube.com/results?search_query=Lionel+Messi+best+goals` and, where helpful, official
  channels (`https://www.youtube.com/@premierleague`, `@LaLiga`, `@SerieA`, `@Bundesliga`, `@ligue1`,
  `@FIFA`, `@UEFA`, `@Olympics`). Each player should have 3-5 video links (best goals, skills, a famous
  match, evolution/tactical breakdown).
- Frontmatter strings containing colons or quotes must be double-quoted. YAML must be valid.

## Frontmatter templates

### players/<slug>.md
```yaml
---
name: Lionel Messi
fullName: Lionel Andrés Messi
nationality: Argentina
born: 1987-06-24
position: Right winger / playmaker
foot: Left
height: 1.70 m
status: active            # active | retired
gender: men               # men | women
currentClub: inter-miami  # club slug (omit if retired)
currentClubName: Inter Miami
nationalTeam: argentina   # nation slug
number: 10
summary: One-sentence hook (max ~200 chars).
style: One paragraph on how he plays (tempo, movement, decision-making, signature actions).
tags: [playmaker, dribbler, free-kicks, left-footed]
career:
  - { team: Barcelona, years: "2004-2021", apps: 778, goals: 672 }
  - { team: Paris Saint-Germain, years: "2021-2023", apps: 75, goals: 32 }
  - { team: Inter Miami, years: "2023-", apps: 80, goals: 60, note: "as of Nov 2026" }
honours: ["World Cup 2022", "Copa América 2021, 2024", "8x Ballon d'Or", "4x Champions League"]
videos:
  - { title: "Best goals", url: "https://www.youtube.com/results?search_query=Lionel+Messi+best+goals" }
related: [cristiano-ronaldo, xavi, andres-iniesta]
---
## Overview
## Early life and breakthrough
## Peak years
## How he plays            (style, strengths, weaknesses, signature moves)
## Evolution               (how the game changed over the career: positions, roles, body, tempo)
## Best plays and moments  (bulleted list of specific goals/matches with year and competition; link videos)
## Legacy / Current situation
```

### managers/<slug>.md
```yaml
---
name: Pep Guardiola
nationality: Spain
born: 1971-01-18
status: active
currentTeam: "Without a club"       # or club/nation name
currentTeamSlug: manchester-city     # optional
currentTeamType: club                # club | nation
formation: "4-3-3 / 3-2-5 in possession"
philosophy: positional-play          # tactics slug
summary: One-sentence hook.
career:
  - { team: Barcelona B, years: "2007-2008" }
  - { team: Barcelona, years: "2008-2012", note: "14 trophies incl. 2 Champions Leagues" }
honours: ["3x Champions League", "6x Premier League"]
tactics: [positional-play, inverted-full-backs, false-nine]
videos: [{ title: "Tactics explained", url: "https://www.youtube.com/results?search_query=Pep+Guardiola+tactics+explained" }]
---
## Biography
## Playing career
## Coaching career
## Tactical identity        (formation, build-up, pressing, set pieces, how it evolved)
## Achievements
## Storyline                 (the narrative: rivalries, turning points, what defines them now)
```

### clubs/<slug>.md
```yaml
---
name: Liverpool
fullName: Liverpool Football Club
league: premier-league
country: England
city: Liverpool
founded: 1892
stadium: Anfield
capacity: 61276
nicknames: [The Reds]
colors: ["#C8102E", "#FFFFFF"]
manager: andoni-iraola        # manager slug
tier: elite                   # elite | major | standard
summary: One-sentence hook.
honours:
  - { title: League titles, count: 20, latest: "2024-25" }
  - { title: Champions League, count: 6, latest: "2019" }
legends: [kenny-dalglish, steven-gerrard, ian-rush, mohamed-salah]      # player slugs
currentStars: [mohamed-salah, alexander-isak, bradley-barcola]           # player slugs
rivals: [manchester-united, everton]                                     # club slugs
positions:                                   # season-by-season league finishes, most recent first
  - { season: "2025-26", position: 3 }
  - { season: "2024-25", position: 1, note: "Champions" }
videos: [{ title: "Greatest moments", url: "https://www.youtube.com/results?search_query=Liverpool+FC+greatest+moments" }]
---
## History                    (founding, eras, great sides, lows and rebuilds)
## Trajectory                 (how the club moved between positions/divisions over the decades)
## Players the club produced  (academy products and signings who became greats; link slugs)
## Identity and playing style (current manager's approach, link tactics)
## Rivalries
## Current situation          (2026-27: manager, ambitions, key signings, as of Nov 2026)
```

### nations/<slug>.md
```yaml
---
name: Spain
code: ESP
confederation: UEFA
gender: men
nickname: La Roja
coach: Luis de la Fuente
coachSlug: luis-de-la-fuente
fifaRanking: 1
captain: Rodri
summary: One-sentence hook.
honours: ["World Cup 2010, 2026", "Euro 1964, 2008, 2012, 2024", "Nations League 2023"]
worldCupBest: "Winners (2010, 2026)"
keyPlayers: [rodri, lamine-yamal, pedri, pau-cubarsi, unai-simon]
legends: [xavi, andres-iniesta, iker-casillas, raul]
style: One paragraph on the national style/philosophy.
---
## History
## Philosophy and style
## Tournament record         (table of World Cup / continental results by edition)
## Current squad and setup   (as of Nov 2026)
## Legends
```

### tournaments/<slug>.md
```yaml
---
name: FIFA World Cup
type: world            # world | olympic | continental | club
gender: men
organiser: FIFA
founded: 1930
currentChampion: Spain
mostTitles: "Brazil (5)"
nextEdition: "2030 (Spain, Portugal, Morocco; centenary matches in Uruguay, Argentina, Paraguay)"
summary: One-sentence hook.
order: 1
editions:
  - { year: "2026", host: "USA / Canada / Mexico", winner: Spain, runnerUp: Argentina, score: "1-0 a.e.t.", note: "Ferran Torres 106'" }
  - { year: "2022", host: Qatar, winner: Argentina, runnerUp: France, score: "3-3 (4-2 pens)" }
---
## History
## Format
## Greatest editions and moments
## Records
## Latest edition             (detailed recap)
## Next edition
```

### leagues/<slug>.md
```yaml
---
name: Premier League
shortName: EPL
country: England
confederation: UEFA
gender: men
tier: 1
founded: 1992
teams: 20
liveSlug: premier-league       # key into src/data/live (omit if no live data)
currentChampion: Arsenal
mostTitles: "Manchester United (13)"
format: "20 teams, 38 rounds, top 5 to Champions League, bottom 3 relegated"
summary: One-sentence hook.
order: 1
---
## Overview
## History and eras
## Style and tactical trends
## 2026-27 season storylines
```

### tactics/<slug>.md
```yaml
---
name: Gegenpressing
formation: "4-3-3 / 4-2-3-1"
era: "2008-present"
summary: One-sentence hook.
exponents: [jurgen-klopp, ralf-rangnick, julian-nagelsmann]   # manager slugs
related: [pressing-traps, counter-attacking]
order: 2
---
## The idea
## How it works on the pitch   (phases, triggers, roles)
## Origins and evolution
## Who does it best            (link managers and clubs)
## Weaknesses and counters
```
