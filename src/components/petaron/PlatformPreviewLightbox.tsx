import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import type { BoardSlide } from "./BoardRow";

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

interface Props {
  slide: BoardSlide | null;
  onClose: () => void;
}

export const PlatformPreviewLightbox = ({ slide, onClose }: Props) => {
  useEffect(() => {
    if (!slide) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [slide, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {slide && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${slide.title} preview`}
        >
          <motion.div
            className="absolute inset-0 bg-black/82 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            layoutId={`board-${slide.id}`}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
            className="relative w-full max-w-[1600px] max-h-[92vh] overflow-hidden rounded-2xl border border-th-line bg-th-surface shadow-[0_30px_100px_rgba(0,0,0,0.55)] cursor-zoom-out"
          >
            <FakeBrowserChrome />
            <img
              src={slide.src}
              alt={slide.title}
              className="block h-auto w-full max-h-[calc(92vh-44px)] object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
