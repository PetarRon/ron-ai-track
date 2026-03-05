import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PainPoints = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 relative px-6 md:px-12" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto bg-card border border-border rounded-3xl p-10 md:p-16"
      >
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-display font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-8">
          The Problem
        </span>

        <div className="max-w-3xl space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
          <p>
            Every morning, the same mountain of order emails lands in your inbox.
            PDFs, Excel sheets, free-text emails — every client sends orders in
            their own format. Your team opens each one, reads it, and types the
            details into your TMS.{" "}
            <span className="text-foreground font-semibold">
              5 to 15 minutes per order.
            </span>{" "}
            Every single time.
          </p>

          <p>
            Mistakes happen — a wrong postcode, a missed reference, a weight
            typed as kilograms instead of tonnes. Small errors that cause
            delays, rework, and frustrated clients.{" "}
            <span className="text-foreground font-semibold">
              2–3 errors per 100 orders
            </span>{" "}
            processed by hand.
          </p>

          <p>
            And then there's the impossible math of growth: every new client
            means more orders, which means more staff doing the same repetitive
            work. Your best people spend their days copying data instead of
            managing relationships. The cost?{" "}
            <span className="text-primary font-display font-bold text-glow">
              €2.83 per order
            </span>{" "}
            in labor alone — and it only goes up.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PainPoints;
