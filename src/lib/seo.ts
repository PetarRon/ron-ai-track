export const SITE_URL = "https://petaron.ai";
export const SITE_NAME = "Petaron.ai";
export const SITE_LOGO = `${SITE_URL}/petaron_logo.svg`;

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
};

export const routeSeo: Record<string, RouteSeo> = {
  home: {
    path: "/",
    title: "Petaron.ai - AI Order Processing for Freight Forwarders",
    description:
      "Petaron.ai is an AI agent that processes your freight orders automatically. From email to TMS, so your team handles what matters.",
  },
  about: {
    path: "/about",
    title: "About Petaron.ai - The team behind the AI order agent",
    description:
      "Petaron.ai is building the future of order intake for the logistics industry, combining domain knowledge with modern AI to eliminate manual data entry.",
  },
  careers: {
    path: "/careers",
    title: "Careers at Petaron.ai - Join us",
    description:
      "We're a small fast-moving team based in the Netherlands building AI tools for freight forwarders. Open application form for engineers, domain experts, and designers.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy - Petaron.ai",
    description:
      "How Petaron AI collects, uses, and protects your personal data. EU-hosted, GDPR-compliant.",
  },
  terms: {
    path: "/terms",
    title: "Terms of Service - Petaron.ai",
    description:
      "Terms governing the use of the petaron.ai website and related services.",
  },
  notFound: {
    path: "*",
    title: "Page not found - Petaron.ai",
    description: "The page you are looking for does not exist.",
  },
};

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Petaron AI",
  url: SITE_URL,
  logo: SITE_LOGO,
  description:
    "AI-powered order processing for freight forwarders. From email to TMS, automatically.",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
    },
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    url: `${SITE_URL}/?contact=1`,
  },
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
});

export const softwareApplicationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Petaron.ai",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI order processing platform for freight forwarders. Reads incoming emails and PDFs, structures order data, and prepares TMS-ready drafts for human approval.",
  publisher: {
    "@type": "Organization",
    name: "Petaron AI",
    url: SITE_URL,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    description: "14-day free pilot with your actual data.",
  },
});

export const faqPageJsonLd = (
  items: { question: string; answer: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});
