"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Heart,
  UserCircle,
  Wrench,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

const trustColors: Record<string, { bg: string; text: string; label: string }> = {
  bronze: { bg: "bg-amber-100 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-400", label: "Bronze" },
  silver: { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-300", label: "Silver" },
  gold: { bg: "bg-yellow-100 dark:bg-yellow-950/40", text: "text-yellow-700 dark:text-yellow-400", label: "Gold" },
  platinum: { bg: "bg-violet-100 dark:bg-violet-950/40", text: "text-violet-700 dark:text-violet-400", label: "Platinum" },
};

const roleLabels: Record<string, string> = {
  tenant: "Tenant",
  landlord: "Landlord",
  broker: "Broker/Agent",
  enterprise: "Enterprise",
  "nri-owner": "NRI Owner",
};

export default function UserMenu() {
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  // Close on escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  // Loading state
  if (isLoading) return null;

  // Not logged in — show Sign In / Sign Up buttons
  if (!isLoggedIn || !user) {
    return (
      <div className="flex items-center gap-2.5">
        <Button
          variant="ghost"
          size="sm"
          className="text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30"
          asChild
        >
          <Link href="/login">Sign In</Link>
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 gap-1.5 text-[13px] font-semibold transition-all duration-300 hover:-translate-y-px"
          asChild
        >
          <Link href="/signup">
            <Sparkles className="w-3.5 h-3.5" />
            Sign Up
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </Link>
        </Button>
      </div>
    );
  }

  // Logged in — show avatar + dropdown
  const initials = user.name
    ? user.name.charAt(0).toUpperCase()
    : "U";
  const trust = trustColors[user.trustLevel] || trustColors.bronze;
  const roleLabel = roleLabels[user.role] || user.role;

  const handleLogout = () => {
    setOpen(false);
    logout();
    router.push("/");
  };

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Saved Properties", href: "/saved", icon: Heart },
    { label: "My Profile", href: "/profile-incomplete", icon: UserCircle },
    { label: "Tools", href: "/tools", icon: Wrench },
    { label: "Settings", href: "#", icon: Settings },
  ];

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full p-0.5 transition-all hover:ring-2 hover:ring-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white ring-2 ring-white dark:ring-slate-800 shadow-lg">
          {initials}
        </div>
        <ChevronDown
          className={`hidden sm:block h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-72 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 z-50"
          >
            {/* User Info */}
            <div className="px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-base font-bold text-white shadow-lg">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  {user.email && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Badges */}
              <div className="mt-2.5 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                  {roleLabel}
                </span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${trust.bg} ${trust.text}`}>
                  {trust.label}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-2 border-t border-slate-100 dark:border-slate-800" />

            {/* Menu Items */}
            <div className="py-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                >
                  <item.icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-2 border-t border-slate-100 dark:border-slate-800" />

            {/* Sign Out */}
            <div className="py-1.5">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
