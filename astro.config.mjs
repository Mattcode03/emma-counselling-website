// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * The live domain. This is the ONE place the domain is defined — canonical
 * URLs, Open Graph tags, schema.org @ids and the generated sitemap all derive
 * from `Astro.site`, so switching to the real domain is a single-line change.
 */
const SITE = "https://REPLACE-WITH-DOMAIN.co.za";

export default defineConfig({
  site: SITE,

  integrations: [
    sitemap({
      // resources/* is placeholder copy pending Emma's real articles and is
      // noindexed, so it must stay out of the sitemap too.
      filter: (page) => !page.includes("/resources"),
    }),
  ],

  build: {
    // Clean URLs: /services/ rather than /services.html. The site is not live
    // yet, so there are no existing URLs to preserve.
    format: "directory",
  },

  image: {
    // Source photos are 3–6 MB, 4000–6000px JPEGs. Astro emits resized,
    // modern-format derivatives at build time; the originals never ship.
    responsiveStyles: true,
  },
});
