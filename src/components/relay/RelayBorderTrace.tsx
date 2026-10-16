import { memo, useEffect, useRef, type CSSProperties } from "react";
import { animate } from "framer-motion";

/**
 * A lime arc that runs along a card's outline toward the pointer: the animated
 * frame from Ron's portfolio (Aceternity's glowing effect, ported there with one
 * shared pointer listener), here without any glow, so no blur and no halo. Put
 * it first inside a `relative` card that has a border radius; the arc draws over
 * the card's own 1px border. Styles: `.relay-trace` in src/index.css.
 */

type Instance = { update: (x: number, y: number) => void };

// one pointer listener and one frame for every card on the page
const instances = new Set<Instance>();
let listening = false;
let frame = 0;
let lastX = 0;
let lastY = 0;
let hasPointer = false;

const tick = () => {
  frame = 0;
  if (hasPointer) instances.forEach((i) => i.update(lastX, lastY));
};
const schedule = () => {
  if (!frame) frame = requestAnimationFrame(tick);
};
const onPointerMove = (e: PointerEvent) => {
  lastX = e.clientX;
  lastY = e.clientY;
  hasPointer = true;
  schedule();
};
const listen = () => {
  if (listening) return;
  listening = true;
  document.body.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", schedule, { passive: true });
};
const unlisten = () => {
  if (!listening || instances.size) return;
  listening = false;
  document.body.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("scroll", schedule);
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
};

// light lime only: the brand lime, a paler tint and a slightly deeper lime, no dark green
const GRADIENT =
  "repeating-conic-gradient(from 236.84deg at 50% 50%, #c7f23c 0%, #dcf884 5%, #b8e33a 10%, #d2f560 15%, #c7f23c 20%)";

type Props = {
  /** half the arc's length, in degrees */
  spread?: number;
  /** how far outside the card the pointer still moves the arc, in px */
  proximity?: number;
  /** share of the card's middle where the pointer leaves the arc alone */
  inactiveZone?: number;
  borderWidth?: number;
  movementDuration?: number;
};

export const RelayBorderTrace = memo(
  ({ spread = 40, proximity = 64, inactiveZone = 0.01, borderWidth = 2, movementDuration = 2 }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let controls: ReturnType<typeof animate> | null = null;

      const inst: Instance = {
        update(x, y) {
          const { left, top, width, height } = el.getBoundingClientRect();
          const cx = left + width / 2;
          const cy = top + height / 2;
          if (Math.hypot(x - cx, y - cy) < 0.5 * Math.min(width, height) * inactiveZone) {
            el.style.setProperty("--active", "0");
            return;
          }
          const active =
            x > left - proximity && x < left + width + proximity && y > top - proximity && y < top + height + proximity;
          el.style.setProperty("--active", active ? "1" : "0");
          if (!active) return;

          const current = parseFloat(el.style.getPropertyValue("--start")) || 0;
          const target = (180 * Math.atan2(y - cy, x - cx)) / Math.PI + 90;
          // the short way round: the difference kept in [-180, 180)
          const next = current + (((((target - current) % 360) + 540) % 360) - 180);
          controls?.stop();
          controls = animate(current, next, {
            duration: reduced ? 0 : movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => el.style.setProperty("--start", String(v)),
          });
        },
      };

      instances.add(inst);
      listen();
      return () => {
        controls?.stop();
        instances.delete(inst);
        unlisten();
      };
    }, [proximity, inactiveZone, movementDuration]);

    return (
      <div
        ref={ref}
        aria-hidden
        className="relay-trace pointer-events-none absolute inset-0 rounded-[inherit]"
        style={
          {
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--trace-width": `${borderWidth}px`,
            "--gradient": GRADIENT,
          } as CSSProperties
        }
      />
    );
  },
);
RelayBorderTrace.displayName = "RelayBorderTrace";
