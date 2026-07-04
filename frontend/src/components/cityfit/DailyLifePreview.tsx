"use client";

import { motion } from "framer-motion";
import {
  Sun,
  Car,
  Sunset,
  TreePine,
  Heart,
  ShoppingBag,
  GraduationCap,
} from "lucide-react";
import type { Area } from "@/data/areas";

interface DailyLifePreviewProps {
  area: Area;
}

interface TimelineEvent {
  time: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

function buildTimeline(area: Area): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Morning — find nearest park
  const park = area.nearbyPlaces.find((p) => p.type === "park");
  if (park) {
    events.push({
      time: "6:30 AM",
      label: "Morning Walk",
      description: `Walk to ${park.name} (${park.distance} away)`,
      icon: TreePine,
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    });
  }

  // Morning — school drop-off
  const school = area.nearbyPlaces.find(
    (p) => p.type === "school" || p.type === "college"
  );
  if (school) {
    events.push({
      time: "7:30 AM",
      label: "School Drop-off",
      description: `Drop kids at ${school.name} (${school.distance} drive)`,
      icon: GraduationCap,
      color:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    });
  }

  // Commute
  events.push({
    time: "9:00 AM",
    label: "Commute to Work",
    description: `Reach city center — ${area.commuteToCenter}`,
    icon: Car,
    color:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  });

  // Essentials — hospital proximity
  const hospital = area.nearbyPlaces.find((p) => p.type === "hospital");
  if (hospital) {
    events.push({
      time: "Anytime",
      label: "Healthcare Access",
      description: `${hospital.name} is ${hospital.distance} away`,
      icon: Heart,
      color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    });
  }

  // Essentials — grocery/shopping
  const shopping = area.nearbyPlaces.find((p) => p.type === "shopping");
  if (shopping) {
    events.push({
      time: "5:30 PM",
      label: "Grocery Run",
      description: `Pick up essentials at ${shopping.name} (${shopping.distance})`,
      icon: ShoppingBag,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    });
  }

  // Evening
  const restaurant = area.nearbyPlaces.find((p) => p.type === "restaurant");
  events.push({
    time: "7:00 PM",
    label: "Evening Wind-down",
    description: restaurant
      ? `Dinner at ${restaurant.name} (${restaurant.distance} away) or stroll through the neighborhood`
      : "Parks, restaurants, and activities nearby to unwind",
    icon: Sunset,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  });

  return events;
}

export default function DailyLifePreview({ area }: DailyLifePreviewProps) {
  const timeline = buildTimeline(area);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-amber-100 p-2.5 dark:bg-amber-900/30">
          <Sun className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            A Day in {area.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            What your daily routine could look like
          </p>
        </div>
      </div>

      {/* Highlights */}
      {area.dailyLifeHighlights.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {area.dailyLifeHighlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {highlight}
            </span>
          ))}
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute bottom-0 left-5 top-0 w-px bg-gray-200 dark:bg-gray-700 sm:left-6" />

        <div className="space-y-1">
          {timeline.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex gap-4 py-3 pl-1 sm:pl-2"
              >
                {/* Dot / Icon */}
                <div
                  className={`z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${event.color} sm:h-11 sm:w-11`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {event.time}
                    </span>
                    <span className="font-display text-sm font-semibold text-gray-900 dark:text-white">
                      {event.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
