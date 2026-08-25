import { birthdayConfig } from "@/data/birthdayConfig";
import type { CountdownParts, UnlockState } from "@/types";

export const TIMEZONE = birthdayConfig.timezone;

export function getISTDateString(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function getISTDateTime(now: Date = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? "0", 10);

  return new Date(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );
}

export function parseISTDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00+05:30`);
}

export function isDateUnlocked(dateStr: string, now: Date = new Date()): boolean {
  const today = getISTDateString(now);
  return today >= dateStr;
}

export function getUnlockState(now: Date = new Date()): UnlockState {
  const today = getISTDateString(now);
  const startDate = birthdayConfig.startDate.slice(0, 10);
  const birthdayDate = birthdayConfig.birthdayDate.slice(0, 10);

  const isJourneyStarted = today >= startDate;
  const isBirthdayUnlocked = today >= birthdayDate;
  const isJourneyComplete = isBirthdayUnlocked;

  const unlockedDays = birthdayConfig.days
    .filter((day) => today >= day.date)
    .map((day) => day.id);

  const journeyDays = birthdayConfig.journeyDays;
  const allDaysUnlocked = unlockedDays.length >= journeyDays;

  let currentDay = 0;
  if (!isJourneyStarted) {
    currentDay = 0;
  } else if (isBirthdayUnlocked) {
    currentDay = journeyDays;
  } else {
    const latestUnlocked = unlockedDays.length > 0 ? Math.max(...unlockedDays) : 0;
    currentDay = latestUnlocked;
  }

  let nextUnlockDay: number | null = null;
  let nextUnlockDate: string | null = null;

  if (!isJourneyStarted) {
    nextUnlockDay = 1;
    nextUnlockDate = startDate;
  } else if (!allDaysUnlocked) {
    const nextDay = birthdayConfig.days.find((d) => !unlockedDays.includes(d.id));
    if (nextDay) {
      nextUnlockDay = nextDay.id;
      nextUnlockDate = nextDay.date;
    }
  } else if (!isBirthdayUnlocked) {
    nextUnlockDay = null;
    nextUnlockDate = birthdayDate;
  }

  return {
    currentDay,
    unlockedDays,
    nextUnlockDay,
    nextUnlockDate,
    isBirthdayUnlocked,
    isJourneyStarted,
    isJourneyComplete,
    allDaysUnlocked,
  };
}

export function getCountdown(now: Date = new Date()): CountdownParts {
  const state = getUnlockState(now);
  const istNow = getISTDateTime(now);

  let targetDate: Date;
  let targetLabel: string;
  let targetDay: number | null = state.nextUnlockDay;
  let isBirthdayTarget = false;

  if (!state.nextUnlockDate) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      targetLabel: "ALL UNLOCKED",
      targetDay: null,
      isBirthdayTarget: false,
    };
  }

  if (state.allDaysUnlocked && !state.isBirthdayUnlocked) {
    targetDate = parseISTDate(state.nextUnlockDate);
    targetLabel = "BIRTHDAY";
    targetDay = null;
    isBirthdayTarget = true;
  } else {
    targetDate = parseISTDate(state.nextUnlockDate);
    targetLabel = state.nextUnlockDay
      ? `DAY ${String(state.nextUnlockDay).padStart(2, "0")}`
      : "NEXT";
  }

  const diff = targetDate.getTime() - istNow.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      targetLabel,
      targetDay,
      isBirthdayTarget,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    targetLabel,
    targetDay,
    isBirthdayTarget,
  };
}

export function isDayUnlocked(dayId: number, now: Date = new Date()): boolean {
  const day = birthdayConfig.days.find((d) => d.id === dayId);
  if (!day) return false;
  return isDateUnlocked(day.date, now);
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
