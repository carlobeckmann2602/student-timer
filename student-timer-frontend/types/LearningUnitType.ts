export type LearningUnitType = {
  unitId: string;
  name: string;
  workloadPerWeek: number;
  startDate: Date;
  endDate: Date;

  colorCode?: string;
  y?: number;
};
