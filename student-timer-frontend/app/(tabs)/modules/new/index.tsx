import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { H1, H2, H3 } from "@/components/StyledText";
import { View, Text } from "@/components/Themed";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { COLORTHEME } from "@/constants/Theme";
import { LearningUnitType } from "@/types/LearningUnitType";
import { ModuleType } from "@/types/ModuleType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function NewModule() {
  const [moduleName, setModuleName] = useState("");
  const [examDate, setExamDate] = useState("");
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
  const [examDateError, setStudyCourseError] = useState("");
  const [creditPointError, setEmailError] = useState("");
  const [colorCodeError, setColorCodeError] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const validateInput = () => {
    var nameValid = false;
    if (moduleName.length == 0) {
      setModuleNameError("Name ist erforderlich");
    } else {
      setModuleNameError("");
      nameValid = true;
    }

    var studyCourseValid = false;
    if (examDate.length == 0) {
      setStudyCourseError("Studienfach ist erforderlich");
    } else {
      setStudyCourseError("");
      studyCourseValid = true;
    }

    var emailValid = false;
    if (creditPoints.length == 0) {
      setEmailError("E-Mail ist erforderlich");
    } else if (creditPoints.length < 6) {
      setEmailError("E-Mail sollte mindestens 6 Zeichen lang sein");
    } else if (creditPoints.indexOf(" ") >= 0) {
      setEmailError("E-Mail kann keine Leerzeichen enthalten");
    } else {
      setEmailError("");
      emailValid = true;
    }

    var passwordValid = false;
    if (colorCode.length == 0) {
      setColorCodeError("Passwort ist erforderlich");
    } else if (colorCode.length < 6) {
      setColorCodeError("Das Passwort sollte mindestens 6 Zeichen lang sein");
    } else {
      setColorCodeError("");
      passwordValid = true;
    }

    if (emailValid && passwordValid) {
      return true;
    }

    return false;
  };

  const onRegister = () => {
    router.push(`/modules/new/learningUnits`);
    // if (validateInput()) {
    //   router.replace(`/(tabs)/modules/${newModule.moduleId}`);
    // }
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

  const onDeleteLearningUnit = (unitId: number) => {
    const index = learningUnits.findIndex((item) => item.unitId === unitId);
    if (index > -1) {
      learningUnits.splice(index, 1);
    }
  };

  const onAddLearningUnit = () => {
    console.log(learningUnits);

    setLearningUnits((prevLearningUnits) => {
      const test = {
        unitId: Math.floor(Math.random() * 10000),
        name: "testNew",
        workloadPerWeek: -1,
        startDate: new Date(),
        endDate: new Date(),
      };
      return [...prevLearningUnits, test];
    });
  };

  const newModule: ModuleType = {
    moduleId: "",
    name: moduleName,
    colorCode: "",
    creditpoints: -1,
    examDate: new Date(),
    learningUnits: learningUnits,
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainerStyle}
    >
      <View style={styles.section}>
        <H3 style={styles.cardHeader}>Moduleigenschaften</H3>
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
            <InputField
              label="Prüfungsdatum"
              onChangeText={setExamDate}
              value={examDate}
              message={examDateError}
              messageColor="red"
            />
          </View>
          <View style={styles.row}>
            <InputField
              label="Credit-Points"
              onChangeText={setCreditPoints}
              value={creditPoints}
              keyboardType="number-pad"
              message={creditPointError}
              messageColor="red"
            />
            <InputField
              label="Farbauswahl"
              onChangeText={setColorCode}
              value={colorCode}
              message={colorCodeError}
              messageColor="red"
            />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <H3 style={styles.cardHeader}>Lerneinheiten</H3>
        <FlatList
          data={learningUnits}
          renderItem={({ item }) => (
            <LearningUnitForm
              inputData={item}
              onDelete={onDeleteLearningUnit}
            />
          )}
          keyExtractor={(item: LearningUnitType) => item.unitId.toString()}
          // extraData={learningUnits}
          contentContainerStyle={styles.flatListContainer}
        ></FlatList>
        <Button
          text="Lerneinheit hinzufügen"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          onPress={onAddLearningUnit}
          style={{ width: 200 }}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          text="Weiter"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          onPress={onRegister}
          style={{ width: 200 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    gap: 24,
    paddingHorizontal: 12,
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
    gap: 5,
  },
  cardHeader: {
    width: "100%",
    textAlign: "left",
    paddingHorizontal: 8,
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 16,
  },
  inputLabelGroup: {
    flex: 1,
    gap: 5,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  inputLabelText: {
    color: COLORTHEME.light.primary,
  },
  input: {
    flexGrow: 1,
    backgroundColor: COLORTHEME.light.grey2,
    color: COLORTHEME.light.grey3,
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
  },
});
