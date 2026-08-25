"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { promisesSection, type PromiseItem } from "@/data/promises";
import { CreatorEasterEgg } from "./CreatorSignature";

type PromiseState = "locked" | "confirm" | "revealing" | "kept";

function PromiseRain() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px bg-white"
          style={{
            left: `${(i * 3.3) % 100}%`,
            height: `${20 + (i % 5) * 8}px`,
            animation: `promiseRain ${1.2 + (i % 4) * 0.3}s linear infinite`,
            animationDelay: `${(i % 10) * 0.15}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes promiseRain {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function PromiseCard({
  item,
  onKept,
}: {
  item: PromiseItem;
  onKept: () => void;
}) {
  const [state, setState] = useState<PromiseState>("locked");

  const handleOpen = () => {
    setState("revealing");
    setTimeout(() => setState("kept"), 600);
    setTimeout(onKept, 1200);
  };

  const num = String(item.id).padStart(2, "0");

  return (
    <motion.div
      layout
      className={`relative border border-white/10 bg-black/60 backdrop-blur-sm p-6 md:p-8 ${
        item.isSpecial ? "border-purple/30 shadow-[0_0_40px_rgba(139,92,246,0.08)]" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-[10px] tracking-[0.3em] text-purple-light/60">{num}</span>
        {state === "kept" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] tracking-[0.2em] text-purple-light/80"
          >
            ✓
          </motion.span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {state === "locked" && (
          <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-[10px] tracking-[0.25em] text-gray mb-6">PROMISE {num}</p>
            <button
              onClick={() => setState("confirm")}
              className="px-6 py-2 border border-white/15 text-[10px] tracking-[0.25em] text-white hover:border-purple/40 transition-all"
            >
              {promisesSection.unlockButton}
            </button>
          </motion.div>
        )}

        {state === "confirm" && (
          <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {item.isSpecial ? (
              <>
                <p className="text-[10px] tracking-[0.3em] text-purple-light mb-4">
                  {item.specialTitle}
                </p>
                <p className="text-sm font-serif italic text-off-white/80 mb-4 leading-relaxed">
                  {item.text}
                </p>
                {item.specialNote && (
                  <p className="text-xs text-gray mb-6 whitespace-pre-line leading-relaxed">
                    {item.specialNote}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-[10px] tracking-[0.25em] text-gray mb-4">PROMISE {num}</p>
                <p className="text-sm font-serif italic text-off-white/70 mb-6">
                  {promisesSection.confirmPrompt}
                </p>
              </>
            )}
            <button
              onClick={handleOpen}
              className="px-6 py-2 border border-purple/40 text-[10px] tracking-[0.25em] text-purple-light hover:bg-purple/10 transition-all"
            >
              {promisesSection.openButton}
            </button>
          </motion.div>
        )}

        {(state === "revealing" || state === "kept") && (
          <motion.div
            key="revealed"
            initial={{ filter: "blur(8px)", opacity: 0.5 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {item.isSpecial && (
              <p className="text-[10px] tracking-[0.3em] text-purple-light mb-4">
                {item.specialTitle}
              </p>
            )}
            <p className="text-base md:text-lg font-serif italic text-off-white/90 leading-relaxed mb-4">
              &ldquo;{item.text}&rdquo;
            </p>
            {item.isSpecial && item.specialNote && (
              <p className="text-xs text-gray mb-4 whitespace-pre-line leading-relaxed">
                {item.specialNote}
              </p>
            )}
            {state === "kept" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] tracking-[0.2em] text-purple-light/70"
              >
                {promisesSection.keptLabel}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function MyPromises() {
  const [keptCount, setKeptCount] = useState(0);
  const [showClosing, setShowClosing] = useState(false);
  const [closingStep, setClosingStep] = useState(0);
  const total = promisesSection.items.length;
  const allKept = keptCount >= total;

  const handleKept = () => setKeptCount((c) => Math.min(c + 1, total));

  useEffect(() => {
    if (!showClosing) return;
    if (closingStep <= promisesSection.closing.lines.length) {
      const t = setTimeout(() => setClosingStep((s) => s + 1), 2200);
      return () => clearTimeout(t);
    }
  }, [showClosing, closingStep]);

  useEffect(() => {
    if (allKept && !showClosing) {
      const t = setTimeout(() => setShowClosing(true), 1500);
      return () => clearTimeout(t);
    }
  }, [allKept, showClosing]);

  return (
    <section id="promises" className="relative py-24 px-4 md:px-8 overflow-hidden">
      <PromiseRain />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.35em] text-gray mb-4">PROMISES</p>
          <p className="text-sm text-purple-light/80 mb-8">
            {keptCount} / {total}
          </p>
          <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white mb-4">
            {promisesSection.title}
          </h2>
          <p className="text-sm font-serif italic text-off-white/60">
            {promisesSection.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {promisesSection.items.map((item) => (
            <PromiseCard key={item.id} item={item} onKept={handleKept} />
          ))}
        </div>

        <CreatorEasterEgg />
      </div>

      <AnimatePresence>
        {showClosing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center"
            onClick={() => setClosingStep((s) => s + 1)}
          >
            {closingStep < promisesSection.closing.lines.length ? (
              <motion.p
                key={closingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-serif italic text-off-white/80 max-w-md"
              >
                {promisesSection.closing.lines[closingStep]}
              </motion.p>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-purple-light/80"
                onAnimationComplete={() => {
                  setTimeout(() => setShowClosing(false), 2000);
                }}
              >
                {promisesSection.closing.signoff}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
