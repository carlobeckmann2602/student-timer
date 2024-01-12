import Button from "@/components/Button";
import ModuleForm from "@/components/modules/ModuleForm";
import { COLORTHEME } from "@/constants/Theme";
import { ModuleType } from "@/types/ModuleType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

export default function NewModule() {
  const router = useRouter();
  const selectableColors: string[] = [
    "#88A795",
    "#AB5761",
    "#5D7CB9",
    "#FBC2B5",
    "#073B3A",
    "#243119",
    "#FA7921",
    "#88A7F5",
  ];

  const [newModule, setNewModule] = useState<ModuleType>({
    id: -1,
    name: "",
    colorCode: selectableColors[0],
    creditPoints: 0,
    examDate: new Date(),
    learningUnits: [],
    learningSessions: [],
    totalLearningSessionTime: 0,
    totalLearningUnitTime: 0,
    totalLearningTime: 0,
    totalModuleTime: 0,
  } as ModuleType);

  const [dateDiabled, setDateDisabled] = useState(false);
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
    validateInput();
  };

  const onContinue = () => {
    if (validateInput()) {
      if (dateDiabled) {
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ModuleForm
        inputData={newModule}
        onChange={handleUpdate}
        dateDiabled={dateDiabled}
        moduleNameError={moduleNameError}
        creditPointError={creditPointError}
      />
      <Button
        text="Weiter"
        backgroundColor={COLORTHEME.light.primary}
        textColor={COLORTHEME.light.grey2}
        onPress={onContinue}
        style={{ width: 200, alignSelf: "center" }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    gap: 24,
    backgroundColor: COLORTHEME.light.background,
  },
  scrollViewContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  section: {
    width: "100%",
    gap: 12,
    backgroundColor: "transparent",
  },
  flatListContainer: {
    gap: 12,
  },
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey1,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    gap: 16,
  },
  dateRowContainer: {
    gap: 5,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  colorWrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    gap: 4,
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  colorOptionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  colorOptionIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -26 }, { translateY: -26 }],
    width: 52,
    height: 52,
    backgroundColor: "transparent",
    borderRadius: 1000,
    borderWidth: 4,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 1000,
  },
});
