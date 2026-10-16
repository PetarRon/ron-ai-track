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

/**
 * Design prototype: the Relay-direction redesign (black + lime on a plain
 * dark page). Not linked from navigation; reached at /preview/relay, and the
 * same page on a light ground at /preview/relay/light (`relay-light` in
 * src/index.css).
 */
const RelayPreview = ({ light = false }: { light?: boolean }) => (
  <RelayShell title={light ? "Relay direction preview, light" : "Relay direction preview"} light={light}>
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
