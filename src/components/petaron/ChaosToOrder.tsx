import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";
import { BeforeAfterTable } from "./BeforeAfterTable";

export const ChaosToOrder = () => (
  <section id="chaos-to-order" className="relative z-10 border-t border-th-line-subtle bg-th-page py-16">
    <div className={PETARON_SECTION_SHELL}>
      <SectionHeading title="From chaos to order" description="The manual way versus Petaron." />
      <BeforeAfterTable />
    </div>
  </section>
);
