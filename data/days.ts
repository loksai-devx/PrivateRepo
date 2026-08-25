import type { DayEntry } from "@/types";

const experienceTypes: DayEntry["experienceType"][] = [
  "fade-reveal",
  "rain-moment",
  "glow-particle",
  "quote-serif",
  "photo-frame",
  "minimal-line",
  "coffee-steam",
  "fabric-flow",
  "shutter-flash",
  "mountain-mist",
];

const qualities = [
  { title: "Innocence", message: "You have this rare ability to stay innocent without being unaware of the world." },
  { title: "Maturity", message: "You carry wisdom quietly — never loud, never forced." },
  { title: "Calmness", message: "In a noisy world, your calm feels like shelter." },
  { title: "Kindness", message: "You don't perform kindness. You simply are kind." },
  { title: "Simplicity", message: "You find beauty in simple things — and that says everything about you." },
  { title: "Traditional Nature", message: "You hold onto what matters — roots, values, meaning." },
  { title: "Strength", message: "Your strength doesn't announce itself. It just holds." },
  { title: "Loyalty", message: "When you care, you care deeply. That kind of loyalty is rare." },
  { title: "Curiosity", message: "You notice things others walk past. That's a gift." },
  { title: "Photography", message: "The way you see the world through a lens — it's uniquely yours." },
  { title: "Love for Music", message: "Music isn't background noise for you. It's feeling." },
  { title: "Love for Rain", message: "Rain doesn't ruin your day. It becomes part of it." },
  { title: "Love for Coffee", message: "Somehow coffee feels like part of your personality." },
  { title: "Her Sense of Style", message: "Effortless. Intentional. Unmistakably you." },
  { title: "Her Love for Sarees", message: "There's something timeless about the way you carry tradition." },
  { title: "Her Relationship with Family", message: "Family isn't just important to you — it's everything." },
  { title: "Her Patience", message: "You wait without rushing. You listen without interrupting." },
  { title: "Her Individuality", message: "You never try to be anyone else. That's your power." },
  { title: "Her Peaceful Nature", message: "Peace isn't something you seek outside. You bring it with you." },
  { title: "Enjoying Simple Things", message: "A quiet moment. Cool air. Good food. You know how to be present." },
  { title: "Her Sense of Humor", message: "You don't need drama to make people smile." },
  { title: "Her Confidence", message: "Quiet confidence — the kind that doesn't need an audience." },
  { title: "Her Caring Nature", message: "You check in. You remember. You show up." },
  { title: "Her Authenticity", message: "What you see is what you get. No masks. No performance." },
  { title: "Her Independence", message: "You stand on your own — not because you have to, but because you can." },
  { title: "Her Emotional Maturity", message: "You feel deeply, but you don't let feelings control you." },
  { title: "Staying Herself", message: "In every season, you've stayed true to who you are." },
  { title: "Her Friendship", message: "This friendship didn't need a plan. It just became real." },
  { title: "Her Presence", message: "Some people fill a room. You make it feel like home." },
  { title: "Being Nanna", message: "There's only one Nanna. And I'm glad it's you." },
];

function addDays(dateStr: string, daysToAdd: number): string {
  const d = new Date(dateStr + "T00:00:00+05:30");
  d.setDate(d.getDate() + daysToAdd);
  return d.toISOString().slice(0, 10);
}

const startDate = "2026-08-26";

const qualityDays: DayEntry[] = qualities.map((q, i) => ({
  id: i + 1,
  date: addDays(startDate, i),
  title: q.title,
  quality: q.title,
  message: q.message,
  songId: `day-${String(i + 1).padStart(2, "0")}`,
  experienceType: experienceTypes[i % experienceTypes.length],
  isSpecial: i === 29,
}));

/** Day 31 — final pre-birthday soundtrack (Sep 25). Qualities remain 30; this day is song-focused. */
const day31: DayEntry = {
  id: 31,
  date: addDays(startDate, 30),
  title: "One More Day",
  quality: "One More Day",
  message:
    "Tomorrow is your day. Until then — one last song, one last quiet moment before everything opens.",
  songId: "day-31",
  experienceType: "glow-particle",
  isSpecial: true,
  isSongOnly: true,
};

export const days: DayEntry[] = [...qualityDays, day31];
