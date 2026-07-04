"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Hand,
  Play,
} from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
  type: string;
  videoUrl?: string;
  videoThumbnail?: string;
}

export default function PropertyGallery({
  images,
  title,
  type,
  videoUrl,
  videoThumbnail,
}: PropertyGalleryProps) {
  const count = Math.max(images.length, 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (idx: number, dir?: number) => {
      const nextIdx = ((idx % count) + count) % count;
      setDirection(dir ?? (nextIdx > currentIndex ? 1 : -1));
      setCurrentIndex(nextIdx);
    },
    [count, currentIndex]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, goNext, goPrev]);

  // Close video on Escape
  useEffect(() => {
    if (!videoOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [videoOpen]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="space-y-3">
      {/* ── Main Display Area ── */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-video md:aspect-video aspect-[4/3] group">
        {/* AnimatePresence slide */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
            onClick={() => setLightboxOpen(true)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -60) goNext();
              else if (info.offset.x > 60) goPrev();
            }}
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - Photo ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              unoptimized
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Type badge — top left */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-black/50 dark:bg-white/10 text-white backdrop-blur-sm">
            {type}
          </span>
        </div>

        {/* Watch Video button — top right area */}
        {videoUrl && (
          <button
            onClick={() => setVideoOpen(true)}
            className="absolute top-3 right-14 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 dark:bg-white/15 text-white backdrop-blur-sm hover:bg-black/80 dark:hover:bg-white/25 transition-colors text-xs font-medium"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Watch Video
          </button>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-black/50 dark:bg-white/10 text-white backdrop-blur-sm hover:bg-black/70 dark:hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Navigation Arrows (hover-reveal on desktop) */}
        {count > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter pill — bottom right */}
        {count > 1 && (
          <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-black/40 dark:bg-white/15 backdrop-blur-md text-white text-xs font-medium">
            {currentIndex + 1} / {count}
          </div>
        )}

        {/* Dot indicators (mobile only) */}
        {count > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:hidden">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all ${
                  i === currentIndex
                    ? "w-5 h-2 bg-white dark:bg-indigo-400"
                    : "w-2 h-2 bg-white/50 dark:bg-white/30 hover:bg-white/80 dark:hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Mobile swipe hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 dark:bg-white/10 text-white text-[10px] backdrop-blur-sm"
          >
            <Hand className="w-3 h-3" />
            Swipe to navigate
          </motion.div>
        </div>
      </div>

      {/* ── Thumbnail Strip (hidden on very small, shown sm+) ── */}
      {count > 1 && (
        <div className="hidden sm:flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {/* Video thumbnail first if video exists */}
          {videoUrl && videoThumbnail && (
            <button
              onClick={() => setVideoOpen(true)}
              className="relative shrink-0 w-[72px] h-[54px] rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all"
            >
              <Image
                src={videoThumbnail}
                alt={`${title} - Video`}
                width={72}
                height={54}
                className="object-cover w-full h-full"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </button>
          )}
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative shrink-0 w-[72px] h-[54px] rounded-lg overflow-hidden border-2 transition-all ${
                i === currentIndex
                  ? "border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/20 dark:ring-indigo-400/20"
                  : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <Image
                src={img}
                alt={`${title} - Thumbnail ${i + 1}`}
                width={72}
                height={54}
                className="object-cover w-full h-full"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Video Modal ── */}
      <AnimatePresence>
        {videoOpen && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 dark:bg-black/90 backdrop-blur-md"
            onClick={() => setVideoOpen(false)}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-white/10 dark:bg-white/5 text-white hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl mx-4 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                controls
                autoPlay
                src={videoUrl}
                poster={videoThumbnail}
                className="w-full rounded-2xl"
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fullscreen Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 dark:bg-black/95 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-white/10 dark:bg-white/5 text-white hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-white/10 dark:bg-white/5 text-white text-sm font-medium backdrop-blur-sm">
              {currentIndex + 1} / {count}
            </div>

            {/* Title */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-xl bg-white/10 dark:bg-white/5 text-white text-sm font-medium backdrop-blur-sm text-center max-w-md">
              {title}
            </div>

            {/* Main Lightbox Image */}
            <div
              className="relative w-full max-w-5xl aspect-video mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_e, info) => {
                    if (info.offset.x < -60) goNext();
                    else if (info.offset.x > 60) goPrev();
                  }}
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`${title} - Photo ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Lightbox Navigation Arrows */}
            {count > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-xl bg-white/10 dark:bg-white/5 text-white hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-xl bg-white/10 dark:bg-white/5 text-white hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Keyboard hints (desktop) */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-3 text-white/40 text-xs">
              <span className="px-2 py-0.5 rounded border border-white/20">&larr;</span>
              <span className="px-2 py-0.5 rounded border border-white/20">&rarr;</span>
              <span>to navigate</span>
              <span className="px-2 py-0.5 rounded border border-white/20">Esc</span>
              <span>to close</span>
            </div>

            {/* Mobile swipe hint in lightbox */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:hidden">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] backdrop-blur-sm">
                <Hand className="w-3 h-3" />
                Swipe to navigate
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
