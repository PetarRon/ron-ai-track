import { motion, useScroll, useSpring, animate } from "framer-motion";
import { ArrowRight, MoveRight, Send, Link, ScanText, CheckCircle2, FileText, Search, Check, FileCheck, Mail, BrainCircuit, FileJson, UserCheck, Database, Network } from "lucide-react";
import { FormEvent, Fragment, useEffect, useMemo, useRef, useState } from "react";

const integrations = [
  { name: "CargoWise", domain: "cargowise.com" },
  { name: "SAP", domain: "sap.com" },
  { name: "Descartes", domain: "descartes.com" },
  { name: "Scope", domain: "riege.com" },
  { name: "Modality", domain: "modality.com" }
];

const aiStack = [
  { name: "LangChain", domain: "langchain.com" },
  { name: "OpenAI", domain: "openai.com" },
  { name: "Claude", domain: "anthropic.com" },
  { name: "Mistral", domain: "mistral.ai" },
  { name: "Pydantic", domain: "pydantic.dev" },
  { name: "n8n", domain: "n8n.io" },
];

const infraStack = [
  { name: "AWS", domain: "aws.amazon.com" },
  { name: "Docker", domain: "docker.com" },
  { name: "Redis", domain: "redis.io" },
  { name: "PostgreSQL", domain: "postgresql.org" },
  { name: "React", domain: "react.dev" },
  { name: "TypeScript", domain: "typescriptlang.org" },
];
const faqQuestions = [
  "We already have a system for this. Why switch?",
  "How long does setup actually take?",
  "What happens when the AI makes a mistake?",
  "Who can see our data, and where is it stored?",
  "Do we need our IT team involved?",
  "What does it cost?",
  "Can we try it before committing?",
];

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-px ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(167, 139, 250, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full w-full rounded-2xl bg-[#06070c] p-6">
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(167, 139, 250, 0.05), transparent 40%)`,
          }}
        />
        {children}
      </div>
    </motion.div>
  );
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    
    const current = Number(node.textContent?.replace(/,/g, "")) || 0;
    const controls = animate(current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString();
      },
    });
    return controls.stop;
  }, [value]);
  
  return <span ref={ref}>{value.toLocaleString()}</span>;
};

const Petaron = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  const [ordersPerDay, setOrdersPerDay] = useState(150);
  const [minutesPerOrder, setMinutesPerOrder] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [volume, setVolume] = useState("Select range");
  const [intake, setIntake] = useState<string[]>(["Email"]);

  const toggleIntake = (option: string) => {
    setIntake((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const [notes, setNotes] = useState("");

  const monthlyCost = useMemo(() => {
    const workDays = 22;
    return Math.round((ordersPerDay * minutesPerOrder * hourlyCost * workDays) / 60);
  }, [hourlyCost, minutesPerOrder, ordersPerDay]);

  const yearlyCost = monthlyCost * 12;
  const monthlyHours = Math.round((ordersPerDay * minutesPerOrder * 22) / 60);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Book Your Free Demo - PetaRon");
    const body = encodeURIComponent(
      [
        `Name: ${name || "-"}`,
        `Work email: ${email || "-"}`,
        `Company: ${company || "-"}`,
        `Daily order volume: ${volume || "-"}`,
        `Order intake channel: ${intake.length > 0 ? intake.join(", ") : "-"}`,
        `Other intake details: ${notes || "-"}`,
      ].join("\n")
    );
    return `mailto:hello@petaron.ai?subject=${subject}&body=${body}`;
  }, [company, email, intake, name, notes, volume]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailtoHref;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06070c] text-white">
      <div className="noise-overlay" />
      <motion.div
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300"
        style={{ scaleX: progress }}
      />

      <div className="pointer-events-none absolute inset-0 animated-grid opacity-70" />
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="hero-blob left-[8%] top-[8%] h-72 w-72 bg-fuchsia-500/38"
          animate={{ x: [0, 42, -20, 0], y: [0, -28, 20, 0], scale: [1, 1.1, 0.96, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-blob right-[12%] top-[20%] h-96 w-96 bg-cyan-400/32"
          animate={{ x: [0, -36, 18, 0], y: [0, 24, -24, 0], scale: [1, 0.95, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-20 pt-8 md:px-10 md:pt-12">
        <header className="glass-panel sticky top-4 z-20 flex items-center justify-between px-5 py-3">
          <div className="text-sm font-semibold tracking-[0.18em] text-white/90">
            PETARON.AI
          </div>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#070814] transition hover:scale-105"
          >
            Contact us
            <ArrowRight size={14} />
          </a>
        </header>

        <section className="pb-16 pt-16 md:pb-20 md:pt-24 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/85 backdrop-blur-xl">
                AI-POWERED ORDER PROCESSING
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
                Transport orders processed
                <br />
                <span className="shimmer-text">in 30 seconds</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                PetaRon connects to your order pipeline, reads every incoming order,
                and pushes structured data directly into your TMS. Your team approves,
                not types.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  ["Order Processing", "#how-it-works"],
                  ["Results", "#results"],
                  ["Security", "#trust-security"],
                  ["ROI", "#roi"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="rounded-full border border-white/30 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/12"
                  >
                    {label} ↘
                  </a>
                ))}
              </div>
            </div>

            <div className="relative hidden md:block h-[400px] perspective-1000">
              {/* Document Visual */}
              <motion.div
                className="absolute right-12 top-10 w-64 rounded-xl border border-white/10 bg-[#0d101b]/80 p-4 shadow-2xl backdrop-blur-md overflow-hidden"
                animate={{ y: [0, -15, 0], rotateY: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <div className="ml-2 text-[10px] text-white/40">order_FW203.pdf</div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-white/10" />
                  <div className="h-2 w-5/6 rounded bg-white/10" />
                  <div className="h-2 w-4/6 rounded bg-white/10" />
                  <div className="my-4 h-px w-full bg-white/5" />
                  <div className="flex gap-2">
                    <div className="h-10 w-10 rounded bg-white/5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-full rounded bg-white/10" />
                      <div className="h-2 w-2/3 rounded bg-white/10" />
                    </div>
                  </div>
                </div>
                {/* Scanning line effect */}
                <motion.div
                  className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent blur-[2px]"
                  animate={{ top: ["0%", "80%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              {/* JSON/Data Output Visual */}
              <motion.div
                className="absolute left-6 top-36 w-64 rounded-xl border border-cyan-500/30 bg-[#060814]/90 p-5 shadow-2xl backdrop-blur-xl"
                animate={{ y: [0, 10, 0], rotateY: [0, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="mb-2 text-[10px] font-mono text-cyan-400">PETARON EXTRACTED JSON</div>
                <div className="font-mono text-[11px] leading-relaxed text-white/70">
                  <span className="text-fuchsia-300">"shipper"</span>: <span className="text-green-300">"Acme Corp"</span>,<br/>
                  <span className="text-fuchsia-300">"origin"</span>: <span className="text-green-300">"Rotterdam"</span>,<br/>
                  <span className="text-fuchsia-300">"destination"</span>: <span className="text-green-300">"Hamburg"</span>,<br/>
                  <span className="text-fuchsia-300">"weight_kg"</span>: <span className="text-yellow-300">24500</span>,<br/>
                  <span className="text-fuchsia-300">"hazardous"</span>: <span className="text-blue-300">false</span>,<br/>
                  <span className="text-fuchsia-300">"reference"</span>: <span className="text-green-300">"FW-203-A"</span>
                </div>
              </motion.div>

              {/* Connecting line */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: -1 }}>
                <motion.path
                  d="M 120 180 C 180 180 200 120 280 120"
                  fill="transparent"
                  stroke="rgba(34, 211, 238, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>
          </div>
        </section>

        <section className="pb-12">
          <p className="text-sm text-white/60">Integrates with your existing systems</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 md:grid-cols-5">
            {integrations.map((item) => (
              <div
                key={item.name}
                className="logo-pill justify-center border-white/15 bg-white/[0.06] py-4 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img 
                  src={`https://logo.clearbit.com/${item.domain}`} 
                  alt={item.name} 
                  className="h-6 object-contain brightness-0 invert opacity-70 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300" 
                  onError={(e) => {
                    // Fallback to text if logo fails to load
                    e.currentTarget.style.display = 'none';
                    const span = document.createElement('span');
                    span.innerText = item.name;
                    span.className = "text-white/70 font-semibold";
                    e.currentTarget.parentElement?.appendChild(span);
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SpotlightCard className="p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">The Problem</p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/78 md:text-base">
              <p>
                Every morning, the same mountain of order emails lands in your inbox.
                PDFs, Excel sheets, free-text emails. Every client sends orders in
                their own format. Your team opens each one, reads it, and types the
                details into your TMS. 5 to 15 minutes per order. Every single time.
              </p>
              <p>
                One mistyped postcode. One wrong weight unit. One missed reference.
                In logistics, a single error means a rebooked shipment, a missed SLA,
                and an angry client.
              </p>
              <p>
                And then there is the impossible math of growth: every new client
                means more orders, which means more staff doing the same repetitive
                work. Your best people spend their days copying data instead of
                managing relationships. The cost? €3 per order in labor alone.
                Before the mistakes.
              </p>
              <p className="text-white">
                Your best people deserve better than copy-paste. PetaRon gives your
                team back the time to build client relationships and grow the
                business, not fix typos.
              </p>
            </div>
          </SpotlightCard>
        </section>

        <section id="how-it-works" className="pb-16 pt-16 md:pb-20 md:pt-20">
          <p className="text-xs uppercase tracking-[0.18em] text-white/55">How It Works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Three steps. No complexity.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              [
                "Connect",
                "We connect PetaRon's agentic pipeline to your incoming order channels. Email forwarding, document upload, or direct API. No IT team needed on your side.",
                Link,
                "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20"
              ],
              [
                "Read & Capture",
                "Our AI reads every format. No configuration, no setup, no maintenance. It understands the meaning of what is written, not just the layout.",
                ScanText,
                "text-violet-400 bg-violet-400/10 border-violet-400/20"
              ],
              [
                "Review & Confirm",
                "Your team sees a clean, structured summary ready to approve. One click, and it flows into your system. Exceptions get flagged automatically.",
                CheckCircle2,
                "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
              ],
            ].map(([title, description, Icon, colorClass], index) => (
              <SpotlightCard key={title as string} className="h-full">
                <motion.div
                  className="p-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className={`mb-4 inline-flex rounded-xl border p-2 ${colorClass as string}`}>
                    {/* @ts-ignore */}
                    <Icon size={20} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">{title as string}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/78">{description as string}</p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
          <p className="mt-5 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-100">
            Human-in-the-loop
          </p>

          <div className="mt-16 relative">
            <div className="text-center mb-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/40 bg-fuchsia-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-fuchsia-100">
                <Network size={14} />
                Agentic Pipeline
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                How data flows through PetaRon.
              </h3>
            </div>

            <motion.div
              className="rounded-2xl border border-white/15 bg-[#0b0e1a]/80 shadow-2xl backdrop-blur-xl overflow-hidden max-w-5xl mx-auto p-8 md:p-12 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-x-6 relative z-10">
                {[
                  { label: "Order Received", icon: Mail, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
                  { label: "Classified", icon: BrainCircuit, color: "text-fuchsia-400", bg: "bg-fuchsia-400/10", border: "border-fuchsia-400/20" },
                  { label: "Processing", icon: ScanText, color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20" },
                  { label: "To Review", icon: UserCheck, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
                  { label: "Complete", icon: Database, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
                ].map((step, index, arr) => (
                  <Fragment key={step.label}>
                    <div className="flex flex-col items-center group">
                      <motion.div 
                        className={`h-16 w-16 rounded-2xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${step.bg} ${step.border} ${step.color}`}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                      >
                        {/* @ts-ignore */}
                        <step.icon size={28} />
                      </motion.div>
                      
                      <motion.p 
                        className="text-sm font-medium text-white/80 whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.4 }}
                      >
                        {step.label}
                      </motion.p>
                    </div>
                    {index < arr.length - 1 && (
                      <div className="hidden md:flex shrink-0 w-14 h-16 items-center justify-center">
                        <div className="relative w-full h-px bg-white/10 overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                    {index < arr.length - 1 && (
                      <div className="md:hidden flex shrink-0 w-16 h-8 items-center justify-center">
                        <div className="relative w-px h-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 h-8 w-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="roi" className="pb-16 md:pb-20">
          <div className="glass-panel grid gap-7 p-7 md:grid-cols-2 md:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">ROI Calculator</p>
              <h3 className="mt-2 text-2xl font-semibold">See your savings in real time</h3>
              <div className="mt-8 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs uppercase tracking-wider text-white/55">Orders per day</span>
                    <span className="font-semibold text-white">{ordersPerDay}</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={400}
                    step={10}
                    value={ordersPerDay}
                    onChange={(event) => setOrdersPerDay(Number(event.target.value))}
                    className="w-full accent-cyan-300"
                  />
                </div>
                
                <div>
                  <div className="mb-3">
                    <span className="text-xs uppercase tracking-wider text-white/55">Minutes per order today</span>
                  </div>
                  <div className="flex gap-2">
                    {[5, 10, 15, 20].map((val) => (
                      <button
                        key={val}
                        onClick={() => setMinutesPerOrder(val)}
                        className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                          minutesPerOrder === val
                            ? "bg-cyan-400 text-[#05060d] shadow-lg shadow-cyan-400/20"
                            : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {val} min
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <span className="text-xs uppercase tracking-wider text-white/55">Staff hourly cost</span>
                  </div>
                  <div className="flex gap-2">
                    {[25, 35, 50].map((val) => (
                      <button
                        key={val}
                        onClick={() => setHourlyCost(val)}
                        className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                          hourlyCost === val
                            ? "bg-cyan-400 text-[#05060d] shadow-lg shadow-cyan-400/20"
                            : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        €{val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/15 bg-[#0b0e1a]/90 p-6">
              <p className="text-sm text-white/65">What you spend today per month</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight flex items-center">
                €<AnimatedNumber value={monthlyCost} />
              </p>
              <p className="mt-6 text-sm text-white/65">Per year on manual entry</p>
              <p className="mt-1 text-3xl font-semibold flex items-center">
                €<AnimatedNumber value={yearlyCost} />
              </p>
              <p className="mt-6 text-sm text-white/65">Staff hours spent on data entry</p>
              <p className="mt-1 text-3xl font-semibold text-cyan-200 flex items-center gap-2">
                <AnimatedNumber value={monthlyHours} /> hrs/month
              </p>
              <p className="mt-6 text-sm text-white/72">
                Most customers reduce this cost by over 80%. Pricing is based on your volume.
              </p>
              <a
                href="#contact-form"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#070814]"
              >
                Book a 15-minute demo
                <MoveRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section id="results" className="pb-16 md:pb-20">
          <div className="glass-panel p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">Results</p>
            <h3 className="mt-2 text-2xl font-semibold">Proven in production</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {[
                ["1,000+", "Orders processed in latest pilot"],
                ["47", "Different shipper formats handled"],
                ["96.3%", "First-pass accuracy"],
                ["40s", "Average review time per order"],
              ].map(([num, label], i) => (
                <SpotlightCard key={num}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    whileInView={{ opacity: 1, scale: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <p className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">{num}</p>
                    <p className="mt-2 text-sm text-white/70">{label}</p>
                  </motion.div>
                </SpotlightCard>
              ))}
            </div>
            <blockquote className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm leading-relaxed text-white/80">
              "We went from 12 minutes per order to approving PetaRon's summary in 40
              seconds. The team now spends their time on client relationships instead
              of data entry."
              <footer className="mt-3 text-xs uppercase tracking-[0.18em] text-white/55">
                MH • Operations Manager • European 3PL, 200+ orders/day
              </footer>
            </blockquote>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="glass-panel p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">Why Switch</p>
            <h3 className="mt-2 text-2xl font-semibold">Intelligence vs. rigidity</h3>
            <p className="mt-3 text-sm text-white/70">
              Old tools break when a client changes their document layout. PetaRon
              reads meaning, not fixed positions, like your best operator would.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/15">
              <div className="grid grid-cols-3 bg-white/8 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white/70">
                <span>Category</span>
                <span>Traditional</span>
                <span>PetaRon</span>
              </div>
              {[
                ["New client format", "Hours of configuration", "Works immediately"],
                ["Maintenance", "Constant updates needed", "Zero maintenance"],
                ["Accuracy", "Degrades as formats change", "Consistent across all formats"],
                ["Getting started", "Weeks of setup", "Demo in 2 days, POC in 5"],
                ["Human oversight", "Manual checking of every field", "Structured review, one-click approve"],
              ].map(([label, oldValue, newValue]) => (
                <div
                  key={label}
                  className="grid grid-cols-3 border-t border-white/10 px-4 py-3 text-sm"
                >
                  <span className="text-white/65">{label}</span>
                  <span className="text-white/82">{oldValue}</span>
                  <span className="font-medium text-cyan-200">{newValue}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="trust-security" className="pb-16 md:pb-20">
          <div className="glass-panel p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">Trust & Security</p>
            <h3 className="mt-2 text-2xl font-semibold">Built for enterprise logistics</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ["EU-hosted", "All data stays in Europe. Full GDPR compliance."],
                ["Encrypted", "End-to-end encryption at rest and in transit."],
                ["Role-based access", "Fine-grained permissions for every team member."],
                ["Audit trail", "Complete history of every order and action."],
                ["Human review", "Every order is checked by your team before it is processed."],
                ["ISO 27001", "Certification in progress. Security by design."],
              ].map(([title, text], i) => (
                <SpotlightCard key={title}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <p className="font-semibold text-cyan-50">{title}</p>
                    <p className="mt-1 text-sm text-white/72">{text}</p>
                  </motion.div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <motion.div
            className="logo-frame aurora-frame p-7 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">
              Ecosystem
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Built with the stack your team already trusts.
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
              AI frameworks, workflow automation, cloud infrastructure, and
              logistics-native systems. Everything is designed to plug into your
              operation without friction.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {aiStack.map((tool) => (
                <motion.div
                  key={tool.name}
                  className="logo-pill"
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <img
                    src={`https://logo.clearbit.com/${tool.domain}`}
                    alt={tool.name}
                    className="h-4 w-4 object-contain brightness-0 invert"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const span = document.createElement('span');
                      span.className = "logo-dot";
                      e.currentTarget.parentElement?.prepend(span);
                    }}
                  />
                  <span>{tool.name}</span>
                </motion.div>
              ))}
            </div>

            <div className="marquee mt-6">
              <div className="marquee-track flex items-center">
                {infraStack.concat(infraStack).map((tool, index) => (
                  <div key={`${tool.name}-${index}`} className="flex items-center gap-2 mx-8">
                    <img
                      src={`https://logo.clearbit.com/${tool.domain}`}
                      alt={tool.name}
                      className="h-5 w-5 object-contain brightness-0 invert opacity-60"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="font-semibold">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="marquee marquee-reverse mt-3">
              <div className="marquee-track flex items-center">
                {integrations.concat(integrations).map((tool, index) => (
                  <div key={`${tool.name}-rail-${index}`} className="flex items-center gap-2 mx-8">
                    <img
                      src={`https://logo.clearbit.com/${tool.domain}`}
                      alt={tool.name}
                      className="h-5 w-5 object-contain brightness-0 invert opacity-60"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="font-semibold">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="glass-panel p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">FAQ</p>
            <h3 className="mt-2 text-2xl font-semibold">Common questions</h3>
            <div className="mt-5 space-y-2">
              {faqQuestions.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-form" className="pb-20 md:pb-24">
          <div className="mx-auto max-w-4xl relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-fuchsia-500/20 via-cyan-500/20 to-violet-500/20 blur-3xl rounded-[3rem] -z-10" />
            <div className="glass-panel p-8 md:p-12 relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-32 bg-fuchsia-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
              
              <div className="text-center relative z-20">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Take Action
                </p>
                <h3 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Ready to stop <span className="text-white/40 line-through decoration-fuchsia-500 decoration-4">typing orders?</span>
                </h3>
                <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/70">
                  No commitment. 15-minute call. We&apos;ll show you PetaRon with your
                  actual data and map out your ROI.
                </p>
              </div>

              <form className="mt-12 space-y-6 relative z-20" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-left text-xs uppercase tracking-[0.14em] text-white/55">
                  Name
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-fuchsia-300 focus:outline-none"
                  />
                </label>
                <label className="block text-left text-xs uppercase tracking-[0.14em] text-white/55">
                  Work email
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-violet-300 focus:outline-none"
                  />
                </label>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-left text-xs uppercase tracking-[0.14em] text-white/55">
                  Company
                  <input
                    type="text"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Company name"
                    className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-cyan-300 focus:outline-none"
                  />
                </label>
                <label className="block text-left text-xs uppercase tracking-[0.14em] text-white/55">
                  Daily order volume
                  <select
                    value={volume}
                    onChange={(event) => setVolume(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/20 bg-[#0e1120] px-4 py-3 text-sm text-white focus:border-fuchsia-300 focus:outline-none"
                  >
                    <option>Select range</option>
                    <option>1-50 orders/day</option>
                    <option>50-150 orders/day</option>
                    <option>150-300 orders/day</option>
                    <option>300+ orders/day</option>
                  </select>
                </label>
              </div>

              <div>
                <p className="block text-left text-xs uppercase tracking-[0.14em] text-white/55 mb-3">
                  How do you currently receive orders?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "Email", desc: "Manual processing" },
                    { id: "EDI", desc: "Electronic data interchange" },
                    { id: "Portal / web form", desc: "Customer self-service" },
                    { id: "Phone / WhatsApp", desc: "Direct contact" },
                  ].map((method) => {
                    const isSelected = intake.includes(method.id);
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => toggleIntake(method.id)}
                        className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-400/10"
                            : "border-white/10 bg-[#0e1120] hover:bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <span className={`text-sm font-semibold ${isSelected ? "text-cyan-100" : "text-white"}`}>
                          {method.id}
                        </span>
                        <span className={`mt-1 text-xs ${isSelected ? "text-cyan-200/70" : "text-white/45"}`}>
                          {method.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                placeholder="Other: describe your order intake..."
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-cyan-300 focus:outline-none"
              />
              <button
                type="submit"
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 px-5 py-4 text-base font-semibold text-[#05060d] transition-all hover:scale-[1.02] active:scale-95 overflow-hidden shadow-[0_0_40px_rgba(167,139,250,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shiny-sweep" />
                <span className="relative flex items-center gap-2">
                  Book Your Free Demo
                  <Send size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

        <footer className="glass-panel space-y-8 px-7 py-8">
          <div className="grid gap-5 md:grid-cols-4">
            <div>
              <p className="text-xl font-semibold">PetaRon.ai</p>
              <a href="#contact-form" className="mt-2 inline-block text-sm text-white/70">
                Contact us
              </a>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <p className="font-medium text-white">Product</p>
              <a href="#how-it-works" className="block">How It Works</a>
              <a href="#results" className="block">Results</a>
              <a href="#roi" className="block">ROI Calculator</a>
              <a href="#contact-form" className="block">FAQ</a>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <p className="font-medium text-white">Company</p>
              <span className="block">About</span>
              <span className="block">Careers</span>
              <span className="block">LinkedIn</span>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <p className="font-medium text-white">Legal</p>
              <span className="block">Privacy Policy (coming soon)</span>
              <span className="block">Terms of Service (coming soon)</span>
              <span className="block">GDPR (coming soon)</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/60">
            <span>© 2026 PetaRon AI. All rights reserved.</span>
            <span>EU-hosted • GDPR compliant</span>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Petaron;
