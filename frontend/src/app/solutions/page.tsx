"use client";

import { motion } from "framer-motion";
import { Users, Building, Briefcase, Home, Globe, ArrowRight, CheckCircle2, XCircle, Laptop } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const solutions = [
  {
    id: "tenants",
    icon: Users,
    title: "For Tenants",
    subtitle: "Find your next home with AI intelligence",
    color: "bg-indigo-50 dark:bg-indigo-950/30",
    painPoints: [
      "Fake listings and misleading photos waste your time",
      "No way to verify if a landlord is legitimate",
      "Rent feels arbitrary \u2014 no pricing transparency",
      "After signing, you\u2019re on your own for maintenance and disputes",
    ],
    solutions: [
      "AI-powered search that understands your needs in natural language",
      "TrustShield\u2122 verified landlords and properties with visible trust scores",
      "RentIQ\u2122 shows fair rent so you know if pricing is reasonable",
      "RentalOS\u2122 manages rent, maintenance, and renewals post-lease",
    ],
    cta: "Start AI Search",
    href: "/discover",
  },
  {
    id: "landlords",
    icon: Building,
    title: "For Landlords",
    subtitle: "Maximize occupancy, minimize headaches",
    color: "bg-emerald-50 dark:bg-emerald-950/30",
    painPoints: [
      "Vacancy costs you \u20B930,000\u201380,000 per empty month",
      "No way to screen tenants before showing property",
      "Setting the right rent is guesswork",
      "Managing rent collection and maintenance is exhausting",
    ],
    solutions: [
      "AI pricing finds the optimal rent to reduce vacancy time",
      "TrustShield\u2122 screens tenants before you even meet them",
      "RentIQ\u2122 market intelligence for competitive, fair pricing",
      "RentalOS\u2122 automates collection, maintenance, and renewal tracking",
    ],
    cta: "List Your Property",
    href: "/contact",
  },
  {
    id: "brokers",
    icon: Briefcase,
    title: "For Brokers & Agents",
    subtitle: "Amplify your expertise with AI",
    color: "bg-amber-50 dark:bg-amber-950/30",
    painPoints: [
      "Too much time on unqualified leads and wasted site visits",
      "Clients don\u2019t trust your inventory because listings are unverified",
      "Manual tracking of deals, commissions, and follow-ups",
      "Competition from online platforms undercutting your value",
    ],
    solutions: [
      "AI matches clients to properties faster \u2014 fewer wasted visits",
      "Verified inventory with trust scores builds client confidence",
      "Deal tracking, commission management, and pipeline visibility",
      "AI amplifies your expertise instead of replacing it",
    ],
    cta: "Partner With Us",
    href: "/contact",
  },
  {
    id: "enterprises",
    icon: Home,
    title: "For Enterprises",
    subtitle: "Bulk leasing and employee relocation",
    color: "bg-violet-50 dark:bg-violet-950/30",
    painPoints: [
      "Finding 50+ employee accommodations in a new city is chaotic",
      "No single platform for bulk leasing with enterprise SLAs",
      "Compliance and documentation management across locations",
      "Zero visibility into rental spending and portfolio performance",
    ],
    solutions: [
      "Bulk property matching with enterprise-grade AI search",
      "Custom SLAs, dedicated account management, and API access",
      "Centralized documentation, compliance tracking, and reporting",
      "Portfolio analytics with real-time spend and vacancy dashboards",
    ],
    cta: "Enterprise Solutions",
    href: "/contact",
  },
  {
    id: "nri",
    icon: Globe,
    title: "For NRI Owners",
    subtitle: "Manage India properties from anywhere",
    color: "bg-teal-50 dark:bg-teal-950/30",
    painPoints: [
      "Can\u2019t physically inspect or manage your India properties",
      "Relying on local contacts who aren\u2019t accountable",
      "No visibility into whether rent is being collected or property maintained",
      "Time zone differences make coordination extremely difficult",
    ],
    solutions: [
      "Remote property management with on-ground verification team",
      "Digital dashboard with real-time rent, maintenance, and tenant status",
      "AI pricing ensures your rent stays competitive with the market",
      "Dedicated NRI relationship manager with async communication support",
    ],
    cta: "NRI Services",
    href: "/contact",
  },
  {
    id: "co-living",
    icon: Home,
    title: "For Co-Living Operators",
    subtitle: "Maximize occupancy, build community",
    color: "bg-cyan-50 dark:bg-cyan-950/30",
    painPoints: [
      "Managing multiple rooms across properties is chaotic",
      "Tracking occupancy and revenue manually",
      "Finding quality tenants for community-based living",
      "Handling maintenance and community events",
    ],
    solutions: [
      "AI occupancy optimization across all your spaces",
      "Automated rent collection and financial dashboard",
      "AI-matched tenants based on community fit and lifestyle",
      "Integrated maintenance and community event management",
    ],
    cta: "Operator Dashboard",
    href: "/contact",
  },
  {
    id: "co-working",
    icon: Laptop,
    title: "For Co-Working Providers",
    subtitle: "Fill desks, not spreadsheets",
    color: "bg-amber-50 dark:bg-amber-950/30",
    painPoints: [
      "Manual booking management for desks, cabins, and meeting rooms",
      "No visibility into space utilization",
      "Membership renewals and billing done manually",
      "No platform to attract new members",
    ],
    solutions: [
      "Automated booking system for all workspace types",
      "Real-time utilization analytics and optimization",
      "Automated membership management and billing",
      "AI-powered workspace discovery bringing members to you",
    ],
    cta: "Provider Tools",
    href: "/contact",
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-6">
              Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-5 sm:mb-6">
              Built for every side of the{" "}
              <span className="gradient-text">rental equation</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Whether you&apos;re searching, listing, brokering, or managing &mdash; 99tolet has a solution designed for your specific challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution sections */}
      {solutions.map((sol, idx) => (
        <section key={sol.id} id={sol.id} className={`py-20 sm:py-24 md:py-32 ${idx % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50/50 dark:bg-slate-900/50"}`}>
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl ${sol.color} flex items-center justify-center`}>
                  <sol.icon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{sol.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{sol.subtitle}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-8">
                {/* Pain Points */}
                <div className="bg-red-50/30 dark:bg-red-950/20 rounded-xl border border-red-100/50 dark:border-red-900/30 p-5 sm:p-6">
                  <h3 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-4">The Problem Today</h3>
                  <div className="space-y-3">
                    {sol.painPoints.map((p) => (
                      <div key={p} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <XCircle className="w-4 h-4 text-red-400 dark:text-red-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div className="bg-emerald-50/30 dark:bg-emerald-950/20 rounded-xl border border-emerald-100/50 dark:border-emerald-900/30 p-5 sm:p-6">
                  <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-4">How 99tolet Solves It</h3>
                  <div className="space-y-3">
                    {sol.solutions.map((s) => (
                      <div key={s} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 gap-2 w-full sm:w-auto" asChild>
                  <Link href={sol.href}>{sol.cta} <ArrowRight className="w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
}
