# NANNA — 30 Days
## Complete Documentation

A premium interactive birthday website for **Sai Priya (Nanna)**.  
A 30-day digital memory journey that culminates in a full birthday experience on **September 26, 2026**.

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Website Pages](#2-website-pages)
3. [30-Day Unlock System](#3-30-day-unlock-system)
4. [Where to Edit Everything](#4-where-to-edit-everything)
5. [Content Prep Checklist](#5-content-prep-checklist)
6. [How to Add Songs](#6-how-to-add-songs)
7. [How to Add Photos](#7-how-to-add-photos)
8. [How to Edit Each Day](#8-how-to-edit-each-day)
9. [Easter Eggs](#9-easter-eggs)
10. [Deploy](#10-deploy)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Quick Start

```bash
cd nanna-birthday
npm install
npm run dev
```

Open: **http://localhost:3000**

Build for production:

```bash
npm run build
npm start
```

---

## 2. Website Pages

| URL | What it is |
|-----|------------|
| `/` | Landing page — NANNA hero, countdown, ENTER button |
| `/day0` | Pre-launch screen (before Day 1 unlocks) |
| `/days` | Grid of all 30 days (locked/unlocked) |
| `/day/1` … `/day/30` | Individual daily experience |
| `/birthday` | Birthday unlock + full experience hub |
| `/her-world` | Interactive favorites grid |
| `/story` | LinkedIn → Train timeline |
| `/linkedin` | LinkedIn connection experience |
| `/train` | Train window + memories |
| `/gallery` | Photo gallery |
| `/peaceful` | Imaginary peaceful destination |
| `/puri` | Puri Jagannath section |
| `/coffee` | Coffee interaction |
| `/cranberry` | Cranberry ice cream |
| `/range-rover` | Range Rover card |
| `/skincare` | Self-care section |
| `/dads-girl` | Dad's girl section |
| `/letter` | Personal letter + final message |

**Nav controls (top bar):**
- **NANNA** — back to home
- **☽** — moon easter egg (click 3×)
- **RAIN** — toggle rain mode
- **Purple dot** — hidden easter egg (click 3×)

---

## 3. 30-Day Unlock System

All dates use **Asia/Kolkata (IST)** — not the visitor's local timezone.

| Event | Date & Time (IST) |
|-------|-------------------|
| Journey starts | August 26, 2026 — 00:00 |
| Day 1 unlocks | August 26, 2026 |
| Day 2 unlocks | August 27, 2026 |
| … | … |
| Day 30 unlocks | September 24, 2026 |
| **Birthday unlock** | **September 26, 2026 — 00:00** |
| After birthday | Everything stays unlocked forever |

**Before Aug 26:** Home shows ENTER → Day 0 screen → "Come back tomorrow."  
**Aug 26 – Sep 25:** One new day unlocks each midnight IST.  
**Sep 26+:** Birthday experience + all sections fully open.

Config file: `data/birthdayConfig.ts`  
Logic file: `lib/dates.ts`

---

## 4. Where to Edit Everything

| Content | File to edit |
|---------|--------------|
| Name, nickname, birthday, personality, favorites | `data/person.ts` |
| 30 qualities, titles, messages, experience types | `data/days.ts` |
| 30 songs (title, artist, URL) | `data/songs.ts` |
| Photo gallery | `data/photos.ts` |
| Story, train memories, LinkedIn text, easter eggs | `data/memories.ts` |
| Her world cards, coffee, Puri, Dad's girl, etc. | `data/favorites.ts` |
| Birthday letter, final message, birthday greeting | `data/letter.ts` |
| Start date, birthday date, timezone | `data/birthdayConfig.ts` |
| Image files | `public/images/` |
| Audio files | `public/audio/` |
| Rain ambient sound (optional) | `public/audio/rain.mp3` |

> **Rule:** Edit content in `data/` files only. Do not change UI components unless you want design changes.

---

## 5. Content Prep Checklist

Prepare these and share when ready (doc, spreadsheet, or pasted text + files).

### A. Personal Details
- [ ] Full name
- [ ] Nickname
- [ ] Birthday
- [ ] Personality traits
- [ ] Favorite colors, food, car, temple, ice cream, music

### B. 30 Daily Messages *(most important)*

For each day (1–30):

```
Day 01 — Innocence — "Your personal message here..."
Day 02 — Maturity — "Your personal message here..."
...
Day 30 — Being Nanna — "Your personal message here..."
```

### C. 30 Songs

For each day:

```
Day 01 — Song Title — Artist Name — filename.mp3 (or URL)
Day 02 — ...
...
Day 30 — ...
```

### D. Photos (Gallery)

For each photo:

| Filename | Caption | Date | Memory |
|----------|---------|------|--------|
| photo-1.jpg | Through her lens | Aug 2024 | A quiet moment... |
| photo-2.jpg | Coffee mornings | ... | ... |

Minimum: 6 photos recommended.

### E. Our Story

- [ ] **LinkedIn** — how you connected (1–2 lines)
- [ ] **Train** — first conversation (2–3 short memories)
- [ ] **After** — how friendship grew (optional)

### F. Her World (short lines per favorite)

- [ ] Coffee
- [ ] Rain
- [ ] Music
- [ ] Sarees
- [ ] Photography
- [ ] Skincare
- [ ] Cranberry ice cream
- [ ] Range Rover
- [ ] Puri Jagannath
- [ ] Peaceful places
- [ ] Non-veg / food spots

### G. Dad's Girl Section
- [ ] Short respectful message (only what you're comfortable sharing)

### H. Birthday Letter (`FOR NANNA`)
- [ ] Greeting
- [ ] 4–6 paragraphs (friendship, gratitude, memories, wishes)
- [ ] Sign-off (e.g. "— Your Bestie")

### I. Final Message (`ONE LAST THING`)
- [ ] Closing lines (LinkedIn + train theme)
- [ ] "Happy Birthday, Nanna."
- [ ] Sign-off

### J. Easter Eggs (optional)
- [ ] Moon secret (3 clicks)
- [ ] Coffee secret (3 clicks)
- [ ] Train window secret (3 clicks)
- [ ] Purple dot secret (3 clicks)
- [ ] Final easter egg message (after birthday)

### K. Media Files

| Type | Folder | Format |
|------|--------|--------|
| Songs | `public/audio/` | MP3 |
| Photos | `public/images/` | JPG, PNG, WebP |
| Rain sound | `public/audio/rain.mp3` | MP3 (optional) |
| Birthday song | `public/audio/birthday.mp3` | MP3 (optional) |

### Priority Order (if short on time)

1. 30 day messages
2. Birthday letter + final message
3. Story (LinkedIn + train)
4. 30 songs
5. Photos
6. Easter eggs & fine-tuning

---

## 6. How to Add Songs

**Step 1:** Put MP3 files in `public/audio/`

```
public/audio/day-01.mp3
public/audio/day-02.mp3
...
```

**Step 2:** Edit `data/songs.ts`

```ts
{
  id: "day-01",
  day: 1,
  title: "Him & I",
  artist: "G-Eazy & Halsey",
  url: "/audio/day-01.mp3",
}
```

- Leave `url: ""` if song not ready — page shows *"Today's song is waiting."*
- Songs **never autoplay** — user must click PLAY.

---

## 7. How to Add Photos

**Step 1:** Add images to `public/images/`

```
public/images/photo-1.jpg
public/images/photo-2.jpg
```

**Step 2:** Edit `data/photos.ts`

```ts
{
  id: "photo-1",
  src: "/images/photo-1.jpg",
  alt: "Description for accessibility",
  caption: "Through her lens",
  date: "August 2024",
  memory: "Replace with your personal memory.",
}
```

Gallery supports: fullscreen view, swipe on mobile, arrow keys on desktop.

---

## 8. How to Edit Each Day

Edit `data/days.ts`. Each day looks like:

```ts
{
  id: 1,
  date: "2026-08-26",        // auto-calculated from start date
  title: "Innocence",
  quality: "Innocence",
  message: "Your personal message here.",
  songId: "day-01",          // must match id in songs.ts
  experienceType: "fade-reveal",
  isSpecial: false,
}
```

**Experience types** (visual style per day):

| Type | Visual |
|------|--------|
| `fade-reveal` | Subtle line reveal |
| `rain-moment` | Animated rain |
| `glow-particle` | Purple glow orb |
| `quote-serif` | Elegant divider |
| `photo-frame` | Minimal frame |
| `minimal-line` | Dot + lines |
| `coffee-steam` | Coffee cup steam |
| `fabric-flow` | Saree fabric shimmer |
| `shutter-flash` | Camera shutter |
| `mountain-mist` | Mountain silhouette |

---

## 9. Easter Eggs

| Trigger | Location | File to edit message |
|---------|----------|----------------------|
| Click ☽ 3× | Top nav | `data/memories.ts` → `secretMoonMessage` |
| Click purple dot 3× | Top nav | `data/memories.ts` → `secretPurpleMessage` |
| Click train window 3× | `/train` | `data/memories.ts` → `secretTrainMemory` |
| Click coffee cup 3× | `/coffee` | `data/memories.ts` → `secretCoffeeMessage` |
| "Did you find everything?" | `/birthday` (after Sep 26 + all days) | `data/memories.ts` → `finalEasterEggMessage` |

---

## 10. Deploy

### Vercel (recommended)

```bash
cd nanna-birthday
npm run build
npx vercel
```

Follow prompts. Your site will get a URL like `https://nanna-birthday.vercel.app`.

### Other options

- **Netlify** — connect repo, build command: `npm run build`, publish: `.next`
- **Any Node host** — `npm run build` then `npm start`

### Before sharing with Nanna

- [ ] All 30 messages personalized
- [ ] Songs added (or placeholders removed)
- [ ] Photos replaced
- [ ] Letter written
- [ ] Test on mobile (she'll likely open on phone)
- [ ] Deploy before August 26, 2026

---

## 11. Troubleshooting

### Blank page on load

**Cause:** Hydration mismatch (countdown timer differed between server and browser).  
**Fix:** Already applied in latest code. Hard refresh: `Ctrl + Shift + R`.

### "Today's song is waiting."

**Cause:** `url` is empty in `data/songs.ts`.  
**Fix:** Add MP3 to `public/audio/` and set the `url` field.

### Day shows LOCKED but should be open

**Cause:** IST date hasn't reached unlock date yet.  
**Fix:** Check `data/birthdayConfig.ts` dates. Unlock is midnight IST.

### Images not showing

**Cause:** Wrong path in `data/photos.ts`.  
**Fix:** Path must start with `/images/` and file must exist in `public/images/`.

### Dev server won't start

```bash
cd nanna-birthday
npm install
npm run dev
```

Make sure you're in the `nanna-birthday` folder, not the parent `Birthday` folder.

---

## Project Structure

```
nanna-birthday/
├── app/                    # Pages & routes
│   ├── page.tsx            # Home
│   ├── day0/               # Pre-launch
│   ├── days/               # 30-day grid
│   ├── day/[id]/           # Individual days
│   ├── birthday/           # Birthday experience
│   ├── her-world/          # Favorites
│   ├── story/              # Timeline
│   ├── train/              # Train experience
│   ├── linkedin/           # LinkedIn experience
│   ├── gallery/            # Photos
│   ├── peaceful/           # Peaceful place
│   ├── letter/             # Letter + final message
│   └── ...                 # Other sections
├── components/             # UI (don't edit for content)
├── data/                   # ★ EDIT ALL CONTENT HERE
├── lib/                    # Date/unlock logic
├── types/                  # TypeScript types
├── public/
│   ├── images/             # Your photos
│   └── audio/              # Your songs
├── README.md               # Short overview
└── DOCUMENTATION.md        # This file
```

---

## Sharing Content With Your Developer

When ready, send:

1. **One document** — Days 1–30 (quality + message)
2. **Song list** — day, title, artist, file name
3. **Photos** — files + caption/date/memory table
4. **Story** — LinkedIn + train text
5. **Letter** — full birthday letter
6. **Final message** — line by line
7. **Easter eggs** — optional one-liners

Format doesn't matter — Google Doc, Word, Notion, or plain text all work.

---

*Built for Nanna. "I paid attention to the little things about you."*
