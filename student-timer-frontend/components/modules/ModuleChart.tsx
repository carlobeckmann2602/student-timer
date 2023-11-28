import { VictoryPie } from "victory-native";
import { View } from "../Themed";
import { StyleSheet } from "react-native";
import Svg from "react-native-svg";
import { useState } from "react";
import { P } from "../StyledText";
import { ModuleType } from "@/types/ModuleType";

export function ModuleChart(inputData: ModuleType) {
  const originalWidth = 100;
  const originalHeight = 100;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: originalWidth,
          height: originalHeight,
        }}
      >
        <Svg viewBox={`0 0 ${originalWidth} ${originalHeight}`}>
          <VictoryPie
            standalone={false}
            width={originalWidth}
            height={originalHeight}
            padding={{ top: 0, bottom: 0 }}
            data={inputData.learningUnits}
            radius={originalWidth / 2}
            innerRadius={originalWidth / 2.8}
            style={{ data: { fill: ({ datum }) => datum.colorCode } }}
          />
          <View style={styles.chartTextContainer}>
            <P style={{ fontWeight: "bold" }}>112,5</P>
            <P style={{ fontSize: 10, textAlign: "center" }}>
              von {inputData.creditpoints * 30} Std.
            </P>
          </View>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartTextContainer: {
    width: 100,
    height: 100,
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
