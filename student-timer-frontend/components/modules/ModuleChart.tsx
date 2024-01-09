import { VictoryLabel, VictoryPie } from "victory-native";
import { View } from "../Themed";
import { StyleSheet } from "react-native";
import Svg from "react-native-svg";
import { SIZES } from "@/constants/Theme";
import { LearningUnitType } from "@/types/LearningUnitType";
import { useEffect, useState } from "react";

type ModuleChartProps = {
  inputData: LearningUnitType[];
  totalAmount: number;
  totalAmountDone: number;

  width: number;
  height: number;
};

export function ModuleChart(moduleChartProp: ModuleChartProps) {
  const { inputData, totalAmount, totalAmountDone, width, height } =
    moduleChartProp;

  const [inputDataExtended, setInputDataExtended] = useState<
    LearningUnitType[]
  >([]);
  const [endAngle, setEndAngle] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setInputDataExtended([
        ...inputData,
        {
          id: -1,
          name: "",
          workloadPerWeek: 0,
          startDate: new Date(),
          endDate: new Date(),
          totalLearningTime: (totalAmount - totalAmountDone) * 60,
          colorCode: "transparent",
        } as LearningUnitType,
      ]);
      setEndAngle(360);
    }, 100);
  }, []);

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
          width: width,
          height: height,
          backgroundColor: "transparent",
        }}
      >
        <Svg viewBox={`0 0 ${width} ${height}`}>
          <VictoryPie
            animate={{ duration: 500, easing: "circleInOut" }}
            endAngle={endAngle}
            standalone={false}
            width={width}
            height={height}
            padding={{ top: 0, bottom: 0 }}
            data={inputDataExtended.map((item: LearningUnitType) => ({
              ...item,
              y: item.totalLearningTime,
            }))}
            radius={width / 2}
            innerRadius={width / 2.8}
            style={{ data: { fill: ({ datum }) => datum.colorCode } }}
            labels={() => ""}
          />
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={width / 2}
            y={height * 0.44}
            text={totalAmountDone}
            style={[height <= 100 ? styles.chartTextL : styles.chartTextXL]}
          />
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={width / 2}
            y={height * 0.62}
            text={`von ${totalAmount} Std.`}
            style={[height <= 100 ? styles.chartTextS : styles.chartTextL]}
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartTextXL: {
    fontFamily: "OpenSans_Bold",
    fontSize: SIZES.xxLarge,
    textAlign: "center",
  },
  chartTextL: {
    fontFamily: "OpenSans_SemiBold",
    fontSize: SIZES.small,
    textAlign: "center",
  },
  chartTextS: {
    fontFamily: "OpenSans_Regular",
    fontSize: SIZES.xxsmall,
    textAlign: "center",
  },
});
