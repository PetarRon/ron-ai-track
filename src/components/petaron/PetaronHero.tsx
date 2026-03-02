import { motion } from "framer-motion";
import { ArrowRight, Calculator, Mail, Loader2, CheckCircle2 } from "lucide-react";

const ProductMockup = () => (
  <div className="relative w-full max-w-lg mx-auto">
    {/* Outer glow */}
    <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-2xl" />
    <div className="relative bg-card border border-border rounded-xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-destructive/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-sm text-muted-foreground font-display">Petaron Dashboard</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Email card */}
        <div className="bg-secondary/50 border border-border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-sm text-foreground">New Order Email</p>
              <p className="text-xs text-muted-foreground mt-0.5">From: logistics@acmecorp.com</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                Please arrange transport for 24 pallets from Rotterdam to Munich…
              </p>
            </div>
          </div>
        </div>

        {/* Processing indicator */}
        <div className="flex items-center justify-center gap-2 py-2">
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
          <span className="text-sm text-primary font-display">AI processing…</span>
        </div>

        {/* Result card */}
        <div className="bg-secondary/50 border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-sm font-display font-semibold text-green-400">Ready for Review</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground text-xs">Origin</span>
              <p className="font-display font-semibold text-foreground">Rotterdam, NL</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Destination</span>
              <p className="font-display font-semibold text-foreground">Munich, DE</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Cargo</span>
              <p className="font-display font-semibold text-foreground">24 Pallets</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Weight</span>
              <p className="font-display font-semibold text-foreground">18,400 kg</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-primary/15 border border-primary/30 text-primary font-display font-semibold text-sm py-2.5 rounded-lg hover:bg-primary/25 transition-colors">
            Approve & Send to TMS →
          </button>
        </div>
      </div>
    </div>
  </div>
);

const trustLogos = ["CargoWise", "SAP", "Descartes", "Scope", "Modality"];

const PetaronHero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-xs font-display font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Built for European freight forwarders
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight">
              Transport orders processed in{" "}
              <span className="text-primary text-glow">30 seconds</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Petaron reads your order emails and documents, captures all the details
              your team would manually type, and sends them straight into your system —
              with a human checking every order before it goes through.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#book-demo"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-semibold text-lg transition-all hover:shadow-[0_0_30px_hsl(175_85%_45%/0.3)] hover:scale-105"
              >
                See It in Action
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#roi-calculator"
                className="group inline-flex items-center gap-3 border border-border bg-secondary/50 text-foreground px-8 py-4 rounded-lg font-display font-medium text-lg transition-all hover:border-primary/50"
              >
                <Calculator className="w-5 h-5 text-primary" />
                Calculate Your Savings
              </a>
            </div>
          </motion.div>

          {/* Right: Product mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ProductMockup />
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 pt-10 border-t border-border/50"
        >
          <p className="text-xs text-muted-foreground font-display uppercase tracking-[0.2em] mb-6 text-center">
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
