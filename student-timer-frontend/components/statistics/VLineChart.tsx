import { VictoryAxis, VictoryChart, VictoryLine } from "victory-native";
import ChartContainer from "@/components/statistics/ChartContainer";

export type VLineChartProps = {
  type: string;
  title: string;
  yTotal: number;
  xTotal: number;
  color: string;
  labelColor: string;
  values: {
    x: number;
    y: number;
  }[];
  xDiscriptions: {
    name: string;
    x: number;
  }[];
};

export default function VLineChart({
  title,
  yTotal,
  xTotal,
  color,
  labelColor,
  values,
  xDiscriptions,
}: VLineChartProps) {
  return (
    <ChartContainer title={title}>
      <VictoryChart height={250} width={350} padding={{ bottom: 20 }}>
        <VictoryLine
          animate
          data={values}
          domain={{ x: [0, xTotal], y: [-1, yTotal + 1] }}
          style={{
            data: {
              stroke: color,
              strokeWidth: 3,
            },
          }}
          padding={{ bottom: 50 }}
          interpolation="monotoneX"
        />
        <VictoryAxis
          style={{
            axis: { stroke: labelColor, strokeWidth: 3 },
            tickLabels: { fill: labelColor },
            ticks: { stroke: "transparent" },
          }}
          offsetY={30}
          tickValues={xDiscriptions.map((item) => {
            return item.x;
          })}
          tickFormat={(t, index) => xDiscriptions[index].name}
        />
      </VictoryChart>
    </ChartContainer>
  );
}
