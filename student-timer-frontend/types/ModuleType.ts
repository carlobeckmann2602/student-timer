import { LearningUnitType } from "./LearningUnitType";
import { LearningSessionType } from "./learningSessionType";

export type ModuleType = {
  id: number;
  name: string;
  colorCode: string;
  creditPoints: number;
  examDate: Date;
  learningUnits: LearningUnitType[];
  learningSessions: LearningSessionType[];

  /**
   * Adds up the workload of each learning unit within the module
   */
  timeInvested?: number;
};
