"use client";

import { useState } from "react";
import Link from "next/link";
import { markEasterEggFound } from "@/lib/storage";
import { secretMoonMessage, secretPurpleMessage } from "@/data/memories";

export function Navigation() {
  const [moonClicks, setMoonClicks] = useState(0);
  const [showMoonSecret, setShowMoonSecret] = useState(false);
  const [purpleClicks, setPurpleClicks] = useState(0);
  const [showPurpleSecret, setShowPurpleSecret] = useState(false);

  const handleMoonClick = () => {
    const next = moonClicks + 1;
    setMoonClicks(next);
    if (next >= 3) {
      setShowMoonSecret(true);
      markEasterEggFound("moon");
    }
  };

  const handlePurpleClick = () => {
    const next = purpleClicks + 1;
    setPurpleClicks(next);
    if (next >= 3) {
      setShowPurpleSecret(true);
      markEasterEggFound("purple");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-4 flex items-center justify-between bg-black/60 backdrop-blur-sm border-b border-white/5">
        <Link
          href="/"
          className="text-[10px] tracking-[0.3em] text-white hover:text-purple-light transition-colors"
        >
          NANNA
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handleMoonClick}
            className="text-gray/60 hover:text-purple-light/60 transition-colors text-sm"
            aria-label="Moon"
            title=""
          >
            ☽
          </button>
          <button
            onClick={handlePurpleClick}
            className="w-3 h-3 rounded-full bg-purple/60 hover:bg-purple transition-colors"
            aria-label="Purple accent"
          />
        </div>
      </nav>

      {showMoonSecret && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-purple-dark/90 border border-purple/30 text-xs font-serif italic text-purple-light/80 max-w-xs text-center">
          {secretMoonMessage}
        </div>
      )}

      {showPurpleSecret && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-purple-dark/90 border border-purple/30 text-xs font-serif italic text-purple-light/80 max-w-xs text-center">
          {secretPurpleMessage}
        </div>
      )}
    </>
  );
}
