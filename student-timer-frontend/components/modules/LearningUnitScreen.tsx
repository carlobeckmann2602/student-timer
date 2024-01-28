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
  const [saveDisabled, setSaveDisabled] = useState(false);

  const [unitData, setUnitData] = useState<LearningUnitType>({
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
        modules?.find((module) => module.id.toString() === moduleId) || ({} as ModuleType);

      let learningUnitToEdit = detailModule.learningUnits.find(
        (unit) => unit.id.toString() === learningUnitId
      );

      learningUnitToEdit && setUnitData({ ...learningUnitToEdit });
    }
  }, []);

  const handleUpdate = (createdUnit: LearningUnitType) => {
    setUnitData(createdUnit);
    if (!openChanges) setOpenChanges(true);
  };

  const handleValidationError = (errorOccured: boolean) => {
    setSaveDisabled(errorOccured);
  };

  const onSave = async () => {
    const detailModule =
      modules?.find((module) => module.id.toString() === moduleId) || ({} as ModuleType);
    let updatedModule = { ...detailModule };

    const updatedUnitLearningTime =
      unitData.workloadPerWeek * computeDateDifference(unitData.endDate, unitData.startDate, true);

    if (isEdit) {
      updatedModule.learningUnits = updatedModule.learningUnits.map((unit) =>
        unit.id === unitData.id
          ? {
              ...unitData,
              totalLearningTime: updatedUnitLearningTime,
            }
          : unit
      );
    } else {
      updatedModule.learningUnits.push({
        ...unitData,
        totalLearningTime: updatedUnitLearningTime,
      });
    }

    setModules &&
      setModules((prevState) =>
        prevState?.map((currentModule) => {
          return currentModule.id === updatedModule.id ? updatedModule : currentModule;
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
        key={unitData?.id}
        inputData={unitData}
        onChange={(inputData) => {
          handleUpdate(inputData);
        }}
        onValidationError={(errorOccured) => handleValidationError(errorOccured)}
      />
      <View style={styles.buttonRowWrapper}>
        <Button
          text="Zurück"
          borderColor={COLORTHEME.light.primary}
          backgroundColor={COLORTHEME.light.background}
          textColor={COLORTHEME.light.primary}
          style={{ flex: 1 }}
          onPress={() =>
            openChanges
              ? Alert({
                  title: isEdit ? "Änderungen verwerfen?" : "Eingaben verwerfen?",
                  message: isEdit
                    ? "Wenn du fortfährst, gehen alle Änderungen verloren. Bist du dir sicher?"
                    : "Wenn du fortfährst, gehen alle Eingaben verloren. Bist du dir sicher?",
                  onPressConfirm: () => router.back(),
                })
              : router.back()
          }
        />
        <Button
          text={isEdit ? "Lerneinheit aktualisieren" : "Lerneinheit anlegen"}
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          style={{ flex: 1 }}
          onPress={onSave}
          disabled={saveDisabled}
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
