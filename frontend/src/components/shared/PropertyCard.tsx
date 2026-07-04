"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Heart,
  MessageSquare,
  CheckCircle2,
  Zap,
  ArrowUpRight,
  Building2,
  Store,
  Package,
  GraduationCap,
  Car,
  Eye,
  ShoppingBag,
  FileText,
  Key,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/data/properties";
import SaveButton from "@/components/shared/SaveButton";
import AffordabilityBadge from "@/components/shared/AffordabilityBadge";

function getBusinessIcon(type: string) {
  switch (type) {
    case "Office":
      return <Building2 className="w-3 h-3" />;
    case "Retail":
      return <Store className="w-3 h-3" />;
    case "Warehouse":
      return <Package className="w-3 h-3" />;
    case "Coaching":
      return <GraduationCap className="w-3 h-3" />;
    case "Clinic":
      return <Heart className="w-3 h-3" />;
    default:
      return <Building2 className="w-3 h-3" />;
  }
}

function formatSalePrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(price / 100000).toFixed(1)} Lakh`;
}

function MatchScoreRing({ score }: { score: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="3" />
        <circle
          cx="22" cy="22" r={radius} fill="none"
          stroke="url(#match-gradient)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="match-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 leading-none">{score}%</span>
        <span className="text-[7px] text-slate-400 dark:text-slate-500 font-medium">MATCH</span>
      </div>
    </div>
  );
}

export default function PropertyCard({ property }: { property: Property }) {
  const fairRentColor =
    property.fairRent === "Below Market"
      ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-700/50"
      : property.fairRent === "Fair"
        ? "text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/80 dark:border-indigo-700/50"
        : "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-700/50";

  const propertyEmoji = property.type === "residential" ? "\u{1F3E0}"
    : property.type === "co-living" ? "\u{1F3D8}\uFE0F"
    : property.type === "co-working" ? "\u{1F4BB}"
    : property.businessType === "Office" ? "\u{1F3E2}"
    : property.businessType === "Retail" ? "\u{1F3EA}"
    : property.businessType === "Warehouse" ? "\u{1F3ED}"
    : property.businessType === "Coaching" ? "\u{1F393}"
    : property.businessType === "Clinic" ? "\u{1F3E5}"
    : property.type === "commercial" ? "\u{1F3E2}"
    : "\u{1F3ED}";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/property/${property.slug}`}>
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/[0.07] transition-all duration-500 hover:-translate-y-1.5 hover:border-indigo-200/50 dark:hover:border-indigo-700/50">
          {/* Image area */}
          <div className="relative h-44 sm:h-56 overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />

            {/* Top-left badges */}
            <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
              {/* Listing Type Badge — shown for Sale and Lease */}
              {property.listingType && property.listingType !== "Rent" && (
                <span className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm text-white rounded-lg shadow-lg uppercase tracking-wider ${
                  property.listingType === "Sale"
                    ? "bg-amber-500/90 shadow-amber-500/20"
                    : "bg-cyan-500/90 shadow-cyan-500/20"
                }`}>
                  {property.listingType === "Sale" ? <ShoppingBag className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                  {property.listingType === "Sale" ? "For Sale" : "For Lease"}
                </span>
              )}
              {property.isVerified && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-emerald-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg shadow-emerald-500/20 uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              )}
              {property.moveInReady && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-indigo-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg shadow-indigo-500/20 uppercase tracking-wider">
                  <Zap className="w-3 h-3" />
                  Ready
                </span>
              )}
              {property.businessType && (
                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-cyan-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg shadow-cyan-500/20 uppercase tracking-wider">
                  {getBusinessIcon(property.businessType)}
                  {property.businessType}
                </span>
              )}
            </div>

            {/* AI Match Score — top right */}
            <div className="absolute top-2.5 right-2.5">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-lg shadow-slate-900/[0.08] border border-white/60 dark:border-slate-700/60 p-0.5">
                <MatchScoreRing score={property.aiMatchScore} />
                {property.businessFitScore && (
                  <div className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400 mt-0.5 text-center">
                    {property.businessFitScore}% Biz Fit
                  </div>
                )}
              </div>
            </div>

            {/* Bottom gradient overlay with location */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pt-12 pb-3 px-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white/90">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs font-medium truncate">{property.locality}, {property.city}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${fairRentColor} bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm`}>
                  {property.fairRent === "Below Market" ? "Below Market" : property.fairRent}
                </span>
              </div>
            </div>

            {/* Hover save button */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <SaveButton propertyId={property.id} />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            {/* Title */}
            <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 font-display">
              {property.title}
            </h3>

            {/* Price row — different for Sale vs Rent/Lease */}
            {property.listingType === "Sale" && property.salePrice ? (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[22px] font-bold text-slate-900 dark:text-white tracking-tight font-display">
                  {formatSalePrice(property.salePrice)}
                </span>
                {property.pricePerSqft && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    ₹{property.pricePerSqft.toLocaleString("en-IN")}/sqft
                  </span>
                )}
                <AffordabilityBadge rent={property.emiEstimate || 0} compact />
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[22px] font-bold text-slate-900 dark:text-white tracking-tight font-display">
                  ₹{property.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/month</span>
                <AffordabilityBadge rent={property.price} compact />
              </div>
            )}

            {/* Appreciation badge — for sale properties */}
            {property.listingType === "Sale" && property.appreciationTrend && (
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <TrendingUp className="w-3 h-3" />
                {property.appreciationTrend}
              </div>
            )}

            {/* Property specs */}
            {property.bedrooms ? (
              <div className="flex items-center gap-4 mt-3 text-[13px] text-slate-500 dark:text-slate-400">
                {property.bedrooms && (
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span className="font-medium">{property.bedrooms}</span> Bed
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span className="font-medium">{property.bathrooms}</span> Bath
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <span className="font-medium">{property.area.toLocaleString()}</span> sqft
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4 mt-3 text-[13px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <span className="font-medium">{property.area.toLocaleString()}</span> sqft
                </span>
                {property.floorPlate && (
                  <span className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span className="font-medium truncate">{property.floorPlate}</span>
                  </span>
                )}
                {property.parkingSpaces && (
                  <span className="flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span className="font-medium">{property.parkingSpaces}</span> cars
                  </span>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {/* Sale-specific tags */}
              {property.listingType === "Sale" && property.reraRegistered && (
                <Badge variant="secondary" className="text-[10px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/50 font-semibold">
                  <ShieldCheck className="w-3 h-3 mr-0.5" />
                  RERA
                </Badge>
              )}
              {property.listingType === "Sale" && property.possessionStatus && (
                <Badge variant="secondary" className={`text-[10px] font-semibold ${
                  property.possessionStatus === "Ready"
                    ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/50"
                    : property.possessionStatus === "Under Construction"
                      ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/50"
                      : "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/50"
                }`}>
                  {property.possessionStatus}
                </Badge>
              )}
              {property.listingType === "Sale" && property.emiEstimate && (
                <Badge variant="secondary" className="text-[10px] bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200/60 dark:border-violet-800/50 font-semibold">
                  EMI ₹{(property.emiEstimate / 1000).toFixed(0)}K/mo
                </Badge>
              )}

              {/* Lease-specific tags */}
              {property.listingType === "Lease" && property.leaseDuration && (
                <Badge variant="secondary" className="text-[10px] bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-200/60 dark:border-cyan-800/50 font-semibold">
                  <FileText className="w-3 h-3 mr-0.5" />
                  {property.leaseDuration}
                </Badge>
              )}
              {property.listingType === "Lease" && property.lockInPeriod && (
                <Badge variant="secondary" className="text-[10px] bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/50 font-semibold">
                  Lock-in: {property.lockInPeriod}
                </Badge>
              )}

              {/* Standard tags */}
              {property.lowDeposit && (
                <Badge variant="secondary" className="text-[10px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/50 font-semibold">
                  Low Deposit
                </Badge>
              )}
              {property.isVerifiedLandlord && (
                <Badge variant="secondary" className="text-[10px] bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/50 font-semibold">
                  <CheckCircle2 className="w-3 h-3 mr-0.5" />
                  Verified Owner
                </Badge>
              )}
              <Badge variant="secondary" className="text-[10px] bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-slate-700 font-medium">
                {property.furnishing}
              </Badge>
              {property.parkingSpaces && property.parkingSpaces >= 5 && (
                <Badge variant="secondary" className="text-[10px] bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-200/60 dark:border-cyan-800/50 font-semibold">
                  <Car className="w-3 h-3 mr-0.5" />
                  {property.parkingSpaces} Parking
                </Badge>
              )}
              {property.visibilityScore && property.visibilityScore >= 85 && (
                <Badge variant="secondary" className="text-[10px] bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/50 font-semibold">
                  <Eye className="w-3 h-3 mr-0.5" />
                  High Visibility
                </Badge>
              )}
              {property.loadingBay && (
                <Badge variant="secondary" className="text-[10px] bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/50 font-semibold">
                  Loading Bay
                </Badge>
              )}
              {property.frontageWidth && (
                <Badge variant="secondary" className="text-[10px] bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200/60 dark:border-violet-800/50 font-semibold">
                  {property.frontageWidth} Frontage
                </Badge>
              )}
            </div>

            {/* Bottom row with separator */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate mr-2">
                <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{property.localityPulse}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors min-h-[28px]">
                  <Sparkles className="w-3 h-3" />
                  Ask AI
                </button>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
