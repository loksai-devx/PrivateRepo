"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { favorites } from "@/data/favorites";
import { markEasterEggFound } from "@/lib/storage";
import Link from "next/link";

export function FavoritesGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleClick = (id: string, interaction: string) => {
    setActiveId(id);
    if (interaction === "coffee") {
      markEasterEggFound("coffee");
    }
  };

  const active = favorites.find((f) => f.id === activeId);

  return (
    <section className="px-4 py-16 max-w-4xl mx-auto">
      <h2 className="text-center text-2xl md:text-3xl font-light tracking-[0.2em] text-white mb-4">
        HER WORLD
      </h2>
      <p className="text-center text-xs text-gray mb-12 tracking-wider">
        Tap to explore
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {favorites.map((fav, i) => (
          <motion.button
            key={fav.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleClick(fav.id, fav.interaction)}
            className="aspect-[4/3] border border-white/10 bg-white/[0.02] p-4 flex flex-col items-center justify-center hover:border-purple/30 hover:bg-purple/5 transition-all duration-300 text-center group"
          >
            <InteractionIcon type={fav.interaction} />
            <span className="text-[10px] tracking-[0.15em] text-gray group-hover:text-purple-light mt-3 transition-colors">
              {fav.title}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <InteractionAnimation type={active.interaction} />
              <h3 className="text-lg tracking-[0.15em] text-white mt-8 mb-4">
                {active.title}
              </h3>
              <p className="text-sm font-serif italic text-off-white/80 leading-relaxed mb-8">
                {active.description}
              </p>
              {active.interaction === "peaceful" && (
                <Link href="/peaceful" className="text-xs tracking-[0.2em] text-purple-light hover:underline">
                  VISIT THE PLACE →
                </Link>
              )}
              {active.interaction === "temple" && (
                <Link href="/puri" className="text-xs tracking-[0.2em] text-purple-light hover:underline">
                  LEARN MORE →
                </Link>
              )}
              {active.interaction === "coffee" && (
                <Link href="/coffee" className="text-xs tracking-[0.2em] text-purple-light hover:underline">
                  COFFEE MOMENT →
                </Link>
              )}
              {active.interaction === "car" && (
                <Link href="/range-rover" className="text-xs tracking-[0.2em] text-purple-light hover:underline">
                  THE DREAM RIDE →
                </Link>
              )}
              {active.interaction === "icecream" && (
                <Link href="/cranberry" className="text-xs tracking-[0.2em] text-purple-light hover:underline">
                  TREAT YOURSELF →
                </Link>
              )}
              {active.interaction === "skincare" && (
                <Link href="/skincare" className="text-xs tracking-[0.2em] text-purple-light hover:underline">
                  SELF CARE →
                </Link>
              )}
              <button
                onClick={() => setActiveId(null)}
                className="block mx-auto mt-8 text-[10px] tracking-[0.3em] text-gray hover:text-white"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function InteractionIcon({ type }: { type: string }) {
  const iconClass = "w-8 h-8 text-purple-light/60";
  switch (type) {
    case "coffee":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 8h12v6a4 4 0 01-4 4H10a4 4 0 01-4-4V8z" />
          <path d="M18 10h1a2 2 0 010 4h-1" />
        </svg>
      );
    case "rain":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 14l-1 3M12 14v3M16 14l1 3" />
          <path d="M6 10a6 6 0 0112 0" />
        </svg>
      );
    case "music":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    default:
      return <div className="w-8 h-8 rounded-full border border-purple/30" />;
  }
}

function InteractionAnimation({ type }: { type: string }) {
  switch (type) {
    case "coffee":
      return (
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-24 border-2 border-white/20 rounded-b-xl mx-auto" />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute -top-8 w-1.5 h-8 bg-white/15 rounded-full animate-steam"
                style={{ left: `${30 + i * 18}%`, animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </div>
        </div>
      );
    case "rain":
      return (
        <div className="h-24 relative overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-6 bg-white/20 animate-rain-drop"
              style={{ left: `${(i * 13) % 100}%`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      );
    case "shutter":
      return (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.3 }}
          className="w-16 h-12 border-2 border-white/30 rounded mx-auto flex items-center justify-center"
        >
          <div className="w-6 h-6 rounded-full border border-white/20" />
        </motion.div>
      );
    case "saree":
      return (
        <div className="h-16 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-dark via-purple/30 to-purple-dark animate-shimmer" />
        </div>
      );
    case "icecream":
      return (
        <div className="flex justify-center">
          <div className="w-12 h-16 bg-gradient-to-b from-red-900/40 to-red-950/20 rounded-t-full border border-white/10" />
        </div>
      );
    case "car":
      return (
        <div className="flex justify-center">
          <div className="w-32 h-10 border border-white/20 rounded-lg relative">
            <div className="absolute -bottom-2 left-4 w-5 h-5 rounded-full border border-white/20" />
            <div className="absolute -bottom-2 right-4 w-5 h-5 rounded-full border border-white/20" />
          </div>
        </div>
      );
    default:
      return <div className="h-16" />;
  }
}
