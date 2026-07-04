"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ShieldCheck, Zap, BadgeIndianRupee } from "lucide-react";
import type { Property } from "@/data/properties";
import AffordabilityBadge from "./AffordabilityBadge";

interface QuickSummaryProps {
  property: Property;
}

export default function QuickSummary({ property }: QuickSummaryProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show only after scrolling past 300px (past the gallery)
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in "${property.title}" listed on 99tolet at ${formatPrice(property.price)}/mo. Is it still available?`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-14 left-0 right-0 z-40 lg:hidden"
        >
          <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-md px-3 py-2.5">
            <div className="flex items-center gap-3">
              {/* Property image */}
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-700 shrink-0">
                {property.images?.[0] ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <Zap className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {property.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(property.price)}
                    <span className="text-xs font-normal text-zinc-400">/mo</span>
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {property.locality}
                  </span>
                </div>
                {/* Badges */}
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  {property.isVerified && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      Verified
                    </span>
                  )}
                  {property.moveInReady && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <Zap className="w-2.5 h-2.5" />
                      Move-in
                    </span>
                  )}
                  {property.fairRent === "Fair" && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800">
                      <BadgeIndianRupee className="w-2.5 h-2.5" />
                      Fair
                    </span>
                  )}
                  <AffordabilityBadge rent={property.price} compact />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-1.5 shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCall}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
