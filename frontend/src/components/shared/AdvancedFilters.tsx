"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  RotateCcw,
  SlidersHorizontal,
  Car,
  Wifi,
  Zap,
  ShieldCheck,
  Dumbbell,
  Waves,
  ArrowUpFromLine,
  Snowflake,
  Cctv,
  Trees,
  WashingMachine,
  Coffee,
  Check,
  Sparkles,
} from "lucide-react";

export interface FilterState {
  priceRange: [number, number];
  areaRange: [number, number];
  bedrooms: string[];
  furnishing: string[];
  amenities: string[];
  verified: boolean;
  moveInReady: boolean;
  petFriendly: boolean;
  lowDeposit: boolean;
  noiseLevel: string[];
  trustScoreMin: number;
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

const DEFAULT_FILTERS: FilterState = {
  priceRange: [5000, 100000],
  areaRange: [50, 10000],
  bedrooms: [],
  furnishing: [],
  amenities: [],
  verified: false,
  moveInReady: false,
  petFriendly: false,
  lowDeposit: false,
  noiseLevel: [],
  trustScoreMin: 0,
};

const BEDROOM_OPTIONS = ["Any", "1", "2", "3", "4+"];
const FURNISHING_OPTIONS = ["Any", "Fully Furnished", "Semi Furnished", "Unfurnished"];
const NOISE_OPTIONS = ["Any", "Quiet", "Moderate", "Active"];

const AMENITIES = [
  { label: "Parking", icon: Car },
  { label: "WiFi", icon: Wifi },
  { label: "Power Backup", icon: Zap },
  { label: "Security", icon: ShieldCheck },
  { label: "Gym", icon: Dumbbell },
  { label: "Swimming Pool", icon: Waves },
  { label: "Lift", icon: ArrowUpFromLine },
  { label: "AC", icon: Snowflake },
  { label: "CCTV", icon: Cctv },
  { label: "Garden", icon: Trees },
  { label: "Laundry", icon: WashingMachine },
  { label: "Cafeteria", icon: Coffee },
];

function formatINR(val: number): string {
  if (val >= 100000) return "\u20b9" + (val / 100000).toFixed(1) + "L";
  if (val >= 1000) return "\u20b9" + (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1) + "k";
  return "\u20b9" + val.toLocaleString("en-IN");
}

function formatArea(val: number): string {
  if (val >= 1000) return (val / 1000).toFixed(1).replace(/\.0$/, "") + "k sqft";
  return val + " sqft";
}

/* ---- Dual Range Slider ---- */
function DualRangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  formatFn,
}: {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  formatFn: (v: number) => string;
}) {
  const leftPct = ((value[0] - min) / (max - min)) * 100;
  const rightPct = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="pt-2 pb-1">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {formatFn(value[0])}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">&mdash;</span>
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {formatFn(value[1])}
        </span>
      </div>
      <div className="relative h-2 w-full">
        {/* Track background */}
        <div className="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-700" />
        {/* Active track */}
        <div
          className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < value[1]) onChange([v, value[1]]);
          }}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-500 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > value[0]) onChange([value[0], v]);
          }}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-violet-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-violet-500 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
        <span>{formatFn(min)}</span>
        <span>{formatFn(max)}</span>
      </div>
    </div>
  );
}

/* ---- Pill Selector ---- */
function PillSelector({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (opt: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all cursor-pointer ${
              active
                ? "border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-800"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ---- Toggle Switch ---- */
function ToggleSwitch({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between py-2.5 cursor-pointer"
    >
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
      <div
        className={`relative h-6 w-11 rounded-full transition-colors ${
          enabled
            ? "bg-indigo-500"
            : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <motion.div
          layout
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
          style={{ left: enabled ? "calc(100% - 1.375rem)" : "0.125rem" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </button>
  );
}

/* ---- Section Wrapper ---- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

/* ---- Main Component ---- */
export default function AdvancedFilters({
  isOpen,
  onClose,
  onApply,
}: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });

  const toggleInArray = useCallback(
    (key: "bedrooms" | "furnishing" | "amenities" | "noiseLevel", val: string | number) => {
      setFilters((prev) => {
        const arr = prev[key] as (string | number)[];
        const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
        return { ...prev, [key]: next };
      });
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS });
  }, []);

  // Mock result count that changes with filters
  const resultCount = useMemo(() => {
    let base = 42;
    if (filters.verified) base -= 8;
    if (filters.moveInReady) base -= 5;
    if (filters.petFriendly) base -= 12;
    if (filters.lowDeposit) base -= 6;
    if (filters.bedrooms.length > 0 && !filters.bedrooms.includes("Any")) base -= filters.bedrooms.length * 3;
    if (filters.furnishing.length > 0 && !filters.furnishing.includes("Any")) base -= filters.furnishing.length * 2;
    if (filters.amenities.length > 0) base -= Math.min(filters.amenities.length * 2, 15);
    if (filters.trustScoreMin > 50) base -= Math.floor(filters.trustScoreMin / 20);
    if (filters.priceRange[1] < 50000) base -= 5;
    if (filters.priceRange[0] > 15000) base -= 4;
    return Math.max(3, Math.min(47, base));
  }, [filters]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full sm:w-[420px] flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40">
                  <SlidersHorizontal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                  Advanced Filters
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset All
                </button>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5">
              {/* Price Range */}
              <Section title="Price Range">
                <DualRangeSlider
                  min={5000}
                  max={100000}
                  step={500}
                  value={filters.priceRange}
                  onChange={(v) => setFilters((p) => ({ ...p, priceRange: v }))}
                  formatFn={formatINR}
                />
              </Section>

              {/* Area Range */}
              <Section title="Area Range">
                <DualRangeSlider
                  min={50}
                  max={10000}
                  step={50}
                  value={filters.areaRange}
                  onChange={(v) => setFilters((p) => ({ ...p, areaRange: v }))}
                  formatFn={formatArea}
                />
              </Section>

              {/* Bedrooms */}
              <Section title="Bedrooms">
                <PillSelector
                  options={BEDROOM_OPTIONS}
                  selected={filters.bedrooms}
                  onToggle={(opt) => toggleInArray("bedrooms", opt)}
                />
              </Section>

              {/* Furnishing */}
              <Section title="Furnishing">
                <PillSelector
                  options={FURNISHING_OPTIONS}
                  selected={filters.furnishing}
                  onToggle={(opt) => toggleInArray("furnishing", opt)}
                />
              </Section>

              {/* Amenities */}
              <Section title="Amenities">
                <div className="grid grid-cols-3 gap-2">
                  {AMENITIES.map(({ label, icon: Icon }) => {
                    const active = filters.amenities.includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleInArray("amenities", label)}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all cursor-pointer ${
                          active
                            ? "border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <div className="relative">
                          <Icon className="h-4 w-4" />
                          {active && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1.5"
                            >
                              <Check className="h-2.5 w-2.5 text-indigo-600 dark:text-indigo-400" />
                            </motion.div>
                          )}
                        </div>
                        <span className="text-[10px] font-medium leading-tight text-center">
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Trust & Verification */}
              <Section title="Trust & Verification">
                <div className="space-y-0.5">
                  <ToggleSwitch
                    label="Verified Properties Only"
                    enabled={filters.verified}
                    onToggle={() => setFilters((p) => ({ ...p, verified: !p.verified }))}
                  />
                  <ToggleSwitch
                    label="Move-in Ready"
                    enabled={filters.moveInReady}
                    onToggle={() => setFilters((p) => ({ ...p, moveInReady: !p.moveInReady }))}
                  />
                  <ToggleSwitch
                    label="Pet Friendly"
                    enabled={filters.petFriendly}
                    onToggle={() => setFilters((p) => ({ ...p, petFriendly: !p.petFriendly }))}
                  />
                  <ToggleSwitch
                    label="Low Deposit"
                    enabled={filters.lowDeposit}
                    onToggle={() => setFilters((p) => ({ ...p, lowDeposit: !p.lowDeposit }))}
                  />
                </div>
              </Section>

              {/* Trust Score */}
              <Section title="Trust Score">
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      Minimum Trust Score
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      {filters.trustScoreMin}
                    </span>
                  </div>
                  <div className="relative h-2 w-full">
                    <div className="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div
                      className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      style={{ width: `${filters.trustScoreMin}%` }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={filters.trustScoreMin}
                      onChange={(e) =>
                        setFilters((p) => ({
                          ...p,
                          trustScoreMin: Number(e.target.value),
                        }))
                      }
                      className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-500 [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-500 [&::-moz-range-thumb]:shadow-md"
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                    <span>0</span>
                    <span>100</span>
                  </div>
                </div>
              </Section>

              {/* Noise Level */}
              <Section title="Noise Level">
                <PillSelector
                  options={NOISE_OPTIONS}
                  selected={filters.noiseLevel}
                  onToggle={(opt) => toggleInArray("noiseLevel", opt)}
                />
              </Section>

              {/* Bottom spacer for sticky footer */}
              <div className="h-4" />
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-slate-100 dark:border-slate-800 px-5 py-4 bg-white dark:bg-slate-900">
              <button
                onClick={() => {
                  onApply(filters);
                  onClose();
                }}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98] transition-all cursor-pointer"
              >
                Show {resultCount} Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
