/**
 * Single source of truth for practice details and navigation.
 *
 * These values were previously copy-pasted into all seven HTML pages (nav,
 * footer, schema.org blocks and the contact page each carried their own copy).
 * Editing them here updates every page and every structured-data block.
 *
 * The domain itself lives in `astro.config.mjs` as `site` and is read through
 * `Astro.site`, so it is never hardcoded here.
 */

export const practice = {
  name: "Emma Rossouw Counselling",
  /** Rendered as "Emma Rossouw <em>Counselling</em>" in the nav and footer. */
  nameParts: { lead: "Emma Rossouw", accent: "Counselling" },
  counsellor: "Emma Rossouw",
  jobTitle: "Registered Specialist Wellness Counsellor",
  email: "emma.rossouw03@gmail.com",
  /** E.164, for tel: links and schema.org. */
  phone: "+27820670589",
  /** Human-readable form for display. */
  phoneDisplay: "+27 82 067 0589",
  linkedin: "https://www.linkedin.com/in/emma-rossouw-aba5a935a/",
  registration: "ASCHP",
  registrationBody:
    "Association for Supportive Counsellors and Holistic Practitioners",
  city: "Cape Town",
  region: "Western Cape",
  country: "ZA",
  countryName: "South Africa",
  tagline: "Online counselling & virtual therapy",
  footerCredential: "ASCHP Registered Specialist Wellness Counsellor",
} as const;

/** Primary navigation. `href` doubles as the active-state key. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About me" },
  { href: "/services/", label: "Services & fees" },
  { href: "/scope-of-practice/", label: "What to expect" },
  { href: "/faq/", label: "Questions" },
  { href: "/resources/", label: "Resources" },
] as const;

/** Footer link columns, mirroring the design's three-column arrangement. */
export const footerColumns = [
  [
    { href: "/", label: "Home" },
    { href: "/about/", label: "About me" },
    { href: "/services/", label: "Services & fees" },
  ],
  [
    { href: "/scope-of-practice/", label: "What to expect" },
    { href: "/faq/", label: "Questions" },
    { href: "/resources/", label: "Resources" },
  ],
  [{ href: "/contact/", label: "Contact" }],
] as const;

/**
 * Session fees. Consumed by the home fee list, the services pricing cards and
 * the schema.org OfferCatalog, so a price change lands in all three at once.
 */
export const fees = [
  {
    id: "consultation",
    eyebrow: "First conversation",
    name: "First conversation",
    amount: "Free",
    /** Numeric price for schema.org. */
    price: "0",
    note: "15 minutes",
    rowPrice: "Free · 15 min",
    schemaName: "Free 15-minute consultation",
    blurb:
      "A chance to meet, discuss your needs, and see whether we're the right fit for one another.",
  },
  {
    id: "individual",
    eyebrow: "Individual session",
    name: "Individual session",
    amount: "R400",
    price: "400",
    note: "Per 1 hour session",
    rowPrice: "R400",
    schemaName: "Individual online counselling session (1 hour)",
    blurb: "For children, adolescents, and adults, held securely online.",
  },
  {
    id: "couples",
    eyebrow: "Couples session",
    name: "Couples session",
    amount: "R600",
    price: "600",
    note: "Per 1 hour session",
    rowPrice: "R600",
    schemaName: "Couples online counselling session (1 hour)",
    blurb: "For couples working through challenges together.",
  },
] as const;

/** Areas of support, shown as chips on the Services page. */
export const supportAreas = [
  "Anxiety and stress",
  "Depression",
  "Burnout and workplace wellbeing",
  "Self-esteem and confidence",
  "Life transitions and adjustment",
  "Relationship, marriage, and family challenges",
  "Emotional regulation",
  "Grief and loss",
  "Trauma",
  "Personal growth and self-discovery",
  "Body image and eating-related concerns",
  "Substance use and addiction",
  "Career guidance and decision-making",
  "Developing healthy coping skills",
  "General emotional wellbeing",
] as const;

export interface Qualification {
  name: string;
  /** Optional parenthetical, rendered in italics after the name. */
  honours?: string;
  org: string;
  /** Full string used in the Person schema's hasCredential list. */
  schemaName: string;
  category: string;
}

/** Qualifications, shown on the About page and in the Person schema. */
export const qualifications: readonly Qualification[] = [
  {
    name: "BA in Humanities, major in Psychology",
    honours: "(cum laude)",
    org: "Stellenbosch University",
    schemaName:
      "BA in Humanities, major in Psychology (cum laude), Stellenbosch University",
    category: "degree",
  },
  {
    name: "BSocSci Honours in Psychology",
    org: "SACAP",
    schemaName: "BSocSci Honours in Psychology, SACAP",
    category: "degree",
  },
  {
    name: "Advanced Counselling Course",
    org: "Equip",
    schemaName: "Advanced Counselling Course, Equip",
    category: "certification",
  },
  {
    name: "Specialist Wellness Counsellor registration",
    org: "ASCHP",
    schemaName: "ASCHP Specialist Wellness Counsellor Registration",
    category: "professional certification",
  },
];
