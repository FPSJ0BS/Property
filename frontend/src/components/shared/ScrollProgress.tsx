"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface ScrollProgressProps {
  sections: Section[];
}

export default function ScrollProgress({ sections }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track scroll progress for the top bar
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(Math.min(progress, 100));
    setShowBar(scrollTop > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // IntersectionObserver for active section detection
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Progress Bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[9999] h-[2px]"
          >
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 transition-[width] duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Section Dot Nav */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-[9998] hidden lg:flex">
        <div className="flex flex-col items-center gap-3 rounded-full px-2 py-4 backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          {sections.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <div key={id} className="relative flex items-center">
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredDot === id && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-slate-900 dark:bg-slate-100 px-2.5 py-1 text-xs font-medium text-white dark:text-slate-900 shadow-lg pointer-events-none"
                    >
                      {label}
                      {/* Arrow */}
                      <span className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-100" />
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <button
                  onClick={() => scrollToSection(id)}
                  onMouseEnter={() => setHoveredDot(id)}
                  onMouseLeave={() => setHoveredDot(null)}
                  aria-label={`Scroll to ${label}`}
                  className="relative flex items-center justify-center"
                >
                  <motion.span
                    animate={{
                      width: isActive ? 12 : 8,
                      height: isActive ? 12 : 8,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`block rounded-full transition-colors duration-200 ${
                      isActive
                        ? "bg-indigo-600 dark:bg-indigo-500"
                        : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
