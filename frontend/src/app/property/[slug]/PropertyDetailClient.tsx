"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Sparkles,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Star,
  Clock,
  Zap,
  Car,
  Dog,
  BatteryCharging,
  Droplets,
  Compass,
  Building,
  ArrowLeft,
  Send,
  Calculator,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PropertyCard from "@/components/shared/PropertyCard";
import PropertyGallery from "@/components/shared/PropertyGallery";
import CommuteCalculator from "@/components/shared/CommuteCalculator";
import RentCalculator from "@/components/shared/RentCalculator";
import StickyMobileCTA from "@/components/shared/StickyMobileCTA";
import ShareSheet from "@/components/shared/ShareSheet";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { properties, type Property } from "@/data/properties";
import { areas, getAreaBySlug } from "@/data/areas";
import NearbyEssentials from "@/components/cityfit/NearbyEssentials";
import AreaPersonas from "@/components/cityfit/AreaPersonas";
import SettleFastScore from "@/components/cityfit/SettleFastScore";
import TradeoffExplainer from "@/components/cityfit/TradeoffExplainer";
import PostMoveFeedback from "@/components/cityfit/PostMoveFeedback";
import BusinessFitCard from "@/components/commercial/BusinessFitCard";
import CommercialTradeoff from "@/components/commercial/CommercialTradeoff";
import BusinessMoveChecklist from "@/components/commercial/BusinessMoveChecklist";
import { commercialAreaProfiles, getCommercialProfile } from "@/data/commercial";
import { useState, useEffect } from "react";
import InquiryForm from "@/components/shared/InquiryForm";
import ScheduleVisit from "@/components/shared/ScheduleVisit";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import RecentlyViewed from "@/components/shared/RecentlyViewed";
import SaveButton from "@/components/shared/SaveButton";
import { useRecentlyViewed } from "@/lib/store";
import PropertyReport from "@/components/shared/PropertyReport";
import NegotiationIntel from "@/components/shared/NegotiationIntel";
import TrustScorePreview from "@/components/shared/TrustScorePreview";
import PriceTimeline from "@/components/shared/PriceTimeline";
import InvestmentScore from "@/components/shared/InvestmentScore";
import SmartAlerts from "@/components/shared/SmartAlerts";
import VisitNotes from "@/components/shared/VisitNotes";
import ShareCollection from "@/components/shared/ShareCollection";
import QuickSummary from "@/components/shared/QuickSummary";
import AdaptiveChecklist from "@/components/shared/AdaptiveChecklist";
import ResponsivenessIndicator from "@/components/shared/ResponsivenessIndicator";
import PriceDropAlert from "@/components/shared/PriceDropAlert";
import SmartNextSteps from "@/components/shared/SmartNextSteps";

export default function PropertyDetailClient({
  property,
}: {
  property: Property;
}) {
  const [aiQuestion, setAiQuestion] = useState("");
  const [calcOpen, setCalcOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const { addViewed } = useRecentlyViewed();

  useEffect(() => {
    addViewed(property.id);
  }, [property.id, addViewed]);

  const similar = properties
    .filter((p) => p.id !== property.id && p.type === property.type)
    .slice(0, 3);

  const matchedArea = areas.find(a =>
    property.locality.toLowerCase().includes(a.name.toLowerCase().split(' ')[0].toLowerCase())
  ) || areas[0];

  const commercialProfile = getCommercialProfile(matchedArea?.slug || "");

  const fairRentColor =
    property.fairRent === "Below Market"
      ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
      : property.fairRent === "Fair"
        ? "text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800"
        : "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Discover", href: "/discover" },
          { label: property.locality, href: `/discover?area=${property.locality}` },
          { label: property.title },
        ]}
      />

      {/* Quick Summary — mobile only, before the grid */}
      <div className="lg:hidden">
        <QuickSummary property={property} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            {/* Gallery */}
            <div className="relative">
              <PropertyGallery
                images={property.images}
                title={property.title}
                type={property.type}
                videoUrl={property.videoUrl}
                videoThumbnail={property.videoThumbnail}
              />
              {/* Share button overlay */}
              <Button
                variant="outline"
                size="sm"
                className="absolute top-3 right-3 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm gap-1.5 dark:border-slate-700 dark:text-slate-300"
                onClick={() => setShareOpen(true)}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Title + Price */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                {property.address}
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {"\u20B9"}{property.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 ml-1">/month</span>
                </div>
                <Badge
                  variant="secondary"
                  className={`${fairRentColor} border`}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {property.fairRent} Rent
                </Badge>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Deposit: {"\u20B9"}{property.deposit.toLocaleString("en-IN")}
                  {property.lowDeposit && (
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 dark:border-emerald-800"
                    >
                      Low Deposit
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>

            <Separator className="dark:bg-slate-800" />

            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {property.bedrooms && (
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <Bed className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span>
                    {property.bedrooms} Bedroom{property.bedrooms > 1 && "s"}
                  </span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <Bath className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span>
                    {property.bathrooms} Bathroom{property.bathrooms > 1 && "s"}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                <Maximize2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span>{property.area.toLocaleString()} sqft</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                <Building className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span>{property.furnishing}</span>
              </div>
            </div>

            {/* Property facts */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Property Facts
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 sm:gap-x-6 text-sm">
                {property.floorNumber && (
                  <>
                    <span className="text-slate-500 dark:text-slate-400">Floor</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {property.floorNumber} of {property.totalFloors}
                    </span>
                  </>
                )}
                {property.facing && (
                  <>
                    <span className="text-slate-500 dark:text-slate-400">Facing</span>
                    <span className="font-medium flex items-center gap-1 text-slate-900 dark:text-white">
                      <Compass className="w-3.5 h-3.5" />
                      {property.facing}
                    </span>
                  </>
                )}
                <span className="text-slate-500 dark:text-slate-400">Parking</span>
                <span className="font-medium flex items-center gap-1 text-slate-900 dark:text-white">
                  <Car className="w-3.5 h-3.5" />
                  {property.parking ? "Available" : "Not Available"}
                </span>
                <span className="text-slate-500 dark:text-slate-400">Pet Friendly</span>
                <span className="font-medium flex items-center gap-1 text-slate-900 dark:text-white">
                  <Dog className="w-3.5 h-3.5" />
                  {property.petFriendly ? "Yes" : "No"}
                </span>
                <span className="text-slate-500 dark:text-slate-400">Power Backup</span>
                <span className="font-medium flex items-center gap-1 text-slate-900 dark:text-white">
                  <BatteryCharging className="w-3.5 h-3.5" />
                  {property.powerBackup ? "Available" : "Not Available"}
                </span>
                <span className="text-slate-500 dark:text-slate-400">Water Supply</span>
                <span className="font-medium flex items-center gap-1 text-slate-900 dark:text-white">
                  <Droplets className="w-3.5 h-3.5" />
                  {property.waterSupply}
                </span>
                <span className="text-slate-500 dark:text-slate-400">Available From</span>
                <span className="font-medium text-slate-900 dark:text-white">{property.availableFrom}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                About This Property
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {property.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-200">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <Badge
                    key={a}
                    variant="secondary"
                    className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                  >
                    {a}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Locality Pulse */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Locality Pulse {"\u2014"} {property.locality}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Powered by RentIQ{"\u2122"} market intelligence
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {property.localityPulse}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Demand</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {property.trustScore}%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Area Trust</div>
                </div>
                <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-violet-600 dark:text-violet-400">+8%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">YoY Rent Trend</div>
                </div>
              </div>
            </div>

            {/* Commute Calculator */}
            <CommuteCalculator propertyLocality={property.locality} propertyCity={property.city} />

            {/* AI Assistant */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 rounded-xl border border-indigo-100 dark:border-indigo-800/50 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Ask AI About This Property
                </h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Get instant answers about this property, locality, pricing
                fairness, and more.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Is the rent fair for this locality? How's the commute to..."
                  className="flex-1 px-4 py-3 sm:py-2.5 text-sm rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-slate-800 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                />
                <Button className="bg-indigo-600 hover:bg-indigo-700 shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Is this rent fair?",
                  "How's the neighborhood?",
                  "Nearest metro?",
                  "Schools nearby?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setAiQuestion(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Visit Notes — after AI Assistant, before CityFit */}
            <VisitNotes propertyId={property.id} />

            {/* Neighborhood Intelligence */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-display">Neighborhood Intelligence</h3>
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 px-2 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800">CityFit&trade;</span>
              </div>
              <NearbyEssentials places={matchedArea.nearbyPlaces} compact />
              <div className="mt-4">
                <Link href={`/area/${matchedArea.slug}`} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  Explore full area profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Commercial Intelligence — only for commercial/industrial properties */}
            {(property.type === "commercial" || property.type === "industrial") && property.businessType && (
              <>
                <BusinessFitCard property={property} />
                {commercialProfile && <CommercialTradeoff profile={commercialProfile} />}
                <BusinessMoveChecklist businessType={property.businessType} variant="compact" />
              </>
            )}

            {/* Trade-off Explainer */}
            <TradeoffExplainer area={matchedArea} />

            {/* Area Personas */}
            <AreaPersonas area={matchedArea} />

            {/* Post-Move Feedback */}
            <PostMoveFeedback areaName={matchedArea.name} />

            {/* Adaptive Checklist — after PostMoveFeedback */}
            <AdaptiveChecklist property={property} />

            {/* Price Timeline */}
            <PriceTimeline property={property} areaName={matchedArea.name} />

            {/* Negotiation Intelligence */}
            <NegotiationIntel property={property} areaAvgRent={Math.round((matchedArea.rentRange.min + matchedArea.rentRange.max) / 2)} />

            {/* Smart Next Steps — at the very bottom of main content */}
            <SmartNextSteps context="property-detail" />
          </div>

          {/* Sidebar */}
          <div className="space-y-5 sm:space-y-6">
            {/* Sticky summary */}
            <div className="lg:sticky lg:top-24 space-y-5 sm:space-y-6">
              {/* Landlord card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {property.landlord.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                      {property.landlord.name}
                      {property.landlord.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {property.landlord.rating}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {property.landlord.responseTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Responsiveness Indicator — after landlord name/rating */}
                <ResponsivenessIndicator
                  responseTime={property.landlord.responseTime}
                  rating={property.landlord.rating}
                  verified={property.landlord.verified}
                />

                <div className="space-y-2.5">
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 gap-2 py-3 sm:py-2"
                    onClick={() => setScheduleOpen(true)}
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Visit
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 py-3 sm:py-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    onClick={() => setInquiryOpen(true)}
                  >
                    <Phone className="w-4 h-4" />
                    Request Callback
                  </Button>
                  <WhatsAppCTA
                    propertyTitle={property.title}
                    propertySlug={property.slug}
                    landlordName={property.landlord.name}
                    variant="inline"
                  />
                  <SaveButton propertyId={property.id} variant="full" />
                  {/* Share Collection — after SaveButton */}
                  <ShareCollection propertyId={property.id} propertyTitle={property.title} />
                  <Button
                    variant="outline"
                    className="w-full gap-2 py-3 sm:py-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
                    onClick={() => setCalcOpen(true)}
                  >
                    <Calculator className="w-4 h-4" />
                    Move-in Calculator
                  </Button>
                </div>
              </motion.div>

              {/* Trust Summary */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Trust Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Trust Score</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {property.trustScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                      style={{ width: `${property.trustScore}%` }}
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Landlord Verified", ok: property.isVerifiedLandlord },
                      { label: "Property Verified", ok: property.isVerified },
                      { label: "Documents Validated", ok: true },
                      { label: "Physical Inspection", ok: property.isVerified },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            item.ok ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"
                          }`}
                        />
                        <span
                          className={
                            item.ok ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"
                          }
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Settle-Fast Score */}
              <SettleFastScore area={matchedArea} />

              {/* Investment Score (Sale/Lease only) */}
              {(property.listingType === "Sale" || property.listingType === "Lease") && (
                <InvestmentScore property={property} />
              )}

              {/* Trust Score Preview */}
              <TrustScorePreview variant="tenant" />

              {/* AI Report + Alert buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 py-3 sm:py-2 font-semibold"
                  onClick={() => setReportOpen(true)}
                >
                  <Sparkles className="w-4 h-4" />
                  Download AI Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 py-3 sm:py-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={() => setAlertsOpen(true)}
                >
                  <Zap className="w-4 h-4" />
                  Set Smart Alert
                </Button>
                {/* Price Drop Alert — after Set Smart Alert */}
                <PriceDropAlert
                  propertyId={property.id}
                  propertyTitle={property.title}
                  currentPrice={property.price}
                  belowMarket={property.fairRent === "Below Market"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5 sm:mb-6">
              Similar Properties
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recently Viewed */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <RecentlyViewed currentPropertyId={property.id} />
      </div>

      {/* Modals */}
      <InquiryForm
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        propertyTitle={property.title}
        propertyId={property.id}
        landlordName={property.landlord.name}
      />
      <ScheduleVisit
        isOpen={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        propertyTitle={property.title}
      />

      <RentCalculator isOpen={calcOpen} onClose={() => setCalcOpen(false)} baseRent={property.price} />

      <StickyMobileCTA
        propertyTitle={property.title}
        price={property.price}
        onSchedule={() => setScheduleOpen(true)}
        onCall={() => setInquiryOpen(true)}
      />

      <ShareSheet
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={property.title}
        url={`https://99tolet.com/property/${property.slug}`}
      />

      <PropertyReport
        property={property}
        area={matchedArea}
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
      />

      <SmartAlerts
        isOpen={alertsOpen}
        onClose={() => setAlertsOpen(false)}
      />
    </div>
  );
}
