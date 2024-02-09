import { FlatList, RefreshControl, StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import HBarChart, { HBarChartProps } from "@/components/statistics/HBarChart";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import VBarChart, { VBarChartProps } from "@/components/statistics/VBarChart";
import { H3, P } from "@/components/StyledText";
import VLineChart, {
  VLineChartProps,
} from "@/components/statistics/VLineChart";
import StarChart, { StarChartProps } from "@/components/statistics/StarChart";
import { useAxios } from "@/context/AxiosContext";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

export default function StatisticsScreen() {
  const { authAxios } = useAxios();
  const { authState } = useAuth();
  const [statistics, setStatistics] =
    useState<
      Array<HBarChartProps | VBarChartProps | VLineChartProps | StarChartProps>
    >();

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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      (async () => {
        await getStatistics();
      })();
      setRefreshing(false);
    }, 300);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getStatistics();
    }, [])
  );

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
        contentContainerStyle={[
          { flex: statistics && statistics?.length ? 0 : 1 },
          styles.flatListContainer,
        ]}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <H3>Es sind noch keine Statistiken vorhanden.</H3>
            <P style={{ textAlign: "center" }}>
              Tracke deine erstes Lerneinheit um Statistiken über deine
              Lerneinheiten zu erhalten.
            </P>
          </View>
        }
        refreshControl={
          <RefreshControl
            colors={[COLORTHEME.light.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
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
    gap: BASE_STYLES.gap,
    paddingVertical: BASE_STYLES.verticalPadding,
  },
  flatListContainer: {
    gap: BASE_STYLES.gap,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: BASE_STYLES.headingGap,
  },
});
