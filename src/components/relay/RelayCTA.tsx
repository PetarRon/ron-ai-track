import { motion } from "framer-motion";
import { useContact } from "@/components/petaron/contact-context";
import { CalButton, Em, RELAY_SHELL, buttonVariants, settle } from "./shared";

/**
 * The one ask: a lime panel with the demo booking, ahead of the FAQ. The light
 * stream ends inside it (`data-stream-end`), so the FAQ and footer sit on black.
 */
export const RelayCTA = () => {
  const { openContact } = useContact();
  return (
    <section id="demo" className={`relative scroll-mt-24 py-20 ${RELAY_SHELL}`}>
      <motion.div {...settle()} data-stream-end className="rounded-[28px] bg-ac-1 px-6 py-16 text-center md:px-12 md:py-20">
        <h2 className="mx-auto max-w-2xl text-balance font-display text-[clamp(30px,4.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em] text-th-page">
          Ready to automate your <Em dark>order entry</Em>?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-th-page/75">
          Book a 30-minute demo and see Petaron.ai run on your own orders. <br className="hidden md:block" />A free
          one-month pilot, no card, and your TMS stays exactly as it is.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <CalButton variant="dark">Book a Demo for Free</CalButton>
          <button
            type="button"
            onClick={openContact}
            className={`${buttonVariants.ghost} border-th-page/20 bg-transparent text-th-page hover:bg-th-page/10`}
          >
            Get in Touch
          </button>
        </div>
      </motion.div>
    </section>
  );
};
