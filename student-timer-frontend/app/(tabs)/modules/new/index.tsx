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
  const [openChanges, setOpenChanges] = useState(false);

  const [newModule, setNewModule] = useState<ModuleType>({
    id: -1,
    name: "",
    colorCode: COLORS.moduleColor1,
    creditPoints: 1,
    examDate: new Date(),
    learningUnits: [],
    learningSessions: [],
    totalLearningSessionTime: 0,
    totalLearningUnitTime: 0,
    totalLearningTime: 0,
    totalModuleTime: 0,
  } as ModuleType);

  const [dateDisabled, setDateDisabled] = useState(false);
  const [moduleNameError, setModuleNameError] = useState("");
  const [creditPointError, setCreditPointError] = useState("");

  const validateInput = () => {
    var nameValid = false;
    if (newModule.name.trim().length == 0) {
      setModuleNameError(() => "Name ist erforderlich");
    } else {
      setModuleNameError(() => "");
      nameValid = true;
    }

    var creditPointsValid = false;
    if (+newModule.creditPoints <= 0) {
      setCreditPointError(
        () => "Creditpoints muss einen Wert größer 0 enthalten"
      );
    } else {
      setCreditPointError(() => "");
      creditPointsValid = true;
    }

    return nameValid && creditPointsValid;
  };

  const handleUpdate = (module: ModuleType, disabledStatus?: boolean) => {
    if (module) setNewModule(module);
    if (disabledStatus != undefined) setDateDisabled(disabledStatus);
    if (!openChanges) setOpenChanges(true);
  };

  const onContinue = () => {
    if (validateInput()) {
      if (dateDisabled) {
        router.push({
          pathname: "/modules/new/learningUnits",
          params: {
            name: newModule.name,
            colorCode: newModule.colorCode,
            creditPoints: newModule.creditPoints,
          },
        });
      } else {
        router.push({
          pathname: "/modules/new/learningUnits",
          params: {
            name: newModule.name,
            colorCode: newModule.colorCode,
            creditPoints: newModule.creditPoints,
            examDate: newModule.examDate?.toISOString().substring(0, 10),
          },
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <ModuleForm
        inputData={newModule}
        onChange={handleUpdate}
        dateDiabled={dateDisabled}
        moduleNameError={moduleNameError}
        creditPointError={creditPointError}
      />
      <View style={styles.buttonRowWrapper}>
        <Button
          text="Abbrechen"
          borderColor={COLORTHEME.light.danger}
          backgroundColor={COLORTHEME.light.background}
          textColor={COLORTHEME.light.danger}
          style={{ flex: 1 }}
          onPress={() =>
              openChanges
                  ? Alert({
                    title: "Eingaben verwerfen?",
                    message: "Wenn du fortfährst, gehen alle Eingaben verloren. Bist du dir sicher?",
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
    paddingVertical: BASE_STYLES.horizontalPadding,
  },
  buttonRowWrapper: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
    marginBottom: BASE_STYLES.horizontalPadding,
  },
});
