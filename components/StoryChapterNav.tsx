import Link from "next/link";

const chapters = [
  { id: "story", label: "OUR STORY", href: "/story" },
  { id: "promises", label: "MY PROMISES", href: "/promises" },
  { id: "bucket-list", label: "BUCKET LIST", href: "/bucket-list" },
] as const;

export function StoryChapterNav({
  active,
}: {
  active: (typeof chapters)[number]["id"];
}) {
  return (
    <nav className="flex flex-wrap justify-center gap-4 py-12 px-4 border-t border-white/5">
      {chapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={chapter.href}
          className={`px-5 py-2 text-[10px] tracking-[0.2em] transition-all ${
            active === chapter.id
              ? "text-purple-light border border-purple/30"
              : "text-gray/50 border border-white/10 hover:border-purple/20 hover:text-gray"
          }`}
        >
          {chapter.label}
        </Link>
      ))}
    </nav>
  );
}
