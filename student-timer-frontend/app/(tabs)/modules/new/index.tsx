import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import InputField from "@/components/InputField";
import { View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";
import { LearningUnitType } from "@/types/LearningUnitType";
import { ModuleType } from "@/types/ModuleType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

export default function NewModule() {
  const router = useRouter();

  const minimumDate: Date = new Date(+new Date() + 86400000);

  const [moduleName, setModuleName] = useState("");
  const [examDate, setExamDate] = useState<Date>(minimumDate);
  const [creditPoints, setCreditPoints] = useState("");
  const [colorCode, setColorCode] = useState("");

  const [learningUnits, setLearningUnits] = useState<LearningUnitType[]>([
    {
      unitId: 123,
      name: "test",
      workloadPerWeek: -1,
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);

  const [moduleNameError, setModuleNameError] = useState("");
  const [examDateError, setExamDateError] = useState("");
  const [creditPointError, setCreditPointError] = useState("");

  const validateInput = () => {
    var nameValid = false;
    if (moduleName.trim().length == 0) {
      setModuleNameError("Name ist erforderlich");
    } else {
      setModuleNameError("");
      nameValid = true;
    }

    var examDateValid = false;
    var timeDifference = examDate.getTime() - minimumDate.getTime();
    var dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    console.log(dayDifference);
    if (dayDifference < 0) {
      setExamDateError("Das Prüfungsdatum muss in der Zukunft liegen");
    } else {
      setExamDateError("");
      examDateValid = true;
    }

    var creditPointsValid = false;
    if (creditPoints.length == 0) {
      setCreditPointError(
        "Für das Modul muss eine Anzahl von Creditpoints angegeben werden"
      );
    } else {
      setCreditPointError("");
      creditPointsValid = true;
    }

    if (nameValid && examDateValid && creditPointsValid) {
      return true;
    }

    return false;
  };

  const onContinue = () => {
    if (validateInput()) {
      router.push(`/modules/new/learningUnits`);
    }
  };

  // const newLearningUnits: LearningUnitType[] = [
  //   {
  //     unitId: 123,
  //     name: "test",
  //     workloadPerWeek: -1,
  //     startDate: new Date(),
  //     endDate: new Date(),
  //   },
  //   {
  //     unitId: 456,
  //     name: "test",
  //     workloadPerWeek: -1,
  //     startDate: new Date(),
  //     endDate: new Date(),
  //   },
  //   {
  //     unitId: 789,
  //     name: "test",
  //     workloadPerWeek: -1,
  //     startDate: new Date(),
  //     endDate: new Date(),
  //   },
  // ];

  const newModule: ModuleType = {
    moduleId: "",
    name: moduleName,
    colorCode: "",
    creditpoints: -1,
    examDate: new Date(),
    learningUnits: learningUnits,
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.outerWrapper}>
        <View style={styles.row}>
          <InputField
            label="Name"
            onChangeText={setModuleName}
            value={moduleName}
            message={moduleNameError}
            messageColor="red"
          />
        </View>
        <View style={styles.row}>
          <DateTimePicker
            label="Prüfungsdatum"
            onChangeDate={(date) => {
              date ? setExamDate(date) : setExamDate(new Date());
            }}
            minimumDate={minimumDate}
            value={examDate}
            message={examDateError}
            messageColor="red"
          />
          <InputField
            label="Credit-Points"
            onChangeText={setCreditPoints}
            value={creditPoints}
            keyboardType="number-pad"
            message={creditPointError}
            messageColor="red"
            inputUnit="CP"
          />
        </View>
        <View style={styles.row}>
          <InputField
            label="Farbauswahl"
            onChangeText={setColorCode}
            value={colorCode}
          />
          <View style={{ width: "70%", backgroundColor: "transparent" }} />
        </View>
      </View>
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
    padding: 12,
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
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
});
