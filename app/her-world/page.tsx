import { FavoritesGrid } from "@/components/FavoritesGrid";
import Link from "next/link";

export default function HerWorldPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="text-center pt-4 pb-2">
        <Link href="/" className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light">
          ← HOME
        </Link>
      </div>
      <FavoritesGrid />
    </div>
  );
}
