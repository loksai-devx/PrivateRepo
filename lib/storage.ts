"use client";

const STORAGE_PREFIX = "nanna-";

export function getStorageItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_PREFIX + key);
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, value);
  } catch {
    // ignore
  }
}

export function getOpenedDays(): number[] {
  const raw = getStorageItem("opened-days");
  if (!raw) return [];
  try {
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

export function markDayOpened(dayId: number): void {
  const opened = getOpenedDays();
  if (!opened.includes(dayId)) {
    opened.push(dayId);
    setStorageItem("opened-days", JSON.stringify(opened));
  }
}

export function hasEnteredDay0(): boolean {
  return getStorageItem("day0-entered") === "true";
}

export function markDay0Entered(): void {
  setStorageItem("day0-entered", "true");
}

export function hasOpenedBirthday(): boolean {
  return getStorageItem("birthday-opened") === "true";
}

export function markBirthdayOpened(): void {
  setStorageItem("birthday-opened", "true");
}

export function getEasterEggFound(id: string): boolean {
  return getStorageItem(`egg-${id}`) === "true";
}

export function markEasterEggFound(id: string): void {
  setStorageItem(`egg-${id}`, "true");
}

export function getAllEasterEggsFound(): string[] {
  const eggs = ["moon", "coffee", "train", "purple"];
  return eggs.filter((e) => getEasterEggFound(e));
}

export function hasFoundAllEasterEggs(): boolean {
  return getAllEasterEggsFound().length >= 4;
}

export function hasSeenFinalEasterEgg(): boolean {
  return getStorageItem("final-egg") === "true";
}

export function markFinalEasterEggSeen(): void {
  setStorageItem("final-egg", "true");
}

export function isRainModeEnabled(): boolean {
  return getStorageItem("rain-mode") === "true";
}

export function setRainMode(enabled: boolean): void {
  setStorageItem("rain-mode", enabled ? "true" : "false");
}

export function isRainSoundEnabled(): boolean {
  return getStorageItem("rain-sound") === "true";
}

export function setRainSound(enabled: boolean): void {
  setStorageItem("rain-sound", enabled ? "true" : "false");
}
