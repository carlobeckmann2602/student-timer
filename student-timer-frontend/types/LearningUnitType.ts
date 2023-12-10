export type LearningUnitType = {
  id: number;
  name: string;
  workloadPerWeek: number;
  startDate: Date;
  endDate: Date;

  colorCode?: string;
  y?: number;
};
