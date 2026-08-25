"use client";

import { motion } from "framer-motion";
import { storyBeats } from "@/data/memories";
import Link from "next/link";

export function StoryTimeline() {
  return (
    <section className="px-4 py-16 max-w-2xl mx-auto">
      <h2 className="text-center text-2xl md:text-3xl font-light tracking-[0.15em] text-white mb-16">
        HOW DID WE GET HERE?
      </h2>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple/40 via-purple/20 to-transparent -translate-x-1/2 hidden md:block" />

        {storyBeats.map((beat, i) => (
          <motion.div
            key={beat.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className={`relative mb-16 md:mb-24 ${
              i % 2 === 0 ? "md:pr-[55%] md:text-right" : "md:pl-[55%]"
            }`}
          >
            <div className="hidden md:block absolute left-1/2 top-2 w-3 h-3 rounded-full bg-purple/60 -translate-x-1/2 border-2 border-black" />

            <p className="text-[10px] tracking-[0.4em] text-purple-light mb-2">
              {beat.label}
            </p>
            {beat.date && (
              <p className="text-[10px] tracking-[0.2em] text-gray mb-2">
                {beat.date}
              </p>
            )}
            <p className="text-sm font-serif italic text-off-white/80 leading-relaxed">
              {beat.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <Link
          href="/linkedin"
          className="px-6 py-3 border border-white/10 text-[10px] tracking-[0.2em] text-gray hover:border-purple/30 hover:text-purple-light transition-all text-center"
        >
          LINKEDIN →
        </Link>
        <Link
          href="/train"
          className="px-6 py-3 border border-white/10 text-[10px] tracking-[0.2em] text-gray hover:border-purple/30 hover:text-purple-light transition-all text-center"
        >
          THE TRAIN →
        </Link>
      </div>
    </section>
  );
}
