import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { FlatList } from "react-native-gesture-handler";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { useFocusEffect, useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";
import React, { useState } from "react";
import { useModules } from "@/context/ModuleContext";
import { H1 } from "@/components/StyledText";

export default function ModulesScreen() {
  const router = useRouter();
  const { modules: fetchedModules, fetchModules } = useModules();

  const [modules, setModules] = useState<ModuleType[] | undefined>(
    fetchedModules
  );

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        fetchModules && (await fetchModules());
        if (fetchedModules?.length) {
          setModules(fetchedModules);
        }
        // console.log(fetchModules?.length);
        // console.log(modules);
      })();
    }, [])
  );

  // TODO?
  const isLoading = false;
  const error = false;

  // const mockData: ModuleType[] = [
  //   {
  //     id: 1,
  //     name: "Datenbanksysteme 2",
  //     colorCode: "#88A795",
  //     creditPoints: 5,
  //     examDate: new Date(2023, 10, 25),
  //     learningSessions: [],
  //     learningUnits: [
  //       {
  //         id: 10,
  //         name: "Vorlesung",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 11,
  //         name: "Praktikum",
  //         workloadPerWeek: 10,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 12,
  //         name: "Nachhilfe",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 13,
  //         name: "Selbststudium",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Mathe 1",
  //     colorCode: "#AB5761",
  //     creditPoints: 7,
  //     examDate: new Date(2024, 11, 11),
  //     learningSessions: [],
  //     learningUnits: [
  //       {
  //         id: 20,
  //         name: "Vorlesung",
  //         workloadPerWeek: 10,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 21,
  //         name: "Praktikum",
  //         workloadPerWeek: 5,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 22,
  //         name: "Nachhilfe",
  //         workloadPerWeek: 13,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 23,
  //         name: "Selbststudium",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Advanced Software Engineering",
  //     colorCode: "#5D7CB9",
  //     creditPoints: 5,
  //     examDate: new Date(2024, 11, 11),
  //     learningSessions: [],
  //     learningUnits: [
  //       {
  //         id: 30,
  //         name: "Vorlesung",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 31,
  //         name: "Nachhilfe",
  //         workloadPerWeek: 3,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 32,
  //         name: "Selbststudium",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: "Theoretische Informatik",
  //     colorCode: "#073B3A",
  //     creditPoints: 5,
  //     examDate: new Date(2024, 11, 11),
  //     learningSessions: [],
  //     learningUnits: [
  //       {
  //         id: 40,
  //         name: "Vorlesung",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 41,
  //         name: "Selbststudium",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     name: "Projektcontainer",
  //     colorCode: "#FBC2B5",
  //     creditPoints: 10,
  //     examDate: new Date(2024, 11, 11),
  //     learningSessions: [],
  //     learningUnits: [
  //       {
  //         id: 50,
  //         name: "Vorlesung",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 51,
  //         name: "Praktikum",
  //         workloadPerWeek: 10,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 52,
  //         name: "Nachhilfe",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 53,
  //         name: "Selbststudium",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 54,
  //         name: "Selbststudium",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 55,
  //         name: "Selbststudium",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //       {
  //         id: 56,
  //         name: "Selbststudium",
  //         workloadPerWeek: 40,
  //         startDate: new Date(2023, 9, 1),
  //         endDate: new Date(2024, 2, 1),
  //       },
  //     ],
  //   },
  // ];

  const onNewModulePress = () => router.push("/modules/new");

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        renderItem={({ item }) => <ModuleCard {...item} />}
        keyExtractor={(item: ModuleType) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <H1>Es sind keine Module vorhanden.</H1>
          </View>
        }
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
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
