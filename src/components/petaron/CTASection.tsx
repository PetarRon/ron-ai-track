import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CTAButtons } from "./CTAButtons";
import { useContact } from "./contact-context";

const TYPEWRITER_WORDS = [
  "automate ?",
  "scale ?",
  "lead ?",
  "transform ?",
  "accelerate ?",
  "innovate ?",
  "advance ?",
  "improve ?",
  "utilize AI ?",
  "move faster ?",
  "take control ?",
  "save time ?",
  "improve efficiency ?",
  "increase productivity ?",
  "optimize workflows ?",
  "enhance service ?",
];

const TypewriterWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block w-[220px] text-left align-baseline md:w-[280px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={TYPEWRITER_WORDS[index]}
          className="inline-block bg-gradient-to-r from-ac-1 via-ac-2 to-ac-3 bg-clip-text text-transparent"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {TYPEWRITER_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export const CTASection = () => {
  const { openContact } = useContact();
  return (
    <section id="booking" className="pt-10 pb-20 relative z-10">
      <div className="mx-auto w-full max-w-[1300px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-serif font-normal tracking-tight text-th-heading md:text-3xl text-center whitespace-nowrap">
            Ready to&nbsp;<TypewriterWord />
          </h3>
          <div className="mt-8">
            <CTAButtons onContact={openContact} />
          </div>
        </div>
      </div>
    </section>
  );
};
