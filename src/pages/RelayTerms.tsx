import { RelayDoc, RelayDocSection } from "@/components/relay/RelayDoc";
import { TermsBody } from "@/components/legal/TermsBody";
import { TERMS_UPDATED, type LegalLinks } from "@/components/legal/shared";
import { routeSeo } from "@/lib/seo";

/** The terms of service, at /terms; the text lives in src/components/legal. */
const LINKS: LegalLinks = { contact: "/#demo", privacy: "/privacy" };

const RelayTerms = () => (
  <RelayDoc seo={routeSeo.terms} title="Terms of" accent="service" updated={TERMS_UPDATED}>
    <TermsBody Section={RelayDocSection} links={LINKS} />
  </RelayDoc>
);

export default RelayTerms;
