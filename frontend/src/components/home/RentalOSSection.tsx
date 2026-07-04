"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Wrench,
  FileText,
  Bell,
  MessageSquare,
  LogOut,
  TrendingUp,
  Clock,
  Activity,
  CheckCircle2,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const osFeatures = [
  { icon: CreditCard, label: "Rent Collection", value: "\u20B932,000", sub: "Due May 1 \u2014 Auto-reminder sent", color: "text-indigo-400", accent: "bg-indigo-500/10", status: "on-time" },
  { icon: Wrench, label: "Maintenance", value: "2 Active", sub: "Plumbing fix \u2014 SLA: 24hrs left", color: "text-amber-400", accent: "bg-amber-500/10", status: "in-progress" },
  { icon: FileText, label: "Agreement", value: "Active", sub: "Expires Mar 2027 \u2014 10mo remaining", color: "text-emerald-400", accent: "bg-emerald-500/10", status: "healthy" },
  { icon: Bell, label: "Renewal Alert", value: "60 Days", sub: "Renewal window opens Jan 2027", color: "text-violet-400", accent: "bg-violet-500/10", status: "upcoming" },
  { icon: MessageSquare, label: "Disputes", value: "0 Open", sub: "Last resolved in 3 days", color: "text-teal-400", accent: "bg-teal-500/10", status: "clear" },
  { icon: LogOut, label: "Move-out", value: "Structured", sub: "Inspection \u2192 Reconciliation \u2192 Handover", color: "text-slate-400", accent: "bg-slate-500/10", status: "ready" },
];

const statusColors: Record<string, string> = {
  "on-time": "bg-emerald-400",
  "in-progress": "bg-amber-400",
  "healthy": "bg-emerald-400",
  "upcoming": "bg-violet-400",
  "clear": "bg-emerald-400",
  "ready": "bg-slate-400",
};

export default function RentalOSSection() {
  return (
    <section className="py-20 sm:py-36 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="RentalOS\u2122"
          title="The platform that works after the deal closes"
          subtitle="Most rental platforms disappear after matchmaking. RentalOS\u2122 manages the full lifecycle."
        />

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 sm:mt-20 relative"
        >
          {/* Glow behind dashboard */}
          <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-transparent rounded-3xl blur-2xl" />

          <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl shadow-slate-900/40 overflow-hidden border border-slate-800/50">
            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

            {/* Title bar */}
            <div className="relative flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="h-px flex-1 max-w-[200px] bg-slate-700/50 ml-2 hidden sm:block" />
                <span className="text-[11px] text-slate-500 font-mono tracking-wide hidden sm:inline">
                  RentalOS\u2122 Dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  Live
                </span>
              </div>
            </div>

            {/* Property context bar */}
            <div className="relative flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 bg-slate-800/40 rounded-xl px-3 sm:px-4 py-3 border border-slate-700/30">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                <span className="text-sm">\ud83c\udfe0</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-white block truncate">3BHK Vaishali Nagar</span>
                <span className="text-[11px] text-slate-500 block sm:hidden">Ananya Mehta</span>
                <span className="text-[11px] text-slate-500 hidden sm:inline ml-0 sm:ml-3">Tenant: Ananya Mehta</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-medium hidden sm:inline">All Clear</span>
              </div>
            </div>

            {/* Dashboard grid */}
            <div className="relative grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {osFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="bg-slate-800/40 hover:bg-slate-800/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-700/30 hover:border-slate-600/40 transition-all duration-300 group/card"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl ${feature.accent} flex items-center justify-center shrink-0`}>
                        <feature.icon className={`w-4 h-4 ${feature.color}`} />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                        {feature.label}
                      </span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${statusColors[feature.status]} shrink-0`} />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-white mb-1 font-display">
                    {feature.value}
                  </div>
                  <p className="text-[11px] sm:text-[12px] text-slate-500 leading-relaxed line-clamp-2">{feature.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom status bar */}
            <div className="relative mt-5 sm:mt-6 flex items-center justify-between pt-4 sm:pt-5 border-t border-slate-700/30">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">All systems operational</span>
                  <span className="sm:hidden">Operational</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 2 min ago</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-600 font-mono">
                v2.4.1
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
