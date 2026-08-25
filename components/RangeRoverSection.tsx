"use client";

import { motion } from "framer-motion";
import { rangeRoverSection } from "@/data/favorites";
import Link from "next/link";

export function RangeRoverSection() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 max-w-md"
      >
        <p className="text-[10px] tracking-[0.4em] text-gray uppercase mb-8">
          {rangeRoverSection.title}
        </p>

        <div className="mb-12">
          <div className="w-48 h-16 border border-white/15 rounded-lg mx-auto relative">
            <div className="absolute top-2 left-4 right-4 h-6 border border-white/5 rounded" />
            <div className="absolute -bottom-3 left-8 w-8 h-8 rounded-full border border-white/15" />
            <div className="absolute -bottom-3 right-8 w-8 h-8 rounded-full border border-white/15" />
          </div>
        </div>

        <h1 className="text-2xl font-light tracking-[0.2em] text-white mb-4">
          {rangeRoverSection.name}
        </h1>

        <p className="text-sm font-serif italic text-off-white/70">
          {rangeRoverSection.message}
        </p>
      </motion.div>

      <Link
        href="/her-world"
        className="absolute bottom-8 text-[10px] tracking-[0.3em] text-gray hover:text-purple-light z-10"
      >
        ← BACK
      </Link>
    </div>
  );
}
