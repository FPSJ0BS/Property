"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const inquiryTypes = [
  "I'm looking for a rental",
  "I want to list my property",
  "Enterprise / bulk leasing",
  "Broker partnership",
  "NRI property management",
  "Press / media inquiry",
  "General question",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  if (submitted) {
    return (
      <section className="py-32 text-center bg-white dark:bg-slate-950">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-md px-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Thank you!</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">We&apos;ve received your inquiry and will get back to you within 24 hours. Our team typically responds much faster.</p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Send Another Message</Button>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Let&apos;s talk
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Whether you&apos;re looking for a rental, listing a property, or exploring enterprise solutions \u2014 we&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5 sm:mb-6">Send us a message</h2>

                {/* Inquiry type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">What brings you here?</label>
                  <div className="flex flex-wrap gap-2">
                    {inquiryTypes.map((type) => (
                      <button key={type} onClick={() => setSelectedType(type)} className={`px-3 py-2 sm:py-1.5 text-sm rounded-full border transition-all ${selectedType === type ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800" : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700"}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Name</label>
                      <Input placeholder="Your full name" required className="py-3 sm:py-2 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Phone</label>
                      <Input placeholder="+91 98765 43210" type="tel" required className="py-3 sm:py-2 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Email</label>
                    <Input placeholder="you@example.com" type="email" required className="py-3 sm:py-2 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Message</label>
                    <Textarea placeholder="Tell us about your requirements..." rows={5} required className="dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500" />
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 gap-2 w-full sm:w-auto py-3 sm:py-2">
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {[
                  { icon: MapPin, title: "Office", lines: ["99tolet Technologies Pvt. Ltd.", "Vaishali Nagar, Jaipur", "Rajasthan 302021, India"] },
                  { icon: Mail, title: "Email", lines: ["hello@99tolet.com", "enterprise@99tolet.com"] },
                  { icon: Phone, title: "Phone", lines: ["+91 141-400-9999", "+91 98765-99999"] },
                  { icon: MessageCircle, title: "WhatsApp", lines: ["+91 98765-99999", "Quick support available"] },
                  { icon: Clock, title: "Business Hours", lines: ["Mon \u2013 Sat: 9:00 AM \u2013 7:00 PM", "Sunday: 10:00 AM \u2013 4:00 PM"] },
                ].map((item) => (
                  <div key={item.title} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    </div>
                    {item.lines.map((line) => (
                      <p key={line} className="text-sm text-slate-500 dark:text-slate-400">{line}</p>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
