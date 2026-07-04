"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Search,
  Clock,
  Trash2,
  MapPin,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import PropertyCard from "@/components/shared/PropertyCard";
import { useSavedProperties, useRecentlyViewed } from "@/lib/store";
import { properties } from "@/data/properties";

export default function SavedPage() {
  const { saved, clearAll, count } = useSavedProperties();
  const { recent } = useRecentlyViewed();

  const savedProperties = useMemo(
    () => properties.filter((p) => saved.includes(p.id)),
    [saved]
  );

  const recentProperties = useMemo(
    () =>
      recent
        .slice(0, 6)
        .map((id) => properties.find((p) => p.id === id))
        .filter(Boolean),
    [recent]
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Saved Properties" },
        ]}
      />

      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Saved Properties
                </h1>
                {count > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  >
                    {count}
                  </Badge>
                )}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                Your shortlisted properties in one place
              </p>
            </div>

            {count > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="self-start sm:self-auto gap-1.5 text-red-500 border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {savedProperties.length === 0 ? (
          /* ─── Empty State ─── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6">
              <Heart className="w-10 h-10 text-slate-300 dark:text-slate-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No saved properties yet
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mb-8">
              Start exploring to save properties you love. Tap the heart icon on
              any listing to add it to your collection.
            </p>
            <Link href="/discover">
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                <Search className="w-4 h-4" />
                Explore Properties
              </Button>
            </Link>
          </motion.div>
        ) : (
          /* ─── Saved Grid ─── */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {savedProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ─── Recently Viewed Section ─── */}
        {recentProperties.length > 0 && (
          <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Recently Viewed
                </h2>
              </div>
              {recent.length > 6 && (
                <Link
                  href="/saved"
                  className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  View All
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 snap-x snap-mandatory">
              {recentProperties.map((property) => {
                if (!property) return null;
                return (
                  <Link
                    key={property.id}
                    href={`/property/${property.slug}`}
                    className="flex-shrink-0 snap-start group"
                  >
                    <div className="w-[240px] bg-white dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-200">
                      <div className="relative w-full h-[90px] overflow-hidden">
                        <Image
                          src={property.images[0]}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="240px"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {property.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {property.locality}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-0.5">
                            <IndianRupee className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                              {property.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              /mo
                            </span>
                          </div>
                          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                            View
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
