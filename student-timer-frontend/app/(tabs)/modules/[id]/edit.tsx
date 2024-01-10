import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import InputField from "@/components/InputField";
import InputFieldNumeric from "@/components/InputFieldNumeric";
import StyledCheckbox from "@/components/StyledCheckbox";
import { H2, P, Subhead } from "@/components/StyledText";
import { View } from "@/components/Themed";
import LearningUnitRow from "@/components/modules/LearningUnitRow";
import { COLORTHEME } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";
import { LearningUnitType } from "@/types/LearningUnitType";
import { ModuleType } from "@/types/ModuleType";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

export default function EditModule() {
  const { id: moduleToEditId } = useLocalSearchParams<{
    id: string;
  }>();

  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { modules, fetchModules } = useModules();
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

  const fetchDetailModule = () => {
    if (modules && modules.length > 0) {
      var filteredModule: ModuleType | undefined = modules.find(
        (module) => module.id.toString() === moduleToEditId
      );
      if (filteredModule) {
        // setModuleError(false);
        return filteredModule;
      }
    }

    return {
      id: -1,
      name: "",
      colorCode: "",
      creditPoints: 0,
      examDate: new Date(),
      learningUnits: [],
      learningSessions: [],
      totalLearningSessionTime: 0,
      totalLearningUnitTime: 0,
      totalLearningTime: 0,
      totalModuleTime: 0,
    } as ModuleType;
  };

  const [detailModule] = useState<ModuleType>(fetchDetailModule());
  const [dateDiabled, setDateDisabled] = useState(
    detailModule.examDate ? false : true
  );

  const [moduleName, setModuleName] = useState(detailModule.name);
  const [examDate, setExamDate] = useState<Date>(
    detailModule.examDate ? detailModule.examDate : new Date()
  );
  const [creditPoints, setCreditPoints] = useState(
    detailModule.creditPoints.toString()
  );
  const [colorCode, setColorCode] = useState(detailModule.colorCode);

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

  const onSave = async () => {
    if (validateInput()) {
      let toastId = toast.show("Änderungen speichern...");
      let response;

      try {
        let moduleDTO;
        if (examDate && !dateDiabled) {
          moduleDTO = {
            name: moduleName,
            examDate: examDate,
            colorCode: colorCode,
            creditpoints: +creditPoints,
          };
        } else {
          moduleDTO = {
            name: moduleName,
            colorCode: colorCode,
            creditpoints: +creditPoints,
          };
        }

        response = await authAxios?.put(
          `/students/${authState?.user.id}/modules/${moduleToEditId}`,
          moduleDTO
        );
        const createdModule: ModuleType | undefined = response?.data;
        // learningUnits.forEach(async (unit: LearningUnitType) => {
        //   await authAxios?.post(
        //     `/students/${authState?.user.id}/modules/${createdModule?.id}/learningUnits`,
        //     {
        //       name: unit.name,
        //       startDate: unit.startDate.toISOString().substring(0, 10),
        //       endDate: unit.endDate.toISOString().substring(0, 10),
        //       workloadPerWeek: unit.workloadPerWeek,
        //     }
        //   );
        // });

        toast.update(toastId, "Änderungen erfolgreich gespeichert.", {
          type: "success",
        });
        fetchModules && (await fetchModules());
        router.replace("/(tabs)/modules");
      } catch (e) {
        toast.update(toastId, `Fehler beim Ändern des Moduls: ${e}`, {
          type: "danger",
        });
      }
    }
  };

  const onDelete = (learningUnitId: number) => {
    console.log(learningUnitId);
    console.log(detailModule.learningUnits);
    Alert.alert(
      "Lerneinheit wirklich löschen?",
      `Möchtest du die Lerneinheit ${
        detailModule.learningUnits.find((unit) => unit.id === learningUnitId)
          ?.name
      } wirklich unwiederuflich löschen?`,
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Löschen",
          onPress: () => {
            deleteLearningUnit(learningUnitId);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const deleteLearningUnit = async (learningUnitId: number) => {
    let id = toast.show("Löschen...", { type: "loading" });
    console.log(
      `/students/${authState?.user.id}/modules/${detailModule.id}/learningUnits/${learningUnitId}`
    );
    try {
      let response = await authAxios?.delete(
        `/students/${authState?.user.id}/modules/${detailModule.id}/learningUnits/${learningUnitId}`
      );
      console.log(response?.status);
      console.log(response?.data);
      toast.update(id, "Lerneinheit erfolgreich gelöscht", { type: "success" });
      fetchModules && (await fetchModules());
    } catch (e) {
      toast.update(id, `Fehler beim Löschen der Lerneinheit: ${e}`, {
        type: "danger",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContainerStyle}
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
          <View style={styles.dateRowContainer}>
            <P style={{ color: COLORTHEME.light.primary }}>
              {"Prüfungsdatum (optional)"}
            </P>
            <View style={styles.row}>
              <DateTimePicker
                onChangeDate={(date) => {
                  date ? setExamDate(date) : setExamDate(new Date());
                }}
                value={examDate}
                disabled={dateDiabled}
                style={{ opacity: dateDiabled ? 0.5 : 1 }}
              />
              <StyledCheckbox
                value={dateDiabled}
                onValueChange={setDateDisabled}
                label="Keine Angabe"
              />
            </View>
          </View>
          <View style={styles.row}>
            <InputFieldNumeric
              label="Credit-Points"
              onChangeText={setCreditPoints}
              value={creditPoints}
              message={creditPointError}
              messageColor="red"
              inputUnit="CP"
            />
            <View style={{ width: "50%", backgroundColor: "transparent" }} />
          </View>
          <View style={styles.row}>
            <View style={styles.colorWrapper}>
              <P style={styles.inputLabelText}>Farbauswahl</P>
              <FlatList
                style={{ width: "100%" }}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                }}
                contentContainerStyle={{ gap: 20 }}
                data={selectableColors}
                numColumns={4}
                renderItem={({ item: color }) => {
                  return (
                    <TouchableOpacity
                      style={styles.colorOptionWrapper}
                      onPress={() => setColorCode(color)}
                      key={color}
                    >
                      <View
                        style={[
                          styles.colorOptionIndicator,
                          {
                            borderColor:
                              colorCode === color
                                ? COLORTHEME.light.primary
                                : "transparent",
                          },
                        ]}
                      />
                      <View
                        style={[styles.colorOption, { backgroundColor: color }]}
                      />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </View>
        <View style={styles.unitWrapper}>
          <H2 style={{ textAlign: "left" }}>Einheiten</H2>
          <View>
            {detailModule?.learningUnits.map((unit: LearningUnitType) => {
              return (
                <LearningUnitRow
                  key={unit.id}
                  learningUnit={unit}
                  selfLearningTime={
                    detailModule.totalModuleTime -
                    detailModule.totalLearningTime
                  }
                  onDelete={() => onDelete(unit.id)}
                  onEdit={() =>
                    router.push({
                      pathname: `modules/${detailModule.id}/learningUnits/${unit.id}/edit`,
                    } as never)
                  }
                />
              );
            })}
          </View>
        </View>
        <Button
          text="Änderungen speichern"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          onPress={onSave}
          style={{ width: 200, alignSelf: "center" }}
        />
        <P
          style={styles.discardLink}
          onPress={() => {
            Alert.alert(
              "Änderungen verwerfen?",
              `Wenn du fortfährst, gehen alle Änderungen ungespeichert verloren. Bist du dir sicher?`,
              [
                {
                  text: "Abbrechen",
                  style: "default",
                },
                {
                  text: "Verwerfen",
                  onPress: () => {
                    router.push("/modules");
                  },
                  style: "destructive",
                },
              ],
              { cancelable: false }
            );
          }}
        >
          Verwerfen
        </P>
      </ScrollView>
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
  scrollViewContainer: {
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
  discardLink: {
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  unitWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 16,
  },
});
