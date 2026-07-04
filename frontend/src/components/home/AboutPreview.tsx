"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const milestones = [
  { year: "2018", event: "Founded as Jaipur\u2019s trusted rental service", icon: "\ud83c\udfe0" },
  { year: "2021", event: "Scaled to 5,000+ managed properties", icon: "\ud83d\udcc8" },
  { year: "2024", event: "Launched RentalBrain\u2122 \u2014 AI matching engine", icon: "\ud83e\udde0" },
  { year: "2025", event: "TrustShield\u2122 and RentIQ\u2122 go live", icon: "\ud83d\udee1\ufe0f" },
  { year: "2026", event: "Building India\u2019s AI Leasing OS", icon: "\ud83d\ude80" },
];

export default function AboutPreview() {
  return (
    <section className="py-20 sm:py-36 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 rounded-full border border-indigo-100/80 dark:border-indigo-800/50 mb-6">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-7 font-display leading-[1.15]">
              From Jaipur&apos;s trusted rental operator to{" "}
              <span className="gradient-text">India&apos;s AI Leasing OS</span>
            </h2>
            <div className="space-y-4 text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <p>
                99tolet started on the streets of Jaipur &mdash; helping families find
                trustworthy homes and landlords find reliable tenants. We saw the
                broken rental experience up close: the distrust, the opacity, the
                chaos after agreements were signed.
              </p>
              <p>
                We didn&apos;t just want to digitize this. We wanted to reimagine it.
                So we built an AI-native platform that brings intelligence,
                verification, and operational depth to every stage of the rental
                lifecycle.
              </p>
              <p className="font-medium text-slate-700 dark:text-slate-200">
                Today, we&apos;re building the most intelligent rental platform in
                India &mdash; and we&apos;re just getting started.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <Button
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 gap-2 h-11 px-6 font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-px"
                asChild
              >
                <Link href="/about">
                  Our Full Story
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Built in Jaipur
              </div>
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-indigo-50/70 to-violet-50/50 dark:from-indigo-950/40 dark:to-violet-950/30 rounded-2xl p-6 sm:p-8 border border-indigo-100/40 dark:border-indigo-800/30">
              <div className="space-y-3 sm:space-y-3.5">
                {milestones.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-3 sm:gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 border border-white/80 dark:border-slate-800/60 shadow-sm hover:shadow-md hover:shadow-indigo-500/[0.04] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                        {item.year}
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-snug">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
