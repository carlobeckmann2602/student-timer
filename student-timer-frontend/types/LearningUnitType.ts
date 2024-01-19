import { LearningUnitEnum } from "@/constants/LearningUnitEnum";

export type LearningUnitType = {
  id: number;
  name: LearningUnitEnum;
  workloadPerWeek: number;
  startDate: Date;
  endDate: Date;
  totalLearningTime: number;

  colorCode?: string;
  workloadPerWeekHours?: number;
  workloadPerWeekMinutes?: number;
};
