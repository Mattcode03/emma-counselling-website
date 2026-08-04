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

- **Colors**: palette based on client-supplied swatch (Forest, Leaf, Calm, Deep Sea, Sea Foam, Peaceful, Illuminated) — defined as CSS variables at the top of `css/style.css` for easy tweaking.
- **Fonts**: Playfair Display (headings), Lora (body text), Montserrat (nav/buttons/labels) — loaded via Google Fonts.
