import { LearningUnitType } from "./LearningUnitType";

export type ModuleType = {
  moduleId: string;
  name: string;
  colorCode: string;
  creditpoints: number;
  examDate: Date;
  learningUnits: LearningUnitType[];

  /**
   * Adds up the workload of each learning unit within the module
   */
  timeInvested?: number;
};
