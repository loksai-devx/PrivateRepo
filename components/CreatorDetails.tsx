"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { creator } from "@/data/creator";

export function FavoriteNumberReveal() {
  const [revealed, setRevealed] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const target = creator.favoriteNumber;

  useEffect(() => {
    if (!revealed) return;

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(target.slice(0, index));
      if (index >= target.length) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, [revealed, target]);

  return (
    <section className="py-20 px-6 text-center border-t border-white/5 max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-[10px] tracking-[0.35em] text-purple-light mb-4">
              {creator.numberReveal.title}
            </p>
            <p className="text-sm font-serif italic text-off-white/70 mb-8">
              {creator.numberReveal.hint}
            </p>
            <button
              onClick={() => setRevealed(true)}
              className="px-8 py-3 border border-white/15 text-[10px] tracking-[0.3em] text-white hover:border-purple/40 transition-all"
            >
              {creator.numberReveal.button}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-[10px] tracking-[0.3em] text-gray mb-4">
              {creator.favoriteNumberLabel}
            </p>
            <p className="text-2xl md:text-3xl font-mono tracking-[0.15em] text-white mb-4">
              {displayed}
            </p>
            <p className="text-sm font-serif italic text-off-white/60">
              {creator.numberReveal.afterReveal}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function BirthdayFooter() {
  return (
    <footer className="text-center py-12 border-t border-white/5 mt-16">
      <p className="text-[9px] tracking-[0.25em] text-gray/50 mb-3">
        {creator.footer.line1}
      </p>
      <p className="text-[9px] tracking-[0.15em] text-gray/40 mb-1">
        {creator.footer.line2}
      </p>
      <p className="text-[10px] tracking-[0.2em] text-gray/60 mb-1">
        {creator.footer.line3}
      </p>
      <p className="text-[9px] font-serif italic text-purple-light/50">
        &ldquo;{creator.footer.line4}&rdquo;
      </p>
    </footer>
  );
}

export function CreatorFinalClosing({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  const lines = [
    creator.finalClosing.forNanna,
    creator.finalClosing.signoff,
    creator.finalClosing.signature,
    creator.finalClosing.line,
  ];

  useEffect(() => {
    if (!active) return;
    setStep(0);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    if (step >= lines.length) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 2000);
    return () => clearTimeout(t);
  }, [active, step, lines.length, onComplete]);

  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[60] bg-black flex items-center justify-center p-6 text-center"
      onClick={() => setStep((s) => Math.min(s + 1, lines.length))}
    >
      <AnimatePresence mode="wait">
        {step < lines.length && (
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`font-serif italic text-off-white/90 ${
              step === 0 ? "text-xl" : step === 1 ? "text-lg text-gray" : "text-sm text-purple-light/80"
            }`}
          >
            {lines[step]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
