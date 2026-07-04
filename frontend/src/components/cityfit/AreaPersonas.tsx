"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Home,
  GraduationCap,
  Briefcase,
  PiggyBank,
  CheckCircle2,
  MapPin,
  Shield,
  Bus,
  Footprints,
  Utensils,
  Dumbbell,
  Clock,
  TreePine,
  HeartPulse,
} from "lucide-react";
import { Area, NearbyPlace } from "@/data/areas";

interface AreaPersonasProps {
  area: Area;
}

type TabKey = "families" | "students" | "professionals" | "budget";

interface Tab {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { key: "families", label: "Families", icon: <Home className="h-4 w-4" /> },
  { key: "students", label: "Students", icon: <GraduationCap className="h-4 w-4" /> },
  { key: "professionals", label: "Professionals", icon: <Briefcase className="h-4 w-4" /> },
  { key: "budget", label: "Budget Seekers", icon: <PiggyBank className="h-4 w-4" /> },
];

function countByType(places: NearbyPlace[], type: string): number {
  return places.filter((p) => p.type === type).length;
}

function getVerdict(score: number, role: string): { text: string; color: string } {
  if (score >= 80)
    return {
      text: `Excellent for ${role}`,
      color: "text-emerald-600 dark:text-emerald-400",
    };
  if (score >= 60)
    return {
      text: "Suitable with some trade-offs",
      color: "text-amber-600 dark:text-amber-400",
    };
  return {
    text: "Consider other options",
    color: "text-red-500 dark:text-red-400",
  };
}

const RING_R = 34;
const RING_C = 2 * Math.PI * RING_R;

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const color =
    score >= 80
      ? "stroke-emerald-500"
      : score >= 60
        ? "stroke-amber-500"
        : "stroke-red-400";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={RING_R}
          fill="none"
          strokeWidth="5"
          className="stroke-slate-200 dark:stroke-slate-700"
        />
        <motion.circle
          cx="40"
          cy="40"
          r={RING_R}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className={color}
          strokeDasharray={RING_C}
          initial={{ strokeDashoffset: RING_C }}
          animate={{ strokeDashoffset: RING_C - (score / 100) * RING_C }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          transform="rotate(-90 40 40)"
        />
      </svg>
      <span className="absolute text-lg font-bold text-slate-800 dark:text-white">
        {score}
      </span>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-white/60 px-3 py-2 dark:border-slate-700/30 dark:bg-slate-800/40">
      <div className="flex items-center gap-2">
        <span className="text-slate-500 dark:text-slate-400">{icon}</span>
        <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
      </div>
      <span className="text-sm font-semibold text-slate-800 dark:text-white">
        {value}
      </span>
    </div>
  );
}

export default function AreaPersonas({ area }: AreaPersonasProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("families");

  const schoolCount = countByType(area.nearbyPlaces, "school");
  const parkCount = countByType(area.nearbyPlaces, "park");
  const hospitalCount = countByType(area.nearbyPlaces, "hospital");
  const collegeCount = countByType(area.nearbyPlaces, "college");
  const restaurantCount = countByType(area.nearbyPlaces, "restaurant");
  const gymCount = countByType(area.nearbyPlaces, "gym");

  const CITY_AVG_RENT = 18000;
  const rentDiff = area.rentRange.min - CITY_AVG_RENT;
  const rentCompare =
    rentDiff < 0
      ? `₹${Math.abs(rentDiff).toLocaleString()} below city avg`
      : rentDiff === 0
        ? "At city average"
        : `₹${rentDiff.toLocaleString()} above city avg`;

  const familyBullets = [
    schoolCount >= 2
      ? "Multiple schools within walking distance — no long school runs"
      : "Limited school options — you may need transport for school runs",
    area.safetyScore >= 85
      ? "High safety rating means kids can play outdoors with confidence"
      : "Consider gated communities for added child safety",
    parkCount >= 2
      ? "Green spaces nearby for weekend family outings"
      : "Weekend outings may require short drives to parks",
  ];

  const studentBullets = [
    collegeCount >= 1
      ? "Colleges within reach — short daily commute"
      : "You may need transit to reach colleges from here",
    area.rentRange.min <= 12000
      ? "Budget-friendly rents perfect for student allowances"
      : "Rents may stretch a student budget — consider sharing",
    restaurantCount >= 2
      ? "Plenty of affordable food options nearby"
      : "Cooking at home may be more practical here",
  ];

  const professionalBullets = [
    `Commute to city center: ${area.commuteToCenter}`,
    gymCount >= 1
      ? "Fitness options available for post-work routines"
      : "You may need to travel for gym access",
    area.walkScore >= 80
      ? "Highly walkable — errands won't eat into your evenings"
      : "A vehicle helps manage evening errands efficiently",
  ];

  function renderTabContent() {
    switch (activeTab) {
      case "families": {
        const verdict = getVerdict(area.familyScore, "families");
        return (
          <motion.div
            key="families"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <ScoreRing score={area.familyScore} />
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Family Fit Score
                </p>
                <p className={`text-sm font-bold ${verdict.color}`}>
                  {verdict.text}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <StatRow icon={<GraduationCap className="h-4 w-4" />} label="Schools nearby" value={schoolCount} />
              <StatRow icon={<TreePine className="h-4 w-4" />} label="Parks" value={parkCount} />
              <StatRow icon={<HeartPulse className="h-4 w-4" />} label="Hospitals" value={hospitalCount} />
              <StatRow icon={<Shield className="h-4 w-4" />} label="Safety Score" value={`${area.safetyScore}/100`} />
            </div>
            <div className="space-y-2 pt-1">
              {familyBullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      }

      case "students": {
        const verdict = getVerdict(area.studentScore, "students");
        return (
          <motion.div
            key="students"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <ScoreRing score={area.studentScore} />
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Student Fit Score
                </p>
                <p className={`text-sm font-bold ${verdict.color}`}>
                  {verdict.text}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <StatRow icon={<GraduationCap className="h-4 w-4" />} label="Colleges nearby" value={collegeCount} />
              <StatRow icon={<MapPin className="h-4 w-4" />} label="Rent range" value={`₹${area.rentRange.min.toLocaleString()} - ₹${area.rentRange.max.toLocaleString()}`} />
              <StatRow icon={<Bus className="h-4 w-4" />} label="Transit Score" value={`${area.transitScore}/100`} />
              <StatRow icon={<Utensils className="h-4 w-4" />} label="Food options" value={restaurantCount} />
            </div>
            <div className="space-y-2 pt-1">
              {studentBullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      }

      case "professionals": {
        const verdict = getVerdict(area.professionalScore, "professionals");
        return (
          <motion.div
            key="professionals"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <ScoreRing score={area.professionalScore} />
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Professional Fit Score
                </p>
                <p className={`text-sm font-bold ${verdict.color}`}>
                  {verdict.text}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <StatRow icon={<Clock className="h-4 w-4" />} label="Commute to center" value={area.commuteToCenter} />
              <StatRow icon={<Dumbbell className="h-4 w-4" />} label="Gyms nearby" value={gymCount} />
              <StatRow icon={<Utensils className="h-4 w-4" />} label="Restaurants" value={restaurantCount} />
              <StatRow icon={<Footprints className="h-4 w-4" />} label="Walk Score" value={`${area.walkScore}/100`} />
            </div>
            <div className="space-y-2 pt-1">
              {professionalBullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      }

      case "budget": {
        const isAffordable = area.rentRange.min < 15000;
        const transitSaving =
          area.transitScore >= 75
            ? "Strong public transit can save ₹3,000-5,000/month vs car"
            : "Limited transit — budget ₹3,000-5,000/month for transport";

        return (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-emerald-200 dark:border-emerald-800/60">
                <span className="text-lg font-bold text-slate-800 dark:text-white">
                  ₹{area.rentRange.min.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  min/mo
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Budget Analysis
                </p>
                <p
                  className={`text-sm font-bold ${
                    rentDiff <= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {rentCompare}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <StatRow
                icon={<MapPin className="h-4 w-4" />}
                label="Rent range"
                value={`₹${area.rentRange.min.toLocaleString()} - ₹${area.rentRange.max.toLocaleString()}`}
              />
              <StatRow
                icon={<PiggyBank className="h-4 w-4" />}
                label="vs City avg (₹18,000)"
                value={rentCompare}
              />
              <StatRow
                icon={<Home className="h-4 w-4" />}
                label="Low-deposit availability"
                value={isAffordable ? "Likely available" : "Limited options"}
              />
              <StatRow
                icon={<Bus className="h-4 w-4" />}
                label="Transit savings"
                value={area.transitScore >= 75 ? "₹3-5K/mo saved" : "Car likely needed"}
              />
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>{transitSaving}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>
                  {isAffordable
                    ? "Affordable area — great for first-time renters and students"
                    : "Premium area — best for those with a higher budget"}
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>
                  Rent trend: {area.avgRentTrend} — {area.avgRentTrend.includes("+") && parseInt(area.avgRentTrend) > 8 ? "rising fast, lock in early" : "stable growth"}
                </span>
              </div>
            </div>
          </motion.div>
        );
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-lg dark:border-slate-700/60 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500" />

      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-md">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Who This Area Suits
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Role-based suitability for {area.name}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative mb-6 flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-800/60">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
              activeTab === tab.key
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }`}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="activePersonaTab"
                className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-slate-700"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
    </motion.div>
  );
}
