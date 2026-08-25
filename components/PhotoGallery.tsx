"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Photo } from "@/types";

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
}

export function PhotoGallery({ photos, title = "SAI PRIYA — THROUGH HER CAMERA" }: PhotoGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!fullscreen) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullscreen, goNext, goPrev]);

  let touchStartX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  if (photos.length === 0) return null;

  const photo = photos[current];

  return (
    <section className="px-4 py-16 max-w-5xl mx-auto">
      <h2 className="text-center text-xl md:text-2xl font-light tracking-[0.15em] text-white mb-12">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setCurrent(i);
              setFullscreen(true);
            }}
            className="aspect-square relative overflow-hidden group"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-4 right-4 z-10 text-gray hover:text-white text-xs tracking-wider p-2"
              aria-label="Close gallery"
            >
              CLOSE
            </button>

            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-6 text-center">
              {photo.caption && (
                <p className="text-sm text-white mb-1">{photo.caption}</p>
              )}
              {photo.date && (
                <p className="text-[10px] text-gray tracking-wider">{photo.date}</p>
              )}
              {photo.memory && (
                <p className="text-xs font-serif italic text-off-white/70 mt-3 max-w-md mx-auto">
                  {photo.memory}
                </p>
              )}
            </div>

            <div className="flex justify-between px-6 pb-8">
              <button onClick={goPrev} className="text-gray hover:text-white text-xs tracking-wider" aria-label="Previous photo">
                ← PREV
              </button>
              <span className="text-[10px] text-gray">
                {current + 1} / {photos.length}
              </span>
              <button onClick={goNext} className="text-gray hover:text-white text-xs tracking-wider" aria-label="Next photo">
                NEXT →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
