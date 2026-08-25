import { CoffeeExperience } from "@/components/CoffeeExperience";
import Link from "next/link";

export default function CoffeePage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="text-center pt-4">
        <Link href="/her-world" className="text-[10px] tracking-[0.3em] text-gray hover:text-purple-light">
          ← BACK
        </Link>
      </div>
      <CoffeeExperience />
    </div>
  );
}
