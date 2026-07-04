"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  ShieldCheck,
  Clock,
  Wrench,
  CalendarHeart,
  Wifi,
  Dumbbell,
  UtensilsCrossed,
  WashingMachine,
  Gamepad2,
  BookOpen,
  Bike,
  TreePine,
  CheckCircle2,
  ArrowRight,
  BadgePercent,
  Building2,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

/* ─── Room Types ─── */
const roomTypes = [
  { id: "private", label: "Private Room", price: "15,000", features: ["En-suite bathroom", "Personal AC", "Study desk", "Wardrobe"] },
  { id: "shared", label: "Shared Room", price: "8,500", features: ["Bunk beds", "Shared bathroom", "Storage locker", "Study area"] },
  { id: "apartment", label: "Apartment", price: "22,000", features: ["Full kitchen", "Living room", "2 Bedrooms", "Balcony"] },
] as const;

type RoomId = (typeof roomTypes)[number]["id"];

/* ─── Community Features ─── */
const communityFeatures = [
  { label: "High-Speed WiFi", icon: Wifi },
  { label: "Gym Access", icon: Dumbbell },
  { label: "Meals Available", icon: UtensilsCrossed },
  { label: "Laundry", icon: WashingMachine },
  { label: "Game Room", icon: Gamepad2 },
  { label: "Library", icon: BookOpen },
  { label: "Cycling", icon: Bike },
  { label: "Garden", icon: TreePine },
];

/* ─── Benefits ─── */
const benefits = [
  { label: "No Brokerage", description: "Zero hidden fees, move in directly", icon: BadgePercent, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { label: "Flexible 3-Month Stays", description: "No long lock-ins, leave when you need to", icon: Clock, color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
  { label: "Community Events Weekly", description: "Movie nights, workshops, and networking", icon: CalendarHeart, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  { label: "24/7 Maintenance", description: "Report and track issues in real-time", icon: Wrench, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { label: "AI-Matched Roommates", description: "Paired by lifestyle, schedule, and preferences", icon: Sparkles, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
];

/* ─── Occupancy Data ─── */
const occupancyAreas = [
  { name: "Malviya Nagar", occupancy: 92 },
  { name: "Vaishali Nagar", occupancy: 85 },
  { name: "C-Scheme", occupancy: 88 },
  { name: "Mansarovar", occupancy: 79 },
  { name: "Jagatpura", occupancy: 94 },
];

export default function CoLivingShowcase() {
  const [activeRoom, setActiveRoom] = useState<RoomId>("private");
  const selectedRoom = roomTypes.find((r) => r.id === activeRoom)!;

  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-100/40 via-violet-100/20 to-transparent dark:from-indigo-950/30 dark:via-violet-950/10 dark:to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-100/30 via-cyan-100/10 to-transparent dark:from-teal-950/20 dark:via-cyan-950/5 dark:to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Co-Living"
          title="Community-first living, AI-matched"
          subtitle="The future of urban living for young professionals, digital nomads, and relocating employees. Move in with just a suitcase."
        />

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* ─── Left: Room Card ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden">
              {/* Image Placeholder */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="w-12 h-12 text-white/60 mx-auto mb-2" />
                    <p className="text-white/80 text-sm font-medium">Co-Living Space Preview</p>
                  </div>
                </div>
                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                    All-Inclusive
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/80 backdrop-blur-md text-white text-[11px] font-semibold">
                    No Brokerage
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span className="text-xs font-semibold text-white">AI Roommate Match: <span className="text-cyan-300">91%</span></span>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* Room Type Selector */}
                <div className="flex gap-2">
                  {roomTypes.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setActiveRoom(room.id)}
                      className={`relative flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeRoom === room.id
                          ? "text-white"
                          : "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {activeRoom === room.id && (
                        <motion.div
                          layoutId="roomSelector"
                          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{room.label}</span>
                    </button>
                  ))}
                </div>

                {/* Price */}
                <motion.div
                  key={activeRoom}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-3xl font-bold text-slate-900 dark:text-white font-display">
                    &#8377;{selectedRoom.price}
                  </span>
                  <span className="text-sm text-slate-400">/month</span>
                  <span className="ml-auto px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold border border-indigo-100 dark:border-indigo-900/50">
                    All-inclusive
                  </span>
                </motion.div>

                {/* Features */}
                <motion.div
                  key={`features-${activeRoom}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="grid grid-cols-2 gap-2"
                >
                  {selectedRoom.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </motion.div>

                {/* Community Features Scroll */}
                <div className="space-y-2.5">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Community Amenities</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                    {communityFeatures.map((feat) => {
                      const Icon = feat.icon;
                      return (
                        <div
                          key={feat.label}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap flex-shrink-0"
                        >
                          <Icon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                          {feat.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tagline */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    &ldquo;Move in with just a suitcase&rdquo;
                  </p>
                  <a
                    href="/discover?type=co-living"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all"
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Right: Stats & Benefits ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5"
          >
            {/* Benefits Cards */}
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md dark:shadow-none transition-shadow group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${benefit.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {benefit.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Occupancy Chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white font-display">Occupancy Across Jaipur</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Live co-living availability</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800">
                  <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">87% Avg</span>
                </div>
              </div>
              <div className="space-y-3">
                {occupancyAreas.map((area, i) => (
                  <div key={area.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-300">{area.name}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{area.occupancy}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white dark:bg-slate-800 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          area.occupancy >= 90
                            ? "bg-gradient-to-r from-violet-500 to-indigo-500"
                            : area.occupancy >= 85
                            ? "bg-gradient-to-r from-indigo-500 to-blue-500"
                            : "bg-gradient-to-r from-teal-500 to-cyan-500"
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${area.occupancy}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 justify-center text-xs text-slate-400 dark:text-slate-500"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verified properties &middot; Background-checked residents &middot; Secure payments</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
