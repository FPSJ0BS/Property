"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  TrendingUp,
  Footprints,
  Shield,
  Train,
  Users,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Volume2,
  IndianRupee,
} from "lucide-react";
import Link from "next/link";
import type { Area } from "@/data/areas";
import { areas } from "@/data/areas";
import { properties } from "@/data/properties";
import NearbyEssentials from "@/components/cityfit/NearbyEssentials";
import DailyLifePreview from "@/components/cityfit/DailyLifePreview";
import SettlementChecklist from "@/components/cityfit/SettlementChecklist";
import TradeoffExplainer from "@/components/cityfit/TradeoffExplainer";
import SettleFastScore from "@/components/cityfit/SettleFastScore";
import AreaPersonas from "@/components/cityfit/AreaPersonas";
import MoveSimulator from "@/components/cityfit/MoveSimulator";
import PostMoveFeedback from "@/components/cityfit/PostMoveFeedback";
import PropertyCard from "@/components/shared/PropertyCard";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/button";

/* ─── Score Card ─── */
function ScoreCard({
  label,
  score,
  icon: Icon,
  color,
  delay,
}: {
  label: string;
  score: number;
  icon: React.ElementType;
  color: string;
  delay: number;
}) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:shadow-md transition-shadow"
    >
      <div className="relative h-16 w-16">
        <svg className="h-16 w-16 -rotate-90" viewBox="0 0 52 52">
          <circle
            cx="26" cy="26" r={r} fill="none" stroke="currentColor" strokeWidth="3"
            className="text-slate-200 dark:text-slate-700"
          />
          <motion.circle
            cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-900 dark:text-white">
          {score}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</span>
      </div>
    </motion.div>
  );
}

/* ─── Demand Badge ─── */
function DemandBadge({ demand }: { demand: Area["demand"] }) {
  const styles: Record<Area["demand"], string> = {
    "Very High": "bg-red-500/80 text-white",
    High: "bg-orange-500/80 text-white",
    Moderate: "bg-yellow-500/80 text-white",
    Emerging: "bg-emerald-500/80 text-white",
  };
  return (
    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg backdrop-blur-md text-[11px] font-bold ${styles[demand]}`}>
      <TrendingUp className="w-3 h-3" />
      {demand} Demand
    </span>
  );
}

export default function AreaDetailClient({ area }: { area: Area }) {
  /* Filter properties matching this area's name */
  const areaProperties = properties.filter(
    (p) => p.locality.toLowerCase() === area.name.toLowerCase()
  );

  const scoreCards = [
    { label: "Walk Score", score: area.walkScore, icon: Footprints, color: "#f59e0b" },
    { label: "Safety", score: area.safetyScore, icon: Shield, color: "#10b981" },
    { label: "Transit", score: area.transitScore, icon: Train, color: "#3b82f6" },
    { label: "Family", score: area.familyScore, icon: Users, color: "#8b5cf6" },
    { label: "Student", score: area.studentScore, icon: GraduationCap, color: "#6366f1" },
    { label: "Professional", score: area.professionalScore, icon: Briefcase, color: "#ec4899" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Areas", href: "/compare-areas" },
          { label: area.name },
        ]}
      />

      {/* ─── Hero ─── */}
      <section className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img
          src={area.image}
          alt={area.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <DemandBadge demand={area.demand} />
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
              {area.name}
            </h1>
            <p className="flex items-center gap-1.5 text-white/80 mt-2 text-sm sm:text-base">
              <MapPin className="w-4 h-4" />
              {area.city}
            </p>
            <p className="mt-2 text-white/70 text-sm max-w-xl">
              {area.tagline}
            </p>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                <IndianRupee className="w-3.5 h-3.5 text-white/80" />
                <span className="text-sm font-semibold text-white">
                  {area.rentRange.min.toLocaleString("en-IN")} — {area.rentRange.max.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-white/60">/mo</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                <Volume2 className="w-3.5 h-3.5 text-white/80" />
                <span className="text-sm font-medium text-white">{area.noiseLevel}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                <TrendingUp className="w-3.5 h-3.5 text-white/80" />
                <span className="text-sm font-medium text-white">{area.avgRentTrend}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        {/* ─── Description ─── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl"
        >
          {area.description}
        </motion.p>

        {/* ─── Score Dashboard ─── */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white sm:text-2xl mb-6">
            Area Scores
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {scoreCards.map((card, i) => (
              <ScoreCard key={card.label} {...card} delay={i * 0.06} />
            ))}
          </div>
        </section>

        {/* ─── Settle-Fast Score ─── */}
        <section>
          <SettleFastScore area={area} />
        </section>

        {/* ─── Best For / Watch Out ─── */}
        <section className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 p-6"
          >
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-4">
              <CheckCircle2 className="w-5 h-5" />
              Best For
            </h3>
            <ul className="space-y-2.5">
              {area.bestFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            {area.pros.length > 0 && (
              <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-2">
                  Key Advantages
                </p>
                <ul className="space-y-2">
                  {area.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-6"
          >
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-amber-800 dark:text-amber-300 mb-4">
              <AlertTriangle className="w-5 h-5" />
              Watch Out
            </h3>
            <ul className="space-y-2.5">
              {area.watchOut.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            {area.cons.length > 0 && (
              <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-800/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 mb-2">
                  Things to Consider
                </p>
                <ul className="space-y-2">
                  {area.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </section>

        {/* ─── Trade-off Explainer ─── */}
        <section>
          <TradeoffExplainer area={area} />
        </section>

        {/* ─── Nearby Essentials ─── */}
        <section>
          <NearbyEssentials places={area.nearbyPlaces} />
        </section>

        {/* ─── Area Personas ─── */}
        <section>
          <AreaPersonas area={area} />
        </section>

        {/* ─── Daily Life Preview ─── */}
        <section>
          <DailyLifePreview area={area} />
        </section>

        {/* ─── Lifestyle Tags ─── */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white sm:text-2xl mb-4">
            Lifestyle Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {area.lifestyleTags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/50"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </section>

        {/* ─── Properties in This Area ─── */}
        {areaProperties.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white sm:text-2xl mb-6">
              Properties in {area.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            {areaProperties.length > 6 && (
              <div className="mt-6 text-center">
                <Link href={`/discover?locality=${encodeURIComponent(area.name)}`}>
                  <Button variant="outline" className="gap-2">
                    View all {areaProperties.length} properties
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </section>
        )}

        {/* ─── Settlement Checklist ─── */}
        <section>
          <SettlementChecklist variant="compact" />
        </section>

        {/* ─── Move Simulator ─── */}
        <section>
          {(() => {
            const otherArea = areas.find(a => a.slug !== area.slug && (a.demand === "High" || a.demand === "Very High"));
            return otherArea ? <MoveSimulator areaA={area} areaB={otherArea} /> : null;
          })()}
        </section>

        {/* ─── Compare CTA ─── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-3">
            Compare with other areas
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-6 max-w-lg mx-auto">
            Not sure if {area.name} is the right fit? Compare scores, rent, lifestyle, and more across Jaipur neighborhoods.
          </p>
          <Link href="/compare-areas">
            <Button
              size="lg"
              className="gap-2 bg-white text-indigo-700 hover:bg-white/90 font-semibold shadow-lg px-8 rounded-xl"
            >
              Compare Areas
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.section>

        {/* ─── Post-Move Feedback ─── */}
        <section>
          <PostMoveFeedback areaName={area.name} />
        </section>
      </div>
    </div>
  );
}
