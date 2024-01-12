import { COLORS } from "@/constants/Theme";
import { LearningUnitType } from "@/types/LearningUnitType";
import { convertMinutesToHours } from "./timeHelper";

type ObjectKey = keyof typeof COLORS;

export const computeDateDifference = (
  date1: Date,
  date2: Date,
  amountWeeks: boolean = false
) => {
  let diff: number = date1.getTime() - date2.getTime();
  return amountWeeks
    ? Math.ceil(diff / (1000 * 3600 * 24) / 7)
    : Math.ceil(diff / (1000 * 3600 * 24));
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

/**
 * Returns the dedicated HEX-Code for a given learning unit
 * @param unit Learning unit from module
 * @returns String with HEX-Code from Constants for the given learning unit
 */
export const computeLearningUnitColor = (
  unit: LearningUnitType,
  defaultColor: string
) => {
  let unit_color = COLORS[unit.name as ObjectKey];
  return unit_color !== undefined ? unit_color : defaultColor;
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
