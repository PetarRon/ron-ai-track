"use client";

import { motion } from "framer-motion";
import { featureCards } from "./data";
import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";

export const FeaturesSection = () => {
  return (
    <section id="how-it-works" className="relative z-10 py-24">
      <div className={PETARON_SECTION_SHELL}>
        <SectionHeading
          badge="Features"
          title="Built for speed and control"
          description="A simpler experience for teams that want speed, control, and clear operational visibility."
          tone="fuchsia"
        />

        <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] md:grid-cols-2">
          {featureCards.map(({ title, description, Icon, accent, text, eyebrow }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex flex-col justify-between bg-[#080c16] p-8 md:p-10 transition-colors duration-300 hover:bg-[#0a0f1c]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className={`absolute inset-0 bg-gradient-to-br ${accent === "bg-fuchsia-400" ? "from-fuchsia-500/8" : accent === "bg-cyan-400" ? "from-cyan-500/8" : accent === "bg-emerald-400" ? "from-emerald-500/8" : "from-violet-500/8"} to-transparent`} />
              </div>

              <div className="relative z-10">
                <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">{eyebrow}</div>
                <div className={`mb-6 inline-flex rounded-xl border border-white/8 bg-white/[0.03] p-3.5 ${text}`}>
                  <Icon size={22} />
                </div>
                <h4 className="mb-3 text-xl font-bold tracking-tight text-white">{title}</h4>
                <p className="max-w-sm text-sm leading-relaxed text-white/55">{description}</p>
              </div>

              <div className="relative z-10 mt-8">
                <div className={`h-px w-12 ${accent} opacity-40 transition-all duration-500 group-hover:w-24 group-hover:opacity-70`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
