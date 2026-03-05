import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="book-demo" className="py-24 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight">
          Ready to stop typing orders
          <br />
          <span className="text-primary text-glow">and start approving them?</span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Process your first 100 orders free. If we don't save you time, you pay nothing.
        </p>

        <a
          href="mailto:hello@petaron.ai"
          className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-full font-display font-semibold text-lg transition-all hover:shadow-[0_0_30px_hsl(175_85%_45%/0.3)] hover:scale-105"
        >
          Book Your Free Demo
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        <p className="text-sm text-muted-foreground">
          No commitment · 15-minute call · We'll use your actual data
        </p>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
