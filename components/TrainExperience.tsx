"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trainMemories, secretTrainMemory, keyDates } from "@/data/memories";
import { markEasterEggFound } from "@/lib/storage";
import Link from "next/link";

export function TrainExperience() {
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [secretShown, setSecretShown] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleWindowClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      setSecretShown(true);
      markEasterEggFound("train");
    }
  };

  const memory = trainMemories[memoryIndex];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d14] to-black" />

      <div className="relative max-w-lg mx-auto px-6 pt-8 pb-6 text-center">
        <Link
          href="/story"
          className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light inline-block mb-10"
        >
          ← BACK TO STORY
        </Link>

        <p className="text-[10px] tracking-[0.4em] text-purple-light mb-3">
          THE TRAIN
        </p>
        <h1 className="text-2xl font-light tracking-[0.12em] text-white mb-2">
          First Train Meet
        </h1>
        <p className="text-[10px] tracking-[0.25em] text-gray mb-2">
          {keyDates.firstTrainMeet}
        </p>
        <p className="text-sm font-serif italic text-off-white/60 mb-10">
          Somewhere between one station and another...
        </p>

        {/* Train window */}
        <button
          onClick={handleWindowClick}
          className="relative w-full aspect-[16/10] rounded-sm overflow-hidden border border-white/15 focus:outline-none focus:ring-2 focus:ring-purple/50 shadow-[0_0_40px_rgba(108,59,255,0.08)]"
          aria-label="Train window"
        >
          {/* Window frame */}
          <div className="absolute inset-0 border-[6px] border-[#1a1a1a] z-10 pointer-events-none" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10 z-10 pointer-events-none" />

          {/* Night sky outside */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020] via-[#12182a] to-[#1a1520]">
            {/* Stars */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute w-0.5 h-0.5 rounded-full bg-white/40"
                style={{
                  left: `${10 + (i * 7) % 80}%`,
                  top: `${8 + (i * 11) % 35}%`,
                }}
              />
            ))}

            {/* Passing station lights */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`light-${i}`}
                  className="absolute h-1.5 rounded-full bg-amber-200/30 animate-train-pass blur-[1px]"
                  style={{
                    top: `${55 + (i % 3) * 8}%`,
                    width: `${40 + (i % 3) * 30}px`,
                    animationDelay: `${i * 0.6}s`,
                    animationDuration: `${1.8 + (i % 2) * 0.4}s`,
                  }}
                />
              ))}
            </div>

            {/* Distant landscape silhouette */}
            <div className="absolute bottom-8 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-[10%] w-16 h-8 bg-black/40 rounded-t-full blur-sm" />
            <div className="absolute bottom-8 right-[15%] w-24 h-10 bg-black/30 rounded-t-full blur-sm" />

            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </div>

          {/* Window sill */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#141414] border-t border-white/10 z-10" />
        </button>

        <p className="text-[9px] tracking-[0.2em] text-gray/50 mt-3">
          tap the window
        </p>

        <AnimatePresence>
          {secretShown && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-serif italic text-purple-light/80 text-center mt-4"
            >
              {secretTrainMemory}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-lg mx-auto px-6 py-10 text-center border-t border-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] tracking-[0.3em] text-purple-light mb-2">
              {memory.title}
            </p>
            {memory.date && (
              <p className="text-[10px] tracking-[0.2em] text-gray mb-4">
                {memory.date}
              </p>
            )}
            <p className="text-base md:text-lg font-serif italic text-off-white/90 leading-relaxed">
              {memory.text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={() => setMemoryIndex((i) => Math.max(0, i - 1))}
            disabled={memoryIndex === 0}
            className="text-[10px] tracking-[0.2em] text-gray hover:text-white disabled:opacity-30 transition-colors"
          >
            ← PREV
          </button>
          <span className="text-[10px] text-gray tracking-wider">
            {memoryIndex + 1} / {trainMemories.length}
          </span>
          <button
            onClick={() =>
              setMemoryIndex((i) => Math.min(trainMemories.length - 1, i + 1))
            }
            disabled={memoryIndex === trainMemories.length - 1}
            className="text-[10px] tracking-[0.2em] text-gray hover:text-white disabled:opacity-30 transition-colors"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
