"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { creator } from "@/data/creator";

export function CreatorEasterEgg() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="text-center py-8 opacity-30 hover:opacity-60 transition-opacity">
      <button
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((h) => !h)}
        className="text-[10px] tracking-[0.2em] text-gray/50 hover:text-gray/80 transition-colors"
        aria-label="Creator signature"
      >
        {hovered ? creator.signatureHover : `— ${creator.name}`}
      </button>
    </div>
  );
}

export function CreatorSignatureBlock() {
  return (
    <div className="text-center py-12 border-t border-white/5">
      <p className="text-[10px] tracking-[0.4em] text-white mb-2">
        {creator.nameDisplay}
      </p>
      <p className="text-xs font-serif italic text-purple-light/70">
        &ldquo;{creator.signature}&rdquo;
      </p>
    </div>
  );
}
