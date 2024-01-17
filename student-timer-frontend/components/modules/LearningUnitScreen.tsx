import Button from "@/components/Button";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";
import { BASE_STYLES, COLORS, COLORTHEME } from "@/constants/Theme";
import { useModules } from "@/context/ModuleContext";
import { LearningUnitType } from "@/types/LearningUnitType";
import { ModuleType } from "@/types/ModuleType";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { isWeakMap } from "util/types";
import { P } from "../StyledText";

export type LearningUnitScreenProps = {
  moduleId: string;
  learningUnitId: string;
  isEdit: boolean;
};

export default function LearningUnitSreen(props: LearningUnitScreenProps) {
  const { moduleId, learningUnitId, isEdit } = props;

  const { modules, setModules } = useModules();
  const router = useRouter();

  const [newUnitState, setNewUnitState] = useState<LearningUnitType>({
    id: +learningUnitId,
    name: LearningUnitEnum.VORLESUNG,
    workloadPerWeek: 1,
    startDate: new Date(),
    endDate: new Date(),
    totalLearningTime: 0,
    colorCode: COLORS.VORLESUNG,
    workloadPerWeekMinutes: 1,
    workloadPerWeekWholeHours: 0,
  } as LearningUnitType);

  useEffect(() => {
    const findLearningUnit = () => {
      if (isEdit) {
        const detailModule =
          modules?.find((module) => module.id.toString() === moduleId) ||
          ({} as ModuleType);
        let learningUnitToEdit = detailModule.learningUnits.find(
          (unit) => unit.id.toString() === learningUnitId
        );
        if (learningUnitToEdit) {
          setNewUnitState({ ...learningUnitToEdit });
          return;
        }
      }
    };

    findLearningUnit();
  }, []);

  const handleUpdate = (createdUnit: LearningUnitType) => {
    setNewUnitState(createdUnit);
  };

  const onSave = async () => {
    const detailModule =
      modules?.find((module) => module.id.toString() === moduleId) ||
      ({} as ModuleType);
    let updatedModule = { ...detailModule };

    if (isEdit) {
      updatedModule.learningUnits = updatedModule.learningUnits.map((unit) =>
        unit.id === newUnitState.id ? { ...newUnitState } : unit
      );
    } else {
      updatedModule.learningUnits.push({ ...newUnitState });
    }

    setModules &&
      setModules((prevState) =>
        prevState?.map((currentModule) => {
          return currentModule.id === updatedModule.id
            ? updatedModule
            : currentModule;
        })
      );
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LearningUnitForm
        key={newUnitState?.id}
        inputData={newUnitState}
        onChange={(inputData) => handleUpdate(inputData)}
      />
      <Button
        text={
          learningUnitId ? "Lerneinheit aktualisieren" : "Lerneinheit anlegen"
        }
        backgroundColor={COLORTHEME.light.primary}
        textColor={COLORTHEME.light.grey2}
        onPress={onSave}
        style={{ marginBottom: BASE_STYLES.horizontalPadding }}
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
    paddingVertical: BASE_STYLES.horizontalPadding,
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
