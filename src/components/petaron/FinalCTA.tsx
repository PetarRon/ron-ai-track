"use client";

import { useEffect, useId } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle2, X } from "lucide-react";

interface ContactFormProps {
  open: boolean;
  onClose: () => void;
}

const ContactForm = ({ open, onClose }: ContactFormProps) => {
  const [state, handleSubmit] = useForm("mreyazvz");
  const titleId = useId();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[200] flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl border border-th-line bg-th-elevated p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-th-muted hover:text-th-heading transition-colors"
          aria-label="Close contact form"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {state.succeeded ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="mx-auto h-14 w-14 text-ac-1" aria-hidden="true" />
            <h3 id={titleId} className="text-2xl font-bold text-th-heading">Message sent</h3>
            <p className="text-th-body">
              We will be in touch within 24 hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-full border border-th-line bg-th-surface-alt/50 px-6 py-3 text-sm font-semibold text-th-heading hover:bg-th-line/50 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 id={titleId} className="mb-1 text-xl font-bold text-th-heading">Get in Touch</h3>
            <p className="mb-6 text-sm text-th-body">
              Send us a message and we will get back to you shortly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              <div>
                <label htmlFor={nameId} className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-th-body">
                  Name
                </label>
                <input
                  id={nameId}
                  type="text"
                  name="name"
                  required
                  aria-describedby={`${nameId}-error`}
                  className="w-full rounded-xl border border-th-line bg-th-surface-alt/50 px-4 py-3 text-sm text-th-heading placeholder:text-th-faint focus:border-ac-1 focus:outline-none focus:ring-2 focus:ring-ac-1/20 transition"
                />
                <ValidationError
                  id={`${nameId}-error`}
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="mt-1 text-xs text-ac-neg"
                />
              </div>
              <div>
                <label htmlFor={emailId} className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-th-body">
                  Email
                </label>
                <input
                  id={emailId}
                  type="email"
                  name="email"
                  required
                  aria-describedby={`${emailId}-error`}
                  className="w-full rounded-xl border border-th-line bg-th-surface-alt/50 px-4 py-3 text-sm text-th-heading placeholder:text-th-faint focus:border-ac-1 focus:outline-none focus:ring-2 focus:ring-ac-1/20 transition"
                />
                <ValidationError
                  id={`${emailId}-error`}
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="mt-1 text-xs text-ac-neg"
                />
              </div>
              <div>
                <label htmlFor={messageId} className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-th-body">
                  Message
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  required
                  rows={4}
                  aria-describedby={`${messageId}-error`}
                  className="w-full resize-none rounded-xl border border-th-line bg-th-surface-alt/50 px-4 py-3 text-sm text-th-heading placeholder:text-th-faint focus:border-ac-1 focus:outline-none focus:ring-2 focus:ring-ac-1/20 transition"
                />
                <ValidationError
                  id={`${messageId}-error`}
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="mt-1 text-xs text-ac-neg"
                />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full rounded-full bg-ac-1 px-6 py-3.5 text-sm font-bold text-white transition hover:shadow-[0_0_24px_rgb(var(--ac-1)/0.4)] disabled:opacity-50"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
