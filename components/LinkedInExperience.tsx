"use client";

import { motion } from "framer-motion";
import { linkedinMemory } from "@/data/memories";
import Link from "next/link";

export function LinkedInExperience() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-[0.4em] text-purple-light mb-12"
        >
          {linkedinMemory.title}
        </motion.p>

        {/* Connection animation */}
        <div className="relative h-32 mb-12">
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
            <span className="text-[8px] text-gray">YOU</span>
          </div>
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-purple/40 flex items-center justify-center">
            <span className="text-[8px] text-purple-light">SP</span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-1/2 left-[calc(25%+3rem)] right-[calc(25%+3rem)] h-px bg-gradient-to-r from-white/20 via-purple/60 to-purple/40 origin-left"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg tracking-[0.1em] text-white mb-2"
        >
          {linkedinMemory.name}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-xs text-gray mb-8"
        >
          {linkedinMemory.subtext}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-sm font-serif italic text-off-white/80 leading-relaxed"
        >
          {linkedinMemory.message}
        </motion.p>
      </div>

      <Link
        href="/story"
        className="absolute bottom-8 text-[10px] tracking-[0.3em] text-gray hover:text-purple-light"
      >
        ← BACK TO STORY
      </Link>
    </div>
  );
}
