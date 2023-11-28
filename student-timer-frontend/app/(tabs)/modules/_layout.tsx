import { StyleSheet, TouchableOpacity } from "react-native";

import { View } from "@/components/Themed";
import { FlatList } from "react-native-gesture-handler";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import { H1, H3, P, Subhead } from "@/components/StyledText";
import { ModuleChart } from "@/components/modules/ModuleChart";
import { precomputeLearningUnits } from "@/lib/moduleTypeHelper";

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
          unitId: "10",
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "11",
          name: "Praktikum",
          workloadPerWeek: 10,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "12",
          name: "Nachhilfe",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "13",
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
          unitId: "20",
          name: "Vorlesung",
          workloadPerWeek: 10,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "21",
          name: "Praktikum",
          workloadPerWeek: 5,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "22",
          name: "Nachhilfe",
          workloadPerWeek: 13,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "23",
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
          unitId: "20",
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "22",
          name: "Nachhilfe",
          workloadPerWeek: 3,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "23",
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
          unitId: "20",
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "23",
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
          unitId: "20",
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "21",
          name: "Praktikum",
          workloadPerWeek: 10,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "22",
          name: "Nachhilfe",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "23",
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "203",
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "2453",
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          unitId: "23456",
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
      ],
    },
  ];

  const navigateToModuleDetail = () => {
    router.push("/(tabs)/modules/detail/");
  };

  const transformedData: ModuleType = precomputeLearningUnits(mockData[0]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToModuleDetail}>
        <H1>ccc</H1>
      </TouchableOpacity>
      <FlatList
        data={mockData}
        renderItem={({ item }) => <ModuleCard {...item} />}
        keyExtractor={(item: ModuleType) => item.moduleId}
        contentContainerStyle={styles.flatListContainer}
      ></FlatList>
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
