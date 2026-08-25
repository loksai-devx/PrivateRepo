import { DayGrid } from "@/components/DayGrid";
import Link from "next/link";

export default function DaysPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="text-center pt-8 pb-4">
        <Link
          href="/"
          className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light"
        >
          ← HOME
        </Link>
      </div>
      <DayGrid />
    </div>
  );
}
