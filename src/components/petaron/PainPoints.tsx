import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const PainPoints = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-10"
        >
          <p className="text-primary font-display font-medium tracking-[0.2em] uppercase text-sm">
            Does this sound familiar?
          </p>

          <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
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
      </div>
    </section>
  );
};

export default PainPoints;
