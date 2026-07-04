"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Heart,
  TreePine,
  ShoppingBag,
  UtensilsCrossed,
  Train,
  Dumbbell,
  Bus,
  Star,
} from "lucide-react";
import type { NearbyPlace } from "@/data/areas";

interface NearbyEssentialsProps {
  places: NearbyPlace[];
  compact?: boolean;
}

const categoryConfig: Record<
  NearbyPlace["type"],
  { label: string; icon: React.ElementType; color: string }
> = {
  school: {
    label: "Schools & Education",
    icon: GraduationCap,
    color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30",
  },
  college: {
    label: "Colleges & Universities",
    icon: GraduationCap,
    color:
      "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30",
  },
  hospital: {
    label: "Hospitals & Clinics",
    icon: Heart,
    color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
  },
  park: {
    label: "Parks & Recreation",
    icon: TreePine,
    color:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
  },
  shopping: {
    label: "Shopping",
    icon: ShoppingBag,
    color:
      "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30",
  },
  restaurant: {
    label: "Restaurants & Cafes",
    icon: UtensilsCrossed,
    color:
      "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30",
  },
  metro: {
    label: "Metro Stations",
    icon: Train,
    color: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30",
  },
  bus: {
    label: "Bus & Transit",
    icon: Bus,
    color: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30",
  },
  gym: {
    label: "Gyms & Fitness",
    icon: Dumbbell,
    color:
      "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30",
  },
};

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < fullStars
              ? "fill-amber-400 text-amber-400"
              : i === fullStars && hasHalf
                ? "fill-amber-400/50 text-amber-400"
                : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function PlaceCard({ place }: { place: NearbyPlace }) {
  const config = categoryConfig[place.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800/70"
    >
      <div className={`rounded-lg p-2 ${config.color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {place.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {place.distance} away
        </p>
        {place.rating && <RatingStars rating={place.rating} />}
      </div>
    </motion.div>
  );
}

export default function NearbyEssentials({
  places,
  compact = false,
}: NearbyEssentialsProps) {
  // Group places by type
  const grouped = places.reduce(
    (acc, place) => {
      if (!acc[place.type]) acc[place.type] = [];
      acc[place.type].push(place);
      return acc;
    },
    {} as Record<NearbyPlace["type"], NearbyPlace[]>
  );

  const categoryOrder: NearbyPlace["type"][] = [
    "school",
    "college",
    "hospital",
    "park",
    "shopping",
    "restaurant",
    "metro",
    "bus",
    "gym",
  ];

  const sortedCategories = categoryOrder.filter((type) => grouped[type]);

  if (compact) {
    const topPlaces = places.slice(0, 6);
    return (
      <div className="w-full">
        <h4 className="font-display mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          Nearby Essentials
        </h4>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {topPlaces.map((place) => (
            <div key={place.name} className="min-w-[200px] flex-shrink-0">
              <PlaceCard place={place} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="font-display mb-6 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
        Nearby Essentials
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedCategories.map((type) => {
          const config = categoryConfig[type];
          const Icon = config.icon;
          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className={`rounded-lg p-1.5 ${config.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {config.label}
                </h4>
              </div>
              <div className="space-y-2">
                {grouped[type].map((place) => (
                  <PlaceCard key={place.name} place={place} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
