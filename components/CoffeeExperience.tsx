"use client";

import { motion } from "framer-motion";
import { coffeeSection } from "@/data/favorites";
import { secretCoffeeMessage } from "@/data/memories";
import { markEasterEggFound } from "@/lib/storage";
import { useState } from "react";

export function CoffeeExperience() {
  const [showSecret, setShowSecret] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleCupClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 3) {
      setShowSecret(true);
      markEasterEggFound("coffee");
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <button onClick={handleCupClick} className="mb-8 focus:outline-none" aria-label="Coffee cup">
        <div className="relative">
          <div className="w-24 h-28 border-2 border-white/20 rounded-b-2xl mx-auto" />
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-3 border-2 border-white/20 rounded-full" />
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-10 bg-white/10 rounded-full"
              style={{ left: `${35 + i * 15}%`, top: "-2.5rem" }}
              animate={{ y: [-5, -15, -5], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
      </button>

      <h2 className="text-lg tracking-[0.15em] text-white mb-4">
        {coffeeSection.title}
      </h2>
      <p className="text-sm font-serif italic text-off-white/80 max-w-sm">
        {coffeeSection.message}
      </p>

      {showSecret && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-serif italic text-purple-light/70 mt-6"
        >
          {secretCoffeeMessage}
        </motion.p>
      )}
    </div>
  );
}
