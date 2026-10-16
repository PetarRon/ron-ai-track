import { RelayDoc, RelayDocSection } from "@/components/relay/RelayDoc";
import { PrivacyBody } from "@/components/legal/PrivacyBody";
import { PRIVACY_UPDATED, type LegalLinks } from "@/components/legal/shared";
import { routeSeo } from "@/lib/seo";

/** The privacy policy, at /privacy; the text lives in src/components/legal. */
const LINKS: LegalLinks = { contact: "/#demo", privacy: "/privacy" };

const RelayPrivacy = () => (
  <RelayDoc seo={routeSeo.privacy} title="Privacy" accent="policy" updated={PRIVACY_UPDATED}>
    <PrivacyBody Section={RelayDocSection} links={LINKS} />
  </RelayDoc>
);

export default RelayPrivacy;
