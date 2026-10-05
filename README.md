# Rohit Ravikumar — Personal Website

Static HTML/CSS site recreated from the original Wix site at [rohitravikumar.com](https://www.rohitravikumar.com/). Hostable on **GitHub Pages** or **Cloudflare Pages** for free — no Wix subscription needed.

---

## How to edit content

Everything lives in **`index.html`**. Each section has a comment block above it explaining what to change:

```
<!-- ═══ ABOUT ME ═══
     To edit: update the paragraph text below.
```

Open `index.html` in any text editor and search for the section you want to update.

### Common tasks

| Task | What to change |
|------|---------------|
| Update bio text | `#about` section — the `<p>` tags inside `.about-text` |
| Add a new job / education entry | Copy a `<div class="timeline-item">` block in `#background` |
| Change hero photos | `src="..."` on the two `<img>` tags inside `.hero-photos-grid` |
| Add gallery photos | Add `<img>` tags inside `.photo-collage` (and adjust CSS grid if needed) |
| Update film project | Edit text/images inside a `.project-block` in the personal projects section |
| Add a skill | Add a `<li>` inside `.skills-list` |
| Change social links | Update `href="..."` on each `<a>` in the `<footer>` |
| Change email | Update both the `href="mailto:..."` and the visible text in the footer |

---

## How to replace images

All images are stored in the `images/` folder and served with the site — nothing is loaded from Wix.

- `images/*.webp` — the compressed files the page actually loads (about 1 MB in total)
- `images/originals/` — the full-size originals (about 17 MB), kept as the source for re-exporting; the page never loads these

**To replace or add an image:**

1. Export the image as WebP at roughly the width listed below and place it in `images/`, e.g. `images/collage-sunset.webp`
2. In `index.html`, point the relevant `<img>` at it and update `width` and `height` to the file's pixel size:
   ```html
   src="images/collage-sunset.webp"
   width="800" height="533"
   ```

| Image type | File name prefix | Width |
|---|---|---|
| Hero photos | `hero-` | 640, 1024, 1600 and 2000 px (one file each, listed in `srcset`) |
| Collage photos | `collage-` | 800 px |
| Channel cards | `channel-` | 1000 px |
| Film project images | `project-` | 960 px |
| App icons | `icon-` | 240 px |

The two hero photos are the only images with several sizes; the browser picks one based on screen width. When replacing a hero photo, replace all four files.

---

## How to deploy

### GitHub Pages (free)

1. Push this folder to a GitHub repository
2. Go to the repo → **Settings → Pages**
3. Under **Source**, select `main` branch and `/ (root)` folder
4. Click **Save** — your site will be live at `https://<username>.github.io/<repo-name>/`

To use a **custom domain** (e.g. `rohitravikumar.com`):
- Add a `CNAME` file to this folder containing just `rohitravikumar.com`
- In your domain registrar (Cloudflare, Namecheap, etc.), point the domain's DNS to GitHub Pages (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

### Cloudflare Pages (free, faster)

1. Push this folder to a GitHub or GitLab repository
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Pages → Create a project**
3. Connect your GitHub/GitLab account and select the repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**

To use a **custom domain**, go to the Pages project → **Custom domains** → add your domain. If your domain's DNS is already on Cloudflare, it connects automatically.

---

## File structure

```
rohitravikumar/
├── index.html      ← all page content lives here
├── styles.css      ← all visual styles
├── README.md       ← this file
├── CLAUDE.md       ← instructions for AI-assisted editing
└── images/         ← compressed WebP images used by the page
    └── originals/  ← full-size source files (not loaded by the page)
```

---

## Fonts used

- **Azeret Mono** (900 weight) — the main "Rohit Ravikumar" title
- **DM Sans** — section headings
- **Questrial** — body text

All loaded from Google Fonts. No installation needed.

---

## Colors (for reference)

| Variable | Hex | Used for |
|----------|-----|---------|
| `--color-cream` | `#FFF6EF` | Page background, most sections |
| `--color-red` | `#8B0000` | Background/timeline section, footer |
| `--color-tan-lt` | `#C7BCB4` | Film-making collaborative, skills |
| `--color-tan-md` | `#8E8279` | Film-making personal projects |
| `--color-text` | `#2D0808` | All body and heading text |

To change the colour scheme, edit the `:root` block at the top of `styles.css`.
