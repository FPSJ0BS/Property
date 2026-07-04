"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { areas } from "@/data/areas";
import AreaComparison from "@/components/cityfit/AreaComparison";
import AreaFitCard from "@/components/cityfit/AreaFitCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NeighborhoodExplorer from "@/components/engagement/NeighborhoodExplorer";

export default function CompareAreasPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleArea = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  };

  const selectedAreas = areas.filter((a) => selected.includes(a.slug));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-indigo-100/40 dark:from-indigo-950/30 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 text-xs font-bold uppercase tracking-wider px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              CityFit&trade;
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
              Compare Neighborhoods
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Find the area that fits your life. Select 2-3 areas to compare scores, rent, lifestyle, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Explore Neighborhoods ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <NeighborhoodExplorer />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* ─── Area Selector ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
            Select areas to compare (up to 3)
          </p>
          <div className="flex flex-wrap gap-2.5">
            {areas.map((area) => {
              const isSelected = selected.includes(area.slug);
              return (
                <button
                  key={area.slug}
                  onClick={() => toggleArea(area.slug)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    isSelected
                      ? "bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500 shadow-lg shadow-indigo-500/20"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md"
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  )}
                  {area.name}
                  {isSelected && (
                    <X className="w-3 h-3 ml-1 opacity-70 hover:opacity-100" />
                  )}
                </button>
              );
            })}
          </div>
          {selected.length > 0 && selected.length < 2 && (
            <p className="mt-3 text-xs text-amber-600 dark:text-amber-400 font-medium">
              Select at least one more area to compare
            </p>
          )}
        </motion.div>

        {/* ─── Comparison Table ─── */}
        <AnimatePresence mode="wait">
          {selectedAreas.length >= 2 && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <AreaComparison areas={selectedAreas} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Selected Area Cards (when comparison shown) ─── */}
        <AnimatePresence>
          {selectedAreas.length >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-12"
            >
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">
                Selected Areas
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedAreas.map((area) => (
                  <AreaFitCard key={area.id} area={area} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── All Areas Grid (when none selected or as fallback) ─── */}
        {selected.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">
              All Neighborhoods
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {areas.map((area) => (
                <AreaFitCard key={area.id} area={area} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Settlement CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-3">
            Moving to a new city?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-6 max-w-lg mx-auto">
            Use our settlement guide to get set up in your first 30 days — utilities, registrations, essentials, and more.
          </p>
          <Link href="/settle-in-city">
            <Button
              size="lg"
              className="gap-2 bg-white text-emerald-700 hover:bg-white/90 font-semibold shadow-lg px-8 rounded-xl"
            >
              Settlement Guide
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
