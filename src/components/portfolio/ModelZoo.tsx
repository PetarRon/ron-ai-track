import { motion } from "framer-motion";
import { modelZooItems } from "@/data/portfolio";
import { useState } from "react";

const ModelZoo = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="model-zoo" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-50" />

      {/* Header */}
      <div className="section-padding pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <p className="text-primary font-display font-medium tracking-[0.3em] uppercase text-sm mb-4">
            03
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight">
            Model Zoo<span className="text-primary">.</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-xl">
            A hall of fame of AI systems and models — each one built, trained, and deployed.
          </p>
        </motion.div>
      </div>

      {/* Gallery — helmet/figure showcase style */}
      <div className="section-padding pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {modelZooItems.map((item, i) => {
            const isHovered = hoveredId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative cursor-pointer"
              >
                {/* Pedestal card */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:border-primary/50">
                  {/* Radial spotlight from top */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at 50% 20%, hsl(175 85% 45% / ${isHovered ? 0.15 : 0.04}) 0%, transparent 70%)`,
                    }}
                  />

                  {/* Vertical light beam */}
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-px h-full transition-all duration-700 ${
                      isHovered ? "opacity-60 shadow-[0_0_15px_3px_hsl(175_85%_45%/0.3)]" : "opacity-10"
                    }`}
                    style={{ background: "linear-gradient(to bottom, hsl(175 85% 45% / 0.6), transparent 70%)" }}
                  />

                  {/* Figure / Icon — floating effect */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      animate={isHovered ? { y: -8, rotateY: 15 } : { y: 0, rotateY: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="relative"
                      style={{ perspective: "800px" }}
                    >
                      {/* Glow ring behind icon */}
                      <div
                        className={`absolute -inset-6 rounded-full blur-2xl transition-opacity duration-500 ${
                          isHovered ? "opacity-50" : "opacity-0"
                        }`}
                        style={{ background: "radial-gradient(circle, hsl(175 85% 45% / 0.4), transparent)" }}
                      />

                      {/* Icon container — "helmet" */}
                      <div
                        className={`relative w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isHovered
                            ? "bg-primary/20 border-primary/50 shadow-[0_0_40px_hsl(175_85%_45%/0.2),inset_0_0_30px_hsl(175_85%_45%/0.1)]"
                            : "bg-primary/5 border-primary/10"
                        } border`}
                      >
                        <item.icon
                          className={`w-10 h-10 md:w-14 md:h-14 transition-all duration-500 ${
                            isHovered ? "text-primary drop-shadow-[0_0_12px_hsl(175_85%_45%/0.6)]" : "text-primary/60"
                          }`}
                        />
                      </div>
                    </motion.div>

                    {/* Year badge — floats above like a label */}
                    <motion.span
                      animate={isHovered ? { y: -4, opacity: 1 } : { y: 0, opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 text-xs font-display font-bold tracking-[0.4em] text-primary uppercase"
                    >
                      {item.year}
                    </motion.span>
                  </div>

                  {/* Bottom info — pedestal label */}
                  <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 bg-gradient-to-t from-background/90 via-background/50 to-transparent">
                    <motion.div
                      animate={isHovered ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-base md:text-xl font-display font-bold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                        {item.type}
                      </p>
                    </motion.div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-primary transition-transform duration-500 origin-left ${
                      isHovered ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModelZoo;
