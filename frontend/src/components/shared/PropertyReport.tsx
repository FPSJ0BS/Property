"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Share2,
  Shield,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Star,
  Building2,
  MapPin,
  Bed,
  Bath,
  Layers,
  Sofa,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Footprints,
  ShieldAlert,
  Bus,
  GraduationCap,
  Heart,
  TreePine,
  ShoppingBag,
  QrCode,
  FileText,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { Property } from "@/data/properties";
import { Area } from "@/data/areas";

interface PropertyReportProps {
  property: Property;
  area?: Area;
  isOpen: boolean;
  onClose: () => void;
}

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

function ScoreRing({
  value,
  max = 100,
  label,
  color,
  size = 90,
}: {
  value: number;
  max?: number;
  label: string;
  color: string;
  size?: number;
}) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-lg font-bold text-gray-900 dark:text-white">{value}</span>
        <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 border-b border-violet-200 dark:border-violet-800 pb-1.5 mb-3 print:text-violet-700 print:border-violet-300">
      {children}
    </h3>
  );
}

export default function PropertyReport({ property, area, isOpen, onClose }: PropertyReportProps) {
  const [copied, setCopied] = useState(false);
  const reportId = `RPT-2026-${property.id.toString().padStart(4, "0")}`;
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const recommendation = useMemo(() => {
    if (property.aiMatchScore > 90 && property.trustScore > 85) {
      return {
        verdict: "Strongly Recommended",
        detail: "High match with verified trust signals. This property aligns exceptionally well with market standards and trust parameters.",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800",
      };
    }
    if (property.fairRent === "Below Market") {
      return {
        verdict: "Excellent Value",
        detail: "Below market pricing detected. This property offers significant savings compared to area averages.",
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
      };
    }
    if (property.aiMatchScore > 80) {
      return {
        verdict: "Recommended",
        detail: "Good fit with minor considerations. Most key parameters are within acceptable range.",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800",
      };
    }
    return {
      verdict: "Worth Considering",
      detail: "Review trade-offs carefully. Some parameters may require additional due diligence before committing.",
      color: "text-gray-600 dark:text-gray-400",
      bg: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
    };
  }, [property]);

  const financial = useMemo(() => {
    if (property.listingType === "Rent") {
      const monthly = property.price;
      const deposit = property.deposit;
      const maintenance = Math.round(monthly * 0.05);
      const annual = monthly * 12 + maintenance * 12;
      return { monthly, deposit, maintenance, annual, type: "Rent" as const };
    }
    if (property.listingType === "Sale") {
      const price = property.salePrice || property.price;
      const downPayment = Math.round(price * 0.2);
      const registration = Math.round(price * 0.07);
      const emi = property.emiEstimate || Math.round((price - downPayment) * 0.0075);
      const totalCost = price + registration;
      return { price, downPayment, registration, emi, totalCost, type: "Sale" as const };
    }
    const monthly = property.price;
    const lockIn = property.lockInPeriod || "12 months";
    const lockInMonths = parseInt(lockIn) || 12;
    const totalCommitment = monthly * lockInMonths;
    return { monthly, lockIn, lockInMonths, totalCommitment, type: "Lease" as const };
  }, [property]);

  const nearbyCounts = useMemo(() => {
    if (!area) return null;
    const counts: Record<string, number> = {};
    area.nearbyPlaces.forEach((p) => {
      counts[p.type] = (counts[p.type] || 0) + 1;
    });
    return counts;
  }, [area]);

  const settleScore = useMemo(() => {
    if (!area) return null;
    const raw =
      area.walkScore * 0.2 +
      area.safetyScore * 0.25 +
      area.transitScore * 0.15 +
      area.familyScore * 0.2 +
      area.professionalScore * 0.2;
    return Math.round(raw);
  }, [area]);

  const handleShare = () => {
    const url = `https://99tolet.com/property/${property.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto print:static print:bg-white print:backdrop-blur-none"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-3xl my-4 mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none print:my-0 print:mx-0 print:max-w-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Print styles */}
            <style>{`
              @media print {
                body * { visibility: hidden; }
                .report-printable, .report-printable * { visibility: visible; }
                .report-printable { position: absolute; left: 0; top: 0; width: 100%; }
                .no-print { display: none !important; }
                @page { margin: 12mm; size: A4; }
              }
            `}</style>

            {/* Close button */}
            <button
              onClick={onClose}
              className="no-print absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="report-printable">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-5 sm:px-8 print:from-violet-700 print:to-indigo-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-white">Property Intelligence Report</h1>
                      <p className="text-violet-200 text-xs mt-0.5">by 99tolet AI</p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-violet-200">{reportId}</p>
                    <p className="text-xs text-violet-200">Generated {today}</p>
                  </div>
                </div>
                <div className="sm:hidden mt-2 flex gap-3 text-xs text-violet-200">
                  <span>{reportId}</span>
                  <span>{today}</span>
                </div>
              </div>

              <div className="px-6 py-6 sm:px-8 space-y-6">
                {/* PROPERTY SUMMARY */}
                <section>
                  <SectionTitle>Property Summary</SectionTitle>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <h2 className="text-base font-semibold text-gray-900 dark:text-white">{property.title}</h2>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {property.address}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-medium">
                          {property.listingType}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                          {property.subType}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 capitalize">
                          {property.type}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                        {fmt(property.listingType === "Sale" ? property.salePrice || property.price : property.price)}
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                          {property.listingType === "Rent" ? "/month" : property.listingType === "Lease" ? "/month" : ""}
                        </span>
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> {property.area} sqft</div>
                        {property.bedrooms && <div className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {property.bedrooms} Beds</div>}
                        {property.bathrooms && <div className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {property.bathrooms} Baths</div>}
                        {property.floorNumber && <div className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Floor {property.floorNumber}/{property.totalFloors}</div>}
                        <div className="flex items-center gap-1"><Sofa className="w-3.5 h-3.5" /> {property.furnishing}</div>
                        {property.facing && <div className="flex items-center gap-1">{property.facing} Facing</div>}
                      </div>
                    </div>
                    {/* Score rings */}
                    <div className="flex sm:flex-col gap-6 items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <ScoreRing value={property.aiMatchScore} label="AI Match" color="#8b5cf6" />
                      </div>
                      <div className="relative flex items-center justify-center">
                        <ScoreRing value={property.trustScore} label="Trust" color="#10b981" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* INTELLIGENCE SECTION */}
                <section>
                  <SectionTitle>Intelligence Analysis</SectionTitle>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* RentIQ */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-violet-500" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                          {property.listingType === "Sale" ? "InvestIQ Analysis" : "RentIQ\u2122 Analysis"}
                        </h4>
                      </div>
                      {property.listingType !== "Sale" && property.fairRent && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Fair Rent Verdict:</span>
                          <span
                            className={`text-sm font-bold ${
                              property.fairRent === "Below Market"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : property.fairRent === "Fair"
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-red-500 dark:text-red-400"
                            }`}
                          >
                            {property.fairRent}
                          </span>
                        </div>
                      )}
                      {property.listingType === "Sale" && (
                        <>
                          {property.investmentScore && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Investment Score</span>
                              <span className="font-bold text-gray-900 dark:text-white">{property.investmentScore}/100</span>
                            </div>
                          )}
                          {property.appreciationTrend && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Appreciation</span>
                              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" /> {property.appreciationTrend}
                              </span>
                            </div>
                          )}
                          {property.pricePerSqft && area && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Price/sqft</span>
                              <span className="font-bold text-gray-900 dark:text-white">{fmt(property.pricePerSqft)}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Area Fit */}
                    {area && (
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                          Area Fit \u2014 {area.name}
                        </h4>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1"><Footprints className="w-3.5 h-3.5" /> Walk Score</span>
                            <span className="font-bold text-gray-900 dark:text-white">{area.walkScore}/100</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Safety Score</span>
                            <span className="font-bold text-gray-900 dark:text-white">{area.safetyScore}/100</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1"><Bus className="w-3.5 h-3.5" /> Transit Score</span>
                            <span className="font-bold text-gray-900 dark:text-white">{area.transitScore}/100</span>
                          </div>
                          {settleScore && (
                            <div className="flex justify-between text-sm pt-1 border-t border-gray-200 dark:border-gray-700">
                              <span className="text-gray-700 dark:text-gray-300 font-medium">Settle-Fast Score</span>
                              <span className="font-bold text-violet-600 dark:text-violet-400">{settleScore}/100</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {area.bestFor.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* NEARBY ESSENTIALS */}
                {nearbyCounts && Object.keys(nearbyCounts).length > 0 && (
                  <section>
                    <SectionTitle>Nearby Essentials</SectionTitle>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { key: "school", label: "Schools", icon: GraduationCap, color: "text-blue-500" },
                        { key: "hospital", label: "Hospitals", icon: Heart, color: "text-red-500" },
                        { key: "park", label: "Parks", icon: TreePine, color: "text-emerald-500" },
                        { key: "shopping", label: "Shopping", icon: ShoppingBag, color: "text-amber-500" },
                        { key: "metro", label: "Metro", icon: Bus, color: "text-indigo-500" },
                        { key: "restaurant", label: "Restaurants", icon: Star, color: "text-orange-500" },
                        { key: "gym", label: "Gyms", icon: Heart, color: "text-pink-500" },
                        { key: "college", label: "Colleges", icon: GraduationCap, color: "text-cyan-500" },
                      ]
                        .filter((item) => nearbyCounts[item.key])
                        .map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center gap-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2.5"
                          >
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{nearbyCounts[item.key]}</p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.label}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </section>
                )}

                {/* TRUST VERIFICATION */}
                <section>
                  <SectionTitle>Trust Verification</SectionTitle>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2.5">
                      {property.isVerified ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <div>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Verified Property</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{property.isVerified ? "Yes" : "No"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2.5">
                      {property.isVerifiedLandlord ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <div>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Verified Landlord</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{property.isVerifiedLandlord ? "Yes" : "No"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2.5">
                      <Shield className="w-4 h-4 text-violet-500" />
                      <div>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Trust Score</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{property.trustScore}/100</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">TrustShield</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {property.trustScore >= 80 ? "Active" : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FINANCIAL SUMMARY */}
                <section>
                  <SectionTitle>Financial Summary</SectionTitle>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                    {financial.type === "Rent" && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Monthly Rent</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(financial.monthly)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deposit</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(financial.deposit)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Est. Maintenance</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(financial.maintenance)}/mo</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Annual Cost</p>
                          <p className="text-lg font-bold text-violet-600 dark:text-violet-400">{fmt(financial.annual)}</p>
                        </div>
                      </div>
                    )}
                    {financial.type === "Sale" && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(financial.price)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Down Payment (20%)</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(financial.downPayment)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registration (7%)</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(financial.registration)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">EMI Estimate</p>
                          <p className="text-lg font-bold text-violet-600 dark:text-violet-400">{fmt(financial.emi)}/mo</p>
                        </div>
                      </div>
                    )}
                    {financial.type === "Lease" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Monthly Lease</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(financial.monthly)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lock-in Period</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{financial.lockIn}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Commitment</p>
                          <p className="text-lg font-bold text-violet-600 dark:text-violet-400">{fmt(financial.totalCommitment)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* RECOMMENDATION */}
                <section>
                  <SectionTitle>AI Recommendation</SectionTitle>
                  <div className={`rounded-xl p-4 border ${recommendation.bg}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Sparkles className={`w-5 h-5 ${recommendation.color}`} />
                      </div>
                      <div>
                        <h4 className={`text-base font-bold ${recommendation.color}`}>{recommendation.verdict}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{recommendation.detail}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FOOTER */}
                <section className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Report generated by 99tolet AI Intelligence</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        For the latest data, visit{" "}
                        <span className="text-violet-600 dark:text-violet-400">99tolet.com/property/{property.slug}</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <QrCode className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </section>
              </div>

              {/* ACTION BUTTONS */}
              <div className="no-print border-t border-gray-200 dark:border-gray-700 px-6 py-4 sm:px-8 flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Report
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  {copied ? "Link Copied!" : "Share Report"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm transition-colors"
                >
                  <X className="w-4 h-4" />
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
