// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * Deployment target. These two constants are the only place the public URL is
 * defined — canonical tags, Open Graph, schema.org @ids, the sitemap,
 * robots.txt and every internal link derive from them.
 *
 * Hosted on Cloudflare Pages at the domain root.
 */
const SITE = "https://ercounselling.co.za";
const BASE = "/";

export default defineConfig({
  site: SITE,
  base: BASE,

  integrations: [sitemap()],

  build: {
    // Clean URLs: /services/ rather than /services.html.
    format: "directory",
  },

  image: {
    // Source photos are 3–6 MB, 4000–6000px JPEGs. Astro emits resized,
    // modern-format derivatives at build time; the originals never ship.
    responsiveStyles: true,
  },

  // Downloaded at build time and served from this site, so visitors'
  // browsers never contact Google's font servers (a privacy and CSP win).
  // The weights match what the stylesheet uses.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Instrument Serif",
      cssVariable: "--font-display",
      weights: [400],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Karla",
      cssVariable: "--font-body",
      weights: [300, 400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
  ],

  vite: {
    build: {
      // Astro inlines small page scripts into the HTML by default. Keeping
      // every script as an external file lets the Content-Security-Policy in
      // public/_headers stay at script-src 'self' with no 'unsafe-inline'.
      // Other assets keep Vite's default behaviour.
      assetsInlineLimit: (filePath) => (filePath.endsWith(".js") ? false : undefined),
    },
  },
});
