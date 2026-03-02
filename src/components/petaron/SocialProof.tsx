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
    <section id="results" className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Results
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Proven in production
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-primary text-glow mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 relative"
        >
          <Quote className="w-10 h-10 text-primary/30 absolute top-6 left-6" />
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
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
