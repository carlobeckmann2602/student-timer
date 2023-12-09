import { LearningUnitType } from "./LearningUnitType";

export type ModuleType = {
  id: string;
  name: string;
  colorCode: string;
  creditPoints: number;
  examDate: Date;
  learningUnits: LearningUnitType[];

  /**
   * Adds up the workload of each learning unit within the module
   */
  timeInvested?: number;
};
