"use client";

import { motion } from "framer-motion";
import type { DayEntry } from "@/types";
import { MusicPlayer } from "./MusicPlayer";
import { getSongById } from "@/data/songs";
import { markDayOpened } from "@/lib/storage";
import { useEffect } from "react";
import Link from "next/link";

interface DailyExperienceProps {
  day: DayEntry;
}

function ExperienceVisual({ type }: { type: DayEntry["experienceType"] }) {
  switch (type) {
    case "rain-moment":
      return (
        <div className="relative h-40 overflow-hidden rounded-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-dark/40 to-black" />
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-white/10 animate-rain-drop"
              style={{
                left: `${(i * 7) % 100}%`,
                height: `${20 + (i % 3) * 10}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      );
    case "glow-particle":
      return (
        <div className="relative h-40 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-purple/20 blur-2xl animate-pulse-slow" />
          <div className="absolute w-16 h-16 rounded-full border border-purple/30" />
        </div>
      );
    case "quote-serif":
      return (
        <div className="h-20 flex items-center justify-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />
        </div>
      );
    case "photo-frame":
      return (
        <div className="h-40 border border-white/10 bg-white/[0.02] flex items-center justify-center">
          <div className="w-20 h-20 border border-white/5 rounded-sm" />
        </div>
      );
    case "coffee-steam":
      return (
        <div className="h-40 flex items-end justify-center pb-8">
          <div className="relative">
            <div className="w-16 h-20 border-2 border-white/20 rounded-b-lg" />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute -top-6 w-1 h-6 bg-white/10 rounded-full animate-steam"
                style={{ left: `${20 + i * 20}%`, animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </div>
        </div>
      );
    case "fabric-flow":
      return (
        <div className="h-40 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-dark via-purple/20 to-purple-dark animate-shimmer" />
        </div>
      );
    case "shutter-flash":
      return (
        <div className="h-40 flex items-center justify-center">
          <div className="w-16 h-12 border-2 border-white/20 rounded relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white/10" />
          </div>
        </div>
      );
    case "mountain-mist":
      return (
        <div className="h-40 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-dark/60 to-transparent" />
          <div className="absolute bottom-4 left-1/4 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[50px] border-l-transparent border-r-transparent border-b-white/5" />
          <div className="absolute bottom-4 right-1/4 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[40px] border-l-transparent border-r-transparent border-b-white/5" />
        </div>
      );
    case "minimal-line":
      return (
        <div className="h-20 flex items-center justify-center gap-4">
          <div className="w-8 h-px bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-purple/40" />
          <div className="w-8 h-px bg-white/20" />
        </div>
      );
    default:
      return (
        <div className="h-32 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-purple/50 to-transparent"
          />
        </div>
      );
  }
}

export function DailyExperience({ day }: DailyExperienceProps) {
  const song = getSongById(day.songId);

  useEffect(() => {
    markDayOpened(day.id);
  }, [day.id]);

  return (
    <div className="min-h-screen bg-black text-off-white">
      <div className="max-w-lg mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href="/days"
            className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light transition-colors mb-12 inline-block"
          >
            ← ALL DAYS
          </Link>

          <p className="text-[10px] tracking-[0.4em] text-purple-light mb-4">
            DAY {String(day.id).padStart(2, "0")}
          </p>

          <h1 className="text-3xl md:text-4xl font-light tracking-[0.15em] text-white mb-2 uppercase">
            {day.quality}
          </h1>

          <p className="text-[10px] tracking-[0.2em] text-gray mb-12">
            {day.title}
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base md:text-lg font-serif italic text-off-white/90 leading-relaxed mb-12"
          >
            &ldquo;{day.message}&rdquo;
          </motion.p>

          <ExperienceVisual type={day.experienceType} />

          <div className="mt-12 border-t border-white/5 pt-8">
            <MusicPlayer song={song} dayNumber={day.id} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
