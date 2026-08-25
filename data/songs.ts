import type { Song } from "@/types";

const YOUTUBE_URLS = [
  "https://youtu.be/SA7AIQw-7Ms",
  "https://youtu.be/ignEYm96A6w",
  "https://youtu.be/-t5b7MrWENk",
  "https://youtu.be/QlFwVjhllzQ",
  "https://youtu.be/Pal0uollc4E",
  "https://youtu.be/A56mZxSXKn8",
  "https://youtu.be/6LgQ0kK_AWA",
  "https://youtu.be/m2kU2b9PYcs",
  "https://youtu.be/ySoiqO0U5BY",
  "https://youtu.be/n3g5BCD1ErU",
  "https://youtu.be/CZWSdjqHzZc",
  "https://youtu.be/5yPO5lFeAIE",
  "https://youtu.be/CZWSdjqHzZc",
  "https://youtu.be/1rMrKhric_4",
  "https://youtu.be/qL9JmbRZiGI",
  "https://youtu.be/aNzKshFuTEE",
  "https://youtu.be/cULVDmIDIzI",
  "https://youtu.be/q5sxzHWvkqk",
  "https://youtu.be/zNFlJqvxwdg",
  "https://youtu.be/jb_Eijk76sE",
  "https://youtu.be/jb_Eijk76sE",
  "https://youtu.be/hCt-H4-5wco",
  "https://youtu.be/F3Td3_c96vo",
  "https://youtu.be/HbtcfWGGt_8",
  "https://youtu.be/Fa4COn3sPDY",
  "https://youtu.be/mJPEf7vWb6Q",
  "https://youtu.be/QPxvSJimDjw",
  "https://youtu.be/7dhKeHT2Bdk",
  "https://youtu.be/A56mZxSXKn8",
  "https://youtu.be/gX3jQkbBMdg",
  "https://youtu.be/JGwWNGJdvx8",
  "https://youtu.be/rrCYMsV7A-c",
] as const;

export const JOURNEY_SONG_COUNT = 31;
export const BIRTHDAY_SONG_ID = "birthday-final";

function extractYoutubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? "";
}

function buildJourneySong(index: number): Song {
  const day = index + 1;
  const url = YOUTUBE_URLS[index];
  const youtubeId = extractYoutubeId(url);

  return {
    id: `day-${String(day).padStart(2, "0")}`,
    day,
    youtubeId,
    url,
    title: "",
    artist: "",
  };
}

const birthdayUrl = YOUTUBE_URLS[31];

export const songs: Song[] = [
  ...Array.from({ length: JOURNEY_SONG_COUNT }, (_, i) => buildJourneySong(i)),
  {
    id: BIRTHDAY_SONG_ID,
    day: null,
    youtubeId: extractYoutubeId(birthdayUrl),
    url: birthdayUrl,
    title: "FINAL BIRTHDAY SONG",
    artist: "",
    isBirthdaySong: true,
  },
];

export const journeySongs = songs.filter((s) => !s.isBirthdaySong);

export function getSongById(id: string): Song | undefined {
  return songs.find((s) => s.id === id);
}

export function getSongByDay(day: number): Song | undefined {
  return songs.find((s) => s.day === day && !s.isBirthdaySong);
}

export function getBirthdaySong(): Song | undefined {
  return songs.find((s) => s.isBirthdaySong);
}
