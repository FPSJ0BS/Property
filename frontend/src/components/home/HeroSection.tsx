"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mic,
  Sparkles,
  ShieldCheck,
  Brain,
  ArrowRight,
  Building2,
  Users,
  Zap,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import VoiceAgent from "@/components/shared/VoiceAgent";
import { useLanguage } from "@/i18n/LanguageContext";

const rotatingPhrases = [
  "intelligence",
  "verification",
  "fair pricing",
  "lifecycle ops",
];

const parsedChips = [
  { label: "Budget", value: "Under ₹25,000", color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50" },
  { label: "Area", value: "Vaishali Nagar", color: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50" },
  { label: "Type", value: "2BHK", color: "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/50" },
  { label: "Need", value: "Parking", color: "bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700" },
  { label: "Trust", value: "Verified Landlord", color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50" },
];

function getExampleSearches(lang: string): string[] {
  switch (lang) {
    case "hi":
      return [
        "वैशाली नगर में ₹25 हजार से कम 2BHK पार्किंग के साथ",
        "सत्यापित मकान मालिक और कम डिपॉजिट वाला फैमिली किराया",
        "जयपुर में हाई विजिबिलिटी और आसान एक्सेस वाला ऑफिस",
        "IT पार्क के पास वर्किंग प्रोफेशनल के लिए फर्निश्ड स्टूडियो",
      ];
    case "hinglish":
      return [
        "Vaishali Nagar mein 2BHK under ₹25k parking ke saath",
        "Family rental verified landlord aur low deposit ke saath",
        "Jaipur mein office space high visibility aur easy access",
        "IT park ke paas furnished studio working professional ke liye",
      ];
    default:
      return [
        "2BHK near Vaishali Nagar under ₹25k with parking",
        "Family rental with verified landlord and low deposit",
        "Office space in Jaipur with high visibility and easy access",
        "Furnished studio near IT park for working professional",
      ];
  }
}

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const { lang, t } = useLanguage();

  const exampleSearches = getExampleSearches(lang);

  const trustStats = [
    { icon: Building2, value: "10,000+", label: t("hero.verifiedProperties") },
    { icon: Users, value: "25,000+", label: t("hero.happyTenants") },
    { icon: ShieldCheck, value: "98%", label: t("hero.trustScoreAvg") },
    { icon: Zap, value: "5 Days", label: t("hero.avgMoveInTime") },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleVoiceResult = (transcript: string) => {
    setSearchQuery(transcript);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Enhanced layered light background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(79,70,229,0.07),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/20 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950" />
        <div className="absolute inset-0 bg-dots opacity-30 dark:opacity-20" />

        {/* Enhanced animated orbs — richer for light mode */}
        <div className="absolute top-10 right-[8%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-200/40 via-violet-200/25 to-transparent dark:from-indigo-600/20 dark:to-violet-600/15 blur-[80px] animate-orb-1" />
        <div className="absolute bottom-0 left-[3%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-violet-200/30 via-indigo-100/20 to-transparent dark:from-violet-600/15 dark:to-indigo-500/15 blur-[80px] animate-orb-2" />
        <div className="absolute top-[40%] left-[40%] w-[700px] h-[500px] rounded-full bg-gradient-to-br from-indigo-100/30 to-transparent dark:from-indigo-900/20 dark:to-transparent blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-20 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-indigo-700 dark:text-indigo-300 bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-full border border-indigo-200/60 dark:border-indigo-900/50 shadow-sm shadow-indigo-500/[0.08] dark:shadow-indigo-500/10 mb-8">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                </span>
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12] sm:leading-[1.08] font-display"
            >
              {t("hero.headline1")}
              <br className="hidden sm:block" />{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.4 }}
                    className="gradient-text-shimmer"
                  >
                    {rotatingPhrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-slate-300 dark:text-slate-600">,</span>
              <br className="hidden sm:block" />{" "}
              {t("hero.headline3")}<span className="text-indigo-500">.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 sm:mt-7 text-base sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0"
            >
              {t("hero.subheadline")}
            </motion.p>

            {/* ─── AI Search Bar ─── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 sm:mt-12 max-w-2xl mx-auto"
            >
              <div
                className={`relative rounded-2xl transition-all duration-500 bg-white dark:bg-slate-900 border-gradient ${
                  focused
                    ? "shadow-2xl shadow-indigo-500/[0.12] dark:shadow-indigo-500/20 ring-2 ring-indigo-400/30 dark:ring-indigo-500/50 glow-indigo"
                    : "shadow-xl shadow-slate-900/[0.05] dark:shadow-black/30 ring-1 ring-slate-200/60 dark:ring-slate-700/80 hover:ring-indigo-200/50 dark:hover:ring-indigo-700/60 hover:shadow-2xl hover:shadow-indigo-500/[0.06]"
                }`}
              >
                {/* AI label pill */}
                <div className="absolute -top-3.5 left-6 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold rounded-full shadow-lg shadow-indigo-500/30 btn-shine">
                    <Sparkles className="w-3 h-3" />
                    <span>AI-Powered Search</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-4 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100/50 dark:border-indigo-800/30 shrink-0">
                      <Search className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <input
                      type="text"
                      placeholder={t("hero.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => { setFocused(true); setShowSuggestions(true); }}
                      onBlur={() => { setFocused(false); setTimeout(() => setShowSuggestions(false), 200); }}
                      className="flex-1 text-[15px] sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-transparent outline-none font-medium min-w-0"
                    />
                  </div>
                  <div className="flex items-center gap-2 sm:shrink-0">
                    {/* Voice Button — opens real voice agent */}
                    <button
                      onClick={() => setVoiceOpen(true)}
                      className="relative p-2.5 text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 min-w-[44px] min-h-[44px] flex items-center justify-center group/voice"
                      title="Voice Search"
                    >
                      <Mic className="w-5 h-5 relative z-10" />
                      {/* Pulse ring */}
                      <span className="absolute inset-0 rounded-xl border-2 border-indigo-300/0 group-hover/voice:border-indigo-300/40 dark:group-hover/voice:border-indigo-500/40 transition-all duration-300 group-hover/voice:scale-110" />
                    </button>
                    <Button
                      size="default"
                      className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 px-6 h-11 sm:h-10 font-semibold transition-all duration-300 hover:-translate-y-px flex-1 sm:flex-none min-h-[44px] btn-shine"
                      asChild
                    >
                      <Link href="/discover">
                        {t("common.search")}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Suggestion chips */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 flex items-center gap-2 overflow-x-auto scrollbar-hide sm:flex-wrap sm:overflow-x-visible">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mr-1 shrink-0">{t("hero.tryLabel")}</span>
                  {exampleSearches.map((search, i) => (
                    <button
                      key={i}
                      onClick={() => setSearchQuery(search)}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-all duration-200 hover:-translate-y-px whitespace-nowrap shrink-0 sm:shrink sm:whitespace-normal min-h-[36px] flex items-center"
                    >
                      {search}
                    </button>
                  ))}
                </div>

                {/* Dropdown suggestions */}
                <AnimatePresence>
                  {showSuggestions && searchQuery.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-slate-900/10 dark:shadow-black/30 border border-slate-200/80 dark:border-slate-700/80 p-4 z-20"
                    >
                      {/* Voice search banner */}
                      <button
                        onClick={() => { setShowSuggestions(false); setVoiceOpen(true); }}
                        className="w-full flex items-center gap-3 px-4 py-3 mb-3 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 rounded-xl border border-indigo-100/60 dark:border-indigo-800/30 hover:shadow-md hover:shadow-indigo-500/10 transition-all group/vb"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover/vb:scale-105 transition-transform">
                          <Mic className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white block">Voice Search</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">Speak your requirement — AI understands naturally</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-indigo-400 ml-auto" />
                      </button>

                      <div className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mb-3">Trending in Jaipur</div>
                      <div className="space-y-1">
                        {["Vaishali Nagar", "Malviya Nagar", "C-Scheme", "Jagatpura IT Hub"].map((area) => (
                          <button
                            key={area}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors text-left min-h-[44px]"
                          >
                            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                            <span>{area}</span>
                            <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">trending</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Parsed chips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-5 flex flex-wrap items-center justify-center gap-2 px-2 sm:px-0"
              >
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                  <Brain className="w-3 h-3 text-indigo-400" />
                  {t("hero.aiParses")}
                </span>
                {parsedChips.map((chip, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + i * 0.08 }}
                    className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${chip.color}`}
                  >
                    {chip.label}: {chip.value}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-14 sm:mt-20"
            >
              <div className="max-w-3xl mx-auto card-premium rounded-2xl p-5 sm:p-8 !shadow-none !border-slate-200/50 dark:!border-slate-800/50 bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8">
                  {trustStats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="text-center group"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/60 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 mb-3 group-hover:shadow-lg group-hover:shadow-indigo-500/[0.08] dark:group-hover:shadow-indigo-500/20 transition-all duration-300 group-hover:-translate-y-0.5">
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div className="text-xl sm:text-[1.75rem] font-bold text-slate-900 dark:text-white font-display leading-none">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 text-[12px] text-slate-400 dark:text-slate-500"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-800 dark:to-violet-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-300">
                    {["A", "R", "P", "S"][i]}
                  </div>
                ))}
              </div>
              <span>{t("hero.joinedBy")} <strong className="text-slate-600 dark:text-slate-300">2,400+</strong> {t("hero.usersThisMonth")}</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* Voice Agent Modal */}
      <VoiceAgent
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onResult={handleVoiceResult}
      />
    </>
  );
}
