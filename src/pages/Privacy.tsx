import { motion } from "framer-motion";
import { Footer } from "@/components/petaron/Footer";
import { PageShell } from "@/components/petaron/PageShell";
import { SEO } from "@/components/petaron/SEO";
import { routeSeo } from "@/lib/seo";
import { PrivacyBody } from "@/components/legal/PrivacyBody";
import { PRIVACY_UPDATED, type LegalLinks } from "@/components/legal/shared";

const LIVE_LINKS: LegalLinks = { contact: "/?contact=1#booking", privacy: "/privacy" };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Section = ({ title, children, i }: { title: string; children: React.ReactNode; i: number }) => (
  <motion.section initial="hidden" animate="visible" custom={i} variants={fadeUp} className="mb-10">
    <h2 className="text-lg font-serif font-normal text-th-heading mb-3">{title}</h2>
    <div className="text-sm text-th-body leading-relaxed space-y-3">{children}</div>
  </motion.section>
);

const Privacy = () => (
  <PageShell>
    <SEO route={routeSeo.privacy} />
    <div className="relative z-10 mx-auto w-full max-w-[900px] px-5 py-10 md:px-8 md:py-14">
      <motion.h1
        className="text-3xl font-serif font-normal tracking-tight text-th-heading md:text-4xl mb-2"
        initial="hidden" animate="visible" custom={0} variants={fadeUp}
      >
        Privacy Policy
      </motion.h1>
      <motion.p
        className="text-sm text-th-muted mb-10"
        initial="hidden" animate="visible" custom={0.5} variants={fadeUp}
      >
        Last updated: {PRIVACY_UPDATED}
      </motion.p>

      <PrivacyBody Section={Section} links={LIVE_LINKS} />

    </div>
    <Footer />
  </PageShell>
);

export default Privacy;
