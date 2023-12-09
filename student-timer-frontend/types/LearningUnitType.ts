export type LearningUnitType = {
  unitId: number;
  name: string;
  workloadPerWeek: number;
  startDate: Date;
  endDate: Date;

  colorCode?: string;
  y?: number;
};
