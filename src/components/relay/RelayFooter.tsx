import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContact } from "@/components/petaron/contact-context";
import { CalButton, Card, Em, LogoMark, RELAY_SHELL, buttonVariants, settle } from "./shared";

const columns = {
  product: [
    { label: "How it works", href: "/preview/relay#process" },
    { label: "Cost calculator", href: "/preview/relay#calculator" },
    { label: "FAQ", href: "/preview/relay#faq" },
  ],
  company: [
    { label: "About", href: "/preview/relay/about" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export const RelayFooter = () => {
  const { openContact } = useContact();
  return (
    <footer className={`relative pb-10 pt-28 ${RELAY_SHELL}`}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <motion.div {...settle(0.05)}>
          <Card className="relative flex h-full flex-col justify-between overflow-hidden p-7 md:p-8">
            <img
              src="/petaron_logo.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-6 top-1/2 h-40 w-40 -translate-y-1/2 opacity-[0.07] grayscale"
            />
            <div className="flex items-center gap-2.5">
              <LogoMark size={28} />
              <span className="font-body text-[17px] font-medium tracking-tight text-th-heading">Petaron</span>
            </div>
            <p className="mt-16 max-w-[240px] font-body text-[16px] leading-relaxed text-th-heading">
              AI-powered order processing for freight forwarders. From email to TMS.
            </p>
            <div className="mt-10 flex items-center justify-between border-t border-th-line/60 pt-5">
              <span className="font-mono text-[11px] text-th-muted">stay in touch</span>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/company/petaron"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-7 w-7 place-items-center rounded-md border border-th-line bg-th-surface font-mono text-[10px] text-th-body transition hover:text-th-heading"
                >
                  in
                </a>
                <button
                  type="button"
                  onClick={openContact}
                  className="grid h-7 w-7 place-items-center rounded-md border border-th-line bg-th-surface font-mono text-[10px] text-th-body transition hover:text-th-heading"
                >
                  @
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div {...settle(0.15)} id="demo" className="scroll-mt-24">
          <div className="h-full rounded-2xl bg-ac-1 p-7 md:p-9">
            <span className="font-mono text-[12px] text-th-page/60">what now</span>
            <h2 className="mt-3 font-body text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] text-th-page sm:text-[36px]">
              Ready to automate your <Em dark>order entry</Em>?
            </h2>
            <p className="mt-4 max-w-xl font-body text-[15px] leading-relaxed text-th-page/75">
              Book a 30-minute demo and see Petaron.ai run on your own orders. A free one-month pilot, no card, and your
              TMS stays exactly as it is.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CalButton variant="dark">Book a Demo for Free</CalButton>
              <button
                type="button"
                onClick={openContact}
                className={`${buttonVariants.ghost} border-th-page/20 bg-transparent text-th-page hover:bg-th-page/10`}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-2 font-mono text-[11px] text-th-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ac-1" /> all systems normal
        </span>
        <span>EU-hosted</span>
        <span>GDPR compliant</span>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-8 border-t border-th-line/60 pt-10 md:grid-cols-5">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <LogoMark size={22} />
            <span className="font-body text-[14px] text-th-heading">Petaron Labs</span>
          </div>
          <p className="mt-3 max-w-xs font-body text-[13px] text-th-muted">AI-powered order processing for freight forwarders.</p>
        </div>
        {Object.entries(columns).map(([title, links]) => (
          <div key={title}>
            <h3 className="font-mono text-[11px] text-th-muted">{title}</h3>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="font-body text-[13px] text-th-body transition hover:text-th-heading">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-10 font-mono text-[11px] text-th-faint">&copy; {new Date().getFullYear()} Petaron AI. All rights reserved.</p>
    </footer>
  );
};
