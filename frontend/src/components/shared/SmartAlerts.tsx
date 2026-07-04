"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bell,
  BellRing,
  Check,
  ChevronRight,
  Mail,
  MessageSquare,
  Smartphone,
  Shield,
  Sparkles,
  Home,
  Building2,
  Factory,
  Users,
  Laptop,
  IndianRupee,
  MapPin,
  SlidersHorizontal,
  ArrowRight,
  Zap,
  Eye,
} from "lucide-react";

interface SmartAlertsProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "setup" | "success";

const PROPERTY_TYPES = [
  { id: "residential", label: "Residential", icon: Home },
  { id: "commercial", label: "Commercial", icon: Building2 },
  { id: "industrial", label: "Industrial", icon: Factory },
  { id: "co-living", label: "Co-Living", icon: Users },
  { id: "co-working", label: "Co-Working", icon: Laptop },
];

const LISTING_TYPES = ["Rent", "Sale", "Lease", "Any"];

const AREAS = [
  "Vaishali Nagar",
  "Malviya Nagar",
  "C-Scheme",
  "Mansarovar",
  "Jagatpura",
  "Tonk Road",
  "Pratap Nagar",
  "Sodala",
  "Raja Park",
  "Bani Park",
  "Ajmer Road",
  "SIT Road",
];

const MUST_HAVES = [
  { id: "verified", label: "Verified Only", icon: Shield },
  { id: "move-in", label: "Move-in Ready", icon: Zap },
  { id: "low-deposit", label: "Low Deposit", icon: IndianRupee },
  { id: "rera", label: "RERA", icon: Shield },
  { id: "pet", label: "Pet Friendly", icon: Home },
  { id: "parking", label: "Parking", icon: Building2 },
  { id: "furnished", label: "Furnished", icon: Home },
];

const BUSINESS_TYPES = ["Office", "Retail", "Warehouse", "Coaching", "Clinic", "Showroom"];

const FREQUENCIES = [
  { id: "instant", label: "Instant", desc: "Get notified immediately" },
  { id: "daily", label: "Daily Digest", desc: "One email per day" },
  { id: "weekly", label: "Weekly Summary", desc: "Every Monday morning" },
];

const fmt = (n: number) => {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
};

function PillToggle({
  label,
  active,
  onClick,
  icon: Icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
        active
          ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20"
          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600"
      }`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
    </motion.button>
  );
}

function DualSlider({
  min,
  max,
  valueMin,
  valueMax,
  onChange,
  formatLabel,
}: {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChange: (low: number, high: number) => void;
  formatLabel: (n: number) => string;
}) {
  const pctMin = ((valueMin - min) / (max - min)) * 100;
  const pctMax = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm font-semibold text-gray-900 dark:text-white">
        <span>₹{formatLabel(valueMin)}</span>
        <span>₹{formatLabel(valueMax)}</span>
      </div>
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          className="absolute h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={valueMin}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < valueMax) onChange(v, valueMax);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={valueMax}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > valueMin) onChange(valueMin, v);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
        <div
          className="absolute w-5 h-5 -mt-1.5 bg-white dark:bg-gray-200 border-2 border-violet-500 rounded-full shadow-md"
          style={{ left: `calc(${pctMin}% - 10px)`, top: "0" }}
        />
        <div
          className="absolute w-5 h-5 -mt-1.5 bg-white dark:bg-gray-200 border-2 border-purple-500 rounded-full shadow-md"
          style={{ left: `calc(${pctMax}% - 10px)`, top: "0" }}
        />
      </div>
    </div>
  );
}

export default function SmartAlerts({ isOpen, onClose }: SmartAlertsProps) {
  const [step, setStep] = useState<Step>("setup");
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [listingType, setListingType] = useState("Any");
  const [budgetMin, setBudgetMin] = useState(5000);
  const [budgetMax, setBudgetMax] = useState(100000);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [mustHaves, setMustHaves] = useState<string[]>([]);
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [frequency, setFrequency] = useState("daily");
  const [channels, setChannels] = useState({ email: true, whatsapp: false, push: true });

  const isCommercial = propertyTypes.includes("commercial");
  const isSale = listingType === "Sale";

  const budgetRange = isSale
    ? { min: 1000000, max: 50000000, step: 500000 }
    : { min: 5000, max: 500000, step: 1000 };

  useEffect(() => {
    if (isSale) {
      setBudgetMin(1000000);
      setBudgetMax(50000000);
    } else {
      setBudgetMin(5000);
      setBudgetMax(100000);
    }
  }, [isSale]);

  const togglePropertyType = (id: string) => {
    setPropertyTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleArea = (name: string) => {
    setSelectedAreas((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const toggleMustHave = (id: string) => {
    setMustHaves((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleActivate = useCallback(() => {
    const alertData = {
      propertyTypes,
      listingType,
      budgetMin,
      budgetMax,
      areas: selectedAreas,
      mustHaves,
      businessType,
      frequency,
      channels,
      createdAt: new Date().toISOString(),
      active: true,
    };
    localStorage.setItem("99tolet_smart_alert", JSON.stringify(alertData));
    setStep("success");
  }, [propertyTypes, listingType, budgetMin, budgetMax, selectedAreas, mustHaves, businessType, frequency, channels]);

  const handleClose = () => {
    setStep("setup");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-xl my-4 mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-5">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
                >
                  <BellRing className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-white">Smart Property Alerts</h2>
                  <p className="text-violet-200 text-xs mt-0.5">AI-powered notifications for your perfect property</p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === "setup" ? (
                <motion.div
                  key="setup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="px-6 py-5 space-y-5 max-h-[65vh] overflow-y-auto"
                >
                  {/* Property Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Property Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROPERTY_TYPES.map((pt) => (
                        <PillToggle
                          key={pt.id}
                          label={pt.label}
                          icon={pt.icon}
                          active={propertyTypes.includes(pt.id)}
                          onClick={() => togglePropertyType(pt.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Listing Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Listing Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {LISTING_TYPES.map((lt) => (
                        <PillToggle
                          key={lt}
                          label={lt}
                          active={listingType === lt}
                          onClick={() => setListingType(lt)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                      Budget Range {isSale ? "(Sale)" : "(Rent/Lease)"}
                    </label>
                    <DualSlider
                      min={budgetRange.min}
                      max={budgetRange.max}
                      valueMin={budgetMin}
                      valueMax={budgetMax}
                      onChange={(low, high) => {
                        setBudgetMin(low);
                        setBudgetMax(high);
                      }}
                      formatLabel={fmt}
                    />
                  </div>

                  {/* Areas */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 inline mr-1" />
                      Preferred Areas
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {AREAS.map((area) => (
                        <PillToggle
                          key={area}
                          label={area}
                          active={selectedAreas.includes(area)}
                          onClick={() => toggleArea(area)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Must Haves */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      <SlidersHorizontal className="w-3.5 h-3.5 inline mr-1" />
                      Must-Haves
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {MUST_HAVES.map((mh) => (
                        <PillToggle
                          key={mh.id}
                          label={mh.label}
                          active={mustHaves.includes(mh.id)}
                          onClick={() => toggleMustHave(mh.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Commercial Business Type */}
                  {isCommercial && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Business Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {BUSINESS_TYPES.map((bt) => (
                          <PillToggle
                            key={bt}
                            label={bt}
                            active={businessType === bt}
                            onClick={() => setBusinessType(businessType === bt ? null : bt)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Frequency */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Alert Frequency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {FREQUENCIES.map((f) => (
                        <motion.button
                          key={f.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setFrequency(f.id)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            frequency === f.id
                              ? "bg-violet-50 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700"
                              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-violet-200 dark:hover:border-violet-700"
                          }`}
                        >
                          <p className={`text-xs font-bold ${frequency === f.id ? "text-violet-600 dark:text-violet-400" : "text-gray-700 dark:text-gray-300"}`}>
                            {f.label}
                          </p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{f.desc}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Channels */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Notification Channels
                    </label>
                    <div className="flex gap-3">
                      {[
                        { key: "email" as const, label: "Email", icon: Mail },
                        { key: "whatsapp" as const, label: "WhatsApp", icon: MessageSquare },
                        { key: "push" as const, label: "Push", icon: Smartphone },
                      ].map((ch) => (
                        <motion.button
                          key={ch.key}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setChannels((prev) => ({ ...prev, [ch.key]: !prev[ch.key] }))}
                          className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                            channels[ch.key]
                              ? "bg-violet-50 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700"
                              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <ch.icon
                            className={`w-5 h-5 ${
                              channels[ch.key] ? "text-violet-600 dark:text-violet-400" : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`text-xs font-medium ${
                              channels[ch.key] ? "text-violet-700 dark:text-violet-300" : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {ch.label}
                          </span>
                          {channels[ch.key] && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 bg-violet-600 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-2.5 h-2.5 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="px-6 py-8 text-center space-y-5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your AI Alert is Active</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      We&apos;ll notify you when matching properties appear
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-left space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Alert Summary</h4>
                    {propertyTypes.length > 0 && (
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Types:</span> {propertyTypes.join(", ")}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Listing:</span> {listingType}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Budget:</span> ₹{fmt(budgetMin)} — ₹{fmt(budgetMax)}
                    </p>
                    {selectedAreas.length > 0 && (
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Areas:</span> {selectedAreas.join(", ")}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Frequency:</span> {FREQUENCIES.find((f) => f.id === frequency)?.label}
                    </p>
                  </div>

                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    We&apos;ll send you matches within 24 hours
                  </p>

                  {/* Matching properties CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-100 dark:bg-violet-800/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-bold text-violet-700 dark:text-violet-300">
                          3 properties already match your criteria
                        </p>
                        <p className="text-xs text-violet-500 dark:text-violet-400">
                          View them now before they&apos;re gone
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-violet-500 flex-shrink-0" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              {step === "setup" ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleActivate}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-violet-500/25"
                >
                  <Bell className="w-4 h-4" />
                  Activate Smart Alert
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm transition-colors"
                >
                  Done
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
