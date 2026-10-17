import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle2 } from "lucide-react";
import { RelayShell } from "@/components/relay/RelayShell";
import { RelayNav } from "@/components/relay/RelayHero";
import { RelayFooter } from "@/components/relay/RelayFooter";
import { FlowRibbon } from "@/components/relay/RelayFlow";
import { Card, Em, RELAY_SHELL, buttonVariants, settle } from "@/components/relay/shared";
import { routeSeo } from "@/lib/seo";

/**
 * Careers, at /careers: the team, who we look for, and the open application,
 * sent to Formspree.
 */

const FIELD =
  "w-full rounded-xl border border-th-line bg-white/70 px-4 py-3 font-body text-[15px] text-th-heading placeholder:text-th-faint transition focus:border-ac-3 focus:outline-none focus:ring-2 focus:ring-ac-1/40";
const LABEL = "mb-1.5 block font-body text-[13px] font-medium text-th-heading";

const LOOKING_FOR = [
  "Engineers who ship fast and care about the details",
  "Domain experts who understand logistics and operations",
  "Designers who think about the user first",
];

const RelayCareers = () => {
  const [state, handleSubmit] = useForm("mreyazvz");

  return (
    <RelayShell seo={{ route: routeSeo.careers }} light>
      <FlowRibbon />
      <RelayNav />
      <article className={`relative pb-14 md:pb-24 ${RELAY_SHELL}`}>
        <header data-flow-head className="mx-auto max-w-3xl pb-8 pt-8 text-center md:pb-14 md:pt-20">
          <motion.h1
            {...settle()}
            className="font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] text-th-heading sm:text-[56px]"
          >
            Join <Em>us.</Em>
          </motion.h1>
          <motion.p {...settle(0.1)} className="mx-auto mt-6 max-w-xl text-balance font-body text-[17px] leading-relaxed text-th-body">
            We&apos;re a small team in the Netherlands building the future of order intake for the logistics industry.
            The application below stays open year-round; when we hire, recent applicants are the first people we reach
            out to.
          </motion.p>
        </header>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 md:gap-5">
          <motion.div {...settle(0.05)}>
            <Card className="h-full p-5 md:p-8">
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-th-heading">What we are building</h2>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-th-body">
                Petaron.ai is eliminating manual order entry for freight forwarders. Our AI agents read incoming orders
                from email, extract the data, and prepare TMS-ready drafts so operators can approve in seconds instead of
                typing for minutes. We are building a product that saves time, reduces errors, and lets logistics teams
                focus on what they do best: serving their customers.
              </p>
            </Card>
          </motion.div>
          <motion.div {...settle(0.15)}>
            <Card className="h-full p-5 md:p-8">
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-th-heading">Who we are looking for</h2>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-th-body">
                We value people who are curious, pragmatic, and care deeply about the quality of their work. If you have
                experience in AI, logistics, enterprise software, or product design and want to work on a product that
                makes a real difference, we would love to hear from you.
              </p>
              <ul className="mt-4 space-y-2.5">
                {LOOKING_FOR.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-[15px] leading-relaxed text-th-body">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ac-1" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        <motion.div {...settle(0.1)} id="apply" className="mx-auto mt-4 max-w-5xl scroll-mt-24 md:mt-5">
          <Card className="grid gap-6 p-5 md:gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12 md:p-10">
            <div>
              <h2 className="font-display text-[26px] font-semibold tracking-[-0.03em] text-th-heading">
                Open <Em>application</Em>
              </h2>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-th-body">
                No formal openings right now, but we read every application that comes in. Tell us about yourself, what
                you are great at, and how you think you could contribute to Petaron.ai. We will get in touch when
                there&apos;s a fit.
              </p>
            </div>

            {state.succeeded ? (
              <div className="grid place-items-center gap-3 rounded-2xl border border-th-line/70 bg-white/60 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-ac-1" aria-hidden="true" />
                <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-th-heading">Application received</h3>
                <p className="font-body text-[15px] text-th-body">
                  Thank you for your interest. We will review your application and be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                <div>
                  <label htmlFor="relay-careers-name" className={LABEL}>
                    Full name
                  </label>
                  <input id="relay-careers-name" type="text" name="name" required aria-describedby="relay-careers-name-error" className={FIELD} />
                  <ValidationError id="relay-careers-name-error" prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-ac-neg" />
                </div>
                <div>
                  <label htmlFor="relay-careers-email" className={LABEL}>
                    Email
                  </label>
                  <input id="relay-careers-email" type="email" name="email" required aria-describedby="relay-careers-email-error" className={FIELD} />
                  <ValidationError id="relay-careers-email-error" prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-ac-neg" />
                </div>
                <div>
                  <label htmlFor="relay-careers-portfolio" className={LABEL}>
                    LinkedIn or portfolio <span className="font-normal text-th-muted">(optional)</span>
                  </label>
                  <input id="relay-careers-portfolio" type="url" name="portfolio" aria-describedby="relay-careers-portfolio-error" className={FIELD} />
                  <ValidationError id="relay-careers-portfolio-error" prefix="Portfolio" field="portfolio" errors={state.errors} className="mt-1 text-xs text-ac-neg" />
                </div>
                <div>
                  <label htmlFor="relay-careers-message" className={LABEL}>
                    How can you contribute?
                  </label>
                  <textarea
                    id="relay-careers-message"
                    name="message"
                    required
                    rows={6}
                    aria-describedby="relay-careers-message-error"
                    placeholder="Tell us about your skills, experience, and what excites you about Petaron.ai..."
                    className={`${FIELD} resize-none`}
                  />
                  <ValidationError id="relay-careers-message-error" prefix="Message" field="message" errors={state.errors} className="mt-1 text-xs text-ac-neg" />
                </div>
                <button type="submit" disabled={state.submitting} className={`${buttonVariants.lime} w-full disabled:opacity-50`}>
                  {state.submitting ? "Sending..." : "Send application"}
                </button>
              </form>
            )}
          </Card>
        </motion.div>
      </article>
      <RelayFooter />
    </RelayShell>
  );
};

export default RelayCareers;
