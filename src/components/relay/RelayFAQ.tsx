import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems } from "@/components/petaron/data";
import { Em, RELAY_SHELL, settle } from "./shared";

export const RelayFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className={`relative scroll-mt-20 pb-28 pt-20 ${RELAY_SHELL}`}>
      <div className="mx-auto grid max-w-3xl justify-items-center gap-4 text-center">
        <motion.h2
          {...settle()}
          className="text-balance font-display text-[clamp(28px,4.4vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-th-heading"
        >
          Common questions, <Em>straight answers.</Em>
        </motion.h2>
        <motion.p {...settle(0.1)} className="max-w-xl font-body text-[15px] leading-relaxed text-th-body">
          What operations teams ask us in the first call.
        </motion.p>
      </div>
      <motion.ul {...settle(0.1)} className="mx-auto mt-12 max-w-4xl divide-y divide-th-line/60 border-y border-th-line/60">
        {faqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.question}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[1fr_auto] items-center gap-6 py-5 text-left md:grid-cols-[120px_1fr_auto]"
              >
                <span className="hidden font-mono text-[12px] text-ac-1 md:block">{item.meta}</span>
                <span className="font-body text-[17px] text-th-heading">{item.question}</span>
                <Plus
                  className={`h-4 w-4 text-th-muted transition-transform duration-500 ${isOpen ? "rotate-45 text-ac-1" : ""}`}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-6 font-body text-[15px] leading-relaxed text-th-body md:ml-[144px]">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </motion.ul>
    </section>
  );
};
