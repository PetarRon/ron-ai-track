import { Helmet } from "react-helmet-async";
import { LightStream } from "@/components/relay/LightStream";
import { RelayHero } from "@/components/relay/RelayHero";
import { RelayIntegrations } from "@/components/relay/RelayIntegrations";

/**
 * Design prototype: the Relay-direction redesign (black + lime, one stream of
 * light down the page). Not linked from navigation; reached at /preview/relay.
 */
const RelayPreview = () => (
  <div className="relay min-h-screen bg-th-page text-th-heading">
    <Helmet>
      <title>Relay direction preview</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    {/* The stream wraps both sections so it runs from the hero into the next block. */}
    <div className="relative overflow-hidden">
      <LightStream className="z-0" />
      <div className="relative z-10">
        <RelayHero />
        <RelayIntegrations />
      </div>
    </div>
    <div className="h-[60vh] border-t border-th-line/40" />
  </div>
);

export default RelayPreview;
