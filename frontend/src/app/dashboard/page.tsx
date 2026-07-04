"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  MapPin,
  Brain,
  CalendarCheck,
  Heart,
  Bookmark,
  Eye,
  Sparkles,
  ArrowRight,
  BarChart3,
  Clock,
  Home,
  User,
  ChevronRight,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/shared/PropertyCard";
import { properties } from "@/data/properties";
import { useSavedProperties, useRecentlyViewed, useUserPrefs } from "@/lib/store";
import Image from "next/image";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* ─── Quick Action Card ─── */
function QuickActionCard({
  href,
  icon: Icon,
  label,
  description,
  color,
  index,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  index: number;
}) {
  const colorMap: Record<string, string> = {
    indigo:
      "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/50 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/60",
    emerald:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/50 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/60",
    violet:
      "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200/60 dark:border-violet-800/50 group-hover:bg-violet-100 dark:group-hover:bg-violet-950/60",
    cyan: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border-cyan-200/60 dark:border-cyan-800/50 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950/60",
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Link href={href}>
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-5 sm:p-6 hover:shadow-xl hover:shadow-slate-900/[0.04] dark:hover:shadow-black/20 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-200/50 dark:hover:border-indigo-700/40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50/50 dark:to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-colors duration-300 ${colorMap[color]}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {label}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
            <ChevronRight className="absolute top-1 right-0 w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Compact Recently-Viewed Card ─── */
function RecentCard({ property }: { property: (typeof properties)[0] }) {
  return (
    <Link href={`/property/${property.slug}`} className="block shrink-0 w-56 sm:w-64">
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-700/60 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="relative h-28 sm:h-32 overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
            sizes="256px"
            unoptimized
          />
          <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 border border-white/60 dark:border-slate-700/60">
            {property.aiMatchScore}% match
          </div>
        </div>
        <div className="p-3">
          <h4 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">{property.title}</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {property.locality}
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            ₹{property.price.toLocaleString("en-IN")}
            <span className="text-[10px] font-normal text-slate-400">/mo</span>
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

/* ─── Activity Stat ─── */
function ActivityStat({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40",
    emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
    violet: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40",
  };
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-700/60 p-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}

/* ─── Dashboard Page ─── */
export default function DashboardPage() {
  const { saved } = useSavedProperties();
  const { recent } = useRecentlyViewed();
  const { prefs } = useUserPrefs();

  const userName = prefs.name || "there";
  const userRole = prefs.role || "Tenant";
  const profileCompletion = 65;

  // Resolve saved property objects
  const savedProperties = properties.filter((p) => saved.includes(p.id)).slice(0, 3);

  // Resolve recently viewed property objects
  const recentProperties = recent
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4) as (typeof properties)[0][];

  // Recommended properties (first 3)
  const recommended = properties.slice(0, 3);

  const quickActions = [
    {
      href: "/discover",
      icon: Search,
      label: "Find Properties",
      description: "AI-powered search across verified rentals",
      color: "indigo",
    },
    {
      href: "/compare-areas",
      icon: MapPin,
      label: "Explore Areas",
      description: "Compare neighborhoods side by side",
      color: "emerald",
    },
    {
      href: "/quiz",
      icon: Brain,
      label: "Take Quiz",
      description: "Get personalized property recommendations",
      color: "violet",
    },
    {
      href: "/settle-in-city",
      icon: CalendarCheck,
      label: "Settlement Guide",
      description: "Your complete city move-in toolkit",
      color: "cyan",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── 1. Welcome Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 p-6 sm:p-8 overflow-hidden mb-8"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-violet-50/30 dark:from-indigo-950/20 dark:via-transparent dark:to-violet-950/10 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                  Welcome back, {userName}
                </h1>
                <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 rounded-lg border border-indigo-200/60 dark:border-indigo-800/50">
                  <User className="w-3 h-3" />
                  {userRole}
                </span>
              </div>

              {/* Profile completion */}
              <div className="mt-4 max-w-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Profile completion</span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{profileCompletion}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${profileCompletion}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Quick header actions */}
            <div className="flex flex-wrap gap-2 sm:flex-col sm:gap-2">
              <Link href="/discover">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 shadow-lg shadow-indigo-500/20 text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  AI Search
                </Button>
              </Link>
              <Link href="/saved">
                <Button size="sm" variant="outline" className="text-xs border-slate-200 dark:border-slate-700">
                  <Bookmark className="w-3.5 h-3.5 mr-1.5" />
                  Saved Properties
                </Button>
              </Link>
              <Link href="/compare-areas">
                <Button size="sm" variant="outline" className="text-xs border-slate-200 dark:border-slate-700">
                  <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
                  Compare Areas
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Main Content (2/3) ─── */}
          <div className="lg:col-span-2 space-y-8">
            {/* ─── 2. Saved Properties Preview ─── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Saved Properties
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your favourited listings</p>
                </div>
                {saved.length > 0 && (
                  <Link
                    href="/saved"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
                  >
                    View All ({saved.length})
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {savedProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {savedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
                  <Heart className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Save properties you love to see them here
                  </p>
                  <Link href="/discover">
                    <Button size="sm" variant="outline" className="mt-4 text-xs">
                      Browse Properties
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* ─── 3. Recently Viewed ─── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    Recently Viewed
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Pick up where you left off</p>
                </div>
                {recentProperties.length > 0 && (
                  <Link
                    href="/recently-viewed"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
                  >
                    See all
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {recentProperties.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                  {recentProperties.map((property) => (
                    <RecentCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
                  <Eye className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Properties you view will appear here
                  </p>
                </div>
              )}
            </motion.div>

            {/* ─── 4. Recommended for You ─── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  Recommended for You
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Based on your preferences
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {recommended.map((property) => (
                  <div key={property.id} className="relative">
                    <PropertyCard property={property} />
                    {/* AI match overlay badge */}
                    <div className="absolute -top-2 -left-2 z-10">
                      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg shadow-indigo-500/30 flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {property.aiMatchScore}% AI Match
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── Sidebar (1/3) ─── */}
          <div className="space-y-8">
            {/* ─── 5. Quick Actions Grid ─── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-5 flex items-center gap-2">
                <Home className="w-5 h-5 text-indigo-500" />
                Quick Actions
              </h2>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {quickActions.map((action, i) => (
                  <QuickActionCard key={action.href} index={i} {...action} />
                ))}
              </motion.div>
            </motion.div>

            {/* ─── 6. Your Activity ─── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Your Activity
              </h2>
              <div className="space-y-3">
                <ActivityStat icon={Heart} value="3" label="Properties saved" color="indigo" />
                <ActivityStat icon={MapPin} value="8" label="Areas explored" color="emerald" />
                <ActivityStat icon={CalendarCheck} value="1" label="Visit scheduled" color="violet" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
