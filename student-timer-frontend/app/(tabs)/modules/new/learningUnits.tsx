import Button from "@/components/Button";
import { View } from "@/components/Themed";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { COLORTHEME } from "@/constants/Theme";
import { LearningUnitType } from "@/types/LearningUnitType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function NewModuleLearningUnits() {
  const [learningUnits, setLearningUnits] = useState<LearningUnitType[]>([
    {
      id: 123,
      name: "test",
      workloadPerWeek: -1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 456,
      name: "test",
      workloadPerWeek: -1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 789,
      name: "test",
      workloadPerWeek: -1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 1,
      name: "test",
      workloadPerWeek: -1,
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);
  const [error, setError] = useState("");

  const router = useRouter();

  // const newLearningUnits: LearningUnitType[] = [
  //   {
  //     id: 123,
  //     name: "test",
  //     workloadPerWeek: -1,
  //     startDate: new Date(),
  //     endDate: new Date(),
  //   },
  //   {
  //     id: 456,
  //     name: "test",
  //     workloadPerWeek: -1,
  //     startDate: new Date(),
  //     endDate: new Date(),
  //   },
  //   {
  //     id: 789,
  //     name: "test",
  //     workloadPerWeek: -1,
  //     startDate: new Date(),
  //     endDate: new Date(),
  //   },
  // ];

  const onDeleteLearningUnit = (id: number) => {
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
      };
      return [...prevLearningUnits, newlearningUnit];
    });
  };

  const onCreateModule = () => {
    // TODO: Use API
    const response = 1;
    // router.replace(`/(tabs)/modules/${response}`);
    router.replace(`/(tabs)/modules`);
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
