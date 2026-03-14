import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const ORDER_CHANNELS = [
  { id: "email", label: "Email", sub: "Manual processing" },
  { id: "edi", label: "EDI", sub: "Electronic data interchange" },
  { id: "portal", label: "Portal / web form", sub: "Customer self-service" },
  { id: "phone", label: "Phone / WhatsApp", sub: "Direct contact" },
];

const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [state, handleFormspreeSubmit] = useForm("mreyazvz");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    volume: "",
    other_channel: "",
  });
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const syntheticEvent = {
      ...e,
      target: Object.assign(e.target, {
        order_channels: { value: selectedChannels.join(", ") },
      }),
    } as React.FormEvent<HTMLFormElement>;
    handleFormspreeSubmit(syntheticEvent);
  };

  if (state.succeeded) {
    return (
      <section id="book-demo" className="py-24 md:py-32 relative" ref={ref}>
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-50" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
            <h3 className="text-2xl font-display font-bold">Request received!</h3>
            <p className="text-muted-foreground">
              We'll be in touch within 24 hours to schedule your demo.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book-demo" className="py-24 md:py-32 relative" ref={ref}>
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
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot — hidden from real users, bots fill it in */}
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-display font-medium text-muted-foreground mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-display placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Your name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-red-400 mt-1" />
              </div>
              <div>
                <label className="text-sm font-display font-medium text-muted-foreground mb-2 block">
                  Work email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-display placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="you@company.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-400 mt-1" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-display font-medium text-muted-foreground mb-2 block">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
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
                  name="volume"
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

            {/* Order intake channels */}
            <div>
              <label className="text-sm font-display font-medium text-muted-foreground mb-3 block">
                How do you currently receive orders?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ORDER_CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => toggleChannel(ch.id)}
                    className={`text-left px-4 py-3 rounded-lg border transition-all ${
                      selectedChannels.includes(ch.id)
                        ? "border-primary/70 bg-primary/10 text-foreground"
                        : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <span className="text-sm font-display font-medium block">{ch.label}</span>
                    <span className="text-xs opacity-60">{ch.sub}</span>
                  </button>
                ))}
              </div>
              {/* Hidden input to pass selected channels to Formspree */}
              <input type="hidden" name="order_channels" value={selectedChannels.join(", ")} />
              <input
                type="text"
                name="other_channel"
                value={formData.other_channel}
                onChange={(e) => setFormData({ ...formData, other_channel: e.target.value })}
                placeholder="Other — describe your order intake…"
                className="mt-3 w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-display text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-display font-semibold text-lg transition-all hover:shadow-[0_0_30px_hsl(175_85%_45%/0.3)] hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending…" : "Book Your Free Demo"}
              {!state.submitting && <ArrowRight className="w-5 h-5" />}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              No commitment. 15-minute call. We'll show you Petaron with your actual data.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
