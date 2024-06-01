// src\utils\TimeDiff.tsx
import { useMemo } from "react";

export function TimeDiff({
  time,
  suffix = "ago",
}: {
  time: number;
  suffix?: string;
}) {
  const diff = Date.now() - time;
  const timeString = useMemo(() => {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours >= 1) {
      return `${hours}h ${suffix}`;
    }
    if (minutes >= 1) {
      return `${minutes}m ${suffix}`;
    }
    return "Just now";
  }, [diff, suffix]);

  return <span>{timeString}</span>;
}
