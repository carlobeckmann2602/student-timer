import { FlatList, StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import HBarChart, { HChartProps } from "@/components/statistics/HBarChart";
import { COLORTHEME } from "@/constants/Theme";
import VBarChart, { VChartProps } from "@/components/statistics/VBarChart";
import { H2 } from "@/components/StyledText";

export default function StatisticsScreen() {
  const dummyDataHBar: HChartProps = {
    type: "hBar",
    title:
      "Letzte Woche lief das Lernen etwas besser. Behalte deinen Fokus bei.",
    xTotal: 8,
    bars: [
      {
        name: "Diese Woche",
        value: 5,
        color: COLORTHEME.light.primary,
        unit: "Stunden",
        average: true,
      },
      {
        name: "Letzte Woche",
        value: 8,
        color: COLORTHEME.light.grey3,
        unit: "Stunden",
        average: true,
      },
    ],
  };

  const dummyDataVBar: VChartProps = {
    type: "vBar",
    title:
      "Im letzten Monat hast du am Wochenende 100% mehr gearbeitet als unter der Woche.",
    yTotal: 9,
    bars: [
      {
        name: "Mo",
        value: 4.2,
        color: COLORTHEME.light.grey3,
      },
      {
        name: "Di",
        value: 3.5,
        color: COLORTHEME.light.grey3,
      },
      {
        name: "Mi",
        value: 4.4,
        color: COLORTHEME.light.grey3,
      },
      {
        name: "Do",
        value: 3.8,
        color: COLORTHEME.light.grey3,
      },
      {
        name: "Fr",
        value: 4.1,
        color: COLORTHEME.light.grey3,
      },
      {
        name: "Sa",
        value: 7.9,
        color: COLORTHEME.light.primary,
      },
      {
        name: "So",
        value: 8.2,
        color: COLORTHEME.light.primary,
      },
    ],
    avgBars: [
      {
        value: 1,
        color: COLORTHEME.light.grey3,
        unit: "Stunden",
        average: true,
      },
      {
        value: 8,
        color: COLORTHEME.light.primary,
        unit: "Stunden",
        average: true,
      },
    ],
  };

  const dummyData = [dummyDataHBar, dummyDataVBar];

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => {
          if (item.type === "hBar")
            return (
              <HBarChart
                type={item.type}
                title={item.title}
                xTotal={(item as HChartProps).xTotal}
                bars={item.bars}
              />
            );
          else if (item.type === "vBar") {
            return (
              <VBarChart
                type={item.type}
                title={item.title}
                yTotal={(item as VChartProps).yTotal}
                bars={item.bars}
                avgBars={(item as VChartProps).avgBars}
              />
            );
          }
          return null;
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <H2>Es sind keine Statistiken vorhanden.</H2>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  flatListContainer: {
    gap: 24,
    paddingVertical: 24,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
