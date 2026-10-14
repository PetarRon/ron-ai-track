import { RelayShell } from "@/components/relay/RelayShell";
import { RelayHero } from "@/components/relay/RelayHero";
import { RelayHowItWorks } from "@/components/relay/RelayHowItWorks";
import { RelayTryIt } from "@/components/relay/RelayTryIt";
import { RelayProcess } from "@/components/relay/RelayProcess";
import { RelayPlate } from "@/components/relay/RelayPlate";
import { RelayReliability } from "@/components/relay/RelayReliability";
import { RelayDashboard } from "@/components/relay/RelayDashboard";
import { RelayNumbers } from "@/components/relay/RelayNumbers";
import { RelayCalculator } from "@/components/relay/RelayCalculator";
import { RelayFAQ } from "@/components/relay/RelayFAQ";
import { RelayFooter } from "@/components/relay/RelayFooter";

/**
 * Design prototype: the Relay-direction redesign (black + lime, one stream of
 * light down the page). Not linked from navigation; reached at /preview/relay.
 */
const RelayPreview = () => (
  <RelayShell title="Relay direction preview">
    <RelayHero />
    <RelayHowItWorks />
    <RelayTryIt />
    <RelayProcess />
    <RelayPlate />
    <RelayReliability />
    <RelayDashboard />
    <RelayNumbers />
    <RelayCalculator />
    <RelayFAQ />
    <RelayFooter />
  </RelayShell>
);

export default RelayPreview;
