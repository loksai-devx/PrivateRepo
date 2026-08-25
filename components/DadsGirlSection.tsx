"use client";

import { motion } from "framer-motion";
import { dadsGirlSection } from "@/data/favorites";
import Link from "next/link";

export function DadsGirlSection() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md"
      >
        <h1 className="text-3xl font-light tracking-[0.1em] text-white mb-8 font-serif italic">
          {dadsGirlSection.title}
        </h1>
        <p className="text-sm font-serif text-off-white/80 leading-relaxed">
          {dadsGirlSection.message}
        </p>
      </motion.div>

      <Link
        href="/her-world"
        className="absolute bottom-8 text-[10px] tracking-[0.3em] text-gray hover:text-purple-light"
      >
        ← BACK
      </Link>
    </div>
  );
}
