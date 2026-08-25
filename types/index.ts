export type ExperienceType =
  | "fade-reveal"
  | "rain-moment"
  | "glow-particle"
  | "quote-serif"
  | "photo-frame"
  | "minimal-line"
  | "coffee-steam"
  | "fabric-flow"
  | "shutter-flash"
  | "mountain-mist";

export interface DayEntry {
  id: number;
  date: string;
  title: string;
  quality: string;
  message: string;
  songId: string;
  experienceType: ExperienceType;
  isSpecial?: boolean;
  /** Song-only day without a quality entry */
  isSongOnly?: boolean;
}

export interface Song {
  id: string;
  day: number | null;
  youtubeId: string;
  url: string;
  title: string;
  artist: string;
  isBirthdaySong?: boolean;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  memory?: string;
}

export interface Memory {
  id: string;
  title: string;
  text: string;
  date?: string;
}

export interface StoryBeat {
  id: string;
  label: string;
  text: string;
  date?: string;
}

export interface Favorite {
  id: string;
  title: string;
  description: string;
  interaction: string;
  secretMessage?: string;
}

export interface BirthdayConfig {
  startDate: string;
  birthdayDate: string;
  timezone: string;
  journeyDays: number;
  qualityDays: number;
  days: DayEntry[];
}

export interface UnlockState {
  currentDay: number;
  unlockedDays: number[];
  nextUnlockDay: number | null;
  nextUnlockDate: string | null;
  isBirthdayUnlocked: boolean;
  isJourneyStarted: boolean;
  isJourneyComplete: boolean;
  allDaysUnlocked: boolean;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetLabel: string;
  targetDay: number | null;
  isBirthdayTarget: boolean;
}
