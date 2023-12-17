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

  totalModuleTime: number;
  totalLearningTime: number;
  totalLearningSessionTime: number;
  totalLearningUnitTime: number;
};
