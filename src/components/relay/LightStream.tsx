import { useEffect, useRef } from "react";

/**
 * The "stream of light": a bundle of glowing strands that follows one long
 * S-curve down the page, with drifting particles. Plain 2D canvas, no WebGL,
 * so it costs nothing to ship and degrades to a still frame when the user
 * prefers reduced motion. The canvas is sized to its wrapper, so place the
 * wrapper around every section the stream should run through.
 */

type Strand = {
  lane: number; // fixed lateral offset, fraction of width
  phase: number;
  freq: number;
  amp: number; // fraction of width
  width: number;
  alpha: number;
  hue: number;
  sat: number;
  light: number;
  speed: number;
};

type Particle = {
  t: number;
  off: number; // fraction of width, perpendicular offset
  r: number;
  phase: number;
  alpha: number;
  bokeh: boolean;
};

const STRANDS = 34;
const PARTICLES = 140;
const SEGMENTS = 90;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeStrands(): Strand[] {
  return Array.from({ length: STRANDS }, (_, i) => {
    const roll = Math.random();
    // mostly lime, a few yellow, a couple of cyan threads like the reference
    const hue = roll < 0.12 ? 192 : roll < 0.3 ? 58 : rand(72, 92);
    // lanes cluster towards the middle of the bundle
    const lane = (Math.random() + Math.random() - 1) * 0.11;
    return {
      lane,
      phase: rand(0, Math.PI * 2),
      freq: rand(0.35, 0.9),
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

// Cubic bezier spine. Starts above the top edge on the right, bulges out past
// the right edge, then sweeps down to the lower left: the shape in the reference.
function spine(t: number, w: number, h: number) {
  const p0 = { x: 0.62 * w, y: -0.05 * h };
  const p1 = { x: 1.1 * w, y: 0.3 * h };
  const p2 = { x: 0.96 * w, y: 0.66 * h };
  const p3 = { x: 0.3 * w, y: 1.1 * h };
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  const x = a * p0.x + b * p1.x + c * p2.x + d * p3.x;
  const y = a * p0.y + b * p1.y + c * p2.y + d * p3.y;
  // derivative for the normal
  const dx = 3 * mt * mt * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
  const dy = 3 * mt * mt * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);
  const len = Math.hypot(dx, dy) || 1;
  return { x, y, nx: -dy / len, ny: dx / len };
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
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const time = (now - start) / 1000;
      // scrolling nudges the strands so the light reacts to the page moving
      const scrollPhase = window.scrollY * 0.0015;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // diffuse haze along the spine
      for (let i = 0; i <= 6; i++) {
        const t = i / 6;
        const p = spine(t, w, h);
        const r = w * 0.22;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, "hsla(80, 80%, 60%, 0.09)");
        g.addColorStop(1, "hsla(80, 80%, 60%, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
      }

      // strands: a wide faint pass for glow, then the thin bright core
      for (const s of strands) {
        ctx.beginPath();
        for (let i = 0; i <= SEGMENTS; i++) {
          const t = i / SEGMENTS;
          const p = spine(t, w, h);
          // taper towards both ends so the bundle gathers and spreads
          const taper = 0.35 + 0.65 * Math.sin(Math.PI * t);
          const wobble = Math.sin(t * s.freq * Math.PI * 2 + s.phase + time * s.speed + scrollPhase);
          const d = (s.lane + wobble * s.amp) * w * taper;
          const x = p.x + p.nx * d;
          const y = p.y + p.ny * d;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const color = `hsla(${s.hue}, ${s.sat}%, ${s.light}%, `;
        ctx.lineCap = "round";
        ctx.strokeStyle = color + s.alpha * 0.08 + ")";
        ctx.lineWidth = s.width * 9;
        ctx.stroke();
        ctx.strokeStyle = color + s.alpha * 0.35 + ")";
        ctx.lineWidth = s.width * 3;
        ctx.stroke();
        ctx.strokeStyle = color + s.alpha + ")";
        ctx.lineWidth = s.width;
        ctx.stroke();
      }

      // particles drifting along the stream
      for (const pt of particles) {
        const t = (pt.t + time * 0.012) % 1;
        const p = spine(t, w, h);
        const taper = 0.35 + 0.65 * Math.sin(Math.PI * t);
        const d = pt.off * w * taper;
        const x = p.x + p.nx * d;
        const y = p.y + p.ny * d;
        const twinkle = 0.55 + 0.45 * Math.sin(time * 1.6 + pt.phase);
        if (pt.bokeh) {
          ctx.fillStyle = `hsla(190, 70%, 65%, ${pt.alpha * twinkle})`;
        } else {
          ctx.fillStyle = `hsla(78, 90%, 78%, ${pt.alpha * twinkle})`;
        }
        ctx.beginPath();
        ctx.arc(x, y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // fade the top so the stream emerges out of the hero instead of cutting in
      ctx.globalCompositeOperation = "destination-in";
      const fade = ctx.createLinearGradient(0, 0, 0, h);
      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(0.2, "rgba(0,0,0,0.12)");
      fade.addColorStop(0.45, "rgba(0,0,0,1)");
      fade.addColorStop(0.82, "rgba(0,0,0,1)");
      fade.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      frame = 0;
      if (!visible) return;
      draw(now);
      if (!reduced) frame = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          start = performance.now() - (performance.now() - start);
          kick();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(canvas);

    resize();
    kick();

    return () => {
      ro.disconnect();
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
