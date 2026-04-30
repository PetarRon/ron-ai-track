import { useId, useState } from "react";
import { faqItems } from "./data";

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();

  return (
    <section id="faq" className="py-16 relative z-10">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="flex flex-col gap-10">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-th-muted mb-3">Questions</p>
            <h3 className="text-2xl font-serif font-normal tracking-tight text-th-heading md:text-3xl">
              Frequently asked questions
            </h3>
            <p className="mt-3 max-w-md text-sm text-th-body mx-auto">
              Everything you need to know about working with PetaRon.ai.
            </p>
          </div>

          <ul className="space-y-3">
            {faqItems.map((item, index) => {
              const open = activeIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;
              return (
                <li
                  key={item.question}
                  className="group relative overflow-hidden rounded-2xl border border-th-line backdrop-blur-xl bg-th-surface-alt/40 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-0.5"
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setActiveIndex(open ? -1 : index)}
                    className="relative flex w-full items-start gap-5 px-6 py-5 text-left transition-colors duration-300"
                  >
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-th-line bg-th-surface-alt/50 transition-all duration-500 group-hover:scale-105">
                      <span
                        className={`pointer-events-none absolute inset-0 rounded-full border border-th-line opacity-30 ${
                          open ? "animate-ping" : ""
                        }`}
                      />
                      <svg
                        aria-hidden="true"
                        className={`relative h-4 w-4 text-th-heading transition-transform duration-500 ${open ? "rotate-45" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>

                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <h4 className="text-sm font-medium leading-tight text-th-heading sm:text-[15px]">
                          {item.question}
                        </h4>
                        <span className="inline-flex w-fit items-center rounded-full border border-th-line px-2.5 py-0.5 text-[9px] uppercase tracking-[0.3em] text-th-muted sm:ml-auto">
                          {item.meta}
                        </span>
                      </div>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`overflow-hidden text-[13px] leading-relaxed transition-[max-height,opacity] duration-500 ease-out text-th-body ${
                          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="pr-2">{item.answer}</p>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
