"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayGreeting } from "@/data/letter";
import { birthdayConfig } from "@/data/birthdayConfig";
import { journeySongs, getBirthdaySong } from "@/data/songs";
import { getUnlockState } from "@/lib/dates";
import { markBirthdayOpened } from "@/lib/storage";
import { finalEasterEggMessage } from "@/data/memories";
import { MiniMusicPlayer, MusicPlayer } from "./MusicPlayer";
import { BirthdayFooter } from "./CreatorDetails";
import Link from "next/link";

export function BirthdayUnlock() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState({
    isBirthdayUnlocked: false,
    allDaysUnlocked: false,
  });
  const [phase, setPhase] = useState<"waiting" | "reveal" | "open">("waiting");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setState(getUnlockState());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state.isBirthdayUnlocked && phase === "waiting") {
      setPhase("reveal");
      const timer = setTimeout(() => setShowContent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [state.isBirthdayUnlocked, phase]);

  const handleOpen = () => {
    markBirthdayOpened();
    setPhase("open");
  };

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!state.isBirthdayUnlocked) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
        <p className="text-[10px] tracking-[0.4em] text-gray uppercase mb-8">
          {birthdayGreeting.oneMoreDay}
        </p>
        <p className="text-2xl font-light tracking-[0.2em] text-white">
          SEPTEMBER 26
        </p>
        <Link
          href="/"
          className="mt-16 text-[10px] tracking-[0.3em] text-gray hover:text-purple-light"
        >
          ← HOME
        </Link>
      </div>
    );
  }

  if (phase === "open") {
    return (
      <div className="min-h-screen bg-black">
        <BirthdayFullExperience maxSongDay={birthdayConfig.journeyDays} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-dark/20 to-black pointer-events-none" />
      <AnimatePresence>
        {phase === "reveal" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 2 }}
            className="relative z-10"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[10px] tracking-[0.5em] text-purple-light mb-8"
            >
              {birthdayGreeting.happy}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-5xl md:text-7xl font-light tracking-[0.3em] text-white mb-6"
              style={{ textShadow: "0 0 80px rgba(108, 59, 255, 0.4)" }}
            >
              {birthdayGreeting.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-sm tracking-[0.3em] text-gray mb-2"
            >
              {birthdayGreeting.date}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3, duration: 0.8 }}
              className="text-4xl font-light text-purple-light mb-2"
            >
              {birthdayGreeting.age}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="text-sm text-gray mb-2"
            >
              {birthdayGreeting.years}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="text-sm font-serif italic text-off-white/70 mb-16"
            >
              {birthdayGreeting.ageLine}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.8 }}
              onClick={handleOpen}
              className="px-10 py-4 border border-purple/40 text-xs tracking-[0.3em] text-purple-light hover:bg-purple/10 transition-all"
            >
              {birthdayGreeting.buttonText}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BirthdayFullExperience({ maxSongDay }: { maxSongDay: number }) {
  const birthdaySong = getBirthdaySong();

  return (
    <div className="px-4 py-16 max-w-3xl mx-auto">
      <h1 className="text-center text-3xl font-light tracking-[0.2em] text-white mb-2">
        HAPPY BIRTHDAY, NANNA
      </h1>
      <p className="text-center text-2xl text-purple-light mb-2">{birthdayGreeting.age}</p>
      <p className="text-center text-sm font-serif italic text-off-white/70 mb-16">
        Everything, all at once.
      </p>

      <nav className="grid grid-cols-2 gap-3 mb-16">
        {[
          { label: "30 Qualities", href: "/days" },
          { label: "31 Journey Songs", href: "/birthday#songs" },
          { label: "Final Song", href: "/birthday#final-song" },
          { label: "Her World", href: "/her-world" },
          { label: "Gallery", href: "/gallery" },
          { label: "Our Story", href: "/story" },
          { label: "My Promises", href: "/promises" },
          { label: "Bucket List", href: "/bucket-list" },
          { label: "The Train", href: "/train" },
          { label: "LinkedIn", href: "/linkedin" },
          { label: "Peaceful Place", href: "/peaceful" },
          { label: "Letter", href: "/letter" },
          { label: "Final Message", href: "/letter#final" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-3 border border-white/10 text-[10px] tracking-[0.15em] text-gray hover:border-purple/30 hover:text-purple-light transition-all text-center"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div id="songs" className="border-t border-white/5 pt-16">
        <h2 className="text-center text-[10px] tracking-[0.3em] text-gray uppercase mb-8">
          31 Journey Songs
        </h2>
        <MiniMusicPlayer songs={journeySongs} currentDay={1} maxDay={maxSongDay} />
      </div>

      <div id="final-song" className="border-t border-white/5 pt-16 mt-16">
        <MusicPlayer
          song={birthdaySong}
          label="Final Birthday Song"
          showDayNumber={false}
        />
      </div>

      <FinalEasterEgg />
      <BirthdayFooter />
    </div>
  );
}

function FinalEasterEgg() {
  const [show, setShow] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const state = getUnlockState();
    if (state.isBirthdayUnlocked && state.allDaysUnlocked) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="text-center py-16">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="text-[10px] tracking-[0.2em] text-gray/40 hover:text-purple-light/60 transition-colors"
        >
          Did you find everything?
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-sm text-purple-light mb-4">
            There&apos;s one more thing.
          </p>
          <p className="text-sm font-serif italic text-off-white/80 max-w-md mx-auto leading-relaxed">
            {finalEasterEggMessage}
          </p>
        </motion.div>
      )}
    </div>
  );
}
