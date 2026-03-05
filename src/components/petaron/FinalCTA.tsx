import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="book-demo" className="relative" ref={ref}>
      {/* Light background layer with geometric shapes */}
      <div className="bg-surface-light py-32 md:py-44 relative overflow-hidden">
        {/* Geometric floating blocks */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top-left cluster */}
          <div className="geo-block absolute top-12 left-[8%] w-16 h-16 opacity-60" />
          <div className="geo-block absolute top-8 left-[12%] w-10 h-10 opacity-40" />
          <div className="geo-block absolute top-28 left-[5%] w-12 h-12 opacity-30" />
          
          {/* Top-right cluster */}
          <div className="geo-block absolute top-16 right-[10%] w-14 h-14 opacity-50" />
          <div className="geo-block absolute top-6 right-[15%] w-8 h-8 opacity-35" />
          
          {/* Middle-left */}
          <div className="geo-block absolute top-1/2 -translate-y-1/2 left-[3%] w-20 h-20 opacity-25" />
          <div className="geo-block absolute top-[45%] left-[10%] w-10 h-10 opacity-40" />
          <div className="geo-block-accent absolute top-[40%] left-[7%] w-8 h-8 opacity-70" />

          {/* Middle-right */}
          <div className="geo-block absolute top-1/2 -translate-y-1/2 right-[5%] w-16 h-16 opacity-30" />
          <div className="geo-block absolute top-[55%] right-[12%] w-12 h-12 opacity-45" />
          <div className="geo-block-accent absolute top-[48%] right-[8%] w-6 h-6 opacity-60" />

          {/* Bottom clusters */}
          <div className="geo-block absolute bottom-16 left-[15%] w-14 h-14 opacity-35" />
          <div className="geo-block absolute bottom-10 left-[20%] w-8 h-8 opacity-25" />
          <div className="geo-block absolute bottom-20 right-[18%] w-12 h-12 opacity-40" />
          <div className="geo-block absolute bottom-8 right-[22%] w-10 h-10 opacity-30" />

          {/* Dotted connector lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="30%" x2="25%" y2="50%" stroke="hsl(220 20% 70%)" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="75%" y1="35%" x2="90%" y2="55%" stroke="hsl(220 20% 70%)" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="40%" y1="20%" x2="60%" y2="25%" stroke="hsl(220 20% 70%)" strokeWidth="1.5" strokeDasharray="4 6" />
          </svg>
        </div>

        {/* CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight text-[hsl(220_25%_10%)]">
            Ready to stop typing orders
            <br />
            and start approving them?
          </h2>

          <a
            href="mailto:hello@petaron.ai"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-full font-display font-semibold text-lg transition-all hover:shadow-[0_0_30px_hsl(175_85%_45%/0.3)] hover:scale-105 uppercase tracking-wider text-sm"
          >
            Book Your Free Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
