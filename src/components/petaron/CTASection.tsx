import { motion } from "framer-motion";
import { CTAButtons } from "./CTAButtons";
import { useContact } from "./contact-context";

export const CTASection = () => {
  const { openContact } = useContact();
  return (
    <section id="booking" className="scroll-mt-24 pt-10 pb-20 relative z-10">
      <div className="mx-auto w-full max-w-[1300px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/*
            Shimmer: the visible third of a 300%-wide gradient is solid ink at
            both rest positions, so the highlight only shows while it sweeps.
            (A tiled 200% gradient left the highlight parked at the line end.)
          */}
          <motion.h2
            className="text-balance text-2xl font-serif font-normal tracking-tight md:text-3xl bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(100deg, rgb(var(--th-heading)) 0%, rgb(var(--th-heading)) 44%, rgba(255,255,255,0.95) 50%, rgb(var(--th-heading)) 56%, rgb(var(--th-heading)) 100%)",
              backgroundSize: "300% 100%",
              backgroundPosition: "100% 0",
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{ backgroundPosition: ["100% 0", "0% 0"] }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3.6,
            }}
          >
            Ready to automate your order entry?
          </motion.h2>
          <p className="mt-3 text-sm text-th-body md:text-base">
            Book a 30-minute demo and see Petaron.ai run on your own orders.
          </p>
          <div className="mt-8">
            <CTAButtons onContact={openContact} />
          </div>
        </div>
      </div>
    </section>
  );
};
