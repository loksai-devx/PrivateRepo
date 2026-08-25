"use client";

import { motion } from "framer-motion";
import { cranberrySection } from "@/data/favorites";
import Link from "next/link";

export function CranberrySection() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md"
      >
        <motion.div
          className="w-20 h-28 mx-auto mb-8 relative"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-full h-20 bg-gradient-to-b from-red-900/50 to-red-950/30 rounded-t-full border border-white/10" />
          <div className="w-3 h-8 bg-white/10 mx-auto" />
        </motion.div>

        <h1 className="text-lg font-serif italic text-off-white/90 mb-4">
          {cranberrySection.title}
        </h1>
        <p className="text-sm text-gray">{cranberrySection.message}</p>
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
