import { useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode, type Ref, type RefObject } from "react";
import { motion } from "framer-motion";
import { LogoMark, RELAY_SHELL, settle } from "./shared";
import { streamSignal } from "./streamSignal";

/**
 * How it works, shown running: four steps, each a short text beside a small
 * window that loops one part of the journey, alternating sides.
 * 01 a booking lands in a familiar mail client; 02 the AI agent processes it
 * and it shows up in Petaron's queue; 03 the review fields fill in, each
 * lighting its phrase in the email; 04 Approve is clicked (by the visitor, or
 * by the cursor after a few seconds) and the order completes. Each window loops
 * on its own while it is on screen. Styles: `.relay-try` / `rt-*` in
 * src/index.css; the windows lay themselves out by their own width. Sample
 * data only.
 */

/* ---------- data ---------- */

type MailRowData = { av: string; color: string; from: string; time: string; subject: string; preview: string };

const MAIL_ROWS: MailRowData[] = [
  { av: "AF", color: "#8764b8", from: "Aegean Forwarding", time: "09:12", subject: "Two containers ex Piraeus", preview: "Please find the release for both units attached..." },
  { av: "RD", color: "#0f6cbd", from: "Rotterdam Distribution B.V.", time: "08:57", subject: "Re: Invoice 4471, payment confirmation", preview: "Payment for invoice 4471 was sent today..." },
  { av: "LF", color: "#ca5010", from: "Lyon Freight SARL", time: "08:40", subject: "Weekly consolidation, Antwerp to Lyon", preview: "Same as last week, 14 pallets, Tuesday..." },
  { av: "NB", color: "#038387", from: "Nordic Bulk AB", time: "Yesterday", subject: "Bulk salt, 3 trucks Monday", preview: "Confirming the three trucks for Monday morning..." },
];
const NEW_MAIL: MailRowData = {
  av: "RD",
  color: "#0f6cbd",
  from: "Rotterdam Distribution B.V.",
  time: "09:41",
  subject: "Booking request, Rotterdam to Hamburg",
  preview: "Hi team, please book a pickup at Antwerp, Quay 730 on Thursday...",
};

type QueueRowData = { tone: string; status: string; subject: string; fields: string; received: string };
const QUEUE_ROWS: QueueRowData[] = [
  { tone: "green", status: "Order completed", subject: "Two containers ex Piraeus", fields: "31/31", received: "09:12" },
  { tone: "quiet", status: "No order", subject: "Re: Invoice 4471, payment confirmation", fields: "—", received: "08:57" },
  { tone: "green", status: "Order completed", subject: "Weekly consolidation, Antwerp to Lyon", fields: "31/31", received: "08:40" },
  { tone: "green", status: "Order completed", subject: "Bulk salt, 3 trucks Monday", fields: "31/31", received: "Yesterday" },
];

// `src` names the phrase in the email that the value was read from; `history` marks a value
// the agent found in the customer's past orders rather than in this email
type FieldData = { label: string; value: string; how: string; src?: string; wide?: boolean; history?: boolean };
const FIELDS: FieldData[] = [
  { label: "Consignor", value: "ROTDIS01", how: "Matched to your TMS codes", src: "consignor" },
  { label: "Vehicle", value: "Curtainsider 13.6 m", how: "Found in order history", history: true, wide: true },
  { label: "Load Site", value: "Antwerp, Quay 730", how: "Read from the email", src: "lsite", wide: true },
  { label: "Pickup", value: "14/07 · 08:00", how: "Read from the email", src: "pickup" },
  { label: "Unload Site", value: "Hamburg Freight, Dock 4", how: "Read from the email", src: "usite", wide: true },
  { label: "Delivery", value: "15/07 · 16:00", how: "Read from the email", src: "delivery" },
  { label: "Unload Site Code", value: "HAMFRE04", how: "Matched to your TMS codes", src: "usite" },
  { label: "Goods", value: "24 pallets · 3,240 kg", how: "From the email and PDF", src: "goods", wide: true },
];

/* ---------- the loop runner ---------- */

type Wait = (ms: number, until?: () => boolean) => Promise<void>;

/**
 * Runs `cycle` over and over once the window is a third on screen; every wait
 * holds while the window is off screen, and everything stops on unmount.
 */
const useLoop = (frameRef: RefObject<HTMLElement>, cycle: (wait: Wait) => Promise<void>) => {
  const cycleRef = useRef(cycle);
  cycleRef.current = cycle;
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    let run = 0;
    let visible = false;
    let started = false;
    const start = async () => {
      const id = ++run;
      const wait: Wait = (ms, until) =>
        new Promise<void>((resolve, reject) => {
          let left = ms;
          let last = Date.now();
          const t = window.setInterval(() => {
            if (id !== run) {
              window.clearInterval(t);
              reject(new Error("stopped"));
              return;
            }
            const now = Date.now();
            if (visible) left -= now - last;
            last = now;
            if (left <= 0 || (until && until())) {
              window.clearInterval(t);
              resolve();
            }
          }, 30);
        });
      try {
        for (;;) await cycleRef.current(wait);
      } catch {
        /* stopped */
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (entry.intersectionRatio >= 0.33 && !started) {
          started = true;
          start();
        }
      },
      { threshold: [0, 0.33] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      run++;
    };
  }, [frameRef]);
};

/* ---------- pieces ---------- */

const Avatar = ({ text, color }: { text: string; color: string }) => (
  <span className="rt-ol-av" style={{ background: color }}>
    {text}
  </span>
);

const MailRow = ({ row, unread = false, selected = false, fresh = false }: { row: MailRowData; unread?: boolean; selected?: boolean; fresh?: boolean }) => (
  <div className={`rt-ol-row${unread ? " is-unread" : ""}${selected ? " is-sel" : ""}${fresh ? " is-new" : ""}`}>
    <Avatar text={row.av} color={row.color} />
    <span className="rt-ol-from">{row.from}</span>
    <span className="rt-ol-time">{row.time}</span>
    <span className="rt-ol-sub">{row.subject}</span>
    <span className="rt-ol-prev">{row.preview}</span>
  </div>
);

type MailState = { hasNew: boolean; open: boolean; toast: boolean };

const MailApp = ({ mail }: { mail: MailState }) => (
  <>
    <div className="rt-ol-bar">
      <span className="rt-waffle">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} />
        ))}
      </span>
      <b>Mail</b>
      <span className="rt-ol-search">Search</span>
    </div>
    <div className="rt-ol-body">
      <aside className="rt-ol-folders">
        <span className="rt-ol-folder is-on">
          Inbox <span className="cnt">{mail.hasNew ? 1 : ""}</span>
        </span>
        <span className="rt-ol-folder">Sent Items</span>
        <span className="rt-ol-folder">Drafts</span>
        <span className="rt-ol-folder">Archive</span>
      </aside>
      <div className="rt-ol-list">
        <div className="rt-ol-tabs">
          <span className="is-on">Focused</span>
          <span>Other</span>
        </div>
        {mail.hasNew && <MailRow row={NEW_MAIL} unread selected={mail.open} fresh />}
        {MAIL_ROWS.map((r, i) => (
          <MailRow key={i} row={r} />
        ))}
      </div>
      <div className="rt-ol-read">
        {mail.open ? (
          <>
            <h4>Booking request, Rotterdam to Hamburg</h4>
            <div className="rt-ol-sender">
              <Avatar text="RD" color="#0f6cbd" />
              <b>Rotterdam Distribution B.V. · Planning</b>
              <span>To: Orders · Today 09:41</span>
            </div>
            <div className="rt-ol-att">
              <i>PDF</i>ORDER_48291.pdf · 84 KB
            </div>
            <p className="rt-ol-text">
              Hi team, please book a pickup at <b>Antwerp, Quay 730</b> on Thursday <b>14/07 at 08:00</b>. Deliver to{" "}
              <b>Hamburg Freight, Dock 4</b> by <b>15/07, 16:00</b>. <b>24 pallets</b>, the order is attached.
              <br />
              <br />
              Thanks,
              <br />
              Planning
            </p>
          </>
        ) : (
          <div className="rt-ol-empty">Select an item to read</div>
        )}
      </div>
    </div>
    <div className={`rt-ol-toast${mail.toast ? " is-on" : ""}`}>
      <Avatar text="RD" color="#0f6cbd" />
      <b>Rotterdam Distribution B.V.</b>
      <span>Booking request, Rotterdam to Hamburg</span>
    </div>
  </>
);

const PetaronBar = ({ crumb }: { crumb: string }) => (
  <div className="rt-pt-bar">
    <LogoMark size={20} />
    <b>Petaron</b>
    <span className="crumb">{crumb}</span>
  </div>
);

const QueueRow = ({ row, fresh = false }: { row: QueueRowData; fresh?: boolean }) => (
  <div className={`rt-q-row${row.status === "No order" ? " is-dim" : ""}${fresh ? " is-new" : ""}`}>
    <span>
      <span className={`rt-chip ${row.tone}`}>{row.status}</span>
    </span>
    <span className="rt-q-sub">{row.subject}</span>
    <span className="rt-num">{row.fields}</span>
    <span className="rt-num">{row.received}</span>
  </div>
);

const Kw = ({ k, lit, children }: { k: string; lit: string | null; children: string }) => (
  <b className={`rt-kw${lit === k ? " is-lit" : ""}`}>{children}</b>
);

type ReviewProps = {
  revealed: number;
  lit: string | null;
  approved?: boolean;
  popup?: boolean;
  countdown?: boolean;
  hint: string;
  titleRef?: Ref<HTMLSpanElement>;
  approveRef?: Ref<HTMLButtonElement>;
  onApprove?: () => void;
};

const ReviewApp = ({ revealed, lit, approved = false, popup = false, countdown = false, hint, titleRef, approveRef, onApprove }: ReviewProps) => (
  <>
    <PetaronBar crumb="Orders › PO 48291" />
    <div className="rt-pt-main is-review">
      <div className="rt-pr-top">
        <span className="t" ref={titleRef}>
          PO 48291 · {NEW_MAIL.subject}
        </span>
        <span className={`rt-chip ${approved ? "green" : "amber"}`}>{approved ? "Order completed" : "Needs review"}</span>
        <span className="rt-num">31/31</span>
      </div>
      <div className="rt-pr-split">
        <div className="rt-pr-mail">
          <div className="from">
            <Kw k="consignor" lit={lit}>
              Rotterdam Distribution B.V.
            </Kw>{" "}
            · 09:41
          </div>
          Pickup at <Kw k="lsite" lit={lit}>Antwerp, Quay 730</Kw> on Thursday <Kw k="pickup" lit={lit}>14/07 at 08:00</Kw>. Deliver to{" "}
          <Kw k="usite" lit={lit}>Hamburg Freight, Dock 4</Kw> by <Kw k="delivery" lit={lit}>15/07, 16:00</Kw>. <Kw k="goods" lit={lit}>24 pallets</Kw>,
          order attached.
        </div>
        <div className="rt-pf">
          {FIELDS.map((f, i) => (
            <div key={f.label} className={`rt-pf-f${i < revealed ? " is-on" : ""}${f.wide ? " is-wide-sm" : ""}`}>
              <label>
                {f.label}
                {f.history && <span className="hist"> · from history</span>}
              </label>
              <div className="v">{f.value}</div>
              <p className="how">
                <span className={`rt-dot${f.history ? " is-history" : ""}`} />
                {f.how}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="rt-pr-act">
        <span className="rt-hint">{hint}</span>
        <span className="rt-btn">Save draft</span>
        {onApprove ? (
          <button ref={approveRef} type="button" className="rt-btn primary" onClick={onApprove} disabled={approved}>
            {approved ? "Approved" : "Approve"}
          </button>
        ) : (
          <span className="rt-btn primary is-still">Approve</span>
        )}
      </div>
      {onApprove && (
        <div className={`rt-pop${popup ? " is-on" : ""}`}>
          <div className="box">
            <span className="ok">✓</span>
            <h4>Order completed</h4>
            <dl>
              <dt>Order</dt>
              <dd>PO 48291</dd>
              <dt>Consignor</dt>
              <dd>ROTDIS01</dd>
              <dt>Unload</dt>
              <dd>HAMFRE04 · 15/07</dd>
            </dl>
            <p className="rt-hint">Exported in your TMS format. Nobody retyped it.</p>
            <div className={`cd${countdown ? " is-run" : ""}`}>
              <i />
            </div>
          </div>
        </div>
      )}
    </div>
  </>
);

type CursorState = { x: string; y: string; on: boolean; clicking: boolean; instant: boolean };
const PARKED: CursorState = { x: "60%", y: "105%", on: false, clicking: false, instant: true };

const Cursor = ({ c }: { c: CursorState }) => (
  <div
    className={`rt-cursor${c.on ? " is-on" : ""}${c.clicking ? " is-click" : ""}`}
    style={{ left: c.x, top: c.y, transition: c.instant ? "none" : undefined }}
    aria-hidden
  >
    <svg viewBox="0 0 24 24">
      <path d="M5 3l14 8-6 1.5L16 20l-2 1-3-7.5L6 18z" />
    </svg>
    <span className="ripple" />
  </div>
);

/** where an element's centre sits inside the window, for the cursor; undoes the window's zoom */
const spot = (screen: HTMLElement | null, el: Element | null, fx = 0.5, fy = 0.55) => {
  if (!screen || !el) return null;
  const s = screen.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const k = s.width ? screen.offsetWidth / s.width : 1;
  return { x: `${(r.left - s.left + r.width * fx) * k}px`, y: `${(r.top - s.top + r.height * fy) * k}px` };
};

const Frame = ({ frameRef, screenRef, children }: { frameRef: Ref<HTMLDivElement>; screenRef?: Ref<HTMLDivElement>; children: ReactNode }) => (
  <div ref={frameRef} className="rt-card is-mini">
    <div ref={screenRef} className="rt-screen">
      {children}
    </div>
  </div>
);

/* ---------- 01 · the email lands ---------- */

const MailClip = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [appKey, setAppKey] = useState(0);
  const [mail, setMail] = useState<MailState>({ hasNew: false, open: false, toast: false });

  useLoop(frameRef, async (wait) => {
    setAppKey((k) => k + 1);
    setMail({ hasNew: false, open: false, toast: false });
    await wait(1400);
    setMail({ hasNew: true, open: false, toast: true });
    await wait(2400);
    setMail({ hasNew: true, open: true, toast: false });
    await wait(4200);
  });

  return (
    <Frame frameRef={frameRef}>
      <div key={appKey} className="rt-app rt-ol">
        <MailApp mail={mail} />
      </div>
    </Frame>
  );
};

/* ---------- 02 · the AI agent processes it, and it shows up in the queue ---------- */

const QueueClip = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [appKey, setAppKey] = useState(0);
  const [newRow, setNewRow] = useState<null | "processing" | "review">(null);

  useLoop(frameRef, async (wait) => {
    setAppKey((k) => k + 1);
    setNewRow(null);
    await wait(1200);
    setNewRow("processing");
    await wait(2800);
    setNewRow("review");
    await wait(3600);
  });

  return (
    <Frame frameRef={frameRef}>
      <div key={appKey} className="rt-app rt-pt">
        <PetaronBar crumb="Orders" />
        <div className="rt-pt-main">
          <div className="rt-q">
            <div className="rt-q-row is-head">
              <span>Status</span>
              <span>Subject</span>
              <span className="rt-num">Fields</span>
              <span className="rt-num">Received</span>
            </div>
            {newRow && (
              <QueueRow
                fresh
                row={{
                  tone: newRow === "review" ? "amber" : "grey",
                  status: newRow === "review" ? "Needs review" : "Processing",
                  subject: NEW_MAIL.subject,
                  fields: newRow === "review" ? "31/31" : "…",
                  received: "09:41",
                }}
              />
            )}
            {QUEUE_ROWS.map((r, i) => (
              <QueueRow key={i} row={r} />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* ---------- 03 · the fields fill in, each lighting its source ---------- */

const ReviewClip = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [appKey, setAppKey] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [lit, setLit] = useState<string | null>(null);

  useLoop(frameRef, async (wait) => {
    setAppKey((k) => k + 1);
    setRevealed(0);
    setLit(null);
    await wait(800);
    for (let i = 0; i < FIELDS.length; i++) {
      setRevealed(i + 1);
      setLit(FIELDS[i].src ?? null);
      await wait(450);
    }
    setLit(null);
    await wait(3800);
  });

  return (
    <Frame frameRef={frameRef}>
      <div key={appKey} className="rt-app rt-pt">
        <ReviewApp revealed={revealed} lit={lit} hint="Every value traced to its source." />
      </div>
    </Frame>
  );
};

/* ---------- 04 · approve, and it is done ---------- */

const ApproveClip = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const approveRef = useRef<HTMLButtonElement>(null);
  const waiting = useRef(false);
  const approvedRef = useRef(false);
  const [appKey, setAppKey] = useState(0);
  const [approved, setApproved] = useState(false);
  const [popup, setPopup] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [cursor, setCursor] = useState<CursorState>(PARKED);

  const moveTo = useCallback((el: Element | null, fx?: number, fy?: number) => {
    const p = spot(screenRef.current, el, fx, fy);
    if (p) setCursor((c) => ({ ...c, ...p, on: true, instant: false }));
  }, []);

  useLoop(frameRef, async (wait) => {
    setAppKey((k) => k + 1);
    setApproved(false);
    setPopup(false);
    setCountdown(false);
    setCursor(PARKED);
    approvedRef.current = false;
    waiting.current = true;
    await wait(900);
    moveTo(titleRef.current, 0.7, 1.6);
    await wait(4200, () => approvedRef.current);
    if (!approvedRef.current) {
      moveTo(approveRef.current);
      await wait(1250);
      setCursor((c) => ({ ...c, clicking: true }));
      await wait(380);
      setCursor((c) => ({ ...c, clicking: false }));
      approvedRef.current = true;
    }
    waiting.current = false;
    setCursor((c) => ({ ...c, on: false }));
    setApproved(true);
    setPopup(true);
    streamSignal.surge = 1;
    await wait(60);
    setCountdown(true);
    await wait(5000);
  });

  const onApprove = () => {
    if (waiting.current && !approvedRef.current) {
      approvedRef.current = true;
      setCursor((c) => ({ ...c, on: false }));
    }
  };

  return (
    <Frame frameRef={frameRef} screenRef={screenRef}>
      <div key={appKey} className="rt-app rt-pt">
        <ReviewApp
          revealed={FIELDS.length}
          lit={null}
          approved={approved}
          popup={popup}
          countdown={countdown}
          hint="Click Approve yourself."
          titleRef={titleRef}
          approveRef={approveRef}
          onApprove={onApprove}
        />
      </div>
      <Cursor c={cursor} />
    </Frame>
  );
};

/* ---------- the section ---------- */

const STEPS: { n: string; title: string; body: string; Clip: ComponentType }[] = [
  {
    n: "01",
    title: "The email lands",
    body: "Customers keep sending orders the way they always have: emails, PDFs, forwarded threads. Nothing changes on their side.",
    Clip: MailClip,
  },
  {
    n: "02",
    title: "The AI agent drafts it",
    body: "It reads the email and every attachment, sorts orders from everything else, and drafts the order before anyone opens it.",
    Clip: QueueClip,
  },
  {
    n: "03",
    title: "Every value traced",
    body: "Each field shows where it was read from. Anything uncertain is flagged for a person, not guessed.",
    Clip: ReviewClip,
  },
  {
    n: "04",
    title: "You approve",
    body: "Review, save a draft, or approve. Only approval sends the order to your TMS.",
    Clip: ApproveClip,
  },
];

export const RelayTryIt = () => (
  <section id="how" className={`relay-try relative scroll-mt-20 py-16 ${RELAY_SHELL}`}>
    <motion.h2
      {...settle()}
      className="text-center font-display text-[clamp(23px,6vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em] text-th-heading"
    >
      Watch it run.
    </motion.h2>
    <div className="mt-12 divide-y divide-white/[0.06] rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgb(255_255_255/0.05),rgb(255_255_255/0.012)_55%)] px-3 shadow-[0_40px_100px_-50px_rgb(0_0_0/0.9),0_0_100px_-40px_rgb(var(--ac-1)/0.2)] backdrop-blur-md sm:px-8 lg:px-14">
      {STEPS.map(({ n, title, body, Clip }, i) => {
        const flip = i % 2 === 1;
        return (
          <div
            key={n}
            className={`grid items-center gap-8 py-10 lg:gap-14 lg:py-14 ${flip ? "lg:grid-cols-[500px_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_500px]"}`}
          >
            <motion.div {...settle()} className={flip ? "lg:order-2" : ""}>
              <span className="font-mono text-[13px] text-ac-1">{n}</span>
              <h3 className="mt-3 font-display text-[26px] font-semibold leading-tight tracking-[-0.02em] text-th-heading sm:text-[30px]">{title}</h3>
              <p className="mt-3 max-w-md font-body text-[15px] leading-relaxed text-th-body">{body}</p>
            </motion.div>
            <motion.div {...settle(0.1)} className={flip ? "lg:order-1" : ""}>
              <Clip />
            </motion.div>
          </div>
        );
      })}
    </div>
  </section>
);
