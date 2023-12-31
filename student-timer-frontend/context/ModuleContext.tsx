import React, { createContext, useContext, useState } from "react";
import { useAxios } from "./AxiosContext";
import { ModuleType } from "@/types/ModuleType";
import { useAuth } from "./AuthContext";
import { LearningUnitType } from "@/types/LearningUnitType";
import { COLORS } from "@/constants/Theme";
import { LearningSessionType } from "@/types/learningSessionType";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";

type ModuleProps = {
  modules?: ModuleType[];
  fetchModules?: () => Promise<any>;
};

type ObjectKey = keyof typeof COLORS;

const ModuleContext = createContext<ModuleProps>({});

export const useModules = () => {
  return useContext(ModuleContext);
};

export const ModuleProvider = ({ children }: any) => {
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const [modules, setModules] = useState<ModuleType[] | undefined>();

  const fetchModules = async () => {
    if (!authState?.user.id) return;
    try {
      const response = await authAxios?.get<ModuleType[] | undefined>(
        `/students/${authState.user.id}/modules`
      );
      const modules: ModuleType[] | undefined = response?.data;
      modules?.forEach((item) => preprocessFetchedModule(item));
      setModules(modules);
      return modules;
    } catch (e) {
      return e;
    }
  };

  const value = {
    modules,
    fetchModules,
  } as ModuleProps;
  return (
    <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>
  );
};

const preprocessFetchedModule = (module: ModuleType) => {
  convertInputTypes(module);
  addSessionLearningUnit(module);
};

const convertInputTypes = (module: ModuleType) => {
  if (module.examDate) {
    module.examDate = new Date(module.examDate);
  }

  module.learningUnits = module.learningUnits as LearningUnitType[];
  module.learningUnits.forEach((unit) => {
    computeLearningUnitColor(unit, module.colorCode);
    unit.startDate = new Date(unit.startDate);
    unit.endDate = new Date(unit.endDate);
  });

  module.learningSessions = module.learningSessions as LearningSessionType[];
  module.learningSessions.forEach((session) => {
    session.createdAt = new Date(session.createdAt);
  });
};

export const computeLearningUnitColor = (
  unit: LearningUnitType,
  defaultColor: string
) => {
  let unitColor = COLORS[unit.name.toString() as ObjectKey];
  if (unitColor) unit.colorCode = unitColor;
  else unit.colorCode = defaultColor;
};

const addSessionLearningUnit = (module: ModuleType) => {
  const sessionLearningUnit: LearningUnitType = {
    id: -1,
    name: LearningUnitEnum.SELBSTSTUDIUM,
    workloadPerWeek: 0,
    startDate: new Date(),
    endDate: new Date(),
    totalLearningTime: module.totalLearningSessionTime,
    colorCode: module.colorCode,
  };

  module.learningUnits.push(sessionLearningUnit);
};
