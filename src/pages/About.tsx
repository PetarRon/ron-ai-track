import { motion } from "framer-motion";
import { Footer } from "@/components/petaron/Footer";
import { PageShell } from "@/components/petaron/PageShell";
import { SEO } from "@/components/petaron/SEO";
import { routeSeo } from "@/lib/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const About = () => (
  <PageShell>
    <SEO route={routeSeo.about} />
    <div className="relative z-10 mx-auto w-full max-w-[900px] px-5 py-10 md:px-8 md:py-14">
      <motion.h1
        className="text-3xl font-serif font-normal tracking-tight text-th-heading md:text-4xl mb-4"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
      >
        About us
      </motion.h1>

      <motion.p
        className="text-base text-th-body leading-relaxed mb-10 max-w-2xl"
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
      >
        Petaron.ai is building the future of order intake for the logistics industry.
        We combine deep domain knowledge with modern AI to eliminate manual data entry
        and help teams focus on what truly matters: their customers.
      </motion.p>

      <div className="space-y-10">
        <motion.section initial="hidden" animate="visible" custom={2} variants={fadeUp}>
          <h2 className="text-xl font-serif font-normal text-th-heading mb-3">Where we come from</h2>
          <p className="text-sm text-th-body leading-relaxed">
            Based in the Netherlands, Petaron.ai is being built by motivated young innovative
            professionals. Our backgrounds span freight forwarding, enterprise software,
            and machine learning, giving us
            a unique perspective on the challenges that logistics companies face every day.
          </p>
        </motion.section>

        <motion.section initial="hidden" animate="visible" custom={3} variants={fadeUp}>
          <h2 className="text-xl font-serif font-normal text-th-heading mb-3">What drives us</h2>
          <p className="text-sm text-th-body leading-relaxed">
            We believe technology should remove friction, not add complexity. The logistics
            industry moves the world, yet too many teams still spend hours on manual order
            entry. Petaron.ai exists to change that. Our AI agents read, understand, and
            prepare orders so your operators can approve in seconds instead of typing for minutes.
          </p>
        </motion.section>

        <motion.section initial="hidden" animate="visible" custom={4} variants={fadeUp}>
          <h2 className="text-xl font-serif font-normal text-th-heading mb-3">Our values</h2>
          <ul className="space-y-3 text-sm text-th-body leading-relaxed">
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

        <motion.section initial="hidden" animate="visible" custom={5} variants={fadeUp}>
          <h2 className="text-xl font-serif font-normal text-th-heading mb-3">The team</h2>
          <p className="text-sm text-th-body leading-relaxed">
            We are a small, fast-moving team based in the Netherlands with roots across
            Europe and beyond. We speak multiple languages, understand multiple markets,
            and share one mission: making logistics operations smarter and faster.
          </p>
          <p className="text-sm text-th-muted mt-3 italic">
            More details coming soon.
          </p>
        </motion.section>
      </div>
    </div>
    <Footer />
  </PageShell>
);

export default About;
