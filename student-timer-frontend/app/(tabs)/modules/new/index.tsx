import Alert from "@/components/Alert";
import Button from "@/components/Button";
import ModuleForm from "@/components/modules/ModuleForm";
import { BASE_STYLES, COLORS, COLORTHEME } from "@/constants/Theme";
import { ModuleType } from "@/types/ModuleType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function NewModule() {
  const router = useRouter();

  const [newModule, setNewModule] = useState<ModuleType>({
    id: -1,
    name: "",
    colorCode: COLORS.moduleColor1,
    creditPoints: 0,
    examDate: new Date(),
    learningUnits: [],
    learningSessions: [],
    totalLearningSessionTime: 0,
    totalLearningUnitTime: 0,
    totalLearningTime: 0,
    totalModuleTime: 0,
  } as ModuleType);

  const [openChanges, setOpenChanges] = useState(false);
  const [dateDisabled, setDateDisabled] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState<Set<string>>(
    new Set(["name", "cp"])
  );

  const handleUpdate = (module: ModuleType, disabledStatus?: boolean) => {
    if (module) setNewModule(module);
    if (disabledStatus != undefined) setDateDisabled(disabledStatus);
    if (!openChanges) setOpenChanges(true);
  };

  const handleValidationError = (errorType: string, errorOccured: boolean) => {
    if (errorOccured) {
      setSaveDisabled((prevSet) => new Set([...prevSet, errorType]));
    } else {
      setSaveDisabled((prevSet) => {
        const updatedSet = new Set<string>(prevSet);
        updatedSet.delete(errorType);
        return updatedSet;
      });
    }
  };

  const onContinue = () => {
    // Toggle openChanges to trigger validation in input fields
    if (!openChanges) {
      setOpenChanges(true);
      return;
    }

    if (dateDisabled) {
      router.push({
        pathname: "/modules/new/learningUnits",
        params: {
          name: newModule.name.trim(),
          colorCode: newModule.colorCode,
          creditPoints: newModule.creditPoints,
        },
      });
    } else {
      router.push({
        pathname: "/modules/new/learningUnits",
        params: {
          name: newModule.name.trim(),
          colorCode: newModule.colorCode,
          creditPoints: newModule.creditPoints,
          examDate: newModule.examDate?.toISOString().substring(0, 10),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ModuleForm
        inputData={newModule}
        onChange={handleUpdate}
        dateDiabled={dateDisabled}
        onValidationError={handleValidationError}
        onSaveHandler={openChanges}
      />
      <View style={styles.buttonRowWrapper}>
        <Button
          text="Abbrechen"
          borderColor={COLORTHEME.light.primary}
          backgroundColor={COLORTHEME.light.background}
          textColor={COLORTHEME.light.primary}
          style={{ flex: 1 }}
          onPress={() =>
            openChanges
              ? Alert({
                  title: "Eingaben verwerfen?",
                  message:
                    "Wenn du fortfährst, gehen alle Eingaben verloren. Bist du dir sicher?",
                  onPressConfirm: () => router.push("/modules"),
                })
              : router.push("/modules")
          }
        />
        <Button
          text="Weiter"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          style={{ flex: 1 }}
          onPress={onContinue}
          disabled={saveDisabled.size != 0 && openChanges}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORTHEME.light.background,
    paddingVertical: BASE_STYLES.verticalPadding,
  },
  buttonRowWrapper: {
    flexDirection: "row",
    width: "100%",
    gap: BASE_STYLES.wrapperGap,
  },
});
