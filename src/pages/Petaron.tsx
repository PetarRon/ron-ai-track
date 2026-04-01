import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCalApi } from "@calcom/embed-react";
import { integrations } from "@/components/petaron/data";
import { PlatformPreviewSection } from "@/components/petaron/PlatformPreviewSection";
import { ProcessFlowSection } from "@/components/petaron/ProcessFlowSection";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SparklesSection } from "@/components/ui/sparkles";
import { InteractiveHoverButton, SpinningLogo } from "@/components/petaron/shared";
import ContactForm from "@/components/petaron/FinalCTA";

const MouseTracker = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      <motion.div
        className="absolute h-[520px] w-[520px] rounded-full blur-[110px] opacity-55"
        style={{
          background: "radial-gradient(circle, rgb(var(--ac-1) / 0.14) 0%, rgb(var(--ac-2) / 0.05) 42%, transparent 72%)",
          x: useTransform(mouseX, (v) => v - 260),
          y: useTransform(mouseY, (v) => v - 260),
        }}
        transition={{ type: "spring", stiffness: 55, damping: 22, mass: 0.45 }}
      />
    </div>
  );
};

const RevealText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
};

const TYPEWRITER_WORDS = [
  "automate ?",
  "scale ?",
  "lead ?",
  "transform ?",
  "accelerate ?",
  "innovate ?",
  "advance ?",
  "improve ?",
  "utilize AI ?",
  "move faster ?",
  "take control ?",
  "save time ?",
  "improve efficiency ?",
  "increase productivity ?",
  "optimize workflows ?",
  "enhance service ?",
];

const TypewriterWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block w-[220px] text-left align-baseline md:w-[280px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={TYPEWRITER_WORDS[index]}
          className="inline-block bg-gradient-to-r from-ac-1 via-ac-2 to-ac-3 bg-clip-text text-transparent"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {TYPEWRITER_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const SellLine = ({ text }: { text: string }) => {
  const t = text.trim();
  if (!t) return null;
  return (
    <div className="relative z-10 py-7 md:py-8">
      <div className="mx-auto w-full max-w-[1300px] px-5 md:px-8">
        <p className="mx-auto max-w-3xl text-center font-body text-sm font-normal leading-relaxed tracking-normal text-th-muted/50 md:text-[15px] md:text-th-muted/45">
          {t}
        </p>
      </div>
    </div>
  );
};

const faqItems = [
  {
    question: "Does it work with our existing TMS?",
    answer: "Yes. PetaRon.ai connects to the TMS you already use. No ripping and replacing, your setup stays the same, the manual work disappears.",
    meta: "Integration",
  },
  {
    question: "How long does it take to get started?",
    answer: "Days, not months. We connect to your email flow, configure your fields, and you are processing orders within a week.",
    meta: "Onboarding",
  },
  {
    question: "Does our team lose control over orders?",
    answer: "Never. AI handles the intake, your team makes every decision. Nothing moves to your TMS without human approval.",
    meta: "Control",
  },
  {
    question: "Is this built specifically for logistics?",
    answer: "From the ground up. PetaRon.ai was designed around the daily reality of freight operations, multi-format orders, tight deadlines, and zero tolerance for errors.",
    meta: "Industry",
  },
  {
    question: "What happens when the AI encounters an edge case?",
    answer: "It flags it. Anything the AI is not fully confident about gets routed to your team for review. Nothing slips through unchecked.",
    meta: "Reliability",
  },
  {
    question: "How fast is the ROI?",
    answer: "Most teams see the impact in the first week. Less time on data entry means more time with customers, that is value from day one.",
    meta: "Value",
  },
  {
    question: "Is there a free trial or pilot?",
    answer: "We offer a free 14-day pilot with your actual data. You will see exactly how it performs before making any commitment.",
    meta: "Pilot",
  },
  {
    question: "What data do you need from us to get started?",
    answer: "Access to your order inbox, basic TMS credentials, and a short walkthrough of your field mapping. That is it, we handle the rest.",
    meta: "Setup",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
              return (
                <li
                  key={item.question}
                  className="group relative overflow-hidden rounded-2xl border border-th-line backdrop-blur-xl bg-th-surface-alt/40 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-0.5"
                >

                  <button
                    type="button"
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

const footerLinks = {
  Product: [
    { label: "How It Works", href: "#process-flow" },
    { label: "Platform", href: "#platform" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const Petaron = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const location = useLocation();

  const [contactOpen, setContactOpen] = useState(false);

  const initCal = useCallback(async () => {
    const cal = await getCalApi({ namespace: "30min" });
    cal("ui", { hideEventTypeDetails: false, layout: "month_view", theme: "dark" });
  }, []);

  useEffect(() => { initCal(); }, [initCal]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("contact") === "1" || location.hash === "#contact") {
      setContactOpen(true);
    }
  }, [location.hash, location.search]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-th-page text-th-heading selection:bg-ac-1 selection:text-black">
      <MouseTracker />
      <div className="noise-overlay z-10 pointer-events-none" />

      <motion.div
        className="fixed left-0 top-0 z-[100] h-0.5 w-full origin-left bg-gradient-to-r from-ac-2 via-ac-3 to-ac-1"
        style={{ scaleX: progress }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

      {/* Hero background image */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[800px] overflow-hidden md:h-[900px]">
        <img src="/hero-bg.png" alt="" className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-th-page/30 via-th-page/50 to-th-page" />
      </div>

      {/* Header */}
      <div className="relative mx-auto flex w-full max-w-[1300px] flex-col px-5 pb-10 pt-5 md:px-8 md:pt-6 z-10">
        <header className="sticky top-4 z-50 flex items-center justify-between rounded-full border border-th-line bg-th-page/60 px-5 py-2.5 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2.5">
            <SpinningLogo size={24} />
            <div className="text-sm font-bold tracking-wide text-th-heading">
              Petaron<span className="text-th-muted font-normal text-[11px] ml-1">. AI Solutions</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-th-body">
            <a href="#platform" className="hover:text-th-heading transition-colors">Platform</a>
            <a href="#process-flow" className="hover:text-th-heading transition-colors">How it Works</a>
            <Link to="/about" className="hover:text-th-heading transition-colors">About</Link>
            <Link to="/careers" className="hover:text-th-heading transition-colors">Careers</Link>
            <a href="#faq" className="hover:text-th-heading transition-colors">FAQ</a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative pb-10 pt-14 md:pb-16 md:pt-22">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="text-2xl font-serif font-normal tracking-tight text-th-heading md:text-4xl lg:text-5xl flex flex-col items-center gap-0 text-center md:gap-0.5">
              <span className="block w-full leading-[1.4] [padding-block-end:0.05em]">
                <RevealText text="Order entry has never been this easy" />
              </span>
              <motion.span
                className="bg-gradient-to-r from-ac-hero-from via-ac-hero-via to-ac-hero-to bg-clip-text text-transparent block w-full max-w-xl mx-auto font-serif italic text-xl leading-[1.12] [padding-block-end:0.1em] box-decoration-clone md:text-3xl lg:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                The moment an order arrives
                <br />
                our AI agent gets to work
              </motion.span>
            </h1>

            <motion.p
              className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-th-body md:text-base font-light"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              No more manual entry. Petaron.ai works side-by-side with your team,
              <br />
              handling order intake, allowing your team to build stronger customer relationships.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <InteractiveHoverButton
                data-cal-namespace="30min"
                data-cal-link="ron-lev-tabuchov-tgk0nx/30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
              >
                Book a Demo for Free
              </InteractiveHoverButton>
              <button
                onClick={() => setContactOpen(true)}
                className="flex items-center justify-center rounded-full border border-th-line bg-th-surface-alt/50 px-7 py-3.5 text-[13px] font-semibold text-th-heading transition hover:bg-th-line/50"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>
        </section>

        <LogoMarquee logos={integrations} speed={25} />
      </div>

      <PlatformPreviewSection />

      <ProcessFlowSection />

      <SellLine text="Every minute saved on data entry is a minute with a customer." />

      {/* CTA Section */}
      <section id="booking" className="pt-10 pb-20 relative z-10">
        <div className="mx-auto w-full max-w-[1300px] px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-serif font-normal tracking-tight text-th-heading md:text-3xl text-center whitespace-nowrap">
              Ready to&nbsp;<TypewriterWord />
            </h3>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <InteractiveHoverButton
                data-cal-namespace="30min"
                data-cal-link="ron-lev-tabuchov-tgk0nx/30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
              >
                Book a Demo for Free
              </InteractiveHoverButton>
              <button
                onClick={() => setContactOpen(true)}
                className="flex items-center justify-center rounded-full border border-th-line bg-th-surface-alt/50 px-7 py-3.5 text-[13px] font-semibold text-th-heading transition hover:bg-th-line/50"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 px-5 md:px-8">
        <div className="mx-auto h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-th-line/60 to-transparent" />
      </div>

      <FAQSection />

      <SellLine text="Your team runs the business. Let the busywork run itself." />

      {/* Footer */}
      <footer className="relative z-10 border-t border-th-line bg-th-page">
        <div className="mx-auto w-full max-w-[1300px] px-5 py-12 md:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <SpinningLogo size={20} />
                <span className="text-sm font-bold tracking-wide text-th-heading">Petaron.ai</span>
              </div>
              <p className="text-xs text-th-muted leading-relaxed max-w-xs">
                AI-powered order processing for freight forwarders. From email to TMS
              </p>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-th-body">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link to={link.href} className="text-xs text-th-muted hover:text-th-heading transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="text-xs text-th-muted hover:text-th-heading transition-colors">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-th-line pt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-[10px] text-th-faint">
              &copy; {new Date().getFullYear()} Petaron AI. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-ac-pos/50 border border-ac-pos/20 rounded-full px-2.5 py-0.5">EU-hosted</span>
              <span className="text-[10px] text-ac-1/50 border border-ac-1/20 rounded-full px-2.5 py-0.5">GDPR compliant</span>
            </div>
          </div>
        </div>
      </footer>

      <SparklesSection text="PETARON" particleCount={80} particleColor="rgb(var(--ac-1))" />

      <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Petaron;
