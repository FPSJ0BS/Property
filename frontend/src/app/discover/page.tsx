"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mic,
  Sparkles,
  SlidersHorizontal,
  X,
  ChevronDown,
  Brain,
  Grid3X3,
  List,
  MapPin,
  Building2,
  Home,
  Factory,
  Users,
  Laptop,
  Store,
  Warehouse,
  GraduationCap,
  Heart,
  ArrowUpDown,
  Eye,
  Car,
  TrendingUp,
  ShieldCheck,
  Zap,
  Filter,
  Key,
  ShoppingBag,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/shared/PropertyCard";
import { properties, type Property } from "@/data/properties";
import VoiceAgent from "@/components/shared/VoiceAgent";
import AdvancedFilters from "@/components/shared/AdvancedFilters";
import ComparisonDrawer from "@/components/shared/ComparisonDrawer";
import Link from "next/link";
import { parseSearchQuery, applyParsedSearch, type ParsedSearch } from "@/lib/searchParser";

/* ─── Listing Type Definitions ─── */
const listingTypes = [
  { label: "Rent", icon: Key, key: "Rent" as const },
  { label: "Buy", icon: ShoppingBag, key: "Sale" as const },
  { label: "Lease", icon: FileText, key: "Lease" as const },
];

/* ─── Category Definitions ─── */
const categories = [
  { label: "All", icon: Search, key: "All" },
  { label: "Residential", icon: Home, key: "Residential" },
  { label: "Commercial", icon: Building2, key: "Commercial" },
  { label: "Industrial", icon: Factory, key: "Industrial" },
  { label: "Co-Living", icon: Users, key: "Co-Living" },
  { label: "Co-Working", icon: Laptop, key: "Co-Working" },
] as const;

/* ─── Sub-Type Definitions ─── */
const commercialSubTypes = ["All", "Office", "Retail", "Showroom", "Warehouse", "Coaching", "Clinic"];
const coworkingSubTypes = ["All", "Hot Desk", "Dedicated Desk", "Private Cabin", "Meeting Room", "Virtual Office"];
const colivingSubTypes = ["All", "Private Room", "Shared Room", "Entire Apartment"];
const residentialSubTypes = ["All", "1BHK", "2BHK", "3BHK", "4BHK", "Studio", "Villa"];

/* ─── Quick Filter Definitions ─── */
const residentialQuickFilters = ["Verified Only", "Move-in Ready", "Low Deposit", "Below Market", "Pet Friendly", "Furnished"];
const commercialQuickFilters = ["Verified", "High Visibility", "Loading Bay", "Parking 10+", "Ground Floor", "Main Road"];
const coworkingQuickFilters = ["24/7 Access", "Meeting Room", "High-Speed WiFi", "Parking", "Networking Events"];
const colivingQuickFilters = ["All-Inclusive", "Low Deposit", "Community Events", "Housekeeping", "WiFi 100Mbps"];
const industrialQuickFilters = ["Verified", "Loading Bay", "Parking 10+", "Power Backup", "Ground Floor"];
const defaultQuickFilters = ["Verified Only", "Move-in Ready", "Low Deposit", "Below Market", "Pet Friendly", "Furnished"];

/* ─── Sale/Lease Quick Filters ─── */
const saleQuickFilters = ["RERA Registered", "Ready to Move", "Under Construction", "Resale", "New Property"];
const leaseQuickFilters = ["Long Lease (5+ yrs)", "Short Lease", "Low Lock-in", "Ground Floor", "Main Road"];

/* ─── Sort Options ─── */
const baseSortOptions = [
  { label: "AI Match Score", key: "match" },
  { label: "Price: Low → High", key: "price-asc" },
  { label: "Price: High → Low", key: "price-desc" },
  { label: "Area: Largest", key: "area-desc" },
  { label: "Newest First", key: "newest" },
  { label: "Trust Score", key: "trust" },
];
const businessFitSort = { label: "Business Fit", key: "business-fit" };
const saleSortOptions = [
  { label: "Sale Price: Low → High", key: "sale-price-asc" },
  { label: "Investment Score", key: "investment-score" },
  { label: "Price/sqft", key: "price-sqft" },
];

function getSubTypes(category: string): string[] {
  switch (category) {
    case "Commercial": return commercialSubTypes;
    case "Co-Working": return coworkingSubTypes;
    case "Co-Living": return colivingSubTypes;
    case "Residential": return residentialSubTypes;
    default: return [];
  }
}

function getQuickFilters(category: string, listingType: "All" | "Rent" | "Sale" | "Lease"): string[] {
  // Listing-type-specific filters override category filters
  if (listingType === "Sale") return saleQuickFilters;
  if (listingType === "Lease") return leaseQuickFilters;

  switch (category) {
    case "Residential": return residentialQuickFilters;
    case "Commercial": return commercialQuickFilters;
    case "Co-Working": return coworkingQuickFilters;
    case "Co-Living": return colivingQuickFilters;
    case "Industrial": return industrialQuickFilters;
    default: return defaultQuickFilters;
  }
}

/* ─── Chip Color Map (static Tailwind classes) ─── */
const chipColorMap: Record<string, string> = {
  indigo: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50",
  emerald: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
  violet: "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/50",
  amber: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50",
  cyan: "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800/50",
  slate: "bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
};

/* ─── Animations ─── */
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.04 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/* ─── Main Page ─── */
export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50/30 dark:bg-slate-950 flex items-center justify-center"><div className="text-slate-400 dark:text-slate-500">Loading...</div></div>}>
      <DiscoverContent />
    </Suspense>
  );
}

function DiscoverContent() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubType, setActiveSubType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("match");
  const [showSort, setShowSort] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [listingType, setListingType] = useState<"All" | "Rent" | "Sale" | "Lease">("All");
  const [parsedSearch, setParsedSearch] = useState<ParsedSearch | null>(null);

  /* ─── URL Params: Quiz → Discover connection ─── */
  useEffect(() => {
    const qParam = searchParams.get("q");
    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [searchParams]);

  /* ─── NLP Search Parser (debounced) ─── */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setParsedSearch(null);
      return;
    }
    const timer = setTimeout(() => {
      setParsedSearch(parseSearchQuery(searchQuery));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* Category counts */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: properties.length };
    categories.forEach((c) => {
      if (c.key !== "All") {
        counts[c.key] = properties.filter((p) => p.category === c.key).length;
      }
    });
    return counts;
  }, []);

  /* Listing type counts */
  const listingTypeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: properties.length };
    counts["Rent"] = properties.filter((p) => p.listingType === "Rent" || !p.listingType).length;
    counts["Sale"] = properties.filter((p) => p.listingType === "Sale").length;
    counts["Lease"] = properties.filter((p) => p.listingType === "Lease").length;
    return counts;
  }, []);

  /* Dynamic sort options */
  const sortOptions = useMemo(() => {
    let options = [...baseSortOptions];
    if (activeCategory === "Commercial") options = [...options, businessFitSort];
    if (listingType === "Sale") options = [...options, ...saleSortOptions];
    return options;
  }, [activeCategory, listingType]);

  /* Handle category change — reset sub-type & filters */
  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setActiveSubType("All");
    setActiveFilters([]);
    if (key !== "Commercial" && sortBy === "business-fit") {
      setSortBy("match");
    }
  };

  /* Handle listing type change */
  const handleListingTypeChange = (key: "All" | "Rent" | "Sale" | "Lease") => {
    setListingType(key);
    setActiveFilters([]);
    // Reset sale-specific sorts when leaving sale
    if (key !== "Sale" && ["sale-price-asc", "investment-score", "price-sqft"].includes(sortBy)) {
      setSortBy("match");
    }
  };

  /* Toggle quick filter */
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  /* Toggle compare */
  const toggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  /* ─── Filtering ─── */
  const filtered = useMemo(() => {
    // If NLP search is active, use parsed results
    if (parsedSearch && searchQuery.trim()) {
      return applyParsedSearch(parsedSearch);
    }

    // Otherwise, use manual filters (existing logic)
    let result = [...properties];

    // Listing type filter
    if (listingType !== "All") {
      result = result.filter((p) => p.listingType === listingType);
    }

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Sub-type filter
    if (activeSubType !== "All") {
      result = result.filter((p) => {
        if (p.businessType && activeSubType === p.businessType) return true;
        if (p.coWorkingType && activeSubType === p.coWorkingType) return true;
        if (p.coLivingType && activeSubType === p.coLivingType) return true;
        if (p.subType && p.subType.includes(activeSubType)) return true;
        return false;
      });
    }

    // Quick filters — standard
    if (activeFilters.includes("Verified Only") || activeFilters.includes("Verified")) {
      result = result.filter((p) => p.isVerified);
    }
    if (activeFilters.includes("Move-in Ready")) {
      result = result.filter((p) => p.moveInReady);
    }
    if (activeFilters.includes("Low Deposit")) {
      result = result.filter((p) => p.lowDeposit);
    }
    if (activeFilters.includes("Below Market") || activeFilters.includes("Below Market Rent")) {
      result = result.filter((p) => p.fairRent === "Below Market");
    }
    if (activeFilters.includes("Furnished") || activeFilters.includes("All-Inclusive")) {
      result = result.filter((p) => p.furnishing === "Fully Furnished");
    }
    if (activeFilters.includes("Pet Friendly")) {
      result = result.filter((p) => p.petFriendly);
    }
    if (activeFilters.includes("Parking 10+")) {
      result = result.filter((p) => (p.parkingSpaces || 0) >= 10);
    }
    if (activeFilters.includes("Ground Floor")) {
      result = result.filter((p) => p.floorNumber === 1 || p.floorNumber === 0);
    }
    if (activeFilters.includes("Loading Bay")) {
      result = result.filter((p) => p.loadingBay);
    }
    if (activeFilters.includes("High Visibility")) {
      result = result.filter((p) => (p.visibilityScore || 0) >= 70);
    }
    if (activeFilters.includes("Parking")) {
      result = result.filter((p) => p.parking);
    }
    if (activeFilters.includes("Power Backup")) {
      result = result.filter((p) => p.powerBackup);
    }

    // Sale-specific filters
    if (activeFilters.includes("RERA Registered")) {
      result = result.filter((p) => p.reraRegistered);
    }
    if (activeFilters.includes("Ready to Move")) {
      result = result.filter((p) => p.possessionStatus === "Ready");
    }
    if (activeFilters.includes("Under Construction")) {
      result = result.filter((p) => p.possessionStatus === "Under Construction");
    }
    if (activeFilters.includes("Resale")) {
      result = result.filter((p) => p.possessionStatus === "Resale");
    }
    if (activeFilters.includes("New Property")) {
      result = result.filter((p) => p.possessionStatus !== "Resale");
    }

    // Lease-specific filters
    if (activeFilters.includes("Long Lease (5+ yrs)")) {
      result = result.filter((p) => {
        if (!p.leaseDuration) return false;
        const years = parseInt(p.leaseDuration);
        return !isNaN(years) && years >= 5;
      });
    }
    if (activeFilters.includes("Short Lease")) {
      result = result.filter((p) => {
        if (!p.leaseDuration) return false;
        const years = parseInt(p.leaseDuration);
        return !isNaN(years) && years < 5;
      });
    }
    if (activeFilters.includes("Low Lock-in")) {
      result = result.filter((p) => {
        if (!p.lockInPeriod) return true;
        const years = parseInt(p.lockInPeriod);
        return !isNaN(years) && years <= 1;
      });
    }
    if (activeFilters.includes("Main Road")) {
      result = result.filter((p) => (p.visibilityScore || 0) >= 70);
    }

    return result;
  }, [parsedSearch, searchQuery, activeCategory, activeSubType, activeFilters, listingType]);

  /* ─── Sorting ─── */
  const sorted = useMemo(() => {
    const result = [...filtered];
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "area-desc":
        result.sort((a, b) => b.area - a.area);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case "trust":
        result.sort((a, b) => b.trustScore - a.trustScore);
        break;
      case "business-fit":
        result.sort((a, b) => (b.businessFitScore || 0) - (a.businessFitScore || 0));
        break;
      case "sale-price-asc":
        result.sort((a, b) => (a.salePrice || 0) - (b.salePrice || 0));
        break;
      case "investment-score":
        result.sort((a, b) => (b.investmentScore || 0) - (a.investmentScore || 0));
        break;
      case "price-sqft":
        result.sort((a, b) => (a.pricePerSqft || 0) - (b.pricePerSqft || 0));
        break;
      case "match":
      default:
        result.sort((a, b) => b.aiMatchScore - a.aiMatchScore);
        break;
    }
    return result;
  }, [filtered, sortBy]);

  /* Contextual sub-types & quick filters */
  const subTypes = getSubTypes(activeCategory);
  const quickFilters = getQuickFilters(activeCategory, listingType);

  /* ─── Category Stats Bar ─── */
  const categoryStats = useMemo(() => {
    if (activeCategory === "All" && listingType === "All") return null;

    // Listing type stats
    if (listingType !== "All") {
      const ltProps = properties.filter((p) => p.listingType === listingType);
      if (listingType === "Sale") {
        const rera = ltProps.filter((p) => p.reraRegistered).length;
        const ready = ltProps.filter((p) => p.possessionStatus === "Ready").length;
        const underConstruction = ltProps.filter((p) => p.possessionStatus === "Under Construction").length;
        return [
          { icon: ShoppingBag, label: `${ltProps.length} for sale` },
          { icon: ShieldCheck, label: `${rera} RERA registered` },
          { icon: Zap, label: `${ready} ready to move` },
          { icon: Building2, label: `${underConstruction} under construction` },
        ];
      }
      if (listingType === "Lease") {
        return [
          { icon: FileText, label: `${ltProps.length} for lease` },
          { icon: ShieldCheck, label: `${ltProps.filter((p) => p.isVerified).length} verified` },
        ];
      }
      if (listingType === "Rent") {
        const verified = ltProps.filter((p) => p.isVerified).length;
        const belowMarket = ltProps.filter((p) => p.fairRent === "Below Market").length;
        return [
          { icon: Key, label: `${ltProps.length} for rent` },
          { icon: ShieldCheck, label: `${verified} verified` },
          { icon: TrendingUp, label: `${belowMarket} below market` },
        ];
      }
    }

    const catProps = properties.filter((p) => p.category === activeCategory);
    switch (activeCategory) {
      case "Residential": {
        const verified = catProps.filter((p) => p.isVerified).length;
        const belowMarket = catProps.filter((p) => p.fairRent === "Below Market").length;
        const moveIn = catProps.filter((p) => p.moveInReady).length;
        return [
          { icon: ShieldCheck, label: `${verified} verified homes` },
          { icon: TrendingUp, label: `${belowMarket} below market` },
          { icon: Zap, label: `${moveIn} move-in ready` },
        ];
      }
      case "Commercial": {
        const office = catProps.filter((p) => p.businessType === "Office").length;
        const retail = catProps.filter((p) => p.businessType === "Retail").length;
        const warehouse = catProps.filter((p) => p.businessType === "Warehouse").length;
        return [
          { icon: Building2, label: `${catProps.length} commercial spaces` },
          { icon: Laptop, label: `${office} office` },
          { icon: Store, label: `${retail} retail` },
          { icon: Warehouse, label: `${warehouse} warehouse` },
        ];
      }
      case "Co-Working": {
        const hotDesk = catProps.filter((p) => p.coWorkingType === "Hot Desk").length;
        const privateCabin = catProps.filter((p) => p.coWorkingType === "Private Cabin").length;
        return [
          { icon: Laptop, label: `${catProps.length} workspaces` },
          { icon: Users, label: `${hotDesk} hot desks` },
          { icon: Building2, label: `${privateCabin} private cabins` },
        ];
      }
      case "Co-Living": {
        const priv = catProps.filter((p) => p.coLivingType === "Private Room").length;
        const shared = catProps.filter((p) => p.coLivingType === "Shared Room").length;
        return [
          { icon: Users, label: `${catProps.length} co-living rooms` },
          { icon: Home, label: `${priv} private` },
          { icon: Heart, label: `${shared} shared` },
        ];
      }
      case "Industrial": {
        const verified = catProps.filter((p) => p.isVerified).length;
        return [
          { icon: Factory, label: `${catProps.length} industrial spaces` },
          { icon: ShieldCheck, label: `${verified} verified` },
        ];
      }
      default:
        return null;
    }
  }, [activeCategory, listingType]);

  /* Grid class helper */
  const gridClass =
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      : viewMode === "list"
      ? "grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
      : "grid grid-cols-1 gap-4";

  /* Empty state suggestion */
  const emptySuggestions: Record<string, string[]> = {
    All: ["Try broadening your search", "Use voice search to describe your ideal space", "Remove some filters"],
    Residential: ["Search for a different BHK type", "Expand your budget range", "Try nearby localities"],
    Commercial: ["Try a different business type", "Check co-working spaces as alternatives", "Expand your area range"],
    "Co-Working": ["Try hot desks for flexible options", "Check shared offices nearby", "Remove capacity filters"],
    "Co-Living": ["Explore shared room options", "Check nearby neighborhoods", "Relax your budget filters"],
    Industrial: ["Expand location range", "Check warehouse options", "Try different area sizes"],
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950">
        {/* ═══════════════════════════ STICKY SEARCH HEADER ═══════════════════════════ */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 sticky top-[64px] z-40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            {/* ── Search bar row ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search input */}
              <div className="flex-1 relative group/search">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Try: 2bhk under 25k in Vaishali Nagar with parking..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-28 py-3 sm:py-3.5 text-sm border border-slate-200/80 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 focus:shadow-lg focus:shadow-indigo-500/[0.06] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="hidden sm:flex items-center gap-1 text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold mr-1">
                    <Sparkles className="w-3 h-3" />
                    AI
                  </span>
                  <button
                    onClick={() => setVoiceOpen(true)}
                    className="p-2 text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-xl transition-all min-w-[36px] min-h-[36px] flex items-center justify-center relative group/mic"
                    title="Voice Search"
                  >
                    <Mic className="w-4 h-4" />
                    <span className="absolute inset-0 rounded-xl border border-indigo-300/0 group-hover/mic:border-indigo-300/40 transition-all duration-300" />
                  </button>
                </div>
              </div>

              {/* View mode toggles */}
              <div className="hidden md:flex items-center border border-slate-200/80 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                {([
                  { mode: "grid" as const, icon: Grid3X3, tip: "Grid" },
                  { mode: "list" as const, icon: List, tip: "List" },
                  { mode: "compact" as const, icon: ArrowUpDown, tip: "Compact" },
                ] as const).map(({ mode, icon: Icon, tip }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    title={tip}
                    className={`p-2.5 transition-all ${
                      viewMode === mode
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Filters button */}
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 shrink-0 h-11 sm:h-11 px-4 rounded-2xl sm:rounded-xl dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={() => setAdvancedOpen(true)}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilters.length > 0 && (
                  <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
            </div>

            {/* ── AI Parsed Chips ── */}
            <AnimatePresence>
              {parsedSearch && parsedSearch.chips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI parsed:
                    </span>
                    {parsedSearch.chips.map((chip, i) => (
                      <motion.span
                        key={`${chip.label}-${chip.value}-${i}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${chipColorMap[chip.color] || chipColorMap.slate}`}
                      >
                        {chip.label}: {chip.value}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Listing Type Toggle ── (Most prominent — above categories) */}
            <div className="flex items-center gap-2 mt-3 mb-3">
              <button
                onClick={() => handleListingTypeChange("All")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[40px] shrink-0 ${
                  listingType === "All"
                    ? "bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-300 text-white dark:text-slate-900 shadow-md shadow-slate-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700"
                }`}
              >
                All
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  listingType === "All" ? "bg-white/20 dark:bg-slate-900/30 text-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                }`}>
                  {listingTypeCounts["All"]}
                </span>
              </button>
              {listingTypes.map((lt) => {
                const Icon = lt.icon;
                const isActive = listingType === lt.key;
                const colorMap = {
                  Rent: isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 bg-white/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700",
                  Sale: isActive
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 bg-white/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700",
                  Lease: isActive
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 bg-white/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700",
                };
                return (
                  <button
                    key={lt.key}
                    onClick={() => handleListingTypeChange(lt.key)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[40px] shrink-0 ${colorMap[lt.key]}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {lt.label}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }`}>
                      {listingTypeCounts[lt.key] || 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Category Tabs ── */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                const count = categoryCounts[cat.key] || 0;
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryChange(cat.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[40px] shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Smart Sub-Filters ── */}
            <AnimatePresence mode="wait">
              {subTypes.length > 0 && (
                <motion.div
                  key={`sub-${activeCategory}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {subTypes.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setActiveSubType(sub)}
                        className={`px-3.5 py-2 text-[11px] font-semibold rounded-lg border transition-all whitespace-nowrap min-h-[34px] shrink-0 ${
                          activeSubType === sub
                            ? "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800 shadow-sm"
                            : "text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800 bg-white/60 dark:bg-slate-800/30"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Quick Filters ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`qf-${activeCategory}-${listingType}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                  <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mr-1" />
                  {quickFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => toggleFilter(filter)}
                      className={`px-3 py-2 text-[11px] rounded-lg border transition-all whitespace-nowrap min-h-[34px] font-medium shrink-0 ${
                        activeFilters.includes(filter)
                          ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 shadow-sm shadow-indigo-500/[0.06]"
                          : "text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 bg-white/60 dark:bg-slate-800/30"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Active Filters Badges ── */}
            <AnimatePresence>
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Active:</span>
                    {activeFilters.map((f) => (
                      <Badge
                        key={f}
                        variant="secondary"
                        className="text-[11px] bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 gap-1 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors"
                        onClick={() => toggleFilter(f)}
                      >
                        {f}
                        <X className="w-3 h-3" />
                      </Badge>
                    ))}
                    <button
                      className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      onClick={() => setActiveFilters([])}
                    >
                      Clear all
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ═══════════════════════════ RESULTS SECTION ═══════════════════════════ */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* ── Category Stats Bar ── */}
          <AnimatePresence mode="wait">
            {categoryStats && (
              <motion.div
                key={`stats-${activeCategory}-${listingType}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mb-5 sm:mb-6"
              >
                <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-50/80 via-violet-50/50 to-purple-50/30 dark:from-indigo-950/30 dark:via-violet-950/20 dark:to-purple-950/10 border border-indigo-100/60 dark:border-indigo-900/30">
                  {categoryStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 shrink-0">
                        <Icon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          {stat.label}
                        </span>
                        {i < categoryStats.length - 1 && (
                          <span className="text-slate-300 dark:text-slate-700 ml-2">|</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── NLP Search Active Indicator ── */}
          <AnimatePresence>
            {parsedSearch && searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-50/80 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/10 border border-indigo-100/60 dark:border-indigo-900/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                    AI Search active — showing smart filtered results
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Results Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-6 gap-3">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {sorted.length} {sorted.length === 1 ? "property" : "properties"}
              </span>
              <span className="text-sm text-slate-400 dark:text-slate-500">
                {parsedSearch && searchQuery.trim()
                  ? "matched by AI search"
                  : `in ${activeCategory === "All" ? "all categories" : activeCategory}${
                      listingType !== "All" ? ` · ${listingType === "Sale" ? "Buy" : listingType}` : ""
                    }${activeSubType !== "All" ? ` · ${activeSubType}` : ""}`
                }
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Compare Mode Toggle */}
              <button
                onClick={() => {
                  setCompareMode(!compareMode);
                  if (compareMode) setCompareList([]);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  compareMode
                    ? "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                    : "text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-800"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Compare</span>
              </button>

              {/* View mode (mobile) */}
              <div className="flex md:hidden items-center border border-slate-200/80 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                {([
                  { mode: "grid" as const, icon: Grid3X3 },
                  { mode: "list" as const, icon: List },
                  { mode: "compact" as const, icon: ArrowUpDown },
                ] as const).map(({ mode, icon: Icon }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 transition-all ${
                      viewMode === mode
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSort(!showSort)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 transition-colors"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {sortOptions.find((s) => s.key === sortBy)?.label || "AI Match Score"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${showSort ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {showSort && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1.5 w-52 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl shadow-xl shadow-slate-900/10 dark:shadow-slate-950/40 z-50 overflow-hidden py-1"
                      >
                        {sortOptions.map((option) => (
                          <button
                            key={option.key}
                            onClick={() => {
                              setSortBy(option.key);
                              setShowSort(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                              sortBy === option.key
                                ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400"
                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Results Grid ── */}
          {sorted.length > 0 ? (
            <motion.div
              key={`${viewMode}-${activeCategory}-${activeSubType}-${listingType}`}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className={gridClass}
            >
              <AnimatePresence mode="popLayout">
                {sorted.map((property) => (
                  <motion.div
                    key={property.id}
                    variants={cardVariant}
                    layout
                    className="relative"
                  >
                    {/* Compare Checkbox Overlay */}
                    {compareMode && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => toggleCompare(property.id)}
                        className={`absolute top-3 left-3 z-10 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                          compareList.includes(property.id)
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-white/90 dark:bg-slate-800/90 border-slate-300 dark:border-slate-600 text-transparent hover:border-indigo-400"
                        }`}
                      >
                        {compareList.includes(property.id) && (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </motion.button>
                    )}
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* ── Premium Empty State ── */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16 sm:py-24"
            >
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950/40 dark:to-violet-950/40 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-indigo-400 dark:text-indigo-500" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center"
                  style={{ left: "calc(50% + 22px)", top: "-4px" }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                No properties found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                We could not find properties matching your criteria. Try adjusting your search.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-lg mx-auto">
                {(emptySuggestions[activeCategory] || emptySuggestions["All"]).map((suggestion, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg border border-slate-200/60 dark:border-slate-700"
                  >
                    {suggestion}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCategoryChange("All");
                    setListingType("All");
                    setSearchQuery("");
                  }}
                  className="gap-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                  Reset All Filters
                </Button>
                <Button
                  onClick={() => setVoiceOpen(true)}
                  className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 transition-opacity"
                >
                  <Mic className="w-4 h-4" />
                  Try Voice Search
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* ═══════════════════════════ FLOATING COMPARE BAR ═══════════════════════════ */}
        <AnimatePresence>
          {compareList.length > 0 && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/40"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-sm font-bold text-white">{compareList.length}</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {compareList.length} / 3 selected
                    </span>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:block">
                      {compareList.length < 3
                        ? `Select ${3 - compareList.length} more to compare`
                        : "Ready to compare"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    onClick={() => setCompareList([])}
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
                    onClick={() => setCompareOpen(true)}
                    disabled={compareList.length < 2}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    Compare Now
                  </Button>
                </div>
              </div>
              {/* Mini property chips */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {compareList.map((id) => {
                  const prop = properties.find((p) => p.id === id);
                  if (!prop) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200/60 dark:border-indigo-800/40 shrink-0"
                    >
                      <span className="text-[11px] font-medium text-indigo-700 dark:text-indigo-400 max-w-[120px] truncate">
                        {prop.title}
                      </span>
                      <button
                        onClick={() => toggleCompare(id)}
                        className="text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════ OVERLAYS ═══════════════════════════ */}
      <VoiceAgent
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onResult={(t: string) => setSearchQuery(t)}
      />

      <AdvancedFilters
        isOpen={advancedOpen}
        onClose={() => setAdvancedOpen(false)}
        onApply={() => {
          setAdvancedOpen(false);
        }}
      />

      <ComparisonDrawer
        properties={properties.filter((p) => compareList.includes(p.id))}
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        onRemove={(id: string) => setCompareList((prev) => prev.filter((x) => x !== id))}
      />
    </>
  );
}
