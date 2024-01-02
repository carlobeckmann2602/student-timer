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
import { useState } from "react";
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

  const [validationError, setValidationError] = useState(true);

  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { fetchModules } = useModules();

  const [learningUnits, setLearningUnits] = useState<LearningUnitType[]>([
    {
      id: Math.random(),
      name: LearningUnitEnum.VORLESUNG,
      workloadPerWeek: 0,
      startDate: new Date(),
      endDate: new Date(),
      totalLearningTime: 0,
    },
  ]);

  const router = useRouter();

  const onLearningUnitChange = (changedUnit: LearningUnitType) => {
    setLearningUnits((prevLearningUnits) => {
      const newlearningUnits = prevLearningUnits.map((current) => {
        return current.id === changedUnit.id ? changedUnit : current;
      });
      return newlearningUnits;
    });
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
        workloadPerWeek: 0,
        startDate: new Date(),
        endDate: new Date(),
        totalLearningTime: 0,
      };
      return [...prevLearningUnits, newlearningUnit];
    });
  };

  const onCreateModule = async () => {
    if (validationError) return;

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
      learningUnits.forEach(async (unit) => {
        // Multiply workloadPerWeek with 60 (minutes per hour) as the input is given in hours but the backend expects minutes
        await authAxios?.post(
          `/students/${authState?.user.id}/modules/${createdModule?.id}/learningUnits`,
          {
            name: unit.name,
            startDate: unit.startDate.toISOString().substring(0, 10),
            endDate: unit.endDate.toISOString().substring(0, 10),
            workloadPerWeek: unit.workloadPerWeek * 60,
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
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContainerStyle}
      >
        {learningUnits.map((unit) => (
          <LearningUnitForm
            inputData={unit}
            onDelete={onDeleteLearningUnit}
            onChange={onLearningUnitChange}
            setValidationErrorCallback={setValidationError}
            key={unit.id}
          />
        ))}
        <View style={styles.buttons}>
          <Button
            text="Lerneinheit hinzufügen"
            backgroundColor={COLORTHEME.light.primary}
            textColor={COLORTHEME.light.grey2}
            onPress={onAddLearningUnit}
            style={{ width: 200 }}
          />
          <Button
            text="Fertig"
            backgroundColor={COLORTHEME.light.primary}
            textColor={COLORTHEME.light.grey2}
            onPress={onCreateModule}
            style={{ width: 200 }}
            disabled={validationError}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexDirection: "column",
    padding: 24,
    gap: 24,
  },
  scrollViewContainerStyle: {
    alignItems: "center",
    justifyContent: "space-around",
    gap: 16,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    paddingBottom: 46,
    backgroundColor: "transparent",
  },
});
