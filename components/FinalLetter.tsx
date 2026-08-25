"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letter, finalMessage } from "@/data/letter";
import { getBirthdaySong } from "@/data/songs";
import { isBirthdaySongUnlocked } from "@/lib/songs";
import { MusicPlayer } from "./MusicPlayer";

type LetterPhase = "title" | "intro" | "reveal" | "complete" | "final-song";

export function FinalLetter() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<LetterPhase>("title");
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [finalStep, setFinalStep] = useState(0);
  const [showClosing, setShowClosing] = useState(false);
  const [showBirthdaySong, setShowBirthdaySong] = useState(false);
  const [birthdayUnlocked, setBirthdayUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBirthdayUnlocked(isBirthdaySongUnlocked());
  }, []);

  useEffect(() => {
    if (phase !== "title") return;
    const t = setTimeout(() => setPhase("intro"), 1800);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(() => setPhase("reveal"), 2200);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "reveal") return;
    if (visibleParagraphs >= letter.paragraphs.length) {
      const t = setTimeout(() => setPhase("complete"), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleParagraphs((n) => n + 1), 900);
    return () => clearTimeout(t);
  }, [phase, visibleParagraphs]);

  const revealAll = () => {
    setVisibleParagraphs(letter.paragraphs.length);
    setPhase("complete");
  };

  const handleFinalClick = () => {
    setShowFinal(true);
    setFinalStep(0);
  };

  const advanceFinal = () => {
    if (finalStep < finalMessage.lines.length - 1) {
      setFinalStep((s) => s + 1);
    } else {
      setShowClosing(true);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const birthdaySong = getBirthdaySong();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 px-6 py-16 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {phase === "title" && (
            <motion.h1
              key="title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-[10px] tracking-[0.5em] text-purple-light min-h-[40vh] flex items-center justify-center"
            >
              {letter.title}
            </motion.h1>
          )}

          {phase === "intro" && (
            <motion.p
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-base md:text-lg font-serif italic text-off-white/85 min-h-[40vh] flex items-center justify-center leading-relaxed"
            >
              {letter.intro}
            </motion.p>
          )}

          {(phase === "reveal" || phase === "complete") && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 md:space-y-8"
            >
              <h1 className="text-center text-[10px] tracking-[0.4em] text-purple-light mb-8">
                {letter.title}
              </h1>

              {letter.paragraphs.slice(0, visibleParagraphs).map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`leading-relaxed ${
                    i === 0
                      ? "text-lg md:text-xl font-serif text-white tracking-wide"
                      : "text-sm md:text-base font-serif text-off-white/90"
                  }`}
                >
                  {p}
                </motion.p>
              ))}

              {phase === "reveal" && visibleParagraphs < letter.paragraphs.length && (
                <div className="text-center pt-6">
                  <button
                    onClick={revealAll}
                    className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light transition-colors border border-white/10 px-6 py-3"
                  >
                    {letter.readFullButton}
                  </button>
                </div>
              )}

              {phase === "complete" && birthdayUnlocked && !showBirthdaySong && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center pt-12 border-t border-white/5 mt-12"
                >
                  <p className="text-sm font-serif italic text-off-white/70 mb-6">
                    {letter.finalSongPrompt}
                  </p>
                  <button
                    onClick={() => setShowBirthdaySong(true)}
                    className="px-8 py-3 border border-purple/40 text-[10px] tracking-[0.3em] text-purple-light hover:bg-purple/10 transition-all"
                  >
                    ▶ PLAY
                  </button>
                </motion.div>
              )}

              {showBirthdaySong && birthdaySong && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-8 border-t border-white/5"
                >
                  <MusicPlayer
                    song={birthdaySong}
                    label="Final Birthday Song"
                    showDayNumber={false}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "complete" && (
          <div id="final" className="mt-24 text-center border-t border-white/5 pt-16 relative z-10">
            <p className="text-3xl font-light tracking-[0.3em] text-white mb-4">
              {finalMessage.closingName}
            </p>
            <p className="text-sm font-serif italic text-off-white/70 mb-12">
              {finalMessage.closingThanks}
            </p>

            {!showFinal && (
              <button
                onClick={handleFinalClick}
                className="px-8 py-3 border border-white/20 text-[10px] tracking-[0.3em] text-white hover:border-purple/40 transition-all"
              >
                {finalMessage.buttonText}
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showFinal && !showClosing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-6"
            onClick={advanceFinal}
          >
            <motion.p
              key={finalStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg md:text-xl font-serif italic text-off-white/90 text-center max-w-md leading-relaxed"
            >
              {finalMessage.lines[finalStep]}
            </motion.p>
          </motion.div>
        )}

        {showClosing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center"
          >
            <p className="text-2xl font-light tracking-[0.2em] text-white mb-8">
              Happy Birthday, Nanna.
            </p>
            <p className="text-sm text-gray">{finalMessage.signoff}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
