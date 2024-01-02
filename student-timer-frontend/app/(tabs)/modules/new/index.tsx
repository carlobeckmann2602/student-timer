import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import InputField from "@/components/InputField";
import { View } from "@/components/Themed";
import { COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

export default function NewModule() {
  const router = useRouter();

  const [moduleName, setModuleName] = useState("");
  const [examDate, setExamDate] = useState<Date>(new Date());
  const [creditPoints, setCreditPoints] = useState("");
  const [colorCode, setColorCode] = useState("");

  const [moduleNameError, setModuleNameError] = useState("");
  const [creditPointError, setCreditPointError] = useState("");

  const validateInput = () => {
    var nameValid = false;
    if (moduleName.trim().length == 0) {
      setModuleNameError("Name ist erforderlich");
    } else {
      setModuleNameError("");
      nameValid = true;
    }

    var creditPointsValid = false;
    if (+creditPoints <= 0) {
      setCreditPointError("Creditpoints muss einen Wert größer 0 enthalten");
    } else {
      setCreditPointError("");
      creditPointsValid = true;
    }

    return nameValid && creditPointsValid;
  };

  const onContinue = () => {
    if (validateInput()) {
      if (examDate) {
        router.push({
          pathname: "/modules/new/learningUnits",
          params: {
            name: moduleName,
            colorCode: colorCode,
            creditPoints: creditPoints,
            examDate: examDate?.toISOString().substring(0, 10),
          },
        });
      } else {
        router.push({
          pathname: "/modules/new/learningUnits",
          params: {
            name: moduleName,
            colorCode: colorCode,
            creditPoints: creditPoints,
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
      <View style={styles.outerWrapper}>
        <View style={styles.row}>
          <InputField
            label="Name*"
            onChangeText={setModuleName}
            value={moduleName}
            message={moduleNameError}
            messageColor="red"
          />
        </View>
        <View style={styles.row}>
          <DateTimePicker
            label="Prüfungsdatum*"
            onChangeDate={(date) => {
              date ? setExamDate(date) : setExamDate(new Date());
            }}
            value={examDate}
          />
          <InputField
            label="Credit-Points*"
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
            label="Farbauswahl*"
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
