import PetaronNavbar from "@/components/petaron/PetaronNavbar";
import PetaronHero from "@/components/petaron/PetaronHero";
import PainPoints from "@/components/petaron/PainPoints";
import HowItWorks from "@/components/petaron/HowItWorks";
import ROICalculator from "@/components/petaron/ROICalculator";
import SocialProof from "@/components/petaron/SocialProof";
import ComparisonTable from "@/components/petaron/ComparisonTable";
import TrustSecurity from "@/components/petaron/TrustSecurity";
import PetaronFAQ from "@/components/petaron/PetaronFAQ";
import FinalCTA from "@/components/petaron/FinalCTA";
import PetaronFooter from "@/components/petaron/PetaronFooter";

const Petaron = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PetaronNavbar />
      <PetaronHero />
      <PainPoints />
      <HowItWorks />
      <ROICalculator />
      <SocialProof />
      <ComparisonTable />
      <TrustSecurity />
      <PetaronFAQ />
      <FinalCTA />
      <PetaronFooter />
    </div>
  );
};

export default Petaron;
