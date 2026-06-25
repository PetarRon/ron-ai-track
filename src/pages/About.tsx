import { motion } from "framer-motion";
import { Footer } from "@/components/petaron/Footer";
import { PageShell } from "@/components/petaron/PageShell";
import { SEO } from "@/components/petaron/SEO";
import { routeSeo } from "@/lib/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3 fill-current">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const About = () => (
  <PageShell>
    <SEO route={routeSeo.about} />
    <article className="relative z-10 mx-auto w-full max-w-3xl px-5 py-10 md:px-8 md:py-16">
      <motion.h1
        className="text-3xl font-serif font-normal tracking-tight text-th-heading md:text-4xl mb-6"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
      >
        About us
      </motion.h1>

      {/* Floated photo — text wraps around it, then continues below */}
      <motion.figure
        className="mb-6 w-full sm:float-right sm:mb-4 sm:ml-7 sm:w-80"
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
      >
        <div className="overflow-hidden rounded-2xl border border-th-line bg-th-surface shadow-sm">
          <img
            src="/founders.png"
            alt="The Petaron.ai founders, Ron Lev Tabuchov and Petar Paskalev"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <figcaption className="mt-3 flex flex-col items-center gap-2 text-center">
          <span className="text-xs text-th-muted">The Petaron.ai founders</span>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
            <a
              href="https://www.linkedin.com/in/ron-lev-t-a3820528a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-th-heading transition-colors hover:text-ac-1"
            >
              <LinkedInIcon />
              Ron Lev Tabuchov
            </a>
            <a
              href="https://www.linkedin.com/in/petar-paskalev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-th-heading transition-colors hover:text-ac-1"
            >
              <LinkedInIcon />
              Petar Paskalev
            </a>
          </div>
        </figcaption>
      </motion.figure>

      {/* Flowing article body — wraps beside the photo, continues full width below */}
      <motion.p
        className="text-base text-th-body leading-relaxed"
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
      >
        Petaron.ai is building the future of order intake for the logistics industry.
        We combine deep domain knowledge with modern AI to eliminate manual data entry
        and help teams focus on what truly matters: their customers.
      </motion.p>

      <div className="mt-7 space-y-7 text-th-body">
        <motion.section initial="hidden" animate="visible" custom={3} variants={fadeUp}>
          <h2 className="text-xl font-serif font-normal text-th-heading mb-3">Where we come from</h2>
          <p className="text-sm leading-relaxed">
            Based in the Netherlands, Petaron.ai is being built by motivated young innovative
            professionals. Our backgrounds span freight forwarding, enterprise software,
            and machine learning, giving us a unique perspective on the challenges that
            logistics companies face every day.
          </p>
        </motion.section>

        <motion.section initial="hidden" animate="visible" custom={4} variants={fadeUp}>
          <h2 className="text-xl font-serif font-normal text-th-heading mb-3">What drives us</h2>
          <p className="text-sm leading-relaxed">
            We believe technology should remove friction, not add complexity. The logistics
            industry moves the world, yet too many teams still spend hours on manual order
            entry. Petaron.ai exists to change that. Our AI agents read, understand, and
            prepare orders so your operators can approve in seconds instead of typing for minutes.
          </p>
        </motion.section>

        <motion.section initial="hidden" animate="visible" custom={5} variants={fadeUp}>
          <h2 className="text-xl font-serif font-normal text-th-heading mb-3">The team</h2>
          <p className="text-sm leading-relaxed">
            We are a small, fast-moving team based in the Netherlands with roots across
            Europe and beyond. We speak multiple languages, understand multiple markets,
            and share one mission: making logistics operations smarter and faster.
            <span className="text-th-muted italic"> More details coming soon.</span>
          </p>
        </motion.section>

        <motion.section initial="hidden" animate="visible" custom={6} variants={fadeUp}>
          <h2 className="text-xl font-serif font-normal text-th-heading mb-3">Our values</h2>
          <ul className="space-y-3 text-sm leading-relaxed">
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ac-1" />
              <span><strong className="text-th-heading">Reliability first.</strong> Logistics runs on trust. Our platform is built for accuracy and uptime.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ac-2" />
              <span><strong className="text-th-heading">Human-in-the-loop.</strong> AI handles the heavy lifting; people make the final call.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ac-3" />
              <span><strong className="text-th-heading">Privacy by design.</strong> EU-hosted, GDPR-compliant, and built with security at the core.</span>
            </li>
          </ul>
        </motion.section>

        <motion.section initial="hidden" animate="visible" custom={7} variants={fadeUp}>
          <h2 className="text-xl font-serif font-normal text-th-heading mb-3">Where the name comes from</h2>
          <p className="text-sm leading-relaxed">
            <strong className="text-th-heading">Petaron</strong> is the two of us in one word:
            a blend of <strong className="text-th-heading">Petar</strong> and{" "}
            <strong className="text-th-heading">Ron</strong>, the founders behind it.
            And by happy coincidence, <span className="italic">petaron</span> (פתרון) is also the
            Hebrew word for <strong className="text-th-heading">“solution.”</strong> A name that
            captures exactly what we set out to build.
          </p>
        </motion.section>
      </div>
    </article>
    <Footer />
  </PageShell>
);

export default About;
