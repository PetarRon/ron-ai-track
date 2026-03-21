"use client";

import { motion } from "framer-motion";
import { ScanText, BrainCircuit, CheckCircle2 } from "lucide-react";
import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const steps = [
  {
    title: "Capture",
    description: "Reads emails, PDFs, and attachments across all channels into one clean intake stream.",
    Icon: ScanText,
    colorClass: "text-ac-1",
    chips: ["Email", "PDF", "Excel"],
  },
  {
    title: "Process",
    description: "Structures order data, maps fields, and validates critical details automatically.",
    Icon: BrainCircuit,
    colorClass: "text-ac-2",
    chips: ["Mapping", "Validation", "Drafting"],
  },
  {
    title: "Review",
    description: "Operators approve ready drafts in seconds and push directly to your TMS.",
    Icon: CheckCircle2,
    colorClass: "text-ac-pos",
    chips: ["Approval", "Exceptions", "TMS ready"],
  },
];

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  chips: string[];
}

const GridItem = ({ icon, title, description, chips }: GridItemProps) => (
  <li className="min-h-[10rem] list-none">
    <div className="relative h-full rounded-xl border-[0.75px] border-th-line p-1.5 md:rounded-2xl md:p-2">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-lg border-[0.75px] border-th-line-subtle bg-th-surface p-5 text-center shadow-[0px_0px_27px_0px_rgba(45,45,45,0.15)]">
        <div className="w-fit rounded-lg border border-th-line bg-th-surface-alt/50 p-2">
          {icon}
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold tracking-tight text-th-heading">{title}</h3>
          <p className="text-[13px] leading-relaxed text-th-body">{description}</p>
        </div>
        <div className="mt-auto flex flex-wrap justify-center gap-1">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-th-line bg-th-surface-alt/30 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-th-muted"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  </li>
);

export const ProcessFlowSection = () => (
  <section
    id="process-flow"
    className="relative z-10 border-y border-th-line-subtle bg-th-page py-16"
  >
    <div className={PETARON_SECTION_SHELL}>
      <SectionHeading
        title="How it works"
        description="From raw input to validated TMS entry. Three steps, zero friction."
      />

      <motion.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-3"
      >
        {steps.map((step) => (
          <GridItem
            key={step.title}
            icon={<step.Icon className={`h-5 w-5 ${step.colorClass}`} />}
            title={step.title}
            description={step.description}
            chips={step.chips}
          />
        ))}
      </motion.ul>
    </div>
  </section>
);
