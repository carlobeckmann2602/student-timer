import Button from "@/components/Button";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";
import { COLORTHEME } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";
import { LearningUnitType } from "@/types/LearningUnitType";
import { ModuleType } from "@/types/ModuleType";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

export default function NewModuleLearningUnits() {
  const { name, colorCode, creditPoints, examDate } = useLocalSearchParams<{
    name: string;
    colorCode: string;
    creditPoints: string;
    examDate?: string;
  }>();

  const [validationError, setValidationError] = useState(false);
  const [validationIndicator, setValidationIndicator] = useState<boolean>();

  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { fetchModules } = useModules();

  const [learningUnits, setLearningUnits] = useState<LearningUnitType[]>([
    {
      id: Math.random(),
      name: LearningUnitEnum.VORLESUNG,
      workloadPerWeek: 1,
      startDate: new Date(),
      endDate: new Date(),
      totalLearningTime: 0,
    },
  ]);

  const router = useRouter();

  const onLearningUnitChange = (changedUnit: LearningUnitType) => {
    let updated = learningUnits.map((current) => {
      return current.id === changedUnit.id ? changedUnit : current;
    });
    setLearningUnits(updated);
    // console.log("Vorher");
    // console.log(learningUnits);
    // const newlearningUnits = learningUnits.map((current) => {
    //   if (current.id == changedUnit.id) {
    //     // console.log(current);
    //     // console.log(changedUnit);
    //   }
    //   return current.id === changedUnit.id ? changedUnit : current;
    // });
    // // console.log(newlearningUnits);
    // setLearningUnits(newlearningUnits);

    console.log("Final");
    console.log(learningUnits);
  };

  const onDeleteLearningUnit = (id: number) => {
    if (learningUnits.length > 1)
      setLearningUnits(() => {
        return learningUnits.filter((item) => item.id != id);
      });
  };

  const onAddLearningUnit = () => {
    setLearningUnits((prevLearningUnits) => {
      const newlearningUnit = {
        id: Math.random(),
        name: LearningUnitEnum.VORLESUNG,
        workloadPerWeek: 1,
        startDate: new Date(),
        endDate: new Date(),
        totalLearningTime: 0,
      };
      return [...prevLearningUnits, newlearningUnit];
    });
  };

  const onCreateModule = async () => {
    setValidationError(false);
    setValidationIndicator((prevState) => (prevState ? !prevState : false));
    if (validationError) {
      toast.show(
        "Überprüfe alle Eingaben auf ihre Gültigkeit. Erst dann kann das Modul angelegt werden.",
        { type: "danger" }
      );
      return;
    }

    let id = toast.show("Erstellen...");
    let response;
    try {
      let moduleDTO;
      if (examDate) {
        moduleDTO = {
          name: name,
          examDate: examDate,
          colorCode: colorCode,
          creditpoints: +creditPoints,
        };
      } else {
        moduleDTO = {
          name: name,
          colorCode: colorCode,
          creditpoints: +creditPoints,
        };
      }

      response = await authAxios?.post(
        `/students/${authState?.user.id}/modules`,
        moduleDTO
      );
      const createdModule: ModuleType | undefined = response?.data;
      learningUnits.forEach(async (unit: LearningUnitType) => {
        // Multiply workloadPerWeek with 60 (minutes per hour) as the input is given in hours but the backend expects minutes
        let minutesPerHour = 60;

        await authAxios?.post(
          `/students/${authState?.user.id}/modules/${createdModule?.id}/learningUnits`,
          {
            name: unit.name,
            startDate: unit.startDate.toISOString().substring(0, 10),
            endDate: unit.endDate.toISOString().substring(0, 10),
            workloadPerWeek: unit.workloadPerWeek * minutesPerHour,
          }
        );
      });

      toast.update(id, "Modul erfolgreich angelegt.", { type: "success" });
      fetchModules && (await fetchModules());
    } catch (e) {
      toast.update(id, `Fehler beim Erstellen des Moduls: ${e}`, {
        type: "danger",
      });
    } finally {
      router.replace({
        pathname: "/(tabs)/modules/",
        params: {
          moduleSaved: response?.status === 200 ? 1 : 0,
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: COLORTHEME.light.background }}
    >
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContainerStyle}
      >
        {learningUnits.map((unit) => (
          <LearningUnitForm
            key={unit.id}
            inputData={unit}
            onDelete={
              learningUnits.length > 1 ? onDeleteLearningUnit : undefined
            }
            onChange={onLearningUnitChange}
            setValidationErrorCallback={(value) => {
              // if one form sets the validationError to true (as it received invalid inputs),
              // the validationError-state should not be overwritten by other, possibly valid forms
              if (!validationError) setValidationError(value);
            }}
            validationIndicator={validationIndicator}
          />
        ))}
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          text="Lerneinheit hinzufügen"
          backgroundColor={COLORTHEME.light.background}
          textColor={COLORTHEME.light.primary}
          onPress={onAddLearningUnit}
          style={{
            width: 200,
            borderWidth: 4,
            borderColor: COLORTHEME.light.primary,
          }}
        />
        <Button
          text="Modul erstellen"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          onPress={onCreateModule}
          style={{ width: 200 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    flexDirection: "column",
    gap: 24,
    padding: 12,
    backgroundColor: COLORTHEME.light.background,
  },
  scrollViewContainerStyle: {
    alignItems: "center",
    justifyContent: "space-around",
    gap: 16,
    paddingBottom: 24,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
});
