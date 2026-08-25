import Link from "next/link";
import { StoryTimeline } from "@/components/StoryTimeline";
import { CreatorEasterEgg } from "@/components/CreatorSignature";
import { StoryChapterNav } from "@/components/StoryChapterNav";

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="text-center pt-4 pb-2">
        <Link href="/" className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light">
          ← HOME
        </Link>
      </div>

      <StoryTimeline />
      <CreatorEasterEgg />
      <StoryChapterNav active="story" />
    </div>
  );
}
