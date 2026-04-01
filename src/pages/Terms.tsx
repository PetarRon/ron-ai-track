import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SpinningLogo } from "@/components/petaron/shared";
import { ArrowLeft } from "lucide-react";

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

const Terms = () => (
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
        className="text-3xl font-serif font-normal tracking-tight text-th-heading md:text-4xl mb-2"
        initial="hidden" animate="visible" custom={0} variants={fadeUp}
      >
        Terms of Service
      </motion.h1>
      <motion.p
        className="text-sm text-th-muted mb-10"
        initial="hidden" animate="visible" custom={0.5} variants={fadeUp}
      >
        Last updated: March 2026
      </motion.p>

      <Section title="1. Introduction" i={1}>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of the petaron.ai
          website and any related services provided by Petaron AI (&quot;we&quot;, &quot;us&quot;,
          &quot;our&quot;).
        </p>
        <p>
          By accessing or using our website, you agree to be bound by these Terms. If you
          do not agree, please do not use the website.
        </p>
      </Section>

      <Section title="2. Description of service" i={2}>
        <p>
          Petaron.ai provides an AI-powered order processing platform for freight forwarders
          and logistics companies. The website serves as an informational and marketing resource,
          and provides access to demo booking and contact forms.
        </p>
      </Section>

      <Section title="3. Use of the website" i={3}>
        <p>You agree to use the website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Use the website in any way that violates applicable laws or regulations.</li>
          <li>Attempt to gain unauthorised access to any part of the website or its systems.</li>
          <li>Submit false, misleading, or fraudulent information through any form.</li>
          <li>Use automated tools to scrape, crawl, or extract data from the website without prior written consent.</li>
        </ul>
      </Section>

      <Section title="4. Intellectual property" i={4}>
        <p>
          All content on this website, including text, graphics, logos, design elements, and
          software, is the property of Petaron AI or its licensors and is protected by
          applicable intellectual property laws.
        </p>
        <p>
          You may not reproduce, distribute, modify, or create derivative works from any
          content without our prior written permission.
        </p>
      </Section>

      <Section title="5. Third-party services" i={5}>
        <p>
          Our website integrates with third-party services to provide certain functionality:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><strong>Cal.com</strong>: for demo scheduling. Use of the booking widget is subject to Cal.com&apos;s own terms.</li>
          <li><strong>Formspree</strong>: for form processing. Submissions are handled under Formspree&apos;s terms of service.</li>
        </ul>
        <p>
          We are not responsible for the practices or policies of third-party services.
        </p>
      </Section>

      <Section title="6. Disclaimer of warranties" i={6}>
        <p>
          The website and its content are provided &quot;as is&quot; and &quot;as available&quot;
          without warranties of any kind, either express or implied. We do not warrant that the
          website will be uninterrupted, error-free, or free of harmful components.
        </p>
      </Section>

      <Section title="7. Limitation of liability" i={7}>
        <p>
          To the fullest extent permitted by Dutch law, Petaron AI shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages arising out of or
          related to your use of the website.
        </p>
        <p>
          Our total liability for any claim arising from your use of the website shall not
          exceed the amount you have paid us (if any) in the 12 months preceding the claim.
        </p>
      </Section>

      <Section title="8. Privacy" i={8}>
        <p>
          Your use of the website is also governed by our{" "}
          <Link to="/privacy" className="text-ac-1 hover:underline">Privacy Policy</Link>,
          which describes how we collect, use, and protect your personal data.
        </p>
      </Section>

      <Section title="9. Governing law" i={9}>
        <p>
          These Terms are governed by and construed in accordance with the laws of the
          Netherlands. Any disputes arising from these Terms or your use of the website
          shall be subject to the exclusive jurisdiction of the courts in the Netherlands.
        </p>
      </Section>

      <Section title="10. Changes to these Terms" i={10}>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be posted on
          this page with an updated &quot;Last updated&quot; date. Continued use of the website
          after changes constitutes acceptance of the revised Terms.
        </p>
      </Section>

      <Section title="11. Contact" i={11}>
        <p>
          If you have questions about these Terms,{" "}
          <Link to="/?contact=1#booking" className="text-ac-1 hover:underline">
            contact us through the contact form
          </Link>.
        </p>
      </Section>

      <motion.div
        className="mt-14 border-t border-th-line pt-6 text-center"
        initial="hidden" animate="visible" custom={12} variants={fadeUp}
      >
        <p className="text-xs text-th-faint">
          &copy; {new Date().getFullYear()} Petaron AI. All rights reserved.
        </p>
      </motion.div>
    </div>
  </div>
);

export default Terms;
