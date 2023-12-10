import { ScrollView, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import { H1, H2, P, Subhead } from "@/components/StyledText";
import { ModuleChart } from "@/components/modules/ModuleChart";
import {
  computeDateDifference,
  precomputeLearningUnits,
} from "@/libs/moduleTypeHelper";
import { LearningUnitType } from "@/types/LearningUnitType";
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
          id: 10,
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 11,
          name: "Praktikum",
          workloadPerWeek: 10,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 12,
          name: "Nachhilfe",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 13,
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
          id: 20,
          name: "Vorlesung",
          workloadPerWeek: 10,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 21,
          name: "Praktikum",
          workloadPerWeek: 5,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 22,
          name: "Nachhilfe",
          workloadPerWeek: 13,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 23,
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
          id: 30,
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 31,
          name: "Nachhilfe",
          workloadPerWeek: 3,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 32,
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
          id: 40,
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 41,
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
          id: 50,
          name: "Vorlesung",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 51,
          name: "Praktikum",
          workloadPerWeek: 10,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 52,
          name: "Nachhilfe",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 53,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 54,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 55,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
        {
          id: 56,
          name: "Selbststudium",
          workloadPerWeek: 40,
          startDate: new Date(2023, 9, 1),
          endDate: new Date(2024, 2, 1),
        },
      ],
    },
  ];

  const transformedData: ModuleType = precomputeLearningUnits(mockData[0]);
  const detailModule = transformedData;

  const computeUnitString = (unit: LearningUnitType) => {
    let weekAmount = computeDateDifference(unit.endDate, unit.startDate, true);
    return `${unit.workloadPerWeek} h, ${weekAmount} Wochen`;
  };

  return (
    <View style={styles.outerWrapper}>
      <H1
        style={{
          color: detailModule.colorCode,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        {detailModule.name}
      </H1>
      <ScrollView contentContainerStyle={styles.scrollViewContainerStyle}>
        <ModuleChart inputData={detailModule} width={200} height={200} />
        <View style={styles.unitWrapper}>
          <H2 style={{ textAlign: "left" }}>Einheiten</H2>
          <View>
            {detailModule.learningUnits.map((unit) => {
              return (
                <View key={unit.id} style={styles.unitRowWraupper}>
                  <View style={styles.unitRow}>
                    <View
                      style={[
                        styles.moduleIndicatorM,
                        { backgroundColor: unit.colorCode },
                      ]}
                    />
                    <View style={styles.unitRowTitle}>
                      <Subhead>{unit.name}</Subhead>
                      <P>{computeUnitString(unit)}</P>
                    </View>
                    <Subhead>{unit.y} Std.</Subhead>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.resultRow}>
            <View
              style={styles.separator}
              lightColor={COLORTHEME.light.text}
              darkColor={COLORTHEME.dark.text}
            />
            <Subhead>Gesamt: {transformedData.timeInvested} Std.</Subhead>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    paddingVertical: 30,
    height: "100%",
  },
  scrollViewContainerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    gap: 16,
  },
  chartWrapper: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  unitWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  unitRowWraupper: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  unitRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  moduleIndicatorM: {
    width: 24,
    height: 24,
    borderRadius: 1000,
  },
  unitRowTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    padding: 12,
  },
  resultRow: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  separator: {
    marginVertical: 12,
    height: 1,
    width: "20%",
  },
});
