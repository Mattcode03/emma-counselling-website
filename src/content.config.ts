import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// Astro 7 deprecates the `z` re-export from `astro:content` in favour of
// importing Zod directly.
import { z } from "zod";

/**
 * Resource articles.
 *
 * Emma adds a post by dropping a Markdown file into `src/content/resources/`
 * — the listing page, the card layout and the article route all pick it up
 * automatically. The schema below is enforced at build time, so a missing
 * cover image or malformed date fails the build rather than the live page.
 */
const resources = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/resources" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Card blurb and meta description. */
      description: z.string(),
      /** Shown as the card's category tag, e.g. "Anxiety & stress". */
      category: z.string(),
      cover: image(),
      /** Alt text for the cover. Empty string marks it decorative. */
      coverAlt: z.string().default(""),
      publishDate: z.coerce.date(),
      readingTime: z.string().optional(),
      /** Exactly one post should be featured; it gets the wide hero card. */
      featured: z.boolean().default(false),
      /**
       * Scaffolding written to demonstrate the layout. While any post is
       * flagged, the listing shows the "content to come" banner and the whole
       * section stays out of search results.
       */
      placeholder: z.boolean().default(false),
    }),
});

export const collections = { resources };
