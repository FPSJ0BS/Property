"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Download,
  Lightbulb,
  MessageCircle,
  ShoppingBag,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";
import SettlementChecklist from "@/components/cityfit/SettlementChecklist";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const proTips = [
  {
    icon: MessageCircle,
    title: "Join local WhatsApp groups",
    description: "Ask your RWA or neighbors for area-specific groups. These are goldmines for recommendations, alerts, and services.",
  },
  {
    icon: ShoppingBag,
    title: "Visit nearby markets on weekends",
    description: "Weekend markets often have fresh produce at better prices. It also helps you learn the area faster.",
  },
  {
    icon: MapPin,
    title: "Walk the neighborhood in the first week",
    description: "Spend an hour walking around. Find shortcuts, backup routes, ATMs, pharmacies, and that perfect chai stall.",
  },
  {
    icon: Users,
    title: "Introduce yourself to at least 3 neighbors",
    description: "A friendly intro goes a long way. Neighbors are your first support system in emergencies and daily life.",
  },
  {
    icon: Lightbulb,
    title: "Save all service provider numbers",
    description: "Electrician, plumber, water delivery, gas agency, ISP helpline. You will need them sooner than you think.",
  },
];

export default function SettleInCityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-emerald-100/40 dark:from-emerald-950/30 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              CityFit&trade;
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
              Settle into your new city faster
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Your first 30 days matter the most. This interactive checklist guides you through everything — from utilities and paperwork to community and daily life.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ─── Main: Full Settlement Checklist ─── */}
          <div className="lg:col-span-2">
            <SettlementChecklist variant="full" />
          </div>

          {/* ─── Side Panel: Pro Tips ─── */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                  <Lightbulb className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Pro Tips for New Residents
                </h3>
              </div>

              <div className="space-y-4">
                {proTips.map((tip, i) => {
                  const Icon = tip.icon;
                  return (
                    <motion.div
                      key={tip.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {tip.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {tip.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* ─── Area Recommendation CTA ─── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 p-6 text-center"
            >
              <Sparkles className="w-8 h-8 text-white/60 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white font-display mb-2">
                Not sure which area?
              </h4>
              <p className="text-white/80 text-sm mb-4">
                Let AI help you find the best neighborhood based on your lifestyle and preferences.
              </p>
              <Link href="/compare-areas">
                <Button
                  size="lg"
                  className="w-full gap-2 bg-white text-indigo-700 hover:bg-white/90 font-semibold shadow-lg rounded-xl"
                >
                  Explore Areas
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* ─── Download Checklist CTA ─── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center"
            >
              <Download className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white font-display mb-2">
                Download Checklist
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Get a printable PDF of the full settlement checklist to keep handy.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 rounded-xl"
                onClick={() => {
                  alert("Download feature coming soon! The checklist PDF will be available shortly.");
                }}
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
