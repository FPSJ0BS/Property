"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyMobileCTAProps {
  propertyTitle: string;
  price: number;
  onSchedule: () => void;
  onCall: () => void;
}

export default function StickyMobileCTA({
  propertyTitle,
  price,
  onSchedule,
  onCall,
}: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-strong pb-safe"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            {/* Price */}
            <div className="shrink-0">
              <p className="text-base font-bold text-slate-900 dark:text-white">
                {"\u20B9"}{price.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
                  /mo
                </span>
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Button
                onClick={onSchedule}
                className="min-h-[44px] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs px-3 gap-1.5"
                size="sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                Schedule
              </Button>
              <Button
                onClick={onCall}
                variant="outline"
                className="min-h-[44px] text-xs px-3 gap-1.5 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                size="sm"
              >
                <Phone className="w-3.5 h-3.5" />
                Call
              </Button>
              <Button
                variant="outline"
                className="min-h-[44px] text-xs px-3 gap-1.5 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                size="sm"
                asChild
              >
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hi, I'm interested in ${propertyTitle} listed at \u20B9${price.toLocaleString("en-IN")}/mo on 99tolet.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
