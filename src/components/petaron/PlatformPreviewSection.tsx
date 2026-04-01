"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";

const boardSlides = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Operations dashboard",
    caption:
      "Team leads get a clear view of pipeline health, review load, and email throughput in one place.",
    src: "/petaron-dashboard.png",
  },
  {
    id: "orders",
    label: "Orders",
    title: "Orders inbox",
    caption:
      "Incoming requests are classified, confidence-scored, and routed so the team can focus on what needs attention first.",
    src: "/petaron-orders.png",
  },
  {
    id: "review",
    label: "Review",
    title: "Flag order review",
    caption:
      "The agent reads the PDF, prepares the draft, and leaves uncertain fields highlighted for human validation before confirmation.",
    src: "/petaron-review.png",
  },
];

export const PlatformPreviewSection = () => {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const current = boardSlides[active];
  const expandedSlide = useMemo(
    () => boardSlides.find((slide) => slide.id === expanded) ?? null,
    [expanded],
  );

  useEffect(() => {
    if (!expanded) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [expanded]);

  return (
    <section id="platform" className="relative z-10 py-16">
      <div className={PETARON_SECTION_SHELL}>
        <SectionHeading
          title="See it in action"
          description="See how the team monitors operations, triages incoming work, and validates flagged order details."
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
                    ? "text-white"
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
              <button
                type="button"
                onClick={() => setExpanded(current.id)}
                className="relative block w-full overflow-hidden bg-th-surface p-3 text-left"
                style={{ aspectRatio: "2.2 / 1" }}
                aria-label={`Expand ${current.title}`}
              >
                <img
                  src={current.src}
                  alt={current.title}
                  className="h-full w-full rounded-xl object-contain object-center transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </button>

              <div className="relative z-10 px-5 py-3 text-center">
                <h4 className="text-sm font-bold tracking-tight text-th-heading">
                  {current.title}
                </h4>
                <p className="mt-0.5 mx-auto max-w-3xl text-xs leading-relaxed text-th-body md:whitespace-nowrap">
                  {current.caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {expandedSlide && (
              <motion.div
                className="fixed inset-0 z-[999] flex items-center justify-center bg-black/82 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpanded(null)}
              >
                <motion.div
                  className="relative flex max-h-[92vh] w-full max-w-[96vw] items-center justify-center rounded-2xl border border-th-line bg-th-surface p-3 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(null)}
                    className="absolute right-3 top-3 z-10 rounded-full border border-th-line bg-th-page/90 p-2 text-th-muted transition hover:text-th-heading"
                    aria-label="Close preview"
                  >
                    <X size={16} />
                  </button>
                  <img
                    src={expandedSlide.src}
                    alt={expandedSlide.title}
                    className="max-h-[86vh] w-auto max-w-full rounded-xl object-contain"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
};
