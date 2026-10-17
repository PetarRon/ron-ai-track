import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GradFlow, type GradientConfigInput } from "gradflow";

/**
 * Ron's GradFlow stripes (gradflow.meera.dev) in the brand's colours, as one
 * continuous ribbon down the page, the way the light fibres once ran: it fills
 * the hero, then snakes left and right behind the sections in gentle sweeps.
 *
 * One canvas only: it sits `sticky` in the viewport inside a layer as tall as
 * the page, and that layer carries an SVG mask with the ribbon drawn in page
 * coordinates. Scrolling moves the ribbon with the page while the colours keep
 * flowing inside it. The mask is rebuilt whenever the page changes size; its
 * edges are softened with a blur, not faded out. Holds still under reduced
 * motion; light page only.
 */

const FLOW: GradientConfigInput = {
  // a pale lime instead of pure white, so the ribbon never vanishes into the page
  color1: { r: 236, g: 249, b: 206 },
  color2: { r: 199, g: 242, b: 60 },
  color3: { r: 168, g: 232, b: 208 },
  speed: 0.4,
  scale: 1,
  type: "stripe",
  noise: 0.08,
};

// the ribbon's path below the hero: [share of the width, share of the rest of the page]
const BENDS: [number, number][] = [
  [0.82, 0.04],
  [0.24, 0.15],
  [0.14, 0.27],
  [0.78, 0.39],
  [0.86, 0.51],
  [0.22, 0.63],
  [0.16, 0.75],
  [0.72, 0.86],
  [0.55, 0.96],
];

/** a smooth curve through the points (Catmull-Rom, written as cubic Béziers) */
function curve(pts: [number, number][]) {
  const p = (i: number) => pts[Math.max(0, Math.min(pts.length - 1, i))];
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = p(i - 1);
    const [x1, y1] = p(i);
    const [x2, y2] = p(i + 1);
    const [x3, y3] = p(i + 2);
    const c1 = [x1 + (x2 - x0) / 6, y1 + (y2 - y0) / 6];
    const c2 = [x2 - (x3 - x1) / 6, y2 - (y3 - y1) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return d;
}

/** the mask: the hero, then (with `snake`) the ribbon flowing out of it */
function ribbonMask(W: number, H: number, head: number, snake: boolean) {
  const band = Math.max(170, Math.min(340, W * 0.21));
  const soft = band * 0.22;
  const rest = H - head;
  const pts: [number, number][] = [[W * 0.7, head * 0.42], ...BENDS.map(([x, y]) => [W * x, head + rest * y] as [number, number])];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<defs>` +
    `<linearGradient id="h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="0.55" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
    `<filter id="s" filterUnits="userSpaceOnUse" x="${-band}" y="${-band}" width="${W + band * 2}" height="${H + band * 2}"><feGaussianBlur stdDeviation="${soft.toFixed(1)}"/></filter>` +
    `</defs>` +
    `<rect width="${W}" height="${head}" fill="url(#h)"/>` +
    (snake
      ? `<path d="${curve(pts)}" fill="none" stroke="#fff" stroke-width="${band.toFixed(0)}" stroke-linecap="round" stroke-linejoin="round" filter="url(#s)"/>`
      : "") +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Mount once, first inside the page's content; the element the gradient should
 * fill down to carries `data-flow-head` (the hero, or a subpage's header).
 * `snake={false}` keeps only that head, for pages of long reading; it then
 * stops animating once the head is scrolled out of view.
 */
export const FlowRibbon = ({ snake = true }: { snake?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mask, setMask] = useState("");
  const [headInView, setHeadInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let size = "";
    const build = () => {
      const W = Math.round(el.clientWidth);
      const H = Math.round(el.clientHeight);
      // where the head ends, measured from the top of this layer (a subpage's nav sits above its header);
      // on-screen positions are scaled by the page zoom and the layer's own size is not, so convert
      const rect = el.getBoundingClientRect();
      const k = rect.height ? el.clientHeight / rect.height : 1;
      const headEl = document.querySelector<HTMLElement>("[data-flow-head]");
      const head = headEl ? Math.round((headEl.getBoundingClientRect().bottom - rect.top) * k) : 700;
      const key = `${W}x${H}x${head}`;
      if (!W || !H || key === size) return;
      size = key;
      setMask(ribbonMask(W, H, head, snake));
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    const headEl = document.querySelector<HTMLElement>("[data-flow-head]");
    const io = !snake && headEl ? new IntersectionObserver(([e]) => setHeadInView(e.isIntersecting)) : null;
    if (io && headEl) io.observe(headEl);
    return () => {
      ro.disconnect();
      io?.disconnect();
    };
  }, [snake]);

  // GradFlow sizes its canvas from its parent only on mount and on window resize; in
  // Safari the first read can come before the screen-tall box has its height (the canvas
  // stuck at ~150 px), so tell it to measure again whenever that box changes size
  useEffect(() => {
    const box = screenRef.current;
    if (!box) return;
    let last = "";
    const ro = new ResizeObserver(([e]) => {
      const key = `${Math.round(e.contentRect.width)}x${Math.round(e.contentRect.height)}`;
      if (key === last) return;
      last = key;
      window.dispatchEvent(new Event("resize"));
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relay-flow pointer-events-none absolute inset-0 -z-10"
      style={
        mask
          ? { maskImage: mask, WebkitMaskImage: mask, maskSize: "100% 100%", WebkitMaskSize: "100% 100%", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }
          : { visibility: "hidden" }
      }
    >
      <div ref={screenRef} className="sticky top-0 h-[calc(100vh/var(--relay-zoom,1))] w-full">
        <GradFlow config={FLOW} paused={!!reduced || !headInView} />
      </div>
    </div>
  );
};
