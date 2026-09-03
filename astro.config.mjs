// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * Deployment target. These two constants are the only place the public URL is
 * defined — canonical tags, Open Graph, schema.org @ids, the sitemap and every
 * internal link derive from them.
 *
 * Currently deployed to GitHub Pages under a project path:
 *   https://mattcode03.github.io/emma-counselling-website/
 *
 * When the real domain is ready, change these two lines and nothing else:
 *   const SITE = "https://the-real-domain.co.za";
 *   const BASE = "/";
 */
const SITE = "https://mattcode03.github.io";
const BASE = "/emma-counselling-website";

export default defineConfig({
  site: SITE,
  base: BASE,

  integrations: [
    sitemap({
      // resources/* is placeholder copy pending Emma's real articles and is
      // noindexed, so it must stay out of the sitemap too.
      filter: (page) => !page.includes("/resources"),
    }),
  ],

  build: {
    // Clean URLs: /services/ rather than /services.html.
    format: "directory",
  },

  image: {
    // Source photos are 3–6 MB, 4000–6000px JPEGs. Astro emits resized,
    // modern-format derivatives at build time; the originals never ship.
    responsiveStyles: true,
  },
});
