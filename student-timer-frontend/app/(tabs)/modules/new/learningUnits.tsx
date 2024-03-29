import Button from "@/components/Button";
import { toastShow, toastUpdate } from "@/components/Toast";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";
import { BASE_STYLES, COLORS, COLORTHEME, SIZES } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";
import { LearningUnitType } from "@/types/LearningUnitType";
import { ModuleType } from "@/types/ModuleType";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

export default function NewModuleLearningUnits() {
  const { name, colorCode, creditPoints, examDate } = useLocalSearchParams<{
    name: string;
    colorCode: string;
    creditPoints: string;
    examDate?: string;
  }>();

  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { fetchModules } = useModules();

  const [saveDisabled, setSaveDisabled] = useState<Set<string>>(new Set());
  const [learningUnits, setLearningUnits] = useState<LearningUnitType[]>([
    {
      id: Math.random(),
      name: LearningUnitEnum.VORLESUNG,
      workloadPerWeek: 60,
      startDate: new Date(),
      endDate: new Date(),
      totalLearningTime: 0,
      workloadPerWeekHours: 60,
      workloadPerWeekMinutes: 0,
    },
  ]);

  const router = useRouter();

  const handleUpdate = (learningUnit: LearningUnitType, index: number) => {
    const newLearningUnits = [...learningUnits];
    newLearningUnits[index] = learningUnit;
    setLearningUnits(newLearningUnits);
  };

  const onDeleteLearningUnit = (id: number) => {
    if (learningUnits.length > 1)
      setLearningUnits(() => {
        return learningUnits.filter((item) => item.id != id);
      });
  };

  const handleValidationError = (unitId: number, errorOccured: boolean) => {
    if (errorOccured) {
      setSaveDisabled((prevSet) => new Set([...prevSet, unitId.toString()]));
    } else {
      setSaveDisabled((prevSet) => {
        const updatedSet = new Set<string>(prevSet);
        updatedSet.delete(unitId.toString());
        return updatedSet;
      });
    }
  };

  const onAddLearningUnit = () => {
    setLearningUnits((prevLearningUnits) => {
      const newlearningUnit = {
        id: Math.random(),
        name: LearningUnitEnum.VORLESUNG,
        workloadPerWeek: 60,
        startDate: new Date(),
        endDate: new Date(),
        colorCode: COLORS.VORLESUNG,
        totalLearningTime: 0,
        workloadPerWeekHours: 60,
        workloadPerWeekMinutes: 0,
      };
      return [...prevLearningUnits, newlearningUnit];
    });
  };

  const onCreateModule = async () => {
    let id = toastShow(toast, "Erstellen...", { type: "loading" });
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
        let totalWorkloadPerWeek = unit.workloadPerWeekHours
          ? unit.workloadPerWeekHours
          : 0;
        totalWorkloadPerWeek += unit.workloadPerWeekMinutes
          ? unit.workloadPerWeekMinutes
          : 0;

        await authAxios?.post(
          `/students/${authState?.user.id}/modules/${createdModule?.id}/learningUnits`,
          {
            name: unit.name,
            startDate: unit.startDate.toISOString().substring(0, 10),
            endDate: unit.endDate.toISOString().substring(0, 10),
            workloadPerWeek: totalWorkloadPerWeek,
          }
        );
      });

      fetchModules && (await fetchModules());
      toastUpdate(toast, id, "Modul erfolgreich angelegt.", {
        type: "success",
      });
      router.push("/(tabs)/modules");
    } catch (e) {
      toastUpdate(toast, id, `Fehler beim Erstellen des Moduls: ${e}`, {
        type: "danger",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={learningUnits}
        renderItem={({ item, index }) => (
          <LearningUnitForm
            key={index}
            inputData={item}
            onDelete={
              learningUnits.length > 1 ? onDeleteLearningUnit : undefined
            }
            onChange={(inputData) => handleUpdate(inputData, index)}
            onValidationError={(errorOccured) =>
              handleValidationError(item.id, errorOccured)
            }
          />
        )}
        keyExtractor={(item: LearningUnitType) => item.id.toString()}
        contentContainerStyle={styles.scrollViewContainerStyle}
        style={styles.scrollViewContainer}
        ListFooterComponent={
          <Button
            text="Lerneinheit hinzufügen"
            borderColor={COLORTHEME.light.primary}
            backgroundColor={COLORTHEME.light.background}
            textColor={COLORTHEME.light.primary}
            onPress={onAddLearningUnit}
            iconRight={<Plus color={COLORTHEME.light.primary} />}
            textStyle={{ fontSize: SIZES.xsmall }}
            style={{ width: "50%", alignSelf: "flex-end" }}
          />
        }
      />
      <Button
        text="Erstellung abschließen"
        backgroundColor={COLORTHEME.light.primary}
        textColor={COLORTHEME.light.grey2}
        onPress={onCreateModule}
        style={{ marginBottom: BASE_STYLES.horizontalPadding }}
        disabled={saveDisabled.size != 0}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: BASE_STYLES.gap,
    backgroundColor: COLORTHEME.light.background,
    paddingVertical: BASE_STYLES.verticalPadding,
  },
  scrollViewContainer: {
    flexGrow: 1,
    flexDirection: "column",
    borderRadius: BASE_STYLES.borderRadius,
    gap: BASE_STYLES.gap,
  },
  scrollViewContainerStyle: {
    justifyContent: "space-around",
    gap: BASE_STYLES.gap,
  },
});
