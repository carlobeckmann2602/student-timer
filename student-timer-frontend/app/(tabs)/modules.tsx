import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { FlatList } from "react-native-gesture-handler";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { useRouter } from "expo-router";

export interface IModuleTest {
  x: number;
  y: number;
  id: number;
  name: string;
  time: number;
  color: string;
}

export interface IModule {
  module_id: string;
  name: string;
  color_code: string;
  creditpoints: number;
  exam_date: Date;
  learning_units: ILearning_Unit[];
}

export interface ILearning_Unit {
  unit_id: string;
  name: string;
  workload_per_week: number;
  start_date: Date;
  end_date: Date;

  color_code?: string;
  y?: number;
}

export default function ModulesScreen() {
  const router = useRouter();

  // TODO?
  const isLoading = false;
  const error = false;

  const mockData: IModule[] = [
    {
      module_id: "1",
      name: "Datenbanksysteme 2",
      color_code: "#88A795",
      creditpoints: 5,
      exam_date: new Date(2023, 10, 25),
      learning_units: [
        {
          unit_id: "10",
          name: "Vorlesung",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "11",
          name: "Praktikum",
          workload_per_week: 10,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "12",
          name: "Nachhilfe",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "13",
          name: "Selbststudium",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
      ],
    },
    {
      module_id: "2",
      name: "Mathe 1",
      color_code: "#AB5761",
      creditpoints: 7,
      exam_date: new Date(2024, 11, 11),
      learning_units: [
        {
          unit_id: "20",
          name: "Vorlesung",
          workload_per_week: 10,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "21",
          name: "Praktikum",
          workload_per_week: 5,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "22",
          name: "Nachhilfe",
          workload_per_week: 13,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "23",
          name: "Selbststudium",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
      ],
    },
    {
      module_id: "3",
      name: "Advanced Software Engineering",
      color_code: "#5D7CB9",
      creditpoints: 5,
      exam_date: new Date(2024, 11, 11),
      learning_units: [
        {
          unit_id: "20",
          name: "Vorlesung",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "22",
          name: "Nachhilfe",
          workload_per_week: 3,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "23",
          name: "Selbststudium",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
      ],
    },
    {
      module_id: "4",
      name: "Theoretische Informatik",
      color_code: "#073B3A",
      creditpoints: 5,
      exam_date: new Date(2024, 11, 11),
      learning_units: [
        {
          unit_id: "20",
          name: "Vorlesung",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "23",
          name: "Selbststudium",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
      ],
    },
    {
      module_id: "5",
      name: "Projektcontainer",
      color_code: "#FBC2B5",
      creditpoints: 10,
      exam_date: new Date(2024, 11, 11),
      learning_units: [
        {
          unit_id: "20",
          name: "Vorlesung",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "21",
          name: "Praktikum",
          workload_per_week: 10,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "22",
          name: "Nachhilfe",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "23",
          name: "Selbststudium",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "203",
          name: "Selbststudium",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "2453",
          name: "Selbststudium",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
        {
          unit_id: "23456",
          name: "Selbststudium",
          workload_per_week: 40,
          start_date: new Date(2023, 9, 1),
          end_date: new Date(2024, 2, 1),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        renderItem={({ item }) => <ModuleCard {...item} />}
        keyExtractor={(item: IModule) => item.module_id}
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
