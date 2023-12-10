export const msToTimeObject = (
  timeInMs: number
): { hours: number; mins: number; secs: number } => {
  const hours = Math.floor(timeInMs / (1000 * 60 * 60));
  const mins = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((timeInMs % (1000 * 60)) / 1000);
  return { hours, mins, secs };
};

export const formatTime = ({
  hours,
  mins,
  secs,
}: {
  hours: number;
  mins: number;
  secs: number;
}): string => {
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
