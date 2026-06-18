# Brew & Co.

Single-page landing page for a specialty coffee brand. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools.

## Features

- CSR (Client-Side Rendering) — all logic runs in the browser, no server required
- Bilingual (EN / RU) with instant switch via nav button
- Custom cursor confined to hero section
- Hover-reveal photo effect (`clip-path: circle()`)
- Responsive layout with mobile burger menu and scroll lock
- CSS custom properties for theming
- Intersection Observer for scroll-triggered animations
- Google Maps iframe embed
- Custom scrollbar (WebKit + Firefox)

## Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | HTML5 |
| Styles | Vanilla CSS (5 files: variables, base, components, animations, responsive) |
| Scripts | Vanilla JS (2 files: translations, main) |
| Fonts | Cormorant Garamond / Manrope / IBM Plex Mono (Google Fonts) |
| Icons | Inline SVG |
| Map | Google Maps iframe (no API key needed) |

## Project Structure

```
Brew & Co./
├── index.html            # Entry point — loads CSS & JS
├── css/
│   ├── variables.css     # Colors, fonts, spacing tokens
│   ├── base.css          # Reset, container, section defaults
│   ├── components.css    # Nav, hero, menu, contacts, footer, cursor
│   ├── animations.css    # fadeUp keyframe for menu cards
│   └── responsive.css    # 768px breakpoint + reduced motion
├── js/
│   ├── translations.js   # EN / RU locale data + setLang()
│   └── main.js           # Cursor, nav, burger, observer, hover-reveal, filter
└── assets/
    ├── img/              # Menu product photos (PNG)
    ├── icon/             # Favicon (logo.png)
    └── anim/             # Hero video, first/poster frames, hover-reveal pair
```

## Deployment

Works out of the box on any static host:

1. Clone the repo
2. Open `index.html` in a browser=

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari / Chrome for Android

## Notes

- JS is loaded via plain `<script>` tags (no ES modules)
- All images are local; no external dependencies after initial load
- Google Maps iframe uses the legacy embed endpoint — no API key, no billing
- Language preference is persisted in `localStorage`

## Color Palette

| Token | Hex |
|-------|-----|
| --espresso | #24140F |
| --milk-foam | #F6EDE0 |
| --crema | #D8B98F |
| --cherry | #A84932 |
| --sage | #7E8A72 |
