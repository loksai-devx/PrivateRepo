"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { bucketListSection, type BucketListItem } from "@/data/bucketList";
import { getUnlockState } from "@/lib/dates";

const visualStyles: Record<BucketListItem["visual"], string> = {
  food: "from-amber-900/20 via-black to-black",
  office: "from-slate-800/30 via-black to-black",
  saree: "from-rose-900/20 via-purple-900/10 to-black",
  road: "from-slate-700/20 via-black to-black",
  cooking: "from-orange-900/15 via-black to-black",
  birthday: "from-purple-900/20 via-black to-black",
  varanasi: "from-amber-800/15 via-black to-black",
  playful: "from-red-900/10 via-purple-900/10 to-black",
  "google-coffee": "from-slate-800/25 via-purple-900/15 to-black",
};

type RevealPhase = "locked" | "oneDay" | "animating" | "revealed";

function GoogleCoffeeReveal() {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <motion.span
        initial={{ opacity: 0, scale: 0.6, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl"
        aria-hidden
      >
        ☕
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg tracking-[0.35em] text-white font-light"
      >
        GOOGLE
      </motion.span>
    </div>
  );
}

function BucketCardWithTrack({
  item,
  onUnlock,
}: {
  item: BucketListItem;
  onUnlock: () => void;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [phase, setPhase] = useState<RevealPhase>("locked");
  const num = String(item.id).padStart(2, "0");
  const isGoogleCoffee = item.visual === "google-coffee";
  const lockedLabel = item.lockedLabel ?? bucketListSection.statusLocked;

  useEffect(() => {
    if (phase !== "oneDay") return;
    const t = setTimeout(() => setPhase("animating"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "animating") return;
    const t = setTimeout(() => {
      setPhase("revealed");
      setUnlocked(true);
      onUnlock();
    }, 1800);
    return () => clearTimeout(t);
  }, [phase, onUnlock]);

  const handleClick = () => {
    if (isGoogleCoffee) {
      if (phase === "locked") setPhase("oneDay");
      return;
    }
    if (!unlocked) {
      setUnlocked(true);
      onUnlock();
    }
  };

  const showUnlocked = isGoogleCoffee ? phase === "revealed" : unlocked;
  const showOneDay = isGoogleCoffee && (phase === "oneDay" || phase === "animating" || phase === "revealed");
  const showAnimating = isGoogleCoffee && phase === "animating";
  const showContent = isGoogleCoffee ? phase === "revealed" : unlocked;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`w-full text-left relative overflow-hidden border transition-all duration-500 ${
        showUnlocked ? "border-purple/30" : "border-white/10 hover:border-white/20"
      }`}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${visualStyles[item.visual]} opacity-60`}
      />

      <div className="relative p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[0.3em] text-purple-light/70">{num}</span>
          <span
            className={`text-[9px] tracking-[0.2em] ${
              showUnlocked ? "text-purple-light" : "text-gray/50"
            }`}
          >
            {showUnlocked ? "✓ UNLOCKED" : lockedLabel}
          </span>
        </div>

        <h3 className="text-sm tracking-[0.15em] text-white mb-4">{item.title}</h3>

        <AnimatePresence mode="wait">
          {!showOneDay && !showContent ? (
            <motion.p
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray/60 tracking-[0.1em]"
            >
              Tap to peek →
            </motion.p>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {showOneDay && (
                <p className="text-[10px] tracking-[0.2em] text-purple-light/60 mb-3">
                  {bucketListSection.statusUnlock}
                </p>
              )}

              {showAnimating && <GoogleCoffeeReveal />}

              {showContent && (
                <>
                  {isGoogleCoffee && !showAnimating && (
                    <div className="flex items-center justify-center gap-4 py-6">
                      <span className="text-3xl" aria-hidden>☕</span>
                      <span className="text-lg tracking-[0.35em] text-white font-light">GOOGLE</span>
                    </div>
                  )}
                  {item.lines.map((line, i) => (
                    <p
                      key={i}
                      className={`text-sm font-serif italic text-off-white/80 leading-relaxed ${
                        i > 0 ? "mt-2" : ""
                      } ${item.isPlayful && i === item.lines.length - 1 ? "text-purple-light/70" : ""}`}
                    >
                      {line}
                    </p>
                  ))}
                  {item.footerLines && (
                    <div className="mt-6 pt-4 border-t border-white/5">
                      {item.footerLines.map((line, i) => (
                        <p
                          key={i}
                          className={`text-xs font-serif italic text-off-white/60 ${
                            i > 0 ? "mt-2" : ""
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export function BucketList() {
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [showClosing, setShowClosing] = useState(false);
  const [closingStep, setClosingStep] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const total = bucketListSection.items.length;

  useEffect(() => {
    if (unlockedCount >= total && !showClosing && !showMessage) {
      const t = setTimeout(() => setShowClosing(true), 1200);
      return () => clearTimeout(t);
    }
  }, [unlockedCount, total, showClosing, showMessage]);

  return (
    <section id="bucket-list" className="relative py-24 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.35em] text-gray mb-4">NOT DONE YET</p>
          <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white mb-4">
            {bucketListSection.title}
          </h2>
          <p className="text-sm font-serif italic text-off-white/60">
            {bucketListSection.subtitle}
          </p>
        </div>

        <div className="relative pl-6 border-l border-white/10 space-y-8 mb-16">
          {bucketListSection.items.map((item) => (
            <div key={item.id} className="relative">
              <div className="absolute -left-[25px] top-8 w-2 h-2 rounded-full bg-white/20" />
              <BucketCardWithTrack item={item} onUnlock={() => setUnlockedCount((c) => c + 1)} />
            </div>
          ))}
        </div>

        <div className="text-center border-t border-white/5 pt-8 mb-16">
          <p className="text-[10px] tracking-[0.25em] text-gray mb-2">
            {total} {bucketListSection.statsLabel.things}
          </p>
          <p className="text-sm text-white mb-1">
            <span className="text-purple-light">0</span> {bucketListSection.statsLabel.done}
          </p>
          <p className="text-sm text-gray">
            {total} {bucketListSection.statsLabel.toGo}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showClosing && !showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center"
            onClick={() => {
              if (closingStep < bucketListSection.closing.lines.length - 1) {
                setClosingStep((s) => s + 1);
              }
            }}
          >
            <motion.p
              key={closingStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-serif italic text-off-white/80 max-w-md"
            >
              {bucketListSection.closing.lines[closingStep]}
            </motion.p>
            {closingStep === bucketListSection.closing.lines.length - 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMessage(true);
                }}
                className="mt-8 px-8 py-3 border border-purple/40 text-[10px] tracking-[0.3em] text-purple-light"
              >
                {bucketListSection.closing.button}
              </motion.button>
            )}
          </motion.div>
        )}

        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-6"
            onClick={() => setShowMessage(false)}
          >
            <p className="text-sm font-serif italic text-off-white/80 text-center">
              {bucketListSection.closing.buttonMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function BucketListBridge() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(getUnlockState().isBirthdayUnlocked);
    const interval = setInterval(() => {
      setUnlocked(getUnlockState().isBirthdayUnlocked);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!unlocked) return null;

  return (
    <section className="py-24 px-6 text-center border-t border-white/5">
      {bucketListSection.bridge.lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.3 }}
          className="text-sm font-serif italic text-off-white/70 mb-4"
        >
          {line}
        </motion.p>
      ))}
      <Link
        href={bucketListSection.bridge.href}
        className="inline-block mt-8 px-8 py-3 border border-white/20 text-[10px] tracking-[0.3em] text-white hover:border-purple/40 transition-all"
      >
        {bucketListSection.bridge.button}
      </Link>
    </section>
  );
}
