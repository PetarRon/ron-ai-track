import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LayoutDashboard, Mail, FileText, Database, Activity, CheckCircle2, Search, Bell, User, Network, UserCheck, AlertTriangle } from "lucide-react";
import { SankeyChart } from "./SankeyChart";

const pipelineData = [
  { source: "Email Received", target: "Processing", value: 120, source_count: 120 },
  { source: "Processing", target: "Complete", value: 104 },
  { source: "Processing", target: "Needs Review", value: 16 },
];

export const DashboardPreview = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "orders">("dashboard");

  useEffect(() => {
    const views: ("dashboard" | "orders")[] = ["dashboard", "orders"];

    const interval = window.setInterval(() => {
      setActiveView((currentView) => {
        const currentIndex = views.indexOf(currentView);
        return views[(currentIndex + 1) % views.length];
      });
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-[#060814] shadow-[0_0_80px_rgba(34,211,238,0.15)] overflow-hidden flex flex-col h-[840px] font-sans relative group pointer-events-none select-none">
      
      {/* Topbar */}
      <div className="h-14 border-b border-white/10 bg-[#0b0e1a]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="h-4 w-px bg-white/20 mx-2" />
          <span className="text-sm font-semibold tracking-wide text-white/90">Move Intermodal Dashboard</span>
        </div>
        <div className="flex items-center gap-5 text-white/50">
          <Search size={16} className="opacity-80" />
          <Bell size={16} className="opacity-80" />
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-fuchsia-500/40 to-cyan-500/40 border border-white/20 flex items-center justify-center">
            <User size={14} className="text-white/80" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <div className="w-16 md:w-56 border-r border-white/10 bg-[#0b0e1a]/60 backdrop-blur-md flex flex-col py-6 shrink-0">
          <div className="flex flex-col gap-2 px-2 md:px-4">
            <div
              className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                activeView === "dashboard"
                  ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  : "text-white/50 border border-transparent"
              }`}
            >
              <LayoutDashboard size={18} />
              <span className="hidden md:block text-sm font-medium">Dashboard</span>
            </div>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                activeView === "orders"
                  ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  : "text-white/50 border border-transparent"
              }`}
            >
              <FileText size={18} />
              <span className="hidden md:block text-sm font-medium">Orders</span>
            </div>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all text-white/50 border border-transparent`}
            >
              <Activity size={18} />
              <span className="hidden md:block text-sm font-medium">Health</span>
            </div>
            
            <div className="mt-3 hidden rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 md:block mx-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                Live Preview
              </p>
              <p className="mt-1 text-[11px] text-white/65">Auto-switches 7s</p>
            </div>
          </div>
        </div>

        {/* Main Content Area mimicking the core project layout */}
        <div className="flex-1 p-4 md:p-5 overflow-hidden bg-[#060814] relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#060814] to-[#060814] pointer-events-none" />
          
          <div className="relative z-10 flex h-full flex-col gap-4">
            {activeView === "dashboard" && (
              <>
                <div className="flex justify-between items-end shrink-0">
                  <h2 className="text-2xl font-serif font-normal text-white tracking-tight">Welcome back, Admin</h2>
                  <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
                    <div className="px-3 py-1.5 rounded-md text-xs font-medium text-white/50">Today</div>
                    <div className="px-3 py-1.5 rounded-md bg-white/10 text-xs font-medium text-white shadow-sm">Week</div>
                    <div className="px-3 py-1.5 rounded-md text-xs font-medium text-white/50">Month</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
                  {[
                    { title: "Total Emails", value: "1,248", icon: Mail, color: "text-blue-400" },
                    { title: "Orders Extracted", value: "982", icon: Database, color: "text-violet-400" },
                    { title: "Needs Review", value: "14", icon: Activity, color: "text-yellow-400" },
                    { title: "Success Rate", value: "98.5%", icon: CheckCircle2, color: "text-emerald-400" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0b0e1a]/80 border border-white/10 rounded-xl p-3 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-5">
                        <stat.icon size={56} />
                      </div>
                      <div className="flex gap-3 items-center mb-1">
                        <div className={`p-1.5 rounded-lg bg-white/5 ${stat.color}`}>
                          <stat.icon size={14} />
                        </div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-white/50">{stat.title}</span>
                      </div>
                      <div className="text-xl font-semibold tracking-tight text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Middle: Sankey Chart (Agentic Pipeline) */}
                <div className="bg-[#0b0e1a]/80 border border-white/10 rounded-xl p-4 shadow-lg shrink-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Network size={14} className="text-cyan-400" /> Agentic Pipeline
                    </h3>
                    <div className="px-2 py-1 text-[11px] bg-white/5 border border-white/10 rounded-md text-white/60">This Week</div>
                  </div>
                  {/* REDUCED SANKEY HEIGHT HERE */}
                  <div className="h-[180px] w-full">
                    <SankeyChart data={pipelineData} />
                  </div>
                </div>
              </>
            )}

            {/* Bottom: Orders + review/edit flow */}
            <div className="grid flex-1 md:grid-cols-[1.15fr_1.85fr] gap-4 min-h-0">
              
              {/* Left: Orders inbox / queue */}
              <div className="bg-[#0b0e1a]/80 border border-white/10 rounded-xl p-4 shadow-lg min-h-0 flex flex-col">
                <div className="flex items-center justify-between mb-3 shrink-0">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <FileText size={14} className="text-cyan-400" /> Orders Inbox
                  </h3>
                  <div className="text-[11px] text-white/45">14 flagged</div>
                </div>
                <div className="space-y-2 overflow-y-auto pr-1">
                  {[
                    { id: "FW-203-A", subject: "Transport order Rotterdam -> Hamburg", status: "Needs review" },
                    { id: "FW-198-K", subject: "Order attachment missing address line", status: "Queued" },
                    { id: "FW-176-T", subject: "Unknown shipper code on import", status: "Needs review" },
                    { id: "FW-155-M", subject: "EDI order imported successfully", status: "Complete" },
                  ].map((row, index) => (
                    <motion.div
                      key={row.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      className={`rounded-lg border px-3 py-2.5 ${
                        index === 0
                          ? "border-cyan-400/30 bg-cyan-400/8"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-semibold text-white/90">{row.id}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                          row.status === "Complete"
                            ? "bg-emerald-400/15 text-emerald-300"
                            : row.status === "Queued"
                              ? "bg-violet-400/15 text-violet-300"
                              : "bg-yellow-400/15 text-yellow-300"
                        }`}>
                          {row.status}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-white/60 truncate">{row.subject}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: review and overwrite workspace */}
              <div className="grid grid-rows-[auto_1fr] gap-4 min-h-0">
                <div className="bg-[#0b0e1a]/80 border border-white/10 rounded-xl p-4 shadow-lg shrink-0">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                    <AlertTriangle size={14} className="text-yellow-400" /> Review Queue
                  </h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { label: "Weight mismatch", value: "24,500 vs 24,000", tone: "text-yellow-300" },
                      { label: "Customer ref", value: "FW-203-A", tone: "text-cyan-300" },
                      { label: "Confidence", value: "96.3%", tone: "text-emerald-300" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                        <p className="text-[9px] uppercase tracking-widest text-white/40">{item.label}</p>
                        <p className={`mt-1.5 text-sm font-semibold ${item.tone}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-[1.05fr_1.25fr] gap-4 min-h-0">
                  <div className="bg-[#0b0e1a]/80 border border-white/10 rounded-xl p-4 shadow-lg min-h-0 flex flex-col">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3 shrink-0">
                      <Mail size={14} className="text-blue-300" /> Conversation
                    </h3>
                    <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                      <div className="rounded-lg border border-white/10 bg-[#0a0f1d] p-3">
                        <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-white/40">
                          <span>From</span>
                          <span>Today 14:02</span>
                        </div>
                        <p className="mt-1.5 text-xs font-medium text-white/90">julien.trevoux@client.com</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                          Transport inquiry Rotterdam to Hamburg tomorrow. 24 pallets attached in PDF. Please use same carrier settings as last shipment.
                        </p>
                      </div>
                      <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-3 py-2 text-[11px] text-white/45">
                        Attachments: `FW203.pdf`, `order-details.xlsx`
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0b0e1a]/80 border border-white/10 rounded-xl p-4 shadow-lg min-h-0 flex flex-col">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3 shrink-0">
                      <UserCheck size={14} className="text-emerald-400" /> Overwrite Form
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs flex-1 overflow-y-auto pr-1 content-start">
                      {[
                        ["Shipper", "Acme Corp"],
                        ["Origin", "Rotterdam"],
                        ["Destination", "Hamburg"],
                        ["Weight", "24,500 kg"],
                        ["Reference", "FW-203-A"],
                        ["Hazardous", "False"],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-lg border border-white/10 bg-[#0a0f1d] px-3 py-2">
                          <p className="text-[9px] uppercase tracking-widest text-white/40">{label}</p>
                          <p className="mt-1 text-xs font-mono font-medium text-white/90">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2 shrink-0">
                      <div className="flex-1 rounded-lg border border-emerald-400/30 bg-emerald-400/20 py-2 text-xs font-semibold text-emerald-300 text-center">
                        Overwrite
                      </div>
                      <div className="flex-1 rounded-lg border border-white/15 bg-white/5 py-2 text-xs font-semibold text-white/70 text-center">
                        Cancel
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
