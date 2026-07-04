"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  Heart,
  Wrench,
  User,
} from "lucide-react";
import { hapticLight } from "@/lib/haptics";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Discover", href: "/discover", icon: Search },
  { label: "Saved", href: "/saved", icon: Heart },
  { label: "Tools", href: "/tools", icon: Wrench },
  { label: "Profile", href: "/dashboard", icon: User },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-t border-slate-200/60 dark:border-slate-800/60" />

      <div className="relative flex items-end justify-around px-2 pt-1.5 pb-safe">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => hapticLight()}
              className="relative flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 min-w-[64px] min-h-[48px] group"
            >
              {/* Active indicator pill */}
              {active && (
                <motion.div
                  layoutId="tab-active"
                  className="absolute -top-0.5 w-8 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}

              {/* Icon with scale animation */}
              <motion.div
                animate={active ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.3 }}
              >
                <Icon
                  className={`w-[22px] h-[22px] transition-colors duration-200 ${
                    active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  }`}
                  strokeWidth={active ? 2.3 : 1.8}
                />
              </motion.div>

              {/* Label */}
              <span
                className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
