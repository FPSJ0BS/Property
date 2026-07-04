"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Armchair,
  DoorOpen,
  Presentation,
  Wifi,
  Clock,
  Users,
  Rocket,
  Handshake,
  Printer,
  Coffee,
  CalendarCheck,
  ArrowRight,
  MapPin,
  Zap,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

/* ─── Workspace Types ─── */
const workspaceTypes = [
  {
    id: "hot",
    label: "Hot Desk",
    icon: Monitor,
    price: "6,000",
    unit: "/mo",
    tagline: "Drop in, plug in, work",
    highlights: ["Flexible seating", "Common areas", "Day-pass available", "Locker included"],
    accent: "from-amber-500 to-orange-500",
    lightBg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800/50",
    text: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "dedicated",
    label: "Dedicated Desk",
    icon: Armchair,
    price: "9,000",
    unit: "/mo",
    tagline: "Your permanent spot",
    highlights: ["Fixed desk 24/7", "Personal storage", "Ergonomic chair", "Monitor included"],
    accent: "from-indigo-500 to-blue-500",
    lightBg: "bg-indigo-50 dark:bg-indigo-950/20",
    border: "border-indigo-200 dark:border-indigo-800/50",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  {
    id: "cabin",
    label: "Private Cabin",
    icon: DoorOpen,
    price: "45,000",
    unit: "/mo",
    tagline: "For teams up to 10",
    highlights: ["Lockable cabin", "Custom branding", "Dedicated AC", "Reception support"],
    accent: "from-violet-500 to-purple-500",
    lightBg: "bg-violet-50 dark:bg-violet-950/20",
    border: "border-violet-200 dark:border-violet-800/50",
    text: "text-violet-600 dark:text-violet-400",
  },
  {
    id: "meeting",
    label: "Meeting Room",
    icon: Presentation,
    price: "500",
    unit: "/hr",
    tagline: "Book on demand",
    highlights: ["8-16 seater", "AV equipment", "Whiteboard", "Video conferencing"],
    accent: "from-teal-500 to-cyan-500",
    lightBg: "bg-teal-50 dark:bg-teal-950/20",
    border: "border-teal-200 dark:border-teal-800/50",
    text: "text-teal-600 dark:text-teal-400",
  },
] as const;

type WorkspaceId = (typeof workspaceTypes)[number]["id"];

/* ─── Features Grid ─── */
const features = [
  { label: "24/7 Access", icon: Clock, color: "text-amber-500" },
  { label: "High-Speed WiFi", icon: Wifi, color: "text-blue-500" },
  { label: "Meeting Rooms", icon: Presentation, color: "text-violet-500" },
  { label: "Networking Events", icon: Users, color: "text-pink-500" },
  { label: "Startup Incubator", icon: Rocket, color: "text-orange-500" },
  { label: "Investor Connects", icon: Handshake, color: "text-emerald-500" },
  { label: "Printing & Scanning", icon: Printer, color: "text-slate-500" },
  { label: "Cafeteria", icon: Coffee, color: "text-amber-600" },
];

export default function CoWorkingShowcase() {
  const [activeType, setActiveType] = useState<WorkspaceId>("hot");
  const selected = workspaceTypes.find((w) => w.id === activeType)!;

  return (
    <section className="py-20 sm:py-32 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-100/30 to-orange-100/10 dark:from-amber-950/10 dark:to-orange-950/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-100/30 to-violet-100/10 dark:from-indigo-950/10 dark:to-violet-950/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(100,100,100,0.2) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Co-Working"
          title="Workspaces that scale with your ambition"
          subtitle="Flexible workspaces for freelancers, startups, and enterprises. From hot desks to private cabins, find your perfect work environment."
        />

        <div className="mt-14 sm:mt-20 space-y-10">
          {/* ─── Workspace Type Selector ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {workspaceTypes.map((ws) => {
              const Icon = ws.icon;
              const isActive = activeType === ws.id;
              return (
                <button
                  key={ws.id}
                  onClick={() => setActiveType(ws.id)}
                  className={`relative p-4 rounded-2xl border text-left transition-all duration-300 group ${
                    isActive
                      ? `bg-white dark:bg-slate-800 ${ws.border} shadow-lg`
                      : "bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="workspaceIndicator"
                      className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${ws.accent}`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isActive ? ws.lightBg : "bg-slate-100 dark:bg-slate-700/50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? ws.text : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-sm font-semibold font-display transition-colors ${
                      isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {ws.label}
                  </p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span
                      className={`text-lg font-bold font-display transition-colors ${
                        isActive ? ws.text : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      &#8377;{ws.price}
                    </span>
                    <span className="text-xs text-slate-400">{ws.unit}</span>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* ─── Selected Workspace Detail ─── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className={`rounded-2xl bg-white dark:bg-slate-800 border ${selected.border} shadow-xl p-6 sm:p-8`}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Visual */}
                <div className={`relative rounded-xl overflow-hidden h-56 sm:h-64 bg-gradient-to-br ${selected.accent}`}>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    {(() => {
                      const Icon = selected.icon;
                      return <Icon className="w-16 h-16 text-white/40 mb-4" />;
                    })()}
                    <p className="text-xl font-bold font-display">{selected.label}</p>
                    <p className="text-white/70 text-sm mt-1">{selected.tagline}</p>
                  </div>
                </div>

                {/* Right: Info */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                      {selected.label}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{selected.tagline}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white font-display">
                      &#8377;{selected.price}
                    </span>
                    <span className="text-slate-400">{selected.unit}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {selected.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <Zap className={`w-3.5 h-3.5 flex-shrink-0 ${selected.text}`} />
                        {h}
                      </div>
                    ))}
                  </div>

                  <a
                    href="/discover?type=co-working"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${selected.accent} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ─── Features Grid ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-5 text-center">
              Included with Every Plan
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 hover:shadow-md dark:hover:bg-slate-800 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-5 h-5 ${feat.color}`} />
                    </div>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300 text-center">
                      {feat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ─── Live Availability + CTA ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-indigo-50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-indigo-950/20 border border-amber-200/60 dark:border-amber-800/30"
          >
            {/* Live Indicator */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-4 h-4 rounded-full bg-emerald-400/30 animate-ping" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white font-display">
                  Seats Available Now
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-amber-600 dark:text-amber-400">43 seats</span> available across Jaipur
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Stats */}
            <div className="flex items-center gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white font-display">12</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Locations</p>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white font-display">500+</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Members</p>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white font-display">4.8</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Rating</p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="/discover?type=co-working"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all flex-shrink-0"
            >
              <CalendarCheck className="w-4 h-4" />
              Find Your Workspace
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
