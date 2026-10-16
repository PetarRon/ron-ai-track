import { RelayDoc, RelayDocSection } from "@/components/relay/RelayDoc";
import { PrivacyBody } from "@/components/legal/PrivacyBody";
import { PRIVACY_UPDATED, type LegalLinks } from "@/components/legal/shared";

/** The privacy policy in the Relay look, at /preview/relay/privacy; the text is shared with /privacy. */
const LINKS: LegalLinks = { contact: "/preview/relay#demo", privacy: "/preview/relay/privacy" };

const RelayPrivacy = () => (
  <RelayDoc title="Privacy" accent="policy" updated={PRIVACY_UPDATED}>
    <PrivacyBody Section={RelayDocSection} links={LINKS} />
  </RelayDoc>
);

export default RelayPrivacy;
