import { birthdayConfig } from "@/data/birthdayConfig";
import { getBirthdaySong, getSongByDay } from "@/data/songs";
import type { Song } from "@/types";
import { getISTDateString, isDayUnlocked } from "@/lib/dates";

export function isBirthdaySongUnlocked(now: Date = new Date()): boolean {
  const birthdayDate = birthdayConfig.birthdayDate.slice(0, 10);
  return getISTDateString(now) >= birthdayDate;
}

export function isSongUnlocked(song: Song, now: Date = new Date()): boolean {
  if (song.isBirthdaySong) {
    return isBirthdaySongUnlocked(now);
  }
  if (song.day === null) return false;
  return isDayUnlocked(song.day, now);
}

export function getUnlockedJourneySongs(now: Date = new Date()): Song[] {
  return Array.from({ length: birthdayConfig.journeyDays }, (_, i) => {
    const day = i + 1;
    const song = getSongByDay(day);
    return song && isDayUnlocked(day, now) ? song : null;
  }).filter((s): s is Song => s !== null);
}

export function getAvailableBirthdaySong(now: Date = new Date()): Song | undefined {
  if (!isBirthdaySongUnlocked(now)) return undefined;
  return getBirthdaySong();
}

export function getMaxUnlockedSongDay(now: Date = new Date()): number {
  const unlocked = getUnlockedJourneySongs(now);
  if (unlocked.length === 0) return 0;
  return Math.max(...unlocked.map((s) => s.day!));
}
