import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Server, Lock, Users, FileText, Eye } from "lucide-react";

const trustItems = [
  { icon: Server, title: "EU-hosted", description: "All data stays in Europe. Full GDPR compliance." },
  { icon: Lock, title: "Encrypted", description: "End-to-end encryption at rest and in transit." },
  { icon: Users, title: "Role-based access", description: "Fine-grained permissions for every team member." },
  { icon: FileText, title: "Audit trail", description: "Complete history of every order and action." },
  { icon: Eye, title: "Human review", description: "Every order is checked by your team before it's processed." },
  { icon: Shield, title: "ISO 27001", description: "Certification in progress. Security by design." },
];

const TrustSecurity = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trust" className="py-16 md:py-24 relative px-6 md:px-12" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-card border border-border rounded-3xl p-10 md:p-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-display font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-6">
          Trust & Security
        </span>

        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-12">
          Built for enterprise logistics
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-border bg-secondary/50 p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TrustSecurity;
