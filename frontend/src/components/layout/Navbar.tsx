"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import SavedCount from "@/components/shared/SavedCount";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import UserMenu from "@/components/shared/UserMenu";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.product"), href: "/product" },
    { label: t("nav.solutions"), href: "/solutions" },
    { label: t("nav.discover"), href: "/discover" },
    { label: t("nav.areas"), href: "/compare-areas" },
    { label: t("nav.tools"), href: "/tools" },
    { label: t("nav.quiz"), href: "/quiz" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Announcement Bar — hidden on mobile app */}
      <div className="relative hidden lg:block bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-center py-2.5 px-4 text-[13px] font-medium overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="relative flex items-center justify-center gap-2">
          <span className="hidden sm:inline text-slate-300">
            AI leasing intelligence for modern rentals in India
          </span>
          <span className="hidden sm:inline text-slate-600">—</span>
          <span className="text-indigo-300 font-semibold tracking-wide">
            Verified rentals
          </span>
          <span className="text-slate-600 text-xs">|</span>
          <span className="text-violet-300 font-semibold tracking-wide">
            AI pricing
          </span>
          <span className="text-slate-600 text-xs">|</span>
          <span className="text-emerald-300 font-semibold tracking-wide">
            Lifecycle ops
          </span>
        </div>
      </div>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-lg shadow-slate-900/[0.03] dark:shadow-black/20 border-b border-slate-200/50 dark:border-slate-800/50"
            : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[52px] lg:h-[68px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow duration-300">
                <Building2 className="w-5 h-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-bold tracking-tight text-slate-900 dark:text-white font-display leading-none">
                  99<span className="text-indigo-600 dark:text-indigo-400">tolet</span>
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">
                  AI Leasing OS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-3.5 py-2 text-[13px] font-medium transition-colors rounded-lg group"
                  >
                    <span
                      className={
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                      }
                    >
                      {link.label}
                    </span>
                    {/* Active underline */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {/* Hover dot */}
                    {!isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 gap-1.5 text-[13px] font-medium"
                asChild
              >
                <Link href="/discover">
                  <Search className="w-3.5 h-3.5" />
                  {t("nav.aiSearch")}
                </Link>
              </Button>
              <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />
              <SavedCount />
              <LanguageSwitcher variant="compact" />
              <ThemeToggle />
              <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />
              <UserMenu />
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-1.5">
              <SavedCount />
              <LanguageSwitcher variant="compact" />
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-t border-slate-100/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3.5 text-[15px] font-medium rounded-xl transition-all min-h-[44px] flex items-center ${
                        pathname === link.href
                          ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/30"
                          : "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="pt-4 space-y-2.5 border-t border-slate-100 dark:border-slate-800 mt-4"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 h-12 text-[15px] min-h-[44px] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    asChild
                  >
                    <Link href="/discover">
                      <Search className="w-4 h-4" />
                      {t("nav.aiSearch")}
                    </Link>
                  </Button>
                  <div className="flex justify-center">
                    <UserMenu />
                  </div>
                </motion.div>
              </div>
              {/* Bottom safe area padding for mobile */}
              <div className="pb-safe" />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
