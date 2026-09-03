/**
 * Base-aware URL helpers.
 *
 * The site is deployed to GitHub Pages under a project path
 * (`/emma-counselling-website/`). Astro prefixes `base` onto assets it
 * generates — the CSS bundle, `<Image>` output — but it does NOT rewrite
 * `href` attributes. A bare `href="/about/"` would therefore resolve to the
 * domain root and 404.
 *
 * Every internal link goes through `href()` so the prefix is applied in one
 * place. When the site moves to its own domain, setting `BASE = "/"` in
 * `astro.config.mjs` makes these a no-op with no other changes needed.
 */

/** Configured base, normalised to no trailing slash ("" when deployed at root). */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Prefixes a root-relative path with the deployment base.
 * `href("/about/")` -> `/emma-counselling-website/about/`
 */
export function href(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE}${path}` || "/";
}

/**
 * Absolute URL for a root-relative path, for canonical tags, Open Graph and
 * schema.org @ids. `site` is `Astro.site`.
 */
export function absolute(site: URL | undefined, path = "/"): string {
  return new URL(href(path), site ?? "https://example.com").href;
}
