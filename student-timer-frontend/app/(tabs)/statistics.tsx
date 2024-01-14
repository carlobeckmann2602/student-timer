import { FlatList, StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import HBarChart, { HBarChartProps } from "@/components/statistics/HBarChart";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import VBarChart, { VBarChartProps } from "@/components/statistics/VBarChart";
import { H2 } from "@/components/StyledText";
import VLineChart, {
  VLineChartProps,
} from "@/components/statistics/VLineChart";
import StarChart, { StarChartProps } from "@/components/statistics/StarChart";
import { useAxios } from "@/context/AxiosContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function StatisticsScreen() {
  /* const dummyDataHBar: HBarChartProps = {
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

  const dummyDataVBar: VBarChartProps = {
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

  const dummyDataVLine: VLineChartProps = {
    type: "vLine",
    title: "Im letzten Monat hast du zu 80% von 18 Uhr bis 23 Uhr gearbeitet.",
    yTotal: 10,
    xTotal: 24,
    color: COLORTHEME.light.primary,
    labelColor: COLORTHEME.light.grey3,
    values: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 5,
      },
      {
        x: 3,
        y: 3,
      },
      {
        x: 4,
        y: 0,
      },
      {
        x: 5,
        y: 0,
      },
      {
        x: 6,
        y: 0,
      },
      {
        x: 7,
        y: 0,
      },
      {
        x: 8,
        y: 1,
      },
      {
        x: 9,
        y: 0,
      },
      {
        x: 10,
        y: 0,
      },
      {
        x: 11,
        y: 0,
      },
      {
        x: 12,
        y: 0,
      },
      {
        x: 13,
        y: 0,
      },
      {
        x: 14,
        y: 0,
      },
      {
        x: 15,
        y: 10,
      },
      {
        x: 16,
        y: 0,
      },
      {
        x: 17,
        y: 0,
      },
      {
        x: 18,
        y: 0,
      },
      {
        x: 19,
        y: 0,
      },
      {
        x: 20,
        y: 8,
      },
      {
        x: 21,
        y: 0,
      },
      {
        x: 22,
        y: 0,
      },
      {
        x: 23,
        y: 0,
      },
      {
        x: 24,
        y: 0,
      },
    ],
    xDiscriptions: [
      {
        name: "Morgens",
        x: 3,
      },
      {
        name: "Mittags",
        x: 9,
      },
      {
        name: "Abends",
        x: 15,
      },
      {
        name: "Nachts",
        x: 21,
      },
    ],
  };

  const dummyDataStarChart: StarChartProps = {
    type: "stars",
    title: "Mit der Leistung von Mediengestaltung 2 bist du am zufriedensten.",
    stars: [
      { name: "Datenbanksysteme 1", value: 3, color: "#476930" },
      { name: "Mediengestaltung 2", value: 5, color: "#053F5C" },
      { name: "Mathematik 2", value: 1, color: "#A8320A" },
    ],
  };

  const dummyData = [
    dummyDataHBar,
    dummyDataVBar,
    dummyDataVLine,
    dummyDataStarChart,
  ]; */

  const { authAxios } = useAxios();
  const { authState } = useAuth();
  const [statistics, setStatistics] =
    useState<
      Array<HBarChartProps | VBarChartProps | VLineChartProps | StarChartProps>
    >();

  useEffect(() => {
    const getStatistics = async () => {
      const response = await authAxios?.get(
        `/students/${authState?.user.id}/statistics`
      );
      const statisticArray = Object.values(response?.data) as Array<
        HBarChartProps | VBarChartProps | VLineChartProps | StarChartProps
      >;
      if (!statisticArray.every((item) => item === null)) {
        setStatistics(statisticArray.filter((item) => item !== null));
      }
    };
    getStatistics();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={statistics}
        style={{ borderRadius: BASE_STYLES.borderRadius }}
        renderItem={({ item }) => {
          switch (item.type) {
            case "hBar":
              item = item as HBarChartProps;
              return (
                <HBarChart
                  type={item.type}
                  title={item.title}
                  xTotal={item.xTotal}
                  bars={item.bars}
                />
              );

            case "vBar":
              item = item as VBarChartProps;
              return (
                <VBarChart
                  type={item.type}
                  title={item.title}
                  yTotal={item.yTotal}
                  bars={item.bars}
                  avgBars={item.avgBars}
                />
              );

            case "vLine":
              item = item as VLineChartProps;
              return (
                <VLineChart
                  type={item.type}
                  title={item.title}
                  yTotal={item.yTotal}
                  xTotal={item.xTotal}
                  color={item.color}
                  labelColor={item.labelColor}
                  values={item.values}
                  xDiscriptions={item.xDiscriptions}
                />
              );

            case "stars":
              item = item as StarChartProps;
              return (
                <StarChart
                  type={item.type}
                  title={item.title}
                  stars={item.stars}
                />
              );

            default:
              return null;
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <H2>Es sind keine Statistiken vorhanden.</H2>
          </View>
        }
      />
      {/*<FlatList
        data={dummyData}
        renderItem={({ item }) => {
          switch (item.type) {
            case "hBar":
              item = item as HBarChartProps;
              return (
                <HBarChart
                  type={item.type}
                  title={item.title}
                  xTotal={item.xTotal}
                  bars={item.bars}
                />
              );

            case "vBar":
              item = item as VBarChartProps;
              return (
                <VBarChart
                  type={item.type}
                  title={item.title}
                  yTotal={item.yTotal}
                  bars={item.bars}
                  avgBars={item.avgBars}
                />
              );

            case "vLine":
              item = item as VLineChartProps;
              return (
                <VLineChart
                  type={item.type}
                  title={item.title}
                  yTotal={item.yTotal}
                  xTotal={item.xTotal}
                  color={item.color}
                  labelColor={item.labelColor}
                  values={item.values}
                  xDiscriptions={item.xDiscriptions}
                />
              );

            case "stars":
              item = item as StarChartProps;
              return (
                <StarChart
                  type={item.type}
                  title={item.title}
                  stars={item.stars}
                />
              );

            default:
              return null;
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <H2>Es sind keine Statistiken vorhanden.</H2>
          </View>
        }
      />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingVertical: BASE_STYLES.horizontalPadding,
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
