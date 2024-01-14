import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
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
  setModules?: React.Dispatch<React.SetStateAction<ModuleType[] | undefined>>;
};

export type ObjectKey = keyof typeof COLORS;

const ModuleContext = createContext<ModuleProps>({});

export const useModules = () => {
  return useContext(ModuleContext);
};

export const ModuleProvider = ({ children }: any) => {
  const { authState } = useAuth();
  const authStateRef = useRef(authState);
  const { authAxios } = useAxios();
  const [modules, setModules] = useState<ModuleType[] | undefined>();

  useEffect(() => {
    authStateRef.current = authState;
    fetchModules();
  }, [authState?.authenticated]);

  const fetchModules = async () => {
    if (!authStateRef.current?.user.id) return;
    try {
      const response = await authAxios?.get<ModuleType[] | undefined>(
        `/students/${authStateRef.current?.user.id}/modules`
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
    setModules,
  } as ModuleProps;
  return (
    <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>
  );
};

const preprocessFetchedModule = (module: ModuleType) => {
  convertInputTypes(module);

  module.learningUnits = module.learningUnits.sort((firstUnit, secondUnit) =>
    firstUnit.name.localeCompare(secondUnit.name)
  );

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
    unit.workloadPerWeekWholeHours = Math.floor(unit.workloadPerWeek / 60) * 60;
    unit.workloadPerWeekMinutes = Math.round(unit.workloadPerWeek % 60);
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
  let unitColor =
    COLORS[
      Object.keys(LearningUnitEnum)[
        Object.values(LearningUnitEnum).indexOf(unit.name)
      ] as ObjectKey
    ];
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
    workloadPerWeekWholeHours:
      Math.floor(module.totalLearningSessionTime / 60) * 60,
    workloadPerWeekMinutes: module.totalLearningSessionTime % 60,
  };

  module.learningUnits.push(sessionLearningUnit);
};
