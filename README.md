# emma-counselling-website

Website for Emma Rossouw, a private counsellor that offers online sessions to individual clients.

Built with [Astro](https://astro.build). Output is a fully static site — no server, no client-side
framework. The only JavaScript shipped to the browser is the mobile nav toggle and the contact-form
handler.

## Getting started

```bash
npm install
npm run dev      # local dev server with hot reload, http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
npm run check    # TypeScript + Astro template type checking
```

Deploy the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
On Netlify/Vercel, set the build command to `npm run build` and the publish directory to `dist`.

## Structure

```
src/
  pages/            One file per route. resources/[...slug].astro renders each article.
  layouts/
    BaseLayout.astro  <head>, meta/OG tags, JSON-LD, nav + footer wrapper.
  components/       Nav, Footer, PhotoHero, CtaBand.
  content/
    resources/      Article Markdown. Add a file here to publish a post.
  assets/images/    Source photos. Optimised at build time; never served as-is.
  styles/style.css  All styling.
  site.ts           Practice details, nav, fees, support areas, qualifications.
  faqs.ts           FAQ content.
  schema.ts         schema.org graph builders.
  content.config.ts Frontmatter schema for the resources collection.
public/             Served verbatim (robots.txt).
```

### Where to edit what

| To change | Edit |
| --- | --- |
| Phone, email, address, LinkedIn | `src/site.ts` |
| Session prices | `src/site.ts` (`fees`) — updates the home list, the pricing cards and the schema.org offers together |
| Nav or footer links | `src/site.ts` (`navLinks`, `footerColumns`) |
| FAQ questions | `src/faqs.ts` — updates both the page and the FAQPage structured data |
| Areas of support / qualifications | `src/site.ts` |
| The live domain | `astro.config.mjs` (`SITE`) — one line; canonicals, OG tags, JSON-LD and the sitemap all follow |
| Colours, fonts, layout | `src/styles/style.css` |

### Adding a resource article

Drop a Markdown file into `src/content/resources/`:

```markdown
---
title: Your title
description: One or two sentences, used on the card and as the meta description.
category: Anxiety & stress
cover: ../../assets/images/gradient.jpg
publishDate: 2026-09-10
readingTime: 5 min read
featured: false      # true gives it the wide hero card (use on one post only)
placeholder: false   # true keeps it out of search results
---

Your writing here.
```

The listing page, card, article page, sitemap and structured data all pick it up automatically. The
frontmatter is validated at build time, so a typo or missing cover fails the build rather than the
live site.

**The four posts currently in `src/content/resources/` are scaffolding**, marked `placeholder: true`
so the whole Resources section is `noindex` and excluded from the sitemap. Replace the text with
Emma's own words and remove the `placeholder` line to publish. The "content to come" banner
disappears automatically once no post is flagged.

## To-do before launch

1. **Contact form** — the contact page uses [Web3Forms](https://web3forms.com) to deliver
   submissions by email, with no backend required.
   - Get a free access key from web3forms.com using Emma's email.
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `src/pages/contact.astro`.
2. **Domain** — set `SITE` in `astro.config.mjs` to the real domain, then update the `Sitemap:` line
   in `public/robots.txt`.
3. **Resource articles** — replace the four placeholder posts (see above).
4. **Favicon** — none yet; add one to `public/` and link it in `BaseLayout.astro`.
5. **Logo** — currently text-only (`Emma Rossouw Counselling`) styled in the nav and footer.

## Images

Source photos live in `src/assets/images/` at full resolution (3–6 MB each). Astro's `<Image>`
component resizes and converts them to WebP at build time and emits a `srcset`, so the browser
downloads an appropriately sized file — the whole built site is around 2.6 MB.

Because the source photos are tall portraits, images are given an explicit `width`/`height` and
`fit="cover"` so they are cropped to their display aspect ratio at build time. Without that, a
full-width hero would generate a ~3800px-tall variant weighing several MB.

## Design system

- **Colours**: palette based on the client-supplied swatch (Forest, Leaf, Calm, Deep Sea, Sea Foam,
  Peaceful, Illuminated), defined as CSS variables at the top of `src/styles/style.css`. The seven
  swatch colours are unchanged.
- **Fonts**: Instrument Serif (headings) and Karla (body, nav, buttons, labels), via Google Fonts.
  Instrument Serif ships a single weight, so headings rely on size and italics rather than bold.

### Accent tokens and contrast

The swatch gold (`--illuminated`, `#C6913F`) is a **decorative colour only**. At the sizes this site
uses it, it does not reach WCAG AA against any page background, so derived tokens carry the text:

| Token | Value | Use |
| --- | --- | --- |
| `--illuminated` | `#C6913F` | Borders, rules, non-text accents only |
| `--illuminated-dark` | `#A97A32` | The wordmark's "Counselling" (3.35:1 on Peaceful, large text) |
| `--illuminated-ink` | `#7E5722` | Eyebrow labels on light surfaces (5.65:1 on Peaceful) |
| `--illuminated-light` | `#E5C286` | Text and icons on Forest backgrounds (4.72:1) |
| `--forest-deep` | `#23422F` | Header and footer background, button hover, eyebrows on Calm tints |

Other rules worth keeping if you edit the CSS:

- The primary button is Forest with Peaceful text (7.04:1). It was previously white on gold at 2.79:1.
- On the Calm and Sea Foam sections, body copy uses `--text`, not `--text-soft`. The soft grey drops
  to ~3.8:1 on those tints.
- Every interactive element has a `:focus-visible` outline, and a `prefers-reduced-motion` block
  neutralises the hover lifts and smooth scrolling.
- The horizontal nav hands over to the mobile toggle at **1024px**. Below that, six links plus the
  CTA no longer fit on one line.

All foreground/background pairs in the stylesheet were checked against WCAG AA and pass.
