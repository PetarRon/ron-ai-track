"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";
import { integrations } from "./data";
import {
  featuredOrder,
  mockOrders,
  pipelineBranches,
  pipelineMain,
  type OrderField,
  type OrderStatus,
} from "./dashboardTourData";

const ease = [0.22, 1, 0.36, 1] as const;

const chapters: { eyebrow: string; title: string; body: string }[] = [
  {
    eyebrow: "I. Inbox",
    title: "Every order lands in one queue",
    body: "However it arrives — email, PDF, a forwarded thread — it's classified and waiting for your team in one place. Order or not.",
  },
  {
    eyebrow: "II. Review",
    title: "Read the source, not just the result",
    body: "Every field traces back to where it came from. One value doesn't match — it's flagged, not guessed at, with the reason right there.",
  },
  {
    eyebrow: "III. Approve",
    title: "Nothing moves until your team says so",
    body: "One click pushes the draft to your TMS. Not before, not automatically. That decision stays yours, every time.",
  },
  {
    eyebrow: "IV. Pipeline",
    title: "One pipeline, every order accounted for",
    body: "Nothing slips through unclassified. What isn't an order gets filtered out; what needs a second look gets held, not pushed.",
  },
];

const statusLabel: Record<OrderStatus, string> = {
  "needs-review": "Needs review",
  completed: "Completed",
  "no-order": "No order",
};

const StatusPill = ({ status }: { status: OrderStatus }) => (
  <span
    className={
      status === "needs-review"
        ? "inline-flex items-center rounded-full border border-th-line bg-th-surface-alt/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-th-heading"
        : "inline-flex items-center rounded-full border border-th-line px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-th-muted"
    }
  >
    {statusLabel[status]}
  </span>
);

const FieldRow = ({ field }: { field: OrderField }) => {
  const isFlagged = field.origin === "flagged";
  return (
    <Popover>
      <PopoverTrigger asChild disabled={field.origin === "history"}>
        <button
          type="button"
          className={`flex w-full items-center justify-between gap-3 border-t border-th-line-subtle py-2.5 text-left first:border-t-0 ${
            field.origin === "history" ? "cursor-default" : "cursor-help"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-th-muted">
            {field.label}
          </span>
          <span
            className={`truncate text-[13px] font-medium tabular-nums text-th-heading ${
              isFlagged ? "underline decoration-dashed decoration-1 underline-offset-4" : ""
            }`}
          >
            {field.value}
          </span>
        </button>
      </PopoverTrigger>
      {field.origin !== "history" && (
        <PopoverContent side="top" align="end" className="w-72 text-sm">
          {field.origin === "document" ? (
            <>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-th-muted">
                Read from the email
              </p>
              <p className="rounded-md border border-th-line bg-th-surface-alt/50 px-3 py-2 font-mono text-xs leading-relaxed text-th-body">
                "{field.sourceQuote}"
              </p>
            </>
          ) : (
            <>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-th-muted">
                Flagged for review
              </p>
              <p className="text-[13px] leading-relaxed text-th-body">{field.flagReason}</p>
            </>
          )}
        </PopoverContent>
      )}
    </Popover>
  );
};

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative rounded-2xl border-[0.75px] border-th-line p-1.5 md:p-2">
    <div className="relative flex min-h-[280px] flex-col rounded-xl border-[0.75px] border-th-line-subtle bg-th-surface p-6 shadow-[0_0_27px_0_rgba(45,45,45,0.15)] md:min-h-[420px] md:p-7">
      {children}
    </div>
  </div>
);

const QueueScene = () => (
  <Frame>
    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-th-muted">
      Orders inbox
    </p>
    <ul className="divide-y divide-th-line-subtle">
      {mockOrders.map((order) => (
        <li key={order.id} className={order.status === "no-order" ? "opacity-60" : ""}>
          <div className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:gap-4">
            <span className="w-16 shrink-0 font-mono text-xs text-th-muted">{order.reference}</span>
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-th-heading">
              {order.subject}
            </span>
            <span className="hidden shrink-0 text-xs text-th-muted sm:block">
              {order.origin === "—" ? "—" : `${order.origin} → ${order.destination}`}
            </span>
            <StatusPill status={order.status} />
          </div>
        </li>
      ))}
    </ul>
  </Frame>
);

const ReviewScene = () => (
  <Frame>
    <div className="grid flex-1 gap-6 lg:grid-cols-[1fr,1.15fr] lg:gap-8">
      <div>
        <div className="mb-3 flex items-center gap-2 text-th-muted">
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Email</span>
        </div>
        <div className="rounded-xl border border-th-line bg-th-surface-alt/40 p-4 font-mono text-xs leading-relaxed text-th-body">
          <p className="mb-2 text-th-muted">From: {featuredOrder.from}</p>
          <p className="mb-2 text-th-muted">Subject: {featuredOrder.subject}</p>
          <p className="text-th-heading">
            "24 pallets, general cargo, packing list attached. Total weight: 3,240 kg. Please
            deliver to Hamburg Freight GmbH, Dock 4."
          </p>
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-th-muted">
          Structured &amp; checked
        </p>
        <div>
          {featuredOrder.fields.map((field) => (
            <FieldRow key={field.label} field={field} />
          ))}
        </div>
      </div>
    </div>
  </Frame>
);

const ApproveScene = () => {
  const [state, setState] = useState<"idle" | "approving" | "approved">("idle");

  const approve = useCallback(() => {
    if (state !== "idle") return;
    setState("approving");
    window.setTimeout(() => setState("approved"), 800);
  }, [state]);

  return (
    <Frame>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {state !== "approved" ? (
          <>
            <div className="w-full max-w-xs rounded-xl border border-th-line bg-th-surface-alt/40 p-4 text-left">
              <p className="text-[13px] font-medium text-th-heading">{featuredOrder.reference}</p>
              <p className="text-[12px] text-th-muted">
                {featuredOrder.origin} → {featuredOrder.destination}
              </p>
              <div className="mt-3 flex items-center gap-2 text-[12px] text-th-body">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-ac-pos" aria-hidden="true" />
                5 fields ready, 1 flagged for review
              </div>
            </div>
            <button
              type="button"
              onClick={approve}
              disabled={state === "approving"}
              className="mt-6 rounded-full bg-[#161310] px-7 py-3 text-[13px] font-bold text-white transition disabled:opacity-70"
            >
              {state === "approving" ? "Approving…" : "Approve & push"}
            </button>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-10 w-10 text-ac-pos" aria-hidden="true" />
            <h4 className="mt-4 text-xl font-serif font-normal text-th-heading">
              Pushed to your TMS
            </h4>
            <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-th-body">
              No one touched a keyboard until this moment.
            </p>
          </>
        )}
      </div>
    </Frame>
  );
};

const PipelineScene = () => (
  <Frame>
    <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-th-muted">
      Agentic pipeline
    </p>
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex flex-wrap items-start justify-center gap-x-1 gap-y-6">
        {pipelineMain.map((node, i) => (
          <div key={node.label} className="flex items-start gap-1">
            <div className="flex w-24 flex-col items-center text-center">
              <span className="inline-flex items-center rounded-full border border-th-line bg-th-surface-alt/50 px-3 py-1.5 text-[11px] font-semibold text-th-heading">
                {node.label}
              </span>
              <p className="mt-1.5 text-[10px] leading-snug text-th-muted">{node.detail}</p>
            </div>
            {i < pipelineMain.length - 1 && (
              <ArrowRight className="mt-2 h-3.5 w-3.5 shrink-0 text-th-faint" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-th-line-subtle pt-6">
        {pipelineBranches.map((branch) => (
          <div key={branch.label} className="flex items-baseline gap-1.5 text-center">
            <span className="text-[11px] font-semibold text-th-heading">{branch.label}</span>
            <span className="text-[11px] text-th-muted">— {branch.detail}</span>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const scenes = [QueueScene, ReviewScene, ApproveScene, PipelineScene];

const Chapter = ({
  index,
  active,
  onActivate,
}: {
  index: number;
  active: boolean;
  onActivate: (i: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const { eyebrow, title, body } = chapters[index];
  const Scene = scenes[index];

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <div ref={ref} className="flex min-h-[50vh] flex-col justify-center py-8 lg:min-h-[70vh] lg:py-10">
      <p
        className={`mb-3 font-mono text-[11px] tracking-[0.15em] transition-colors duration-300 ${
          active ? "text-th-heading" : "text-th-muted"
        }`}
      >
        {eyebrow}
      </p>
      <h3 className="text-2xl font-serif font-normal tracking-tight text-th-heading md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-th-body">{body}</p>
      <div className="mt-6 lg:hidden">
        <Scene />
      </div>
    </div>
  );
};

export const DashboardTour = () => {
  const [activeScene, setActiveScene] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, ease };
  const ActiveScene = scenes[activeScene];

  return (
    <section id="process-flow" className="relative z-10 border-y border-th-line-subtle bg-th-page py-16 md:py-20">
      <div className={PETARON_SECTION_SHELL}>
        <SectionHeading
          title="How it works"
          description="Scroll through a real order, from your inbox to your TMS."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.05fr] lg:gap-12">
          <div className="hidden lg:sticky lg:top-24 lg:block lg:h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={transition}
              >
                <ActiveScene />
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            {chapters.map((_, i) => (
              <Chapter key={i} index={i} active={activeScene === i} onActivate={setActiveScene} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-4xl border-t border-th-line-subtle pt-8 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-th-muted">
            Pushes into your TMS
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {integrations
              .filter((i) => i.name !== "Gmail" && i.name !== "Microsoft")
              .map((integration) => (
                <li key={integration.name} className="text-sm font-medium text-th-heading">
                  {integration.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
