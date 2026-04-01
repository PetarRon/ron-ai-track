import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "New client format", traditional: "Hours of configuration", petaron: "Works immediately" },
  { feature: "Maintenance", traditional: "Constant updates needed", petaron: "Zero maintenance" },
  { feature: "Accuracy", traditional: "Degrades as formats change", petaron: "Consistent across all formats" },
  { feature: "Getting started", traditional: "Weeks of setup", petaron: "Demo in 2 days, POC in 5" },
  { feature: "Human oversight", traditional: "Manual checking of every field", petaron: "Structured review, one-click approve" },
];

const ComparisonTable = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 relative px-6 md:px-12" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-card border border-border rounded-3xl p-10 md:p-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-display font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-6">
          Why Switch
        </span>

        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
          Intelligence vs. rigidity
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Old tools break when a client changes their document layout.
          PetaRon reads meaning, not fixed positions, like your best operator would.
        </p>

        {/* Table */}
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-3 text-sm font-display font-semibold border-b border-border">
            <div className="p-5 text-muted-foreground" />
            <div className="p-5 text-muted-foreground text-center">Traditional</div>
            <div className="p-5 text-primary text-center bg-primary/5">PetaRon</div>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 text-sm ${i < rows.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="p-5 font-display font-medium text-foreground">{row.feature}</div>
              <div className="p-5 text-muted-foreground text-center flex items-center justify-center gap-2">
                <X className="w-4 h-4 text-destructive/60 shrink-0 hidden sm:block" />
                <span>{row.traditional}</span>
              </div>
              <div className="p-5 text-foreground text-center bg-primary/5 flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 hidden sm:block" />
                <span className="font-medium">{row.petaron}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ComparisonTable;
