"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Users,
  Settings,
  ArrowLeft,
} from "lucide-react";

interface AuthShellProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBenefits?: boolean;
}

const benefits = [
  {
    icon: ShieldCheck,
    label: "Verified rental relationships",
  },
  {
    icon: TrendingUp,
    label: "AI-powered pricing intelligence",
  },
  {
    icon: Users,
    label: "Dual-sided trust verification",
  },
  {
    icon: Settings,
    label: "Full lifecycle rental operations",
  },
];

export default function AuthShell({
  children,
  title,
  subtitle,
  showBenefits = true,
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left — Trust Benefits Panel (hidden below lg) */}
      {showBenefits && (
        <div className="relative hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 p-10 text-white">
          {/* Dots pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top — Logo */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">
                99tolet
              </span>
            </Link>
          </div>

          {/* Middle — Heading + benefits */}
          <div className="relative z-10 space-y-8">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight">
                More than a rental
                <br />
                platform
              </h2>
            </div>

            <div className="space-y-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3.5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                    <b.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[15px] font-medium text-white/90">
                    {b.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom — Social proof */}
          <div className="relative z-10">
            <p className="text-sm font-medium text-white/60">
              Trusted by 25,000+ users across Jaipur
            </p>
          </div>
        </div>
      )}

      {/* Right — Auth Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo (mobile-friendly, always visible) */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                99tolet
              </span>
            </Link>

            <div className="space-y-1.5">
              <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {title}
              </h1>
              <p className="text-[15px] text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Form / children */}
          {children}

          {/* Back to website */}
          <div className="pt-2 text-center lg:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to website
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
