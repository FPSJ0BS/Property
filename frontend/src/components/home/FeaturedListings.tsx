"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import PropertyCard from "@/components/shared/PropertyCard";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Building, Factory, Users, Laptop } from "lucide-react";
import Link from "next/link";

const tabs = [
  { label: "Residential", icon: Home },
  { label: "Commercial", icon: Building },
  { label: "Industrial", icon: Factory },
  { label: "Co-Living", icon: Users },
  { label: "Co-Working", icon: Laptop },
];

export default function FeaturedListings() {
  const [activeTab, setActiveTab] = useState("Residential");

  const filtered = properties.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 sm:py-36 bg-white dark:bg-slate-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Listings"
          title="Intelligent property recommendations"
          subtitle="Every listing comes with AI Match Scores, trust verification, fair rent signals, and locality intelligence."
        />

        {/* Premium tabs — scrollable on mobile */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center">
          <div className="inline-flex items-center gap-1 p-1.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700 overflow-x-auto flex-nowrap max-w-full scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap min-h-[40px] ${
                  activeTab === tab.label
                    ? "text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {activeTab === tab.label && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg shadow-lg shadow-indigo-500/25"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 sm:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mx-auto mb-4">
                  <Building className="w-7 h-7 text-indigo-300 dark:text-indigo-600" />
                </div>
                <p className="text-lg font-semibold text-slate-400 dark:text-slate-500 font-display">Coming soon</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">We&apos;re onboarding verified properties. Check back shortly.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Button
            variant="outline"
            size="lg"
            className="gap-2 border-indigo-200/80 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:border-indigo-300 dark:hover:border-indigo-700 h-11 px-6 font-semibold transition-all duration-300 hover:-translate-y-px"
            asChild
          >
            <Link href="/discover">
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
