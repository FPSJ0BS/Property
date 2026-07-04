"use client";

import { motion } from "framer-motion";
import { Users, Building, Briefcase, Globe, Home, ArrowRight, Laptop } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Link from "next/link";

const audiences = [
  { icon: Users, title: "Tenants", description: "AI-powered search that understands your lifestyle. Verified properties. Fair pricing. Move-in confidence.", cta: "Find Your Home", href: "/discover", gradient: "from-indigo-500 to-violet-500", bgHover: "bg-indigo-500/5" },
  { icon: Building, title: "Landlords", description: "AI pricing for optimal rent. Verified tenants. Vacancy reduction. Full post-lease management.", cta: "List Property", href: "/solutions#landlords", gradient: "from-emerald-500 to-teal-500", bgHover: "bg-emerald-500/5" },
  { icon: Briefcase, title: "Brokers & Agents", description: "Amplify your expertise with AI tools. Faster closings. Verified inventory. Commission tracking.", cta: "Partner With Us", href: "/solutions#brokers", gradient: "from-amber-500 to-orange-500", bgHover: "bg-amber-500/5" },
  { icon: Home, title: "Enterprises", description: "Bulk leasing, custom SLAs, employee relocation support, and enterprise-grade reporting.", cta: "Enterprise Solutions", href: "/solutions#enterprises", gradient: "from-violet-500 to-purple-500", bgHover: "bg-violet-500/5" },
  { icon: Globe, title: "NRI Owners", description: "Manage your India properties remotely. Verified tenants. Rent collection. Maintenance oversight.", cta: "NRI Services", href: "/solutions#nri", gradient: "from-teal-500 to-cyan-500", bgHover: "bg-teal-500/5" },
  { icon: Users, title: "Co-Living Operators", description: "Manage co-living spaces with AI occupancy optimization, community management, tenant matching, and maintenance automation.", cta: "Operator Tools", href: "/solutions#co-living", gradient: "from-cyan-500 to-teal-500", bgHover: "bg-cyan-500/5" },
  { icon: Laptop, title: "Co-Working Providers", description: "Desk and cabin booking management, membership management, utilization analytics, and billing automation.", cta: "Provider Tools", href: "/solutions#co-working", gradient: "from-orange-500 to-amber-500", bgHover: "bg-orange-500/5" },
];

export default function SolutionsByAudience() {
  return (
    <section className="py-20 sm:py-36 bg-white dark:bg-slate-950 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Solutions"
          title="Built for every side of the rental equation"
          subtitle="Whether you\u2019re searching, listing, brokering, or managing \u2014 99tolet has a solution for you."
        />

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group ${i === 6 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <Link href={a.href}>
                <div className="h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700 p-5 sm:p-7 hover:shadow-2xl hover:shadow-indigo-500/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-200/40 dark:hover:border-slate-600 flex flex-col relative overflow-hidden">
                  {/* Icon with gradient */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    <a.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">{a.title}</h4>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-5 flex-1">{a.description}</p>
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                    <span>{a.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
