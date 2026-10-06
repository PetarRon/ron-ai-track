import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card, Em, LogoMark, RELAY_SHELL, SectionIntro, settle } from "./shared";

/* ---------- card 1: every format into one intake ---------- */

const spokes = [
  { code: "NEW", name: "new order", x: 8, y: 50 },
  { code: "UPD", name: "update", x: 30, y: 10 },
  { code: "CXL", name: "cancellation", x: 70, y: 10 },
  { code: "SUS", name: "quarantined", x: 92, y: 50 },
];

const Hub = () => (
  <div className="relative mt-8 h-[220px]">
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {spokes.map((s) => (
        <line
          key={s.code}
          x1={s.x}
          y1={s.y}
          x2={50}
          y2={50}
          stroke="rgb(var(--th-line))"
          strokeWidth="0.4"
          strokeDasharray="1 1.6"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
    {spokes.map((s, i) => (
      <motion.span
        key={s.code}
        className="absolute h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ac-1 shadow-[0_0_10px_rgb(var(--ac-1))]"
        animate={{ left: [`${s.x}%`, "50%"], top: [`${s.y}%`, "50%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, delay: i * 0.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
      />
    ))}
    {spokes.map((s) => (
      <div
        key={s.code}
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
        style={{ left: `${s.x}%`, top: `${s.y}%` }}
      >
        <span className="grid h-11 w-12 place-items-center rounded-lg border border-th-line bg-th-surface font-mono text-[11px] text-th-muted">
          {s.code}
        </span>
        <span className="font-mono text-[11px] text-th-muted">{s.name}</span>
      </div>
    ))}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_40px_rgb(var(--ac-1)/0.35)]">
      <LogoMark size={64} />
    </div>
  </div>
);

/* ---------- card 2: without and with ---------- */

const rows = [
  { without: "5 to 15 minutes of copy-pasting per order", with: "A reviewed draft waiting when you open the queue" },
  { without: "Site codes looked up from memory", with: "Consignor and sites matched to your TMS codes, or flagged" },
  { without: "A guessed value nobody catches", with: "Every value traced to its quote; empty beats wrong" },
  { without: "One email with 3 trucks, typed 3 times", with: "Multi-truck emails become several orders on their own" },
  { without: "Changes buried in reply threads", with: "Updates and cancellations land on the right order" },
];

const Compare = () => (
  <ul className="mt-8 space-y-3">
    {rows.map((r, i) => (
      <motion.li
        key={r.with}
        {...settle(0.1 + i * 0.08)}
        className="grid gap-3 rounded-lg border border-th-line/70 bg-th-page/40 px-4 py-3 sm:grid-cols-2"
      >
        <span className="flex items-start gap-2 font-body text-[13px] leading-snug text-th-muted">
          <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-th-faint" aria-hidden /> {r.without}
        </span>
        <span className="flex items-start gap-2 font-body text-[13px] leading-snug text-th-heading">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ac-1" aria-hidden /> {r.with}
        </span>
      </motion.li>
    ))}
  </ul>
);

export const RelayReliability = () => (
  <section className={`relative py-20 ${RELAY_SHELL}`}>
    <SectionIntro
      eyebrow="from chaos to order"
      title={
        <>
          <Em>Boring</Em> in the ways that matter.
        </>
      }
      aside="Updates, cancellations, multi-truck emails, audit trail. The parts nobody demos, and the parts that decide whether your team trusts it by week two."
    />
    <div className="mt-14 grid gap-6 lg:grid-cols-2">
      <motion.div {...settle(0.1)}>
        <Card className="h-full p-7 md:p-8">
          <h3 className="font-body text-[22px] font-medium tracking-[-0.02em] text-th-heading">Understands the message, not just the fields</h3>
          <p className="mt-2 max-w-md font-body text-[14px] leading-relaxed text-th-body">
            A reply that changes an unload time is an update, not a new order. A cancellation closes the right order. An
            email that only looks like an order is quarantined, and anything that is not an order is simply filed.
          </p>
          <p className="mt-6 font-mono text-[11px] text-th-faint">new order, update, cancellation, no order, suspicious</p>
          <Hub />
        </Card>
      </motion.div>
      <motion.div {...settle(0.2)}>
        <Card className="h-full p-7 md:p-8">
          <h3 className="font-body text-[22px] font-medium tracking-[-0.02em] text-th-heading">The manual way, side by side</h3>
          <p className="mt-2 max-w-md font-body text-[14px] leading-relaxed text-th-body">
            Your TMS stays exactly as it is. Orders arrive in its own format. The typing in front of it goes away.
          </p>
          <p className="mt-6 font-mono text-[11px] text-th-faint">without / with</p>
          <Compare />
        </Card>
      </motion.div>
    </div>
  </section>
);
