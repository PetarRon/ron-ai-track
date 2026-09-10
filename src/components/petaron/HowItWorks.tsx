"use client";

import { useCallback, useState, type ReactNode } from "react";
import { BarChart3, Check, FileText, Home, Mail, Package, Search, Settings } from "lucide-react";
import { VerticalTabs, type VerticalTabItem } from "@/components/ui/vertical-tabs";
import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";

/* -------------------------------------------------------------------------
   Simplified dashboard screens for the How it Works tabs. They borrow the
   look of the operator dashboard (sidebar, top bar, queue, review split view)
   but deliberately stay generic: no internal vocabulary, checks, or scores.
   Styles live under `.dash-*` in src/index.css.
   ------------------------------------------------------------------------- */

/** Static frame. Rendered once by VerticalTabs; only the screen inside changes.
 *  Its height follows --vt-panel-h (set by VerticalTabs) minus the outer padding and borders. */
const Frame = (children: ReactNode) => (
  <div className="relative rounded-2xl border-[0.75px] border-th-line p-1.5 md:p-2">
    <div className="relative flex flex-col overflow-hidden rounded-xl border-[0.75px] border-th-line-subtle bg-th-surface p-3 shadow-[0_0_27px_0_rgba(45,45,45,0.15)] md:h-[calc(var(--vt-panel-h,558px)-18px)] md:p-4">
      {children}
    </div>
  </div>
);

const AppShell = ({ crumb, children }: { crumb?: string; children: ReactNode }) => (
  <div className="dash flex-1" aria-hidden="true">
    <aside className="dash-side">
      <div className="dash-brand">
        <img src="/petaron_logo.svg" alt="" className="h-3.5 w-3.5" />
        Petaron
      </div>
      <nav className="dash-nav">
        <span className="dash-nav-item">
          <Home className="h-3 w-3" /> Home
        </span>
        <span className="dash-nav-item is-active">
          <Package className="h-3 w-3" /> Orders
        </span>
        <span className="dash-nav-item">
          <BarChart3 className="h-3 w-3" /> Analytics
        </span>
        <span className="dash-nav-item">
          <Settings className="h-3 w-3" /> Settings
        </span>
      </nav>
    </aside>
    <header className="dash-top">
      <p className="dash-crumb">
        Orders
        {crumb && (
          <>
            <span>&gt;</span>
            {crumb}
          </>
        )}
      </p>
      <div className="dash-top-right">
        <span className="dash-hide-sm">ops@yourcompany.example</span>
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold"
          style={{ background: "var(--dash-surface)", border: "1px solid var(--dash-border-2)", color: "var(--dash-text-2)" }}
        >
          OP
        </span>
      </div>
    </header>
    <div className="dash-main">{children}</div>
  </div>
);

/* 01 — Orders queue ------------------------------------------------------- */

type Row = {
  status: "review" | "processing" | "completed" | "none";
  subject: string;
  reference: string;
  route: string;
  received: string;
};

const rows: Row[] = [
  {
    status: "review",
    subject: "Pickup Thursday — 24 pallets to Hamburg",
    reference: "PO 48291",
    route: "Rotterdam → Hamburg",
    received: "14:32",
  },
  {
    status: "processing",
    subject: "Reefer container, temp-controlled",
    reference: "PO 48114",
    route: "Gothenburg → Bremerhaven",
    received: "14:20",
  },
  {
    status: "review",
    subject: "Bulk salt, 3 trucks Monday",
    reference: "SO 79697",
    route: "Wesseling → Antwerp",
    received: "11:05",
  },
  {
    status: "completed",
    subject: "Weekly consolidation — Antwerp to Lyon",
    reference: "PO 47960",
    route: "Antwerp → Lyon",
    received: "Yesterday",
  },
  {
    status: "completed",
    subject: "Two containers ex Piraeus",
    reference: "PO 47812",
    route: "Piraeus → Milan",
    received: "Yesterday",
  },
  {
    status: "none",
    subject: "Re: Invoice #4471 — payment confirmation",
    reference: "—",
    route: "—",
    received: "Yesterday",
  },
];

const chip: Record<Row["status"], { cls: string; label: string }> = {
  review: { cls: "amber", label: "Needs review" },
  processing: { cls: "grey", label: "Processing" },
  completed: { cls: "green", label: "Completed" },
  none: { cls: "outline", label: "No order" },
};

const OrdersScreen = () => (
  <AppShell>
    <div className="flex items-end justify-between gap-2">
      <div className="dash-search">
        <em>Search</em>
        <Search className="h-3 w-3" />
      </div>
      <span className="dash-hide-sm" style={{ color: "var(--dash-text-3)", fontSize: 10 }}>
        This week · 2 need a look
      </span>
    </div>

    <div className="dash-table">
      <div className="dash-tr is-head">
        <span>Status</span>
        <span>Subject</span>
        <span>Reference</span>
        <span className="dash-col-lg">Route</span>
        <span className="dash-col-lg dash-td-num">Received</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className={`dash-tr${r.status === "completed" ? " is-done" : ""}${r.status === "none" ? " is-none" : ""}${
            i === 0 ? " is-hover" : ""
          }`}
        >
          <span className="dash-chip-cell">
            <span className={`dash-chip ${chip[r.status].cls}`}>{chip[r.status].label}</span>
          </span>
          <span className="dash-td-ellipsis">{r.subject}</span>
          <span className="dash-td-mono">{r.reference}</span>
          <span className="dash-col-lg dash-td-ellipsis">{r.route}</span>
          <span className="dash-col-lg dash-td-num">{r.received}</span>
        </div>
      ))}
    </div>
  </AppShell>
);

/* Shared review pieces ------------------------------------------------------- */

const SourceTabs = ({ active }: { active: "email" | "documents" }) => (
  <div className="dash-pills">
    <span className={`dash-pill${active === "email" ? " is-active" : ""}`}>
      <Mail className="h-3 w-3" /> Email <b>1</b>
    </span>
    <span className={`dash-pill${active === "documents" ? " is-active" : ""}`}>
      <FileText className="h-3 w-3" /> Documents <b>4</b>
    </span>
  </div>
);

const Field = ({
  label,
  value,
  state,
}: {
  label: string;
  value?: string;
  state?: "empty-required" | "active";
}) => (
  <div className={`dash-field${state ? ` is-${state}` : ""}`}>
    <em>{label}</em>
    <span className="v">{value ?? ""}</span>
  </div>
);

/* 02 — Documents ----------------------------------------------------------- */

const documents = [
  { name: "ORDER_48291.pdf", kind: "PDF · 3 pages", state: "Read" },
  { name: "packing_list.xlsx", kind: "Spreadsheet", state: "Read" },
  { name: "FW_ booking confirmation.eml", kind: "Forwarded email", state: "Read" },
  { name: "dock_photo.jpg", kind: "Scan", state: "Read" },
];

const DocumentsScreen = () => (
  <AppShell crumb="PO 48291">
    <div className="dash-split">
      <div className="dash-card">
        <SourceTabs active="documents" />
        <div className="dash-mono-body" style={{ fontFamily: "var(--font-body)", padding: 0 }}>
          {documents.map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-2 px-2 py-[7px]"
              style={{ borderBottom: "1px solid var(--dash-border)", color: "var(--dash-text)" }}
            >
              <FileText className="h-3 w-3 shrink-0" style={{ color: "var(--dash-text-3)" }} />
              <div className="min-w-0 flex-1">
                <p className="truncate">{d.name}</p>
                <p style={{ color: "var(--dash-text-3)", fontSize: 9.5 }}>{d.kind}</p>
              </div>
              <span className="dash-chip green">{d.state}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-card dash-hide-sm">
        <div className="dash-pdf-toolbar">
          <span>ORDER_48291.pdf</span> <span className="ml-auto">Page 1 / 3</span>
        </div>
        <div className="dash-pdf" style={{ borderTop: 0 }}>
          <div className="dash-pdf-page">
            <div className="dash-pdf-line" style={{ width: "42%", height: 7 }} />
            <div className="dash-pdf-line" style={{ width: "28%" }} />
            <div className="mb-3" />
            <div className="dash-pdf-line" style={{ width: "88%" }} />
            <div className="dash-pdf-line" style={{ width: "76%" }} />
            <div className="dash-pdf-line" style={{ width: "81%" }} />
            <div className="mb-3" />
            <div className="dash-pdf-line" style={{ width: "36%", height: 6 }} />
            <div className="dash-pdf-line" style={{ width: "64%" }} />
            <div className="dash-pdf-line" style={{ width: "58%" }} />
            <div className="dash-pdf-line" style={{ width: "70%" }} />
            <div className="mb-3" />
            <div className="dash-pdf-line" style={{ width: "36%", height: 6 }} />
            <div className="dash-pdf-line" style={{ width: "52%" }} />
            <div className="dash-pdf-line" style={{ width: "66%" }} />
            <div className="dash-pdf-line" style={{ width: "48%" }} />
            <div className="mb-3" />
            <div className="dash-pdf-line" style={{ width: "36%", height: 6 }} />
            <div className="dash-pdf-line" style={{ width: "84%" }} />
            <div className="dash-pdf-line" style={{ width: "72%" }} />
            <div className="dash-pdf-line" style={{ width: "60%" }} />
            <div className="dash-pdf-line" style={{ width: "78%" }} />
            <div className="mb-3" />
            <div className="dash-pdf-line" style={{ width: "30%", height: 6 }} />
            <div className="dash-pdf-line" style={{ width: "56%" }} />
            <div className="dash-pdf-line" style={{ width: "44%" }} />
            <span className="dash-pdf-box" style={{ left: "4%", top: "20.5%", width: "38%", height: 9 }} />
            <span className="dash-pdf-box is-active" style={{ left: "4%", top: "38.5%", width: "54%", height: 9 }} />
            <span className="dash-pdf-box" style={{ left: "4%", top: "72%", width: "42%", height: 9 }} />
          </div>
        </div>
      </div>
    </div>
  </AppShell>
);

/* 03 — Traced to its source ------------------------------------------------ */

const ReviewScreen = () => (
  <AppShell crumb="PO 48291">
    <div className="dash-split">
      <div className="dash-card dash-hide-sm">
        <SourceTabs active="email" />
        <div className="dash-mono-body">
          <p>From: ops@rotterdam-distribution.example</p>
          <p>Subject: Pickup Thursday — 24 pallets to Hamburg</p>
          <p className="mt-2">Hi team,</p>
          <p className="mt-1">
            Please arrange pickup <span className="dash-mark">Thursday 11 Sep, 08:00</span> at our Maasvlakte
            warehouse. <span className="dash-mark">24 pallets</span>, general cargo, packing list attached. Total
            weight: <span className="dash-mark is-active">3,240 kg</span>. Please deliver to{" "}
            <span className="dash-mark">Hamburg Freight GmbH, Dock 4</span> by Friday.
          </p>
          <p className="mt-1">Reference PO 48291.</p>
          <p className="mt-2">Thanks, Marit</p>
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-form">
          <p className="dash-section">Order</p>
          <div className="dash-fields">
            <Field label="Customer" value="Rotterdam Distribution B.V." />
            <Field label="Reference" value="PO 48291" />
            <Field label="Pickup" value="Thu 11 Sep, 08:00" />
            <Field label="Delivery" value="Hamburg, Dock 4" />
            <Field label="Delivery postcode" state="empty-required" />
            <Field label="Quantity" value="24 pallets" />
          </div>
          <p className="dash-section">Weight</p>
          <div className="dash-fields">
            <Field label="Gross weight" value="3,240 kg" state="active" />
          </div>
          <div className="dash-quote">"Total weight: 3,240 kg" — read from the email</div>
        </div>
      </div>
    </div>
  </AppShell>
);

/* 04 — Matched to your TMS ------------------------------------------------- */

const matches = [
  { label: "Customer", name: "Rotterdam Distribution B.V.", code: "ROTDIS01", ok: true },
  { label: "Delivery site", name: "Hamburg Freight GmbH, Dock 4", code: "HAMFRE02", ok: true },
  { label: "Invoice to", name: "NL Purchasing Organization", code: "", ok: false },
];

const MatchScreen = () => (
  <AppShell crumb="PO 48291">
    <div className="dash-split">
      <div className="dash-card dash-hide-sm">
        <div className="dash-form">
          <p className="dash-section">Checks</p>
          <ul className="flex flex-col gap-2" style={{ color: "var(--dash-text-2)" }}>
            {[
              "Read as a transport order",
              "All attachments read",
              "Matched to your TMS codes",
              "1 field left for you",
            ].map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: i === 3 ? "var(--dash-amber)" : "var(--dash-green)",
                    color: "#fff",
                  }}
                >
                  {i === 3 ? "" : <Check className="h-2.5 w-2.5" />}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-form">
          <p className="dash-section">Matched to your TMS</p>
          {matches.map((m) => (
            <div key={m.label}>
              <p style={{ color: "var(--dash-text-3)", fontSize: 9.5 }}>{m.label}</p>
              <div className={`dash-picker${m.ok ? "" : " is-empty"}`}>
                <span>{m.ok ? `${m.code} — ${m.name}` : "Pick a code"}</span>
                {m.ok ? <span className="dash-chip green">Matched</span> : <span className="dash-chip amber">For you</span>}
              </div>
            </div>
          ))}
          <p className="dash-section">Filled from past orders</p>
          <div className="dash-fields">
            <Field label="Incoterm" value="FCA" />
            <Field label="Department" value="Export" />
          </div>
        </div>
      </div>
    </div>
  </AppShell>
);

/* 05 — Approve -----------------------------------------------------------  */

const ApproveScreen = () => {
  const [state, setState] = useState<"idle" | "saved" | "approving" | "approved">("idle");

  const approve = useCallback(() => {
    if (state === "approving" || state === "approved") return;
    setState("approving");
    window.setTimeout(() => setState("approved"), 800);
  }, [state]);

  const toast =
    state === "saved"
      ? "Draft saved. Nothing has been sent to your TMS."
      : state === "approved"
        ? "Pushed to your TMS."
        : state === "approving"
          ? "Approving…"
          : "";

  return (
    <AppShell crumb="PO 48291">
      <div className="dash-card">
        <div className="dash-form">
          <div className="flex items-center justify-between gap-2">
            <p className="dash-section">PO 48291 · Rotterdam → Hamburg</p>
            <span className={`dash-chip ${state === "approved" ? "green" : "amber"}`}>
              {state === "approved" ? "Completed" : "Needs review"}
            </span>
          </div>
          <div className={`dash-audit${state === "approved" ? "" : " is-warn"}`}>
            {state === "approved"
              ? "Order created in your TMS. No one typed a thing."
              : "1 field to confirm before this order can go: the carrier rate looks higher than usual."}
          </div>

          <p className="dash-section">Summary</p>
          <div className="dash-fields is-three">
            <Field label="Customer" value="Rotterdam Distribution B.V." />
            <Field label="Pickup" value="Thu 11 Sep, 08:00" />
            <Field label="Delivery" value="Hamburg, Dock 4" />
            <Field label="Quantity" value="24 pallets" />
            <Field label="Weight" value="3,240 kg" />
            <Field label="Carrier rate" value="€1,180" state={state === "approved" ? undefined : "active"} />
          </div>

          <hr className="dash-divider" />
          <div className="dash-actions">
            <button
              type="button"
              className="dash-btn"
              onClick={() => state !== "approved" && setState("saved")}
              disabled={state === "approved"}
            >
              Save draft
            </button>
            <button
              type="button"
              className="dash-btn is-primary"
              onClick={approve}
              disabled={state === "approving" || state === "approved"}
            >
              {state === "approved" ? "Approved" : "Approve"}
            </button>
          </div>
          <p className="dash-toast" aria-live="polite">
            {toast}
          </p>
        </div>
      </div>
    </AppShell>
  );
};

/* -------------------------------------------------------------------------
   Tabs
   ------------------------------------------------------------------------- */

const tabs: VerticalTabItem[] = [
  {
    id: "01",
    title: "Every order lands in one queue",
    description:
      "Emails, PDFs and forwarded threads arrive in one inbox, sorted into orders and everything else.",
    content: <OrdersScreen />,
  },
  {
    id: "02",
    title: "Every attachment gets read",
    description:
      "PDFs, scans, spreadsheets and forwarded emails are all read, whatever they are called.",
    content: <DocumentsScreen />,
  },
  {
    id: "03",
    title: "Every value traces back to its source",
    description:
      "Each field shows where it was read from. Anything uncertain is flagged for a person, not guessed.",
    content: <ReviewScreen />,
  },
  {
    id: "04",
    title: "Matched to your TMS",
    description:
      "Customers and sites are matched to the codes your TMS already uses. What the agent cannot settle is left for you.",
    content: <MatchScreen />,
  },
  {
    id: "05",
    title: "Nothing moves until your team says so",
    description: "Review, save a draft, or approve. Only approval pushes the order to your TMS.",
    content: <ApproveScreen />,
  },
];

export const HowItWorks = () => (
  <section id="process-flow" className="relative z-10 scroll-mt-24 border-y border-th-line-subtle bg-th-page py-16 md:py-20">
    <div className={PETARON_SECTION_SHELL}>
      <SectionHeading title="How it works" description="From your inbox to your TMS, one order at a time." />
      <VerticalTabs items={tabs} frame={Frame} panelHeight="min(558px, calc(100vh - 10rem))" />
    </div>
  </section>
);
