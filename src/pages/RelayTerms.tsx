import { RelayDoc, RelayDocSection } from "@/components/relay/RelayDoc";
import { TermsBody } from "@/components/legal/TermsBody";
import { TERMS_UPDATED, type LegalLinks } from "@/components/legal/shared";

/** The terms of service in the Relay look, at /preview/relay/terms; the text is shared with /terms. */
const LINKS: LegalLinks = { contact: "/preview/relay#demo", privacy: "/preview/relay/privacy" };

const RelayTerms = () => (
  <RelayDoc title="Terms of" accent="service" updated={TERMS_UPDATED}>
    <TermsBody Section={RelayDocSection} links={LINKS} />
  </RelayDoc>
);

export default RelayTerms;
