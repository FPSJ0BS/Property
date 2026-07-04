"use client";

import { motion } from "framer-motion";
import { Search, Building2, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-40 overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.3),transparent_60%)]" />
      <div className="absolute inset-0 bg-dots opacity-[0.06]" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-[10%] w-[300px] h-[300px] bg-white/[0.04] rounded-full blur-3xl animate-orb-1" />
      <div className="absolute bottom-1/4 right-[15%] w-[250px] h-[250px] bg-violet-400/10 rounded-full blur-3xl animate-orb-2" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-indigo-200 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8">
            <Sparkles className="w-3 h-3" />
            Get Started
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tight text-white leading-[1.1] font-display">
            Ready for a smarter
            <br />rental experience?
          </h2>
          <p className="mt-6 text-base sm:text-lg text-indigo-200/80 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re searching, listing, or managing &mdash; 99tolet&apos;s AI
            platform is ready for you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50 gap-2.5 shadow-2xl shadow-indigo-900/40 w-full sm:w-auto h-12 px-7 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              asChild
            >
              <Link href="/discover">
                <Search className="w-4 h-4" />
                Start AI Search
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 gap-2 w-full sm:w-auto h-12 px-7 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              asChild
            >
              <Link href="/contact">
                <Building2 className="w-4 h-4" />
                List Your Property
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-transparent text-white/70 hover:text-white hover:bg-white/10 gap-2 w-full sm:w-auto h-12 px-6 text-[15px]"
              asChild
            >
              <Link href="/contact">
                <MessageCircle className="w-4 h-4" />
                Talk to Us
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
