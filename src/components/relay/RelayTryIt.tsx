import { useCallback, useEffect, useRef, useState, type Ref } from "react";
import { motion } from "framer-motion";
import { LogoMark, RELAY_SHELL, settle } from "./shared";

/**
 * Try it: one order on a loop. A booking lands in a familiar mail client, the
 * screen switches to Petaron, the order appears in the queue, a cursor opens
 * it with every field ready, and Approve is clicked by the visitor or, after a
 * few seconds, by the cursor. An "Order completed" pop-up holds for five
 * seconds and the loop starts again. Styles: `.relay-try` / `rt-*` in
 * src/index.css. Sample data only.
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

// `src` names the phrase in the email that the value was read from
type FieldData = { label: string; value: string; how: string; src?: string; wide?: boolean };
const FIELDS: FieldData[] = [
  { label: "Consignor", value: "ROTDIS01", how: "Matched to your TMS codes", src: "consignor" },
  { label: "Load Reference", value: "PO 48291", how: "Read from the PDF" },
  { label: "Load Site", value: "Antwerp, Quay 730", how: "Read from the email", src: "lsite" },
  { label: "Pickup", value: "14/07 · 08:00", how: "Read from the email", src: "pickup" },
  { label: "Unload Site", value: "Hamburg Freight, Dock 4", how: "Read from the email", src: "usite", wide: true },
  { label: "Delivery", value: "15/07 · 16:00", how: "Read from the email", src: "delivery" },
  { label: "Unload Site Code", value: "HAMFRE04", how: "Matched to your TMS codes", src: "usite" },
  { label: "Goods", value: "24 pallets · 3,240 kg", how: "Read from the email and the PDF", src: "goods", wide: true },
];

const STOPS = ["Email", "Petaron", "Review", "Done"];

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

const QueueRow = ({ row, fresh = false, cellRef }: { row: QueueRowData; fresh?: boolean; cellRef?: Ref<HTMLSpanElement> }) => (
  <div className={`rt-q-row${row.status === "No order" ? " is-dim" : ""}${fresh ? " is-new" : ""}`}>
    <span>
      <span className={`rt-chip ${row.tone}`}>{row.status}</span>
    </span>
    <span className="rt-q-sub" ref={cellRef}>
      {row.subject}
    </span>
    <span className="rt-num">{row.fields}</span>
    <span className="rt-num">{row.received}</span>
  </div>
);

const Kw = ({ k, lit, children }: { k: string; lit: string | null; children: string }) => (
  <b className={`rt-kw${lit === k ? " is-lit" : ""}`}>{children}</b>
);

/* ---------- the loop ---------- */

type Phase = "mail" | "queue" | "review";
type Cursor = { x: string; y: string; on: boolean; clicking: boolean; instant: boolean };
const PARKED: Cursor = { x: "60%", y: "105%", on: false, clicking: false, instant: true };

export const RelayTryIt = () => {
  const [phase, setPhase] = useState<Phase>("mail");
  const [appKey, setAppKey] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [stage, setStage] = useState(1);
  const [caption, setCaption] = useState("Email lands in the inbox");
  const [mail, setMail] = useState<MailState>({ hasNew: true, open: true, toast: false });
  const [newRow, setNewRow] = useState<null | "processing" | "review">(null);
  const [revealed, setRevealed] = useState(0);
  const [lit, setLit] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);
  const [popup, setPopup] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [cursor, setCursor] = useState<Cursor>(PARKED);

  const cardRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const approveRef = useRef<HTMLButtonElement>(null);

  const run = useRef(0);
  const visible = useRef(false);
  const waiting = useRef(false);
  const approvedRef = useRef(false);

  // a cancellable wait that holds while the card is off screen, and can end early
  const wait = useCallback(
    (ms: number, id: number, until?: () => boolean) =>
      new Promise<void>((resolve, reject) => {
        let left = ms;
        let last = Date.now();
        const t = window.setInterval(() => {
          if (id !== run.current) {
            window.clearInterval(t);
            reject(new Error("cancelled"));
            return;
          }
          const now = Date.now();
          if (visible.current) left -= now - last;
          last = now;
          if (left <= 0 || (until && until())) {
            window.clearInterval(t);
            resolve();
          }
        }, 30);
      }),
    [],
  );

  const pointAt = useCallback((el: Element | null, fx = 0.5, fy = 0.55) => {
    const screen = screenRef.current;
    if (!el || !screen) return;
    const s = screen.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setCursor((c) => ({ ...c, on: true, instant: false, x: `${r.left - s.left + r.width * fx}px`, y: `${r.top - s.top + r.height * fy}px` }));
  }, []);

  const click = useCallback(
    async (id: number) => {
      setCursor((c) => ({ ...c, clicking: true }));
      await wait(380, id);
      setCursor((c) => ({ ...c, clicking: false }));
    },
    [wait],
  );

  const play = useCallback(async () => {
    const id = ++run.current;
    waiting.current = false;
    approvedRef.current = false;
    try {
      // 1 · the email lands
      setCursor(PARKED);
      setPhase("mail");
      setAppKey((k) => k + 1);
      setLeaving(false);
      setStage(1);
      setMail({ hasNew: false, open: false, toast: false });
      setNewRow(null);
      setRevealed(0);
      setLit(null);
      setApproved(false);
      setPopup(false);
      setCountdown(false);
      setCaption("Email lands in the inbox");
      await wait(1800, id);
      setMail({ hasNew: true, open: false, toast: true });
      await wait(2400, id);
      setMail({ hasNew: true, open: true, toast: false });
      await wait(3600, id);

      // 2 · Petaron picks it up
      setLeaving(true);
      await wait(450, id);
      setLeaving(false);
      setPhase("queue");
      setAppKey((k) => k + 1);
      setStage(2);
      setCaption("Petaron is processing the order");
      await wait(1000, id);
      setNewRow("processing");
      await wait(2800, id);
      setNewRow("review");
      await wait(1600, id);
      pointAt(rowRef.current, 0.3);
      await wait(1250, id);
      await click(id);

      // 3 · ready for review; the visitor may approve
      setPhase("review");
      setAppKey((k) => k + 1);
      setStage(3);
      setCaption("Order is available for review");
      for (let i = 0; i < FIELDS.length; i++) {
        setRevealed(i + 1);
        setLit(FIELDS[i].src ?? null);
        await wait(320, id);
      }
      window.setTimeout(() => setLit(null), 350);
      pointAt(titleRef.current, 0.7, 1.6);
      waiting.current = true;
      await wait(5500, id, () => approvedRef.current);
      if (!approvedRef.current) {
        pointAt(approveRef.current);
        await wait(1250, id);
        await click(id);
        approvedRef.current = true;
      }
      waiting.current = false;

      // 4 · done, hold, and go again
      setCursor((c) => ({ ...c, on: false }));
      setApproved(true);
      setStage(4);
      setPopup(true);
      setCaption("Order completed");
      await wait(60, id);
      setCountdown(true);
      await wait(5000, id);
      playRef.current();
    } catch {
      /* replaced by a newer run, or unmounted */
    }
  }, [wait, pointAt, click]);

  const playRef = useRef(play);
  playRef.current = play;

  // play once the card is on screen, hold whenever it is not, stop on unmount
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting && !started) {
          started = true;
          playRef.current();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      run.current++;
    };
  }, []);

  const onApprove = () => {
    if (waiting.current && !approvedRef.current) {
      approvedRef.current = true;
      setCursor((c) => ({ ...c, on: false }));
    }
  };

  return (
    <section id="try" className={`relay-try relative scroll-mt-20 py-16 ${RELAY_SHELL}`}>
      <motion.h2
        {...settle()}
        className="pb-6 text-center font-display text-[clamp(23px,6vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em] text-th-heading"
      >
        Watch it run.
      </motion.h2>

      <div ref={cardRef} className="rt-card">
        <div className="rt-rail" aria-hidden>
          <div className="track">
            <div className="fill" style={{ transform: `scaleX(${(stage - 1) / 3})` }} />
          </div>
          {STOPS.map((label, i) => (
            <span key={label} className={`rt-stop${i + 1 <= stage ? " is-reached" : ""}${i + 1 === stage ? " is-current" : ""}`}>
              <span className="dot" />
              {label}
            </span>
          ))}
        </div>

        <div ref={screenRef} className="rt-screen">
          <div key={appKey} className={`rt-app ${phase === "mail" ? "rt-ol" : "rt-pt"}${leaving ? " is-out" : ""}`}>
            {phase === "mail" && <MailApp mail={mail} />}

            {phase === "queue" && (
              <>
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
                        cellRef={rowRef}
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
              </>
            )}

            {phase === "review" && (
              <>
                <PetaronBar crumb="Orders › PO 48291" />
                <div className="rt-pt-main">
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
                      <Kw k="usite" lit={lit}>Hamburg Freight, Dock 4</Kw> by <Kw k="delivery" lit={lit}>15/07, 16:00</Kw>.{" "}
                      <Kw k="goods" lit={lit}>24 pallets</Kw>, order attached.
                    </div>
                    <div className="rt-pf">
                      {FIELDS.map((f, i) => (
                        <div key={f.label} className={`rt-pf-f${i < revealed ? " is-on" : ""}${f.wide ? " is-wide-sm" : ""}`}>
                          <label>{f.label}</label>
                          <div className="v">{f.value}</div>
                          <p className="how">
                            <span className="rt-dot" />
                            {f.how}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rt-pr-act">
                    <span className="rt-hint">Click Approve yourself.</span>
                    <span className="rt-btn">Save draft</span>
                    <button ref={approveRef} type="button" className="rt-btn primary" onClick={onApprove} disabled={approved}>
                      {approved ? "Approved" : "Approve"}
                    </button>
                  </div>
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
                </div>
              </>
            )}
          </div>

          <div
            className={`rt-cursor${cursor.on ? " is-on" : ""}${cursor.clicking ? " is-click" : ""}`}
            style={{ left: cursor.x, top: cursor.y, transition: cursor.instant ? "none" : undefined }}
            aria-hidden
          >
            <svg viewBox="0 0 24 24">
              <path d="M5 3l14 8-6 1.5L16 20l-2 1-3-7.5L6 18z" />
            </svg>
            <span className="ripple" />
          </div>
        </div>

        <p className="rt-cap" aria-live="polite">
          {caption}
        </p>
      </div>
    </section>
  );
};
