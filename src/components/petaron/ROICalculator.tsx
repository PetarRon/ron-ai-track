import { useState, useMemo, useRef } from "react"; // v2
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const ROICalculator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [ordersPerDay, setOrdersPerDay] = useState(150);
  const [minutesPerOrder, setMinutesPerOrder] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);

  const results = useMemo(() => {
    const workingDaysPerMonth = 22;
    const monthlyCost = (ordersPerDay * workingDaysPerMonth * minutesPerOrder / 60) * hourlyCost;
    const annualCost = monthlyCost * 12;
    const hoursPerMonth = ordersPerDay * workingDaysPerMonth * minutesPerOrder / 60;

    return {
      monthlyCost: Math.round(monthlyCost),
      annualCost: Math.round(annualCost),
      hoursPerMonth: Math.round(hoursPerMonth),
    };
  }, [ordersPerDay, minutesPerOrder, hourlyCost]);

  return (
    <section id="roi-calculator" className="py-16 md:py-24 relative px-6 md:px-12" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-card border border-border rounded-3xl p-10 md:p-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-display font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-6">
          ROI Calculator
        </span>

        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-12">
          See your savings in real time
        </h2>

        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4">
            <label className="text-sm font-display font-medium text-muted-foreground">
              Orders per day
            </label>
            <Slider
              value={[ordersPerDay]}
              onValueChange={(v) => setOrdersPerDay(v[0])}
              min={20}
              max={500}
              step={10}
            />
            <p className="text-2xl font-display font-bold text-foreground">{ordersPerDay}</p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-display font-medium text-muted-foreground">
              Minutes per order today
            </label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((v) => (
                <button
                  key={v}
                  onClick={() => setMinutesPerOrder(v)}
                  className={`flex-1 py-2.5 rounded-lg font-display font-semibold text-sm transition-all ${
                    minutesPerOrder === v
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {v} min
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-display font-medium text-muted-foreground">
              Staff hourly cost
            </label>
            <div className="flex gap-2">
              {[25, 35, 50].map((v) => (
                <button
                  key={v}
                  onClick={() => setHourlyCost(v)}
                  className={`flex-1 py-2.5 rounded-lg font-display font-semibold text-sm transition-all ${
                    hourlyCost === v
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  €{v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-border mb-10" />

        {/* Results */}
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2">
              What you spend today per month
            </p>
            <p className="text-4xl font-display font-bold text-destructive">
              €{results.monthlyCost.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2">
              Per year on manual entry
            </p>
            <p className="text-4xl font-display font-bold text-foreground">
              €{results.annualCost.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2">
              Staff hours spent on data entry
            </p>
            <p className="text-3xl font-display font-bold text-foreground">
              {results.hoursPerMonth.toLocaleString()}
              <span className="text-base text-muted-foreground font-normal ml-1">hrs/month</span>
            </p>
          </div>
        </div>

        <div className="h-px bg-border mt-10 mb-6" />
        <p className="text-sm text-muted-foreground">
          Most customers reduce this cost by over 80%. Pricing is based on your volume.
        </p>

        {/* CTA */}
        <div className="mt-10 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground mb-4">
            Want to validate these numbers with your own data?
          </p>
          <a
            href="#book-demo"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-display font-semibold transition-all hover:shadow-[0_0_24px_hsl(175_85%_45%/0.3)] hover:scale-105"
          >
            Book a 15-minute demo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ROICalculator;
