# NANNA — 30 Days

A premium interactive birthday website for Sai Priya (Nanna).

## Quick Start

```bash
cd nanna-birthday
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
nanna-birthday/
├── app/                  # Next.js pages & routes
├── components/           # UI components
├── data/                 # ALL editable content (edit here!)
│   ├── person.ts         # Sai Priya's details
│   ├── days.ts           # 30 daily qualities & messages
│   ├── songs.ts          # 30 songs
│   ├── photos.ts         # Photo gallery
│   ├── memories.ts       # Story, train, LinkedIn, easter eggs
│   ├── favorites.ts      # Her world cards & sections
│   ├── letter.ts         # Birthday letter & final message
│   └── birthdayConfig.ts # Dates & unlock schedule
├── lib/                  # Date/unlock logic (IST timezone)
├── types/                # TypeScript types
└── public/images/        # Placeholder images (replace with yours)
```

## 30-Day Unlock System

- **Start:** August 26, 2026 at 00:00 IST
- **Day 1–30:** One unlocks each day (Aug 26 → Sep 24)
- **Birthday:** September 26, 2026 at 00:00 IST — full experience unlocks
- **After birthday:** Everything stays unlocked forever
- Uses `Asia/Kolkata` timezone — not the visitor's local time

## Where to Edit Content

| What | File |
|------|------|
| Name, nickname, personality, favorites | `data/person.ts` |
| 30 qualities & daily messages | `data/days.ts` |
| 30 songs (title, artist, URL) | `data/songs.ts` |
| Photos & captions | `data/photos.ts` + `public/images/` |
| Story timeline, train memories | `data/memories.ts` |
| Her world cards, sections | `data/favorites.ts` |
| Birthday letter | `data/letter.ts` |
| Final message & easter egg | `data/letter.ts` + `data/memories.ts` |
| Unlock dates | `data/birthdayConfig.ts` |

## Adding Songs

Edit `data/songs.ts`:

```ts
{
  id: "day-01",
  day: 1,
  title: "Him & I",
  artist: "G-Eazy & Halsey",
  url: "/audio/day-01.mp3",  // or external URL
}
```

Place audio files in `public/audio/`. Songs only play after the user clicks PLAY.

## Adding Photos

1. Add images to `public/images/`
2. Update entries in `data/photos.ts` with `src`, `caption`, `date`, `memory`

## Deploy

**Vercel (recommended):**
```bash
npm run build
npx vercel
```

**Other hosts:** Run `npm run build` then `npm start`, or deploy the `.next` output.

Set timezone handling is client/server based on IST — no server config needed.

## Easter Eggs

- Click the moon (☽) 3 times in the nav
- Click the purple dot 3 times
- Click the train window 3 times on `/train`
- Click the coffee cup 3 times on `/coffee`
- After birthday + all 30 days: "Did you find everything?" on birthday page

## Privacy

No analytics, no login, no data collection.
