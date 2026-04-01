import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { SpinningLogo } from "@/components/petaron/shared";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Careers = () => {
  const [state, handleSubmit] = useForm("mreyazvz");

  return (
    <div className="relative min-h-screen bg-th-page text-th-body">
      <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-5 py-10 md:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-th-muted hover:text-th-heading transition-colors mb-10">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <SpinningLogo size={28} />
          <span className="text-lg font-bold tracking-wide text-th-heading">Petaron.ai</span>
        </div>

        <motion.h1
          className="text-3xl font-serif font-normal tracking-tight text-th-heading md:text-4xl mb-4"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          Join us
        </motion.h1>

        <motion.p
          className="text-base text-th-body leading-relaxed mb-10 max-w-2xl"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
        >
          We don't have open positions at the moment, but we are always open to meeting
          talented people who share our vision.
        </motion.p>

        <div className="space-y-10">
          <motion.section initial="hidden" animate="visible" custom={2} variants={fadeUp}>
            <h2 className="text-xl font-serif font-normal text-th-heading mb-3">What we are building</h2>
            <p className="text-sm text-th-body leading-relaxed">
              Petaron.ai is eliminating manual order entry for freight forwarders. Our AI agents
              read incoming orders from email, extract the data, and prepare TMS-ready drafts
              so operators can approve in seconds instead of typing for minutes. We are building
              a product that saves time, reduces errors, and lets logistics teams focus on what
              they do best: serving their customers.
            </p>
          </motion.section>

          <motion.section initial="hidden" animate="visible" custom={3} variants={fadeUp}>
            <h2 className="text-xl font-serif font-normal text-th-heading mb-3">Who we are looking for</h2>
            <p className="text-sm text-th-body leading-relaxed mb-4">
              We value people who are curious, pragmatic, and care deeply about the quality of
              their work. If you have experience in AI, logistics, enterprise software, or product
              design and want to work on a product that makes a real difference, we would love to hear from you.
            </p>
            <ul className="space-y-2 text-sm text-th-body leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ac-1" />
                <span>Engineers who ship fast and care about the details</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ac-2" />
                <span>Domain experts who understand logistics and operations</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ac-3" />
                <span>Designers who think about the user first</span>
              </li>
            </ul>
          </motion.section>

          <motion.section initial="hidden" animate="visible" custom={4} variants={fadeUp}>
            <h2 className="text-xl font-serif font-normal text-th-heading mb-3">Open application</h2>
            <p className="text-sm text-th-body leading-relaxed mb-6">
              Tell us about yourself, what you are great at, and how you think you could contribute
              to Petaron.ai. We review every application and will get back to you if there is a fit.
            </p>

            {state.succeeded ? (
              <div className="rounded-2xl border border-th-line bg-th-elevated p-8 text-center space-y-4">
                <CheckCircle2 className="mx-auto h-14 w-14 text-ac-1" />
                <h3 className="text-2xl font-bold text-th-heading">Application received</h3>
                <p className="text-th-body">
                  Thank you for your interest. We will review your application and be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-th-line bg-th-elevated p-8">
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-th-body">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full rounded-xl border border-th-line bg-th-surface-alt/50 px-4 py-3 text-sm text-th-heading placeholder:text-th-faint focus:border-ac-1 focus:outline-none focus:ring-2 focus:ring-ac-1/20 transition"
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="mt-1 text-xs text-ac-neg"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-th-body">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-th-line bg-th-surface-alt/50 px-4 py-3 text-sm text-th-heading placeholder:text-th-faint focus:border-ac-1 focus:outline-none focus:ring-2 focus:ring-ac-1/20 transition"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="mt-1 text-xs text-ac-neg"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-th-body">
                    LinkedIn or Portfolio (optional)
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    className="w-full rounded-xl border border-th-line bg-th-surface-alt/50 px-4 py-3 text-sm text-th-heading placeholder:text-th-faint focus:border-ac-1 focus:outline-none focus:ring-2 focus:ring-ac-1/20 transition"
                  />
                  <ValidationError
                    prefix="Portfolio"
                    field="portfolio"
                    errors={state.errors}
                    className="mt-1 text-xs text-ac-neg"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-th-body">
                    How can you contribute?
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us about your skills, experience, and what excites you about Petaron.ai..."
                    className="w-full resize-none rounded-xl border border-th-line bg-th-surface-alt/50 px-4 py-3 text-sm text-th-heading placeholder:text-th-faint focus:border-ac-1 focus:outline-none focus:ring-2 focus:ring-ac-1/20 transition"
                  />
                  <ValidationError
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
                  {state.submitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </motion.section>
        </div>

        <motion.div
          className="mt-14 border-t border-th-line pt-6 text-center"
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeUp}
        >
          <p className="text-xs text-th-faint">
            &copy; {new Date().getFullYear()} Petaron AI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
