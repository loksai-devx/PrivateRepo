"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { markDay0Entered } from "@/lib/storage";
import Link from "next/link";

export function Day0Experience() {
  const [phase, setPhase] = useState<"intro" | "entered">("intro");

  const handleEnter = () => {
    markDay0Entered();
    setPhase("entered");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl font-light tracking-[0.2em] text-white mb-8"
            >
              For Nanna.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-sm font-serif italic text-off-white/70 mb-4"
            >
              Something is waiting for you.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-xs text-gray mb-16"
            >
              Not everything opens today.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              onClick={handleEnter}
              className="px-10 py-3 border border-white/20 text-[10px] tracking-[0.4em] text-white hover:border-purple/40 hover:text-purple-light transition-all"
            >
              ENTER
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="entered"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-lg font-serif italic text-off-white/80 mb-12">
              Come back tomorrow.
            </p>
            <Link
              href="/"
              className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light transition-colors"
            >
              ← HOME
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
