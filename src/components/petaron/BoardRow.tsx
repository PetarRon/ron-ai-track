import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export type BoardSlide = {
  id: string;
  label: string;
  title: string;
  caption: string;
  src: string;
};

const FakeBrowserChrome = () => (
  <div className="flex items-center gap-1.5 border-b border-th-line bg-th-surface-alt/60 px-3 py-2.5">
    <span className="h-2.5 w-2.5 rounded-full bg-th-line" />
    <span className="h-2.5 w-2.5 rounded-full bg-th-line" />
    <span className="h-2.5 w-2.5 rounded-full bg-th-line" />
    <span className="ml-3 hidden sm:flex items-center gap-1.5 rounded-full border border-th-line bg-th-page/60 px-3 py-0.5 text-[10px] font-medium text-th-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-ac-pos" />
      petaron.ai
    </span>
  </div>
);

interface BoardRowProps {
  slide: BoardSlide;
  index: number;
  imageSide: "left" | "right";
  onExpand: (id: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export const BoardRow = ({ slide, index, imageSide, onExpand }: BoardRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  const imageFromLeft = imageSide === "left";

  return (
    <div
      ref={ref}
      className={`relative flex flex-col gap-8 py-12 lg:gap-16 lg:py-20 ${
        imageFromLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: imageFromLeft ? -80 : 80 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageFromLeft ? -80 : 80 }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
        className="lg:basis-[64%] lg:shrink-0"
      >
        <motion.button
          type="button"
          onClick={() => onExpand(slide.id)}
          aria-label={`Open larger preview of ${slide.title}`}
          layoutId={`board-${slide.id}`}
          transition={{ type: "spring", stiffness: 240, damping: 30 }}
          className="group relative block w-full overflow-hidden rounded-2xl border border-th-line bg-th-surface text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] cursor-zoom-in transition-shadow hover:shadow-[0_30px_100px_-20px_rgba(0,0,0,0.55)]"
        >
          <FakeBrowserChrome />
          <img
            src={slide.src}
            alt={slide.title}
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: imageFromLeft ? 60 : -60 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageFromLeft ? 60 : -60 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="flex flex-col justify-center lg:basis-[36%]"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ac-1 mb-3">
          {String(index + 1).padStart(2, "0")} / {slide.label}
        </p>
        <h3 className="text-2xl font-serif font-normal tracking-tight text-th-heading md:text-3xl mb-3">
          {slide.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-th-body max-w-md">
          {slide.caption}
        </p>
      </motion.div>
    </div>
  );
};
