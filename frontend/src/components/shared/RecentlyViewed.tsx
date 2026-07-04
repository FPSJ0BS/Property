"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, MapPin, IndianRupee } from "lucide-react";
import { useRecentlyViewed } from "@/lib/store";
import { properties } from "@/data/properties";

interface RecentlyViewedProps {
  currentPropertyId?: string;
}

export default function RecentlyViewed({
  currentPropertyId,
}: RecentlyViewedProps) {
  const { recent } = useRecentlyViewed();

  const recentProperties = useMemo(() => {
    return recent
      .filter((id) => id !== currentPropertyId)
      .slice(0, 6)
      .map((id) => properties.find((p) => p.id === id))
      .filter(Boolean);
  }, [recent, currentPropertyId]);

  if (recentProperties.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Recently Viewed
            </h3>
          </div>
          {recent.filter((id) => id !== currentPropertyId).length > 6 && (
            <Link
              href="/saved"
              className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Horizontal scroll row */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 snap-x snap-mandatory">
          {recentProperties.map((property) => {
            if (!property) return null;
            return (
              <Link
                key={property.id}
                href={`/property/${property.slug}`}
                className="flex-shrink-0 snap-start group"
              >
                <div className="w-[220px] bg-white dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-200">
                  {/* Image */}
                  <div className="relative w-full h-[80px] overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="220px"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-2.5">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate leading-tight">
                      {property.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {property.locality}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-1.5">
                      <IndianRupee className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {property.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-slate-400">/mo</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
