# Horoscope Daily

A daily horoscope web app for all 12 zodiac signs with element-based color themes, sign detail overlays, and AI-generated horoscopes that refresh every day automatically.

---

## How It Works

The app has two connected repositories that work together:

### This Repo — `SNoeCode.github.io`

The frontend app. Built with HTML, CSS, and vanilla JavaScript. Reads from `horoscope.json` at runtime using the browser's `fetch()` API.

### Scraper Repo — `horoscope_scraper`

A Python automation repo with a GitHub Action that runs every day at 4am UTC. It calls the **Groq AI API** to generate fresh, original horoscope text for all 12 signs, saves them to `horoscope.json`, then pushes that file directly into this repo using a Personal Access Token.

```
Groq API 
     ↓
update_horoscope.py generates 12 horoscopes
     ↓
horoscope.json saved in horoscope_scraper repo
     ↓
GitHub Action pushes horoscope.json → SNoeCode.github.io
     ↓
Frontend reads horoscope.json on button click
```

---

## Tech Stack

- **HTML5** - semantic structure, ARIA accessibility
- **CSS3** - responsive grid, element-based color themes, animations
- **Vanilla JavaScript** - fetch API, DOM manipulation, focus management

## Features

- 12 zodiac signs with images and date ranges
- Daily AI-generated horoscopes, refreshed every morning
- Element-based color themes fire, earth, water, and air signs each have unique colors
- 4 selectable page background themes (fire, earth, water, air)
- Sign detail overlay traits, strengths, weaknesses, lucky numbers, compatibility, and more
- Loading animations between interactions
- Accessible -  ESC to close, focus management
- Responsive - works on desktop, tablet, and mobile

---

## Horoscope Data

Horoscope text is **original AI-generated content** produced daily by the Groq API using the Llama 3.3 70B model. The content is generated fresh each day and is not copied or scraped from any third-party website. No attribution to external astrology sites is required.

The generation prompt is crafted per sign using each sign's elemental traits, producing unique and encouraging daily readings covering love, career, and personal growth.

---

## Repo Structure

```
SNoeCode.github.io/
├── index.html          # main app structure
├── styles.css          # all styling and responsive layout
├── script.js           # all app logic and interactivity
├── horoscope.json      # auto-updated daily by GitHub Action
├── zodiac.json         # static sign data (traits, symbols, etc.)
└── pictures/           # all media assets
    ├── rain.gif            # default background
    ├── video.gif           # loading animation
    ├── wheel.png           # nav color wheel icon
    ├── dev.png             # portfolio footer icon
    ├── linkedin.gif        # LinkedIn footer icon
    ├── github.gif          # GitHub footer icon
    ├── zodiac-signs/       # sign card images (.webp)
    ├── themes/             # element background gifs (fire, earth, water, air)
    └── season/             # sign season loading gifs (.webp)
```

---

## Automation Setup (horoscope_scraper repo)

The daily horoscope generation requires two secrets set in the `horoscope_scraper` repo:

| Secret           | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| `GROQ_API_KEY` | Free API key from groq.com                                  |
| `GH_PAT`       | GitHub Personal Access Token with write access to this repo |

The GitHub Action runs on this schedule:

```yaml
on:
  schedule:
    - cron: '0 6 * * *'   # every day at 6am UTC
  workflow_dispatch:        # can also be triggered manually
```

---

## Attributions

**Color wheel icon**
[Color wheel icons created by Color creator — Flaticon](https://www.flaticon.com/free-icons/color-wheel)

**Sign images**
Sourced from project assets in `pictures/zodiac-signs/`

**Fonts**

- [Shadows Into Light](https://fonts.google.com/specimen/Shadows+Into+Light) — Google Fonts
- [Lavishly Yours](https://fonts.google.com/specimen/Lavishly+Yours) — Google Fonts
- [Playwrite NZ](https://fonts.google.com/specimen/Playwrite+NZ) — Google Fonts

---

## Author

**Shanna Noe** — [SNoeCode](https://github.com/SNoeCode)
