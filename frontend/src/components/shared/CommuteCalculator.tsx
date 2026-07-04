"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Car,
  Train,
  Bike,
  Footprints,
  Search,
  Clock,
  Navigation,
  CheckCircle2,
} from "lucide-react";

interface CommuteResult {
  mode: string;
  icon: React.ElementType;
  time: number;
  distance: string;
  color: string;
  bgColor: string;
}

interface CommuteCalculatorProps {
  propertyLocality: string;
  propertyCity: string;
}

const QUICK_DESTINATIONS = [
  "Infosys Jagatpura",
  "WTC Jaipur",
  "Jaipur Junction",
  "SMS Hospital",
  "University of Rajasthan",
  "Gaurav Tower C-Scheme",
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getTimeColor(min: number): { color: string; bgColor: string; label: string } {
  if (min < 15) return { color: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-50 dark:bg-emerald-950/40", label: "Quick" };
  if (min <= 30) return { color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-50 dark:bg-amber-950/40", label: "Moderate" };
  return { color: "text-red-500 dark:text-red-400", bgColor: "bg-red-50 dark:bg-red-950/40", label: "Long" };
}

function generateResults(destination: string, locality: string): CommuteResult[] {
  const seed =
    destination.split("").reduce((a, c) => a + c.charCodeAt(0), 0) +
    locality.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  const carTime = Math.round(8 + seededRandom(seed + 1) * 27);
  const transitTime = Math.round(15 + seededRandom(seed + 2) * 40);
  const bikeTime = Math.round(5 + seededRandom(seed + 3) * 20);
  const walkTime = Math.round(15 + seededRandom(seed + 4) * 45);

  const carDist = (carTime * 0.7 + seededRandom(seed + 5) * 3).toFixed(1);
  const transitDist = (carTime * 0.65 + seededRandom(seed + 6) * 2).toFixed(1);
  const bikeDist = carDist;
  const walkDist = (parseFloat(carDist) * 0.85).toFixed(1);

  return [
    { mode: "Car", icon: Car, time: carTime, distance: `${carDist} km`, ...getTimeColor(carTime) },
    { mode: "Metro/Bus", icon: Train, time: transitTime, distance: `${transitDist} km`, ...getTimeColor(transitTime) },
    { mode: "Bike", icon: Bike, time: bikeTime, distance: `${bikeDist} km`, ...getTimeColor(bikeTime) },
    { mode: "Walking", icon: Footprints, time: walkTime, distance: `${walkDist} km`, ...getTimeColor(walkTime) },
  ];
}

export default function CommuteCalculator({
  propertyLocality,
  propertyCity,
}: CommuteCalculatorProps) {
  const [destination, setDestination] = useState("");
  const [activeDestination, setActiveDestination] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!activeDestination) return null;
    return generateResults(activeDestination, propertyLocality);
  }, [activeDestination, propertyLocality]);

  const bestOption = useMemo(() => {
    if (!results) return null;
    return results.reduce((best, r) => (r.time < best.time ? r : best), results[0]);
  }, [results]);

  const handleSearch = useCallback(() => {
    if (destination.trim()) {
      setActiveDestination(destination.trim());
    }
  }, [destination]);

  const handleChipClick = useCallback((chip: string) => {
    setDestination(chip);
    setActiveDestination(chip);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
            <MapPin className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Commute Calculator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              How long to reach your workplace?
            </p>
          </div>
        </div>

        {/* Origin tag */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Navigation className="h-3 w-3" />
          <span>
            From: <span className="font-medium text-slate-700 dark:text-slate-300">{propertyLocality}, {propertyCity}</span>
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-5 pb-3">
        <div className="relative">
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your workplace or destination"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          {destination.trim() && (
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-3 py-1 text-xs font-medium text-white hover:shadow-md transition-shadow cursor-pointer"
            >
              Go
            </button>
          )}
        </div>

        {/* Quick chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {QUICK_DESTINATIONS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium border transition-all cursor-pointer ${
                activeDestination === chip
                  ? "border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {results && bestOption && (
          <motion.div
            key={activeDestination}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="border-t border-slate-100 dark:border-slate-800" />

            {/* Best option banner */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mx-5 mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/50 px-3.5 py-2.5"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                <span className="font-semibold">Best commute:</span>{" "}
                {bestOption.mode} &mdash; {bestOption.time} min
              </p>
            </motion.div>

            {/* Commute modes grid */}
            <div className="grid grid-cols-2 gap-3 px-5 py-4">
              {results.map((result, i) => {
                const Icon = result.icon;
                const isBest = result === bestOption;
                return (
                  <motion.div
                    key={result.mode}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className={`relative rounded-xl border p-3 transition-all ${
                      isBest
                        ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-950/20 ring-1 ring-indigo-200 dark:ring-indigo-800"
                        : "border-slate-150 dark:border-slate-700/70 bg-slate-50/50 dark:bg-slate-800/50"
                    }`}
                  >
                    {isBest && (
                      <span className="absolute -top-2 right-2 rounded-full bg-indigo-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                        BEST
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${result.bgColor}`}
                      >
                        <Icon className={`h-4 w-4 ${result.color}`} />
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        {result.mode}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-xl font-bold ${result.color}`}>
                        {result.time}
                      </span>
                      <span className="text-xs text-slate-400">min</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                      <Clock className="h-3 w-3" />
                      {result.distance}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <div className="mx-5 mb-5 relative h-32 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-100 via-violet-50 to-sky-100 dark:from-indigo-950/40 dark:via-violet-950/30 dark:to-sky-950/40 border border-slate-200 dark:border-slate-700/60">
              <svg
                viewBox="0 0 400 130"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
                  <line
                    key={`v${x}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="130"
                    stroke="currentColor"
                    className="text-indigo-200/40 dark:text-indigo-800/30"
                    strokeWidth="0.5"
                  />
                ))}
                {[25, 50, 75, 100].map((y) => (
                  <line
                    key={`h${y}`}
                    x1="0"
                    y1={y}
                    x2="400"
                    y2={y}
                    stroke="currentColor"
                    className="text-indigo-200/40 dark:text-indigo-800/30"
                    strokeWidth="0.5"
                  />
                ))}
                {/* Route path */}
                <motion.path
                  d="M 60 100 C 100 95, 120 40, 180 55 S 260 90, 300 45 Q 330 25, 350 35"
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                {/* Start pin */}
                <circle cx="60" cy="100" r="6" fill="#6366f1" />
                <circle cx="60" cy="100" r="3" fill="white" />
                {/* End pin */}
                <circle cx="350" cy="35" r="6" fill="#8b5cf6" />
                <circle cx="350" cy="35" r="3" fill="white" />
              </svg>
              <div className="absolute bottom-2 left-3 flex items-center gap-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur px-2 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                <MapPin className="h-3 w-3 text-indigo-500" />
                {propertyLocality}
              </div>
              <div className="absolute top-2 right-3 flex items-center gap-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur px-2 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                <MapPin className="h-3 w-3 text-violet-500" />
                {activeDestination}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
