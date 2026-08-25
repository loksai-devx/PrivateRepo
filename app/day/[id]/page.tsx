import { notFound, redirect } from "next/navigation";
import { birthdayConfig } from "@/data/birthdayConfig";
import { isDayUnlocked } from "@/lib/dates";
import { DailyExperience } from "@/components/DailyExperience";

interface DayPageProps {
  params: Promise<{ id: string }>;
}

export default async function DayPage({ params }: DayPageProps) {
  const { id } = await params;
  const dayId = parseInt(id, 10);

  if (isNaN(dayId) || dayId < 1 || dayId > birthdayConfig.journeyDays) {
    notFound();
  }

  if (!isDayUnlocked(dayId)) {
    redirect("/days");
  }

  const day = birthdayConfig.days.find((d) => d.id === dayId);
  if (!day) notFound();

  return <DailyExperience day={day} />;
}

export function generateStaticParams() {
  return birthdayConfig.days.map((day) => ({
    id: String(day.id),
  }));
}
