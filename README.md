# emma-counselling-website
Website for Emma Rossouw, a private counsellor that offers online sessions to individual clients.

## Structure

Plain HTML/CSS/JS static site, no build step required.

- `index.html` — Home
- `services.html` — Services & pricing
- `scope-of-practice.html` — Scope of practice / what to expect
- `contact.html` — Contact form
- `css/style.css` — All styling (colors, fonts, layout)
- `js/nav.js` — Mobile nav toggle
- `js/contact.js` — Contact form submission handler

To preview locally, just open `index.html` in a browser, or run a simple local server (e.g. `npx serve .`) from this folder.

## To-do before launch

1. **Contact form** — `contact.html` uses [Web3Forms](https://web3forms.com) to deliver form submissions by email, with no backend required.
   - Go to web3forms.com and enter Emma's email to get a free access key.
   - In `contact.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY` (in the hidden `access_key` input) with the real key.
2. **Real photos** — placeholder Unsplash images are used throughout (hero images, About section). Swap the `src` attributes in each HTML file for real photos of Emma/her practice once available.
3. **Logo** — currently text-only (`Emma Rossouw Counselling`) styled in the nav/footer. Replace with a real logo image if/when one is designed.
4. **Contact details** — the email and phone number on `contact.html` are placeholders; update with Emma's real contact details.
5. **Domain & hosting** — once ready, this can be deployed as-is to any static host (Netlify, Vercel, GitHub Pages, etc.) since there's no server/build step.

## Design system

- **Colors**: palette based on client-supplied swatch (Forest, Leaf, Calm, Deep Sea, Sea Foam, Peaceful, Illuminated), defined as CSS variables at the top of `css/style.css`. The seven swatch colours are unchanged.
- **Fonts**: Playfair Display (headings), Lora (body text), Montserrat (nav/buttons/labels), loaded via Google Fonts.

### Accent tokens and contrast

The swatch gold (`--illuminated`, `#C6913F`) is a **decorative colour only**. At the sizes this site uses it, it does not reach WCAG AA against any page background, so derived tokens carry the text:

| Token | Value | Use |
| --- | --- | --- |
| `--illuminated` | `#C6913F` | Borders, rules, non-text accents only |
| `--illuminated-dark` | `#A97A32` | The wordmark's "Counselling" (3.35:1 on Peaceful, large text) |
| `--illuminated-ink` | `#7E5722` | Eyebrow labels on light surfaces (5.65:1 on Peaceful) |
| `--illuminated-light` | `#E5C286` | Text and icons on Forest backgrounds (4.72:1) |
| `--forest-deep` | `#23422F` | Button hover, eyebrows on Calm / Sea Foam tints |

Other rules worth keeping if you edit the CSS:

- The primary button is Forest with Peaceful text (7.04:1). It was previously white on gold at 2.79:1.
- On the Calm and Sea Foam sections, body copy uses `--text`, not `--text-soft`. The soft grey drops to ~3.8:1 on those tints.
- Every interactive element has a `:focus-visible` outline, and a `prefers-reduced-motion` block neutralises the hover lifts and smooth scrolling.
- The horizontal nav hands over to the toggle at **1080px**, not 860px. Below that the four links plus the CTA no longer fit on one line.

All foreground/background pairs in the stylesheet were checked against WCAG AA and pass.
