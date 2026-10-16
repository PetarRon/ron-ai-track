import { RelayShell } from "@/components/relay/RelayShell";
import { RelayHero } from "@/components/relay/RelayHero";
import { RelayTryIt } from "@/components/relay/RelayTryIt";
import { RelayProcess } from "@/components/relay/RelayProcess";
import { RelayFeatures } from "@/components/relay/RelayFeatures";
import { RelayPlate } from "@/components/relay/RelayPlate";
import { RelayCalculator } from "@/components/relay/RelayCalculator";
import { RelayPilot } from "@/components/relay/RelayPilot";
import { RelayConnect } from "@/components/relay/RelayConnect";
import { RelayCTA } from "@/components/relay/RelayCTA";
import { RelayFAQ } from "@/components/relay/RelayFAQ";
import { RelayFooter } from "@/components/relay/RelayFooter";
import { FlowRibbon } from "@/components/relay/RelayFlow";
import { routeSeo, softwareApplicationJsonLd } from "@/lib/seo";

/**
 * The home page: lime on a light page (`relay-light` in src/index.css), with the
 * GradFlow ribbon running from the hero down to the CTA.
 */
const RelayPreview = () => (
  <RelayShell seo={{ route: routeSeo.home, jsonLd: softwareApplicationJsonLd() }} light>
    <FlowRibbon />
    <RelayHero />
    <RelayTryIt />
    <RelayProcess />
    <RelayFeatures />
    <RelayPlate>
      <RelayCalculator />
    </RelayPlate>
    <RelayPilot />
    <RelayConnect />
    <RelayCTA />
    <RelayFAQ />
    <RelayFooter />
  </RelayShell>
);

export default RelayPreview;
