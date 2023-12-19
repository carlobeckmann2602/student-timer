import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import HBar from "@/components/statistics/HBar";
import { COLORTHEME } from "@/constants/Theme";

export default function StatisticsScreen() {
  const dummyData = {
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
      {
        name: "Vorletzte Woche",
        value: 4,
        color: "red",
        unit: "Stunden",
        average: true,
      },

      {
        name: "Vor 2 Woche",
        value: 7,
        color: "blue",
        unit: "Stunden",
        average: true,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <HBar
        title={dummyData.title}
        xTotal={dummyData.xTotal}
        bars={dummyData.bars}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
