"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Song } from "@/types";
import { loadYouTubeApi, fetchYouTubeTitle, type YTPlayer } from "@/lib/youtube";
import { isSongUnlocked, getMaxUnlockedSongDay } from "@/lib/songs";

interface MusicPlayerProps {
  song: Song | undefined;
  dayNumber?: number;
  compact?: boolean;
  label?: string;
  showDayNumber?: boolean;
}

export function MusicPlayer({
  song,
  dayNumber,
  compact = false,
  label = "Today's Song",
  showDayNumber = true,
}: MusicPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const progressRef = useRef<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [error, setError] = useState(false);
  const [resolvedTitle, setResolvedTitle] = useState("");

  const hasVideo = Boolean(song?.youtubeId);
  const unlocked = song ? isSongUnlocked(song) : false;
  const displayTitle =
    song?.title && song.title.length > 0
      ? song.title
      : resolvedTitle || (song?.isBirthdaySong ? "Final Birthday Song" : "");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setResolvedTitle("");
    setHasStarted(false);
    setIsPlaying(false);
    setIsReady(false);
    setError(false);
    setProgress(0);
    setDuration(0);

    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    if (!song?.youtubeId || !song.title) {
      fetchYouTubeTitle(song?.youtubeId ?? "").then((title) => {
        if (title) setResolvedTitle(title);
      });
    }
  }, [song]);

  useEffect(() => {
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const tickProgress = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    const current = player.getCurrentTime() || 0;
    const total = player.getDuration() || 0;
    setProgress(current);
    setDuration(total);
    if (isPlaying) {
      progressRef.current = requestAnimationFrame(tickProgress);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      progressRef.current = requestAnimationFrame(tickProgress);
    }
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [isPlaying, tickProgress]);

  const togglePlay = useCallback(async () => {
    if (!hasVideo || !unlocked) return;
    if (!hasStarted) {
      setHasStarted(true);
      return;
    }
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch {
      setError(true);
    }
  }, [hasVideo, unlocked, hasStarted, isPlaying]);

  useEffect(() => {
    if (!hasStarted || !song?.youtubeId) return;

    let cancelled = false;

    (async () => {
      await loadYouTubeApi();
      if (cancelled || !containerRef.current || !window.YT?.Player) return;

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "1",
        width: "1",
        videoId: song.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            setIsReady(true);
            event.target.setVolume(volume);
            event.target.playVideo();
          },
          onStateChange: (event) => {
            const playing = event.data === window.YT!.PlayerState.PLAYING;
            const ended = event.data === window.YT!.PlayerState.ENDED;
            setIsPlaying(playing);
            if (ended) setIsPlaying(false);
          },
          onError: () => setError(true),
        },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [hasStarted, song?.youtubeId, volume]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    playerRef.current?.seekTo(time, true);
    setProgress(time);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    setVolume(v);
    playerRef.current?.setVolume(v);
  };

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  if (!mounted) {
    return <div className={`${compact ? "h-16" : "h-32"}`} aria-hidden="true" />;
  }

  if (!song) {
    return (
      <div className="text-center py-6">
        <p className="text-xs tracking-[0.2em] text-gray">
          Today&apos;s song is waiting.
        </p>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="text-center py-6">
        <p className="text-xs tracking-[0.2em] text-gray">
          This song unlocks later.
        </p>
      </div>
    );
  }

  return (
    <div className={`${compact ? "" : "py-8"}`}>
      <div className="text-center mb-6">
        {showDayNumber && dayNumber && (
          <p className="text-[10px] tracking-[0.3em] text-purple-light mb-2">
            DAY {String(dayNumber).padStart(2, "0")}
          </p>
        )}
        {song.isBirthdaySong && (
          <p className="text-[10px] tracking-[0.3em] text-purple-light mb-2">
            FINAL BIRTHDAY SONG
          </p>
        )}
        <p className="text-[10px] tracking-[0.3em] text-gray uppercase mb-3">
          {label}
        </p>
        {displayTitle ? (
          <p className="text-sm text-off-white">{displayTitle}</p>
        ) : (
          <p className="text-sm text-gray/60">Title loading...</p>
        )}
        {song.artist ? (
          <p className="text-xs text-gray mt-1">{song.artist}</p>
        ) : null}
      </div>

      {!hasVideo ? (
        <p className="text-center text-xs tracking-[0.15em] text-gray">
          Today&apos;s song is waiting.
        </p>
      ) : error ? (
        <p className="text-center text-xs text-gray">
          Unable to play this song right now.
        </p>
      ) : (
        <div className="max-w-xs mx-auto relative">
          <div
            ref={containerRef}
            className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full border border-purple/40 flex items-center justify-center text-purple-light hover:bg-purple/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple/50"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="2" width="4" height="12" />
                  <rect x="9" y="2" width="4" height="12" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 2l10 6-10 6V2z" />
                </svg>
              )}
            </button>
          </div>

          {hasStarted && isReady && (
            <>
              <div className="flex items-center gap-2 text-[10px] text-gray font-mono">
                <span>{formatTime(progress)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={progress}
                  onChange={handleSeek}
                  className="flex-1 h-0.5 appearance-none bg-white/10 rounded cursor-pointer accent-purple"
                  aria-label="Seek"
                />
                <span>{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-center gap-2 mt-3">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gray"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                </svg>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={volume}
                  onChange={handleVolume}
                  className="w-20 h-0.5 appearance-none bg-white/10 rounded cursor-pointer accent-purple"
                  aria-label="Volume"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface MiniMusicPlayerProps {
  songs: Song[];
  currentDay?: number;
  maxDay?: number;
}

export function MiniMusicPlayer({
  songs,
  currentDay = 1,
  maxDay,
}: MiniMusicPlayerProps) {
  const [mounted, setMounted] = useState(false);
  const [day, setDay] = useState(currentDay);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unlockedMax = mounted ? getMaxUnlockedSongDay() : 1;
  const max = maxDay ?? unlockedMax;
  const song = songs.find((s) => s.day === day && !s.isBirthdaySong);

  const goNext = () => setDay((d) => Math.min(d + 1, max));
  const goPrev = () => setDay((d) => Math.max(d - 1, 1));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goPrev}
          disabled={day <= 1}
          className="text-gray hover:text-white disabled:opacity-30 text-xs tracking-wider"
          aria-label="Previous song"
        >
          PREV
        </button>
        <span className="text-[10px] text-gray tracking-wider">
          SONG {String(day).padStart(2, "0")} / {String(max).padStart(2, "0")}
        </span>
        <button
          onClick={goNext}
          disabled={day >= max}
          className="text-gray hover:text-white disabled:opacity-30 text-xs tracking-wider"
          aria-label="Next song"
        >
          NEXT
        </button>
      </div>
      <MusicPlayer song={song} dayNumber={day} label="Journey Song" />
    </div>
  );
}
