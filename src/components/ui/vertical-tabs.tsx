"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/*
  Scroll-driven vertical tabs, adapted from 21st.dev "vertical-tabs".

  The steps stack in the left column, each block as tall as the panel. As
  the page scrolls, the step whose centre is nearest the middle of the
  viewport becomes active, and the panel, pinned at that same middle, swaps
  to its content. Clicking a step scrolls it into place. On small screens
  each step shows its own content inline instead.
*/
export type VerticalTabItem = {
  id: string;
  title: string;
  description: string;
  content: ReactNode;
};

type VerticalTabsProps = {
  items: VerticalTabItem[];
  /** Rendered panel height (frame included). Sets the step height and centres the sticky panel. */
  panelHeight?: string;
  className?: string;
  panelClassName?: string;
  /** Rendered once around the changing content, so the frame stays put while the inside changes. */
  frame?: (content: ReactNode) => ReactNode;
};

const slide = {
  enter: (direction: number) => ({ y: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction > 0 ? -40 : 40, opacity: 0 }),
};

const Step = ({
  item,
  index,
  active,
  baseId,
  onActivate,
  reduce,
  frame,
  stepRef,
}: {
  item: VerticalTabItem;
  index: number;
  active: boolean;
  baseId: string;
  onActivate: (index: number) => void;
  reduce: boolean;
  frame?: (content: ReactNode) => ReactNode;
  stepRef: (node: HTMLDivElement | null) => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const inline = <div className="flex min-h-0 flex-1 flex-col">{item.content}</div>;

  return (
    <div
      ref={(node) => {
        ref.current = node;
        stepRef(node);
      }}
      className="flex flex-col justify-center py-6 lg:min-h-[var(--vt-panel-h)] lg:py-8"
    >
      <button
        type="button"
        role="tab"
        id={`${baseId}-tab-${index}`}
        aria-selected={active}
        aria-controls={`${baseId}-panel`}
        onClick={() => {
          onActivate(index);
          ref.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        }}
        className={cn(
          "group relative pl-7 text-left transition-colors duration-300 md:pl-8",
          active ? "text-th-heading" : "text-th-muted hover:text-th-heading",
        )}
      >
        {/* Vertical rule; fills for the active step */}
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-th-line/80">
          <span
            className={cn(
              "absolute inset-x-0 top-0 h-full origin-top bg-th-heading transition-transform duration-500 ease-out",
              active ? "scale-y-100" : "scale-y-0",
            )}
          />
        </span>

        <p className="mb-3 font-mono text-xs tracking-[0.15em] transition-colors">{item.id}</p>
        <h3
          className={cn(
            "font-serif text-2xl tracking-tight transition-colors md:text-3xl",
            active ? "text-th-heading" : "text-th-body group-hover:text-th-heading",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-3 max-w-md text-base leading-relaxed transition-colors md:text-lg",
            active ? "text-th-body" : "text-th-muted",
          )}
        >
          {item.description}
        </p>
      </button>

      {/* Inline content for small screens, where there is no sticky panel */}
      <div className="mt-6 lg:hidden">{frame ? frame(inline) : inline}</div>
    </div>
  );
};

export function VerticalTabs({ items, panelHeight = "558px", className, panelClassName, frame }: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const activeRef = useRef(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion() ?? false;
  const baseId = useId();

  const activate = useCallback((index: number) => {
    if (index === activeRef.current) return;
    setDirection(index > activeRef.current ? 1 : -1);
    activeRef.current = index;
    setActiveIndex(index);
  }, []);

  // The active step is the one whose centre is nearest the viewport centre,
  // which is exactly where the sticky panel is pinned.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const distance = Math.abs(r.top + r.height / 2 - mid);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      activate(best);
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [activate]);

  const active = items[activeIndex];
  const transition = reduce
    ? { duration: 0.01 }
    : { y: { type: "spring" as const, stiffness: 300, damping: 32 }, opacity: { duration: 0.35 } };

  // Screens overlap during the swap (absolute inside a relative box) rather
  // than waiting for the exit to finish: with "wait" mode, quick successive
  // step changes could leave a stale screen on show.
  const content = (
    <div className="relative min-h-0 flex-1">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={active.id}
          custom={direction}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0 flex flex-col"
        >
          {active.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-[minmax(0,0.72fr),minmax(0,1.28fr)] lg:gap-10 xl:gap-14",
        className,
      )}
      style={{ "--vt-panel-h": panelHeight } as CSSProperties}
    >
      <div role="tablist" aria-orientation="vertical">
        {items.map((item, index) => (
          <Step
            key={item.id}
            item={item}
            index={index}
            active={index === activeIndex}
            baseId={baseId}
            onActivate={activate}
            reduce={reduce}
            frame={frame}
            stepRef={(node) => {
              stepRefs.current[index] = node;
            }}
          />
        ))}
      </div>

      {/* Sticky panel (desktop only) */}
      <div className="hidden lg:block">
        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${activeIndex}`}
          className={cn("sticky", frame ? undefined : "overflow-hidden", panelClassName)}
          // Pin the panel at the vertical centre of the viewport, where the
          // active step also sits, so the two stay aligned while scrolling.
          style={{ top: `max(5rem, calc(50vh - ${panelHeight} / 2))` }}
        >
          {frame ? frame(content) : content}
        </div>
      </div>
    </div>
  );
}

export default VerticalTabs;
