"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useLanguage();

  const footerSections = [
    {
      title: t("footer.platform"),
      links: [
        { label: t("nav.product"), href: "/product" },
        { label: t("nav.solutions"), href: "/solutions" },
        { label: t("nav.discover"), href: "/discover" },
        { label: "Pricing", href: "/pricing" },
        { label: "Blog & Insights", href: "/blog" },
      ],
    },
    {
      title: t("footer.solutions"),
      links: [
        { label: "For Tenants", href: "/solutions#tenants" },
        { label: "For Landlords", href: "/solutions#landlords" },
        { label: "For Brokers", href: "/solutions#brokers" },
        { label: "For Enterprises", href: "/solutions#enterprises" },
        { label: "For NRI Owners", href: "/solutions#nri" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("nav.about"), href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: t("nav.contact"), href: "/contact" },
        { label: "Help & Support", href: "/support" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ];

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-3xl" />

      {/* Newsletter section */}
      <div className="border-b border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white font-display mb-2">
                {t("footer.subscribeTitle")}
              </h3>
              <p className="text-sm text-slate-400 max-w-md">
                {t("footer.subscribeSubtitle")}
              </p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                {t("footer.subscribed")}
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full md:w-auto"
              >
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 md:w-64 px-4 py-3 sm:py-2.5 text-sm bg-slate-900 dark:bg-slate-800 border border-slate-700/60 dark:border-slate-600/60 rounded-xl text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/20 gap-1.5 shrink-0 py-3 sm:py-2.5"
                >
                  {t("footer.subscribe")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                <Building2 className="w-5 h-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div>
                <span className="text-[22px] font-bold text-white font-display leading-none">
                  99<span className="text-indigo-400">tolet</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-7 max-w-xs leading-relaxed">
              India&apos;s AI Leasing OS. From vacancy to verified occupancy — AI
              matching, trust verification, pricing intelligence, and full
              lifecycle rental operations.
            </p>
            <div className="space-y-3.5 text-sm">
              {[
                { icon: MapPin, text: "Jaipur, Rajasthan, India", color: "text-indigo-400" },
                { icon: Mail, text: "hello@99tolet.com", color: "text-indigo-400" },
                { icon: Phone, text: "+91 141-400-9999", color: "text-indigo-400" },
                { icon: MessageCircle, text: "WhatsApp Support", color: "text-emerald-400" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-slate-400 hover:text-slate-300 transition-colors cursor-pointer group/item">
                  <item.icon className={`w-4 h-4 shrink-0 ${item.color} group-hover/item:scale-110 transition-transform`} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.15em] mb-4 sm:mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200 py-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Language Switcher */}
      <div className="flex justify-center py-4">
        <LanguageSwitcher variant="full" />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-600">
            &copy; {new Date().getFullYear()} 99tolet Technologies Pvt. Ltd.{" "}
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <Sparkles className="w-3 h-3 text-indigo-500/60" />
            <span>
              {t("footer.builtWith")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
