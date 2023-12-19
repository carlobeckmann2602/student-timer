import Button from "@/components/Button";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { COLORTHEME } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";
import { LearningUnitType } from "@/types/LearningUnitType";
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
    examDate: string;
  }>();

  const [error, setError] = useState("");

  const toast = useToast();
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { fetchModules } = useModules();

  const [learningUnits, setLearningUnits] = useState<LearningUnitType[]>([]);

  const router = useRouter();

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
        name: "testNew",
        workloadPerWeek: -1,
        startDate: new Date(),
        endDate: new Date(),
        totalLearningTime: 0,
      };
      return [...prevLearningUnits, newlearningUnit];
    });
  };

  const onCreateModule = async () => {
    let id = toast.show("Erstellen...");
    let response;
    try {
      response = await authAxios?.post(
        `/students/${authState?.user.id}/modules`,
        {
          name: name,
          examDate: examDate,
          colorCode: colorCode,
          creditpoints: +creditPoints,
        }
      );
      toast.update(id, "Modul erfoglreich angelegt.", { type: "success" });
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
        {/* <FlatList
          data={learningUnits}
          renderItem={({ item }) => (
            <LearningUnitForm
              inputData={item}
              onDelete={onDeleteLearningUnit}
            />
          )}
          keyExtractor={(item: LearningUnitType) => item.id.toString()}
          contentContainerStyle={{ gap: 12 }}
          style={{ width: "100%" }}
        ></FlatList> */}
        {learningUnits.map((unit) => (
          <LearningUnitForm
            inputData={unit}
            onDelete={onDeleteLearningUnit}
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
