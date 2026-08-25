export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
      aria-hidden="true"
    />
  );
}

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple/20 animate-float"
          style={{
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
}
