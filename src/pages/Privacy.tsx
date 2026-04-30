import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/petaron/Footer";
import { PageShell } from "@/components/petaron/PageShell";

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
        Last updated: March 2026
      </motion.p>

      <Section title="1. Who we are" i={1}>
        <p>
          Petaron AI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website
          <strong> petaron.ai</strong> and the AI-powered order processing platform described on it.
        </p>
        <p>
          For privacy-related questions, you can{" "}
          <Link to="/?contact=1#booking" className="text-ac-1 hover:underline">
            contact us through the contact form
          </Link>.
        </p>
      </Section>

      <Section title="2. What data we collect" i={2}>
        <p>We collect personal data only when you actively provide it:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><strong>Contact &amp; career forms</strong>: name, email address, optional LinkedIn/portfolio URL, and the message you write. These are submitted via Formspree (our form processor).</li>
          <li><strong>Demo booking</strong>: name, email, and any scheduling details you enter through the Cal.com booking widget embedded on our site.</li>
        </ul>
        <p>
          We do <strong>not</strong> use analytics tools, advertising trackers, or marketing pixels.
          We do not collect data about your browsing behaviour beyond what is technically
          necessary to serve the website (e.g. server logs from our hosting provider).
        </p>
      </Section>

      <Section title="3. Why we collect it (legal basis)" i={3}>
        <p>Under the GDPR (Articles 6 and 13), we process your data based on:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><strong>Consent (Art. 6(1)(a))</strong>: when you voluntarily submit a contact form, career application, or book a demo, you consent to us processing that data to handle your request.</li>
          <li><strong>Legitimate interest (Art. 6(1)(f))</strong>: specifically: (a) following up on business enquiries from potential customers, (b) improving the quality and relevance of our service based on feedback received, and (c) maintaining website security. We have assessed that these interests do not override your fundamental rights and freedoms, given the limited nature and business context of the data involved.</li>
        </ul>
      </Section>

      <Section title="4. How we use your data" i={4}>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>To respond to your contact or career enquiry.</li>
          <li>To schedule and manage demo calls.</li>
          <li>To communicate updates about Petaron.ai if you have expressed interest (you can opt out at any time).</li>
        </ul>
      </Section>

      <Section title="5. Who we share it with" i={5}>
        <p>We share personal data only with the following processors, under GDPR-compliant agreements:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><strong>Formspree, Inc.</strong>: processes form submissions on our behalf. Their privacy policy: <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-ac-1 hover:underline">formspree.io/legal/privacy-policy</a></li>
          <li><strong>Cal.com, Inc.</strong>: handles demo scheduling. Their privacy policy: <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ac-1 hover:underline">cal.com/privacy</a></li>
          <li><strong>Hosting provider</strong>: serves the website and may process standard server logs (IP address, browser type, timestamps).</li>
        </ul>
        <p>We do not sell, rent, or trade your personal data to any third party.</p>
      </Section>

      <Section title="6. International data transfers" i={6}>
        <p>
          Some of our processors are based in the United States, which means your personal
          data may be transferred outside the European Economic Area (EEA):
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>
            <strong>Formspree, Inc.</strong> (USA): transfers are covered by the{" "}
            <strong>EU-US Data Privacy Framework</strong> and Standard Contractual Clauses (SCCs).
            Formspree is SOC 2 Type II certified.
          </li>
          <li>
            <strong>Cal.com, Inc.</strong> (USA): transfers are covered by the EU-US Data
            Privacy Framework and SCCs. Cal.com also offers an EU-hosted option (cal.eu)
            which we may migrate to in the future.
          </li>
        </ul>
        <p>
          We only transfer data to countries or organisations that provide adequate safeguards
          as required by GDPR Chapter V (Articles 44-49).
        </p>
      </Section>

      <Section title="7. Cookies and similar technologies" i={7}>
        <p>
          Our website itself does not set cookies. However, the embedded Cal.com booking
          widget may set <strong>functional cookies</strong> necessary for scheduling to work.
          These are not used for tracking or advertising.
        </p>
        <p>
          We do not use any analytics cookies, social media cookies, or advertising cookies.
        </p>
      </Section>

      <Section title="8. Data retention" i={8}>
        <p>We retain personal data only as long as necessary for the purpose it was collected:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><strong>Contact form enquiries</strong>: up to 12 months after last contact, unless a business relationship is established.</li>
          <li><strong>Career applications</strong>: up to 4 weeks after the application is reviewed. With your consent, we may keep it up to 12 months for future opportunities.</li>
          <li><strong>Demo bookings</strong>: up to 12 months after the scheduled meeting.</li>
          <li><strong>Server logs</strong>: automatically deleted after 30 days by the hosting provider.</li>
        </ul>
        <p>
          If a business relationship is established, we retain relevant data for the duration
          of the relationship plus any period required by Dutch tax and commercial law (typically 7 years for financial records).
        </p>
      </Section>

      <Section title="9. Your rights (GDPR)" i={9}>
        <p>As a data subject in the EU/EEA, you have the right to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><strong>Access</strong>: request a copy of the data we hold about you.</li>
          <li><strong>Rectification</strong>: ask us to correct inaccurate data.</li>
          <li><strong>Erasure</strong>: ask us to delete your data (&quot;right to be forgotten&quot;).</li>
          <li><strong>Restriction</strong>: ask us to limit processing of your data.</li>
          <li><strong>Portability</strong>: receive your data in a structured, commonly used format.</li>
          <li><strong>Object</strong>: object to processing based on legitimate interest.</li>
          <li><strong>Withdraw consent</strong>: at any time, without affecting the lawfulness of processing before withdrawal.</li>
        </ul>
        <p>
          To exercise any of these rights,{" "}
          <Link to="/?contact=1#booking" className="text-ac-1 hover:underline">
            contact us through the contact form
          </Link>.
          We will respond within 30 days.
        </p>
      </Section>

      <Section title="10. Data security" i={10}>
        <p>
          We take appropriate technical and organisational measures to protect your personal
          data, including encrypted connections (HTTPS), access controls, and careful selection
          of processors. All data is hosted within the EU or with providers that offer
          GDPR-compliant safeguards.
        </p>
      </Section>

      <Section title="11. Complaints" i={11}>
        <p>
          If you believe your data protection rights have been violated, you have the right
          to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens)
          at <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-ac-1 hover:underline">autoriteitpersoonsgegevens.nl</a>.
        </p>
      </Section>

      <Section title="12. Changes to this policy" i={12}>
        <p>
          We may update this policy from time to time. Changes will be posted on this page
          with an updated &quot;Last updated&quot; date. We encourage you to review this page
          periodically.
        </p>
      </Section>

    </div>
    <Footer />
  </PageShell>
);

export default Privacy;
