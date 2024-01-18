import { convertMinutesToHours } from "./timeHelper";

export const computeDateDifference = (
  date1: Date,
  date2: Date,
  countAsWeeks: boolean = false
) => {
  let dateDifference: number = date1.getTime() - date2.getTime();
  if (countAsWeeks) {
    let amountOfWeeks = Math.ceil(dateDifference / (1000 * 3600 * 24) / 7);
    return amountOfWeeks > 0 ? amountOfWeeks : 1;
  }

  return Math.ceil(dateDifference / (1000 * 3600 * 24));
};

/**
 * Returns the remaining days from now to the exam date as a string
 * @param exam_date Given parameter value from the ModuleType
 * @returns A string describing the remaining time from today to the exam date
 * - "Keine Angabe" when exam date is not given
 * - "Abgeschlossen" when exam date is in the past
 * - "X Tage" when exam date takes place within the next 7 days
 * - "X Woche(n)" otherwise
 */
export const computeDeadline = (exam_date?: Date) => {
  if (!exam_date) {
    return "Keine Angabe";
  }

  let remaining_days: number = computeDateDifference(exam_date, new Date());
  if (remaining_days < 0) return "Abgeschlossen";

  return remaining_days > 6
    ? `${Math.floor(remaining_days / 7)} Woche(n)`
    : `${remaining_days} Tag(e)`;
};

export const computeRemainingSessionTime = (
  totalModuleTime: number,
  totalLearningTime: number
) => {
  const learningDifference = Math.round(
    convertMinutesToHours(totalModuleTime - totalLearningTime)
  );
  return learningDifference > 0 ? learningDifference : 0;
};
