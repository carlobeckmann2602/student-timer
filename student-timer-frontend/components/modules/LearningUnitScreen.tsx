import Button from "@/components/Button";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";
import { LearningUnitType } from "@/types/LearningUnitType";
import { ModuleType } from "@/types/ModuleType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";

export type LearningUnitScreenProps = {
  moduleId: string;
  learningUnitId?: string;
};

export default function NewModuleLearningUnits(props: LearningUnitScreenProps) {
  const { moduleId, learningUnitId } = props;

  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { modules, fetchModules } = useModules();
  const router = useRouter();

  const findDetailModule = () => {
    if (learningUnitId) {
      if (modules && modules.length > 0) {
        let filteredModule: ModuleType | undefined = modules.find(
          (module) => module.id.toString() === moduleId
        );
        if (filteredModule) {
          let learningUnitToEdit = filteredModule.learningUnits.find(
            (unit) => unit.id.toString() === learningUnitId
          );
          if (learningUnitToEdit) {
            return learningUnitToEdit;
          }
        }
      }
    }
    return {
      id: Math.random(),
      name: LearningUnitEnum.VORLESUNG,
      workloadPerWeek: 1,
      startDate: new Date(),
      endDate: new Date(),
      totalLearningTime: 0,
    } as LearningUnitType;
  };

  const [learningUnit, setLearningUnit] = useState<LearningUnitType>(
    findDetailModule()
  );

  const onUpdateLearningUnit = async () => {
    let toastId = toast.show(
      learningUnitId ? "Aktualisieren..." : "Erstellen..."
    );

    try {
      if (learningUnitId) {
        await authAxios?.put(
          `/students/${authState?.user.id}/modules/${moduleId}/learningUnits/${learningUnitId}`,
          {
            name: learningUnit.name,
            startDate: learningUnit.startDate.toISOString().substring(0, 10),
            endDate: learningUnit.endDate.toISOString().substring(0, 10),
            workloadPerWeek: learningUnit.workloadPerWeek,
          }
        );
        toast.update(toastId, "Lerneinheit erfolgreich erstellt.", {
          type: "success",
        });
      } else {
        await authAxios?.post(
          `/students/${authState?.user.id}/modules/${moduleId}/learningUnits`,
          {
            name: learningUnit.name,
            startDate: learningUnit.startDate.toISOString().substring(0, 10),
            endDate: learningUnit.endDate.toISOString().substring(0, 10),
            workloadPerWeek: learningUnit.workloadPerWeek,
          }
        );
        toast.update(toastId, "Lerneinheit erfolgreich aktualisiert.", {
          type: "success",
        });
      }

      fetchModules && (await fetchModules());
      router.back();
    } catch (e) {
      toast.update(toastId, `Fehler beim Speichern: ${e}`, {
        type: "danger",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LearningUnitForm
        key={learningUnit?.id}
        inputData={learningUnit}
        onChange={(inputData) => setLearningUnit(inputData)}
      />
      <Button
        text={
          learningUnitId ? "Lerneinheit aktualisieren" : "Lerneinheit anlegen"
        }
        backgroundColor={COLORTHEME.light.primary}
        textColor={COLORTHEME.light.grey2}
        onPress={onUpdateLearningUnit}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 24,
    backgroundColor: COLORTHEME.light.background,
  },
  scrollViewContainer: {
    flexGrow: 1,
    flexDirection: "column",
    borderRadius: BASE_STYLES.borderRadius,
    gap: 24,
  },
  scrollViewContainerStyle: {
    justifyContent: "space-around",
    gap: 16,
  },
});
