"use client";

import { motion } from "framer-motion";

export function SectionBridge({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <section className={`py-24 px-6 text-center ${className}`}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.4, duration: 0.8 }}
          className={`font-serif italic text-off-white/70 ${
            i === lines.length - 1 && lines.length > 1 ? "text-lg text-purple-light/80 mt-4" : "text-sm mb-3"
          }`}
        >
          {line}
        </motion.p>
      ))}
    </section>
  );
}
