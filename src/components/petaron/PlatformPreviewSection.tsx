"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";

const boardSlides = [
  {
    id: "ops",
    label: "Operations",
    title: "Operations overview",
    caption:
      "Throughput, queue health, and active processing at a glance.",
    src: "/petaron-board-ops.svg",
  },
  {
    id: "review",
    label: "Review",
    title: "Review workspace",
    caption:
      "Approve orders fast with a focused review layer.",
    src: "/petaron-board-review.svg",
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "Analytics snapshot",
    caption:
      "Leadership-friendly reporting without heavy tooling.",
    src: "/petaron-board-analytics.svg",
  },
];

export const PlatformPreviewSection = () => {
  const [active, setActive] = useState(0);
  const current = boardSlides[active];

  return (
    <section id="platform" className="relative z-10 py-16">
      <div className={PETARON_SECTION_SHELL}>
        <SectionHeading
          title="See it in action"
          description="Explore the product views that power your daily operations."
        />

        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center justify-center gap-1 rounded-full border border-th-line bg-th-surface-alt/50 p-1 backdrop-blur-sm w-fit mx-auto">
            {boardSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActive(i)}
                className={`relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-300 ${
                  active === i
                    ? "text-[#06070c]"
                    : "text-th-muted hover:text-th-heading"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-full bg-ac-1"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{slide.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="group relative overflow-hidden rounded-2xl border border-th-line bg-th-surface-alt/80 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            >
              <div className="relative w-full overflow-hidden bg-th-surface" style={{ aspectRatio: "2.2 / 1" }}>
                <img
                  src={current.src}
                  alt={current.title}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-th-surface-alt via-transparent to-transparent opacity-50" />
              </div>

              <div className="relative z-10 px-5 py-3">
                <h4 className="text-sm font-bold tracking-tight text-th-heading">
                  {current.title}
                </h4>
                <p className="mt-0.5 max-w-lg text-xs leading-relaxed text-th-body">
                  {current.caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
