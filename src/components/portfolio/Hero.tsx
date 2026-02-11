import { motion } from "framer-motion";
import { ArrowDown, Mail, ExternalLink } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="relative z-10 section-padding w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-primary font-display font-medium tracking-[0.3em] uppercase text-sm"
          >
            Portfolio
          </motion.p>

          {/* Name */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] tracking-tight">
            <span className="block">{personalInfo.name.split(" ").slice(0, 2).join(" ")}</span>
            <span className="block text-primary text-glow">
              {personalInfo.name.split(" ").slice(2).join(" ")}
            </span>
          </h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-primary" />
            <p className="text-xl md:text-2xl font-display font-light text-secondary-foreground">
              {personalInfo.title}
              <span className="text-muted-foreground"> / </span>
              {personalInfo.subtitle}
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="#on-track"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-semibold text-lg transition-all hover:shadow-[0_0_30px_hsl(175_85%_45%/0.3)] hover:scale-105"
            >
              View Work
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-3 border border-border bg-secondary/50 text-foreground px-8 py-4 rounded-lg font-display font-medium text-lg transition-all hover:border-primary/50 hover:bg-secondary"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
