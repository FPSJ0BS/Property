"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Target,
  Eye,
  Heart,
  Shield,
  Brain,
  Rocket,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const timeline = [
  { year: "2018", title: "Founded in Jaipur", description: "Started as a trusted offline rental service, connecting families with verified homes in Jaipur.", icon: "\u{1F3E0}" },
  { year: "2019", title: "1,000+ Rentals Managed", description: "Grew through word-of-mouth trust. Built reputation for reliable, service-backed rental operations.", icon: "\u{1F4C8}" },
  { year: "2021", title: "5,000+ Properties", description: "Expanded across all major Jaipur localities. Launched digital property management for landlords.", icon: "\u{1F3D9}\uFE0F" },
  { year: "2024", title: "AI Platform Launch", description: "Launched RentalBrain\u2122 \u2014 India's first AI matching engine for rentals. Began platform transformation.", icon: "\u{1F9E0}" },
  { year: "2025", title: "TrustShield\u2122 & RentIQ\u2122", description: "Dual-sided verification and AI pricing intelligence go live. Trust scores visible on every listing.", icon: "\u{1F6E1}\uFE0F" },
  { year: "2026", title: "India's AI Leasing OS", description: "Building the complete rental lifecycle operating system. Expanding to new cities across India.", icon: "\u{1F680}" },
];

const values = [
  { icon: Shield, title: "Trust First", description: "Every decision we make starts with trust. Verified landlords, verified properties, transparent pricing \u2014 no shortcuts." },
  { icon: Brain, title: "Intelligence Over Noise", description: "We don't add more listings \u2014 we add more intelligence. AI that understands context, not just keywords." },
  { icon: Heart, title: "Service Depth", description: "We don't disappear after the deal closes. RentalOS\u2122 manages the full lifecycle because service is our differentiator." },
  { icon: Users, title: "Both Sides Matter", description: "Tenants deserve verified homes. Landlords deserve verified tenants. We serve the equation, not one side." },
];

export default function AboutClient() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-6">
              About 99tolet
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-5 sm:mb-6">
              From Jaipur&apos;s streets to{" "}
              <span className="gradient-text">India&apos;s AI Leasing OS</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              We started by solving real rental problems on the ground in Jaipur. Today, we&apos;re
              building an AI-native platform that brings intelligence, trust, and operational depth to
              every rental in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-24 md:py-32 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-5 sm:mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                <p>
                  99tolet was born from a simple observation: the Indian rental market is broken. Not because there aren&apos;t enough properties — but because there isn&apos;t enough trust, intelligence, or operational follow-through.
                </p>
                <p>
                  We started in 2018 as a Jaipur-based rental service, personally walking tenants through verified properties and ensuring landlords got reliable, screened tenants. We saw every pain point up close — the fraudulent listings, the opaque pricing, the chaos after agreements were signed.
                </p>
                <p>
                  That ground-level experience became our foundation. In 2024, we launched our AI platform — not as a technology experiment, but as a solution to real problems we had spent years understanding.
                </p>
                <p className="font-medium text-slate-900 dark:text-white">
                  Today, 99tolet is building the most intelligent rental platform in India — an AI Leasing OS that covers search, trust, pricing, and the entire post-lease lifecycle.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 rounded-2xl p-6 sm:p-8 border border-indigo-100/50 dark:border-indigo-800/50">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { value: "10,000+", label: "Verified Properties" },
                    { value: "25,000+", label: "Happy Tenants" },
                    { value: "98%", label: "Trust Score" },
                    { value: "8+", label: "Years of Service" },
                    { value: "50+", label: "AI Intelligence Signals" },
                    { value: "6", label: "Jaipur Localities" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/80 dark:bg-slate-800/60 rounded-xl p-4 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 sm:py-24 md:py-32 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                To make every rental transaction in India intelligent, verified, fair, and fully managed — by building an AI-native leasing operating system that serves tenants, landlords, brokers, and enterprises.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                To become India&apos;s default rental infrastructure — the platform that every landlord trusts to manage their properties and every tenant trusts to find their next home. And eventually, to extend this intelligence to property sales and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24 md:py-32 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Values" title="What drives every decision" />
          <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 gap-5 sm:gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{v.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-24 md:py-32 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Journey" title="Building the future, one step at a time" />
          <div className="mt-12 sm:mt-16 space-y-5 sm:space-y-6">
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-sm shrink-0">
                    {item.icon}
                  </div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-2" />}
                </div>
                <div className="pb-6 sm:pb-8">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">{item.year}</span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-indigo-600 to-violet-700 text-white text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Join us in reshaping Indian rentals</h2>
          <p className="text-indigo-200 text-base sm:text-lg mb-8">Whether you&apos;re a user, partner, or future team member — we&apos;d love to connect.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 gap-2 w-full sm:w-auto" asChild>
              <Link href="/careers">View Careers <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 w-full sm:w-auto" asChild>
              <Link href="/contact">Contact Us <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
