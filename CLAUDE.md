# CLAUDE.md — AI Agent Instructions

This is Rohit Ravikumar's personal portfolio website — a static HTML/CSS site recreated from a Wix original, designed to be hosted on GitHub Pages or Cloudflare Pages.

## Project structure

```
index.html    — all page content (single-page site)
styles.css    — all styles; uses CSS custom properties (variables) at the top
README.md     — human-readable deploy/edit guide for the site owner
CLAUDE.md     — this file
images/       — compressed WebP images used by the page
images/originals/ — full-size source files; never referenced by the page
```

## Key design decisions

- **Single HTML file** — intentional. Rohit should be able to find and edit any text by searching `index.html`.
- **Images are hosted locally** in `images/` as WebP (about 1 MB total), with no JPEG/PNG fallback. Full-size originals live in `images/originals/` and are only a source for re-exporting. Do not hotlink from `static.wixstatic.com`.
- **Only the two hero photos are responsive** (`srcset` at 640/1024/1600/2000 px). They are cropped by `object-fit: cover` and render about 75vw wide on desktop, which is why `sizes` says `75vw` rather than the grid column width. Every other image is a single file.
- **Every `<img>` has `width` and `height`** matching its file, to prevent layout shift. Keep them in sync when swapping a file.
- **No build step, no framework, no bundler.** Keep it that way unless the owner explicitly asks for one.
- **CSS variables** in `:root` at the top of `styles.css` control all colours and fonts. Change those first when restyling.

## Design tokens

| Variable | Value | Role |
|---|---|---|
| `--color-cream` | `#FFF6EF` | main background |
| `--color-red` | `#8B0000` | Background section + footer |
| `--color-tan-lt` | `#C7BCB4` | Film-making collaborative + Skills |
| `--color-tan-md` | `#8E8279` | Film-making personal projects |
| `--color-text` | `#2D0808` | body + headings |
| `--font-title` | `'Azeret Mono'` | site title only |
| `--font-head` | `'DM Sans'` | section headings |
| `--font-body` | `'Questrial'` | all body copy |

## Section map (index.html)

Each section has an HTML comment `<!-- ═══ SECTION NAME ═══ -->` identifying it.

| Section | id / class | Background |
|---|---|---|
| Header | `.site-header` | cream |
| About Me | `#about` | cream |
| Background / Timeline | `#background` | dark red |
| Hero Photos | `.hero-photos` | none (images) |
| Showcase Gallery | `#showcase` | cream |
| Photography | `#photography` | cream |
| Film-making Collaborative | `#projects` | tan-light |
| Film-making Personal | *(no id)* | tan-medium |
| Writing & Blogs | `#writing` | cream |
| Skills | `#skills` | tan-light |
| Footer | `<footer>` | dark red |

## Common editing tasks

**Add a timeline entry (Background section):**
Copy an existing `<div class="timeline-item">` block and update the date, title, org and description.

**Add a gallery photo:**
Add an `<img>` tag inside `.photo-collage`. For a 5th image, add a new column to the grid in `styles.css` (`.photo-collage` grid-template-columns).

**Add a film project:**
Copy a `<div class="project-block">` and update the badge year, title, description, and two project image `src` attributes.

**Change a social link URL:**
Find the `<footer>` and update the `href` on the relevant `<a>` tag.

**Replace or add an image:**
1. Put the full-size source in `images/originals/`
2. Export a WebP to `images/` at the width for its type: collage 800, channel 1000, project 960, icon 240; hero at 640, 1024, 1600 and 2000 (named `hero-name-WIDTH.webp`)
3. Set `src` (and `srcset` for hero photos) plus `width`/`height` on the `<img>` in `index.html`

## What NOT to do

- Do not add a JavaScript framework (React, Vue, etc.) unless the owner explicitly requests it.
- Do not introduce a build tool (Webpack, Vite, etc.) — the site deploys as raw files.
- Do not add a `<nav>` menu bar unless asked — the current single-page design matches the original.
- Do not change font imports without checking that Google Fonts alternatives look similar to the originals.

## Deployment target

**GitHub Pages** or **Cloudflare Pages** — both serve static files directly from a Git repo with no build step. See `README.md` for step-by-step deploy instructions.
