import React, { createContext, useContext, useState } from "react";
import { useAxios } from "./AxiosContext";
import { ModuleType } from "@/types/ModuleType";
import { useAuth } from "./AuthContext";

type ModuleProps = {
  modules?: ModuleType[];
  fetchModules?: () => Promise<any>;
};

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
      const response = await authAxios?.get(
        `/students/${authState.user.id}/modules`
      );
      const modules = response?.data as ModuleType[];
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
