import { motion } from "framer-motion";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { integrations } from "./data";
import { CTAButtons } from "./CTAButtons";
import { useContact } from "./contact-context";

const NBSP = String.fromCharCode(160);

const RevealText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? NBSP : ""}
        </span>
      ))}
    </span>
  );
};

export const Hero = () => {
  const { openContact } = useContact();
  return (
    <>
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[800px] overflow-hidden md:h-[900px]">
      <img src="/hero-bg.png" alt="" className="h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-th-page/30 via-th-page/50 to-th-page" />
    </div>

    <div className="relative mx-auto w-full max-w-[1300px] px-5 pb-10 md:px-8 z-10">
      <section className="relative pb-10 pt-14 md:pb-16 md:pt-22">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-serif font-normal tracking-tight text-th-heading md:text-4xl lg:text-5xl flex flex-col items-center gap-0 text-center md:gap-0.5">
            <span className="block w-full leading-[1.4] [padding-block-end:0.05em]">
              <RevealText text="Order entry has never been this easy" />
            </span>
            <motion.span
              className="bg-gradient-to-r from-ac-hero-from via-ac-hero-via to-ac-hero-to bg-clip-text text-transparent block w-full max-w-xl mx-auto font-serif italic text-xl leading-[1.12] [padding-block-end:0.1em] box-decoration-clone md:text-3xl lg:text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              The moment an order arrives
              <br />
              our AI agent gets to work
            </motion.span>
          </h1>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-th-body md:text-base font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            No more manual entry. Petaron.ai works side-by-side with your team,
            <br />
            handling order intake, allowing your team to build stronger customer relationships.
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <CTAButtons onContact={openContact} />
          </motion.div>
        </div>
      </section>

      <LogoMarquee logos={integrations} speed={25} />
    </div>
  </>
  );
};
