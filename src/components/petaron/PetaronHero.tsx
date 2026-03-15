import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categoryTabs = [
  { label: "Order Processing", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "Security", href: "#trust" },
  { label: "ROI", href: "#roi-calculator" },
];

const trustLogos = ["CargoWise", "SAP", "Descartes", "Scope", "Modality"];

const PetaronHero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full text-center space-y-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight"
        >
          Transport orders processed
          <br />
          in <span className="text-primary text-glow">30 seconds</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          PetaRon connects to your order pipeline, reads every incoming order, and pushes structured data directly into your TMS. Your team approves, not types.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#book-demo"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-display font-semibold text-lg transition-all hover:shadow-[0_0_30px_hsl(175_85%_45%/0.3)] hover:scale-105"
          >
            See It in Action
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-3 flex-wrap pt-4"
        >
          {categoryTabs.map((tab) => (
            <a
              key={tab.href}
              href={tab.href}
              className="px-5 py-2.5 rounded-full border border-border bg-card text-sm font-display font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            >
              {tab.label} ↘
            </a>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="pt-16"
        >
          <p className="text-xs text-muted-foreground font-display uppercase tracking-[0.2em] mb-6">
            Integrates with your existing systems
          </p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {trustLogos.map((name) => (
              <span
                key={name}
                className="text-muted-foreground/50 font-display font-semibold text-sm tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PetaronHero;
