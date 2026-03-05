import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Brain, CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Connect",
    description:
      "Send your order emails to Petaron, or upload documents directly. No IT team needed. You're live in 2–3 days.",
    icon: Mail,
  },
  {
    title: "Read & Capture",
    description:
      "Our AI reads every format — no configuration, no setup, no maintenance. It understands the meaning of what's written, not just the layout.",
    icon: Brain,
  },
  {
    title: "Review & Confirm",
    description:
      "Your team sees a clean, structured summary ready to approve. One click, and it flows into your system. Exceptions get flagged automatically.",
    icon: CheckCircle2,
    highlighted: true,
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative px-6 md:px-12" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-card border border-border rounded-3xl p-10 md:p-16"
      >
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-display font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-6">
          How It Works
        </span>

        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-12">
          Three steps. No complexity.
        </h2>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`rounded-2xl p-7 border ${
                step.highlighted
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-secondary/50"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                  step.highlighted
                    ? "bg-primary/20 border border-primary/30"
                    : "bg-muted border border-border"
                }`}
              >
                <step.icon
                  className={`w-5 h-5 ${
                    step.highlighted ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>

              <h3 className="text-lg font-display font-bold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

              {step.highlighted && (
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-primary font-display font-medium bg-primary/10 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Human-in-the-loop
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
