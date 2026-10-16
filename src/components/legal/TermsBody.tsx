import { Link } from "react-router-dom";
import type { LegalLinks, LegalSection } from "./shared";

/** The terms of service's sections; /terms draws them with its own Section and links. */
export const TermsBody = ({ Section, links }: { Section: LegalSection; links: LegalLinks }) => (
  <>
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
        <Link to={links.privacy} className="text-ac-1 hover:underline">Privacy Policy</Link>,
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
        <Link to={links.contact} className="text-ac-1 hover:underline">
          contact us through the contact form
        </Link>.
      </p>
    </Section>
  </>
);
