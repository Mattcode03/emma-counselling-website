/**
 * FAQ content, grouped as the page displays it.
 *
 * The old faq.html spelled every question out twice — once as markup and once
 * inside the FAQPage JSON-LD. Both now render from this array, so an answer
 * cannot be updated on the page while the structured data keeps the old text.
 */
export interface Faq {
  q: string;
  a: string;
}

export interface FaqGroup {
  label: string;
  /** Sage-tinted band, matching the design's alternating sections. */
  tinted: boolean;
  items: readonly Faq[];
}

export const faqGroups: readonly FaqGroup[] = [
  {
    label: "Getting started",
    tinted: false,
    items: [
      {
        q: "How do I book a first session?",
        a: "Send a message through the contact form with a little about what you're looking for. I'll reply to arrange a free 15-minute consultation, and we take it from there.",
      },
      {
        q: "What happens in the free consultation?",
        a: "It's a complimentary 15-minute call to meet, discuss the challenges you're facing, and ask any questions about the counselling process. It's there to help you decide whether we're the right fit for one another — there's no pressure to book.",
      },
      {
        q: "Do I need to know what I want to work on?",
        a: "Not at all. Many people arrive knowing only that something feels heavy or stuck. Part of the work is making sense of that together.",
      },
    ],
  },
  {
    label: "Sessions",
    tinted: true,
    items: [
      {
        q: "How long is a session, and what does it cost?",
        a: "Sessions run for one hour. Individual sessions are R400 and couples sessions R600. The first 15-minute consultation is free.",
      },
      {
        q: "Are sessions really all online?",
        a: "Yes. Sessions are held securely online, so you can access counselling from anywhere in South Africa — from your own home, or any space where you feel safe and relaxed. I'm based in Cape Town.",
      },
      {
        q: "Who do you work with?",
        a: "Individual counselling is available for children, adolescents, and adults. I also work with couples on relationship, marriage, and family challenges.",
      },
      {
        q: "How often would we meet, and for how long?",
        a: "This depends entirely on what you need, and we decide it together. Some people come weekly for a season; others prefer fortnightly or a shorter, focused block of sessions.",
      },
    ],
  },
  {
    label: "Scope & confidentiality",
    tinted: false,
    items: [
      {
        q: "Is what I say kept private?",
        a: "Yes. Sessions are confidential, and my aim is a safe, supportive, non-judgemental space where you can talk openly. The limits to confidentiality required by professional practice are explained to you upfront, before we begin.",
      },
      {
        q: "Can you diagnose a condition or prescribe medication?",
        a: "No. As an ASCHP-registered Specialist Wellness Counsellor, I provide professional, non-diagnostic counselling. I do not diagnose mental health disorders or prescribe medication.",
      },
      {
        q: "What if my needs fall outside your scope?",
        a: "I'll gladly refer you to a trusted HPCSA-registered mental health professional — a Registered Counsellor, Psychologist, Psychiatrist, or another appropriate practitioner — so you receive the level of care best suited to your needs.",
      },
    ],
  },
];

/** Questions still awaiting Emma's wording, shown in the note box. */
export const faqsToConfirm = [
  "Payment method and when payment is due",
  "Cancellation / rescheduling notice",
  "Medical aid claims and invoices",
] as const;

/** Flattened for the FAQPage schema. */
export const allFaqs = faqGroups.flatMap((group) => group.items);
