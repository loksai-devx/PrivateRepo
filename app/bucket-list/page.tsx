import Link from "next/link";
import { SectionBridge } from "@/components/SectionBridge";
import { BucketList, BucketListBridge } from "@/components/BucketList";
import { bucketListSection } from "@/data/bucketList";
import { StoryChapterNav } from "@/components/StoryChapterNav";

export default function BucketListPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="text-center pt-4 pb-2">
        <Link href="/" className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light">
          ← HOME
        </Link>
      </div>

      <SectionBridge
        lines={[
          bucketListSection.transitionIn.line1,
          bucketListSection.transitionIn.line2,
          bucketListSection.title,
        ]}
      />
      <BucketList />
      <BucketListBridge />
      <StoryChapterNav active="bucket-list" />
    </div>
  );
}
