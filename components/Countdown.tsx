"use client";

import { useEffect, useState } from "react";
import { getCountdown, pad } from "@/lib/dates";

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown> | null>(null);

  useEffect(() => {
    setMounted(true);
    setCountdown(getCountdown());
    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !countdown) {
    return <div className="mt-12 h-24" aria-hidden="true" />;
  }

  if (
    countdown.days === 0 &&
    countdown.hours === 0 &&
    countdown.minutes === 0 &&
    countdown.seconds === 0 &&
    countdown.targetDay === null &&
    !countdown.isBirthdayTarget
  ) {
    return null;
  }

  return (
    <div className="mt-12 text-center">
      <p className="text-[10px] tracking-[0.4em] text-gray uppercase mb-4">
        Next Memory
      </p>
      <p className="text-sm tracking-[0.3em] text-purple-light mb-6">
        {countdown.targetLabel}
      </p>
      <p className="text-[10px] tracking-[0.4em] text-gray uppercase mb-4">
        Unlocks In
      </p>
      <div
        className="flex items-center justify-center gap-3 font-mono text-2xl md:text-3xl text-off-white tracking-wider"
        suppressHydrationWarning
      >
        <TimeUnit value={countdown.days} label="D" />
        <span className="text-purple/50">:</span>
        <TimeUnit value={countdown.hours} label="H" />
        <span className="text-purple/50">:</span>
        <TimeUnit value={countdown.minutes} label="M" />
        <span className="text-purple/50">:</span>
        <TimeUnit value={countdown.seconds} label="S" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span suppressHydrationWarning>{pad(value)}</span>
      <span className="text-[8px] text-gray mt-1">{label}</span>
    </div>
  );
}
