"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/data/birthdayConfig";
import { isDayUnlocked, getUnlockState } from "@/lib/dates";
import { useEffect, useState } from "react";

export function DayGrid() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState(getUnlockState());

  useEffect(() => {
    setMounted(true);
    setState(getUnlockState());
  }, []);

  if (!mounted) return null;

  return (
    <section className="px-4 py-16 max-w-4xl mx-auto">
      <h2 className="text-center text-[10px] tracking-[0.4em] text-gray uppercase mb-4">
        The Journey
      </h2>
      <p className="text-center text-[10px] tracking-[0.2em] text-gray/60 uppercase mb-12">
        30 qualities · 31 songs
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
        {birthdayConfig.days.map((day, i) => {
          const unlocked = isDayUnlocked(day.id);
          return (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              {unlocked ? (
                <Link
                  href={`/day/${day.id}`}
                  className="block aspect-square border border-purple/30 bg-purple/5 flex flex-col items-center justify-center hover:bg-purple/15 hover:border-purple/50 transition-all duration-300 group"
                >
                  <span className="text-[10px] tracking-[0.2em] text-gray group-hover:text-purple-light">
                    DAY
                  </span>
                  <span className="text-lg font-light text-white mt-1">
                    {String(day.id).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] tracking-wider text-purple-light/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    OPEN
                  </span>
                </Link>
              ) : (
                <div className="aspect-square border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center opacity-40">
                  <span className="text-[10px] tracking-[0.2em] text-gray/50">
                    DAY
                  </span>
                  <span className="text-lg font-light text-gray/30 mt-1">
                    {String(day.id).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] tracking-wider text-gray/30 mt-1">
                    LOCKED
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {state.isBirthdayUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <Link
            href="/birthday"
            className="inline-block px-10 py-4 border border-purple/40 text-xs tracking-[0.3em] text-purple-light hover:bg-purple/10 transition-all"
          >
            BIRTHDAY EXPERIENCE
          </Link>
        </motion.div>
      )}
    </section>
  );
}
