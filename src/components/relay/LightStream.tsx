import { useEffect, useRef } from "react";
import { streamSignal } from "./streamSignal";

/**
 * The "stream of light": one bundle of glowing strands that follows a single
 * long curve from the top of the page to the bottom. The canvas is fixed to
 * the viewport and the curve lives in page coordinates, so each frame draws
 * the slice that is currently on screen. Plain 2D canvas, no WebGL; a still
 * frame under reduced motion.
 *
 * Mount it once per page, behind everything (`fixed inset-0 z-0`).
 */

type Strand = {
  lane: number; // fixed lateral offset, fraction of the viewport width
  phase: number;
  freq: number;
  amp: number;
  width: number;
  alpha: number;
  hue: number;
  sat: number;
  light: number;
  speed: number;
};

type Particle = {
  t: number;
  off: number;
  r: number;
  phase: number;
  alpha: number;
  bokeh: boolean;
};

const STRANDS = 30;
const PARTICLES = 220;
const STEPS_PER_WAYPOINT = 32;
const FRAME_MS = 1000 / 30; // the stream reads fine at 30 fps and costs half as much

// Where the stream wanders, as [fraction of viewport width, fraction of page height].
// Right of the hero, then straight down behind the How-it-works glass panel
// (right column, roughly x 0.5 to 0.9), then back and forth down the page,
// ending under the footer.
const WAYPOINTS: [number, number][] = [
  [0.66, -0.03],
  [0.88, 0.05],
  [0.8, 0.11],
  [0.7, 0.17],
  [0.72, 0.24],
  [0.62, 0.3],
  [0.3, 0.42],
  [0.5, 0.54],
  [0.78, 0.66],
  [0.6, 0.78],
  [0.2, 0.88],
  [0.55, 0.95],
  [0.9, 1.0],
  [1.1, 1.04],
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeStrands(): Strand[] {
  return Array.from({ length: STRANDS }, () => {
    const roll = Math.random();
    const hue = roll < 0.12 ? 192 : roll < 0.3 ? 58 : rand(72, 92);
    const lane = (Math.random() + Math.random() - 1) * 0.11;
    return {
      lane,
      phase: rand(0, Math.PI * 2),
      freq: rand(1.5, 4),
      amp: rand(0.006, 0.02),
      width: rand(0.6, 1.8),
      alpha: rand(0.18, 0.75),
      hue,
      sat: hue === 192 ? 80 : 85,
      light: hue === 192 ? 70 : rand(58, 72),
      speed: rand(0.08, 0.22) * (Math.random() < 0.5 ? 1 : -1),
    };
  });
}

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLES }, () => {
    const bokeh = Math.random() < 0.12;
    return {
      t: Math.random(),
      off: rand(-0.16, 0.16) * (bokeh ? 1.8 : 1),
      r: bokeh ? rand(5, 14) : rand(0.6, 2.2),
      phase: rand(0, Math.PI * 2),
      alpha: bokeh ? rand(0.04, 0.1) : rand(0.3, 0.9),
      bokeh,
    };
  });
}

/** Catmull-Rom spline through the waypoints; t in [0, 1] over the whole page. */
function spine(t: number, w: number, H: number) {
  const n = WAYPOINTS.length - 1;
  const f = Math.min(Math.max(t, 0), 0.99999) * n;
  const i = Math.floor(f);
  const u = f - i;
  const P = (k: number) => WAYPOINTS[Math.min(Math.max(k, 0), n)];
  const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
  const u2 = u * u;
  const u3 = u2 * u;
  const cr = (a: number, b: number, c: number, d: number) =>
    0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (-a + 3 * b - 3 * c + d) * u3);
  const dcr = (a: number, b: number, c: number, d: number) =>
    0.5 * (-a + c + 2 * (2 * a - 5 * b + 4 * c - d) * u + 3 * (-a + 3 * b - 3 * c + d) * u2);
  const x = cr(p0[0], p1[0], p2[0], p3[0]) * w;
  const y = cr(p0[1], p1[1], p2[1], p3[1]) * H;
  const dx = dcr(p0[0], p1[0], p2[0], p3[0]) * w;
  const dy = dcr(p0[1], p1[1], p2[1], p3[1]) * H;
  const len = Math.hypot(dx, dy) || 1;
  return { x, y, nx: -dy / len, ny: dx / len };
}

/** The spine's t for a page-space y; the waypoints only ever go down, so a bisection works. */
function tForY(y: number, w: number, H: number) {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 22; i++) {
    const mid = (lo + hi) / 2;
    if (spine(mid, w, H).y < y) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** 0 where the strands are sharp, 1 where they go soft and wide (the middle of the page). */
function diffuse(yFrac: number) {
  const a = 0.1;
  const b = 0.9;
  if (yFrac <= a || yFrac >= b) return 0;
  const s = (yFrac - a) / (b - a);
  // ramps to full haze quickly and holds it, so headlines never sit on bright strands
  return Math.min(1, Math.pow(Math.sin(Math.PI * s), 0.25));
}

export const LightStream = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const strands = makeStrands();
    const particles = makeParticles();
    let w = 0;
    let h = 0;
    let H = 1; // page height
    let dpr = 1;
    let frame = 0;
    const start = performance.now();
    // render scale: sharp by default, stepped down only if frames measurably drag
    let quality = 2;
    let slowFrames = 0;
    // scroll reactivity: the flow speeds up while the page is moving
    let lastScroll = window.scrollY;
    let velocity = 0; // smoothed px per frame
    let flow = 0; // extra time added by scrolling
    let pulse = 0; // eased 0..1 presence of the section-requested packet

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, quality);
      w = window.innerWidth;
      h = window.innerHeight;
      H = Math.max(document.documentElement.scrollHeight, h);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const scrollY = window.scrollY;
      velocity = velocity * 0.85 + Math.abs(scrollY - lastScroll) * 0.15;
      lastScroll = scrollY;
      flow += velocity * 0.012;
      // a surge (an approval landing, say) pushes the flow and brightens the particles for a moment
      const surge = streamSignal.surge;
      if (surge > 0) {
        flow += surge * 0.6;
        streamSignal.surge = surge < 0.01 ? 0 : surge * 0.9;
      }
      const time = (now - start) / 1000 + flow;
      const scrollPhase = scrollY * 0.003;
      const unit = Math.min(w, h);
      const top = scrollY - 300; // page-space band that is worth drawing
      const bottom = scrollY + h + 300;
      const steps = STEPS_PER_WAYPOINT * (WAYPOINTS.length - 1);

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(0, -scrollY);
      ctx.globalCompositeOperation = "lighter";

      // diffuse haze along the visible part of the spine
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const p = spine(t, w, H);
        if (p.y < top - unit * 0.3 || p.y > bottom + unit * 0.3) continue;
        const d = diffuse(p.y / H);
        const r = unit * (0.2 + 0.12 * d);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `hsla(80, 80%, 60%, ${0.08 - 0.03 * d})`);
        g.addColorStop(1, "hsla(80, 80%, 60%, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
      }

      // strands: three passes, wide and faint to thin and bright
      for (const s of strands) {
        // sample the spine once per strand, remembering only visible points
        const pts: [number, number, number][] = []; // x, y, diffuse
        let anyVisible = false;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const p = spine(t, w, H);
          if (p.y < top || p.y > bottom) {
            pts.push([NaN, NaN, 0]);
            continue;
          }
          anyVisible = true;
          const d = diffuse(p.y / H);
          const wobble = Math.sin(t * s.freq * Math.PI * 2 + s.phase + time * s.speed + scrollPhase);
          const spread = 1 + 2.6 * d;
          const off = (s.lane * spread + wobble * s.amp) * unit;
          pts.push([p.x + p.nx * off, p.y + p.ny * off, d]);
        }
        if (!anyVisible) continue;

        // the middle of the visible slice decides how soft this strand is drawn
        let dSum = 0;
        let dN = 0;
        for (const [x, , d] of pts) {
          if (Number.isNaN(x)) continue;
          dSum += d;
          dN++;
        }
        const d = dN ? dSum / dN : 0;
        // the stream gathers in from nothing at the very top of the page
        const topFade = Math.min(1, Math.max(0, (scrollY + h / 2) / 700 + 0.35));
        const alpha = s.alpha * (1 - 0.84 * d) * topFade;
        const width = s.width * (1 + 4 * d);
        const core = Math.max(0, 1 - 1.6 * d); // bright centre line fades out as the haze takes over
        const mid = Math.max(0.25, 1 - d); // the mid pass thins out too, leaving mostly glow
        const color = `hsla(${s.hue}, ${s.sat}%, ${s.light}%, `;

        ctx.beginPath();
        let pen = false;
        for (const [x, y] of pts) {
          if (Number.isNaN(x)) {
            pen = false;
            continue;
          }
          if (!pen) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          pen = true;
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = color + alpha * 0.08 + ")";
        ctx.lineWidth = width * 9;
        ctx.stroke();
        ctx.strokeStyle = color + alpha * 0.35 * mid + ")";
        ctx.lineWidth = width * 3;
        ctx.stroke();
        if (core > 0) {
          ctx.strokeStyle = color + alpha * core + ")";
          ctx.lineWidth = width;
          ctx.stroke();
        }
      }

      // particles drifting along the stream
      for (const pt of particles) {
        const t = (pt.t + time * 0.006) % 1;
        const p = spine(t, w, H);
        if (p.y < top || p.y > bottom) continue;
        const d = diffuse(p.y / H);
        const off = pt.off * unit * (1 + d);
        const x = p.x + p.nx * off;
        const y = p.y + p.ny * off;
        const twinkle = (0.55 + 0.45 * Math.sin(time * 1.6 + pt.phase)) * (1 + surge * 1.5);
        ctx.fillStyle = pt.bokeh
          ? `hsla(190, 70%, 65%, ${Math.min(1, pt.alpha * twinkle)})`
          : `hsla(78, 90%, 78%, ${Math.min(1, pt.alpha * twinkle * (1 - 0.8 * d))})`;
        ctx.beginPath();
        ctx.arc(x, y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // the packet: a bright knot on the spine where a section asks for it
      pulse += ((streamSignal.pulseOn ? 1 : 0) - pulse) * 0.08;
      if (pulse > 0.01) {
        const tc = tForY(streamSignal.pulseY, w, H);
        const c = spine(tc, w, H);
        const r = unit * 0.18;
        const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r);
        g.addColorStop(0, `hsla(80, 90%, 65%, ${0.32 * pulse})`);
        g.addColorStop(0.4, `hsla(80, 90%, 65%, ${0.1 * pulse})`);
        g.addColorStop(1, "hsla(80, 90%, 65%, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(c.x - r, c.y - r, r * 2, r * 2);
        ctx.beginPath();
        for (let k = -14; k <= 14; k++) {
          const q = spine(Math.min(1, Math.max(0, tc + k * 0.0025)), w, H);
          if (k === -14) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        }
        ctx.lineCap = "round";
        const passes: [number, number][] = [
          [16, 0.1],
          [6, 0.3],
          [1.6, 0.95],
        ];
        for (const [lw, a] of passes) {
          ctx.strokeStyle = `hsla(78, 95%, 82%, ${a * pulse})`;
          ctx.lineWidth = lw;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    let last = 0;
    const loop = (now: number) => {
      frame = 0;
      if (now - last >= FRAME_MS) {
        last = now;
        const t0 = performance.now();
        draw(now);
        const cost = performance.now() - t0;
        if (cost > 18) {
          if (++slowFrames > 20 && quality > 1) {
            quality -= 0.5;
            slowFrames = 0;
            resize();
          }
        } else if (slowFrames > 0) {
          slowFrames--;
        }
      }
      if (!reduced) frame = requestAnimationFrame(loop);
    };

    const onResize = () => {
      resize();
      if (reduced) draw(performance.now());
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(document.documentElement);
    window.addEventListener("resize", onResize);
    const onScroll = () => {
      if (reduced) draw(performance.now());
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    resize();
    frame = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none fixed inset-0 h-full w-full ${className}`} />;
};
