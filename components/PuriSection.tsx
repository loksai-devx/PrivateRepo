"use client";

import { motion } from "framer-motion";
import { puriSection } from "@/data/favorites";
import Link from "next/link";

export function PuriSection() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-dark/20 to-black" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-md"
      >
        <p className="text-[10px] tracking-[0.3em] text-gray uppercase mb-8">
          {puriSection.title}
        </p>

        <div className="w-24 h-24 mx-auto mb-8 rounded-full border border-purple/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-purple/10" />
        </div>

        <h1 className="text-2xl font-light tracking-[0.15em] text-white mb-6">
          {puriSection.name}
        </h1>

        <p className="text-sm font-serif italic text-off-white/80 leading-relaxed">
          {puriSection.message}
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
