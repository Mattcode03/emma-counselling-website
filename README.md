# emma-counselling-website

Website for Emma Rossouw, a private counsellor that offers online sessions to individual clients.

Built with [Astro](https://astro.build). Output is a fully static site — no server, no client-side
framework. The only JavaScript shipped to the browser is the mobile nav toggle, the contact-form
handler and, when analytics is switched on, the cookie consent banner.

## Getting started

```bash
npm install
npm run dev      # local dev server with hot reload, http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
npm run check    # TypeScript + Astro template type checking
```

The build fails on purpose if any page title is 60 characters or longer, or any meta description
is 160 or longer (see `src/components/SEO.astro`).

## Deployment

Hosted on **Cloudflare Pages** at https://ercounselling.co.za, built straight from this repository.

One-time setup in the Cloudflare dashboard (Workers & Pages → Create → Pages → connect the repo):

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | read from `.node-version` (22) |
| Environment variable (optional) | `PUBLIC_GA4_MEASUREMENT_ID` = your GA4 ID, e.g. `G-XXXXXXXXXX` |

Then:

1. **Custom domain** — add `ercounselling.co.za` and `www.ercounselling.co.za` under the project's
   Custom domains.
2. **www redirect** — add a Redirect Rule (Rules → Redirect Rules) sending
   `www.ercounselling.co.za/*` to `https://ercounselling.co.za/${1}` with a 301. Host redirects
   can't be done in `_redirects`.
3. **HTTPS** — SSL/TLS → Edge Certificates → turn on "Always Use HTTPS".
4. **Old GitHub Pages copy** — in the GitHub repo's Settings → Pages, unpublish the site so the
   old `mattcode03.github.io` copy doesn't compete with the real domain in search results.

`.github/workflows/deploy.yml` no longer deploys: it type-checks and builds every push and pull
request, so a broken change fails there.

### Files Cloudflare reads from `public/`

- `_headers` — security headers (CSP, HSTS, X-Frame-Options and more), long-term caching for
  `/_astro/`, and `noindex` on the `*.pages.dev` preview addresses. If you add a third-party
  script, font, embed or form service, its host must be added to the Content-Security-Policy.
- `_redirects` — old `.html` addresses and the removed Resources section.
- `robots.txt` — points to the sitemap. Update its `Sitemap:` line if the domain changes.

### Changing the domain

The domain is set in `astro.config.mjs` (`SITE`). Canonicals, Open Graph tags, schema.org `@id`s,
the sitemap and every internal link follow automatically; also update `public/robots.txt`.

## Analytics and cookie consent

Google Analytics 4 is off unless `PUBLIC_GA4_MEASUREMENT_ID` is set (in Cloudflare, or in a local
`.env` file, which git ignores). When it's set, the build adds:

- a cookie banner with Reject all / Save choices / Accept all and an unticked analytics option;
- Google Consent Mode v2 with every consent type defaulting to `denied`;
- gtag.js, requested only after the visitor accepts analytics, never before;
- a "Cookie settings" button in the footer and on the cookie policy, to change the choice later;
- the GA cookies in the cookie policy table and GA in the privacy policy.

With the variable unset, none of that is built. There is no banner and no GA mention, because no
cookies need consent. All of it lives in `src/components/CookieConsent.astro` and
`src/analytics.ts`.

In Google Analytics, set Admin → Data retention to **14 months** to match the privacy policy.

## Structure

```
src/
  pages/            One file per route, including 404 and the three policy pages.
  layouts/
    BaseLayout.astro  <head>, fonts, JSON-LD, nav + footer wrapper.
  components/       Nav, Footer, PhotoHero, CtaBand, PackageOffer, SEO (meta tags),
                    CookieConsent, LegalContent (policy page wrapper).
  assets/images/    Source photos and favicons. Optimised at build time; never served as-is.
  styles/style.css  Site-wide styling.
  site.ts           Practice details and address, nav, fees, support areas, qualifications.
  analytics.ts      Reads and validates the GA4 measurement ID.
  url.ts            Base-aware link helpers.
  faqs.ts           FAQ content.
  schema.ts         schema.org graph builders.
public/             Served verbatim (_headers, _redirects, robots.txt).
```

### Where to edit what

| To change | Edit |
| --- | --- |
| Phone, email, address, LinkedIn | `src/site.ts` |
| Session prices | `src/site.ts` (`fees`) — updates the home list, the pricing cards, the terms and the schema.org offers together |
| Nav, footer or policy links | `src/site.ts` (`navLinks`, `footerColumns`, `legalLinks`) |
| FAQ questions | `src/faqs.ts` — updates both the page and the FAQPage structured data |
| Areas of support / qualifications | `src/site.ts` |
| Policy wording | `src/pages/privacy-policy.astro`, `terms.astro`, `cookie-policy.astro` — also update the "Last updated" date |
| Security headers | `public/_headers` |
| The live domain | `astro.config.mjs` (`SITE`) and `public/robots.txt` |
| Colours, fonts, layout | `src/styles/style.css`; font families and weights in `astro.config.mjs` (`fonts`) |

## Images

Source photos live in `src/assets/images/` at full resolution (3–6 MB each). Astro's `<Image>`
component resizes and converts them to WebP at build time and emits a `srcset`, so the browser
downloads an appropriately sized file.

Because the source photos are tall portraits, images are given an explicit `width`/`height` and
`fit="cover"` so they are cropped to their display aspect ratio at build time. Without that, a
full-width hero would generate a ~3800px-tall variant weighing several MB.

## Design system

- **Colours**: palette based on the client-supplied swatch (Forest, Leaf, Calm, Deep Sea, Sea Foam,
  Peaceful, Illuminated), defined as CSS variables at the top of `src/styles/style.css`. The seven
  swatch colours are unchanged.
- **Fonts**: Instrument Serif (headings) and Karla (body, nav, buttons, labels), downloaded from
  Google Fonts at build time and served from this site, so visitors never contact Google.
  Instrument Serif ships a single weight, so headings rely on size and italics rather than bold.

### Accent tokens and contrast

The swatch gold (`--illuminated`, `#C6913F`) is a **decorative colour only**. At the sizes this site
uses it, it does not reach WCAG AA against any page background, so derived tokens carry the text:

| Token | Value | Use |
| --- | --- | --- |
| `--illuminated` | `#C6913F` | Borders, rules, non-text accents only |
| `--illuminated-dark` | `#A97A32` | Large display text only, e.g. the italic accents in headings (3.35:1 on Peaceful) |
| `--illuminated-ink` | `#7E5722` | Eyebrow labels and small gold text on light surfaces (5.65:1 on Peaceful) |
| `--illuminated-light` | `#E5C286` | Text and icons on Forest backgrounds (4.72:1) |
| `--forest-deep` | `#23422F` | Header and footer background, button hover, headings and eyebrows on Calm tints |

Other rules worth keeping if you edit the CSS:

- The primary button is Forest with Peaceful text (7.04:1).
- On the Calm and Sea Foam sections, body copy uses `--text` and headings `--forest-deep`. The soft
  grey drops to ~3.8:1 and Forest to 4.25:1 on those tints.
- Form placeholders use `--text-soft`; the browser default grey is ~4.1:1 on Peaceful.
- Every interactive element has a `:focus-visible` outline, and a `prefers-reduced-motion` block
  neutralises the hover lifts and smooth scrolling.
- The horizontal nav hands over to the mobile toggle at **1024px**. Below that, six links plus the
  CTA no longer fit on one line.
