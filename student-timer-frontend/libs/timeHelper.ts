export const msToTimeObject = (
  timeInMs: number
): { hours: number; mins: number; secs: number } => {
  const hours = Math.floor(timeInMs / (1000 * 60 * 60));
  const mins = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((timeInMs % (1000 * 60)) / 1000);
  return { hours, mins, secs };
};

export const timeObjectToMinutes = ({
  hours,
  mins,
}: {
  hours: number | string;
  mins: number | string;
}): number => {
  return Number(hours) * 60 + Number(mins);
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

export const formatTimeLearningSession = ({
  hours,
  mins,
}: {
  hours: number;
  mins: number;
}): string => {
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")} Std.`;
};

export const convertMinutesToHours = (
  minutes: number,
  nullable: boolean = true
) => {
  if (nullable) return +(minutes / 60).toFixed(1);
  else {
    const hourValue = +(minutes / 60).toFixed(1);
    return hourValue > 0 ? hourValue : 0.1;
  }
};

export const roundSecToMinInMs = (ms: number) =>
  (Math.round(ms / 60000) || 1) * 60000;
