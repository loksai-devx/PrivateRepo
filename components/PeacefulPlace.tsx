"use client";

import { motion } from "framer-motion";
import { peacefulDestination } from "@/data/favorites";
import Link from "next/link";

export function PeacefulPlace() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#12101f] to-[#0a0a0a]" />

      {/* Mountains */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <div className="absolute bottom-20 left-[10%] w-0 h-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent border-b-white/[0.03]" />
        <div className="absolute bottom-16 left-[30%] w-0 h-0 border-l-[120px] border-r-[120px] border-b-[180px] border-l-transparent border-r-transparent border-b-white/[0.05]" />
        <div className="absolute bottom-24 right-[15%] w-0 h-0 border-l-[60px] border-r-[60px] border-b-[100px] border-l-transparent border-r-transparent border-b-white/[0.03]" />
      </div>

      {/* Clouds */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/[0.03] rounded-full blur-xl"
          style={{
            width: `${100 + i * 40}px`,
            height: `${30 + i * 10}px`,
            top: `${15 + i * 12}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Trees */}
      <div className="absolute bottom-0 left-[5%] w-2 h-24 bg-white/[0.04]" />
      <div className="absolute bottom-0 left-[6%] w-16 h-16 rounded-full bg-white/[0.02] -translate-y-12" />
      <div className="absolute bottom-0 right-[8%] w-2 h-20 bg-white/[0.04]" />
      <div className="absolute bottom-0 right-[7%] w-14 h-14 rounded-full bg-white/[0.02] -translate-y-10" />

      {/* Coffee shop glow */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
        <div className="w-24 h-16 border border-yellow-200/10 rounded-sm bg-yellow-100/[0.02]">
          <div className="absolute -top-1 left-2 right-2 h-1 bg-yellow-200/5" />
          <div className="absolute top-3 left-3 w-3 h-4 bg-yellow-200/10 rounded-sm" />
          <div className="absolute top-3 right-3 w-3 h-4 bg-yellow-200/10 rounded-sm" />
        </div>
        <div className="absolute -inset-8 bg-yellow-200/[0.03] rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-light tracking-[0.15em] text-white mb-6"
        >
          {peacefulDestination.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm font-serif italic text-off-white/70 mb-2"
        >
          {peacefulDestination.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg font-serif italic text-purple-light/80 mb-8"
        >
          {peacefulDestination.reveal}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-xs text-gray max-w-sm leading-relaxed"
        >
          {peacefulDestination.description}
        </motion.p>
      </div>

      <Link
        href="/her-world"
        className="absolute bottom-8 left-0 right-0 text-center text-[10px] tracking-[0.3em] text-gray hover:text-purple-light z-10"
      >
        ← BACK
      </Link>
    </div>
  );
}
