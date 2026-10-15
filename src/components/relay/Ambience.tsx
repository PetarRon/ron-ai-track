import { useEffect, useRef } from "react";

/**
 * The page's backdrop: three large, very soft glows that drift slowly and
 * shift a little as you scroll, over a fine grain. Fixed behind everything,
 * plain CSS (`relay-amb*` in src/index.css); the only script writes the
 * scroll progress into `--amb-p`. Still under reduced motion.
 */
export const Ambience = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--amb-p", (max > 0 ? window.scrollY / max : 0).toFixed(4));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="relay-amb pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <span className="relay-amb-glow is-a" />
      <span className="relay-amb-glow is-b" />
      <span className="relay-amb-glow is-c" />
      <span className="relay-amb-grain" />
    </div>
  );
};
