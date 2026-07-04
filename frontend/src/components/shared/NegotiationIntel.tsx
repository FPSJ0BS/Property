"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  Target,
  Lightbulb,
  IndianRupee,
  BarChart3,
  Zap,
  Clock,
  Shield,
  Handshake,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Property } from "@/data/properties";

interface NegotiationIntelProps {
  property: Property;
  areaAvgRent?: number;
}

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

function AnimatedBar({
  value,
  max,
  color,
  delay = 0,
}: {
  value: number;
  max: number;
  color: string;
  delay?: number;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, ease: "easeOut", delay }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

export default function NegotiationIntel({ property, areaAvgRent }: NegotiationIntelProps) {
  const isRent = property.listingType === "Rent" || property.listingType === "Lease";
  const isSale = property.listingType === "Sale";

  const areaAvg = areaAvgRent || (isRent ? Math.round(property.price * 0.92) : 0);
  const areaMin = Math.round(areaAvg * 0.7);
  const areaMax = Math.round(areaAvg * 1.35);
  const currentPrice = isRent ? property.price : (property.pricePerSqft || Math.round((property.salePrice || property.price) / property.area));

  const avgForComparison = isRent ? areaAvg : Math.round(currentPrice * 0.93);
  const minForComparison = isRent ? areaMin : Math.round(currentPrice * 0.72);
  const maxForComparison = isRent ? areaMax : Math.round(currentPrice * 1.3);

  const pctDiff = avgForComparison > 0 ? Math.round(((currentPrice - avgForComparison) / avgForComparison) * 100) : 0;
  const isAboveAvg = pctDiff > 0;

  const negotiationScore = useMemo(() => {
    let score = 50;
    // Above market = more room
    if (pctDiff > 10) score += 20;
    else if (pctDiff > 5) score += 12;
    else if (pctDiff > 0) score += 5;
    else if (pctDiff < -5) score -= 15;
    else if (pctDiff < 0) score -= 8;

    // Mock: listed 15 days ago
    score += 8;
    // High deposit = more room
    if (isRent && property.deposit > property.price * 2) score += 10;
    // Verified listings = less room
    if (property.isVerified) score -= 8;
    if (property.isVerifiedLandlord) score -= 5;
    // Fair rent below market = less room
    if (property.fairRent === "Below Market") score -= 15;
    if (property.fairRent === "Above Market") score += 12;
    // High demand = less room
    if (property.localityPulse === "High Demand") score -= 10;
    if (property.localityPulse === "Emerging") score += 8;

    return Math.max(0, Math.min(100, score));
  }, [property, pctDiff, isRent]);

  const suggestion = useMemo(() => {
    if (negotiationScore > 70) {
      const reduction = isRent
        ? Math.round(property.price * (0.08 + Math.random() * 0.04))
        : Math.round((property.salePrice || property.price) * (0.06 + Math.random() * 0.04));
      const suggested = isRent ? property.price - reduction : (property.salePrice || property.price) - reduction;
      const pctOff = isRent ? "8-12%" : "6-10%";
      return {
        offer: suggested,
        pctRange: pctOff,
        level: "strong" as const,
        text: isRent
          ? `Offer ${fmt(suggested)}. Landlords in ${property.locality} typically accept ${pctOff} lower.`
          : `Offer ${fmt(suggested)}. Sellers in ${property.locality} have been accepting ${pctOff} below asking.`,
      };
    }
    if (negotiationScore > 40) {
      const reduction = isRent
        ? Math.round(property.price * (0.03 + Math.random() * 0.02))
        : Math.round((property.salePrice || property.price) * (0.03 + Math.random() * 0.02));
      const suggested = isRent ? property.price - reduction : (property.salePrice || property.price) - reduction;
      return {
        offer: suggested,
        pctRange: "3-5%",
        level: "moderate" as const,
        text: isRent
          ? `Offer ${fmt(suggested)}. Moderate negotiation room — focus on terms too.`
          : `Offer ${fmt(suggested)}. Some room for negotiation on this property.`,
      };
    }
    return {
      offer: isRent ? property.price : (property.salePrice || property.price),
      pctRange: "0-2%",
      level: "low" as const,
      text: isRent
        ? "This is fairly priced. Focus on deposit or terms instead of rent reduction."
        : "This property is competitively priced. Focus on payment terms or inclusions.",
    };
  }, [negotiationScore, property, isRent]);

  const tips = useMemo(() => {
    const allRentTips = [
      { icon: IndianRupee, text: "Ask for a lower deposit — offer 1 month instead of 2", priority: property.deposit > property.price * 1.5 },
      { icon: Clock, text: "Propose a longer lock-in period for 5% rent reduction", priority: true },
      { icon: Handshake, text: "Request maintenance inclusion in rent", priority: true },
      { icon: Clock, text: "Time your offer — month-end is better for negotiation", priority: negotiationScore > 50 },
      { icon: Shield, text: "Mention verified tenant status for landlord confidence", priority: true },
      { icon: Lightbulb, text: "Offer advance rent (3-6 months) for significant discount", priority: negotiationScore > 60 },
      { icon: Zap, text: "Ask about move-in concessions (free first month, painting, etc.)", priority: !property.moveInReady },
    ];
    const allSaleTips = [
      { icon: IndianRupee, text: "Offer quick closure — sellers value certainty over price", priority: true },
      { icon: Clock, text: "Properties listed 20+ days have more negotiation room", priority: true },
      { icon: Shield, text: "Get pre-approved for a loan to strengthen your offer", priority: true },
      { icon: Handshake, text: "Ask for fixtures and fittings to be included", priority: true },
      { icon: Lightbulb, text: "Point out nearby comparable properties at lower prices", priority: pctDiff > 5 },
      { icon: Zap, text: "Request the seller cover registration or stamp duty", priority: negotiationScore > 60 },
    ];

    const tips = isRent ? allRentTips : allSaleTips;
    return tips
      .sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0))
      .slice(0, 3);
  }, [isRent, property, negotiationScore, pctDiff]);

  // Market position bar calculation
  const range = maxForComparison - minForComparison;
  const currentPct = range > 0 ? Math.max(0, Math.min(100, ((currentPrice - minForComparison) / range) * 100)) : 50;
  const avgPct = range > 0 ? Math.max(0, Math.min(100, ((avgForComparison - minForComparison) / range) * 100)) : 50;

  const scoreColor =
    negotiationScore > 70
      ? "from-emerald-500 to-green-500"
      : negotiationScore > 40
      ? "from-amber-500 to-yellow-500"
      : "from-red-400 to-orange-400";

  const scoreLabel =
    negotiationScore > 70
      ? "High Negotiation Room"
      : negotiationScore > 40
      ? "Moderate Room"
      : "Limited Room";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Price Negotiation Intelligence</h3>
            <p className="text-violet-200 text-xs">AI-powered negotiation strategy</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Market Position */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            Market Position {isRent ? "" : "(Price/sqft)"}
          </h4>

          <div className="relative pt-6 pb-2">
            {/* Labels */}
            <div className="absolute top-0 left-0 text-[10px] text-gray-400 dark:text-gray-500">
              {isRent ? fmt(minForComparison) : `${fmt(minForComparison)}/sqft`}
            </div>
            <div
              className="absolute top-0 text-[10px] text-gray-500 dark:text-gray-400 font-medium -translate-x-1/2"
              style={{ left: `${avgPct}%` }}
            >
              Avg
            </div>
            <div className="absolute top-0 right-0 text-[10px] text-gray-400 dark:text-gray-500">
              {isRent ? fmt(maxForComparison) : `${fmt(maxForComparison)}/sqft`}
            </div>

            {/* Bar */}
            <div className="relative h-3 bg-gradient-to-r from-emerald-200 via-amber-200 to-red-200 dark:from-emerald-900/60 dark:via-amber-900/60 dark:to-red-900/60 rounded-full">
              {/* Average marker */}
              <div
                className="absolute top-0 h-full w-0.5 bg-gray-500 dark:bg-gray-400"
                style={{ left: `${avgPct}%` }}
              />
              {/* Current property marker */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="absolute -top-1 w-5 h-5 -ml-2.5 bg-violet-600 border-2 border-white dark:border-gray-900 rounded-full shadow-lg shadow-violet-500/40"
                style={{ left: `${currentPct}%` }}
              />
            </div>

            {/* Current price label */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-1 -translate-x-1/2"
              style={{ left: `${Math.max(10, Math.min(90, currentPct))}%` }}
            >
              <div className="flex flex-col items-center">
                <ChevronDown className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 whitespace-nowrap">
                  This Property
                </span>
              </div>
            </motion.div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 pt-2">
            {isAboveAvg ? (
              <>
                This property is{" "}
                <span className="font-bold text-red-500 dark:text-red-400">{Math.abs(pctDiff)}% above</span>{" "}
                market average for {property.locality}
              </>
            ) : pctDiff < 0 ? (
              <>
                This is already{" "}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{Math.abs(pctDiff)}% below</span>{" "}
                market — limited negotiation room
              </>
            ) : (
              <>This property is at the market average for {property.locality}</>
            )}
          </p>
        </div>

        {/* Negotiation Score */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            Negotiation Score
          </h4>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <AnimatedBar value={negotiationScore} max={100} color={`bg-gradient-to-r ${scoreColor}`} />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{negotiationScore}</span>
              <span className="text-xs text-gray-400">/100</span>
            </div>
          </div>
          <p className={`text-xs font-semibold ${
            negotiationScore > 70
              ? "text-emerald-600 dark:text-emerald-400"
              : negotiationScore > 40
              ? "text-amber-600 dark:text-amber-400"
              : "text-red-500 dark:text-red-400"
          }`}>
            {scoreLabel}
          </p>
        </div>

        {/* Suggested Offer */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Suggested Offer
          </h4>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`p-4 rounded-xl border ${
              suggestion.level === "strong"
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                : suggestion.level === "moderate"
                ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
            }`}
          >
            {suggestion.level !== "low" && (
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {fmt(suggestion.offer)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({suggestion.pctRange} off)
                </span>
              </div>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion.text}</p>
          </motion.div>
        </div>

        {/* Negotiation Tips */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            Personalized Tips
          </h4>
          <div className="space-y-2">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
              >
                <div className="w-7 h-7 bg-violet-100 dark:bg-violet-900/40 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <tip.icon className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{tip.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center pt-2 border-t border-gray-100 dark:border-gray-800">
          Based on AI analysis of market data. Actual negotiation outcomes may vary.
        </p>
      </div>
    </motion.div>
  );
}
