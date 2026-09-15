import { getContributions, type ContributionDay } from "@/lib/github";
import Card from "./Card";

const LEVEL_CLASSES = [
  "bg-surface-mid/40",
  "bg-red/25",
  "bg-red/50",
  "bg-red/75",
  "bg-red",
];

export default async function GithubStatsCard() {
  const contributions = await getContributions("yu-araujos");
  const weeks = chunkIntoWeeks(contributions).slice(-16);

  return (
    <Card
      showFooterAction={false}
      subtitle={
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          <span>GITHUB</span>
        </span>
      }
      title="Commits"
      footerText="View Profile"
      className="w-full"
    >
      {weeks.length > 0 ? (
        <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.count} commits em ${day.date}`}
                  className={`h-2.5 w-2.5 rounded-xs shrink-0 ${LEVEL_CLASSES[day.level]}`}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 font-mono text-xs text-subtle-ys">
          Data unavailable
        </p>
      )}
    </Card>
  );
}

function chunkIntoWeeks(days: ContributionDay[]) {
  const weeks: ContributionDay[][] = [];
  let current: ContributionDay[] = [];

  for (const day of days) {
    const dow = new Date(day.date).getDay();
    if (dow === 0 && current.length) {
      weeks.push(current);
      current = [];
    }
    current.push(day);
  }
  if (current.length) weeks.push(current);
  return weeks;
}
