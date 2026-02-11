import { motion } from "framer-motion";
import { modelZooItems } from "@/data/portfolio";

const ModelZoo = () => {
  return (
    <section id="model-zoo" className="relative min-h-screen flex flex-col justify-center">
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
            A gallery of AI systems and models built across the years.
          </p>
        </motion.div>
      </div>

      {/* Gallery grid */}
      <div className="section-padding pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {modelZooItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-square bg-card border border-border rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-primary/40 hover:shadow-[0_0_50px_hsl(175_85%_45%/0.08)]"
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary/40 transition-all">
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {item.type}
                </p>
                <span className="mt-3 text-xs font-display font-semibold text-primary tracking-wider">
                  {item.year}
                </span>
              </div>

              {/* Hover glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelZoo;
