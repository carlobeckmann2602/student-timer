import { VictoryPie } from "victory-native";
import { View } from "./Themed";
import { Text, StyleSheet } from "react-native";
import Svg from "react-native-svg";
import { useState } from "react";

export function ModuleChart() {
  const originalWidth = 100;
  const originalHeight = 100;
  const [inputData, setInputData] = useState([
    {
      x: 1,
      y: 1,
      id: 1,
      name: "Vorlesung",
      time: 40,
      color: "#F9D477",
    },
    {
      x: 2,
      y: 2,
      id: 2,
      name: "Praktikum",
      time: 10,
      color: "#6FB9E2",
    },
    {
      x: 3,
      y: 3,
      id: 3,
      name: "Nachhilfe",
      time: 10,
      color: "#D16E6E",
    },
    {
      x: 4,
      y: 4,
      id: 4,
      name: "Selbststudium",
      time: 60,
      color: "#88A795",
    },
  ]);

  return (
    <View
      style={{
        width: originalWidth,
        height: originalHeight,
        backgroundColor: "transparent",
      }}
    >
      <Svg viewBox={`0 0 ${originalWidth} ${originalHeight}`}>
        <VictoryPie
          standalone={false}
          width={originalWidth}
          height={originalHeight}
          padding={{ top: 0, bottom: 0 }}
          data={inputData}
          radius={originalWidth / 2}
          innerRadius={originalWidth / 2.8}
          startAngle={50}
          style={{ data: { fill: ({ datum }) => datum.color } }}
        />
        <View style={styles.chartTextContainer}>
          <Text style={styles.chartTextM}>112,5</Text>
          <Text style={styles.chartTextS}>von 150 Std.</Text>
        </View>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  chartTextContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  chartTextM: {
    fontSize: 14,
    fontWeight: "bold",
  },
  chartTextS: {
    fontSize: 8,
    fontWeight: "400",
  },
});
