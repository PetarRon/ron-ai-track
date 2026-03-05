import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "We already have a system for this — why switch?", a: "Petaron doesn't replace your TMS. It sits in front of it, turning unstructured order emails and documents into structured data that flows straight into whatever system you already use." },
  { q: "How long does setup actually take?", a: "Most customers are live within 2–3 business days. You forward your order emails to Petaron or upload a batch of documents. No IT integration is required to start." },
  { q: "What happens when the AI makes a mistake?", a: "Every order goes through human review before it's processed. Your team sees a clean summary and approves it with one click. Exceptions and low-confidence fields are flagged automatically." },
  { q: "Who can see our data, and where is it stored?", a: "All data is hosted in the EU with full GDPR compliance. Access is role-based and encrypted end-to-end. Only your authorized team members can see your data." },
  { q: "Do we need our IT team involved?", a: "Not to get started. Petaron works via email forwarding or document upload. When you're ready to connect directly to your TMS, we handle the integration." },
  { q: "What does it cost?", a: "Pricing is based on the number of orders processed. We'll share specific numbers during your demo. The ROI calculator above gives you a realistic preview of your savings." },
  { q: "Can we try it before committing?", a: "Yes. We offer a risk-free pilot: process your first 100 orders free. If we don't save you time, you pay nothing." },
];

const PetaronFAQ = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-16 md:py-24 relative px-6 md:px-12" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-card border border-border rounded-3xl p-10 md:p-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-display font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-6">
          FAQ
        </span>

        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-12">
          Common questions
        </h2>

        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-6 bg-secondary/30 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="font-display font-medium text-left hover:no-underline text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
};

export default PetaronFAQ;
