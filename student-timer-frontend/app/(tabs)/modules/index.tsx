import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { FlatList } from "react-native-gesture-handler";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";

export default function ModulesScreen() {
  const router = useRouter();

  // TODO?
  const isLoading = false;
  const error = false;

  const mockData: ModuleType[] = [
    {
      moduleId: "1",
      name: "Datenbanksysteme 2",
      colorCode: "#88A795",
      creditpoints: 5,
      examDate: new Date(2023, 10, 25),
      learningUnits: [
        {
          unitId: 10,
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 11,
          name: "Praktikum",
          workloadPerWeek: 10,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 12,
          name: "Nachhilfe",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 13,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
      ],
    },
    {
      moduleId: "2",
      name: "Mathe 1",
      colorCode: "#AB5761",
      creditpoints: 7,
      examDate: new Date(2024, 11, 11),
      learningUnits: [
        {
          unitId: 20,
          name: "Vorlesung",
          workloadPerWeek: 10,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 21,
          name: "Praktikum",
          workloadPerWeek: 5,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 22,
          name: "Nachhilfe",
          workloadPerWeek: 13,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 23,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
      ],
    },
    {
      moduleId: "3",
      name: "Advanced Software Engineering",
      colorCode: "#5D7CB9",
      creditpoints: 5,
      examDate: new Date(2024, 11, 11),
      learningUnits: [
        {
          unitId: 30,
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 31,
          name: "Nachhilfe",
          workloadPerWeek: 3,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 32,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
      ],
    },
    {
      moduleId: "4",
      name: "Theoretische Informatik",
      colorCode: "#073B3A",
      creditpoints: 5,
      examDate: new Date(2024, 11, 11),
      learningUnits: [
        {
          unitId: 40,
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 41,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
      ],
    },
    {
      moduleId: "5",
      name: "Projektcontainer",
      colorCode: "#FBC2B5",
      creditpoints: 10,
      examDate: new Date(2024, 11, 11),
      learningUnits: [
        {
          unitId: 50,
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 51,
          name: "Praktikum",
          workloadPerWeek: 10,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 52,
          name: "Nachhilfe",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 53,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 54,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 55,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: 56,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
      ],
    },
  ];

  const onNewModulePress = () => router.push("/modules/new");

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        renderItem={({ item }) => <ModuleCard {...item} />}
        keyExtractor={(item: ModuleType) => item.moduleId}
        contentContainerStyle={styles.flatListContainer}
      ></FlatList>
      <Button
        text={"Neues Modul anlegen"}
        backgroundColor={COLORTHEME.light.primary}
        textColor={COLORTHEME.light.grey2}
        onPress={onNewModulePress}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flatListContainer: {
    gap: 24,
  },
});
