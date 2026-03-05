import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const stats = [
  { value: "1,000+", label: "Orders processed in latest pilot" },
  { value: "47", label: "Different shipper formats handled" },
  { value: "96.3%", label: "First-pass accuracy" },
  { value: "40s", label: "Average review time per order" },
];

const SocialProof = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="py-16 md:py-24 relative px-6 md:px-12" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-card border border-border rounded-3xl p-10 md:p-16"
      >
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-display font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-6">
          Results
        </span>

        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-12">
          Proven in production
        </h2>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-secondary/50 p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-primary text-glow mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="rounded-2xl border border-border bg-secondary/30 p-8 md:p-10 relative">
          <Quote className="w-8 h-8 text-primary/20 absolute top-6 left-6" />
          <blockquote className="relative z-10">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-display italic">
              "We went from 12 minutes per order to approving Petaron's summary
              in 40 seconds. The team now spends their time on client
              relationships instead of data entry."
            </p>
            <footer className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="font-display font-bold text-primary text-sm">MH</span>
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-foreground">
                  Operations Manager
                </p>
                <p className="text-xs text-muted-foreground">
                  European 3PL, 200+ orders/day
                </p>
              </div>
            </footer>
          </blockquote>
        </div>
      </motion.div>
    </section>
  );
};

export default SocialProof;
