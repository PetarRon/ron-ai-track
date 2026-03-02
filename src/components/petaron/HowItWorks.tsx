import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Brain, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect",
    description:
      "Send your order emails to Petaron, or upload documents directly. No IT team needed. You're live in 2–3 days.",
    icon: Mail,
  },
  {
    number: "02",
    title: "Read & Capture",
    description:
      "Our AI reads every format — no configuration, no setup, no maintenance. It understands the meaning of what's written, not just the layout.",
    icon: Brain,
  },
  {
    number: "03",
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
    <section id="how-it-works" className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-medium tracking-[0.2em] uppercase text-sm mb-4">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Three steps. No complexity.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative p-8 rounded-xl border transition-all ${
                step.highlighted
                  ? "border-primary/40 bg-primary/5 border-glow"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    step.highlighted
                      ? "bg-primary/20 border border-primary/30"
                      : "bg-secondary border border-border"
                  }`}
                >
                  <step.icon
                    className={`w-6 h-6 ${
                      step.highlighted ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span className="text-muted-foreground/40 font-display font-bold text-3xl">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>

              {step.highlighted && (
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-primary font-display font-medium bg-primary/10 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Human-in-the-loop
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
