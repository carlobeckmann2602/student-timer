import { VictoryLabel, VictoryPie } from "victory-native";
import { View } from "../Themed";
import { StyleSheet } from "react-native";
import Svg from "react-native-svg";
import { ModuleType } from "@/types/ModuleType";
import { SIZES } from "@/constants/Theme";

type ModuleChartProps = {
  inputData: ModuleType;
  width: number;
  height: number;
};

export function ModuleChart(moduleChartProp: ModuleChartProps) {
  const inputData = moduleChartProp.inputData;
  const originalWidth = moduleChartProp.width;
  const originalHeight = moduleChartProp.height;

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
            labels={() => ""}
          />
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={originalWidth / 2}
            y={originalHeight * 0.44}
            text={"112,5"}
            style={[
              originalHeight <= 100 ? styles.chartTextL : styles.chartTextXL,
            ]}
          />
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={originalWidth / 2}
            y={originalHeight * 0.62}
            text={`von ${inputData.creditpoints * 30} Std.`}
            style={[
              originalHeight <= 100 ? styles.chartTextS : styles.chartTextL,
            ]}
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartTextXL: {
    fontFamily: "Roboto",
    fontSize: SIZES.xxLarge,
    fontWeight: "600",
    textAlign: "center",
  },
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
