import Button from "@/components/Button";
import { View } from "@/components/Themed";
import { LearningUnitForm } from "@/components/modules/LearningUnitForm";
import { COLORTHEME } from "@/constants/Theme";
import { LearningUnitType } from "@/types/LearningUnitType";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function NewModuleLearningUnits() {
  const [learningUnits, setLearningUnits] = useState<LearningUnitType[]>([
    {
      unitId: 123,
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
    const updatedLearningUnits = learningUnits.filter(
      (item) => item.unitId != unitId
    );
    setLearningUnits(updatedLearningUnits);
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

  const onCreateModule = () => {
    // TODO: Use API
    const response = 1;
    router.replace(`/(tabs)/modules/${response}`);
  };

  return (
    <View>
      <FlatList
        data={learningUnits}
        renderItem={({ item }) => (
          <LearningUnitForm inputData={item} onDelete={onDeleteLearningUnit} />
        )}
        keyExtractor={(item: LearningUnitType) => item.unitId.toString()}
        contentContainerStyle={styles.flatListContainer}
      ></FlatList>
      <Button
        text="Lerneinheit hinzufügen"
        backgroundColor={COLORTHEME.light.primary}
        textColor={COLORTHEME.light.grey2}
        onPress={onAddLearningUnit}
        style={{ width: 200 }}
      />
      <View style={styles.buttons}>
        <Button
          text="Fertig"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          onPress={onCreateModule}
          style={{ width: 200 }}
        />
      </View>
    </View>
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
