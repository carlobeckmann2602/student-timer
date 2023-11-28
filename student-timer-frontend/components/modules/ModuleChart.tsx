import { VictoryLabel, VictoryPie } from "victory-native";
import { View } from "../Themed";
import { StyleSheet } from "react-native";
import Svg from "react-native-svg";
import { ModuleType } from "@/types/ModuleType";
import { SIZES } from "@/constants/Theme";

export function ModuleChart(inputData: ModuleType) {
  const originalWidth = 100;
  const originalHeight = 100;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
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
            data={inputData.learningUnits}
            radius={originalWidth / 2}
            innerRadius={originalWidth / 2.8}
            style={{ data: { fill: ({ datum }) => datum.colorCode } }}
          />
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={50}
            y={44}
            text={"112,5"}
            style={styles.chartTextL}
          />
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={50}
            y={62}
            text={`von ${inputData.creditpoints * 30} Std.`}
            style={styles.chartTextS}
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartTextL: {
    fontFamily: "Roboto",
    fontSize: SIZES.small,
    fontWeight: "600",
    textAlign: "center",
  },
  chartTextS: {
    fontFamily: "Roboto",
    fontSize: SIZES.xxsmall,
    fontWeight: "normal",
    textAlign: "center",
  },
});
