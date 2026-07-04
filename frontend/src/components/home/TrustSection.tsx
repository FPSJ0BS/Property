"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  UserCheck,
  FileSearch,
  Star,
  BadgeCheck,
  Lock,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const trustFeatures = [
  { icon: UserCheck, title: "Verified Landlords", description: "Identity verified through Aadhaar/PAN. Ownership documents validated. Landlord track record scored.", accent: "bg-emerald-50 dark:bg-emerald-950/30", iconColor: "text-emerald-600 dark:text-emerald-400" },
  { icon: FileSearch, title: "Verified Properties", description: "On-ground physical inspection. Photo verification. Amenity confirmation. Condition reporting.", accent: "bg-indigo-50 dark:bg-indigo-950/30", iconColor: "text-indigo-600 dark:text-indigo-400" },
  { icon: Star, title: "Trust Score", description: "Transparent trust ratings for both parties. Based on verification depth, history, and service quality.", accent: "bg-amber-50 dark:bg-amber-950/30", iconColor: "text-amber-600 dark:text-amber-400" },
  { icon: BadgeCheck, title: "Document Confidence", description: "Digital agreement verification. Rent receipt tracking. Deposit documentation. Legal compliance.", accent: "bg-violet-50 dark:bg-violet-950/30", iconColor: "text-violet-600 dark:text-violet-400" },
  { icon: Lock, title: "Secure Transactions", description: "Protected payment flows. Deposit escrow option. Dispute resolution built into the platform.", accent: "bg-teal-50 dark:bg-teal-950/30", iconColor: "text-teal-600 dark:text-teal-400" },
  { icon: ShieldCheck, title: "Service Guarantee", description: "Every verified listing comes with 99tolet\u2019s service commitment. Issues get resolved, not ignored.", accent: "bg-indigo-50 dark:bg-indigo-950/30", iconColor: "text-indigo-600 dark:text-indigo-400" },
];

export default function TrustSection() {
  return (
    <section className="py-20 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-emerald-950/10 dark:to-slate-950" />
      <div className="absolute inset-0 bg-dots opacity-15 dark:opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="TrustShield\u2122"
          title="Trust is not optional \u2014 it\u2019s the foundation"
          subtitle="In Indian rentals, both landlords and tenants take risks. TrustShield\u2122 verifies both sides, making every transaction transparent."
        />

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {trustFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group"
            >
              <div className="h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700 p-5 sm:p-6 hover:shadow-2xl hover:shadow-emerald-500/[0.05] transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-200/40 dark:hover:border-slate-600 relative overflow-hidden">
                <div className={`absolute -top-16 -right-16 w-32 h-32 ${feature.accent} rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700`} />
                <div className="relative">
                  <div className={`w-11 h-11 rounded-xl ${feature.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 font-display">
                    {feature.title}
                  </h4>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
