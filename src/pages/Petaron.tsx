import { ChaosToOrder } from "@/components/petaron/ChaosToOrder";
import { CTASection } from "@/components/petaron/CTASection";
import { FAQ } from "@/components/petaron/FAQ";
import { Footer } from "@/components/petaron/Footer";
import { Hero } from "@/components/petaron/Hero";
import { HowItWorks } from "@/components/petaron/HowItWorks";
import { OrderCostCalculator } from "@/components/petaron/OrderCostCalculator";
import { PageShell } from "@/components/petaron/PageShell";
import { SEO } from "@/components/petaron/SEO";
import { SellLine } from "@/components/petaron/SellLine";
import { SparklesSection } from "@/components/ui/sparkles";
import { routeSeo, softwareApplicationJsonLd } from "@/lib/seo";

const Petaron = () => (
  <PageShell>
    <SEO route={routeSeo.home} jsonLd={softwareApplicationJsonLd()} />
    <Hero />
    {/* Everything below scrolls over the sticky hero, so it needs an opaque background. */}
    <div className="relative z-10 bg-th-page">
    <HowItWorks />
    <ChaosToOrder />
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
    </div>
  </PageShell>
);

export default Petaron;
