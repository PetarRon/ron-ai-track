import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    volume: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to CRM
    setSubmitted(true);
  };

  return (
    <section id="book-demo" className="py-24 md:py-32 relative" ref={ref}>
      {/* Glow backdrop */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            Process your first 100 orders free.{" "}
            <span className="text-primary text-glow">
              If we don't save you time, you pay nothing.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12"
        >
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-2xl font-display font-bold">Thank you!</h3>
              <p className="text-muted-foreground">
                We'll be in touch within 24 hours to schedule your demo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-display font-medium text-muted-foreground mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-display placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-display font-medium text-muted-foreground mb-2 block">
                    Work email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-display placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-display font-medium text-muted-foreground mb-2 block">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-display placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="text-sm font-display font-medium text-muted-foreground mb-2 block">
                    Daily order volume
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-display focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option value="">Select range</option>
                    <option value="20-50">20–50 orders</option>
                    <option value="50-150">50–150 orders</option>
                    <option value="150-300">150–300 orders</option>
                    <option value="300+">300+ orders</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-display font-semibold text-lg transition-all hover:shadow-[0_0_30px_hsl(175_85%_45%/0.3)] hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                Book Your Free Demo
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-muted-foreground text-center">
                No commitment. 15-minute call. We'll show you Petaron with your actual data.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
