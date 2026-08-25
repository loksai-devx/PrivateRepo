"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { person } from "@/data/person";
import { Countdown } from "./Countdown";
import { GrainOverlay, ParticleField } from "./RainEffect";
import { getUnlockState } from "@/lib/dates";
import { useEffect, useState } from "react";

export function Hero() {
  const [state, setState] = useState({
    isJourneyStarted: false,
    isBirthdayUnlocked: false,
  });

  useEffect(() => {
    setState(getUnlockState());
    const interval = setInterval(() => setState(getUnlockState()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-black">
      <ParticleField />
      <GrainOverlay />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[120px]" />

      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center max-w-lg"
      >
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-6xl md:text-8xl font-light tracking-[0.3em] text-white mb-4"
          style={{ textShadow: "0 0 60px rgba(108, 59, 255, 0.3)" }}
        >
          {person.nickname.toUpperCase()}
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm tracking-[0.2em] text-gray mb-2"
        >
          {person.heroSubtitle}
        </motion.p>

        <motion.p
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xs tracking-[0.15em] text-gray/70 mb-8"
        >
          {person.birthDate}
        </motion.p>

        <motion.p
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-sm italic font-serif text-off-white/80"
        >
          &ldquo;{person.tagline}&rdquo;
        </motion.p>

        <Countdown />

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
        >
          {!state.isJourneyStarted ? (
            <Link
              href="/day0"
              className="px-8 py-3 border border-white/20 text-xs tracking-[0.3em] text-white hover:border-purple/50 hover:text-purple-light transition-all duration-500"
            >
              ENTER
            </Link>
          ) : (
            <Link
              href="/days"
              className="px-8 py-3 border border-white/20 text-xs tracking-[0.3em] text-white hover:border-purple/50 hover:text-purple-light transition-all duration-500"
            >
              VIEW DAYS
            </Link>
          )}
          {state.isBirthdayUnlocked && (
            <Link
              href="/birthday"
              className="px-8 py-3 bg-purple/20 border border-purple/40 text-xs tracking-[0.3em] text-purple-light hover:bg-purple/30 transition-all duration-500"
            >
              BIRTHDAY
            </Link>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-[10px] tracking-[0.2em] text-gray/50"
      >
        <Link href="/her-world" className="hover:text-purple-light transition-colors">
          HER WORLD
        </Link>
        <Link href="/story" className="hover:text-purple-light transition-colors">
          OUR STORY
        </Link>
      </motion.div>
    </section>
  );
}
