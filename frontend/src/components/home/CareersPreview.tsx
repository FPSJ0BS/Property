"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Brain, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CareersPreview() {
  return (
    <section className="relative py-20 sm:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-dots opacity-[0.04]" />

      {/* Animated accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-indigo-300 bg-indigo-500/10 backdrop-blur-sm rounded-full border border-indigo-500/20 mb-8">
            <Rocket className="w-3 h-3" />
            We&apos;re Hiring
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display leading-[1.1] mb-5">
            Build the future of
            <br />
            <span className="text-indigo-400">rental intelligence</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            Engineers, designers, data scientists, and operators &mdash; building an AI
            operating system for the entire rental lifecycle.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
            {[
              { icon: Brain, label: "AI-First Culture" },
              { icon: Users, label: "Small, Senior Team" },
              { icon: Code, label: "Real Engineering" },
              { icon: Rocket, label: "Category-Defining" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-[13px] text-slate-300/80">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <item.icon className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                {item.label}
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-100 gap-2 h-12 px-8 text-[15px] font-semibold shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
            asChild
          >
            <Link href="/careers">
              View Open Roles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
