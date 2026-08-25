import Link from "next/link";
import { SectionBridge } from "@/components/SectionBridge";
import { MyPromises } from "@/components/MyPromises";
import { CreatorEasterEgg } from "@/components/CreatorSignature";
import { FavoriteNumberReveal } from "@/components/CreatorDetails";
import { promisesSection } from "@/data/promises";
import { StoryChapterNav } from "@/components/StoryChapterNav";

export default function PromisesPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="text-center pt-4 pb-2">
        <Link href="/" className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light">
          ← HOME
        </Link>
      </div>

      <SectionBridge lines={[promisesSection.transitionIn, promisesSection.title]} />
      <MyPromises />
      <FavoriteNumberReveal />
      <CreatorEasterEgg />
      <StoryChapterNav active="promises" />
    </div>
  );
}
