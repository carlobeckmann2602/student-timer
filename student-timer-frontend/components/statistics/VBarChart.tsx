import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
} from "victory-native";
import ChartContainer from "@/components/statistics/ChartContainer";
import { Dimensions } from "react-native";

export type VBarChartProps = {
  type: string;
  title: string;
  yTotal: number;
  bars: {
    name?: string;
    value: number;
    color: string;
  }[];
  avgBars: { value: number; color: string; unit?: string; average?: boolean }[];
};

export default function VBarChart({
  title,
  yTotal,
  bars,
  avgBars,
}: VBarChartProps) {
  const width = Dimensions.get("window").width - 90;
  return (
    <ChartContainer title={title}>
      <VictoryContainer height={300} width={width}>
        <VictoryChart
          width={width}
          standalone={false}
          padding={{ left: 60, right: 20, bottom: 30, top: 10 }}
        >
          <VictoryBar
            animate={{
              duration: 2000,
              onLoad: { duration: 750 },
            }}
            data={bars}
            y="value"
            x="name"
            barWidth={14}
            cornerRadius={{ top: 7 }}
            domain={{ x: [0, bars.length], y: [0, yTotal] }}
            maxDomain={{ y: yTotal, x: bars.length }}
            style={{
              data: { fill: ({ datum }) => datum.color },
            }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: {
                fontFamily: "OpenSans_Regular",
              },
            }}
          />
        </VictoryChart>
        <VictoryBar
          horizontal
          width={width}
          standalone={false}
          animate={{
            duration: 2000,
            onLoad: { duration: 750 },
          }}
          data={avgBars.map((item) => ({ ...item, y: 20 }))}
          x="value"
          barWidth={8}
          padding={{ left: 0, right: 0, bottom: 30, top: 10 }}
          cornerRadius={{ top: 4, bottom: 4 }}
          domain={{ x: [0, yTotal], y: [0, 20] }}
          style={{ data: { fill: ({ datum }) => datum.color } }}
        />
        <>
          {avgBars.map((item, index) => (
            <VictoryLabel
              key={index}
              text={[
                item.value.toString() + (item.average && " Ø"),
                item.unit ? item.unit : "",
              ]}
              style={[
                {
                  fontSize: 24,
                  fontFamily: "OpenSans_Regular",
                  fill: item.color,
                },
                {
                  fontSize: 12,
                  fontFamily: "OpenSans_Regular",
                  fill: item.color,
                },
              ]}
              textAnchor="middle"
              y={310 - (275 / yTotal - 1) * item.value}
              x={30}
            />
          ))}
        </>
      </VictoryContainer>
    </ChartContainer>
  );
}
