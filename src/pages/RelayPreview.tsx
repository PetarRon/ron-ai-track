import { RelayShell } from "@/components/relay/RelayShell";
import { RelayHero } from "@/components/relay/RelayHero";
import { RelayTryIt } from "@/components/relay/RelayTryIt";
import { RelayProcess } from "@/components/relay/RelayProcess";
import { RelayFeatures } from "@/components/relay/RelayFeatures";
import { RelayPlate } from "@/components/relay/RelayPlate";
import { RelayNumbers } from "@/components/relay/RelayNumbers";
import { RelayCalculator } from "@/components/relay/RelayCalculator";
import { RelayConnect } from "@/components/relay/RelayConnect";
import { RelayCTA } from "@/components/relay/RelayCTA";
import { RelayFAQ } from "@/components/relay/RelayFAQ";
import { RelayFooter } from "@/components/relay/RelayFooter";
import { FlowRibbon } from "@/components/relay/RelayFlow";

/**
 * Design prototype: the Relay-direction redesign, lime on a light page
 * (`relay-light` in src/index.css). Not linked from navigation; reached at
 * /preview/relay. The earlier dark version stays at /preview/relay/dark.
 */
const RelayPreview = ({ dark = false }: { dark?: boolean }) => (
  <RelayShell title={dark ? "Relay direction preview, dark" : "Relay direction preview"} light={!dark}>
    {!dark && <FlowRibbon />}
    <RelayHero />
    <RelayTryIt />
    <RelayProcess />
    <RelayFeatures />
    <RelayPlate>
      <RelayCalculator />
    </RelayPlate>
    <RelayNumbers />
    <RelayConnect />
    <RelayCTA />
    <RelayFAQ />
    <RelayFooter />
  </RelayShell>
);

export default RelayPreview;
