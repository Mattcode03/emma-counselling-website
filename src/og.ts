/**
 * Resolves the shared portrait used for Open Graph tags and schema.org
 * `image` fields. Kept in one place so the layout and the pages that emit
 * Person/Service nodes all point at the same generated file.
 */
import { getImage } from "astro:assets";
import portrait from "./assets/images/emma-profile.jpg";

/** Absolute URL of the build-generated 1200×1200 share image. */
export async function portraitUrl(
  site: URL | undefined,
  source: ImageMetadata = portrait,
) {
  const rendered = await getImage({
    src: source,
    width: 1200,
    height: 1200,
    format: "jpg",
  });
  return new URL(rendered.src, site).href;
}
