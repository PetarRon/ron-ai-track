import { useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const ROICalculator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [ordersPerDay, setOrdersPerDay] = useState(150);
  const [minutesPerOrder, setMinutesPerOrder] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);

  const results = useMemo(() => {
    const workingDays = 250;
    const totalOrdersYear = ordersPerDay * workingDays;
    const hoursManual = (totalOrdersYear * minutesPerOrder) / 60;
    const hoursSaved = hoursManual * 0.85; // 85% time saved
    const moneySaved = hoursSaved * hourlyCost;
    const fteFreed = hoursSaved / 1800; // ~1800 working hours/year
    const costBefore = (minutesPerOrder / 60) * hourlyCost;
    const costAfter = costBefore * 0.15;

    return {
      hoursSaved: Math.round(hoursSaved),
      moneySaved: Math.round(moneySaved),
      fteFreed: fteFreed.toFixed(1),
      costBefore: costBefore.toFixed(2),
      costAfter: costAfter.toFixed(2),
    };
  }, [ordersPerDay, minutesPerOrder, hourlyCost]);

  return (
    <section id="roi-calculator" className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-medium tracking-[0.2em] uppercase text-sm mb-4">
            ROI Calculator
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            See your savings in real time
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12"
        >
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

          {/* Divider */}
          <div className="h-px bg-border mb-10" />

          {/* Results */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2">
                Hours saved / year
              </p>
              <p className="text-3xl font-display font-bold text-foreground">
                {results.hoursSaved.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2">
                Money saved / year
              </p>
              <p className="text-4xl font-display font-bold text-primary text-glow">
                €{results.moneySaved.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2">
                FTEs freed up
              </p>
              <p className="text-3xl font-display font-bold text-foreground">
                {results.fteFreed}
                <span className="text-base text-muted-foreground font-normal ml-1">people</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2">
                Cost per order
              </p>
              <p className="text-foreground font-display">
                <span className="text-muted-foreground line-through text-lg">€{results.costBefore}</span>
                <span className="text-2xl font-bold text-primary ml-2">€{results.costAfter}</span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">
              Want to validate these numbers with your own data?
            </p>
            <a
              href="#book-demo"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-display font-semibold transition-all hover:shadow-[0_0_24px_hsl(175_85%_45%/0.3)] hover:scale-105"
            >
              Book a 15-minute demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
