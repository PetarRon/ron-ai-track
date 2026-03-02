import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const rows = [
  {
    feature: "New client format",
    traditional: "Hours of configuration",
    petaron: "Works immediately",
  },
  {
    feature: "Maintenance",
    traditional: "Constant updates needed",
    petaron: "Zero maintenance",
  },
  {
    feature: "Accuracy",
    traditional: "Degrades as formats change",
    petaron: "Consistent across all formats",
  },
  {
    feature: "Getting started",
    traditional: "Weeks to months",
    petaron: "2–3 days",
  },
  {
    feature: "Human oversight",
    traditional: "Manual checking of every field",
    petaron: "Structured review, one-click approve",
  },
];

const ComparisonTable = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Why switch
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Intelligence vs. rigidity
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Old tools break when a client changes their document layout.
            Petaron reads meaning, not fixed positions — like your best operator would.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 text-sm font-display font-semibold border-b border-border">
            <div className="p-5 text-muted-foreground" />
            <div className="p-5 text-muted-foreground text-center">Traditional</div>
            <div className="p-5 text-primary text-center bg-primary/5">Petaron</div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 text-sm ${
                i < rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="p-5 font-display font-medium text-foreground">
                {row.feature}
              </div>
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
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
