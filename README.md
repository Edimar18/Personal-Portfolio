# Edimar Mosquida — Portfolio

A single-page Next.js portfolio built in a monochrome, premium-paper editorial
style: deep blacks, paper whites, hairline rules, and a subtle grain texture
across the whole page. No UI component libraries, no animation dependencies —
just Tailwind CSS and a small IntersectionObserver hook for scroll reveals.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.js       — fonts, global <html>/<body>
  page.js          — assembles all sections in order
  globals.css      — grain texture, hairline rules, placeholder "plate" patterns
components/
  Nav.jsx           — fixed top nav
  SectionIndex.jsx   — the right-edge scroll index (the page's signature element)
  Hero.jsx           — "PORTFOLIO" opening section
  Projects.jsx        — project grid with visual-proof plates
  Leadership.jsx       — leadership dossiers with photo plates
  Education.jsx
  SoftSkills.jsx
  Certificates.jsx
  Footer.jsx           — closing contact section
lib/
  data.js               — ALL site content lives here
```

## Before you publish: a content checklist

Everything below lives in `lib/data.js` unless noted, so you generally never
need to touch component code to update content.

1. **Portrait photo** — `components/Hero.jsx` currently shows a placeholder
   plate labeled "Replace with your portrait." Add an image to `/public/`
   (e.g. `/public/portrait.jpg`) and swap the placeholder `<div>` for a
   Next.js `<Image>` component.
2. **Project visuals** — each project card in `Projects.jsx` currently uses a
   generated CSS pattern (circuit / scanline / wireframe / halftone) instead
   of a real photo, since none were provided. To use a real screenshot or
   build photo: drop the image in `/public/projects/`, then replace the
   `<div className={plateClass[p.plate]} />` line for that card with an
   `<Image>` (or a background-image style pointing at your file).
3. **Project GitHub links** — all four projects currently point at
   `github.com/Edimar18` (your profile). Update `github` in `lib/data.js` to
   each project's actual repo URL once they're public.
4. **Leadership photos** — same pattern as projects: each card in
   `Leadership.jsx` has a halftone placeholder plate. Swap in a real photo
   from a workshop, meeting, or event when you have one.
5. **Bracketed placeholders** — search `lib/data.js` for `[` to find fields
   pulled straight from your resume that still need real values: your ISDA
   Chairperson start date, your PYCC role dates and achievements, and your
   expected graduation date.
6. **Certificates** — none were supplied, so the section currently renders
   empty "Add certificate" slots. Add real ones to the `certificates` array
   in `lib/data.js` as you earn them, in this shape:
   ```js
   { name: 'Certificate Name', org: 'Issuing Organization', date: 'Mon YYYY' }
   ```

## Deploying to Vercel

This is a stock Next.js App Router project, so it deploys to Vercel with no
extra configuration.

**Option A — via GitHub (recommended):**
1. Push this folder to a new GitHub repository.
2. Go to https://vercel.com/new, import the repository, and click Deploy.
   Vercel auto-detects Next.js — no settings to change.
3. Every future push to your main branch redeploys automatically.

**Option B — via the Vercel CLI:**
```bash
npm install -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # subsequent production deploys
```

## Notes

- Fonts (Archivo, Inter, JetBrains Mono) are self-hosted via `@fontsource`,
  so there's no runtime dependency on Google Fonts.
- The right-edge index, the page's signature element, tracks scroll position
  with an `IntersectionObserver` and is hidden below the `lg` breakpoint to
  keep mobile layouts clean.
- Reduced-motion preferences are respected globally in `globals.css`.
