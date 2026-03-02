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

const integrations = ["CargoWise", "SAP", "Scope", "Descartes", "Any TMS with an API"];

const TrustSecurity = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Trust & Security
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Built for enterprise logistics
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integrations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground font-display uppercase tracking-[0.2em] mb-6">
            Connects to your systems
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {integrations.map((name) => (
              <span
                key={name}
                className="text-muted-foreground/60 font-display font-semibold text-sm border border-border px-4 py-2 rounded-lg"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSecurity;
