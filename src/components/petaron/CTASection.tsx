import { motion } from "framer-motion";
import { CTAButtons } from "./CTAButtons";
import { useContact } from "./contact-context";

export const CTASection = () => {
  const { openContact } = useContact();
  return (
    <section id="booking" className="pt-10 pb-20 relative z-10">
      <div className="mx-auto w-full max-w-[1300px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h3
            className="text-2xl font-serif font-normal tracking-tight md:text-3xl bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(100deg, rgb(var(--th-heading)) 0%, rgb(var(--th-heading)) 40%, rgba(255,255,255,0.95) 50%, rgb(var(--th-heading)) 60%, rgb(var(--th-heading)) 100%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "200% 0",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{ backgroundPosition: ["200% 0", "-100% 0"] }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3.6,
            }}
          >
            Ready to automate your order entry?
          </motion.h3>
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
