/**
 * Google Analytics 4 measurement ID, read from the PUBLIC_GA4_MEASUREMENT_ID
 * environment variable (Cloudflare Pages -> Settings -> Variables and
 * Secrets, or a local .env file).
 *
 * When it is unset, no analytics code, cookie banner or GA cookie disclosures
 * are built into the site at all. Only import this from component frontmatter:
 * the format check below runs at build time.
 */
const raw = String(import.meta.env.PUBLIC_GA4_MEASUREMENT_ID ?? "").trim();

if (raw && !/^G-[A-Z0-9]+$/.test(raw)) {
  throw new Error(
    `PUBLIC_GA4_MEASUREMENT_ID must look like "G-XXXXXXXXXX", but it is "${raw}".`,
  );
}

export const gaMeasurementId: string | undefined = raw || undefined;
