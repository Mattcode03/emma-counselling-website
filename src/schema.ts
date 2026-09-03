/**
 * schema.org graph builders.
 *
 * Every page previously carried a hand-written JSON-LD block with the domain,
 * contact details and prices typed out again. These builders derive all of it
 * from `site.ts` and the configured domain, so the structured data cannot
 * drift from what the pages actually display.
 */
import { fees, practice, qualifications } from "./site";
import { absolute } from "./url";

/** Absolute URL for a site-root-relative path, including the deployment base. */
export const abs = absolute;

/** Stable @id anchors, so nodes can cross-reference across pages. */
export const ids = (site: URL | undefined) => ({
  practice: `${abs(site)}#practice`,
  person: `${abs(site)}#emma`,
  website: `${abs(site)}#website`,
});

/**
 * The practice itself. Emitted on every page as the site's identity anchor.
 * `imageUrl` is the absolute URL of the build-generated portrait.
 */
export function professionalService(site: URL | undefined, imageUrl: string) {
  const id = ids(site);
  return {
    "@type": "ProfessionalService",
    "@id": id.practice,
    name: practice.name,
    alternateName: "Emma Rossouw Online Counselling",
    description:
      "Online counselling and virtual therapy for individuals and couples, provided by an ASCHP Registered Specialist Wellness Counsellor based in Cape Town, South Africa.",
    url: abs(site),
    image: imageUrl,
    email: practice.email,
    telephone: practice.phone,
    sameAs: [practice.linkedin],
    priceRange: "R400-R600",
    currenciesAccepted: "ZAR",
    address: {
      "@type": "PostalAddress",
      addressLocality: practice.city,
      addressRegion: practice.region,
      addressCountry: practice.country,
    },
    areaServed: { "@type": "Country", name: practice.countryName },
    availableLanguage: { "@type": "Language", name: "English" },
    knowsAbout: [
      "Online counselling",
      "Virtual therapy",
      "Anxiety and stress",
      "Couples counselling",
      "Grief and loss",
      "Burnout and workplace wellbeing",
      "Cognitive Behavioural Therapy",
      "Solution-Focused Therapy",
      "Narrative Therapy",
    ],
    founder: { "@id": id.person },
    provider: { "@id": id.person },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Online counselling services",
      itemListElement: fees.map((fee) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: fee.schemaName },
        price: fee.price,
        priceCurrency: "ZAR",
      })),
    },
  };
}

/** Emma as a person, with her credentials. */
export function person(site: URL | undefined, imageUrl: string) {
  const id = ids(site);
  return {
    "@type": "Person",
    "@id": id.person,
    name: practice.counsellor,
    jobTitle: practice.jobTitle,
    image: imageUrl,
    url: abs(site, "/about/"),
    sameAs: [practice.linkedin],
    worksFor: { "@id": id.practice },
    memberOf: {
      "@type": "Organization",
      name: practice.registrationBody,
      alternateName: practice.registration,
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Stellenbosch University" },
      {
        "@type": "CollegeOrUniversity",
        name: "South African College of Applied Psychology (SACAP)",
      },
    ],
    hasCredential: qualifications.map((q) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: q.category,
      name: q.schemaName,
    })),
  };
}

/** The site as a whole. */
export function website(site: URL | undefined) {
  const id = ids(site);
  return {
    "@type": "WebSite",
    "@id": id.website,
    url: abs(site),
    name: practice.name,
    inLanguage: "en-ZA",
    publisher: { "@id": id.practice },
  };
}

/** Breadcrumbs from Home to the current page. */
export function breadcrumbs(
  site: URL | undefined,
  trail: Array<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: abs(site, item.path),
      }),
    ),
  };
}
