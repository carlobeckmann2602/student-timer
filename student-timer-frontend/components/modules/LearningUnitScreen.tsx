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
import { computeDateDifference } from "@/libs/moduleTypeHelper";
import { View } from "../Themed";
import Alert from "../Alert";

export type LearningUnitScreenProps = {
  moduleId: string;
  learningUnitId: string;
  isEdit: boolean;
};

export default function LearningUnitSreen(props: LearningUnitScreenProps) {
  const { moduleId, learningUnitId, isEdit } = props;

  const { modules, setModules } = useModules();
  const router = useRouter();
  const [openChanges, setOpenChanges] = useState(false);

  const [newUnitState, setNewUnitState] = useState<LearningUnitType>({
    id: +learningUnitId,
    name: LearningUnitEnum.VORLESUNG,
    workloadPerWeek: 1,
    startDate: new Date(),
    endDate: new Date(),
    totalLearningTime: 0,
    colorCode: COLORS.VORLESUNG,
    workloadPerWeekMinutes: 1,
    workloadPerWeekHours: 0,
  } as LearningUnitType);

  useEffect(() => {
    if (isEdit) {
      const detailModule =
        modules?.find((module) => module.id.toString() === moduleId) ||
        ({} as ModuleType);

      let learningUnitToEdit = detailModule.learningUnits.find(
        (unit) => unit.id.toString() === learningUnitId
      );

      learningUnitToEdit && setNewUnitState({ ...learningUnitToEdit });
    }
  }, []);

  const handleUpdate = (createdUnit: LearningUnitType) => {
    setNewUnitState(createdUnit);
  };

  const onSave = async () => {
    const detailModule =
      modules?.find((module) => module.id.toString() === moduleId) ||
      ({} as ModuleType);
    let updatedModule = { ...detailModule };

    const updatedUnitLearningTime =
      newUnitState.workloadPerWeek *
      computeDateDifference(newUnitState.endDate, newUnitState.startDate, true);

    if (isEdit) {
      updatedModule.learningUnits = updatedModule.learningUnits.map((unit) =>
        unit.id === newUnitState.id
          ? {
              ...newUnitState,
              totalLearningTime: updatedUnitLearningTime,
            }
          : unit
      );
    } else {
      updatedModule.learningUnits.push({
        ...newUnitState,
        totalLearningTime: updatedUnitLearningTime,
      });
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
        onChange={(inputData) => {
          if (!openChanges) setOpenChanges(true);
          handleUpdate(inputData);
        }}
      />
      <View style={styles.buttonRowWrapper}>
        <Button
          text="Zurück"
          borderColor={COLORTHEME.light.danger}
          backgroundColor={COLORTHEME.light.background}
          textColor={COLORTHEME.light.danger}
          style={{ flex: 1 }}
          onPress={() =>
            openChanges
              ? Alert(
                  "Änderungen verwerfen?",
                  "Wenn du fortfährst, gehen die Änderungen verloren. Bist du dir sicher?",
                  () => router.back()
                )
              : router.back()
          }
        />
        <Button
          text={isEdit ? "Lerneinheit aktualisieren" : "Lerneinheit anlegen"}
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          style={{ flex: 1 }}
          onPress={onSave}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: COLORTHEME.light.background,
    paddingVertical: BASE_STYLES.horizontalPadding,
  },
  buttonRowWrapper: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
    marginBottom: BASE_STYLES.horizontalPadding,
  },
});
