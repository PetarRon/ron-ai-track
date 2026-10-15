import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Em, RELAY_SHELL, settle } from "./shared";

/**
 * What you get: six feature cards under one headline, each with one quiet
 * looping micro-visual. Claims stay within what the product does today.
 * Styles: `rf-*` in src/index.css.
 */

/* ---------- the six micro-visuals ---------- */

const Ocr = () => (
  <div className="rf-viz rf-ocr" aria-hidden>
    <div className="page">
      {[88, 64, 92, 70, 80, 56].map((w, i) => (
        <i key={i} style={{ width: `${w}%` }} />
      ))}
      <span className="scan" />
    </div>
    <div className="out">
      <b>Gross weight</b> 3,240 kg
    </div>
  </div>
);

const Files = () => (
  <div className="rf-viz rf-files" aria-hidden>
    {["PDF", "XLSX", "DOCX", "JPG", "EML", "CSV"].map((f, i) => (
      <span key={f} style={{ ["--i" as string]: i }}>
        {f}
      </span>
    ))}
  </div>
);

const Sources = () => (
  <div className="rf-viz rf-sources" aria-hidden>
    <div className="ins">
      <span>Shared inbox</span>
      <span>Forwarded mail</span>
      <span>SFTP drop</span>
    </div>
    <svg viewBox="0 0 120 90" preserveAspectRatio="none">
      {[15, 45, 75].map((y, i) => (
        <path key={y} d={`M0 ${y} C 60 ${y}, 60 45, 120 45`} className="wire" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
    </svg>
    <span className="hub">one dashboard</span>
  </div>
);

const Trace = () => (
  <div className="rf-viz rf-trace" aria-hidden>
    <div className="quote">
      “Total weight: <b>3,240 kg</b>”
    </div>
    <svg viewBox="0 0 40 60" preserveAspectRatio="none">
      <path d="M2 10 C 30 10, 10 50, 38 50" className="link" />
    </svg>
    <div className="field">
      <em>Gross weight</em>3,240 kg
      <small>read from the email</small>
    </div>
  </div>
);

const Reason = () => (
  <div className="rf-viz rf-reason" aria-hidden>
    <span className="q">Why ROTDIS01?</span>
    <p className="a">
      <span className="typed">Same sender and address as past orders.</span>
    </p>
  </div>
);

const Trust = () => (
  <div className="rf-viz rf-trust" aria-hidden>
    {[
      ["09:42", "Draft saved"],
      ["09:44", "Approved by you"],
      ["09:44", "Exported in your TMS format"],
    ].map(([t, s], i) => (
      <div key={s} style={{ ["--i" as string]: i }}>
        <span className="t">{t}</span>
        {s}
      </div>
    ))}
  </div>
);

const FEATURES: { title: string; body: string; viz: ReactNode }[] = [
  { title: "Intelligent OCR", body: "Scans, photos and poor-quality PDFs are read like typed text, tables included.", viz: <Ocr /> },
  { title: "Any file type", body: "PDF, Excel, Word, images and forwarded threads. Whatever the attachment is called.", viz: <Files /> },
  { title: "Every source, one dashboard", body: "Shared inboxes, forwarded mail and SFTP drops all land in one place, ready for your team.", viz: <Sources /> },
  { title: "A source for every field", body: "Each value links to the exact line it was read from. Click the field, see the quote.", viz: <Trace /> },
  { title: "Reasoning you can read", body: "When the agent picks a code or leaves a field open, it says why, in plain words.", viz: <Reason /> },
  { title: "Your data, in the EU", body: "EU-hosted and GDPR-compliant. Every draft and approval kept in an append-only history.", viz: <Trust /> },
];

export const RelayFeatures = () => (
  <section id="features" className={`relative scroll-mt-20 py-20 ${RELAY_SHELL}`}>
    <div className="mx-auto grid max-w-3xl justify-items-center gap-4 text-center">
      <motion.h2
        {...settle()}
        className="text-balance font-display text-[clamp(28px,4.4vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-th-heading"
      >
        One pipeline. <Em>Every step built in.</Em>
      </motion.h2>
      <motion.p {...settle(0.1)} className="max-w-xl font-body text-[15px] leading-relaxed text-th-body">
        From the moment an email lands to the file your TMS imports, every step runs in one place, and every step shows its work.
      </motion.p>
    </div>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f, i) => (
        <motion.div key={f.title} {...settle(0.05 * i)} className="rf-card flex flex-col gap-5 p-6 text-center">
          <div>
            <h3 className="font-display text-[19px] font-semibold tracking-[-0.02em] text-th-heading">{f.title}</h3>
            <p className="mx-auto mt-2 max-w-[34ch] font-body text-[13.5px] leading-relaxed text-th-body">{f.body}</p>
          </div>
          <div className="mt-auto text-left">{f.viz}</div>
        </motion.div>
      ))}
    </div>
  </section>
);
