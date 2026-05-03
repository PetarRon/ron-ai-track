import { motion } from "framer-motion";
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
      <picture>
        <source srcSet="/hero-bg.avif" type="image/avif" />
        <source srcSet="/hero-bg.webp" type="image/webp" />
        <img
          src="/hero-bg.png"
          alt=""
          width={2400}
          height={1600}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-50"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-th-page/30 via-th-page/50 to-th-page" />
    </div>

    <div className="relative mx-auto w-full max-w-[1300px] px-5 pb-32 md:px-8 md:pb-48 z-10">
      <section className="relative pb-10 pt-16 md:pb-20 md:pt-24">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-[26px] font-serif font-normal tracking-tight text-th-heading sm:text-[28px] md:text-[36px] lg:text-[44px] flex flex-col items-center gap-4 text-center md:gap-5">
            <span className="block w-full leading-[1.2] sm:leading-[1.3] [padding-block-end:0.05em]">
              <RevealText text="Order entry has never been this easy" />
            </span>
            <motion.span
              className="bg-gradient-to-r from-ac-hero-from via-ac-hero-via to-ac-hero-to bg-clip-text text-transparent block w-full max-w-2xl mx-auto font-serif italic text-[18px] leading-[1.3] [padding-block-end:0.1em] box-decoration-clone sm:text-[20px] md:text-[28px] lg:text-[34px]"
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
            className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-th-body md:text-base font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            No more manual entry. Petaron.ai works side-by-side with your team, handling order intake, allowing your team to build stronger customer relationships.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <CTAButtons onContact={openContact} />
          </motion.div>
        </div>
      </section>

    </div>
  </>
  );
};
