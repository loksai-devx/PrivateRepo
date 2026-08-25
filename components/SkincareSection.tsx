"use client";

import { motion } from "framer-motion";
import { skincareSection } from "@/data/favorites";
import Link from "next/link";

export function SkincareSection() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md"
      >
        <p className="text-[10px] tracking-[0.4em] text-purple-light mb-8">
          {skincareSection.title}
        </p>

        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-8 h-20 border border-white/10 rounded-full"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        <p className="text-sm font-serif italic text-off-white/80">
          {skincareSection.message}
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
