# Horoscope Daily

A daily horoscope web app for all 12 zodiac signs with element-based color themes, sign detail overlays, and AI-generated horoscopes that refresh every day automatically.

---

## How It Works

This Repo — `SNoeCode.github.io`

The frontend app. Built with HTML, CSS, and vanilla JavaScript. Reads from `horoscope.json` at runtime using the browser's `fetch()` API.

### Horoscope Generator Repo — `horoscope_generator`

A Python script run daily by GitHub Actions. It uses the Groq AI API to generate new horoscopes, updates , and pushes the file to the horoscope.json in the `SNoeCode.github.io` repo.

```
Groq API
     ↓
update_horoscope.py generates 12 horoscopes
     ↓
horoscope.json saved to GitHub Actions runner (temporary)
     ↓
Workflow copies & pushes horoscope.json → SNoeCode.github.io/main
     ↓
```

---

## Tech Stack

- **HTML5** - semantic structure and accessibility
- **CSS3** - responsive grid, element-based color themes, animations
- **Vanilla JavaScript** - fetch API, DOM manipulation, theme management

## Features

- 12 zodiac signs with images and date ranges
- Daily AI-generated horoscopes, refreshed every morning
- Element-based color themes fire, earth, water, and air signs each have unique colors
- 4 selectable page background themes (fire, earth, water, air)
- Sign detail overlay traits, strengths, weaknesses, lucky numbers, compatibility, and more
- Loading animations between interactions
- Responsive - works on desktop, tablet, and mobile
- Accessible - all images have alt text, close buttons included on all overlays

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

## Automation Setup — `horoscope_generator`

Daily horoscope generation is handled automatically via GitHub Actions. Two secrets must be configured in the `horoscope_generator` repo to make it work: a GitHub Personal Access Token and a Groq API key.

---

## Attributions

[Color Switch](https://icons8.com/icon/CPt6dvVSzIHn/color-switch) icon by [Icons8](https://icons8.com)

[GitHub](https://icons8.com/icon/v551nqGeHhGn/github) icon by [Icons8](https://icons8.com)

<a target="_blank" href="https://icons8.com/icon/Uj9DyJeLazL6/linkedin">LinkedIn</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

**Sign images and GIFs**

Sourced from project assets in `pictures/zodiac-signs/`

**Fonts**

- [Shadows Into Light](https://fonts.google.com/specimen/Shadows+Into+Light) — Google Fonts
- [Lavishly Yours](https://fonts.google.com/specimen/Lavishly+Yours) — Google Fonts
- [Playwrite NZ](https://fonts.google.com/specimen/Playwrite+NZ) — Google Fonts

---

## Author

**Shanna Noe** — [SNoeCode](https://github.com/SNoeCode)
