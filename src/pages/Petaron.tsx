import { CTASection } from "@/components/petaron/CTASection";
import { FAQ } from "@/components/petaron/FAQ";
import { Footer } from "@/components/petaron/Footer";
import { Hero } from "@/components/petaron/Hero";
import { OrderCostCalculator } from "@/components/petaron/OrderCostCalculator";
import { PageShell } from "@/components/petaron/PageShell";
import { PlatformPreviewSection } from "@/components/petaron/PlatformPreviewSection";
import { ProcessFlowSection } from "@/components/petaron/ProcessFlowSection";
import { SEO } from "@/components/petaron/SEO";
import { SellLine } from "@/components/petaron/SellLine";
import { SparklesSection } from "@/components/ui/sparkles";
import { routeSeo, softwareApplicationJsonLd } from "@/lib/seo";

const Petaron = () => (
  <PageShell>
    <SEO route={routeSeo.home} jsonLd={softwareApplicationJsonLd()} />
    <Hero />
    <PlatformPreviewSection />
    <ProcessFlowSection />
    <OrderCostCalculator />
    <SellLine text="Every minute saved on data entry is a minute with a customer." />
    <CTASection />
    <div className="relative z-10 px-5 md:px-8">
      <div className="mx-auto h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-th-line/60 to-transparent" />
    </div>
    <FAQ />
    <SellLine text="Your team runs the business. Let the busywork run itself." />
    <Footer />
    <SparklesSection text="PETARON" particleCount={80} particleColor="rgb(var(--ac-1))" />
  </PageShell>
);

export default Petaron;
