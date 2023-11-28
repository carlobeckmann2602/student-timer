import { COLORS } from "@/constants/Theme";
import { LearningUnitType } from "@/types/LearningUnitType";
import { ModuleType } from "@/types/ModuleType";

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
 * - "Abgeschlossen" when exam date is in the past
 * - "X Tage" when exam date takes place within the next 7 days
 * - "X Woche(n)" otherwise
 */
export const computeDeadline = (exam_date: Date) => {
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

export const precomputeLearningUnits = (inputData: ModuleType) => {
  let timeInvested: number = 0;

  for (var unit of inputData.learningUnits) {
    // Add HEX-Colorcode for each module based on corresponding constant
    unit.colorCode = computeLearningUnitColor(unit, inputData.colorCode);

    // Compute invested hours for the given event time of the unit
    let weeks_with_unit: number = Math.floor(
      computeDateDifference(unit.endDate, unit.startDate) / 7
    );
    unit.y = weeks_with_unit * unit.workloadPerWeek;
    timeInvested += unit.y;
  }
  return inputData;
};
