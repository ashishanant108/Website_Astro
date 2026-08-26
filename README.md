# Yoga Shakti — Website (Astro)

One Astro project that starts as the **link-in-bio hub** (homepage) and grows into the full site
(About, blog, member login) without a rebuild. Static output → deploy on GitHub Pages / Netlify.

## Run locally
```bash
npm install
npm run dev        # http://localhost:4321  (live preview)
npm run build      # outputs static site to ./dist
npm run preview    # serve the built ./dist
```

## Structure
```
src/
  data/site.js         ← EDIT ME: links, socials, forms, GA_ID, WEBAPP_URL, ?src map
  layouts/Base.astro   ← shared <head>, fonts/icons, consent banner, client bootstrap
  scripts/site-client.js ← ?src tracking, click logging, consent + GA
  styles/global.css    ← brand tokens + hub + page styles
  pages/
    index.astro        ← the bio hub (homepage)
    about.astro
    privacy.astro
public/
  assets/logo.png
  CNAME                ← custom domain (ashishanant.com)
```

## Adding things
- **A hub link/offer:** add a line in `src/data/site.js → links` (a `type:"form"` needs a `forms` entry).
- **A new page:** drop `src/pages/whatever.astro` (uses `Base`). It's live at `/whatever/`.
- **A blog:** add `src/content/` + `src/pages/blog/` (Astro Markdown) — planned next.
- **Member login later:** add an island + Supabase; the static pages stay static (SEO safe).

## ?src tracking
Post the hub URL everywhere, changing only the `?src` tag (e.g. `/?src=ig-profile`, `/?src=youtube`).
It maps to your funnel SOURCE and rides into the Google Form's hidden Reference ID — no form edits.

## Turn analytics on
Set `GA_ID` (and optionally `WEBAPP_URL`) in `src/data/site.js`. Blank = analytics simply stays off.

## Deploy (GitHub Pages)
Build (`npm run build`) and publish `./dist` (the `CNAME` keeps the custom domain). A GitHub Action can
auto-build on push — ask and I'll add the workflow.
