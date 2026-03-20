import { motion, useScroll, useSpring, animate, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Send, Link, ScanText, CheckCircle2, Clock, CalendarIcon, FileJson, Mail, BrainCircuit, Database } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { DashboardPreview } from "../components/DashboardPreview";
import { Calendar } from "@/components/ui/calendar";

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
      <div className="relative h-full w-full rounded-2xl bg-[#06070c] p-6 z-10">
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

// WAW Custom Cursor Tracker
const MouseTracker = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.6 }}
    >
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(192,132,252,0.05) 40%, transparent 70%)",
          x: useTransform(mouseX, (v) => v - 400),
          y: useTransform(mouseY, (v) => v - 400),
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 0.5 }}
      />
    </motion.div>
  );
};

// WAW Text Reveal
const RevealText = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0, rotate: 10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.08, 
              ease: [0.2, 0.65, 0.3, 0.9],
              type: "spring",
              bounce: 0.3
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
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
  
  // Booking state
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("10:00");

  const monthlyCost = useMemo(() => {
    const workDays = 22;
    return Math.round((ordersPerDay * minutesPerOrder * hourlyCost * workDays) / 60);
  }, [hourlyCost, minutesPerOrder, ordersPerDay]);

  const yearlyCost = monthlyCost * 12;

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("Demo Booking - PetaRon");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nRequested Date: ${date?.toLocaleDateString()}\nRequested Time: ${time}`
    );
    window.location.href = `mailto:hello@petaron.ai?subject=${subject}&body=${body}`;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06070c] text-white selection:bg-cyan-400 selection:text-black">
      
      <MouseTracker />
      <div className="noise-overlay opacity-30 z-10 pointer-events-none" />
      
      <motion.div
        className="fixed left-0 top-0 z-[100] h-1 w-full origin-left bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300"
        style={{ scaleX: progress }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
      
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[120px] mix-blend-screen"
          animate={{ x: [0, 50, -30, 0], y: [0, -30, 40, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[5%] top-[25%] h-[600px] w-[600px] rounded-full bg-cyan-600/20 blur-[150px] mix-blend-screen"
          animate={{ x: [0, -60, 40, 0], y: [0, 50, -40, 0], scale: [1, 0.8, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-6 pb-20 pt-6 md:px-10 md:pt-8 z-10">
        <header className="sticky top-6 z-50 flex items-center justify-between rounded-full border border-white/10 bg-[#06070c]/60 px-6 py-4 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <span className="font-bold text-black text-xs tracking-tighter">PR</span>
            </div>
            <div className="text-xl font-serif font-normal italic tracking-[0.1em] text-white">
              PetaRon
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#how-it-works" className="hover:text-white transition-colors">Platform</a>
            <a href="#roi" className="hover:text-white transition-colors">ROI</a>
          </div>
          <a
            href="#booking"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#070814] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Book Demo
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </header>

        <section className="pb-20 pt-24 md:pb-32 md:pt-32 relative">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  AI-Powered Order Entry
                </span>
              </motion.div>
              
              <h1 className="max-w-4xl text-5xl font-serif font-normal leading-[1.05] tracking-tight text-white md:text-[5rem] lg:text-[5.5rem] mt-4">
                <RevealText text="From chaotic inbox to clean TMS" />
                <br />
                <motion.span 
                  className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent inline-block font-serif italic pr-2"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  in under 30s.
                </motion.span>
              </h1>
              <motion.p 
                className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                PetaRon connects to your order pipeline, reads every incoming email, extracts the data, and pushes it directly into your TMS. Your team approves, not types.
              </motion.p>

              <motion.div 
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <a
                  href="#booking"
                  className="group relative flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-8 py-4 text-sm font-bold text-[#05060d] transition-all hover:bg-cyan-300 hover:scale-105 shadow-[0_0_40px_rgba(34,211,238,0.3)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    Start Automating <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a
                  href="#platform"
                  className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/40 backdrop-blur-sm"
                >
                  Explore Platform
                </a>
              </motion.div>
            </div>

            <div className="relative hidden lg:block h-[500px] perspective-1000 w-full z-10">
              {/* Document Visual - Floating 3D */}
              <motion.div
                className="absolute right-0 top-10 w-80 rounded-2xl border border-white/10 bg-[#0d101b]/90 p-5 shadow-2xl backdrop-blur-xl overflow-hidden z-20"
                animate={{ 
                  y: [0, -20, 0], 
                  rotateY: [-5, 5, -5],
                  rotateX: [5, -5, 5],
                  rotateZ: [-2, 2, -2]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
              >
                <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                  <div className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                  <div className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                  <div className="ml-2 text-xs font-mono text-white/50">PDF_Order_FW203.pdf</div>
                </div>
                <div className="space-y-3">
                  <div className="h-2.5 w-full rounded bg-white/10" />
                  <div className="h-2.5 w-5/6 rounded bg-white/10" />
                  <div className="h-2.5 w-4/6 rounded bg-white/10" />
                  <div className="my-5 h-px w-full bg-white/10" />
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded bg-cyan-400/20 border border-cyan-400/30" />
                    <div className="flex-1 space-y-2.5">
                      <div className="h-2.5 w-full rounded bg-white/10" />
                      <div className="h-2.5 w-2/3 rounded bg-white/10" />
                    </div>
                  </div>
                </div>
                {/* Scanning line effect */}
                <motion.div
                  className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent blur-[2px]"
                  animate={{ top: ["-20%", "120%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              {/* JSON/Data Output Visual - Floating 3D */}
              <motion.div
                className="absolute left-0 top-40 w-80 rounded-2xl border border-fuchsia-500/30 bg-[#060814]/95 p-6 shadow-[0_0_50px_rgba(192,132,252,0.15)] backdrop-blur-xl z-30"
                animate={{ 
                  y: [0, 20, 0], 
                  rotateY: [5, -5, 5],
                  rotateX: [-5, 5, -5],
                  rotateZ: [2, -2, 2]
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
              >
                <div className="mb-3 text-xs font-bold tracking-widest text-fuchsia-400 flex items-center gap-2">
                  <FileJson size={14} /> EXTRACTED JSON
                </div>
                <div className="font-mono text-sm leading-relaxed text-white/80">
                  <span className="text-fuchsia-300">"shipper"</span>: <span className="text-cyan-300">"Acme Corp"</span>,<br/>
                  <span className="text-fuchsia-300">"origin"</span>: <span className="text-cyan-300">"Rotterdam"</span>,<br/>
                  <span className="text-fuchsia-300">"destination"</span>: <span className="text-cyan-300">"Hamburg"</span>,<br/>
                  <span className="text-fuchsia-300">"weight"</span>: <span className="text-yellow-300">24500</span>,<br/>
                  <span className="text-fuchsia-300">"hazardous"</span>: <span className="text-violet-300">false</span>,<br/>
                  <span className="text-fuchsia-300">"reference"</span>: <span className="text-cyan-300">"FW-203-A"</span>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fuchsia-500/10 to-transparent pointer-events-none rounded-2xl" />
              </motion.div>

              {/* Glowing Connecting lines */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none z-10 overflow-visible">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <motion.path
                  d="M 160 260 C 200 260 240 180 320 180"
                  fill="transparent"
                  stroke="url(#lineGrad)"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  filter="url(#glow)"
                  animate={{ strokeDashoffset: [0, -40] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>
          </div>
        </section>

        <section className="pb-24 text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8"
          >
            TRUSTED INTEGRATIONS
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6">
            {integrations.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={item.name}
                className="logo-pill flex items-center justify-center border border-white/10 bg-white/[0.03] px-8 py-4 grayscale hover:grayscale-0 hover:border-white/20 transition-all duration-500 rounded-2xl backdrop-blur-sm"
              >
                <img 
                  src={`https://logo.clearbit.com/${item.domain}`} 
                  alt={item.name} 
                  className="h-7 object-contain brightness-0 invert opacity-60 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-500" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const span = document.createElement('span');
                    span.innerText = item.name;
                    span.className = "text-white/70 font-semibold text-lg tracking-wide";
                    e.currentTarget.parentElement?.appendChild(span);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="platform" className="mt-16 mb-32 relative z-10 perspective-1000">
          <div className="text-center mb-16">
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-fuchsia-300">
                Core Dashboard
              </p>
            </motion.div>
            <h3 className="mt-6 text-4xl font-serif font-normal tracking-tight text-white md:text-5xl">
              Intelligence you can see.
            </h3>
            <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
              Full visibility of your order pipeline. Built to look exactly like the tools your team already uses, but powered by autonomous agents.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            className="relative flex h-[400px] w-full items-center justify-center mt-10 md:h-[650px]"
            style={{ perspective: "1200px" }}
          >
            {/* Dashboard Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-fuchsia-500/10 blur-[100px] -z-10 rounded-full" />
            
            {/* Floating Board 1 (Back) */}
            <motion.div
              className="absolute w-[85%] max-w-5xl h-[280px] md:h-[480px] rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-[0_0_80px_rgba(192,132,252,0.15)] flex items-center justify-center overflow-hidden"
              initial={{ x: "-5%", rotateX: 20, rotateY: 25, rotateZ: -5, y: -15 }}
              animate={{ y: 15 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent pointer-events-none" />
              <p className="text-white/30 font-mono text-xs md:text-sm uppercase tracking-[0.3em] font-medium border border-white/10 rounded-lg px-6 py-3 bg-white/5">
                Screen Placeholder 1
              </p>
            </motion.div>

            {/* Floating Board 2 (Front) */}
            <motion.div
              className="absolute w-[85%] max-w-5xl h-[280px] md:h-[480px] rounded-3xl border border-white/20 bg-[#060814]/80 backdrop-blur-2xl shadow-[0_30px_100px_rgba(34,211,238,0.2)] flex items-center justify-center overflow-hidden"
              initial={{ x: "15%", rotateX: 20, rotateY: 25, rotateZ: -5, y: 15 }}
              animate={{ y: -15 }}
              transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent pointer-events-none" />
              <p className="text-white/40 font-mono text-xs md:text-sm uppercase tracking-[0.3em] font-medium border border-white/20 rounded-lg px-6 py-3 bg-white/5 shadow-xl">
                Screen Placeholder 2
              </p>
            </motion.div>
          </motion.div>
        </section>

      </div>

      <section id="process-flow" className="py-32 relative z-10 border-y border-white/5 bg-[#05060A]">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300">
              Process Flow
            </p>
            <h3 className="mt-6 text-4xl font-serif font-normal tracking-tight text-white md:text-5xl">
              From inbox to system entry
            </h3>
            <p className="mt-4 text-white/60 max-w-3xl mx-auto text-lg">
              A clear, human-in-the-loop pipeline from incoming emails to validated structured records in your system.
            </p>
          </div>

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-4">
              {[
                {
                  title: "Email Received",
                  description: "Orders arrive from inboxes, attachments, and portal messages.",
                  Icon: Mail,
                  color: "text-blue-300 border-blue-400/30 bg-blue-400/10",
                },
                {
                  title: "Order Classified",
                  description: "AI identifies order intent, shipper context, and required fields.",
                  Icon: BrainCircuit,
                  color: "text-fuchsia-300 border-fuchsia-400/30 bg-fuchsia-400/10",
                },
                {
                  title: "Processed",
                  description: "Data is extracted, normalized, and validated with confidence checks.",
                  Icon: ScanText,
                  color: "text-violet-300 border-violet-400/30 bg-violet-400/10",
                },
                {
                  title: "Entered in System",
                  description: "Approved data is pushed as a clean structured entry to your TMS.",
                  Icon: Database,
                  color: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
                },
              ].map(({ title, description, Icon, color }, index, arr) => (
                <div key={title} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="h-full w-full rounded-2xl border border-white/10 bg-[#0c1120]/80 p-5"
                  >
                    <div className={`mb-4 inline-flex rounded-xl border p-3 ${color}`}>
                      <Icon size={20} />
                    </div>
                    <h4 className="text-lg font-semibold text-white">{title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{description}</p>
                  </motion.div>

                  {index < arr.length - 1 && (
                    <div className="pointer-events-none absolute -right-5 top-1/2 z-0 hidden h-px w-5 -translate-y-1/2 overflow-hidden bg-white/10 md:flex">
                      <motion.div
                        className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.2,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-6 md:px-10 z-10">
        <section id="how-it-works" className="py-32 relative z-10">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [
                "Connect in Minutes",
                "Forward your shared inbox or connect via API. No IT team needed, no deep integration required.",
                Link,
                "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/30 shadow-[0_0_30px_rgba(232,121,249,0.15)]"
              ],
              [
                "Agentic Capture",
                "Our AI reads PDFs, complex Excel sheets, and free-text emails contextually. Zero templates required.",
                ScanText,
                "text-cyan-400 bg-cyan-400/10 border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              ],
              [
                "Review & Confirm",
                "Operators review a structured, clean summary. One click validates and pushes straight to your TMS.",
                CheckCircle2,
                "text-emerald-400 bg-emerald-400/10 border-emerald-400/30 shadow-[0_0_30px_rgba(52,211,153,0.15)]"
              ],
            ].map(([title, description, Icon, colorClass], index) => (
              <SpotlightCard key={title as string} className="h-full">
                <motion.div
                  className="p-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
                >
                  <div className={`mb-6 inline-flex rounded-2xl border p-4 ${colorClass as string}`}>
                    {/* @ts-expect-error */}
                    <Icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold tracking-tight text-white mb-3">{title as string}</h4>
                  <p className="text-base leading-relaxed text-white/60">{description as string}</p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </div>

      <section id="roi" className="py-32 relative z-10 border-y border-white/5 bg-[#080B18]">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div className="glass-panel grid gap-10 p-8 md:grid-cols-2 md:p-12 relative overflow-hidden bg-[#060814]/40">
            {/* Background glowing blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">ROI Calculator</p>
              <h3 className="mt-3 text-4xl font-serif font-normal tracking-tight">Calculate your savings</h3>
              <div className="mt-10 space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium uppercase tracking-widest text-white/60">Orders per day</span>
                    <span className="text-xl font-bold text-white bg-white/10 px-4 py-1 rounded-lg border border-white/10">{ordersPerDay}</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={400}
                    step={10}
                    value={ordersPerDay}
                    onChange={(event) => setOrdersPerDay(Number(event.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300"
                  />
                </div>
                
                <div>
                  <div className="mb-4">
                    <span className="text-sm font-medium uppercase tracking-widest text-white/60">Minutes per order today</span>
                  </div>
                  <div className="flex gap-3">
                    {[5, 10, 15, 20].map((val) => (
                      <button
                        key={val}
                        onClick={() => setMinutesPerOrder(val)}
                        className={`flex-1 rounded-xl py-3 text-base font-bold transition-all border ${
                          minutesPerOrder === val
                            ? "bg-cyan-400 text-[#05060d] border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-105"
                            : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {val}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-3xl border border-white/10 bg-[#0b0e1a]/80 p-8 flex flex-col justify-center relative overflow-hidden shadow-2xl backdrop-blur-md">
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-fuchsia-500/20 blur-[50px] rounded-full" />
              <p className="text-sm font-medium uppercase tracking-widest text-white/60">Estimated yearly manual cost</p>
              <p className="mt-2 text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300 flex items-center">
                €<AnimatedNumber value={yearlyCost} />
              </p>
              <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent my-8" />
              <p className="text-lg text-white/80 font-light leading-relaxed">
                PetaRon typically reduces this operational cost by over <span className="font-bold text-emerald-400">80%</span>, paying for itself within the very first month.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-6 pb-20 md:px-10 z-10">
        <section id="booking" className="py-32 relative z-10">
          <div className="mx-auto max-w-5xl relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl rounded-[3rem] -z-10 opacity-70" />
            <div className="glass-panel p-8 md:p-12 relative z-10 overflow-hidden border border-white/20">
              <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-32 bg-fuchsia-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
              
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Take Action
                </p>
                <h3 className="mt-4 text-4xl font-serif font-normal tracking-tight text-white md:text-5xl">
                  Ready for the future?
                </h3>
                <p className="mx-auto mt-4 max-w-lg text-lg text-white/60 font-light">
                  Book a 15-minute call. We'll show you PetaRon with your actual data and map out your ROI.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="bg-[#0b0e1a]/80 p-6 rounded-2xl border border-white/10 flex flex-col items-center shadow-xl backdrop-blur-md">
                  <p className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-cyan-400">
                    <CalendarIcon size={18} />
                    Select a Date
                  </p>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl border border-white/5 bg-[#06070c]/50 text-white shadow-inner p-4"
                  />
                </div>

                <form className="space-y-6" onSubmit={handleBookingSubmit}>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/20 focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-cyan-400/10 transition-all shadow-inner"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@logistics.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/20 focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-cyan-400/10 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                      <span className="flex items-center gap-2">
                        <Clock size={16} className="text-fuchsia-400" /> Preferred Time
                      </span>
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0b0e1a] px-5 py-4 text-base text-white focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/10 shadow-inner"
                    >
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="group w-full mt-2 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-4 text-base font-bold text-[#05060d] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                  >
                    Confirm Booking
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-10 pb-6 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center">
              <span className="font-bold text-black text-[10px] tracking-tighter">PR</span>
            </div>
            <p className="text-lg font-serif font-normal italic tracking-wider text-white/90">PetaRon.ai</p>
          </div>
          <div className="flex gap-6 text-xs font-medium tracking-widest uppercase text-white/40">
            <span>© 2026 PetaRon AI.</span>
            <span className="hidden md:inline">•</span>
            <span className="text-emerald-400/70">EU-hosted</span>
            <span className="hidden md:inline">•</span>
            <span className="text-cyan-400/70">GDPR compliant</span>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Petaron;