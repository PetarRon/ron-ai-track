"use client";

import { motion } from "framer-motion";

export interface LogoItem {
  name: string;
  domain: string;
}

interface LogoMarqueeProps {
  logos: LogoItem[];
  speed?: number;
  className?: string;
}

export const LogoMarquee = ({
  logos,
  speed = 30,
  className = "",
}: LogoMarqueeProps) => {
  const doubled = [...logos, ...logos];

  return (
    <section className={`relative z-10 pb-16 ${className}`}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-th-muted"
      >
        Trusted Integrations
      </motion.p>
      <div className="relative mx-auto max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        <motion.div
          className="flex w-max gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {doubled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex h-10 min-w-[120px] items-center justify-center px-4"
            >
              <img
                src={`https://logo.clearbit.com/${item.domain}`}
                alt={item.name}
                className="h-5 object-contain brightness-0 invert opacity-40 transition-opacity duration-300 hover:opacity-70"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const span = document.createElement("span");
                  span.innerText = item.name;
                  span.className =
                    "text-th-muted font-medium text-sm tracking-wide";
                  e.currentTarget.parentElement?.appendChild(span);
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
